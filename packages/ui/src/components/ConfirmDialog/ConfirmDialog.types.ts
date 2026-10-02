import type { ModalProps } from '../Modal/Modal.types';

export interface ConfirmDialogProps extends Pick<ModalProps, 'isOpen' | 'onClose' | 'size' | 'closeLabel' | 'testID'> {
  title: string;
  description?: string;
  /** Bullet list shown under the description, e.g. what will be lost. */
  consequences?: string[];
  /** The user must type this exact text (case-sensitive, trimmed) before confirming. */
  requireText?: string;
  /** Style the confirm button as destructive. */
  destructive?: boolean;
  /**
   * May be async. The dialog stays open and busy until it resolves, then closes.
   * If it throws, the dialog stays open and shows the error so the user can retry.
   */
  onConfirm: () => void | Promise<void>;
  onError?: (error: unknown) => void;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Label of the text input when `requireText` is set. Defaults to a localized "Type X to confirm". */
  requireTextLabel?: string;
}
