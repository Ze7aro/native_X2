import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { DashboardCardProps, DashboardCardStatus } from '../DashboardCard';

export interface ChartDataPoint {
  id?: string;
  label: string;
  value: number;
  color?: string;
}

export type ChartCardType = 'bar' | 'line';

export interface ChartCardProps extends Omit<
  DashboardCardProps,
  'children' | 'status' | 'emptyMessage'
> {
  data: ChartDataPoint[];
  chartType?: ChartCardType;
  status?: DashboardCardStatus;
  emptyMessage?: string;
  customChart?: ReactNode;
  chartHeight?: number;
  chartStyle?: StyleProp<ViewStyle>;
  minValue?: number;
  maxValue?: number;
  showLabels?: boolean;
  showGrid?: boolean;
  valueFormatter?: (value: number) => string;
  selectedIndex?: number;
  defaultSelectedIndex?: number;
  onPointPress?: (point: ChartDataPoint, index: number) => void;
}
