import React from 'react';
import {
  X2Pressable,
  X2Stack,
  X2Surface,
  X2Text,
  useToast,
  useThemeColors,
  type ToastVariant,
} from 'react-x2-native';
import { spacing } from '@react-x2-native/tokens';

const messages: Record<ToastVariant, { title: string; message: string }> = {
  info: { title: 'New update', message: 'A new version is ready to review.' },
  success: { title: 'Saved', message: 'Your changes were saved successfully.' },
  warning: { title: 'Almost full', message: 'You are close to your storage limit.' },
  error: { title: 'Could not save', message: 'Check your connection and try again.' },
};

export function NotificationsShowcase() {
  const colors = useThemeColors();
  const { toast, clear } = useToast();

  const showNotification = (variant: ToastVariant) => {
    toast({
      ...messages[variant],
      variant,
      action: variant === 'success' ? { label: 'Undo', onPress: () => undefined } : undefined,
    });
  };

  return (
    <X2Surface style={{ padding: spacing.lg, minHeight: 360 }}>
      <X2Text variant="headingL" style={{ marginBottom: spacing.sm }}>
        Notifications
      </X2Text>
      <X2Text variant="bodyM" color={colors.textSecondary} style={{ marginBottom: spacing.lg }}>
        Global toasts via useToast(): stacked (up to 3), safe-area aware, 4 s auto-dismiss and 7 s
        for errors. Press several to see them stack.
      </X2Text>

      <X2Stack direction="row" gap="sm" style={{ flexWrap: 'wrap' }}>
        {(['info', 'success', 'warning', 'error'] as ToastVariant[]).map((variant) => (
          <X2Pressable
            key={variant}
            backgroundColor={colors[variant]}
            onPress={() => showNotification(variant)}
            style={{ paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: 8 }}
          >
            <X2Text variant="labelM" color={colors.onPrimary}>
              {variant}
            </X2Text>
          </X2Pressable>
        ))}
        <X2Pressable
          variant="outline"
          borderColor={colors.primary}
          onPress={clear}
          style={{ paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: 8 }}
        >
          <X2Text variant="labelM" color={colors.primary}>
            Clear all
          </X2Text>
        </X2Pressable>
      </X2Stack>
    </X2Surface>
  );
}
