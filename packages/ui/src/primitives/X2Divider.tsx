import { View, ViewProps } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export interface X2DividerProps extends ViewProps {
  orientation?: 'horizontal' | 'vertical';
  thickness?: number;
  color?: string;
  testID?: string;
}

export function X2Divider({
  orientation = 'horizontal',
  thickness = 1,
  color,
  style,
  testID,
  ...props
}: X2DividerProps) {
  const { colors } = useTheme();

  return (
    <View
      {...props}
      testID={testID}
      style={[
        {
          backgroundColor: color ?? colors.divider,
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
