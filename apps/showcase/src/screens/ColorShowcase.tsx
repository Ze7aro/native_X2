import React from 'react';
import { X2Surface, X2Text, X2Stack, useThemeColors } from 'react-x2-native';
import { spacing } from '@react-x2-native/tokens';

interface ColorSample {
  name: string;
  value: string;
}

export function ColorShowcase() {
  const colors = useThemeColors();

  const colorGroups: Array<{ label: string; colors: ColorSample[] }> = [
    {
      label: 'Primary',
      colors: [
        { name: 'Primary', value: colors.primary },
        { name: 'Primary Variant', value: colors.primaryVariant },
        { name: 'Primary Light', value: colors.primaryLight },
      ],
    },
    {
      label: 'Surface',
      colors: [
        { name: 'Background', value: colors.background },
        { name: 'Surface', value: colors.surface },
        { name: 'Surface Variant', value: colors.surfaceVariant },
      ],
    },
    {
      label: 'Text',
      colors: [
        { name: 'Text', value: colors.text },
        { name: 'Text Secondary', value: colors.textSecondary },
        { name: 'Text Tertiary', value: colors.textTertiary },
      ],
    },
    {
      label: 'Semantic',
      colors: [
        { name: 'Success', value: colors.success },
        { name: 'Warning', value: colors.warning },
        { name: 'Error', value: colors.error },
        { name: 'Info', value: colors.info },
      ],
    },
  ];

  return (
    <X2Surface style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.lg }}>
      <X2Text variant="headingL" style={{ marginBottom: spacing.md }}>
        Color Palette
      </X2Text>

      <X2Stack gap="lg">
        {colorGroups.map((group) => (
          <X2Stack key={group.label} gap="md">
            <X2Text variant="labelM" color={colors.primary}>
              {group.label}
            </X2Text>
            <X2Stack gap="sm">
              {group.colors.map((color) => (
                <X2Stack
                  key={color.name}
                  direction="row"
                  align="center"
                  gap="md"
                  style={{ height: 60 }}
                >
                  <X2Surface
                    backgroundColor={color.value}
                    borderRadius="sm"
                    style={{ width: 60, height: 60 }}
                  />
                  <X2Stack gap="xs" style={{ flex: 1 }}>
                    <X2Text variant="labelM">{color.name}</X2Text>
                    <X2Text variant="bodyS" color={colors.textSecondary}>
                      {color.value}
                    </X2Text>
                  </X2Stack>
                </X2Stack>
              ))}
            </X2Stack>
          </X2Stack>
        ))}
      </X2Stack>
    </X2Surface>
  );
}
