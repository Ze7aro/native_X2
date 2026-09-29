import React, { useRef, useCallback, useMemo, useEffect } from 'react';
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
} from 'react-native-reanimated';
import { useReducedMotion } from '@react-x2-native/core';
import { useTheme } from '../../theme/ThemeContext';
import { X2Text } from '../../primitives';
import { radius, spacing } from '@react-x2-native/tokens';
import type { SegmentedControlProps } from './SegmentedControl.types';

const AnimatedView = Animated.createAnimatedComponent(View);

export function SegmentedControl({
  options,
  selectedId,
  onSelect,
  backgroundColor,
  selectedBackgroundColor,
  tintColor,
  disabled = false,
  testID,
  style,
  ...props
}: SegmentedControlProps) {
  const { colors } = useTheme();
  const reducedMotion = useReducedMotion();

  const indicatorX = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);
  const segmentRefs = useRef<{ [key: string]: View | null }>({});

  const selectedIndex = options.findIndex((opt) => opt.id === selectedId);

  const handleSegmentLayout = useCallback(
    (optionId: string, event: LayoutChangeEvent) => {
      const { x, width } = event.nativeEvent.layout;
      const isSelected = optionId === selectedId;

      if (isSelected) {
        indicatorX.value = reducedMotion ? x : withSpring(x, {
          damping: 15,
          mass: 1,
        });
        indicatorWidth.value = reducedMotion ? width : withSpring(width, {
          damping: 15,
          mass: 1,
        });
      }
    },
    [selectedId, indicatorX, indicatorWidth, reducedMotion],
  );

  const handleSelect = useCallback(
    (id: string) => {
      if (!disabled) {
        onSelect(id);
      }
    },
    [disabled, onSelect],
  );

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorX.value }],
    width: indicatorWidth.value,
  }), []);

  const containerStyle: ViewStyle = useMemo(
    () => ({
      flexDirection: 'row',
      borderRadius: radius.md,
      backgroundColor: backgroundColor ?? colors.surfaceVariant,
      padding: 4,
      opacity: disabled ? 0.5 : 1,
    }),
    [backgroundColor, colors.surfaceVariant, disabled],
  );

  return (
    <View
      style={[containerStyle, style]}
      testID={testID}
      {...props}
    >
      {/* Animated background */}
      <AnimatedView
        style={[
          {
            position: 'absolute',
            top: 4,
            left: 4,
            height: '100%',
            borderRadius: radius.sm,
            backgroundColor: selectedBackgroundColor ?? colors.primary,
          },
          animatedIndicatorStyle,
        ]}
        pointerEvents="none"
      />

      {/* Options */}
      {options.map((option, index) => {
        const isSelected = option.id === selectedId;

        return (
          <Pressable
            key={option.id}
            onLayout={(event) => handleSegmentLayout(option.id, event)}
            onPress={() => handleSelect(option.id)}
            disabled={disabled}
            ref={(ref) => {
              if (ref) segmentRefs.current[option.id] = ref;
            }}
            testID={testID ? `${testID}-option-${option.id}` : undefined}
            accessible
            accessibilityRole="radio"
            accessibilityLabel={option.label}
            accessibilityState={{ selected: isSelected }}
            style={{
              flex: 1,
              paddingVertical: spacing.sm,
              paddingHorizontal: spacing.md,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: index === options.length - 1 ? 0 : 0,
              zIndex: isSelected ? 0 : 1,
            }}
          >
            <X2Text
              variant="labelM"
              color={isSelected ? '#FFF' : colors.textSecondary}
              style={{
                opacity: isSelected ? 1 : 0.7,
              }}
            >
              {option.label}
            </X2Text>
          </Pressable>
        );
      })}
    </View>
  );
}
