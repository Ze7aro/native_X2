import React from 'react';
import { View, ViewProps } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export interface X2DividerProps extends ViewProps {
  orientation?: 'horizontal' | 'vertical';
  thickness?: number;
}

export function X2Divider({
  orientation = 'horizontal',
  thickness = 1,
  style,
  ...props
}: X2DividerProps) {
  const { colors } = useTheme();

  return (
    <View
      {...props}
      style={[
        {
          backgroundColor: colors.divider,
          ...(orientation === 'horizontal' && {
            height: thickness,
            width: '100%',
          }),
          ...(orientation === 'vertical' && {
            width: thickness,
            height: '100%',
          }),
        },
        style,
      ]}
    />
  );
}
