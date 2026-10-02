import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { elevation, radius, spacing } from '@react-x2-native/tokens';
import { useTheme } from '../../theme/ThemeContext';
import { EmptyState } from '../EmptyState';
import { X2Pressable } from '../../primitives/X2Pressable';
import { X2Text } from '../../primitives/X2Text';
import type { DashboardCardProps } from './DashboardCard.types';
import { useX2Strings } from '../../i18n/X2StringsProvider';

export function DashboardCard({
  title,
  subtitle,
  icon,
  headerAction,
  metric,
  metricLabel,
  trend,
  children,
  footer,
  status = 'ready',
  loadingContent,
  emptyContent,
  emptyMessage: emptyMessageProp,
  errorContent,
  errorMessage: errorMessageProp,
  retryLabel: retryLabelProp,
  onRetry,
  variant = 'outlined',
  onPress,
  disabled = false,
  minHeight,
  style,
  testID,
  ...props
}: DashboardCardProps) {
  const strings = useX2Strings();
  const emptyMessage = emptyMessageProp ?? strings.noDataAvailable;
  const errorMessage = errorMessageProp ?? strings.somethingWentWrong;
  const retryLabel = retryLabelProp ?? strings.retry;
  const { colors } = useTheme();

  const cardStyle = useMemo(
    () => ({
      minHeight,
      borderRadius: radius.lg,
      borderWidth: variant === 'outlined' ? StyleSheet.hairlineWidth : 0,
      borderColor: colors.border,
      backgroundColor: variant === 'glass' ? `${colors.surface}E6` : colors.surface,
      opacity: disabled ? 0.55 : 1,
    }),
    [colors.border, colors.surface, disabled, minHeight, variant],
  );

  const trendColor = trend?.direction === 'up'
    ? colors.success
    : trend?.direction === 'down'
      ? colors.error
      : colors.textSecondary;
  const trendIcon = trend?.direction === 'up' ? '↑' : trend?.direction === 'down' ? '↓' : '→';

  const content = (
    <View
      {...props}
      style={[styles.card, elevation.sm, cardStyle, style]}
      testID={testID}
    >
      <View style={styles.header}>
        <View style={styles.headingGroup}>
          {icon && <View style={styles.icon}>{icon}</View>}
          <View style={styles.headingText}>
            <X2Text variant="labelL">{title}</X2Text>
            {subtitle && <X2Text variant="bodyS" color={colors.textSecondary}>{subtitle}</X2Text>}
          </View>
        </View>
        {headerAction && <View style={styles.headerAction}>{headerAction}</View>}
      </View>

      {metric && (
        <View style={styles.metric}>
          <X2Text variant="headingL" color={colors.primary}>{metric}</X2Text>
          {metricLabel && <X2Text variant="bodyS" color={colors.textSecondary}>{metricLabel}</X2Text>}
        </View>
      )}

      {trend && (
        <View style={styles.trend}>
          <X2Text variant="labelM" color={trendColor}>{trendIcon}</X2Text>
          <X2Text variant="labelS" color={trendColor}>{trend.value ? `${trend.value} ` : ''}{trend.label}</X2Text>
        </View>
      )}

      <View style={styles.body}>
        {status === 'loading' ? (
          loadingContent ?? <ActivityIndicator color={colors.primary} testID={testID ? `${testID}-loading` : undefined} />
        ) : status === 'empty' ? (
          emptyContent ?? <EmptyState title={emptyMessage} compact />
        ) : status === 'error' ? (
          errorContent ?? (
            <View style={styles.state}>
              <X2Text variant="bodyS" color={colors.error} style={styles.stateMessage} accessibilityRole="alert">
                {errorMessage}
              </X2Text>
              {onRetry && (
                <X2Pressable
                  variant="outline"
                  borderColor={colors.error}
                  onPress={onRetry}
                  accessibilityLabel={retryLabel}
                  style={styles.retry}
                  testID={testID ? `${testID}-retry` : undefined}
                >
                  <X2Text variant="labelM" color={colors.error}>{retryLabel}</X2Text>
                </X2Pressable>
              )}
            </View>
          )
        ) : children}
      </View>

      {footer && <View style={styles.footer}>{footer}</View>}
    </View>
  );

  if (!onPress) return content;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled }}
      style={({ pressed }) => ({ opacity: pressed && !disabled ? 0.82 : 1 })}
      testID={testID ? `${testID}-pressable` : undefined}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    overflow: 'hidden',
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  headingGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  icon: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingText: {
    flex: 1,
    gap: spacing.xs,
  },
  headerAction: {
    alignItems: 'flex-end',
  },
  metric: {
    marginTop: spacing.lg,
    gap: spacing.xs,
  },
  trend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  body: {
    marginTop: spacing.lg,
  },
  state: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
  },
  stateMessage: {
    textAlign: 'center',
  },
  retry: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
  },
  footer: {
    marginTop: spacing.lg,
  },
});
