import React, { useMemo } from 'react';
import { View, ScrollView, Pressable, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { spacing } from '@react-x2-native/tokens';
import { X2Text } from '../../primitives/X2Text';
import type { BreadcrumbsProps, BreadcrumbItem } from './Breadcrumbs.types';

export function Breadcrumbs({
  items,
  separator = '/',
  maxItems = 5,
  onNavigate,
  testID,
  style,
  ...props
}: BreadcrumbsProps) {
  const { colors } = useTheme();

  const displayItems = useMemo(() => {
    if (items.length <= maxItems) return items;

    const start = items.slice(0, 1);
    const middle = [{ id: 'ellipsis', label: '…' } as BreadcrumbItem];
    const end = items.slice(-Math.max(1, maxItems - 2));

    return [...start, ...middle, ...end];
  }, [items, maxItems]);

  const containerStyle: ViewStyle = useMemo(
    () => ({
      flexDirection: 'row',
      alignItems: 'center',
    }),
    []
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[style]}
      testID={testID}
      {...props}
    >
      <View style={containerStyle}>
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const isEllipsis = item.id === 'ellipsis';

          return (
            <View key={item.id} style={{ flexDirection: 'row', alignItems: 'center' }}>
              {/* Item */}
              {isEllipsis ? (
                <X2Text
                  variant="bodyS"
                  color={colors.textSecondary}
                  style={{ marginHorizontal: spacing.sm }}
                >
                  {item.label}
                </X2Text>
              ) : (
                <Pressable
                  onPress={() => {
                    item.onPress?.();
                    onNavigate?.(item.id);
                  }}
                  disabled={isLast}
                  style={{
                    opacity: isLast ? 0.7 : 1,
                  }}
                  accessible
                  accessibilityRole="link"
                  accessibilityLabel={item.label}
                  testID={testID ? `${testID}-item-${item.id}` : undefined}
                >
                  <X2Text
                    variant="bodyS"
                    color={isLast ? colors.text : colors.primary}
                    style={{
                      textDecorationLine: isLast ? 'none' : 'underline',
                      marginHorizontal: spacing.sm,
                    }}
                  >
                    {item.label}
                  </X2Text>
                </Pressable>
              )}

              {/* Separator */}
              {!isLast && (
                <X2Text
                  variant="bodyS"
                  color={colors.textSecondary}
                  style={{ marginHorizontal: spacing.xs }}
                >
                  {separator}
                </X2Text>
              )}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
