import type { ReactNode } from 'react';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';

export interface FilterBarProps extends ViewProps {
  searchValue?: string;
  defaultSearchValue?: string;
  onSearchChange?: (value: string) => void;
  onClear?: () => void;
  searchPlaceholder?: string;
  children?: ReactNode;
  actions?: ReactNode;
  searchStyle?: StyleProp<ViewStyle>;
  testID?: string;
}
