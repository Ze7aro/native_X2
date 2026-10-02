import type { ReactNode } from 'react';

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  /**
   * Visible heights as fractions of the screen, e.g. `[0.4, 0.9]`. The sheet gets the largest height
   * and the user can drag it between the points. Omit it for a sheet sized by its content.
   * With snap points, put scrollable content in a `ScrollView`.
   */
  snapPoints?: number[];
  /** Index (in ascending order) of the snap point the sheet opens at. Defaults to 0. */
  initialSnapIndex?: number;
  /** Called when the user drags the sheet to a different snap point. */
  onSnapChange?: (index: number) => void;
  header?: ReactNode;
  enableBackdropPress?: boolean;
  /** When false, backdrop, back button and drag-to-close are blocked (e.g. while saving). Defaults to true. */
  dismissible?: boolean;
  /** Lift the sheet above the keyboard. Defaults to true. */
  keyboardAvoiding?: boolean;
  closeLabel?: string;
  testID?: string;
}
