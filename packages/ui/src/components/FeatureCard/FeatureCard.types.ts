import type { ReactNode } from 'react';
import type { ViewProps } from 'react-native';

export interface FeatureCardProps extends ViewProps {
  icon: ReactNode;
  title: string;
  description: string;
  onPress?: () => void;
  backgroundColor?: string;
  variant?: 'default' | 'compact' | 'highlighted';
  disabled?: boolean;
  testID?: string;
}
