import React, { useState } from 'react';
import { TiltedCard, X2Surface, X2Text, X2Stack, useThemeColors } from 'react-x2-native';
import { spacing } from '@react-x2-native/tokens';

export function TiltedCardShowcase() {
  const colors = useThemeColors();
  const [lastTilt, setLastTilt] = useState({ x: 0, y: 0 });
  const [pressCount, setPressCount] = useState(0);

  return (
    <X2Surface style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.lg }}>
      <X2Text variant="headingL" style={{ marginBottom: spacing.md }}>
        TiltedCard
      </X2Text>

      <X2Stack gap="lg">
        {/* Basic Example */}
        <X2Stack gap="md">
          <X2Text variant="labelM" color={colors.primary}>
            3D Tilt Effect
          </X2Text>
          <TiltedCard
            testID="tilted-basic"
            maxTilt={15}
            intensity={0.8}
            onPress={() => setPressCount((c) => c + 1)}
            onTilt={(x, y) => setLastTilt({ x, y })}
            accessibilityLabel="3D tilted card"
            style={{
              height: 200,
              padding: spacing.lg,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <X2Stack align="center" gap="md">
              <X2Text variant="headingM" style={{ textAlign: 'center' }}>
                Tilted Card
              </X2Text>
              <X2Text variant="bodyM" color={colors.textSecondary} style={{ textAlign: 'center' }}>
                Move to tilt
              </X2Text>
              <X2Text variant="bodyS" color={colors.primary} style={{ textAlign: 'center' }}>
                Pressed {pressCount} times
              </X2Text>
            </X2Stack>
          </TiltedCard>
        </X2Stack>

        {/* Tilt Values */}
        <X2Surface backgroundColor={colors.surfaceVariant} style={{ padding: spacing.md }}>
          <X2Text variant="labelM" color={colors.primary}>
            Current Tilt Values
          </X2Text>
          <X2Text variant="bodyS">
            RotateX: {lastTilt.x.toFixed(1)}° | RotateY: {lastTilt.y.toFixed(1)}°
          </X2Text>
        </X2Surface>

        {/* Max Tilt Variations */}
        <X2Stack gap="md">
          <X2Text variant="labelM" color={colors.primary}>
            Max Tilt Variations
          </X2Text>

          <TiltedCard
            maxTilt={5}
            intensity={1}
            style={{
              height: 140,
              padding: spacing.lg,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <X2Text variant="bodyM" style={{ textAlign: 'center' }}>
              Low Tilt (5°)
            </X2Text>
          </TiltedCard>

          <TiltedCard
            maxTilt={15}
            intensity={1}
            style={{
              height: 140,
              padding: spacing.lg,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <X2Text variant="bodyM" style={{ textAlign: 'center' }}>
              Medium Tilt (15°)
            </X2Text>
          </TiltedCard>

          <TiltedCard
            maxTilt={30}
            intensity={1}
            style={{
              height: 140,
              padding: spacing.lg,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <X2Text variant="bodyM" style={{ textAlign: 'center' }}>
              High Tilt (30°)
            </X2Text>
          </TiltedCard>
        </X2Stack>

        {/* Intensity Variations */}
        <X2Stack gap="md">
          <X2Text variant="labelM" color={colors.primary}>
            Intensity Variations
          </X2Text>

          <TiltedCard
            maxTilt={15}
            intensity={0.3}
            style={{
              height: 140,
              padding: spacing.lg,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <X2Text variant="bodyM" style={{ textAlign: 'center' }}>
              Low Intensity (0.3)
            </X2Text>
          </TiltedCard>

          <TiltedCard
            maxTilt={15}
            intensity={0.8}
            style={{
              height: 140,
              padding: spacing.lg,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <X2Text variant="bodyM" style={{ textAlign: 'center' }}>
              Medium Intensity (0.8)
            </X2Text>
          </TiltedCard>
        </X2Stack>

        {/* Disabled State */}
        <X2Stack gap="md">
          <X2Text variant="labelM" color={colors.primary}>
            Disabled State
          </X2Text>
          <TiltedCard
            disabled
            style={{
              height: 140,
              padding: spacing.lg,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <X2Text variant="bodyM" style={{ textAlign: 'center' }}>
              Disabled Card
            </X2Text>
          </TiltedCard>
        </X2Stack>

        {/* Documentation */}
        <X2Surface backgroundColor={colors.surfaceVariant} style={{ padding: spacing.lg }}>
          <X2Text variant="labelM" color={colors.primary} style={{ marginBottom: spacing.sm }}>
            Features
          </X2Text>
          <X2Stack gap="xs">
            <X2Text variant="bodyS">✓ 3D perspective tilt effect</X2Text>
            <X2Text variant="bodyS">✓ Respects reduce motion preferences</X2Text>
            <X2Text variant="bodyS">✓ Smooth spring animations</X2Text>
            <X2Text variant="bodyS">✓ Full accessibility support</X2Text>
            <X2Text variant="bodyS">✓ Customizable max tilt & intensity</X2Text>
            <X2Text variant="bodyS">✓ Returns to center on release</X2Text>
          </X2Stack>
        </X2Surface>
      </X2Stack>
    </X2Surface>
  );
}
