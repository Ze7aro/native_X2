import React, { useMemo } from 'react';
import { View, Pressable, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { spacing } from '@react-x2-native/tokens';
import { X2Text } from '../../primitives/X2Text';
import type { StepperProps } from './Stepper.types';
import { useX2Strings } from '../../i18n/X2StringsProvider';

export function Stepper({
  steps,
  currentStep,
  onStepPress,
  variant = 'horizontal',
  showLabels = true,
  disabled = false,
  testID,
  style,
  ...props
}: StepperProps) {
  const strings = useX2Strings();
  const { colors } = useTheme();

  const getStepStatus = (index: number) => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'current';
    return 'pending';
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case 'completed':
        return colors.primary;
      case 'current':
        return colors.primary;
      case 'pending':
        return colors.surfaceVariant;
      default:
        return colors.surfaceVariant;
    }
  };

  const containerStyle: ViewStyle = useMemo(
    () => ({
      flexDirection: variant === 'vertical' ? 'column' : 'row',
      alignItems: variant === 'vertical' ? 'flex-start' : 'center',
      opacity: disabled ? 0.5 : 1,
      gap: spacing.md,
    }),
    [variant, disabled]
  );

  return (
    <View style={[containerStyle, style]} testID={testID} {...props}>
      {steps.map((step, index) => {
        const status = getStepStatus(index);
        const isCompleted = status === 'completed';
        const isCurrent = status === 'current';
        const color = getStepColor(status);

        return (
          <View
            key={step.id}
            style={{
              flexDirection: variant === 'vertical' ? 'column' : 'row',
              alignItems: variant === 'vertical' ? 'flex-start' : 'center',
              flex: variant === 'horizontal' ? 1 : undefined,
              width: variant === 'vertical' ? '100%' : undefined,
              gap: spacing.md,
            }}
          >
            {/* Step Circle */}
            <Pressable
              onPress={() => onStepPress?.(index, step.id)}
              disabled={disabled || !onStepPress}
              accessible
              accessibilityRole="button"
              accessibilityLabel={strings.stepLabel(index + 1, step.label)}
              accessibilityState={{ disabled }}
              testID={testID ? `${testID}-step-${index}` : undefined}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: color,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: isCurrent ? 2 : 0,
                borderColor: colors.primary,
              }}
            >
              <X2Text
                variant="labelM"
                color={isCompleted ? colors.onPrimary : colors.text}
                style={{ fontWeight: '600' }}
              >
                {isCompleted ? '✓' : index + 1}
              </X2Text>
            </Pressable>

            {/* Content */}
            <View
              style={{
                flex: variant === 'horizontal' ? 0 : 1,
                minWidth: variant === 'horizontal' ? 60 : undefined,
              }}
            >
              {showLabels && (
                <>
                  <X2Text variant="labelM" color={isCurrent ? colors.primary : colors.text}>
                    {step.label}
                  </X2Text>
                  {step.description && (
                    <X2Text variant="bodyS" color={colors.textSecondary}>
                      {step.description}
                    </X2Text>
                  )}
                </>
              )}
            </View>

            {/* Connector */}
            {index < steps.length - 1 && (
              <View
                style={{
                  position: 'absolute',
                  [variant === 'vertical' ? 'left' : 'top']: 20,
                  [variant === 'vertical' ? 'top' : 'left']: 40,
                  width: variant === 'vertical' ? 2 : '100%',
                  height: variant === 'vertical' ? '100%' : 2,
                  backgroundColor: isCompleted ? colors.primary : colors.surfaceVariant,
                  pointerEvents: 'none',
                }}
              />
            )}
          </View>
        );
      })}
    </View>
  );
}
