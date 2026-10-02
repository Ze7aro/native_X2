import { useMemo } from 'react';
import { View, Pressable, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, radius } from '@react-x2-native/tokens';
import { X2Text } from '../../primitives/X2Text';
import { X2Pressable } from '../../primitives/X2Pressable';
import { X2Surface } from '../../primitives/X2Surface';
import type { EventCardProps } from './EventCard.types';
import { useX2Strings } from '../../i18n/X2StringsProvider';

export function EventCard({
  title,
  date,
  time,
  location,
  attendees,
  image,
  onPress,
  onRegister,
  dateLabel: dateLabelProp,
  timeLabel: timeLabelProp,
  locationLabel: locationLabelProp,
  registerLabel: registerLabelProp,
  disabled = false,
  testID,
  style,
  ...props
}: EventCardProps) {
  const strings = useX2Strings();
  const dateLabel = dateLabelProp ?? strings.eventDate;
  const timeLabel = timeLabelProp ?? strings.eventTime;
  const locationLabel = locationLabelProp ?? strings.eventLocation;
  const registerLabel = registerLabelProp ?? strings.registerNow;
  const { colors } = useTheme();

  const cardStyle: ViewStyle = useMemo(
    () => ({
      borderRadius: radius.lg,
      overflow: 'hidden',
      opacity: disabled ? 0.5 : 1,
    }),
    [disabled]
  );

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
          height: 200,
          backgroundColor: colors.surfaceVariant,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {image}

        {/* Gradient Overlay */}
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: colors.scrim,
          }}
        />

        {/* Title Overlay */}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: colors.scrimStrong,
            paddingHorizontal: spacing.lg,
            paddingVertical: spacing.md,
          }}
        >
          <X2Text variant="headingS" color={colors.onScrim} numberOfLines={2}>
            {title}
          </X2Text>
        </View>
      </View>

      {/* Info Container */}
      <X2Surface
        backgroundColor={colors.surface}
        style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.lg, gap: spacing.md }}
      >
        {/* Event Details Grid */}
        <View style={{ flexDirection: 'row', gap: spacing.md }}>
          {/* Date */}
          <View style={{ flex: 1, gap: spacing.xs }}>
            <X2Text variant="labelS" color={colors.textSecondary}>
              📅 {dateLabel}
            </X2Text>
            <X2Text variant="bodyS" color={colors.text}>
              {date}
            </X2Text>
          </View>

          {/* Time */}
          <View style={{ flex: 1, gap: spacing.xs }}>
            <X2Text variant="labelS" color={colors.textSecondary}>
              🕐 {timeLabel}
            </X2Text>
            <X2Text variant="bodyS" color={colors.text}>
              {time}
            </X2Text>
          </View>
        </View>

        {/* Location */}
        <View style={{ gap: spacing.xs }}>
          <X2Text variant="labelS" color={colors.textSecondary}>
            📍 {locationLabel}
          </X2Text>
          <X2Text variant="bodyS" color={colors.text} numberOfLines={2}>
            {location}
          </X2Text>
        </View>

        {/* Attendees */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.xs,
            paddingVertical: spacing.sm,
            paddingHorizontal: spacing.md,
            backgroundColor: colors.surfaceVariant,
            borderRadius: radius.md,
          }}
        >
          <X2Text variant="labelM" color={colors.primary}>
            👥
          </X2Text>
          <X2Text variant="bodyS" color={colors.text}>
            {attendees} attending
          </X2Text>
        </View>

        {/* Register Button */}
        {onRegister && (
          <X2Pressable
            onPress={onRegister}
            disabled={disabled || !onRegister}
            variant="solid"
            style={{
              paddingVertical: spacing.md,
              marginTop: spacing.sm,
            }}
          >
            <X2Text color={colors.onPrimary} variant="labelM" style={{ textAlign: 'center' }}>
              {registerLabel}
            </X2Text>
          </X2Pressable>
        )}
      </X2Surface>
    </Pressable>
  );
}
