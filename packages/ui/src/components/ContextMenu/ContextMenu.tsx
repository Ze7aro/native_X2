import { useState, useCallback } from 'react';
import { View, Pressable } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, radius, elevation } from '@react-x2-native/tokens';
import { X2Text } from '../../primitives/X2Text';
import { useAnchoredOverlay } from '../../hooks/useAnchoredOverlay';
import type { ContextMenuProps } from './ContextMenu.types';
import { OverlayLayer } from '../../overlay/OverlayLayer';
import { OverlayBackdrop } from '../OverlayBackdrop/OverlayBackdrop';
import { useX2Strings } from '../../i18n/X2StringsProvider';

export function ContextMenu({
  actions,
  children,
  onOpen,
  onClose,
  openLabel: openLabelProp,
  closeLabel: closeLabelProp,
  testID,
}: ContextMenuProps) {
  const strings = useX2Strings();
  const openLabel = openLabelProp ?? strings.openMenu;
  const closeLabel = closeLabelProp ?? strings.closeMenu;
  const { colors } = useTheme();
  const { screen, anchorRef, measureAnchor, onContentLayout, resetSize, positionStyle } =
    useAnchoredOverlay({ placement: 'bottom', offset: spacing.xs });

  const [menuOpen, setMenuOpen] = useState(false);

  const handleOpen = useCallback(() => {
    measureAnchor(() => {
      setMenuOpen(true);
      onOpen?.();
    });
  }, [measureAnchor, onOpen]);

  const handleClose = useCallback(() => {
    setMenuOpen(false);
    resetSize();
    onClose?.();
  }, [resetSize, onClose]);

  const handleAction = useCallback(
    (onPress: () => void) => {
      onPress();
      handleClose();
    },
    [handleClose]
  );

  return (
    <>
      <Pressable
        ref={anchorRef}
        collapsable={false}
        onLongPress={handleOpen}
        delayLongPress={500}
        testID={testID}
        accessibilityActions={[{ name: 'longpress', label: openLabel }]}
        onAccessibilityAction={(event) => {
          if (event.nativeEvent.actionName === 'longpress') handleOpen();
        }}
      >
        {children}
      </Pressable>

      <OverlayLayer animationType="fade" visible={menuOpen} onRequestClose={handleClose}>
        <OverlayBackdrop onPress={handleClose} accessibilityLabel={closeLabel} />
        <View
          accessibilityRole="menu"
          onLayout={onContentLayout}
          style={[
            {
              ...positionStyle,
              backgroundColor: colors.surface,
              borderRadius: radius.md,
              minWidth: 200,
              maxWidth: screen.width - spacing.lg * 2,
            },
            elevation.md,
          ]}
        >
          {actions.map((action, index) => (
            <Pressable
              key={action.id}
              onPress={() => handleAction(action.onPress)}
              accessible
              accessibilityRole="menuitem"
              accessibilityLabel={action.label}
              style={({ pressed }) => ({
                paddingHorizontal: spacing.lg,
                paddingVertical: spacing.md,
                flexDirection: 'row',
                alignItems: 'center',
                gap: spacing.md,
                borderBottomWidth: index < actions.length - 1 ? 1 : 0,
                borderBottomColor: colors.surfaceVariant,
                backgroundColor: pressed ? colors.surfaceVariant : 'transparent',
              })}
            >
              {action.icon && (
                <View
                  style={{ width: 24, height: 24, justifyContent: 'center', alignItems: 'center' }}
                >
                  {action.icon}
                </View>
              )}
              <X2Text
                variant="bodyM"
                color={action.destructive ? colors.error : (action.color ?? colors.text)}
              >
                {action.label}
              </X2Text>
            </Pressable>
          ))}
        </View>
      </OverlayLayer>
    </>
  );
}
