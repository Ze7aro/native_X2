import type { StyleProp, ViewStyle } from 'react-native';
import type { NotificationItem } from './Toast.types';

export interface NotificationCenterProps {
  notifications: NotificationItem[];
  onDismiss?: (id: string) => void;
  position?: 'top' | 'bottom';
  maxVisible?: number;
  gap?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
