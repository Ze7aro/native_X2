import React, { useMemo, useState } from 'react';
import {
  CommandMenu,
  type CommandMenuGroup,
  X2Pressable,
  X2Surface,
  X2Text,
  useThemeColors,
} from 'react-x2-native';
import { spacing } from '@react-x2-native/tokens';

export function CommandMenuShowcase() {
  const colors = useThemeColors();
  const [isOpen, setIsOpen] = useState(false);
  const [lastCommand, setLastCommand] = useState('None yet');
  const groups = useMemo<CommandMenuGroup[]>(
    () => [
      {
        id: 'navigation',
        label: 'Navigation',
        items: [
          { id: 'dashboard', label: 'Open dashboard', description: 'Go to your workspace', shortcut: '⌘1', keywords: ['home'], onPress: () => setLastCommand('Open dashboard') },
          { id: 'settings', label: 'Open settings', description: 'Manage preferences', shortcut: '⌘,', onPress: () => setLastCommand('Open settings') },
        ],
      },
      {
        id: 'actions',
        label: 'Actions',
        items: [
          { id: 'invite', label: 'Invite teammate', keywords: ['member', 'user'], onPress: () => setLastCommand('Invite teammate') },
          { id: 'archive', label: 'Archive workspace', destructive: true, onPress: () => setLastCommand('Archive workspace') },
          { id: 'disabled', label: 'Export report', disabled: true, onPress: () => undefined },
        ],
      },
    ],
    [],
  );

  return (
    <X2Surface style={{ padding: spacing.lg }}>
      <X2Text variant="headingL" style={{ marginBottom: spacing.sm }}>
        Command Menu
      </X2Text>
      <X2Text variant="bodyM" color={colors.textSecondary} style={{ marginBottom: spacing.lg }}>
        Búsqueda rápida de acciones con grupos, shortcuts y navegación por teclado.
      </X2Text>
      <X2Pressable
        backgroundColor={colors.primary}
        onPress={() => setIsOpen(true)}
        style={{ alignSelf: 'flex-start', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderRadius: 8 }}
      >
        <X2Text color={colors.onPrimary}>Open command menu</X2Text>
      </X2Pressable>
      <X2Text variant="bodyS" color={colors.textSecondary} style={{ marginTop: spacing.lg }}>
        Last command: {lastCommand}
      </X2Text>
      <CommandMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        groups={groups}
        title="Quick actions"
        testID="command-menu"
      />
    </X2Surface>
  );
}
