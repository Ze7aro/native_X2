import React from 'react';
import { Text, TextProps as RNTextProps } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { typography } from '@react-x2-native/tokens';

type TypographyStyle = keyof typeof typography;

export interface X2TextProps extends RNTextProps {
  variant?: TypographyStyle;
  color?: string;
  testID?: string;
  weight?: 'normal' | 'bold';
}

export function X2Text({
  variant = 'bodyM',
  color,
  style,
  testID,
  weight,
  ...props
}: X2TextProps) {
  const { colors } = useTheme();
  const typographyStyle = typography[variant];

  return (
    <Text
      maxFontSizeMultiplier={1.5}
      {...props}
      testID={testID}
      style={[
        typographyStyle,
        { color: color ?? colors.text },
        weight && { fontWeight: weight },
        style,
      ]}
    />
  );
}
