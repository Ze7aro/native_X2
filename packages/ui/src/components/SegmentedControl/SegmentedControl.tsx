import React, { useCallback, useMemo } from 'react';
import { View, Pressable, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { useReducedMotion } from '@react-x2-native/core';
import { useTheme } from '../../theme/ThemeContext';
import { X2Text } from '../../primitives';
import { useSelectionIndicator } from '../../hooks/useSelectionIndicator';
import { radius, spacing } from '@react-x2-native/tokens';
import type { SegmentedControlProps } from './SegmentedControl.types';

const CONTAINER_PADDING = 4;

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

  const { onItemLayout, indicatorStyle } = useSelectionIndicator(selectedId, {
    reducedMotion,
  });

  const handleSelect = useCallback(
    (id: string) => {
      if (!disabled) {
        onSelect(id);
      }
    },
    [disabled, onSelect],
  );

  const containerStyle: ViewStyle = useMemo(
    () => ({
      flexDirection: 'row',
      borderRadius: radius.md,
      backgroundColor: backgroundColor ?? colors.surfaceVariant,
      padding: CONTAINER_PADDING,
      opacity: disabled ? 0.5 : 1,
    }),
    [backgroundColor, colors.surfaceVariant, disabled],
  );

  return (
    <View
      {...props}
      style={[containerStyle, style]}
      testID={testID}
      accessibilityRole="radiogroup"
    >
      {/* Layout x already includes the container padding, so the indicator starts at left: 0. */}
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: CONTAINER_PADDING,
            bottom: CONTAINER_PADDING,
            left: 0,
            borderRadius: radius.sm,
            backgroundColor: selectedBackgroundColor ?? colors.primary,
          },
          indicatorStyle,
        ]}
        pointerEvents="none"
      />

      {options.map((option) => {
        const isSelected = option.id === selectedId;

        return (
          <Pressable
            key={option.id}
            onLayout={(event) => onItemLayout(option.id, event)}
            onPress={() => handleSelect(option.id)}
            disabled={disabled}
            testID={testID ? `${testID}-option-${option.id}` : undefined}
            accessible
            accessibilityRole="radio"
            accessibilityLabel={option.label}
            accessibilityState={{ checked: isSelected, disabled }}
            style={{
              flex: 1,
              paddingVertical: spacing.sm,
              paddingHorizontal: spacing.md,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <X2Text
              variant="labelM"
              color={isSelected ? tintColor ?? colors.onPrimary : colors.textSecondary}
            >
              {option.label}
            </X2Text>
          </Pressable>
        );
      })}
    </View>
  );
}
