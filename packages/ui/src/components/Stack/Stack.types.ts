import type { ReactNode } from 'react';
import type { ViewProps } from 'react-native';

export interface StackProps<T = unknown> extends ViewProps {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  direction?: 'vertical' | 'horizontal';
  spacing?: number;
  dividers?: boolean;
  scrollEnabled?: boolean;
  testID?: string;
}
