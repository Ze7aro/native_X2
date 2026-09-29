import type { ReactNode } from 'react';
import type { ViewProps } from 'react-native';

export interface DockItem {
  id: string;
  label: string;
  icon: ReactNode;
  onPress: () => void;
}

export interface DockProps extends ViewProps {
  items: DockItem[];
  activeId: string;
  backgroundColor?: string;
  indicatorColor?: string;
  showLabels?: boolean;
  testID?: string;
}
