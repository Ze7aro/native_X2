import React from 'react';
import { View, ViewProps } from 'react-native';
import { spacing } from '@react-x2-native/tokens';

type SpacingValue = keyof typeof spacing;

export interface X2StackProps extends ViewProps {
  direction?: 'row' | 'column';
  gap?: SpacingValue;
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
}

export function X2Stack({
  direction = 'column',
  gap = 'md',
  align = 'center',
  justify = 'flex-start',
  style,
  ...props
}: X2StackProps) {
  const gapValue = spacing[gap];

  return (
    <View
      {...props}
      style={[
        {
          flexDirection: direction,
          gap: gapValue,
          alignItems: align,
          justifyContent: justify,
        },
        style,
      ]}
    />
  );
}
