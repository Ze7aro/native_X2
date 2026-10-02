import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { useReducedMotion } from '@react-x2-native/core';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, radius } from '@react-x2-native/tokens';
import { useAnimatedPresence } from '../../hooks/useAnimatedPresence';
import { OverlayLayer } from '../../overlay/OverlayLayer';
import { OverlayBackdrop } from '../OverlayBackdrop/OverlayBackdrop';
import type { BottomSheetProps } from './BottomSheet.types';
import { useX2Strings } from '../../i18n/X2StringsProvider';

const DISMISS_VELOCITY = 800;
const DISMISS_RATIO = 0.25;
// How far ahead (in seconds) the release velocity projects the final position.
const VELOCITY_PROJECTION = 0.2;
const SPRING = { damping: 20, mass: 1 };

export function BottomSheet({
  isOpen,
  onClose,
  children,
  snapPoints,
  initialSnapIndex = 0,
  onSnapChange,
  header,
  enableBackdropPress = true,
  dismissible = true,
  keyboardAvoiding = true,
  closeLabel: closeLabelProp,
  testID,
}: BottomSheetProps) {
  const strings = useX2Strings();
  const closeLabel = closeLabelProp ?? strings.closeSheet;
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const reducedMotion = useReducedMotion();
  const { height: windowHeight } = useWindowDimensions();

  const { mounted, progress } = useAnimatedPresence(isOpen, { reducedMotion });
  const [layoutHeight, setLayoutHeight] = useState(windowHeight);
  const [snapIndex, setSnapIndex] = useState(initialSnapIndex);
  // Resting offset of the sheet (0 = fully open) and the live drag delta on top of it.
  const snapOffset = useSharedValue(0);
  const dragY = useSharedValue(0);

  const snapping = !!snapPoints && snapPoints.length > 0;

  // Snap layout: the sheet is as tall as the largest point; smaller points push it down by an offset.
  const { sheetHeight, offsets } = useMemo(() => {
    if (!snapPoints || snapPoints.length === 0) return { sheetHeight: layoutHeight, offsets: [0] };
    const heights = snapPoints
      .map((point) => Math.min(1, Math.max(0.05, point)) * windowHeight)
      .sort((a, b) => a - b);
    const tallest = heights[heights.length - 1];
    return { sheetHeight: tallest, offsets: heights.map((height) => Math.round(tallest - height)) };
  }, [snapPoints, windowHeight, layoutHeight]);

  const clampedInitial = Math.min(Math.max(initialSnapIndex, 0), offsets.length - 1);

  useEffect(() => {
    if (!isOpen) return;
    dragY.value = 0;
    snapOffset.value = offsets[clampedInitial];
    setSnapIndex(clampedInitial);
  }, [isOpen, clampedInitial, offsets, dragY, snapOffset]);

  const requestClose = useCallback(() => {
    if (dismissible) onClose();
  }, [dismissible, onClose]);

  const handleSnap = useCallback(
    (index: number) => {
      setSnapIndex(index);
      onSnapChange?.(index);
    },
    [onSnapChange]
  );

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .enabled(dismissible || (snapping && offsets.length > 1))
        .onUpdate((event) => {
          const lowest = -snapOffset.value; // cannot be dragged above fully open
          const highest = dismissible
            ? sheetHeight - snapOffset.value
            : offsets[offsets.length - 1] - snapOffset.value;
          dragY.value = Math.min(highest, Math.max(lowest, event.translationY));
        })
        .onEnd((event) => {
          if (!snapping) {
            if (
              event.translationY > layoutHeight * DISMISS_RATIO ||
              event.velocityY > DISMISS_VELOCITY
            ) {
              scheduleOnRN(onClose);
            } else {
              dragY.value = withSpring(0, SPRING);
            }
            return;
          }

          const projected = snapOffset.value + dragY.value + event.velocityY * VELOCITY_PROJECTION;
          let target = offsets[0];
          let targetIndex = 0;
          let best = Math.abs(projected - offsets[0]);
          for (let i = 1; i < offsets.length; i++) {
            const distance = Math.abs(projected - offsets[i]);
            if (distance < best) {
              best = distance;
              target = offsets[i];
              targetIndex = i;
            }
          }

          if (dismissible && Math.abs(projected - sheetHeight) < best) {
            scheduleOnRN(onClose);
            return;
          }

          // Fold the drag into the resting offset so the spring continues from the finger position.
          snapOffset.value = snapOffset.value + dragY.value;
          dragY.value = 0;
          snapOffset.value = withSpring(target, SPRING);
          scheduleOnRN(handleSnap, targetIndex);
        }),
    [
      dragY,
      snapOffset,
      dismissible,
      snapping,
      offsets,
      sheetHeight,
      layoutHeight,
      onClose,
      handleSnap,
    ]
  );

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
  }));

  const sheetAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: (1 - progress.value) * sheetHeight + snapOffset.value + dragY.value },
    ],
  }));

  const sheetStyle: ViewStyle = useMemo(
    () => ({
      ...(snapping ? { height: sheetHeight } : { maxHeight: windowHeight }),
      paddingBottom: insets.bottom + spacing.lg,
      paddingHorizontal: spacing.lg,
      backgroundColor: colors.surface,
      borderTopLeftRadius: radius.xl,
      borderTopRightRadius: radius.xl,
    }),
    [snapping, sheetHeight, windowHeight, colors.surface, insets.bottom]
  );

  return (
    <OverlayLayer visible={mounted} onRequestClose={requestClose} testID={testID}>
      <GestureHandlerRootView style={styles.root}>
        <KeyboardAvoidingView
          enabled={keyboardAvoiding}
          behavior="padding"
          pointerEvents="box-none"
          style={styles.root}
        >
          <Animated.View
            style={[StyleSheet.absoluteFill, { backgroundColor: colors.overlay }, backdropStyle]}
          >
            <OverlayBackdrop
              enabled={enableBackdropPress && dismissible}
              onPress={requestClose}
              accessibilityLabel={closeLabel}
            />
          </Animated.View>

          <Animated.View
            style={[sheetStyle, sheetAnimatedStyle]}
            onLayout={(event) => {
              if (!snapping) setLayoutHeight(event.nativeEvent.layout.height);
            }}
            accessibilityViewIsModal
          >
            <GestureDetector gesture={panGesture}>
              <View style={styles.handleArea}>
                <View style={[styles.handle, { backgroundColor: colors.textSecondary }]} />
                {header && <View style={{ marginTop: spacing.md }}>{header}</View>}
              </View>
            </GestureDetector>

            {/* The part of the sheet below the current snap point is off-screen: keep content above it. */}
            <View
              style={
                snapping
                  ? { flex: 1, paddingBottom: offsets[Math.min(snapIndex, offsets.length - 1)] }
                  : undefined
              }
            >
              {children}
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </GestureHandlerRootView>
    </OverlayLayer>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  handleArea: {
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    opacity: 0.5,
  },
});
