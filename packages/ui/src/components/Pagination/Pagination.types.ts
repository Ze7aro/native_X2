import type { ReactNode } from 'react';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';

export interface PaginationProps extends ViewProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  previousLabel?: string;
  nextLabel?: string;
  previousIcon?: ReactNode;
  nextIcon?: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
