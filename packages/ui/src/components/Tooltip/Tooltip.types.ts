import type { ReactNode } from 'react';

export interface TooltipProps {
  text: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  backgroundColor?: string;
  delay?: number;
  dismissLabel?: string;
  testID?: string;
}
