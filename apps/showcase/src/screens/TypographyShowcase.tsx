import React from 'react';
import { X2Surface, X2Text, X2Stack, useThemeColors } from 'react-x2-native';
import { spacing } from '@react-x2-native/tokens';

export function TypographyShowcase() {
  const colors = useThemeColors();

  return (
    <X2Surface style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.lg }}>
      <X2Text variant="headingL" style={{ marginBottom: spacing.md }}>
        Typography System
      </X2Text>

      <X2Stack gap="lg" style={{ marginBottom: spacing.xl }}>
        {/* Headings */}
        <X2Stack gap="sm">
          <X2Text variant="labelM" color={colors.primary}>
            Headings
          </X2Text>
          <X2Text variant="headingXL" testID="heading-xl">
            Heading XL (32px)
          </X2Text>
          <X2Text variant="headingL" testID="heading-l">
            Heading L (28px)
          </X2Text>
          <X2Text variant="headingM" testID="heading-m">
            Heading M (22px)
          </X2Text>
          <X2Text variant="headingS" testID="heading-s">
            Heading S (18px)
          </X2Text>
        </X2Stack>

        {/* Body */}
        <X2Stack gap="sm">
          <X2Text variant="labelM" color={colors.primary}>
            Body Text
          </X2Text>
          <X2Text variant="bodyL">Body L (17px) — Larger body text for prominent content</X2Text>
          <X2Text variant="bodyM">Body M (15px) — Standard body text for regular content</X2Text>
          <X2Text variant="bodyS">Body S (13px) — Smaller body text for secondary content</X2Text>
        </X2Stack>

        {/* Labels */}
        <X2Stack gap="sm">
          <X2Text variant="labelM" color={colors.primary}>
            Labels
          </X2Text>
          <X2Text variant="labelL">Label L (13px bold)</X2Text>
          <X2Text variant="labelM">Label M (12px bold)</X2Text>
          <X2Text variant="labelS">Label S (11px bold)</X2Text>
        </X2Stack>

        {/* Semantic Colors */}
        <X2Stack gap="sm">
          <X2Text variant="labelM" color={colors.primary}>
            Semantic Colors
          </X2Text>
          <X2Text color={colors.success}>Success text (green)</X2Text>
          <X2Text color={colors.warning}>Warning text (orange)</X2Text>
          <X2Text color={colors.error}>Error text (red)</X2Text>
          <X2Text color={colors.info}>Info text (blue)</X2Text>
          <X2Text color={colors.textSecondary}>Secondary text (gray)</X2Text>
          <X2Text color={colors.textTertiary}>Tertiary text (lighter gray)</X2Text>
        </X2Stack>

        {/* Font Weights */}
        <X2Stack gap="sm">
          <X2Text variant="labelM" color={colors.primary}>
            Font Weights
          </X2Text>
          <X2Text variant="bodyM" weight="normal">
            Normal weight text
          </X2Text>
          <X2Text variant="bodyM" weight="bold">
            Bold weight text
          </X2Text>
        </X2Stack>
      </X2Stack>
    </X2Surface>
  );
}
