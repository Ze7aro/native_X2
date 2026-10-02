import React, { useEffect, useId } from 'react';
import type { ReactNode } from 'react';
import { Modal } from 'react-native';
import { useOverlayStore } from './OverlayProvider';

export interface OverlayLayerProps {
  visible: boolean;
  /** Back button (Android) or system dismiss. Pass a no-op to block it. */
  onRequestClose?: () => void;
  /** Only used by the native `<Modal>` fallback. */
  animationType?: 'none' | 'fade' | 'slide';
  testID?: string;
  children: ReactNode;
}

/**
 * Renders children above the app. Inside an `OverlayProvider` it portals to the shared host;
 * without one it falls back to RN's native `<Modal>` so existing apps keep working.
 */
export function OverlayLayer({
  visible,
  onRequestClose,
  animationType = 'none',
  testID,
  children,
}: OverlayLayerProps) {
  const store = useOverlayStore();
  const id = useId();

  useEffect(() => {
    if (!store) return;
    if (visible) store.set({ id, node: children, onRequestClose, testID });
    else store.remove(id);
  });

  useEffect(() => {
    if (!store) return undefined;
    return () => store.remove(id);
  }, [store, id]);

  if (store) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType={animationType}
      statusBarTranslucent
      onRequestClose={onRequestClose}
      testID={testID}
    >
      {children}
    </Modal>
  );
}
