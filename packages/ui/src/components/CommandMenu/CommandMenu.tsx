import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInputKeyPressEventData,
  NativeSyntheticEvent,
  View,
} from 'react-native';
import { elevation, radius, spacing } from '@react-x2-native/tokens';
import { useTheme } from '../../theme/ThemeContext';
import { SearchField } from '../SearchField';
import { X2Text } from '../../primitives/X2Text';
import type { CommandMenuItem, CommandMenuProps } from './CommandMenu.types';
import { OverlayLayer } from '../../overlay/OverlayLayer';
import { OverlayBackdrop } from '../OverlayBackdrop/OverlayBackdrop';
import { useX2Strings } from '../../i18n/X2StringsProvider';

interface ResolvedCommand extends CommandMenuItem {
  groupLabel?: string;
}

export function CommandMenu({
  isOpen,
  onClose,
  items = [],
  groups = [],
  query,
  defaultQuery = '',
  onQueryChange,
  title: titleProp,
  placeholder: placeholderProp,
  emptyMessage: emptyMessageProp,
  closeLabel: closeLabelProp,
  maxHeight = 460,
  testID,
}: CommandMenuProps) {
  const strings = useX2Strings();
  const title = titleProp ?? strings.commandMenuTitle;
  const placeholder = placeholderProp ?? strings.commandSearchPlaceholder;
  const emptyMessage = emptyMessageProp ?? strings.commandEmpty;
  const closeLabel = closeLabelProp ?? strings.closeCommandMenu;
  const { colors } = useTheme();
  const [internalQuery, setInternalQuery] = useState(defaultQuery);
  const [activeIndex, setActiveIndex] = useState(0);
  const currentQuery = query ?? internalQuery;

  const allCommands = useMemo<ResolvedCommand[]>(
    () => [
      ...items,
      ...groups.flatMap((group) => group.items.map((item) => ({ ...item, groupLabel: group.label }))),
    ],
    [groups, items],
  );

  const filteredCommands = useMemo(() => {
    const normalizedQuery = currentQuery.trim().toLocaleLowerCase();
    if (!normalizedQuery) return allCommands;
    return allCommands.filter((command) => {
      const searchableText = [
        command.label,
        command.description,
        command.groupLabel,
        ...(command.keywords ?? []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLocaleLowerCase();
      return searchableText.includes(normalizedQuery);
    });
  }, [allCommands, currentQuery]);

  useEffect(() => {
    if (isOpen) setActiveIndex(0);
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex((current) => Math.min(current, Math.max(filteredCommands.length - 1, 0)));
  }, [filteredCommands.length]);

  const updateQuery = useCallback(
    (nextQuery: string) => {
      if (query === undefined) setInternalQuery(nextQuery);
      onQueryChange?.(nextQuery);
      setActiveIndex(0);
    },
    [onQueryChange, query],
  );

  const selectCommand = useCallback(
    (command: CommandMenuItem) => {
      if (command.disabled) return;
      command.onPress();
      onClose();
    },
    [onClose],
  );

  const moveActive = useCallback(
    (direction: 1 | -1) => {
      if (filteredCommands.length === 0) return;
      setActiveIndex((current) => {
        let next = current + direction;
        if (next < 0) next = filteredCommands.length - 1;
        if (next >= filteredCommands.length) next = 0;
        return next;
      });
    },
    [filteredCommands.length],
  );

  const handleKeyPress = useCallback(
    (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
      const key = event.nativeEvent.key;
      if (key === 'ArrowDown') moveActive(1);
      if (key === 'ArrowUp') moveActive(-1);
      if (key === 'Enter' && filteredCommands[activeIndex]) selectCommand(filteredCommands[activeIndex]);
      if (key === 'Escape') onClose();
    },
    [activeIndex, filteredCommands, moveActive, onClose, selectCommand],
  );

  return (
    <OverlayLayer
      visible={isOpen}
      animationType="fade"
      onRequestClose={onClose}
      testID={testID}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.overlay}
      >
        <OverlayBackdrop
          onPress={onClose}
          accessibilityLabel={closeLabel}
          backgroundColor={colors.overlay}
        />
        <View
          accessibilityViewIsModal
          style={[
            styles.panel,
            elevation.xl,
            { backgroundColor: colors.surface, maxHeight },
          ]}
          testID={testID ? `${testID}-panel` : undefined}
        >
          <View style={styles.header}>
            <X2Text variant="headingM" style={styles.title}>{title}</X2Text>
            <Pressable
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel={closeLabel}
              hitSlop={8}
              style={styles.close}
            >
              <X2Text variant="headingS" color={colors.textSecondary}>×</X2Text>
            </Pressable>
          </View>
          <SearchField
            value={currentQuery}
            onChangeText={updateQuery}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            autoFocus
            returnKeyType="search"
            testID={testID ? `${testID}-search` : undefined}
          />
          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={styles.list}
            contentContainerStyle={styles.listContent}
            accessibilityRole="menu"
          >
            {filteredCommands.length === 0 ? (
              <X2Text color={colors.textSecondary} style={styles.empty} accessibilityRole="text">
                {emptyMessage}
              </X2Text>
            ) : (
              filteredCommands.map((command, index) => {
                const previous = filteredCommands[index - 1];
                const showGroup = command.groupLabel && command.groupLabel !== previous?.groupLabel;
                const selected = activeIndex === index;
                return (
                  <React.Fragment key={command.id}>
                    {showGroup && (
                      <X2Text variant="labelS" color={colors.textTertiary} style={styles.groupLabel}>
                        {command.groupLabel}
                      </X2Text>
                    )}
                    <Pressable
                      disabled={command.disabled}
                      onPress={() => selectCommand(command)}
                      accessibilityRole="menuitem"
                      accessibilityLabel={command.description ? `${command.label}, ${command.description}` : command.label}
                      accessibilityState={{ disabled: command.disabled, selected }}
                      style={({ pressed }) => [
                        styles.command,
                        {
                          backgroundColor: selected || pressed ? colors.surfaceVariant : 'transparent',
                          opacity: command.disabled ? 0.45 : 1,
                        },
                      ]}
                      testID={testID ? `${testID}-item-${command.id}` : undefined}
                    >
                      {command.icon && <View style={styles.icon}>{command.icon}</View>}
                      <View style={styles.commandText}>
                        <X2Text color={command.destructive ? colors.error : colors.text}>
                          {command.label}
                        </X2Text>
                        {command.description && (
                          <X2Text variant="bodyS" color={colors.textSecondary} numberOfLines={1}>
                            {command.description}
                          </X2Text>
                        )}
                      </View>
                      {command.shortcut && (
                        <X2Text variant="labelS" color={colors.textTertiary}>{command.shortcut}</X2Text>
                      )}
                    </Pressable>
                  </React.Fragment>
                );
              })
            )}
          </ScrollView>
          <X2Text variant="bodyS" color={colors.textTertiary} style={styles.footer}>
            Use ↑ ↓ to navigate · Enter to select · Esc to close
          </X2Text>
        </View>
      </KeyboardAvoidingView>
    </OverlayLayer>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  panel: {
    width: '100%',
    maxWidth: 560,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    flex: 1,
  },
  close: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    marginTop: spacing.md,
  },
  listContent: {
    paddingVertical: spacing.xs,
  },
  groupLabel: {
    marginTop: spacing.md,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
  },
  command: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.md,
  },
  icon: {
    width: 24,
    alignItems: 'center',
  },
  commandText: {
    flex: 1,
    gap: spacing.xs,
  },
  empty: {
    paddingVertical: spacing.xl,
    textAlign: 'center',
  },
  footer: {
    marginTop: spacing.md,
    textAlign: 'center',
  },
});
