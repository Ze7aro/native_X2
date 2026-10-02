import React, { useMemo } from 'react';
import { View, Pressable, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, radius } from '@react-x2-native/tokens';
import { X2Text } from '../../primitives/X2Text';
import { X2Pressable } from '../../primitives/X2Pressable';
import type { ProductCardProps } from './ProductCard.types';
import { useX2Strings } from '../../i18n/X2StringsProvider';

export function ProductCard({
  image,
  title,
  price,
  originalPrice,
  rating,
  inStock,
  onAddToCart,
  addToCartLabel,
  unavailableLabel,
  outOfStockLabel,
  onPress,
  disabled = false,
  testID,
  style,
  ...props
}: ProductCardProps) {
  const strings = useX2Strings();
  const { colors } = useTheme();

  const cardStyle: ViewStyle = useMemo(
    () => ({
      borderRadius: radius.lg,
      backgroundColor: colors.surface,
      overflow: 'hidden',
      opacity: disabled ? 0.5 : 1,
    }),
    [colors.surface, disabled]
  );

  const discountPercent = originalPrice
    ? Math.round(
        ((parseFloat(originalPrice) - parseFloat(price)) / parseFloat(originalPrice)) * 100
      )
    : 0;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || !onPress}
      accessible
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled }}
      testID={testID}
      style={[cardStyle, style]}
      {...props}
    >
      {/* Image Container */}
      <View
        style={{
          width: '100%',
          aspectRatio: 1,
          backgroundColor: colors.surfaceVariant,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {image}

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <View
            style={{
              position: 'absolute',
              top: spacing.md,
              right: spacing.md,
              backgroundColor: colors.error,
              paddingHorizontal: spacing.sm,
              paddingVertical: spacing.xs,
              borderRadius: radius.md,
            }}
          >
            <X2Text variant="labelS" color={colors.onError}>
              -{discountPercent}%
            </X2Text>
          </View>
        )}

        {/* Stock Status */}
        {!inStock && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: colors.scrim,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <X2Text variant="labelL" color={colors.onScrim}>
              {outOfStockLabel ?? strings.outOfStock}
            </X2Text>
          </View>
        )}
      </View>

      {/* Info */}
      <View style={{ paddingHorizontal: spacing.md, paddingVertical: spacing.md, gap: spacing.sm }}>
        {/* Title */}
        <X2Text variant="labelL" color={colors.text} numberOfLines={2}>
          {title}
        </X2Text>

        {/* Rating */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
          <X2Text variant="labelS" color={colors.primary}>
            ⭐ {rating.toFixed(1)}
          </X2Text>
        </View>

        {/* Price */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
          <X2Text variant="headingS" color={colors.primary} style={{ fontFamily: 'Courier' }}>
            {price}
          </X2Text>
          {originalPrice && (
            <X2Text
              variant="bodyS"
              color={colors.textSecondary}
              style={{
                textDecorationLine: 'line-through',
                fontFamily: 'Courier',
              }}
            >
              {originalPrice}
            </X2Text>
          )}
        </View>

        {/* Add to Cart Button */}
        <X2Pressable
          onPress={onAddToCart}
          disabled={disabled || !inStock || !onAddToCart}
          variant={inStock ? 'solid' : 'outline'}
          style={{
            paddingVertical: spacing.md,
            marginTop: spacing.sm,
          }}
        >
          <X2Text
            color={inStock ? colors.onPrimary : colors.primary}
            variant="labelM"
            style={{ textAlign: 'center' }}
          >
            {inStock
              ? (addToCartLabel ?? strings.addToCart)
              : (unavailableLabel ?? strings.unavailable)}
          </X2Text>
        </X2Pressable>
      </View>
    </Pressable>
  );
}
