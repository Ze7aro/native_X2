import React, { useState } from 'react';
import { X2Surface, X2Text, X2Stack, X2Pressable, useThemeColors } from 'react-x2-native';
import { spacing } from '@react-x2-native/tokens';

export function ButtonsShowcase() {
  const colors = useThemeColors();
  const [pressCount, setPressCount] = useState(0);

  return (
    <X2Surface style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.lg }}>
      <X2Text variant="headingL" style={{ marginBottom: spacing.md }}>
        Buttons
      </X2Text>

      <X2Stack gap="lg">
        {/* Solid Variant */}
        <X2Stack gap="md">
          <X2Text variant="labelM" color={colors.primary}>
            Solid Buttons
          </X2Text>
          <X2Pressable
            testID="btn-primary"
            style={{
              paddingVertical: spacing.md,
              paddingHorizontal: spacing.lg,
              borderRadius: 8,
            }}
          >
            <X2Text color="#FFF" variant="labelL">
              Primary Button
            </X2Text>
          </X2Pressable>
          <X2Pressable
            backgroundColor={colors.success}
            style={{
              paddingVertical: spacing.md,
              paddingHorizontal: spacing.lg,
              borderRadius: 8,
            }}
          >
            <X2Text color="#FFF" variant="labelL">
              Success Button
            </X2Text>
          </X2Pressable>
          <X2Pressable
            backgroundColor={colors.error}
            style={{
              paddingVertical: spacing.md,
              paddingHorizontal: spacing.lg,
              borderRadius: 8,
            }}
          >
            <X2Text color="#FFF" variant="labelL">
              Error Button
            </X2Text>
          </X2Pressable>
        </X2Stack>

        {/* Outline Variant */}
        <X2Stack gap="md">
          <X2Text variant="labelM" color={colors.primary}>
            Outline Buttons
          </X2Text>
          <X2Pressable
            variant="outline"
            borderColor={colors.primary}
            style={{
              paddingVertical: spacing.md,
              paddingHorizontal: spacing.lg,
              borderRadius: 8,
            }}
          >
            <X2Text color={colors.primary} variant="labelL">
              Outline Button
            </X2Text>
          </X2Pressable>
          <X2Pressable
            variant="outline"
            borderColor={colors.success}
            style={{
              paddingVertical: spacing.md,
              paddingHorizontal: spacing.lg,
              borderRadius: 8,
            }}
          >
            <X2Text color={colors.success} variant="labelL">
              Success Outline
            </X2Text>
          </X2Pressable>
        </X2Stack>

        {/* Ghost Variant */}
        <X2Stack gap="md">
          <X2Text variant="labelM" color={colors.primary}>
            Ghost Buttons
          </X2Text>
          <X2Pressable
            variant="ghost"
            style={{
              paddingVertical: spacing.md,
              paddingHorizontal: spacing.lg,
              borderRadius: 8,
            }}
          >
            <X2Text color={colors.primary} variant="labelL">
              Ghost Button
            </X2Text>
          </X2Pressable>
        </X2Stack>

        {/* Disabled State */}
        <X2Stack gap="md">
          <X2Text variant="labelM" color={colors.primary}>
            Disabled State
          </X2Text>
          <X2Pressable
            disabled
            style={{
              paddingVertical: spacing.md,
              paddingHorizontal: spacing.lg,
              borderRadius: 8,
            }}
          >
            <X2Text color={colors.textTertiary} variant="labelL">
              Disabled Button
            </X2Text>
          </X2Pressable>
        </X2Stack>

        {/* Interactive Example */}
        <X2Stack gap="md">
          <X2Text variant="labelM" color={colors.primary}>
            Interactive Example
          </X2Text>
          <X2Pressable
            testID="btn-counter"
            backgroundColor={colors.primary}
            onPress={() => setPressCount((c) => c + 1)}
            accessibilityLabel="Increment counter"
            style={{
              paddingVertical: spacing.md,
              paddingHorizontal: spacing.lg,
              borderRadius: 8,
            }}
          >
            <X2Text color="#FFF" variant="labelL">
              Pressed {pressCount} times
            </X2Text>
          </X2Pressable>
        </X2Stack>
      </X2Stack>
    </X2Surface>
  );
}
