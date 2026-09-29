import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  ScrollView,
  Pressable,
  ViewStyle,
  LayoutChangeEvent,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { useReducedMotion } from '@react-x2-native/core';
import { useTheme } from '../../theme/ThemeContext';
import { X2Text } from '../../primitives';
import { spacing } from '@react-x2-native/tokens';
import type { AnimatedTabsProps } from './AnimatedTabs.types';

const AnimatedView = Animated.createAnimatedComponent(View);

export function AnimatedTabs({
  tabs,
  activeTabId,
  onTabPress,
  children,
  indicatorColor,
  indicatorHeight = 3,
  showIcons = false,
  disabled = false,
  testID,
  style,
  ...props
}: AnimatedTabsProps) {
  const { colors } = useTheme();
  const reducedMotion = useReducedMotion();

  const indicatorX = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const tabRefs = useRef<{ [key: string]: View | null }>({});

  const activeIndex = tabs.findIndex((tab) => tab.id === activeTabId);

  const handleTabLayout = useCallback(
    (tabId: string, event: LayoutChangeEvent) => {
      const { x, width } = event.nativeEvent.layout;
      const isActive = tabId === activeTabId;

      if (isActive) {
        indicatorX.value = reducedMotion ? x : withSpring(x, {
          damping: 15,
          mass: 1,
        });
        indicatorWidth.value = reducedMotion ? width : withSpring(width, {
          damping: 15,
          mass: 1,
        });

        // Scroll to active tab
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            x: Math.max(0, x - spacing.lg),
            animated: true,
          });
        }
      }
    },
    [activeTabId, indicatorX, indicatorWidth, reducedMotion],
  );

  const handleTabPress = useCallback(
    (tabId: string) => {
      if (!disabled) {
        onTabPress(tabId);
      }
    },
    [disabled, onTabPress],
  );

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorX.value }],
    width: indicatorWidth.value,
  }), []);

  const tabsContainerStyle: ViewStyle = useMemo(
    () => ({
      flexDirection: 'row',
      borderBottomColor: colors.divider,
      borderBottomWidth: 1,
      opacity: disabled ? 0.5 : 1,
    }),
    [colors.divider, disabled],
  );

  return (
    <View style={[{ flex: 1 }, style]} {...props}>
      {/* Tabs Header */}
      <View style={tabsContainerStyle}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              position: 'relative',
            }}
          >
            {/* Animated Indicator */}
            <AnimatedView
              style={[
                {
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  height: indicatorHeight,
                  backgroundColor: indicatorColor ?? colors.primary,
                },
                animatedIndicatorStyle,
              ]}
              pointerEvents="none"
            />

            {/* Tabs */}
            {tabs.map((tab, index) => {
              const isActive = tab.id === activeTabId;

              return (
                <Pressable
                  key={tab.id}
                  onLayout={(event) => handleTabLayout(tab.id, event)}
                  onPress={() => handleTabPress(tab.id)}
                  disabled={disabled}
                  ref={(ref) => {
                    if (ref) tabRefs.current[tab.id] = ref;
                  }}
                  testID={testID ? `${testID}-tab-${tab.id}` : undefined}
                  accessible
                  accessibilityRole="tab"
                  accessibilityLabel={tab.label}
                  accessibilityState={{ selected: isActive }}
                  style={{
                    paddingHorizontal: spacing.lg,
                    paddingVertical: spacing.md,
                    marginRight: index === tabs.length - 1 ? spacing.lg : 0,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: showIcons && tab.icon ? spacing.sm : 0,
                    }}
                  >
                    {showIcons && tab.icon && (
                      <View
                        style={{
                          opacity: isActive ? 1 : 0.6,
                        }}
                      >
                        {tab.icon}
                      </View>
                    )}
                    <X2Text
                      variant="labelM"
                      color={isActive ? colors.primary : colors.textSecondary}
                      style={{
                        opacity: isActive ? 1 : 0.7,
                      }}
                    >
                      {tab.label}
                    </X2Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      </View>

      {/* Content */}
      {children && (
        <View
          style={{
            flex: 1,
          }}
          testID={testID ? `${testID}-content` : undefined}
        >
          {children}
        </View>
      )}
    </View>
  );
}
