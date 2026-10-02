import type { ReactNode } from 'react';
import type { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';

export type FormFieldValidationTrigger = 'change' | 'blur' | 'submit';

export interface FormFieldProps extends Omit<TextInputProps, 'defaultValue' | 'onBlur' | 'onChangeText' | 'onSubmitEditing' | 'style' | 'value'> {
  label?: string;
  description?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  validate?: (value: string) => string | undefined;
  validateOn?: FormFieldValidationTrigger;
  onValidationChange?: (error?: string) => void;
  value?: string;
  defaultValue?: string;
  onChangeText?: (value: string) => void;
  onBlur?: TextInputProps['onBlur'];
  onSubmitEditing?: TextInputProps['onSubmitEditing'];
  disabled?: boolean;
  loading?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  testID?: string;
}
