import type { ReactNode } from 'react';

export interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
}

export interface TabsVariantsProps {
  tabs: TabItem[];
  activeTabId: string;
  onTabPress: (tabId: string) => void;
  variant?: 'underline' | 'pill' | 'background' | 'icon-only' | 'archivero';
  indicatorColor?: string;
  backgroundColor?: string;
  children?: ReactNode;
  disabled?: boolean;
  testID?: string;
}
