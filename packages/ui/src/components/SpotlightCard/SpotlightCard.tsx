import React, { useState, useCallback, useMemo } from 'react';
import { View, Pressable, ViewStyle, GestureResponderEvent } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useReducedMotion } from '@react-x2-native/core';
import { useTheme } from '../../theme/ThemeContext';
import { radius } from '@react-x2-native/tokens';
import type { SpotlightCardProps } from './SpotlightCard.types';
import { useX2Strings } from '../../i18n/X2StringsProvider';

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
  const strings = useX2Strings();
  const { colors } = useTheme();
  const reducedMotion = useReducedMotion();

  const [isPressed, setIsPressed] = useState(false);

  const glowX = useSharedValue(0);
  const glowY = useSharedValue(0);
  const glowOpacity = useSharedValue(0);

  const handlePressIn = useCallback(
    (e: GestureResponderEvent) => {
      if (reducedMotion || disabled) return;

      setIsPressed(true);
      const { locationX, locationY } = e.nativeEvent;

      glowX.value = withSpring(locationX, { damping: 20, mass: 1 });
      glowY.value = withSpring(locationY, { damping: 20, mass: 1 });

      glowOpacity.value = withSpring(intensity, {
        damping: 15,
        mass: 1,
      });

      onGlowMove?.(locationX, locationY);
    },
    [intensity, reducedMotion, disabled, glowX, glowY, glowOpacity, onGlowMove]
  );

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

  // Glow is centered on the touch point: its top-left corner sits at (x - R, y - R).
  const animatedGlowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
    transform: [{ translateX: glowX.value - spotRadius }, { translateY: glowY.value - spotRadius }],
  }));

  const glowStyle = useMemo<ViewStyle>(
    () => ({
      position: 'absolute',
      top: 0,
      left: 0,
      width: spotRadius * 2,
      height: spotRadius * 2,
      borderRadius: spotRadius,
      backgroundColor: colors.primary,
    }),
    [spotRadius, colors.primary]
  );

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
      disabled={disabled}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      testID={testID}
      accessible
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || strings.interactiveCard}
      accessibilityHint={accessibilityHint || strings.interactiveCardHint}
      accessibilityState={{ disabled }}
      style={[
        cardStyle,
        {
          transform: [{ scale: isPressed && !reducedMotion ? 0.98 : 1 }],
        },
        style,
      ]}
    >
      {/* Glow layer - only render if not using reduced motion */}
      {!reducedMotion && (
        <AnimatedView style={[glowStyle, animatedGlowStyle]} pointerEvents="none" />
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
