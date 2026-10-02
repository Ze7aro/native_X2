import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useReducedMotion } from '@react-x2-native/core';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, radius, elevation } from '@react-x2-native/tokens';
import { X2Text } from '../../primitives/X2Text';
import { useAnimatedPresence } from '../../hooks/useAnimatedPresence';
import { computeOverlayPosition, Rect, Size } from '../../utils/overlayPosition';
import type { TooltipProps } from './Tooltip.types';
import { OverlayLayer } from '../../overlay/OverlayLayer';
import { OverlayBackdrop } from '../OverlayBackdrop/OverlayBackdrop';
import { useX2Strings } from '../../i18n/X2StringsProvider';

const AUTO_HIDE_MS = 2500;

export function Tooltip({
  text,
  children,
  position = 'top',
  backgroundColor,
  delay = 500,
  dismissLabel: dismissLabelProp,
  testID,
}: TooltipProps) {
  const strings = useX2Strings();
  const dismissLabel = dismissLabelProp ?? strings.dismissTooltip;
  const { colors } = useTheme();
  const reducedMotion = useReducedMotion();
  const screen = useWindowDimensions();
  const anchorRef = useRef<View>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const [visible, setVisible] = useState(false);
  const [anchorRect, setAnchorRect] = useState<Rect | null>(null);
  const [tooltipSize, setTooltipSize] = useState<Size | null>(null);
  const { mounted, progress } = useAnimatedPresence(visible, { duration: 150, reducedMotion });

  useEffect(() => () => clearTimeout(hideTimer.current), []);

  const hide = useCallback(() => {
    clearTimeout(hideTimer.current);
    setVisible(false);
  }, []);

  const show = useCallback(() => {
    anchorRef.current?.measureInWindow((x, y, width, height) => {
      setAnchorRect({ x, y, width, height });
      setVisible(true);
      clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => setVisible(false), AUTO_HIDE_MS);
    });
  }, []);

  const coords =
    anchorRect && tooltipSize
      ? computeOverlayPosition(anchorRect, tooltipSize, position, spacing.sm, screen)
      : null;

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
  }));

  return (
    <>
      <Pressable
        ref={anchorRef}
        collapsable={false}
        onPress={show}
        onLongPress={show}
        delayLongPress={delay}
        accessibilityRole="button"
        accessibilityHint={text}
        testID={testID}
      >
        {children}
      </Pressable>

      <OverlayLayer
        animationType="none"
        visible={mounted}
        onRequestClose={hide}
      >
        <OverlayBackdrop onPress={hide} accessibilityLabel={dismissLabel} />
        <Animated.View
          pointerEvents="none"
          accessibilityRole="text"
          accessibilityLiveRegion="polite"
          onLayout={(event) => {
            const { width, height } = event.nativeEvent.layout;
            setTooltipSize({ width, height });
          }}
          style={[
            {
              position: 'absolute',
              left: coords?.left ?? 0,
              top: coords?.top ?? 0,
              maxWidth: Math.min(280, screen.width - spacing.lg * 2),
              backgroundColor: backgroundColor ?? colors.primary,
              paddingHorizontal: spacing.md,
              paddingVertical: spacing.sm,
              borderRadius: radius.sm,
              opacity: coords ? 1 : 0,
            },
            elevation.md,
            coords ? animatedStyle : null,
          ]}
        >
          <X2Text variant="bodyS" color={colors.onPrimary}>
            {text}
          </X2Text>
        </Animated.View>
      </OverlayLayer>
    </>
  );
}
