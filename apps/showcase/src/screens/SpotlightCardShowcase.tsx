import React, { useState } from 'react';
import { SpotlightCard, X2Surface, X2Text, X2Stack, X2Pressable, useThemeColors } from 'react-x2-native';
import { spacing } from '@react-x2-native/tokens';

export function SpotlightCardShowcase() {
  const colors = useThemeColors();
  const [pressCount, setPressCount] = useState(0);
  const [lastGlow, setLastGlow] = useState({ x: 0, y: 0 });

  return (
    <X2Surface style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.lg }}>
      <X2Text variant="headingL" style={{ marginBottom: spacing.md }}>
        SpotlightCard
      </X2Text>

      <X2Stack gap="lg">
        {/* Basic Example */}
        <X2Stack gap="md">
          <X2Text variant="labelM" color={colors.primary}>
            Interactive Spotlight
          </X2Text>
          <SpotlightCard
            testID="spotlight-basic"
            intensity={0.8}
            radius={220}
            onPress={() => setPressCount((c) => c + 1)}
            onGlowMove={(x, y) => setLastGlow({ x, y })}
            accessibilityLabel="Interactive card with spotlight glow"
            style={{
              height: 200,
              padding: spacing.lg,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <X2Stack align="center" gap="md">
              <X2Text variant="headingM" style={{ textAlign: 'center' }}>
                Spotlight Card
              </X2Text>
              <X2Text
                variant="bodyM"
                color={colors.textSecondary}
                style={{ textAlign: 'center' }}
              >
                Move your finger over me
              </X2Text>
              <X2Text
                variant="bodyS"
                color={colors.primary}
                style={{ textAlign: 'center' }}
              >
                Pressed {pressCount} times
              </X2Text>
            </X2Stack>
          </SpotlightCard>
        </X2Stack>

        {/* Glow Position Info */}
        <X2Surface
          backgroundColor={colors.surfaceVariant}
          style={{ padding: spacing.md }}
        >
          <X2Text variant="labelM" color={colors.primary}>
            Last Glow Position
          </X2Text>
          <X2Text variant="bodyS">
            X: {Math.round(lastGlow.x)}, Y: {Math.round(lastGlow.y)}
          </X2Text>
        </X2Surface>

        {/* Intensity Variations */}
        <X2Stack gap="md">
          <X2Text variant="labelM" color={colors.primary}>
            Intensity Variations
          </X2Text>

          <SpotlightCard
            intensity={0.4}
            radius={180}
            style={{
              height: 140,
              padding: spacing.lg,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <X2Text variant="bodyM" style={{ textAlign: 'center' }}>
              Low Intensity (0.4)
            </X2Text>
          </SpotlightCard>

          <SpotlightCard
            intensity={0.7}
            radius={200}
            style={{
              height: 140,
              padding: spacing.lg,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <X2Text variant="bodyM" style={{ textAlign: 'center' }}>
              Medium Intensity (0.7)
            </X2Text>
          </SpotlightCard>

          <SpotlightCard
            intensity={1.0}
            radius={240}
            style={{
              height: 140,
              padding: spacing.lg,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <X2Text variant="bodyM" style={{ textAlign: 'center' }}>
              High Intensity (1.0)
            </X2Text>
          </SpotlightCard>
        </X2Stack>

        {/* Disabled State */}
        <X2Stack gap="md">
          <X2Text variant="labelM" color={colors.primary}>
            Disabled State
          </X2Text>
          <SpotlightCard
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
          </SpotlightCard>
        </X2Stack>

        {/* Documentation */}
        <X2Surface backgroundColor={colors.surfaceVariant} style={{ padding: spacing.lg }}>
          <X2Text variant="labelM" color={colors.primary} style={{ marginBottom: spacing.sm }}>
            Features
          </X2Text>
          <X2Stack gap="xs">
            <X2Text variant="bodyS">✓ Interactive glow that follows touch</X2Text>
            <X2Text variant="bodyS">✓ Respects reduce motion preferences</X2Text>
            <X2Text variant="bodyS">✓ Smooth spring animations</X2Text>
            <X2Text variant="bodyS">✓ Full accessibility support</X2Text>
            <X2Text variant="bodyS">✓ Press feedback with scale animation</X2Text>
            <X2Text variant="bodyS">✓ Customizable intensity & radius</X2Text>
          </X2Stack>
        </X2Surface>
      </X2Stack>
    </X2Surface>
  );
}
