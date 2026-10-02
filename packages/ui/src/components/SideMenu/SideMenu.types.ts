import type { ReactNode } from 'react';

export interface SideMenuItemProps {
  id: string;
  label: string;
  icon?: ReactNode;
  onPress: () => void;
}

export interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: SideMenuItemProps[];
  header?: ReactNode;
  footer?: ReactNode;
  closeLabel?: string;
  testID?: string;
}
