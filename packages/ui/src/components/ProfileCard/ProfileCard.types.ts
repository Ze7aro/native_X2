import type { ViewProps } from 'react-native';
import type { ReactNode } from 'react';

export interface ProfileCardProps extends ViewProps {
  avatar?: ReactNode;
  title: string;
  subtitle?: string;
  description?: string;
  actions?: Array<{
    label: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary';
  }>;
  children?: ReactNode;
  testID?: string;
}
