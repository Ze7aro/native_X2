import React from 'react';
import { X2Surface, X2Text, X2Stack, useThemeColors } from 'react-x2-native';
import { spacing, elevation } from '@react-x2-native/tokens';

export function SurfacesShowcase() {
  const colors = useThemeColors();

  return (
    <X2Surface style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.lg }}>
      <X2Text variant="headingL" style={{ marginBottom: spacing.md }}>
        Surfaces & Elevation
      </X2Text>

      <X2Stack gap="md">
        {/* Default Surface */}
        <X2Stack gap="sm">
          <X2Text variant="labelM" color={colors.primary}>
            Default Surface
          </X2Text>
          <X2Surface
            testID="surface-default"
            style={{
              padding: spacing.lg,
              height: 100,
              justifyContent: 'center',
            }}
          >
            <X2Text variant="bodyM">Default Surface (no elevation)</X2Text>
          </X2Surface>
        </X2Stack>

        {/* Elevation Levels */}
        <X2Stack gap="sm">
          <X2Text variant="labelM" color={colors.primary}>
            Elevation Levels
          </X2Text>
          {(Object.keys(elevation) as Array<keyof typeof elevation>).map((level) => (
            <X2Surface
              key={level}
              elevationLevel={level}
              testID={`surface-elevation-${level}`}
              style={{
                padding: spacing.md,
                height: 60,
                justifyContent: 'center',
              }}
            >
              <X2Text variant="bodyS">{level.charAt(0).toUpperCase() + level.slice(1)}</X2Text>
            </X2Surface>
          ))}
        </X2Stack>

        {/* Rounded Corners */}
        <X2Stack gap="sm">
          <X2Text variant="labelM" color={colors.primary}>
            Border Radius
          </X2Text>
          <X2Surface
            borderRadius="none"
            backgroundColor={colors.primary}
            style={{ padding: spacing.md, height: 60, justifyContent: 'center' }}
          >
            <X2Text color="#FFF" variant="labelM">
              None (0px)
            </X2Text>
          </X2Surface>
          <X2Surface
            borderRadius="sm"
            backgroundColor={colors.primary}
            style={{ padding: spacing.md, height: 60, justifyContent: 'center' }}
          >
            <X2Text color="#FFF" variant="labelM">
              Small (8px)
            </X2Text>
          </X2Surface>
          <X2Surface
            borderRadius="md"
            backgroundColor={colors.primary}
            style={{ padding: spacing.md, height: 60, justifyContent: 'center' }}
          >
            <X2Text color="#FFF" variant="labelM">
              Medium (12px)
            </X2Text>
          </X2Surface>
          <X2Surface
            borderRadius="lg"
            backgroundColor={colors.primary}
            style={{ padding: spacing.md, height: 60, justifyContent: 'center' }}
          >
            <X2Text color="#FFF" variant="labelM">
              Large (16px)
            </X2Text>
          </X2Surface>
          <X2Surface
            borderRadius="full"
            backgroundColor={colors.primary}
            style={{ width: 60, height: 60, justifyContent: 'center', alignItems: 'center' }}
          >
            <X2Text color="#FFF" variant="labelM">
              F
            </X2Text>
          </X2Surface>
        </X2Stack>

        {/* Borders */}
        <X2Stack gap="sm">
          <X2Text variant="labelM" color={colors.primary}>
            Borders
          </X2Text>
          <X2Surface
            borderColor={colors.primary}
            borderWidth={2}
            style={{ padding: spacing.md, height: 60, justifyContent: 'center' }}
          >
            <X2Text color={colors.primary} variant="labelM">
              2px Border
            </X2Text>
          </X2Surface>
        </X2Stack>
      </X2Stack>
    </X2Surface>
  );
}
