import type { ViewProps } from 'react-native';

export interface SegmentOption {
  id: string;
  label: string;
}

export interface SegmentedControlProps extends ViewProps {
  options: SegmentOption[];
  selectedId: string;
  onSelect: (id: string) => void;
  backgroundColor?: string;
  selectedBackgroundColor?: string;
  tintColor?: string;
  disabled?: boolean;
  testID?: string;
}
