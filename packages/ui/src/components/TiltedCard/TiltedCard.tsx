import { useRef, useCallback, useMemo } from 'react';
import { View, Pressable, ViewStyle, GestureResponderEvent } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useReducedMotion } from '@react-x2-native/core';
import { useTheme } from '../../theme/ThemeContext';
import { radius } from '@react-x2-native/tokens';
import type { TiltedCardProps } from './TiltedCard.types';
import { useX2Strings } from '../../i18n/X2StringsProvider';

const SPRING_CONFIG = { damping: 15, mass: 1 };

interface CardFrame {
  pageX: number;
  pageY: number;
  width: number;
  height: number;
}

export function TiltedCard({
  children,
  maxTilt = 15,
  intensity = 0.8,
  disabled = false,
  onPress,
  onTilt,
  accessibilityLabel,
  accessibilityHint,
  testID,
  style,
  ...props
}: TiltedCardProps) {
  const strings = useX2Strings();
  const { colors } = useTheme();
  const reducedMotion = useReducedMotion();

  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);

  const viewRef = useRef<View>(null);
  const frame = useRef<CardFrame | null>(null);
  const lastTouch = useRef<{ pageX: number; pageY: number } | null>(null);

  // pageX/pageY are used because locationX/Y are relative to whichever child was touched.
  const applyTilt = useCallback(
    (pageX: number, pageY: number) => {
      const f = frame.current;
      if (!f || f.width === 0 || f.height === 0) return;

      const distX = (pageX - f.pageX - f.width / 2) / (f.width / 2);
      const distY = (pageY - f.pageY - f.height / 2) / (f.height / 2);
      const clampUnit = (v: number) => Math.max(-1, Math.min(1, v));

      const tiltX = -clampUnit(distY) * maxTilt * intensity;
      const tiltY = clampUnit(distX) * maxTilt * intensity;

      rotateX.value = withSpring(tiltX, SPRING_CONFIG);
      rotateY.value = withSpring(tiltY, SPRING_CONFIG);
      onTilt?.(tiltX, tiltY);
    },
    [maxTilt, intensity, rotateX, rotateY, onTilt]
  );

  const handlePressIn = useCallback(
    (event: GestureResponderEvent) => {
      if (reducedMotion || disabled) return;
      const { pageX, pageY } = event.nativeEvent;
      lastTouch.current = { pageX, pageY };

      viewRef.current?.measure((_x, _y, width, height, framePageX, framePageY) => {
        frame.current = { pageX: framePageX, pageY: framePageY, width, height };
        if (lastTouch.current) {
          applyTilt(lastTouch.current.pageX, lastTouch.current.pageY);
        }
      });
    },
    [reducedMotion, disabled, applyTilt]
  );

  const handleTouchMove = useCallback(
    (event: GestureResponderEvent) => {
      if (reducedMotion || disabled || !lastTouch.current) return;
      const { pageX, pageY } = event.nativeEvent;
      lastTouch.current = { pageX, pageY };
      applyTilt(pageX, pageY);
    },
    [reducedMotion, disabled, applyTilt]
  );

  const resetTilt = useCallback(() => {
    lastTouch.current = null;
    rotateX.value = withSpring(0, SPRING_CONFIG);
    rotateY.value = withSpring(0, SPRING_CONFIG);
  }, [rotateX, rotateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateX: `${rotateX.value}deg` },
      { rotateY: `${rotateY.value}deg` },
    ],
  }));

  const cardStyle: ViewStyle = useMemo(
    () => ({
      borderRadius: radius.lg,
      backgroundColor: colors.surface,
      overflow: 'hidden',
      opacity: disabled ? 0.5 : 1,
    }),
    [colors.surface, disabled]
  );

  return (
    <Pressable
      {...props}
      ref={viewRef}
      disabled={disabled}
      onPressIn={handlePressIn}
      onTouchMove={handleTouchMove}
      onPressOut={resetTilt}
      onTouchCancel={resetTilt}
      onPress={disabled ? undefined : onPress}
      testID={testID}
      accessible
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || strings.interactiveTiltedCard}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
      style={[cardStyle, style]}
    >
      <Animated.View style={[{ flex: 1 }, !reducedMotion && animatedStyle]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}
