import React, { useMemo } from 'react';
import { View, Pressable, ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useReducedMotion } from '@react-x2-native/core';
import { useTheme } from '../../theme/ThemeContext';
import { spacing } from '@react-x2-native/tokens';
import { X2Text } from '../../primitives/X2Text';
import { useAnimatedPresence } from '../../hooks/useAnimatedPresence';
import { OverlayLayer } from '../../overlay/OverlayLayer';
import { OverlayBackdrop } from '../OverlayBackdrop/OverlayBackdrop';
import type { SideMenuProps } from './SideMenu.types';
import { useX2Strings } from '../../i18n/X2StringsProvider';

const MENU_WIDTH = 280;

export function SideMenu({
  isOpen,
  onClose,
  items,
  header,
  footer,
  closeLabel: closeLabelProp,
  testID,
}: SideMenuProps) {
  const strings = useX2Strings();
  const closeLabel = closeLabelProp ?? strings.closeMenu;
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const reducedMotion = useReducedMotion();

  const { mounted, progress } = useAnimatedPresence(isOpen, { reducedMotion });

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
  }));

  const menuAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: (progress.value - 1) * MENU_WIDTH }],
  }));

  const menuStyle: ViewStyle = useMemo(
    () => ({
      width: MENU_WIDTH,
      maxWidth: '85%',
      height: '100%',
      backgroundColor: colors.surface,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    }),
    [colors.surface, insets.top, insets.bottom]
  );

  return (
    <OverlayLayer visible={mounted} animationType="none" onRequestClose={onClose} testID={testID}>
      <Animated.View
        style={[StyleSheet.absoluteFill, { backgroundColor: colors.overlay }, backdropStyle]}
      >
        <OverlayBackdrop onPress={onClose} accessibilityLabel={closeLabel} />
      </Animated.View>

      <Animated.View style={[menuStyle, menuAnimatedStyle]} accessibilityViewIsModal>
        {header && (
          <View style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.lg }}>
            {header}
          </View>
        )}

        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {items.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => {
                item.onPress();
                onClose();
              }}
              accessible
              accessibilityRole="menuitem"
              accessibilityLabel={item.label}
              testID={testID ? `${testID}-item-${item.id}` : undefined}
              style={({ pressed }) => ({
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: spacing.lg,
                paddingVertical: spacing.md,
                gap: spacing.md,
                borderBottomWidth: 1,
                borderBottomColor: colors.surfaceVariant,
                backgroundColor: pressed ? colors.surfaceVariant : 'transparent',
              })}
            >
              {item.icon && (
                <View
                  style={{ width: 24, height: 24, justifyContent: 'center', alignItems: 'center' }}
                >
                  {item.icon}
                </View>
              )}
              <X2Text variant="bodyM" color={colors.text}>
                {item.label}
              </X2Text>
            </Pressable>
          ))}
        </ScrollView>

        {footer && (
          <View
            style={{
              paddingHorizontal: spacing.lg,
              paddingVertical: spacing.lg,
              borderTopWidth: 1,
              borderTopColor: colors.surfaceVariant,
            }}
          >
            {footer}
          </View>
        )}
      </Animated.View>
    </OverlayLayer>
  );
}
