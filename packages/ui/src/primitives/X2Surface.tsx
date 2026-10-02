import React from 'react';
import { View, ViewProps } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { radius, elevation } from '@react-x2-native/tokens';

export interface X2SurfaceProps extends ViewProps {
  backgroundColor?: string;
  borderRadius?: keyof typeof radius | number;
  elevationLevel?: keyof typeof elevation;
  borderColor?: string;
  borderWidth?: number;
  testID?: string;
}

export function X2Surface({
  backgroundColor,
  borderRadius = 'md',
  elevationLevel = 'none',
  borderColor,
  borderWidth,
  style,
  testID,
  ...props
}: X2SurfaceProps) {
  const { colors } = useTheme();

  const borderRadiusValue = typeof borderRadius === 'number' ? borderRadius : radius[borderRadius];

  return (
    <View
      {...props}
      testID={testID}
      style={[
        {
          backgroundColor: backgroundColor ?? colors.surface,
          borderRadius: borderRadiusValue,
          borderColor: borderColor,
          borderWidth: borderWidth,
        },
        elevation[elevationLevel],
        style,
      ]}
    />
  );
}
