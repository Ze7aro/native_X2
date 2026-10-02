import React, { useMemo } from 'react';
import {
  View,
  Pressable,
  ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useReducedMotion } from '@react-x2-native/core';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, radius } from '@react-x2-native/tokens';
import { X2Text } from '../../primitives/X2Text';
import type { FeatureCardProps } from './FeatureCard.types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function FeatureCard({
  icon,
  title,
  description,
  onPress,
  backgroundColor,
  variant = 'default',
  disabled = false,
  testID,
  style,
  ...props
}: FeatureCardProps) {
  const { colors } = useTheme();
  const reducedMotion = useReducedMotion();

  const scale = useSharedValue(1);

  const handlePressIn = () => {
    if (reducedMotion || !onPress || disabled) return;
    scale.value = withSpring(0.95, { damping: 15, mass: 1 });
  };

  const handlePressOut = () => {
    if (reducedMotion || !onPress || disabled) return;
    scale.value = withSpring(1, { damping: 15, mass: 1 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const sizeConfig = {
    default: { iconSize: 64, padding: spacing.lg },
    compact: { iconSize: 48, padding: spacing.md },
    highlighted: { iconSize: 72, padding: spacing.xl },
  };

  const config = sizeConfig[variant];

  const cardStyle: ViewStyle = useMemo(
    () => ({
      paddingHorizontal: config.padding,
      paddingVertical: config.padding,
      borderRadius: radius.lg,
      backgroundColor: backgroundColor ?? (
        variant === 'highlighted'
          ? colors.primary
          : colors.surface
      ),
      opacity: disabled ? 0.5 : 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.md,
    }),
    [config.padding, backgroundColor, variant, colors.surface, colors.primary, disabled],
  );

  const titleColor = variant === 'highlighted' ? colors.onPrimary : colors.text;
  const descriptionColor = variant === 'highlighted' ? colors.onPrimary : colors.textSecondary;

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || !onPress}
      accessible
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint={description}
      accessibilityState={{ disabled }}
      testID={testID}
      style={[cardStyle, animatedStyle, style]}
      {...props}
    >
      {/* Icon */}
      <View style={{ width: config.iconSize, height: config.iconSize, justifyContent: 'center', alignItems: 'center' }}>
        {icon}
      </View>

      {/* Title */}
      <X2Text
        variant={variant === 'compact' ? 'labelL' : 'headingS'}
        color={titleColor}
        style={{ textAlign: 'center' }}
      >
        {title}
      </X2Text>

      {/* Description */}
      <X2Text
        variant="bodyS"
        color={descriptionColor}
        style={{ textAlign: 'center', opacity: variant === 'highlighted' ? 0.8 : 1 }}
      >
        {description}
      </X2Text>
    </AnimatedPressable>
  );
}
