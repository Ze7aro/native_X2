import React, { createContext, useContext, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNotificationCenter } from '../../hooks/useNotificationCenter';
import { NotificationCenter } from './NotificationCenter';
import type { NotificationInput, ToastVariant } from './Toast.types';

export type ToastOptions = Omit<NotificationInput, 'message' | 'variant'>;

export interface ToastApi {
  /** Shows a toast and returns its id. A plain string is an info toast. */
  toast: (input: string | NotificationInput) => string;
  info: (message: string, options?: ToastOptions) => string;
  success: (message: string, options?: ToastOptions) => string;
  warning: (message: string, options?: ToastOptions) => string;
  error: (message: string, options?: ToastOptions) => string;
  dismiss: (id: string) => void;
  clear: () => void;
}

export interface ToastProviderProps {
  children: React.ReactNode;
  position?: 'top' | 'bottom';
  /** Toasts shown at once; extra ones wait their turn. Defaults to 3. */
  maxVisible?: number;
}

const ToastContext = createContext<ToastApi | null>(null);

/**
 * Global toast host. Mount it inside `SafeAreaProvider` and `ThemeProvider`.
 * Put it outside `OverlayProvider` if toasts should appear above modals and sheets.
 */
export function ToastProvider({ children, position = 'top', maxVisible = 3 }: ToastProviderProps) {
  const { notifications, notify, dismiss, clear } = useNotificationCenter();

  const api = useMemo<ToastApi>(() => {
    const withVariant = (variant: ToastVariant) => (message: string, options?: ToastOptions) =>
      notify({ ...options, message, variant });
    return {
      toast: (input) => notify(typeof input === 'string' ? { message: input } : input),
      info: withVariant('info'),
      success: withVariant('success'),
      warning: withVariant('warning'),
      error: withVariant('error'),
      dismiss,
      clear,
    };
  }, [notify, dismiss, clear]);

  return (
    <ToastContext.Provider value={api}>
      <View style={styles.root}>
        {children}
        <NotificationCenter
          notifications={notifications}
          onDismiss={dismiss}
          position={position}
          maxVisible={maxVisible}
        />
      </View>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastApi {
  const api = useContext(ToastContext);
  if (!api) throw new Error('useToast must be used inside <ToastProvider>');
  return api;
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
