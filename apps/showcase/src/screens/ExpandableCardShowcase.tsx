import { useState } from 'react';
import {
  ExpandableCard,
  X2Surface,
  X2Text,
  X2Stack,
  X2Icon,
  useThemeColors,
} from 'react-x2-native';
import { spacing } from '@react-x2-native/tokens';

export function ExpandableCardShowcase() {
  const colors = useThemeColors();
  const [controlledExpanded, setControlledExpanded] = useState(false);
  const [expandLog, setExpandLog] = useState<string[]>([]);

  const addLog = (action: string) => {
    setExpandLog((prev) => [action, ...prev.slice(0, 4)]);
  };

  return (
    <X2Surface style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.lg }}>
      <X2Text variant="headingL" style={{ marginBottom: spacing.md }}>
        ExpandableCard
      </X2Text>

      <X2Stack gap="lg">
        {/* Uncontrolled Example */}
        <X2Stack gap="md">
          <X2Text variant="labelM" color={colors.primary}>
            Uncontrolled (defaultExpanded)
          </X2Text>
          <ExpandableCard
            testID="expandable-uncontrolled"
            defaultExpanded={false}
            onToggle={(expanded) => addLog(`Uncontrolled: ${expanded ? 'opened' : 'closed'}`)}
            header={
              <X2Stack direction="row" justify="space-between" align="center">
                <X2Text variant="labelL">Why React Native?</X2Text>
                <X2Icon name="▼" size={16} color={colors.primary} />
              </X2Stack>
            }
          >
            <X2Text variant="bodyS" color={colors.textSecondary}>
              React Native lets you build mobile apps using JavaScript and React. It's fast,
              maintainable, and allows code sharing between iOS and Android platforms.
            </X2Text>
          </ExpandableCard>
        </X2Stack>

        {/* Controlled Example */}
        <X2Stack gap="md">
          <X2Text variant="labelM" color={colors.primary}>
            Controlled (expanded prop)
          </X2Text>
          <ExpandableCard
            testID="expandable-controlled"
            expanded={controlledExpanded}
            onToggle={(expanded) => {
              setControlledExpanded(expanded);
              addLog(`Controlled: ${expanded ? 'opened' : 'closed'}`);
            }}
            header={
              <X2Stack direction="row" justify="space-between" align="center">
                <X2Text variant="labelL">Getting Started</X2Text>
                <X2Icon name={controlledExpanded ? '▲' : '▼'} size={16} color={colors.primary} />
              </X2Stack>
            }
          >
            <X2Stack gap="md">
              <X2Text variant="bodyS" color={colors.textSecondary}>
                Start by installing Expo CLI and creating a new project.
              </X2Text>
              <X2Stack gap="xs">
                <X2Text variant="labelM">Steps:</X2Text>
                <X2Text variant="bodyS">1. npm install -g expo-cli</X2Text>
                <X2Text variant="bodyS">2. expo init MyApp</X2Text>
                <X2Text variant="bodyS">3. cd MyApp && npm start</X2Text>
              </X2Stack>
            </X2Stack>
          </ExpandableCard>
        </X2Stack>

        {/* Multiple Sections */}
        <X2Stack gap="md">
          <X2Text variant="labelM" color={colors.primary}>
            Multiple Sections (FAQ)
          </X2Text>

          <ExpandableCard
            defaultExpanded={true}
            header={
              <X2Stack direction="row" justify="space-between" align="center">
                <X2Text variant="labelL">What is Reanimated?</X2Text>
                <X2Icon name="▼" size={16} color={colors.primary} />
              </X2Stack>
            }
          >
            <X2Text variant="bodyS" color={colors.textSecondary}>
              React Native Reanimated provides a more powerful and flexible way to create animations
              in React Native with 60 FPS performance.
            </X2Text>
          </ExpandableCard>

          <ExpandableCard
            defaultExpanded={false}
            header={
              <X2Stack direction="row" justify="space-between" align="center">
                <X2Text variant="labelL">How do gestures work?</X2Text>
                <X2Icon name="▼" size={16} color={colors.primary} />
              </X2Stack>
            }
          >
            <X2Text variant="bodyS" color={colors.textSecondary}>
              Gesture Handler tracks user interactions like pan, pinch, and rotation. Combined with
              Reanimated, you can create smooth, responsive gesture-driven interactions.
            </X2Text>
          </ExpandableCard>

          <ExpandableCard
            defaultExpanded={false}
            header={
              <X2Stack direction="row" justify="space-between" align="center">
                <X2Text variant="labelL">What about accessibility?</X2Text>
                <X2Icon name="▼" size={16} color={colors.primary} />
              </X2Stack>
            }
          >
            <X2Text variant="bodyS" color={colors.textSecondary}>
              All components respect accessibility standards. Screen readers announce
              expanded/collapsed states, and keyboard navigation is fully supported.
            </X2Text>
          </ExpandableCard>
        </X2Stack>

        {/* Disabled State */}
        <X2Stack gap="md">
          <X2Text variant="labelM" color={colors.primary}>
            Disabled State
          </X2Text>
          <ExpandableCard disabled header={<X2Text variant="labelL">Cannot expand</X2Text>}>
            <X2Text variant="bodyS">This card is disabled</X2Text>
          </ExpandableCard>
        </X2Stack>

        {/* Action Log */}
        {expandLog.length > 0 && (
          <X2Surface backgroundColor={colors.surfaceVariant} style={{ padding: spacing.lg }}>
            <X2Text variant="labelM" color={colors.primary} style={{ marginBottom: spacing.sm }}>
              Recent Actions
            </X2Text>
            <X2Stack gap="xs">
              {expandLog.map((log, idx) => (
                <X2Text key={idx} variant="bodyS" color={colors.textSecondary}>
                  {log}
                </X2Text>
              ))}
            </X2Stack>
          </X2Surface>
        )}

        {/* Documentation */}
        <X2Surface backgroundColor={colors.surfaceVariant} style={{ padding: spacing.lg }}>
          <X2Text variant="labelM" color={colors.primary} style={{ marginBottom: spacing.sm }}>
            Features
          </X2Text>
          <X2Stack gap="xs">
            <X2Text variant="bodyS">✓ Smooth height animation (spring)</X2Text>
            <X2Text variant="bodyS">✓ Controlled & uncontrolled modes</X2Text>
            <X2Text variant="bodyS">✓ Respects reduce motion preferences</X2Text>
            <X2Text variant="bodyS">✓ Full accessibility support</X2Text>
            <X2Text variant="bodyS">✓ Automatic height measurement</X2Text>
            <X2Text variant="bodyS">✓ Custom header & content</X2Text>
            <X2Text variant="bodyS">✓ Disabled state support</X2Text>
          </X2Stack>
        </X2Surface>
      </X2Stack>
    </X2Surface>
  );
}
