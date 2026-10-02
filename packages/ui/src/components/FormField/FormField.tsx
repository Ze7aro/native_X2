import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputSubmitEditingEventData,
  View,
} from 'react-native';
import { radius, spacing } from '@react-x2-native/tokens';
import { useTheme } from '../../theme/ThemeContext';
import { X2Text } from '../../primitives/X2Text';
import type { FormFieldProps } from './FormField.types';
import { useX2Strings } from '../../i18n/X2StringsProvider';

export function FormField({
  label,
  description,
  helperText,
  error,
  required = false,
  validate,
  validateOn = 'blur',
  onValidationChange,
  value,
  defaultValue = '',
  onChangeText,
  onBlur,
  onSubmitEditing,
  disabled = false,
  loading = false,
  prefix,
  suffix,
  placeholderTextColor,
  editable = true,
  accessibilityLabel,
  accessibilityHint,
  containerStyle,
  inputContainerStyle,
  inputStyle,
  testID,
  ...props
}: FormFieldProps) {
  const strings = useX2Strings();
  const { colors } = useTheme();
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [validationError, setValidationError] = useState<string | undefined>();
  const currentValue = value ?? internalValue;
  const isEditable = editable && !disabled && !loading;
  const currentError = error ?? validationError;
  const invalid = Boolean(currentError);

  const runValidation = useCallback(
    (nextValue: string) => {
      const nextError =
        required && !nextValue.trim() ? strings.fieldRequired : validate?.(nextValue);
      setValidationError(nextError);
      onValidationChange?.(nextError);
      return nextError;
    },
    [onValidationChange, required, validate]
  );

  const handleChangeText = useCallback(
    (nextValue: string) => {
      if (value === undefined) setInternalValue(nextValue);
      onChangeText?.(nextValue);
      if (validateOn === 'change') runValidation(nextValue);
    },
    [onChangeText, runValidation, validateOn, value]
  );

  const handleBlur = useCallback(
    (event: Parameters<NonNullable<FormFieldProps['onBlur']>>[0]) => {
      if (validateOn === 'blur') runValidation(currentValue);
      onBlur?.(event);
    },
    [currentValue, onBlur, runValidation, validateOn]
  );

  const handleSubmitEditing = useCallback(
    (event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
      if (validateOn === 'submit') runValidation(currentValue);
      onSubmitEditing?.(event);
    },
    [currentValue, onSubmitEditing, runValidation, validateOn]
  );

  return (
    <View style={[styles.container, containerStyle]} testID={testID}>
      {label && (
        <X2Text
          variant="labelM"
          style={styles.label}
          testID={testID ? `${testID}-label` : undefined}
        >
          {label}
          {required ? ' *' : ''}
        </X2Text>
      )}
      {description && (
        <X2Text variant="bodyS" color={colors.textSecondary} style={styles.description}>
          {description}
        </X2Text>
      )}

      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: colors.surface,
            borderColor: invalid ? colors.error : colors.border,
            opacity: isEditable ? 1 : 0.55,
          },
          inputContainerStyle,
        ]}
      >
        {prefix && <View style={styles.adornment}>{prefix}</View>}
        <TextInput
          {...props}
          value={currentValue}
          editable={isEditable}
          onChangeText={handleChangeText}
          onBlur={handleBlur}
          onSubmitEditing={handleSubmitEditing}
          placeholderTextColor={placeholderTextColor ?? colors.textTertiary}
          accessibilityLabel={accessibilityLabel ?? label}
          accessibilityHint={
            currentError
              ? `${accessibilityHint ? `${accessibilityHint}. ` : ''}${currentError}`
              : accessibilityHint
          }
          accessibilityState={{ disabled: !isEditable }}
          style={[styles.input, { color: colors.text }, inputStyle]}
          testID={testID ? `${testID}-input` : undefined}
        />
        {loading ? (
          <ActivityIndicator
            color={colors.primary}
            size="small"
            testID={testID ? `${testID}-loading` : undefined}
          />
        ) : suffix ? (
          <View style={styles.adornment}>{suffix}</View>
        ) : null}
      </View>

      {currentError ? (
        <X2Text
          variant="bodyS"
          color={colors.error}
          accessibilityRole="alert"
          style={styles.message}
          testID={testID ? `${testID}-error` : undefined}
        >
          {currentError}
        </X2Text>
      ) : helperText ? (
        <X2Text variant="bodyS" color={colors.textSecondary} style={styles.message}>
          {helperText}
        </X2Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    marginBottom: spacing.xs,
  },
  description: {
    marginBottom: spacing.sm,
  },
  inputContainer: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    minHeight: 46,
    paddingVertical: spacing.sm,
    fontSize: 15,
  },
  adornment: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    marginTop: spacing.xs,
  },
});
