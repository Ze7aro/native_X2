import type { ReactNode } from 'react';

export interface PopoverProps {
  isOpen: boolean;
  onClose: () => void;
  anchor: ReactNode;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  offset?: number;
  closeLabel?: string;
  testID?: string;
}
