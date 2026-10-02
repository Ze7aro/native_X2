import type { ReactNode } from 'react';
import type { ViewProps } from 'react-native';

export interface ReviewCardProps extends ViewProps {
  author: string;
  avatar?: ReactNode;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  date: string;
  onPress?: () => void;
  backgroundColor?: string;
  disabled?: boolean;
  testID?: string;
}
