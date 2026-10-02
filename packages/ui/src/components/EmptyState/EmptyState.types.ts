import type { ReactNode } from 'react';
import type { ViewProps } from 'react-native';

export interface EmptyStateProps extends ViewProps {
  icon?: ReactNode;
  title?: string;
  description?: string;
  action?: ReactNode;
  compact?: boolean;
  testID?: string;
}
