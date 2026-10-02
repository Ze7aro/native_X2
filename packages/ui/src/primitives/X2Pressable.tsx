import { Pressable, PressableProps, ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import type { AccessibilityProps } from '@react-x2-native/core';

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
  accessibilityState,
  ...props
}: X2PressableProps) {
  const { colors } = useTheme();

  const getBackgroundColor = (): string => {
    if (variant !== 'solid') return backgroundColor ?? 'transparent';
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
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={{
        ...accessibilityState,
        disabled: accessibilityState?.disabled ?? disabled,
      }}
      style={({ pressed }) => {
        const baseStyle: ViewStyle = {
          backgroundColor: getBackgroundColor(),
          borderColor: borderColor ?? (variant === 'outline' ? colors.primary : 'transparent'),
          borderWidth: variant === 'outline' ? 1 : 0,
          opacity: getOpacity(pressed),
        };

        return [baseStyle, typeof style === 'function' ? style({ pressed }) : style];
      }}
    >
      {children}
    </Pressable>
  );
}
