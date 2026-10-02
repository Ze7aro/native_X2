import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  View,
  Pressable,
  StyleSheet,
} from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useReducedMotion } from '@react-x2-native/core';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, radius } from '@react-x2-native/tokens';
import { X2Text } from '../../primitives/X2Text';
import { X2Pressable } from '../../primitives/X2Pressable';
import { useAnimatedPresence } from '../../hooks/useAnimatedPresence';
import { OverlayLayer } from '../../overlay/OverlayLayer';
import { OverlayBackdrop } from '../OverlayBackdrop/OverlayBackdrop';
import type { ModalAction, ModalProps } from './Modal.types';
import { useX2Strings } from '../../i18n/X2StringsProvider';

const MAX_WIDTH = {
  small: 300,
  medium: 400,
  large: 520,
} as const;

const isPromiseLike = (value: unknown): value is PromiseLike<unknown> =>
  typeof (value as PromiseLike<unknown> | undefined)?.then === 'function';

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  actions,
  size = 'medium',
  dismissible = true,
  keyboardAvoiding = true,
  onActionError,
  closeLabel: closeLabelProp,
  testID,
}: ModalProps) {
  const strings = useX2Strings();
  const closeLabel = closeLabelProp ?? strings.closeModal;
  const { colors } = useTheme();
  const reducedMotion = useReducedMotion();
  const { mounted, progress } = useAnimatedPresence(isOpen, { duration: 180, reducedMotion });
  const [busyIndex, setBusyIndex] = useState<number | null>(null);
  const isMounted = useRef(true);

  useEffect(() => () => {
    isMounted.current = false;
  }, []);

  useEffect(() => {
    if (!isOpen) setBusyIndex(null);
  }, [isOpen]);

  const busy = busyIndex !== null;
  const locked = !dismissible || busy;
  const requestClose = useCallback(() => {
    if (!locked) onClose();
  }, [locked, onClose]);

  const handleActionError = (error: unknown, action: ModalAction) => {
    if (!onActionError) throw error;
    onActionError(error, action);
  };

  const runAction = async (action: ModalAction, index: number) => {
    if (busy) return;
    const finish = () => {
      if (action.autoClose !== false) onClose();
    };

    let result: void | Promise<void>;
    try {
      result = action.onPress();
    } catch (error) {
      handleActionError(error, action);
      return;
    }

    if (!isPromiseLike(result)) {
      finish();
      return;
    }

    setBusyIndex(index);
    try {
      await result;
    } catch (error) {
      if (isMounted.current) setBusyIndex(null);
      handleActionError(error, action);
      return;
    }
    if (isMounted.current) setBusyIndex(null);
    finish();
  };

  const getActionColors = (variant: ModalAction['variant']) => {
    switch (variant) {
      case 'destructive':
        return { variant: 'outline' as const, border: colors.error, text: colors.error };
      case 'outline':
        return { variant: 'outline' as const, border: colors.primary, text: colors.primary };
      default:
        return { variant: 'solid' as const, border: undefined, text: colors.onPrimary };
    }
  };

  const backdropStyle = useAnimatedStyle(() => ({ opacity: progress.value }));
  const cardStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scale: 0.95 + progress.value * 0.05 }],
  }));

  return (
    <OverlayLayer visible={mounted} onRequestClose={requestClose} testID={testID}>
      <KeyboardAvoidingView
        enabled={keyboardAvoiding}
        behavior="padding"
        style={styles.center}
      >
        <Animated.View style={[StyleSheet.absoluteFill, backdropStyle]}>
          <OverlayBackdrop
            enabled={!locked}
            onPress={requestClose}
            accessibilityLabel={closeLabel}
            backgroundColor={colors.overlay}
          />
        </Animated.View>

        <Animated.View
          accessibilityViewIsModal
          style={[
            {
              width: '90%',
              maxWidth: MAX_WIDTH[size],
              backgroundColor: colors.surface,
              borderRadius: radius.lg,
              overflow: 'hidden',
              paddingTop: spacing.lg,
              paddingHorizontal: spacing.lg,
            },
            cardStyle,
          ]}
        >
          <View style={styles.header}>
            {title && (
              <X2Text
                variant="headingM"
                color={colors.text}
                style={{ flex: 1 }}
                accessibilityRole="header"
              >
                {title}
              </X2Text>
            )}
            <Pressable
              onPress={requestClose}
              disabled={locked}
              accessible
              accessibilityRole="button"
              accessibilityLabel={closeLabel}
              accessibilityState={{ disabled: locked }}
              hitSlop={8}
              style={{ padding: spacing.sm, marginLeft: 'auto', opacity: locked ? 0.4 : 1 }}
            >
              <X2Text variant="headingS" color={colors.textSecondary}>
                ✕
              </X2Text>
            </Pressable>
          </View>

          <View style={{ marginBottom: spacing.lg }}>{children}</View>

          {actions && actions.length > 0 && (
            <View style={styles.actions}>
              {actions.map((action, index) => {
                const actionColors = getActionColors(action.variant);
                const isBusy = busyIndex === index;
                return (
                  <X2Pressable
                    key={action.label}
                    onPress={() => runAction(action, index)}
                    // The running action keeps its own look (a disabled solid button turns light grey,
                    // hiding the spinner); runAction already ignores presses while busy.
                    disabled={action.disabled || (busy && !isBusy)}
                    variant={actionColors.variant}
                    borderColor={actionColors.border}
                    accessibilityLabel={action.label}
                    accessibilityState={{ busy: isBusy }}
                    style={{
                      flex: 1,
                      paddingVertical: spacing.md,
                      borderRadius: radius.sm,
                    }}
                  >
                    {isBusy ? (
                      <ActivityIndicator size="small" color={actionColors.text} />
                    ) : (
                      <X2Text color={actionColors.text} style={{ textAlign: 'center' }}>
                        {action.label}
                      </X2Text>
                    )}
                  </X2Pressable>
                );
              })}
            </View>
          )}
        </Animated.View>
      </KeyboardAvoidingView>
    </OverlayLayer>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
});
