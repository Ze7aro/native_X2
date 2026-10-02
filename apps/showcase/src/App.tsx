import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  OverlayProvider,
  ThemeProvider,
  ToastProvider,
  X2StringsProvider,
  enStrings,
  esStrings,
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
import { SegmentedControlShowcase } from './screens/SegmentedControlShowcase';
import { CarouselShowcase } from './screens/CarouselShowcase';
import { AnimatedListShowcase } from './screens/AnimatedListShowcase';
import { AccordionShowcase } from './screens/AccordionShowcase';
import { ExtendedCardsShowcase } from './screens/ExtendedCardsShowcase';
import { ExtendedNavigationShowcase } from './screens/ExtendedNavigationShowcase';
import { ExtendedCollectionsShowcase } from './screens/ExtendedCollectionsShowcase';
import { OverlaysShowcase } from './screens/OverlaysShowcase';
import { DataTableShowcase } from './screens/DataTableShowcase';
import { NotificationsShowcase } from './screens/NotificationsShowcase';
import { FormFieldShowcase } from './screens/FormFieldShowcase';
import { CommandMenuShowcase } from './screens/CommandMenuShowcase';
import { DashboardCardShowcase } from './screens/DashboardCardShowcase';
import { ChartCardShowcase } from './screens/ChartCardShowcase';

type Section =
  | 'typography'
  | 'surfaces'
  | 'buttons'
  | 'colors'
  | 'spotlight'
  | 'tilted'
  | 'profile'
  | 'expandable'
  | 'dock'
  | 'tabs'
  | 'segmented'
  | 'carousel'
  | 'list'
  | 'accordion'
  | 'extended-cards'
  | 'extended-nav'
  | 'extended-collections'
  | 'overlays'
  | 'data-table'
  | 'notifications'
  | 'form-field'
  | 'command-menu'
  | 'dashboard-card'
  | 'chart-card';

type ThemeName = 'light' | 'dark';
type LangName = 'en' | 'es';

const sectionGroups: Array<{
  id: string;
  label: string;
  items: Array<{ id: Section; label: string }>;
}> = [
  {
    id: 'foundation',
    label: 'Foundation',
    items: [
      { id: 'typography', label: 'Typography' },
      { id: 'surfaces', label: 'Surfaces' },
      { id: 'buttons', label: 'Buttons' },
      { id: 'colors', label: 'Colors' },
    ],
  },
  {
    id: 'effects',
    label: 'Effects and Cards',
    items: [
      { id: 'spotlight', label: 'Spotlight' },
      { id: 'tilted', label: 'Tilted' },
      { id: 'profile', label: 'Profile' },
      { id: 'expandable', label: 'Expandable' },
      { id: 'extended-cards', label: 'Extended Cards' },
    ],
  },
  {
    id: 'navigation',
    label: 'Navigation and Collections',
    items: [
      { id: 'dock', label: 'Dock' },
      { id: 'tabs', label: 'Tabs' },
      { id: 'segmented', label: 'Segmented' },
      { id: 'carousel', label: 'Carousel' },
      { id: 'list', label: 'List' },
      { id: 'accordion', label: 'Accordion' },
      { id: 'extended-nav', label: 'Extended Nav' },
      { id: 'extended-collections', label: 'Collections' },
    ],
  },
  {
    id: 'application-ui',
    label: 'Application UI',
    items: [
      { id: 'data-table', label: 'Data Table' },
      { id: 'notifications', label: 'Notifications' },
      { id: 'form-field', label: 'Form Field' },
      { id: 'command-menu', label: 'Command Menu' },
      { id: 'dashboard-card', label: 'Dashboard Card' },
      { id: 'chart-card', label: 'Chart Card' },
    ],
  },
  {
    id: 'overlays',
    label: 'Overlays',
    items: [{ id: 'overlays', label: 'Overlays' }],
  },
];

