import type { ReactNode } from 'react';

export interface ModalAction {
  label: string;
  /** May be async: the modal stays open (busy) until it resolves, and stays open if it throws. */
  onPress: () => void | Promise<void>;
  variant?: 'solid' | 'outline' | 'destructive';
  /** Close the modal after `onPress` succeeds. Defaults to true. */
  autoClose?: boolean;
  /** Greys the action out and ignores presses. */
  disabled?: boolean;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  actions?: ModalAction[];
  size?: 'small' | 'medium' | 'large';
  /** When false, backdrop, back button and close button are blocked (e.g. while saving). Defaults to true. */
  dismissible?: boolean;
  /** Lift the modal above the keyboard. Defaults to true. */
  keyboardAvoiding?: boolean;
  /** Called when an action throws or rejects; the modal stays open. Without it the error is rethrown. */
  onActionError?: (error: unknown, action: ModalAction) => void;
  closeLabel?: string;
  testID?: string;
}
