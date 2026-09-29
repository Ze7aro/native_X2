import React from 'react';
import {
  Pressable,
  PressableProps,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { AccessibilityProps, getAccessibilityRole } from '@react-x2-native/core';

export interface X2PressableProps extends PressableProps, AccessibilityProps {
  variant?: 'solid' | 'outline' | 'ghost';
  backgroundColor?: string;
  borderColor?: string;
  disabled?: boolean;
  testID?: string;
  activeOpacity?: number;
}

export function X2Pressable({
  variant = 'solid',
  backgroundColor,
  borderColor,
  disabled = false,
  onPress,
  accessibilityRole = 'button',
  children,
  style,
  testID,
  activeOpacity = 0.8,
  accessibilityLabel,
  accessibilityHint,
  ...props
}: X2PressableProps) {
  const { colors } = useTheme();

  const getBackgroundColor = (): string => {
    if (disabled) return colors.surfaceVariant;
    return backgroundColor ?? colors.primary;
  };

  const getOpacity = (pressed: boolean): number => {
    if (disabled) return 0.5;
    return pressed ? activeOpacity : 1;
  };

  return (
    <Pressable
      {...props}
      disabled={disabled}
      onPress={onPress}
      testID={testID}
      accessibilityRole={getAccessibilityRole(accessibilityRole as string)}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
      style={({ pressed }) => {
        const baseStyle: ViewStyle = {
          backgroundColor: getBackgroundColor(),
          borderColor: borderColor ?? 'transparent',
          borderWidth: variant === 'outline' ? 1 : 0,
          opacity: getOpacity(pressed),
        };

        if (variant === 'ghost') {
          baseStyle.backgroundColor = 'transparent';
        }

        return [baseStyle, typeof style === 'function' ? style({ pressed }) : style];
      }}
    >
      {children}
    </Pressable>
  );
}
