import { useMemo } from 'react';
import { View, Pressable, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useReducedMotion } from '@react-x2-native/core';
import { useTheme } from '../../theme/ThemeContext';
import { X2Text } from '../../primitives';
import { useSelectionIndicator } from '../../hooks/useSelectionIndicator';
import { spacing } from '@react-x2-native/tokens';
import type { DockProps } from './Dock.types';

const ITEM_WIDTH = 60;
const DOT_SIZE = 4;

export function Dock({
  items,
  activeId,
  backgroundColor,
  indicatorColor,
  showLabels = false,
  testID,
  style,
  ...props
}: DockProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const reducedMotion = useReducedMotion();

  const { onItemLayout, x, width } = useSelectionIndicator(activeId, { reducedMotion });

  const dotStyle = useAnimatedStyle(() => ({
    opacity: width.value > 0 ? 1 : 0,
    transform: [{ translateX: x.value + width.value / 2 - DOT_SIZE / 2 }],
  }));

  const dockStyle: ViewStyle = useMemo(
    () => ({
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: showLabels ? 'flex-start' : 'center',
      paddingHorizontal: spacing.md,
      paddingTop: spacing.md,
      paddingBottom: Math.max(spacing.md, insets.bottom),
      backgroundColor: backgroundColor ?? colors.surface,
      borderTopColor: colors.divider,
      borderTopWidth: 1,
      gap: showLabels ? spacing.sm : 0,
    }),
    [backgroundColor, colors, showLabels, insets.bottom]
  );

  return (
    <View {...props} testID={testID} style={[dockStyle, style]} accessibilityRole="tablist">
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: spacing.xs,
            left: 0,
            width: DOT_SIZE,
            height: DOT_SIZE,
            borderRadius: DOT_SIZE / 2,
            backgroundColor: indicatorColor ?? colors.primary,
          },
          dotStyle,
        ]}
        pointerEvents="none"
      />

      {items.map((item) => {
        const isActive = item.id === activeId;

        return (
          <Pressable
            key={item.id}
            onLayout={(event) => onItemLayout(item.id, event)}
            onPress={item.onPress}
            testID={testID ? `${testID}-item-${item.id}` : undefined}
            accessible
            accessibilityRole="tab"
            accessibilityLabel={item.label}
            accessibilityState={{ selected: isActive }}
            style={{
              width: ITEM_WIDTH,
              height: showLabels ? 70 : 48,
              justifyContent: 'center',
              alignItems: 'center',
              gap: showLabels ? spacing.xs : 0,
              opacity: isActive ? 1 : 0.6,
            }}
          >
            {item.icon}
            {showLabels && (
              <X2Text
                variant="labelS"
                color={isActive ? colors.primary : colors.textSecondary}
                numberOfLines={1}
                style={{
                  textAlign: 'center',
                  maxWidth: ITEM_WIDTH - 10,
                }}
              >
                {item.label}
              </X2Text>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
