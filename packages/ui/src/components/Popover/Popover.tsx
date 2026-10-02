import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useReducedMotion } from '@react-x2-native/core';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, radius, elevation } from '@react-x2-native/tokens';
import { useAnimatedPresence } from '../../hooks/useAnimatedPresence';
import { useAnchoredOverlay } from '../../hooks/useAnchoredOverlay';
import { OverlayLayer } from '../../overlay/OverlayLayer';
import { OverlayBackdrop } from '../OverlayBackdrop/OverlayBackdrop';
import type { PopoverProps } from './Popover.types';
import { useX2Strings } from '../../i18n/X2StringsProvider';

export function Popover({
  isOpen,
  onClose,
  anchor,
  children,
  position = 'bottom',
  offset = spacing.md,
  closeLabel: closeLabelProp,
  testID,
}: PopoverProps) {
  const strings = useX2Strings();
  const closeLabel = closeLabelProp ?? strings.closePopover;
  const { colors } = useTheme();
  const reducedMotion = useReducedMotion();
  const { screen, anchorRef, measureAnchor, onContentLayout, coords, positionStyle } =
    useAnchoredOverlay({ placement: position, offset });
  const { mounted, progress } = useAnimatedPresence(isOpen, { duration: 180, reducedMotion });

  useEffect(() => {
    if (!isOpen) return;
    measureAnchor();
  }, [isOpen, measureAnchor]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scale: 0.95 + progress.value * 0.05 }],
  }));

  return (
    <>
      <View ref={anchorRef} collapsable={false} testID={testID}>
        {anchor}
      </View>

      <OverlayLayer animationType="none" visible={mounted} onRequestClose={onClose}>
        <OverlayBackdrop onPress={onClose} accessibilityLabel={closeLabel} />
        <Animated.View
          onLayout={onContentLayout}
          style={[
            {
              ...positionStyle,
              maxWidth: screen.width - spacing.lg * 2,
              backgroundColor: colors.surface,
              borderRadius: radius.lg,
              padding: spacing.lg,
            },
            elevation.lg,
            coords ? animatedStyle : null,
          ]}
        >
          {children}
        </Animated.View>
      </OverlayLayer>
    </>
  );
}
