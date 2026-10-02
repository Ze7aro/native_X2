import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  useWindowDimensions,
} from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useReducedMotion } from '@react-x2-native/core';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, radius, elevation } from '@react-x2-native/tokens';
import { useAnimatedPresence } from '../../hooks/useAnimatedPresence';
import { computeOverlayPosition, Rect, Size } from '../../utils/overlayPosition';
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
  const screen = useWindowDimensions();
  const anchorRef = useRef<View>(null);

  const [anchorRect, setAnchorRect] = useState<Rect | null>(null);
  const [contentSize, setContentSize] = useState<Size | null>(null);
  const { mounted, progress } = useAnimatedPresence(isOpen, { duration: 180, reducedMotion });

  useEffect(() => {
    if (!isOpen) return;
    anchorRef.current?.measureInWindow((x, y, width, height) => {
      setAnchorRect({ x, y, width, height });
    });
  }, [isOpen]);

  const coords =
    anchorRect && contentSize
      ? computeOverlayPosition(anchorRect, contentSize, position, offset, screen)
      : null;

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scale: 0.95 + progress.value * 0.05 }],
  }));

  return (
    <>
      <View ref={anchorRef} collapsable={false} testID={testID}>
        {anchor}
      </View>

      <OverlayLayer
        animationType="none"
        visible={mounted}
        onRequestClose={onClose}
      >
        <OverlayBackdrop onPress={onClose} accessibilityLabel={closeLabel} />
        <Animated.View
          onLayout={(event) => {
            const { width, height } = event.nativeEvent.layout;
            setContentSize({ width, height });
          }}
          style={[
            {
              position: 'absolute',
              left: coords?.left ?? 0,
              top: coords?.top ?? 0,
              maxWidth: screen.width - spacing.lg * 2,
              backgroundColor: colors.surface,
              borderRadius: radius.lg,
              padding: spacing.lg,
              // Stay invisible until measured so it never flashes at (0, 0).
              opacity: coords ? 1 : 0,
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
