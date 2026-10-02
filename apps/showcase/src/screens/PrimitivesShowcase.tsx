import React from 'react';
import {
  X2Surface,
  X2Text,
  X2Stack,
  X2Pressable,
  X2Divider,
  X2Icon,
  useTheme,
} from 'react-x2-native';
import { spacing } from '@react-x2-native/tokens';

export function PrimitivesShowcase() {
  const { colors } = useTheme();

  return (
    <X2Surface style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.xl }}>
      {/* Typography */}
      <X2Text
        variant="headingM"
        style={{ marginTop: spacing.lg, marginBottom: spacing.md }}
      >
        Typography
      </X2Text>
      <X2Stack gap="sm" style={{ marginBottom: spacing.lg }}>
        <X2Text variant="headingXL">Heading XL</X2Text>
        <X2Text variant="headingL">Heading L</X2Text>
        <X2Text variant="headingM">Heading M</X2Text>
        <X2Text variant="bodyL">Body L - This is a larger body text</X2Text>
        <X2Text variant="bodyM">Body M - Standard body text size</X2Text>
        <X2Text variant="bodyS">Body S - Small body text</X2Text>
        <X2Text variant="labelL" color={colors.primary}>Label L</X2Text>
        <X2Text variant="labelM" color={colors.primary}>Label M</X2Text>
      </X2Stack>

      <X2Divider style={{ marginVertical: spacing.lg }} />

      {/* Surfaces */}
      <X2Text
        variant="headingM"
        style={{ marginBottom: spacing.md }}
      >
        Surfaces
      </X2Text>
      <X2Stack gap="md" style={{ marginBottom: spacing.lg }}>
        <X2Surface
          borderRadius="md"
          style={{ padding: spacing.md, height: 80 }}
        >
          <X2Text variant="bodyM">Default Surface</X2Text>
        </X2Surface>
        <X2Surface
          backgroundColor={colors.primary}
          borderRadius="lg"
          elevationLevel="md"
          style={{ padding: spacing.md, height: 80 }}
        >
          <X2Text variant="bodyM" color={colors.onPrimary}>
            Primary Surface with Elevation
          </X2Text>
        </X2Surface>
      </X2Stack>

      <X2Divider style={{ marginVertical: spacing.lg }} />

      {/* Pressables */}
      <X2Text
        variant="headingM"
        style={{ marginBottom: spacing.md }}
      >
        Buttons
      </X2Text>
      <X2Stack gap="md" style={{ marginBottom: spacing.lg }}>
        <X2Pressable
          style={{
            paddingVertical: spacing.md,
            paddingHorizontal: spacing.lg,
            borderRadius: 8,
          }}
        >
          <X2Text color={colors.onPrimary} variant="labelL">
            Primary Button
          </X2Text>
        </X2Pressable>
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

      <X2Divider style={{ marginVertical: spacing.lg }} />

      {/* Stacks */}
      <X2Text
        variant="headingM"
        style={{ marginBottom: spacing.md }}
      >
        Stacks & Layout
      </X2Text>
      <X2Surface
        borderRadius="md"
        style={{
          padding: spacing.md,
          marginBottom: spacing.lg,
        }}
      >
        <X2Stack direction="row" gap="md" justify="space-between">
          <X2Stack gap="sm">
            <X2Text variant="labelM">Horizontal Stack</X2Text>
            <X2Text variant="bodyS" color={colors.textSecondary}>
              With gap and justify
            </X2Text>
          </X2Stack>
          <X2Icon name="→" size={20} />
        </X2Stack>
      </X2Surface>

      {/* Icons */}
      <X2Text
        variant="headingM"
        style={{ marginBottom: spacing.md }}
      >
        Icons
      </X2Text>
      <X2Stack
        direction="row"
        gap="lg"
        justify="center"
        style={{ marginBottom: spacing.lg }}
      >
        <X2Icon name="★" size={32} />
        <X2Icon name="♥" size={32} color={colors.error} />
        <X2Icon name="✓" size={32} color={colors.success} />
        <X2Icon name="⚙" size={32} color={colors.primary} />
      </X2Stack>

      <X2Text
        variant="bodyS"
        color={colors.textTertiary}
        style={{ marginTop: spacing.lg, textAlign: 'center' }}
      >
        Primitives showcase complete
      </X2Text>
    </X2Surface>
  );
}
