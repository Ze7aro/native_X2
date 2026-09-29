import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
  View,
  Pressable,
  ViewStyle,
  LayoutChangeEvent,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  measure,
  runOnUI,
} from 'react-native-reanimated';
import { useReducedMotion } from '@react-x2-native/core';
import { useTheme } from '../../theme/ThemeContext';
import { radius } from '@react-x2-native/tokens';
import type { ExpandableCardProps } from './ExpandableCard.types';

const AnimatedView = Animated.createAnimatedComponent(View);

export function ExpandableCard({
  header,
  children,
  expanded: controlledExpanded,
  defaultExpanded = false,
  onToggle,
  disabled = false,
  accessibilityLabel,
  testID,
  style,
  ...props
}: ExpandableCardProps) {
  const { colors } = useTheme();
  const reducedMotion = useReducedMotion();

  // Use controlled or uncontrolled state
  const [uncontrolledExpanded, setUncontrolledExpanded] = useState(defaultExpanded);
  const isExpanded = controlledExpanded ?? uncontrolledExpanded;

  const contentHeight = useSharedValue(0);
  const animatedHeight = useSharedValue(0);

  const contentRef = useRef<View>(null);
  const containerRef = useRef<Animated.View>(null);

  const handleMeasure = useCallback(() => {
    if (!contentRef.current) return;

    runOnUI(() => {
      const measurement = measure(contentRef);
      if (measurement) {
        contentHeight.value = measurement.height;
        animatedHeight.value = isExpanded ? measurement.height : 0;
      }
    })();
  }, [isExpanded, contentHeight, animatedHeight]);

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    handleMeasure();
  }, [handleMeasure]);

  const handleHeaderPress = useCallback(() => {
    if (disabled) return;

    const newExpanded = !isExpanded;

    if (reducedMotion) {
      // Instant state change when reduce motion is enabled
      animatedHeight.value = newExpanded ? contentHeight.value : 0;
    } else {
      // Smooth spring animation
      animatedHeight.value = withSpring(
        newExpanded ? contentHeight.value : 0,
        {
          damping: 15,
          mass: 1,
          overshootClamping: false,
          restSpeedThreshold: 0.001,
          restDisplacementThreshold: 0.001,
        },
      );
    }

    if (controlledExpanded === undefined) {
      setUncontrolledExpanded(newExpanded);
    }
    onToggle?.(newExpanded);
  }, [
    isExpanded,
    disabled,
    reducedMotion,
    contentHeight,
    animatedHeight,
    controlledExpanded,
    onToggle,
  ]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
    overflow: 'hidden',
  }), []);

  const cardStyle: ViewStyle = useMemo(
    () => ({
      borderRadius: radius.lg,
      backgroundColor: colors.surface,
      overflow: 'hidden',
      opacity: disabled ? 0.5 : 1,
    }),
    [colors.surface, disabled],
  );

  return (
    <Animated.View
      ref={containerRef}
      style={[cardStyle, style]}
      {...props}
    >
      {/* Header - Always visible */}
      <Pressable
        disabled={disabled}
        onPress={handleHeaderPress}
        testID={testID ? `${testID}-header` : undefined}
        accessible
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel || 'Expandable card'}
        accessibilityState={{
          disabled,
          expanded: isExpanded,
        }}
        accessibilityHint="Double tap to toggle expansion"
        style={{
          paddingVertical: 16,
          paddingHorizontal: 16,
        }}
      >
        <View
          style={{
            opacity: disabled ? 0.6 : 1,
          }}
        >
          {header}
        </View>
      </Pressable>

      {/* Content - Animated height */}
      <AnimatedView style={[animatedStyle]}>
        <View
          ref={contentRef}
          onLayout={handleLayout}
          testID={testID ? `${testID}-content` : undefined}
          style={{
            paddingVertical: 16,
            paddingHorizontal: 16,
            borderTopColor: colors.divider,
            borderTopWidth: 1,
          }}
        >
          {children}
        </View>
      </AnimatedView>
    </Animated.View>
  );
}
