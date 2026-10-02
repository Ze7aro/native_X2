import type { ReactNode } from 'react';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';

export type DashboardCardStatus = 'ready' | 'loading' | 'empty' | 'error';
export type DashboardCardVariant = 'plain' | 'outlined' | 'glass';

export interface DashboardCardTrend {
  direction: 'up' | 'down' | 'neutral';
  label: string;
  value?: string;
}

export interface DashboardCardProps extends ViewProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  headerAction?: ReactNode;
  metric?: ReactNode;
  metricLabel?: string;
  trend?: DashboardCardTrend;
  children?: ReactNode;
  footer?: ReactNode;
  status?: DashboardCardStatus;
  loadingContent?: ReactNode;
  emptyContent?: ReactNode;
  emptyMessage?: string;
  errorContent?: ReactNode;
  errorMessage?: string;
  retryLabel?: string;
  onRetry?: () => void;
  variant?: DashboardCardVariant;
  onPress?: () => void;
  disabled?: boolean;
  minHeight?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
