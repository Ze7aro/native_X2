import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { radius, spacing } from '@react-x2-native/tokens';
import { useTheme } from '../../theme/ThemeContext';
import { useX2Strings } from '../../i18n/X2StringsProvider';
import { errorMessage } from '../../utils/errorMessage';
import { X2Text } from '../../primitives/X2Text';
import { Modal } from '../Modal';
import type { StepDialogProps } from './StepDialog.types';

export function StepDialog({
  isOpen,
  onClose,
  title,
  steps,
  onFinish,
  step: stepProp,
  initialStep = 0,
  onStepChange,
  onError,
  backLabel: backLabelProp,
  nextLabel: nextLabelProp,
  finishLabel: finishLabelProp,
  cancelLabel: cancelLabelProp,
  size,
  closeLabel,
  testID,
}: StepDialogProps) {
  const strings = useX2Strings();
  const { colors } = useTheme();
  const backLabel = backLabelProp ?? strings.back;
  const nextLabel = nextLabelProp ?? strings.next;
  const finishLabel = finishLabelProp ?? strings.finish;
  const cancelLabel = cancelLabelProp ?? strings.cancel;

  const lastIndex = Math.max(steps.length - 1, 0);
  const [internalStep, setInternalStep] = useState(initialStep);
  const [error, setError] = useState<string | null>(null);
  const index = Math.min(Math.max(stepProp ?? internalStep, 0), lastIndex);
  const current = steps[index];
  const isFirst = index === 0;
  const isLast = index === lastIndex;

  useEffect(() => {
    if (!isOpen) {
      setInternalStep(initialStep);
      setError(null);
    }
  }, [isOpen, initialStep]);

  const goTo = (next: number) => {
    if (stepProp === undefined) setInternalStep(next);
    onStepChange?.(next);
  };

  const run = async (action: () => void | Promise<void>) => {
    setError(null);
    try {
      await action();
    } catch (caught) {
      setError(errorMessage(caught, strings.somethingWentWrong));
      throw caught; // keeps the Modal open
    }
  };

  if (!current) return null;

  const canContinue = current.canContinue !== false;

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
        isFirst
          ? { label: cancelLabel, variant: 'outline', onPress: () => undefined }
          : {
              label: backLabel,
              variant: 'outline',
              autoClose: false,
              onPress: () => {
                setError(null);
                goTo(index - 1);
              },
            },
        isLast
          ? {
              label: finishLabel,
              disabled: !canContinue,
              onPress: () =>
                run(async () => {
                  await current.onNext?.();
                  await onFinish();
                }),
            }
          : {
              label: nextLabel,
              autoClose: false,
              disabled: !canContinue,
              onPress: () =>
                run(async () => {
                  await current.onNext?.();
                  goTo(index + 1);
                }),
            },
      ]}
    >
      <View style={{ gap: spacing.md }}>
        <View
          accessibilityRole="progressbar"
          accessibilityLabel={strings.stepOf(index + 1, steps.length)}
          accessibilityValue={{ min: 1, max: steps.length, now: index + 1 }}
          style={{ flexDirection: 'row', gap: spacing.xs }}
          testID={testID ? `${testID}-progress` : undefined}
        >
          {steps.map((item, i) => (
            <View
              key={item.id}
              style={{
                flex: 1,
                height: 4,
                borderRadius: radius.sm,
                backgroundColor: i <= index ? colors.primary : colors.surfaceVariant,
              }}
            />
          ))}
        </View>

        <View style={{ gap: spacing.xs }}>
          <X2Text
            variant="labelS"
            color={colors.textSecondary}
            testID={testID ? `${testID}-step-label` : undefined}
          >
            {strings.stepOf(index + 1, steps.length)}
          </X2Text>
          <X2Text variant="headingS" color={colors.text} accessibilityRole="header">
            {current.title}
          </X2Text>
          {current.description && (
            <X2Text variant="bodyS" color={colors.textSecondary}>
              {current.description}
            </X2Text>
          )}
        </View>

        {current.content}

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
