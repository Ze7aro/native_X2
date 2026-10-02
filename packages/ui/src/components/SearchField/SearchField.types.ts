import type { StyleProp, TextInputProps, ViewStyle } from 'react-native';

export interface SearchFieldProps extends Omit<
  TextInputProps,
  'defaultValue' | 'onChangeText' | 'style' | 'value'
> {
  value?: string;
  defaultValue?: string;
  onChangeText?: (value: string) => void;
  onClear?: () => void;
  clearLabel?: string;
  containerStyle?: StyleProp<ViewStyle>;
  testID?: string;
}
