import type { ReactNode } from 'react';
import type { ViewProps } from 'react-native';

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  icon?: ReactNode;
  status?: 'completed' | 'current' | 'pending';
}

export interface TimelineProps extends ViewProps {
  items: TimelineItem[];
  renderItem?: (item: TimelineItem, index: number) => ReactNode;
  onItemPress?: (item: TimelineItem, index: number) => void;
  testID?: string;
}
