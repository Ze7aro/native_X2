import type { ViewProps } from 'react-native';
import type { ReactNode } from 'react';

export interface ExpandableCardProps extends ViewProps {
  header: ReactNode;
  children: ReactNode;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onToggle?: (expanded: boolean) => void;
  disabled?: boolean;
  accessibilityLabel?: string;
  testID?: string;
}
