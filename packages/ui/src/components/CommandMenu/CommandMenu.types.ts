import type { ReactNode } from 'react';

export interface CommandMenuItem {
  id: string;
  label: string;
  description?: string;
  keywords?: string[];
  icon?: ReactNode;
  shortcut?: string;
  group?: string;
  disabled?: boolean;
  destructive?: boolean;
  onPress: () => void;
}

export interface CommandMenuGroup {
  id: string;
  label: string;
  items: CommandMenuItem[];
}

export interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items?: CommandMenuItem[];
  groups?: CommandMenuGroup[];
  query?: string;
  defaultQuery?: string;
  onQueryChange?: (query: string) => void;
  title?: string;
  placeholder?: string;
  emptyMessage?: string;
  closeLabel?: string;
  maxHeight?: number;
  testID?: string;
}
