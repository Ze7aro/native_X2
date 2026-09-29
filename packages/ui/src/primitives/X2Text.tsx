import React from 'react';
import { Text, TextProps as RNTextProps } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { typography } from '@react-x2-native/tokens';

type TypographyStyle = keyof typeof typography;

export interface X2TextProps extends RNTextProps {
  variant?: TypographyStyle;
  color?: string;
}

export function X2Text({
  variant = 'bodyM',
  color,
  style,
  ...props
}: X2TextProps) {
  const { colors } = useTheme();
  const typographyStyle = typography[variant];

  return (
    <Text
      {...props}
      style={[
        typographyStyle,
        {
          color: color ?? colors.text,
        },
        style,
      ]}
    />
  );
}
