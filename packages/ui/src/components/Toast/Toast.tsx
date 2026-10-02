import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useReducedMotion } from '@react-x2-native/core';
import { elevation, radius, spacing } from '@react-x2-native/tokens';
import { useTheme } from '../../theme/ThemeContext';
import { X2Text } from '../../primitives/X2Text';
import { useAnimatedPresence } from '../../hooks/useAnimatedPresence';
import type { ToastProps } from './Toast.types';
import { useX2Strings } from '../../i18n/X2StringsProvider';

const DEFAULT_DURATION = 4000;
const ERROR_DURATION = 7000;
const DEFAULT_ANIMATION_DURATION = 220;

const defaultIcons = {
  info: 'i',
  success: '✓',
  warning: '!',
  error: '×',
} as const;

export function Toast({
  isVisible,
  defaultVisible = true,
  title,
  message,
  variant = 'info',
  duration: durationProp,
  autoDismiss = true,
  action,
  icon,
  dismissible = true,
  dismissLabel: dismissLabelProp,
  animationDuration = DEFAULT_ANIMATION_DURATION,
  onDismiss,
  onDismissComplete,
  style,
  testID,
}: ToastProps) {
  const strings = useX2Strings();
  const dismissLabel = dismissLabelProp ?? strings.dismissNotification;
  const { colors } = useTheme();
  const reducedMotion = useReducedMotion();
  const [internalVisible, setInternalVisible] = useState(defaultVisible);
  const wasMounted = useRef(false);
  const visible = isVisible ?? internalVisible;
  const duration = durationProp ?? (variant === 'error' ? ERROR_DURATION : DEFAULT_DURATION);
  const { mounted, progress } = useAnimatedPresence(visible, {
    duration: animationDuration,
    reducedMotion,
  });

  const dismiss = useCallback(() => {
    if (isVisible === undefined) setInternalVisible(false);
    onDismiss?.();
  }, [isVisible, onDismiss]);

  useEffect(() => {
    if (!visible || !autoDismiss || duration <= 0) return undefined;
    const timer = setTimeout(dismiss, duration);
    return () => clearTimeout(timer);
  }, [autoDismiss, dismiss, duration, visible]);

  useEffect(() => {
    if (wasMounted.current && !mounted) onDismissComplete?.();
    wasMounted.current = mounted;
  }, [mounted, onDismissComplete]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: (1 - progress.value) * -10 }],
  }));

  const accentColor = colors[variant];

  const handleActionPress = useCallback(() => {
    action?.onPress();
    if (action?.dismissOnPress !== false) dismiss();
  }, [action, dismiss]);

  if (!mounted) return null;

  return (
    <Animated.View
      accessibilityRole="alert"
      accessibilityLiveRegion={variant === 'error' ? 'assertive' : 'polite'}
      testID={testID}
      style={[
        styles.container,
        elevation.md,
        { backgroundColor: colors.surface, borderColor: accentColor },
        animatedStyle,
        style,
      ]}
    >
      <View style={[styles.accent, { backgroundColor: accentColor }]} />
      <View style={styles.content}>
        <View style={[styles.icon, { backgroundColor: `${accentColor}20` }]}>
          <X2Text variant="labelL" color={accentColor} accessibilityElementsHidden>
            {icon ?? defaultIcons[variant]}
          </X2Text>
        </View>
        <View style={styles.messageContainer}>
          {title && <X2Text variant="labelL">{title}</X2Text>}
          <X2Text variant="bodyS" color={title ? colors.textSecondary : colors.text}>
            {message}
          </X2Text>
        </View>
        {action && (
          <Pressable
            onPress={handleActionPress}
            accessibilityRole="button"
            accessibilityLabel={action.label}
            style={({ pressed }) => [styles.action, { opacity: pressed ? 0.65 : 1 }]}
            testID={testID ? `${testID}-action` : undefined}
          >
            <X2Text variant="labelM" color={colors.primary}>{action.label}</X2Text>
          </Pressable>
        )}
        {dismissible && (
          <Pressable
            onPress={dismiss}
            accessibilityRole="button"
            accessibilityLabel={dismissLabel}
            hitSlop={8}
            style={({ pressed }) => [styles.close, { opacity: pressed ? 0.65 : 1 }]}
            testID={testID ? `${testID}-close` : undefined}
          >
            <X2Text variant="labelL" color={colors.textSecondary}>×</X2Text>
          </Pressable>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 64,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: radius.lg,
  },
  accent: {
    width: 4,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  icon: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.sm,
  },
  messageContainer: {
    flex: 1,
    gap: spacing.xs,
  },
  action: {
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.sm,
  },
  close: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
