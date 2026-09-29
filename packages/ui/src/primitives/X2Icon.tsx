import React from 'react';
import { Text, TextProps } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export interface X2IconProps extends TextProps {
  size?: number;
  color?: string;
  name: string;
}

export function X2Icon({
  size = 24,
  color,
  name,
  style,
  ...props
}: X2IconProps) {
  const { colors } = useTheme();

  return (
    <Text
      {...props}
      style={[
        {
          fontSize: size,
          color: color ?? colors.text,
          textAlign: 'center',
        },
        style,
      ]}
    >
      {name}
    </Text>
  );
}
