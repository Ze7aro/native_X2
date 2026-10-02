import type { ReactNode } from 'react';

export interface ContextMenuAction {
  id: string;
  label: string;
  icon?: ReactNode;
  onPress: () => void;
  color?: string;
  destructive?: boolean;
}

export interface ContextMenuProps {
  actions: ContextMenuAction[];
  children: ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
  openLabel?: string;
  closeLabel?: string;
  testID?: string;
}
