import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, radius } from '@react-x2-native/tokens';
import { X2Text } from '../../primitives/X2Text';
import type { StatsCardProps } from './StatsCard.types';

export function StatsCard({
  label,
  value,
  unit = '',
  trend,
  trendValue,
  backgroundColor,
  disabled = false,
  testID,
  style,
  ...props
}: StatsCardProps) {
  const { colors } = useTheme();

  const trendColor = useMemo(() => {
    switch (trend) {
      case 'up':
        return colors.success;
      case 'down':
        return colors.error;
      default:
        return colors.textSecondary;
    }
  }, [colors.error, colors.success, colors.textSecondary, trend]);

  const trendIcon = useMemo(() => {
    switch (trend) {
      case 'up':
        return '📈';
      case 'down':
        return '📉';
      default:
        return '→';
    }
  }, [trend]);

  const cardStyle: ViewStyle = useMemo(
    () => ({
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      borderRadius: radius.lg,
      backgroundColor: backgroundColor ?? colors.surface,
      opacity: disabled ? 0.5 : 1,
      gap: spacing.sm,
    }),
    [backgroundColor, colors.surface, disabled]
  );

  return (
    <View style={[cardStyle, style]} testID={testID} {...props}>
      {/* Value */}
      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: spacing.xs }}>
        <X2Text variant="headingL" color={colors.primary} style={{ fontFamily: 'Courier' }}>
          {value}
        </X2Text>
        {unit && (
          <X2Text variant="labelM" color={colors.textSecondary}>
            {unit}
          </X2Text>
        )}
      </View>

      {/* Label */}
      <X2Text variant="bodyS" color={colors.textSecondary}>
        {label}
      </X2Text>

      {/* Trend */}
      {trend && trendValue && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.xs,
            marginTop: spacing.xs,
          }}
        >
          <X2Text variant="labelS" color={trendColor}>
            {trendIcon}
          </X2Text>
          <X2Text variant="labelS" color={trendColor}>
            {trendValue}
          </X2Text>
        </View>
      )}
    </View>
  );
}
