import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { spacing } from '@react-x2-native/tokens';
import { useTheme } from '../../theme/ThemeContext';
import { useX2Strings } from '../../i18n/X2StringsProvider';
import { X2Text } from '../../primitives/X2Text';
import { FormField } from '../FormField';
import { Modal } from '../Modal';
import type { ConfirmDialogProps } from './ConfirmDialog.types';

const messageOf = (error: unknown, fallback: string) =>
  error instanceof Error && error.message ? error.message : fallback;

export function ConfirmDialog({
  isOpen,
  onClose,
  title,
  description,
  consequences,
  requireText,
  destructive = false,
  onConfirm,
  onError,
  confirmLabel: confirmLabelProp,
  cancelLabel: cancelLabelProp,
  requireTextLabel: requireTextLabelProp,
  size,
  closeLabel,
  testID,
}: ConfirmDialogProps) {
  const strings = useX2Strings();
  const { colors } = useTheme();
  const confirmLabel = confirmLabelProp ?? strings.confirm;
  const cancelLabel = cancelLabelProp ?? strings.cancel;
  const requireTextLabel = requireTextLabelProp ?? (requireText ? strings.typeToConfirm(requireText) : undefined);

  const [typed, setTyped] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setTyped('');
      setError(null);
    }
  }, [isOpen]);

  const textMatches = requireText === undefined || typed.trim() === requireText;

  const handleConfirm = async () => {
    setError(null);
    try {
      await onConfirm();
    } catch (caught) {
      setError(messageOf(caught, strings.somethingWentWrong));
      throw caught; // keeps the Modal open
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size={size}
      closeLabel={closeLabel}
      testID={testID}
      onActionError={(caught) => onError?.(caught)}
      actions={[
        { label: cancelLabel, variant: 'outline', onPress: () => undefined },
        {
          label: confirmLabel,
          variant: destructive ? 'destructive' : 'solid',
          disabled: !textMatches,
          onPress: handleConfirm,
        },
      ]}
    >
      <View style={{ gap: spacing.md }}>
        {description && (
          <X2Text variant="bodyM" color={colors.text}>
            {description}
          </X2Text>
        )}

        {consequences && consequences.length > 0 && (
          <View style={{ gap: spacing.xs }} testID={testID ? `${testID}-consequences` : undefined}>
            {consequences.map((item) => (
              <X2Text key={item} variant="bodyS" color={colors.textSecondary}>
                {`•  ${item}`}
              </X2Text>
            ))}
          </View>
        )}

        {requireText !== undefined && (
          <FormField
            label={requireTextLabel}
            value={typed}
            onChangeText={setTyped}
            autoCapitalize="none"
            autoCorrect={false}
            testID={testID ? `${testID}-input` : undefined}
          />
        )}

        {error && (
          <X2Text
            variant="bodyS"
            color={colors.error}
            accessibilityRole="alert"
            testID={testID ? `${testID}-error` : undefined}
          >
            {error}
          </X2Text>
        )}
      </View>
    </Modal>
  );
}
