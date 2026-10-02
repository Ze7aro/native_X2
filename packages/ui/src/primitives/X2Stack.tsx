import { View, ViewProps } from 'react-native';
import { spacing } from '@react-x2-native/tokens';

type SpacingValue = keyof typeof spacing;

export interface X2StackProps extends ViewProps {
  direction?: 'row' | 'column';
  gap?: SpacingValue | number;
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justify?:
    'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  testID?: string;
}

export function X2Stack({
  direction = 'column',
  gap = 'md',
  align = 'center',
  justify = 'flex-start',
  style,
  testID,
  ...props
}: X2StackProps) {
  const gapValue = typeof gap === 'number' ? gap : spacing[gap];

  return (
    <View
      {...props}
      testID={testID}
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
