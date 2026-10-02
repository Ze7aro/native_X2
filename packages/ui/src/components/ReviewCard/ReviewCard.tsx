import { useMemo } from 'react';
import { View, Pressable, ViewStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useReducedMotion } from '@react-x2-native/core';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, radius } from '@react-x2-native/tokens';
import { X2Text } from '../../primitives/X2Text';
import type { ReviewCardProps } from './ReviewCard.types';
import { useX2Strings } from '../../i18n/X2StringsProvider';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function ReviewCard({
  author,
  avatar,
  rating,
  text,
  date,
  onPress,
  backgroundColor,
  disabled = false,
  testID,
  style,
  ...props
}: ReviewCardProps) {
  const strings = useX2Strings();
  const { colors } = useTheme();
  const reducedMotion = useReducedMotion();

  const scale = useSharedValue(1);

  const handlePressIn = () => {
    if (reducedMotion || !onPress || disabled) return;
    scale.value = withSpring(0.98, { damping: 15, mass: 1 });
  };

  const handlePressOut = () => {
    if (reducedMotion || !onPress || disabled) return;
    scale.value = withSpring(1, { damping: 15, mass: 1 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const cardStyle: ViewStyle = useMemo(
    () => ({
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      borderRadius: radius.lg,
      backgroundColor: backgroundColor ?? colors.surface,
      opacity: disabled ? 0.5 : 1,
      gap: spacing.md,
    }),
    [backgroundColor, colors.surface, disabled]
  );

  const renderStars = (count: number) => {
    return Array.from({ length: 5 })
      .map((_, i) => (i < count ? '⭐' : '☆'))
      .join('');
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || !onPress}
      accessible
      accessibilityRole="button"
      accessibilityLabel={strings.reviewBy(author)}
      accessibilityState={{ disabled }}
      testID={testID}
      style={[cardStyle, animatedStyle, style]}
      {...props}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing.md,
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm, flex: 1 }}>
          {avatar && <View style={{ width: 40, height: 40 }}>{avatar}</View>}
          <View style={{ flex: 1 }}>
            <X2Text variant="labelL" color={colors.text}>
              {author}
            </X2Text>
            <X2Text variant="bodyS" color={colors.textSecondary}>
              {date}
            </X2Text>
          </View>
        </View>
        <X2Text variant="labelM" color={colors.primary}>
          {renderStars(rating)}
        </X2Text>
      </View>

      {/* Review Text */}
      <X2Text variant="bodyS" color={colors.text} numberOfLines={3}>
        {text}
      </X2Text>
    </AnimatedPressable>
  );
}
