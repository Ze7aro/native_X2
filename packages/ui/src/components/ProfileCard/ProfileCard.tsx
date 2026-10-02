import React from 'react';
import { View } from 'react-native';
import { X2Surface, X2Text, X2Stack, X2Pressable, X2Divider } from '../../primitives';
import { useTheme } from '../../theme/ThemeContext';
import { spacing } from '@react-x2-native/tokens';
import type { ProfileCardProps } from './ProfileCard.types';

export function ProfileCard({
  avatar,
  title,
  subtitle,
  description,
  actions,
  children,
  testID,
  style,
  ...props
}: ProfileCardProps) {
  const { colors } = useTheme();

  return (
    <X2Surface
      testID={testID}
      style={[
        {
          overflow: 'hidden',
        },
        style,
      ]}
      {...props}
    >
      {/* Header with Avatar */}
      <X2Stack
        direction="row"
        gap="lg"
        align="flex-start"
        style={{
          padding: spacing.lg,
        }}
      >
        {avatar && (
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              overflow: 'hidden',
              backgroundColor: colors.surfaceVariant,
            }}
          >
            {avatar}
          </View>
        )}

        {/* Info */}
        <X2Stack
          gap="xs"
          align="flex-start"
          style={{ flex: 1 }}
        >
          <X2Text variant="headingM">{title}</X2Text>
          {subtitle && (
            <X2Text variant="labelM" color={colors.primary}>
              {subtitle}
            </X2Text>
          )}
          {description && (
            <X2Text
              variant="bodyS"
              color={colors.textSecondary}
              style={{ marginTop: spacing.xs }}
            >
              {description}
            </X2Text>
          )}
        </X2Stack>
      </X2Stack>

      {/* Custom Content */}
      {children && (
        <>
          <X2Divider style={{ marginHorizontal: spacing.lg }} />
          <View style={{ padding: spacing.lg }}>
            {children}
          </View>
        </>
      )}

      {/* Actions */}
      {actions && actions.length > 0 && (
        <>
          <X2Divider />
          <X2Stack
            direction="row"
            gap="md"
            justify="space-between"
            style={{
              padding: spacing.lg,
            }}
          >
            {actions.map((action, index) => (
              <X2Pressable
                key={index}
                variant={action.variant === 'secondary' ? 'outline' : 'solid'}
                borderColor={colors.primary}
                onPress={action.onPress}
                style={{
                  flex: 1,
                  paddingVertical: spacing.md,
                  paddingHorizontal: spacing.lg,
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <X2Text
                  variant="labelM"
                  color={
                    action.variant === 'secondary' ? colors.primary : colors.onPrimary
                  }
                >
                  {action.label}
                </X2Text>
              </X2Pressable>
            ))}
          </X2Stack>
        </>
      )}
    </X2Surface>
  );
}
