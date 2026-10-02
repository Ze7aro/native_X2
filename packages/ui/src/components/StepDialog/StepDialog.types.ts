import type { ReactNode } from 'react';
import type { ModalProps } from '../Modal/Modal.types';

export interface StepDialogStep {
  id: string;
  title: string;
  description?: string;
  content: ReactNode;
  /** Set to false to disable "Next"/"Finish" until the step is valid. Defaults to true. */
  canContinue?: boolean;
  /**
   * Runs before moving on (or finishing). May be async; if it throws, the dialog stays on this step
   * and shows the error.
   */
  onNext?: () => void | Promise<void>;
}

export interface StepDialogProps extends Pick<ModalProps, 'isOpen' | 'onClose' | 'size' | 'closeLabel' | 'testID'> {
  title: string;
  steps: StepDialogStep[];
  /** Runs on the last step. May be async; the dialog closes when it resolves and stays open if it throws. */
  onFinish: () => void | Promise<void>;
  /** Controlled step index. Omit to let the dialog manage it. */
  step?: number;
  initialStep?: number;
  onStepChange?: (index: number) => void;
  onError?: (error: unknown) => void;
  backLabel?: string;
  nextLabel?: string;
  finishLabel?: string;
  cancelLabel?: string;
}
