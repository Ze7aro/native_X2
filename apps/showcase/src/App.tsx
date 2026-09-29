import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import {
  ThemeProvider,
  X2Surface,
  X2Text,
  X2Stack,
  X2Pressable,
  X2Divider,
  useThemeColors,
} from 'react-x2-native';
import { spacing } from '@react-x2-native/tokens';
import { TypographyShowcase } from './screens/TypographyShowcase';
import { SurfacesShowcase } from './screens/SurfacesShowcase';
import { ButtonsShowcase } from './screens/ButtonsShowcase';
import { ColorShowcase } from './screens/ColorShowcase';
import { SpotlightCardShowcase } from './screens/SpotlightCardShowcase';
import { TiltedCardShowcase } from './screens/TiltedCardShowcase';
import { ProfileCardShowcase } from './screens/ProfileCardShowcase';
import { ExpandableCardShowcase } from './screens/ExpandableCardShowcase';
import { DockShowcase } from './screens/DockShowcase';
import { AnimatedTabsShowcase } from './screens/AnimatedTabsShowcase';

type Section = 'typography' | 'surfaces' | 'buttons' | 'colors' | 'spotlight' | 'tilted' | 'profile' | 'expandable' | 'dock' | 'tabs';

function AppContent() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeSection, setActiveSection] = useState<Section>('typography');
  const colors = useThemeColors();

  const sections: Array<{ id: Section; label: string }> = [
    { id: 'typography', label: 'Typography' },
    { id: 'surfaces', label: 'Surfaces' },
    { id: 'buttons', label: 'Buttons' },
    { id: 'colors', label: 'Colors' },
    { id: 'spotlight', label: 'Spotlight' },
    { id: 'tilted', label: 'Tilted' },
    { id: 'profile', label: 'Profile' },
    { id: 'expandable', label: 'Expandable' },
    { id: 'dock', label: 'Dock' },
    { id: 'tabs', label: 'Tabs' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView>
        {/* Header */}
        <X2Surface
          style={{
            padding: spacing.lg,
            marginBottom: spacing.md,
            backgroundColor: colors.primary,
          }}
        >
          <X2Text
            variant="headingL"
            color="#FFF"
            style={{ marginBottom: spacing.sm }}
            testID="app-title"
          >
            react-X2-native
          </X2Text>
          <X2Text
            variant="bodyM"
            color="rgba(255,255,255,0.8)"
          >
            Component Showcase
          </X2Text>
        </X2Surface>

        {/* Theme Toggle */}
        <X2Stack
          direction="row"
          gap="md"
          justify="center"
          style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.lg }}
        >
          <X2Pressable
            backgroundColor={theme === 'light' ? colors.primary : colors.surfaceVariant}
            onPress={() => setTheme('light')}
            testID="btn-theme-light"
            style={{
              paddingVertical: spacing.md,
              paddingHorizontal: spacing.lg,
              borderRadius: 8,
            }}
          >
            <X2Text color={theme === 'light' ? '#FFF' : colors.text}>
              Light
            </X2Text>
          </X2Pressable>
          <X2Pressable
            backgroundColor={theme === 'dark' ? colors.primary : colors.surfaceVariant}
            onPress={() => setTheme('dark')}
            testID="btn-theme-dark"
            style={{
              paddingVertical: spacing.md,
              paddingHorizontal: spacing.lg,
              borderRadius: 8,
            }}
          >
            <X2Text color={theme === 'dark' ? '#FFF' : colors.text}>
              Dark
            </X2Text>
          </X2Pressable>
        </X2Stack>

        <X2Divider style={{ marginVertical: spacing.lg }} />

        {/* Section Navigation */}
        <X2Stack
          direction="row"
          gap="sm"
          style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.lg, flexWrap: 'wrap' }}
          justify="center"
        >
          {sections.map((section) => (
            <X2Pressable
              key={section.id}
              variant={activeSection === section.id ? 'solid' : 'outline'}
              backgroundColor={activeSection === section.id ? colors.primary : undefined}
              borderColor={colors.primary}
              onPress={() => setActiveSection(section.id)}
              style={{
                paddingVertical: spacing.sm,
                paddingHorizontal: spacing.md,
                borderRadius: 6,
              }}
            >
              <X2Text
                variant="labelM"
                color={activeSection === section.id ? '#FFF' : colors.primary}
              >
                {section.label}
              </X2Text>
            </X2Pressable>
          ))}
        </X2Stack>

        <X2Divider style={{ marginVertical: spacing.lg }} />

        {/* Section Content */}
        {activeSection === 'typography' && <TypographyShowcase />}
        {activeSection === 'surfaces' && <SurfacesShowcase />}
        {activeSection === 'buttons' && <ButtonsShowcase />}
        {activeSection === 'colors' && <ColorShowcase />}
        {activeSection === 'spotlight' && <SpotlightCardShowcase />}
        {activeSection === 'tilted' && <TiltedCardShowcase />}
        {activeSection === 'profile' && <ProfileCardShowcase />}
        {activeSection === 'expandable' && <ExpandableCardShowcase />}
        {activeSection === 'dock' && <DockShowcase />}
        {activeSection === 'tabs' && <AnimatedTabsShowcase />}

        {/* Footer */}
        <X2Surface
          style={{
            padding: spacing.lg,
            marginTop: spacing.xl,
            backgroundColor: colors.surfaceVariant,
          }}
        >
          <X2Text
            variant="bodyS"
            color={colors.textSecondary}
            style={{ textAlign: 'center' }}
          >
            Phase 2: MVP Components (6 of 10 complete)
          </X2Text>
        </X2Surface>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <ThemeProvider theme={theme}>
      <AppContent />
    </ThemeProvider>
  );
}