function AppContent({
  theme,
  setTheme,
  lang,
  setLang,
}: {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  lang: LangName;
  setLang: (lang: LangName) => void;
}) {
  const [activeSection, setActiveSection] = useState<Section>('typography');
  const colors = useThemeColors();
  const PageContainer = activeSection === 'extended-collections' ? View : ScrollView;
  const pageContainerStyle = activeSection === 'extended-collections' ? { flex: 1 } : undefined;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <PageContainer style={pageContainerStyle}>
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
            color={colors.onPrimary}
            style={{ marginBottom: spacing.sm }}
            testID="app-title"
          >
            react-X2-native
          </X2Text>
          <X2Text variant="bodyM" color={colors.onPrimary} style={{ opacity: 0.8 }}>
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
            <X2Text color={theme === 'light' ? colors.onPrimary : colors.text}>Light</X2Text>
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
            <X2Text color={theme === 'dark' ? colors.onPrimary : colors.text}>Dark</X2Text>
          </X2Pressable>
        </X2Stack>

        {/* Language Toggle (X2StringsProvider) */}
        <X2Stack
          direction="row"
          gap="md"
          justify="center"
          style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.lg }}
        >
          {(['en', 'es'] as LangName[]).map((code) => (
            <X2Pressable
              key={code}
              backgroundColor={lang === code ? colors.primary : colors.surfaceVariant}
              onPress={() => setLang(code)}
              testID={`btn-lang-${code}`}
              style={{
                paddingVertical: spacing.md,
                paddingHorizontal: spacing.lg,
                borderRadius: 8,
              }}
            >
              <X2Text color={lang === code ? colors.onPrimary : colors.text}>
                {code === 'en' ? 'English' : 'Español'}
              </X2Text>
            </X2Pressable>
          ))}
        </X2Stack>

        <X2Divider style={{ marginVertical: spacing.lg }} />

        {/* Section Navigation */}
        <X2Stack gap="md" style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.lg }}>
          {sectionGroups.map((group) => (
            <X2Stack key={group.id} gap="xs">
              <X2Text
                variant="labelS"
                color={colors.textTertiary}
                style={{ textTransform: 'uppercase' }}
              >
                {group.label}
              </X2Text>
              <X2Stack direction="row" gap="sm" style={{ flexWrap: 'wrap' }}>
                {group.items.map((section) => (
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
                      color={activeSection === section.id ? colors.onPrimary : colors.primary}
                    >
                      {section.label}
                    </X2Text>
                  </X2Pressable>
                ))}
              </X2Stack>
            </X2Stack>
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
        {activeSection === 'segmented' && <SegmentedControlShowcase />}
        {activeSection === 'carousel' && <CarouselShowcase />}
        {activeSection === 'list' && <AnimatedListShowcase />}
        {activeSection === 'accordion' && <AccordionShowcase />}
        {activeSection === 'extended-cards' && <ExtendedCardsShowcase />}
        {activeSection === 'extended-nav' && <ExtendedNavigationShowcase />}
        {activeSection === 'extended-collections' && <ExtendedCollectionsShowcase />}
        {activeSection === 'overlays' && <OverlaysShowcase />}
        {activeSection === 'data-table' && <DataTableShowcase />}
        {activeSection === 'notifications' && <NotificationsShowcase />}
        {activeSection === 'form-field' && <FormFieldShowcase />}
        {activeSection === 'command-menu' && <CommandMenuShowcase />}
        {activeSection === 'dashboard-card' && <DashboardCardShowcase />}
        {activeSection === 'chart-card' && <ChartCardShowcase />}

        {/* Footer */}
        <X2Surface
          style={{
            padding: spacing.lg,
            marginTop: spacing.xl,
            backgroundColor: colors.surfaceVariant,
          }}
        >
          <X2Text variant="bodyS" color={colors.textSecondary} style={{ textAlign: 'center' }}>
            Phase 3: Extended Components (19 of 19 complete) ✅
          </X2Text>
        </X2Surface>
      </PageContainer>
    </SafeAreaView>
  );
}

export default function App() {
  const [theme, setTheme] = useState<ThemeName>('light');
  const [lang, setLang] = useState<LangName>('en');

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <X2StringsProvider strings={lang === 'es' ? esStrings : enStrings}>
            {/* Toasts sit outside OverlayProvider so they render above modals and sheets. */}
            <ToastProvider>
              <OverlayProvider>
                <AppContent theme={theme} setTheme={setTheme} lang={lang} setLang={setLang} />
              </OverlayProvider>
            </ToastProvider>
          </X2StringsProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
