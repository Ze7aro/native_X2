import React, { useMemo } from 'react';
import { View, Pressable, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeContext';
import { X2Text } from '../../primitives';
import { spacing } from '@react-x2-native/tokens';
import type { DockProps } from './Dock.types';

const AnimatedView = Animated.createAnimatedComponent(View);

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

  const indicatorPosition = useSharedValue(0);
  const activeIndex = items.findIndex((item) => item.id === activeId);

  React.useEffect(() => {
    const position = activeIndex * 60;
    indicatorPosition.value = withSpring(position, {
      damping: 15,
      mass: 1,
    });
  }, [activeIndex, indicatorPosition]);

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorPosition.value }],
  }), []);

  const dockStyle: ViewStyle = useMemo(
    () => ({
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: showLabels ? 'flex-start' : 'center',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      paddingBottom: Math.max(spacing.md, insets.bottom),
      backgroundColor: backgroundColor ?? colors.surface,
      borderTopColor: colors.divider,
      borderTopWidth: 1,
      gap: showLabels ? spacing.sm : 0,
    }),
    [backgroundColor, colors, showLabels, insets.bottom],
  );

  return (
    <View
      testID={testID}
      style={[dockStyle, style]}
      {...props}
    >
      {/* Animated indicator */}
      <AnimatedView
        style={[
          {
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: 4,
            height: 4,
            borderRadius: 2,
            backgroundColor: indicatorColor ?? colors.primary,
            marginLeft: spacing.lg,
          },
          animatedIndicatorStyle,
        ]}
        pointerEvents="none"
      />

      {/* Items */}
      {items.map((item, index) => {
        const isActive = item.id === activeId;

        return (
          <Pressable
            key={item.id}
            onPress={() => {
              indicatorPosition.value = withSpring(index * 60, {
                damping: 15,
                mass: 1,
              });
              runOnJS(item.onPress)();
            }}
            testID={testID ? `${testID}-item-${item.id}` : undefined}
            accessible
            accessibilityRole="tab"
            accessibilityLabel={item.label}
            accessibilityState={{ selected: isActive }}
            style={{
              width: 60,
              height: showLabels ? 70 : 48,
              justifyContent: 'center',
              alignItems: 'center',
              opacity: isActive ? 1 : 0.6,
            }}
          >
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                gap: showLabels ? spacing.xs : 0,
              }}
            >
              <View
                style={{
                  opacity: isActive ? 1 : 0.7,
                }}
              >
                {item.icon}
              </View>
              {showLabels && (
                <X2Text
                  variant="labelS"
                  color={isActive ? colors.primary : colors.textSecondary}
                  style={{
                    textAlign: 'center',
                    maxWidth: 50,
                  }}
                >
                  {item.label}
                </X2Text>
              )}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
