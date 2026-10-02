import React, { useState } from 'react';
import { View } from 'react-native';
import { AnimatedTabs, X2Surface, X2Text, X2Stack, X2Icon, useThemeColors } from 'react-x2-native';
import { spacing } from '@react-x2-native/tokens';

const BASIC_TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'details', label: 'Details' },
  { id: 'reviews', label: 'Reviews' },
];

const ICON_TABS = [
  { id: 'home', label: 'Home', icon: <X2Icon name="🏠" size={18} /> },
  { id: 'heart', label: 'Favorites', icon: <X2Icon name="♥" size={18} /> },
  { id: 'settings', label: 'Settings', icon: <X2Icon name="⚙" size={18} /> },
];

const TAB_CONTENT = {
  overview: 'This is the overview tab content. Here you can see general information.',
  details: 'Detailed information is displayed here. Learn more about the features.',
  reviews: 'Read reviews from other users and see ratings.',
  home: 'Welcome home! This is your home screen content.',
  heart: 'Your favorite items are saved here.',
  settings: 'Customize your preferences and settings.',
};

export function AnimatedTabsShowcase() {
  const colors = useThemeColors();
  const [activeBasic, setActiveBasic] = useState('overview');
  const [activeIcons, setActiveIcons] = useState('home');
  const [activeMore, setActiveMore] = useState('tab1');

  return (
    <X2Surface style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.lg }}>
      <X2Text variant="headingL" style={{ marginBottom: spacing.md }}>
        AnimatedTabs
      </X2Text>

      <X2Stack gap="lg">
        {/* Basic Tabs */}
        <X2Stack gap="md">
          <X2Text variant="labelM" color={colors.primary}>
            Basic Tabs
          </X2Text>
          <X2Surface
            style={{
              height: 200,
              overflow: 'hidden',
            }}
          >
            <AnimatedTabs
              testID="tabs-basic"
              tabs={BASIC_TABS}
              activeTabId={activeBasic}
              onTabPress={setActiveBasic}
              indicatorColor={colors.primary}
              indicatorHeight={3}
            >
              <View style={{ padding: spacing.lg, flex: 1, justifyContent: 'center' }}>
                <X2Text variant="bodyM" color={colors.textSecondary}>
                  {TAB_CONTENT[activeBasic as keyof typeof TAB_CONTENT]}
                </X2Text>
              </View>
            </AnimatedTabs>
          </X2Surface>
        </X2Stack>

        {/* Tabs with Icons */}
        <X2Stack gap="md">
          <X2Text variant="labelM" color={colors.primary}>
            Tabs with Icons
          </X2Text>
          <X2Surface
            style={{
              height: 200,
              overflow: 'hidden',
            }}
          >
            <AnimatedTabs
              testID="tabs-icons"
              tabs={ICON_TABS}
              activeTabId={activeIcons}
              onTabPress={setActiveIcons}
              showIcons={true}
              indicatorColor={colors.success}
              indicatorHeight={4}
            >
              <View style={{ padding: spacing.lg, flex: 1, justifyContent: 'center' }}>
                <X2Text variant="bodyM" color={colors.textSecondary}>
                  {TAB_CONTENT[activeIcons as keyof typeof TAB_CONTENT]}
                </X2Text>
              </View>
            </AnimatedTabs>
          </X2Surface>
        </X2Stack>

        {/* Many Tabs (scrollable) */}
        <X2Stack gap="md">
          <X2Text variant="labelM" color={colors.primary}>
            Scrollable Tabs
          </X2Text>
          <X2Surface
            style={{
              height: 200,
              overflow: 'hidden',
            }}
          >
            <AnimatedTabs
              testID="tabs-scroll"
              tabs={[
                { id: 'tab1', label: 'First' },
                { id: 'tab2', label: 'Second' },
                { id: 'tab3', label: 'Third' },
                { id: 'tab4', label: 'Fourth' },
                { id: 'tab5', label: 'Fifth' },
                { id: 'tab6', label: 'Sixth' },
              ]}
              activeTabId={activeMore}
              onTabPress={setActiveMore}
              indicatorColor={colors.warning}
            >
              <View style={{ padding: spacing.lg, flex: 1, justifyContent: 'center' }}>
                <X2Text variant="bodyM">Tab {activeMore.replace('tab', '')} content</X2Text>
              </View>
            </AnimatedTabs>
          </X2Surface>
        </X2Stack>

        {/* Current State Info */}
        <X2Surface backgroundColor={colors.surfaceVariant} style={{ padding: spacing.lg }}>
          <X2Text variant="labelM" color={colors.primary} style={{ marginBottom: spacing.sm }}>
            Active Tabs
          </X2Text>
          <X2Stack gap="xs">
            <X2Text variant="bodyS">
              Basic: {BASIC_TABS.find((t) => t.id === activeBasic)?.label}
            </X2Text>
            <X2Text variant="bodyS">
              Icons: {ICON_TABS.find((t) => t.id === activeIcons)?.label}
            </X2Text>
            <X2Text variant="bodyS">Scrollable: {activeMore}</X2Text>
          </X2Stack>
        </X2Surface>

        {/* Features */}
        <X2Surface backgroundColor={colors.surfaceVariant} style={{ padding: spacing.lg }}>
          <X2Text variant="labelM" color={colors.primary} style={{ marginBottom: spacing.sm }}>
            Features
          </X2Text>
          <X2Stack gap="xs">
            <X2Text variant="bodyS">✓ Animated indicator underline</X2Text>
            <X2Text variant="bodyS">✓ Spring animations (damping: 15)</X2Text>
            <X2Text variant="bodyS">✓ Horizontal scrolling for many tabs</X2Text>
            <X2Text variant="bodyS">✓ Optional icon support</X2Text>
            <X2Text variant="bodyS">✓ Auto-scroll to active tab</X2Text>
            <X2Text variant="bodyS">✓ Customizable indicator color & height</X2Text>
            <X2Text variant="bodyS">✓ Full accessibility (tab roles)</X2Text>
            <X2Text variant="bodyS">✓ Respects reduce motion preferences</X2Text>
            <X2Text variant="bodyS">✓ Content area support</X2Text>
            <X2Text variant="bodyS">✓ Disabled state support</X2Text>
          </X2Stack>
        </X2Surface>

        {/* Usage Example */}
        <X2Surface backgroundColor={colors.surfaceVariant} style={{ padding: spacing.lg }}>
          <X2Text variant="labelM" color={colors.primary} style={{ marginBottom: spacing.sm }}>
            Usage Tips
          </X2Text>
          <X2Stack gap="sm">
            <X2Text variant="bodyS" color={colors.textSecondary}>
              Pass array of tabs with id and label (icon optional).
            </X2Text>
            <X2Text variant="bodyS" color={colors.textSecondary}>
              Use activeTabId prop to control selected tab.
            </X2Text>
            <X2Text variant="bodyS" color={colors.textSecondary}>
              Indicator auto-scrolls tabs to keep active in view.
            </X2Text>
            <X2Text variant="bodyS" color={colors.textSecondary}>
              Customize indicator with color and height props.
            </X2Text>
          </X2Stack>
        </X2Surface>
      </X2Stack>
    </X2Surface>
  );
}
