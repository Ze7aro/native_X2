import React from 'react';
import { Text, TextProps } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export interface X2IconProps extends TextProps {
  size?: number;
  color?: string;
  name: string;
  testID?: string;
  accessible?: boolean;
  accessibilityLabel?: string;
}

export function X2Icon({
  size = 24,
  color,
  name,
  style,
  testID,
  accessible = false,
  accessibilityLabel,
  ...props
}: X2IconProps) {
  const { colors } = useTheme();

  return (
    <Text
      {...props}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      style={[
        {
          fontSize: size,
          color: color ?? colors.text,
          textAlign: 'center',
          lineHeight: size,
        },
        style,
      ]}
      allowFontScaling={false}
    >
      {name}
    </Text>
  );
}
