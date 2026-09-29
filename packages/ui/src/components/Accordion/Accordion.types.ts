import type { ReactNode } from 'react';
import type { ViewProps } from 'react-native';

export interface AccordionSection {
  id: string;
  title: string;
  content: ReactNode;
  icon?: ReactNode;
}

export interface AccordionProps extends ViewProps {
  sections: AccordionSection[];
  expandedIds?: string[];
  onExpandChange?: (expandedIds: string[]) => void;
  allowMultiple?: boolean;
  disabled?: boolean;
  testID?: string;
}
