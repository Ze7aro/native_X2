import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export interface ToastAction {
  label: string;
  onPress: () => void;
  dismissOnPress?: boolean;
}

export interface ToastProps {
  isVisible?: boolean;
  defaultVisible?: boolean;
  title?: string;
  message: string;
  variant?: ToastVariant;
  /** Milliseconds before auto-dismiss. Defaults to 4000, or 7000 for errors. */
  duration?: number;
  autoDismiss?: boolean;
  action?: ToastAction;
  icon?: ReactNode;
  dismissible?: boolean;
  dismissLabel?: string;
  animationDuration?: number;
  onDismiss?: () => void;
  onDismissComplete?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export interface NotificationItem extends Omit<
  ToastProps,
  'isVisible' | 'defaultVisible' | 'onDismiss' | 'onDismissComplete'
> {
  id: string;
}

export type NotificationInput = Omit<NotificationItem, 'id'> & { id?: string };
