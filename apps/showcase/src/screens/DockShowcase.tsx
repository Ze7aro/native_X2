import React, { useState } from 'react';
import { Dock, X2Surface, X2Text, X2Stack, X2Icon, useThemeColors } from 'react-x2-native';
import { spacing } from '@react-x2-native/tokens';

const ICONS = {
  home: '🏠',
  explore: '🔍',
  create: '➕',
  messages: '💬',
  profile: '👤',
};

const DOCK_ITEMS = [
  { id: 'home', label: 'Home', icon: <X2Icon name={ICONS.home} size={24} /> },
  { id: 'explore', label: 'Explore', icon: <X2Icon name={ICONS.explore} size={24} /> },
  { id: 'create', label: 'Create', icon: <X2Icon name={ICONS.create} size={24} /> },
  { id: 'messages', label: 'Messages', icon: <X2Icon name={ICONS.messages} size={24} /> },
  { id: 'profile', label: 'Profile', icon: <X2Icon name={ICONS.profile} size={24} /> },
];

export function DockShowcase() {
  const colors = useThemeColors();
  const [activeBasic, setActiveBasic] = useState('home');
  const [activeWithLabels, setActiveWithLabels] = useState('home');
  const [actionLog, setActionLog] = useState<string>('');

  const handleNavigation = (id: string) => {
    setActionLog(`Navigated to ${id}`);
  };

  return (
    <X2Surface style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.lg }}>
      <X2Text variant="headingL" style={{ marginBottom: spacing.md }}>
        Dock
      </X2Text>

      <X2Stack gap="lg">
        {/* Basic Dock */}
        <X2Stack gap="md">
          <X2Text variant="labelM" color={colors.primary}>
            Basic Dock (Icon Only)
          </X2Text>
          <X2Surface
            style={{
              marginBottom: spacing.lg,
            }}
          >
            <Dock
              testID="dock-basic"
              items={DOCK_ITEMS.map((item) => ({
                ...item,
                onPress: () => {
                  setActiveBasic(item.id);
                  handleNavigation(item.id);
                },
              }))}
              activeId={activeBasic}
              showLabels={false}
            />
          </X2Surface>
        </X2Stack>

        {/* Dock with Labels */}
        <X2Stack gap="md">
          <X2Text variant="labelM" color={colors.primary}>
            Dock with Labels
          </X2Text>
          <X2Surface
            style={{
              marginBottom: spacing.lg,
            }}
          >
            <Dock
              testID="dock-labels"
              items={DOCK_ITEMS.map((item) => ({
                ...item,
                onPress: () => {
                  setActiveWithLabels(item.id);
                  handleNavigation(item.id);
                },
              }))}
              activeId={activeWithLabels}
              showLabels={true}
            />
          </X2Surface>
        </X2Stack>

        {/* Action Log */}
        {actionLog && (
          <X2Surface backgroundColor={colors.surfaceVariant} style={{ padding: spacing.lg }}>
            <X2Text variant="labelM" color={colors.primary}>
              Last Action
            </X2Text>
            <X2Text variant="bodyS">{actionLog}</X2Text>
          </X2Surface>
        )}

        {/* Active Indicator Info */}
        <X2Surface backgroundColor={colors.surfaceVariant} style={{ padding: spacing.lg }}>
          <X2Text variant="labelM" color={colors.primary} style={{ marginBottom: spacing.sm }}>
            Current Selection
          </X2Text>
          <X2Stack direction="row" gap="md" align="center">
            <X2Text variant="bodyM">
              {DOCK_ITEMS.find((item) => item.id === activeBasic)?.label}
            </X2Text>
            <X2Icon
              name={ICONS[activeBasic as keyof typeof ICONS] || '📍'}
              size={20}
              color={colors.primary}
            />
          </X2Stack>
        </X2Surface>

        {/* Features */}
        <X2Surface backgroundColor={colors.surfaceVariant} style={{ padding: spacing.lg }}>
          <X2Text variant="labelM" color={colors.primary} style={{ marginBottom: spacing.sm }}>
            Features
          </X2Text>
          <X2Stack gap="xs">
            <X2Text variant="bodyS">✓ Horizontal navigation dock</X2Text>
            <X2Text variant="bodyS">✓ Animated active indicator</X2Text>
            <X2Text variant="bodyS">✓ Optional labels support</X2Text>
            <X2Text variant="bodyS">✓ Safe area respecting</X2Text>
            <X2Text variant="bodyS">✓ Spring animations (damping: 15)</X2Text>
            <X2Text variant="bodyS">✓ Full accessibility (tab roles)</X2Text>
            <X2Text variant="bodyS">✓ Custom colors support</X2Text>
            <X2Text variant="bodyS">✓ Touch feedback (opacity changes)</X2Text>
          </X2Stack>
        </X2Surface>

        {/* Documentation */}
        <X2Surface backgroundColor={colors.surfaceVariant} style={{ padding: spacing.lg }}>
          <X2Text variant="labelM" color={colors.primary} style={{ marginBottom: spacing.sm }}>
            Usage
          </X2Text>
          <X2Stack gap="sm">
            <X2Text variant="bodyS" color={colors.textSecondary}>
              Pass an array of items with id, label, icon, and onPress callback.
            </X2Text>
            <X2Text variant="bodyS" color={colors.textSecondary}>
              Use activeId prop to control selected item.
            </X2Text>
            <X2Text variant="bodyS" color={colors.textSecondary}>
              Set showLabels to true to display item labels.
            </X2Text>
          </X2Stack>
        </X2Surface>
      </X2Stack>
    </X2Surface>
  );
}
