import type { ViewProps } from 'react-native';

export interface BreadcrumbItem {
  id: string;
  label: string;
  onPress?: () => void | undefined;
}

export interface BreadcrumbsProps extends ViewProps {
  items: BreadcrumbItem[];
  separator?: string;
  maxItems?: number;
  onNavigate?: (id: string) => void;
  testID?: string;
}
