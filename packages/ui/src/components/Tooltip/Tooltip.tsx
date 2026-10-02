import { useState, useRef, useCallback, useEffect } from 'react';
import { Pressable } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useReducedMotion } from '@react-x2-native/core';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, radius, elevation } from '@react-x2-native/tokens';
import { X2Text } from '../../primitives/X2Text';
import { useAnimatedPresence } from '../../hooks/useAnimatedPresence';
import { useAnchoredOverlay } from '../../hooks/useAnchoredOverlay';
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
  const { screen, anchorRef, measureAnchor, onContentLayout, coords, positionStyle } =
    useAnchoredOverlay({ placement: position, offset: spacing.sm });
  const hideTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const [visible, setVisible] = useState(false);
  const { mounted, progress } = useAnimatedPresence(visible, { duration: 150, reducedMotion });

  useEffect(() => () => clearTimeout(hideTimer.current), []);

  const hide = useCallback(() => {
    clearTimeout(hideTimer.current);
    setVisible(false);
  }, []);

  const show = useCallback(() => {
    measureAnchor(() => {
      setVisible(true);
      clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => setVisible(false), AUTO_HIDE_MS);
    });
  }, [measureAnchor]);

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

      <OverlayLayer animationType="none" visible={mounted} onRequestClose={hide}>
        <OverlayBackdrop onPress={hide} accessibilityLabel={dismissLabel} />
        <Animated.View
          pointerEvents="none"
          accessibilityRole="text"
          accessibilityLiveRegion="polite"
          onLayout={onContentLayout}
          style={[
            {
              ...positionStyle,
              maxWidth: Math.min(280, screen.width - spacing.lg * 2),
              backgroundColor: backgroundColor ?? colors.primary,
              paddingHorizontal: spacing.md,
              paddingVertical: spacing.sm,
              borderRadius: radius.sm,
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
