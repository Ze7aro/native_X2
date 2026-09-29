import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
  View,
  Pressable,
  ViewStyle,
  LayoutChangeEvent,
  Animated as RNAnimated,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useReducedMotion } from '@react-x2-native/core';
import { useTheme } from '../../theme/ThemeContext';
import { radius } from '@react-x2-native/tokens';
import type { TiltedCardProps } from './TiltedCard.types';

const AnimatedView = Animated.createAnimatedComponent(View);

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
  const { colors } = useTheme();
  const reducedMotion = useReducedMotion();

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isPressed, setIsPressed] = useState(false);

  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);

  const viewRef = useRef<View>(null);

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setDimensions({ width, height });
  }, []);

  const handlePressIn = useCallback(
    (e: any) => {
      if (reducedMotion || disabled) return;

      setIsPressed(true);
      const { locationX, locationY } = e.nativeEvent;

      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;

      const distX = (locationX - centerX) / centerX;
      const distY = (locationY - centerY) / centerY;

      const tiltX = -distY * maxTilt * intensity;
      const tiltY = distX * maxTilt * intensity;

      rotateX.value = withSpring(tiltX, {
        damping: 15,
        mass: 1,
      });

      rotateY.value = withSpring(tiltY, {
        damping: 15,
        mass: 1,
      });

      onTilt?.(tiltX, tiltY);
    },
    [maxTilt, intensity, reducedMotion, disabled, dimensions, rotateX, rotateY, onTilt],
  );

  const handlePressOut = useCallback(() => {
    setIsPressed(false);
    rotateX.value = withSpring(0, {
      damping: 15,
      mass: 1,
    });
    rotateY.value = withSpring(0, {
      damping: 15,
      mass: 1,
    });
  }, [rotateX, rotateY]);

  const handlePress = useCallback(() => {
    if (!disabled) {
      onPress?.();
    }
  }, [disabled, onPress]);

  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [
        { perspective: 1000 },
        { rotateX: `${rotateX.value}deg` },
        { rotateY: `${rotateY.value}deg` },
      ],
    }),
    [],
  );

  const cardStyle: ViewStyle = useMemo(
    () => ({
      borderRadius: radius.lg,
      backgroundColor: colors.surface,
      overflow: 'hidden',
      opacity: disabled ? 0.5 : 1,
    }),
    [colors.surface, disabled],
  );

  return (
    <Pressable
      ref={viewRef}
      disabled={disabled}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      testID={testID}
      accessible
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || 'Interactive tilted card'}
      accessibilityHint={accessibilityHint || 'Double tap to activate, move to tilt'}
      accessibilityState={{ disabled }}
      style={[cardStyle, style]}
      onLayout={handleLayout}
      {...props}
    >
      <AnimatedView
        style={[
          {
            flex: 1,
          },
          !reducedMotion && animatedStyle,
        ]}
      >
        {children}
      </AnimatedView>
    </Pressable>
  );
}
