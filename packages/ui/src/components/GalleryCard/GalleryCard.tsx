import { useMemo } from 'react';
import { View, Pressable, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, radius } from '@react-x2-native/tokens';
import { X2Text } from '../../primitives/X2Text';
import type { GalleryCardProps } from './GalleryCard.types';
import { useX2Strings } from '../../i18n/X2StringsProvider';

export function GalleryCard({
  images,
  title,
  maxVisible = 4,
  onImagePress,
  onViewAll,
  disabled = false,
  testID,
  style,
  ...props
}: GalleryCardProps) {
  const strings = useX2Strings();
  const { colors } = useTheme();

  const visibleImages = images.slice(0, maxVisible);
  const hiddenCount = Math.max(0, images.length - maxVisible);

  const cardStyle: ViewStyle = useMemo(
    () => ({
      opacity: disabled ? 0.5 : 1,
    }),
    [disabled]
  );

  return (
    <View style={[cardStyle, style]} testID={testID} {...props}>
      {/* Title */}
      {title && (
        <X2Text variant="labelL" color={colors.text} style={{ marginBottom: spacing.md }}>
          {title}
        </X2Text>
      )}

      {/* Gallery Grid */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: spacing.md,
          marginBottom: spacing.md,
        }}
      >
        {visibleImages.map((image, index) => (
          <Pressable
            key={image.id}
            onPress={() => onImagePress?.(index, image.id)}
            disabled={disabled || !onImagePress}
            accessible
            accessibilityRole="button"
            accessibilityLabel={image.title || strings.imageN(index + 1)}
            testID={testID ? `${testID}-image-${index}` : undefined}
            style={{
              flex: 1,
              minWidth: '45%',
              aspectRatio: 1,
              borderRadius: radius.md,
              overflow: 'hidden',
              backgroundColor: colors.surfaceVariant,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {image.content}
          </Pressable>
        ))}

        {/* More Indicator */}
        {hiddenCount > 0 && (
          <Pressable
            onPress={onViewAll}
            disabled={disabled || !onViewAll}
            accessible
            accessibilityRole="button"
            accessibilityLabel={strings.viewAllImages(images.length)}
            testID={testID ? `${testID}-view-all` : undefined}
            style={{
              flex: 1,
              minWidth: '45%',
              aspectRatio: 1,
              borderRadius: radius.md,
              overflow: 'hidden',
              backgroundColor: colors.surfaceVariant,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View style={{ gap: spacing.sm, alignItems: 'center' }}>
              <X2Text variant="headingM" color={colors.primary}>
                +{hiddenCount}
              </X2Text>
              <X2Text variant="labelS" color={colors.textSecondary}>
                {strings.more}
              </X2Text>
            </View>
          </Pressable>
        )}
      </View>
    </View>
  );
}
