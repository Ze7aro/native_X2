import React, { useMemo } from 'react';
import {
  View,
  Pressable,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, radius } from '@react-x2-native/tokens';
import { X2Text } from '../../primitives/X2Text';
import type { TimelineProps, TimelineItem } from './Timeline.types';

export function Timeline({
  items,
  renderItem,
  onItemPress,
  testID,
  style,
  ...props
}: TimelineProps) {
  const { colors } = useTheme();

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed':
        return colors.primary;
      case 'current':
        return colors.primary;
      case 'pending':
        return colors.surfaceVariant;
      default:
        return colors.textSecondary;
    }
  };

  const containerStyle: ViewStyle = useMemo(
    () => ({
      flexDirection: 'column',
      gap: spacing.lg,
    }),
    [],
  );

  return (
    <View
      style={[containerStyle, style]}
      testID={testID}
      {...props}
    >
      {items.map((item, index) => {
        const statusColor = getStatusColor(item.status);
        const isLast = index === items.length - 1;

        return (
          <Pressable
            key={item.id}
            onPress={() => onItemPress?.(item, index)}
            disabled={!onItemPress}
            accessible
            accessibilityRole="button"
            accessibilityLabel={item.title}
            testID={testID ? `${testID}-item-${index}` : undefined}
            style={{
              flexDirection: 'row',
              gap: spacing.lg,
              opacity: onItemPress ? 1 : 1,
            }}
          >
            {/* Timeline Marker */}
            <View
              style={{
                alignItems: 'center',
                gap: spacing.sm,
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: statusColor,
                  borderWidth: item.status === 'current' ? 3 : 0,
                  borderColor: colors.primary,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {item.icon ? (
                  item.icon
                ) : item.status === 'completed' ? (
                  <X2Text variant="labelL" color={colors.onPrimary}>
                    ✓
                  </X2Text>
                ) : (
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: colors.onPrimary,
                    }}
                  />
                )}
              </View>

              {/* Timeline Line */}
              {!isLast && (
                <View
                  style={{
                    width: 2,
                    flex: 1,
                    backgroundColor: item.status === 'completed' ? colors.primary : colors.surfaceVariant,
                  }}
                />
              )}
            </View>

            {/* Content */}
            <View style={{ flex: 1, paddingTop: spacing.sm }}>
              {renderItem ? (
                renderItem(item, index)
              ) : (
                <>
                  <X2Text
                    variant="labelL"
                    color={colors.text}
                  >
                    {item.title}
                  </X2Text>
                  {item.description && (
                    <X2Text
                      variant="bodyS"
                      color={colors.textSecondary}
                      style={{ marginTop: spacing.xs }}
                    >
                      {item.description}
                    </X2Text>
                  )}
                  <X2Text
                    variant="bodyS"
                    color={colors.textSecondary}
                    style={{ marginTop: spacing.sm }}
                  >
                    {item.timestamp}
                  </X2Text>
                </>
              )}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
