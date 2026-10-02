import type { ViewProps } from 'react-native';

export interface StatsCardProps extends ViewProps {
  label: string;
  value: number;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  backgroundColor?: string;
  disabled?: boolean;
  testID?: string;
}
