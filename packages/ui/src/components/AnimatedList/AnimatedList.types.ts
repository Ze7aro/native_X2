import type { ReactNode } from 'react';
import type { ViewProps } from 'react-native';

export interface ListItem {
  id: string;
  content: ReactNode;
}

export interface AnimatedListProps extends ViewProps {
  items: ListItem[];
  renderItem?: (item: ListItem, index: number) => ReactNode;
  gap?: number;
  animationDuration?: number;
  testID?: string;
}
