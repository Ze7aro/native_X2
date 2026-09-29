import React from 'react';
import { View, ViewProps } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { radius, elevation } from '@react-x2-native/tokens';

export interface X2SurfaceProps extends ViewProps {
  backgroundColor?: string;
  borderRadius?: keyof typeof radius;
  elevationLevel?: keyof typeof elevation;
}

export function X2Surface({
  backgroundColor,
  borderRadius = 'md',
  elevationLevel = 'none',
  style,
  ...props
}: X2SurfaceProps) {
  const { colors } = useTheme();

  return (
    <View
      {...props}
      style={[
        {
          backgroundColor: backgroundColor ?? colors.surface,
          borderRadius: radius[borderRadius],
        },
        elevation[elevationLevel],
        style,
      ]}
    />
  );
}
