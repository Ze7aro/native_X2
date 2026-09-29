import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
  View,
  Pressable,
  ViewStyle,
  LayoutChangeEvent,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  Extrapolate,
  interpolate,
} from 'react-native-reanimated';
import { useReducedMotion } from '@react-x2-native/core';
import { useTheme } from '../../theme/ThemeContext';
import { radius } from '@react-x2-native/tokens';
import type { SpotlightCardProps } from './SpotlightCard.types';

const AnimatedView = Animated.createAnimatedComponent(View);

export function SpotlightCard({
  children,
  intensity = 0.8,
  radius: spotRadius = 220,
  disabled = false,
  onPress,
  onGlowMove,
  accessibilityLabel,
  accessibilityHint,
  testID,
  style,
  ...props
}: SpotlightCardProps) {
  const { colors } = useTheme();
  const reducedMotion = useReducedMotion();

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isPressed, setIsPressed] = useState(false);

  const glowX = useSharedValue(0);
  const glowY = useSharedValue(0);
  const glowOpacity = useSharedValue(0);

  const viewRef = useRef<View>(null);

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setDimensions({ width, height });
  }, []);

  const handlePressIn = useCallback((e: any) => {
    if (reducedMotion || disabled) return;

    setIsPressed(true);
    const { locationX, locationY } = e.nativeEvent;

    glowX.value = withSpring(locationX, {
      damping: 20,
      mass: 1,
      overshootClamping: false,
      restSpeedThreshold: 0.001,
      restDisplacementThreshold: 0.001,
    });

    glowY.value = withSpring(locationY, {
      damping: 20,
      mass: 1,
      overshootClamping: false,
      restSpeedThreshold: 0.001,
      restDisplacementThreshold: 0.001,
    });

    glowOpacity.value = withSpring(intensity, {
      damping: 15,
      mass: 1,
    });

    onGlowMove?.(locationX, locationY);
  }, [intensity, reducedMotion, disabled, glowX, glowY, glowOpacity, onGlowMove]);

  const handlePressOut = useCallback(() => {
    setIsPressed(false);
    glowOpacity.value = withSpring(0, {
      damping: 15,
      mass: 1,
    });
  }, [glowOpacity]);

  const handlePress = useCallback(() => {
    if (!disabled) {
      onPress?.();
    }
  }, [disabled, onPress]);

  const animatedGlowStyle = useAnimatedStyle(
    () => ({
      position: 'absolute' as const,
      width: spotRadius * 2,
      height: spotRadius * 2,
      borderRadius: spotRadius,
      opacity: glowOpacity.value,
      backgroundColor: colors.primary,
      transform: [
        {
          translateX: interpolate(
            glowX.value,
            [0, dimensions.width],
            [-spotRadius, dimensions.width - spotRadius],
            Extrapolate.EXTEND,
          ),
        },
        {
          translateY: interpolate(
            glowY.value,
            [0, dimensions.height],
            [-spotRadius, dimensions.height - spotRadius],
            Extrapolate.EXTEND,
          ),
        },
      ],
    }),
    [spotRadius, colors.primary, dimensions],
  );

  const glowStyle = useMemo<ViewStyle>(
    () => ({
      position: 'absolute',
      width: spotRadius * 2,
      height: spotRadius * 2,
      borderRadius: spotRadius,
      opacity: 0,
      backgroundColor: colors.primary,
      top: -spotRadius,
      left: -spotRadius,
    }),
    [spotRadius, colors.primary],
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
      accessibilityLabel={accessibilityLabel || 'Interactive card'}
      accessibilityHint={accessibilityHint || 'Double tap to activate'}
      accessibilityState={{ disabled }}
      style={[
        cardStyle,
        {
          transform: [{ scale: isPressed && !reducedMotion ? 0.98 : 1 }],
        },
        style,
      ]}
      onLayout={handleLayout}
      {...props}
    >
      {/* Glow layer - only render if not using reduced motion */}
      {!reducedMotion && (
        <AnimatedView
          style={[
            glowStyle,
            {
              filter: 'blur(40px)' as any,
            },
            animatedGlowStyle,
          ]}
          pointerEvents="none"
        />
      )}

      {/* Content */}
      <View
        style={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        {children}
      </View>
    </Pressable>
  );
}
