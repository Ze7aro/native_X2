import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { spacing, radius } from '@react-x2-native/tokens';
import { useTheme } from '../../theme/ThemeContext';
import { X2Text } from '../../primitives/X2Text';
import type { SearchFieldProps } from './SearchField.types';
import { useX2Strings } from '../../i18n/X2StringsProvider';

export function SearchField({
  value,
  defaultValue = '',
  onChangeText,
  onClear,
  placeholder: placeholderProp,
  clearLabel: clearLabelProp,
  placeholderTextColor,
  editable = true,
  containerStyle,
  testID,
  ...props
}: SearchFieldProps) {
  const strings = useX2Strings();
  const placeholder = placeholderProp ?? strings.search;
  const clearLabel = clearLabelProp ?? strings.clearSearch;
  const { colors } = useTheme();
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value ?? internalValue;

  const handleChangeText = useCallback(
    (nextValue: string) => {
      if (value === undefined) setInternalValue(nextValue);
      onChangeText?.(nextValue);
    },
    [onChangeText, value]
  );

  const handleClear = useCallback(() => {
    if (value === undefined) setInternalValue('');
    onClear?.();
    onChangeText?.('');
  }, [onChangeText, onClear, value]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          opacity: editable ? 1 : 0.55,
        },
        containerStyle,
      ]}
      testID={testID}
    >
      <X2Text variant="bodyM" color={colors.textSecondary} accessibilityElementsHidden>
        ⌕
      </X2Text>
      <TextInput
        {...props}
        value={currentValue}
        editable={editable}
        onChangeText={handleChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor ?? colors.textTertiary}
        accessibilityRole="search"
        style={[styles.input, { color: colors.text }]}
        testID={testID ? `${testID}-input` : undefined}
      />
      {currentValue.length > 0 && editable && (
        <Pressable
          onPress={handleClear}
          accessibilityRole="button"
          accessibilityLabel={clearLabel}
          hitSlop={8}
          style={styles.clearButton}
          testID={testID ? `${testID}-clear` : undefined}
        >
          <X2Text variant="labelM" color={colors.textSecondary}>
            ×
          </X2Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    minHeight: 42,
    paddingVertical: 0,
    fontSize: 15,
  },
  clearButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
