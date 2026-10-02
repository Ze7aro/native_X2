import type { ReactNode } from 'react';
import type { FlatListProps, ViewProps } from 'react-native';

export interface InfiniteListProps<T = unknown> extends ViewProps {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor?: (item: T, index: number) => string;
  onEndReached?: () => void;
  gap?: number;
  loadMoreThreshold?: number;
  isLoading?: boolean;
  scrollEnabled?: boolean;
  nestedScrollEnabled?: boolean;
  ListHeaderComponent?: FlatListProps<T>['ListHeaderComponent'];
  ListFooterComponent?: FlatListProps<T>['ListFooterComponent'];
  testID?: string;
}
