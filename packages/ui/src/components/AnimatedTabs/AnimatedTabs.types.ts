import type { ReactNode } from 'react';
import type { ViewProps } from 'react-native';

export interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
}

export interface AnimatedTabsProps extends ViewProps {
  tabs: TabItem[];
  activeTabId: string;
  onTabPress: (tabId: string) => void;
  children?: ReactNode;
  indicatorColor?: string;
  indicatorHeight?: number;
  showIcons?: boolean;
  disabled?: boolean;
  testID?: string;
}
