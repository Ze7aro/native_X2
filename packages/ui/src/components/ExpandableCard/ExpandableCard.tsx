import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { View, Pressable, ViewStyle, LayoutChangeEvent } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useReducedMotion } from '@react-x2-native/core';
import { useTheme } from '../../theme/ThemeContext';
import { radius } from '@react-x2-native/tokens';
import type { ExpandableCardProps } from './ExpandableCard.types';
import { useX2Strings } from '../../i18n/X2StringsProvider';

const SPRING_CONFIG = { damping: 15, mass: 1 };

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
  const strings = useX2Strings();
  const { colors } = useTheme();
  const reducedMotion = useReducedMotion();

  const [uncontrolledExpanded, setUncontrolledExpanded] = useState(defaultExpanded);
  const isExpanded = controlledExpanded ?? uncontrolledExpanded;

  const [contentHeight, setContentHeight] = useState(0);
  const animatedHeight = useSharedValue(0);
  const hasMeasured = useRef(false);

  // Animate from state (not from the press handler) so controlled changes animate too.
  useEffect(() => {
    const target = isExpanded ? contentHeight : 0;
    if (reducedMotion || !hasMeasured.current) {
      animatedHeight.value = target;
    } else {
      animatedHeight.value = withSpring(target, SPRING_CONFIG);
    }
    if (contentHeight > 0) {
      hasMeasured.current = true;
    }
  }, [isExpanded, contentHeight, reducedMotion, animatedHeight]);

  const handleContentLayout = useCallback((event: LayoutChangeEvent) => {
    setContentHeight(event.nativeEvent.layout.height);
  }, []);

  const handleHeaderPress = useCallback(() => {
    if (disabled) return;

    const newExpanded = !isExpanded;
    if (controlledExpanded === undefined) {
      setUncontrolledExpanded(newExpanded);
    }
    onToggle?.(newExpanded);
  }, [isExpanded, disabled, controlledExpanded, onToggle]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
  }));

  const cardStyle: ViewStyle = useMemo(
    () => ({
      borderRadius: radius.lg,
      backgroundColor: colors.surface,
      overflow: 'hidden',
      opacity: disabled ? 0.5 : 1,
    }),
    [colors.surface, disabled]
  );

  return (
    <View style={[cardStyle, style]} testID={testID} {...props}>
      <Pressable
        disabled={disabled}
        onPress={handleHeaderPress}
        testID={testID ? `${testID}-header` : undefined}
        accessible
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel || strings.expandableCard}
        accessibilityState={{
          disabled,
          expanded: isExpanded,
        }}
        accessibilityHint={strings.expandableCardHint}
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

      <Animated.View style={[{ overflow: 'hidden' }, animatedStyle]}>
        <View
          onLayout={handleContentLayout}
          testID={testID ? `${testID}-content` : undefined}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            paddingVertical: 16,
            paddingHorizontal: 16,
            borderTopColor: colors.divider,
            borderTopWidth: 1,
          }}
        >
          {children}
        </View>
      </Animated.View>
    </View>
  );
}
