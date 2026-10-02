import { useRef, useCallback } from 'react';
import { View, ScrollView, Pressable, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { useReducedMotion } from '@react-x2-native/core';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, radius } from '@react-x2-native/tokens';
import { X2Text } from '../../primitives/X2Text';
import { useSelectionIndicator } from '../../hooks/useSelectionIndicator';
import type { TabsVariantsProps } from './TabsVariants.types';

export function TabsVariants({
  tabs,
  activeTabId,
  onTabPress,
  variant = 'underline',
  indicatorColor,
  backgroundColor,
  children,
  disabled = false,
  testID,
}: TabsVariantsProps) {
  const { colors } = useTheme();
  const reducedMotion = useReducedMotion();
  const scrollViewRef = useRef<ScrollView>(null);

  const { onItemLayout, indicatorStyle } = useSelectionIndicator(activeTabId, {
    reducedMotion,
    onMove: (layout, animated) => {
      if (variant === 'underline' || variant === 'archivero') {
        scrollViewRef.current?.scrollTo({ x: Math.max(0, layout.x - spacing.lg), animated });
      }
    },
  });

  const handleTabPress = useCallback(
    (tabId: string) => {
      if (disabled) return;
      onTabPress(tabId);
    },
    [disabled, onTabPress]
  );

  // Render based on variant
  const renderUnderline = () => (
    <View>
      {/* Tab Headers */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <View style={{ flexDirection: 'row' }}>
          <Animated.View
            pointerEvents="none"
            style={[
              {
                position: 'absolute',
                left: 0,
                bottom: 0,
                height: 3,
                backgroundColor: indicatorColor ?? colors.primary,
              },
              indicatorStyle,
            ]}
          />
          {tabs.map((tab, index) => {
            const isActive = tab.id === activeTabId;

            return (
              <Pressable
                key={tab.id}
                onPress={() => handleTabPress(tab.id)}
                onLayout={(e) => onItemLayout(tab.id, e)}
                disabled={disabled}
                accessible
                accessibilityRole="tab"
                accessibilityLabel={tab.label}
                accessibilityState={{ selected: isActive }}
                testID={testID ? `${testID}-tab-${index}` : undefined}
                style={{
                  paddingHorizontal: spacing.lg,
                  paddingVertical: spacing.md,
                  gap: spacing.sm,
                  flexDirection: 'row',
                  alignItems: 'center',
                  opacity: disabled ? 0.5 : 1,
                }}
              >
                {tab.icon}
                <X2Text
                  variant="labelM"
                  color={isActive ? (indicatorColor ?? colors.primary) : colors.textSecondary}
                >
                  {tab.label}
                </X2Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* Content */}
      {children}
    </View>
  );

  const renderPill = () => (
    <View style={{ gap: spacing.md }}>
      <ScrollView ref={scrollViewRef} horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', paddingHorizontal: spacing.md, gap: spacing.sm }}>
          {tabs.map((tab, index) => {
            const isActive = tab.id === activeTabId;

            return (
              <Pressable
                key={tab.id}
                onPress={() => handleTabPress(tab.id)}
                disabled={disabled}
                accessible
                accessibilityRole="tab"
                accessibilityLabel={tab.label}
                accessibilityState={{ selected: isActive }}
                testID={testID ? `${testID}-tab-${index}` : undefined}
                style={{
                  paddingHorizontal: spacing.lg,
                  paddingVertical: spacing.md,
                  borderRadius: radius.full,
                  backgroundColor: isActive
                    ? (indicatorColor ?? colors.primary)
                    : colors.surfaceVariant,
                  gap: spacing.sm,
                  flexDirection: 'row',
                  alignItems: 'center',
                  opacity: disabled ? 0.5 : 1,
                }}
              >
                {tab.icon}
                <X2Text variant="labelM" color={isActive ? colors.onPrimary : colors.text}>
                  {tab.label}
                </X2Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* Content */}
      {children}
    </View>
  );

  const renderBackground = () => (
    <View style={{ gap: spacing.md }}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: backgroundColor ?? colors.surfaceVariant,
          borderRadius: radius.md,
          padding: spacing.sm,
          gap: spacing.sm,
        }}
      >
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeTabId;

          return (
            <Pressable
              key={tab.id}
              onPress={() => handleTabPress(tab.id)}
              disabled={disabled}
              accessible
              accessibilityRole="tab"
              accessibilityLabel={tab.label}
              accessibilityState={{ selected: isActive }}
              testID={testID ? `${testID}-tab-${index}` : undefined}
              style={{
                flex: 1,
                paddingHorizontal: spacing.md,
                paddingVertical: spacing.md,
                borderRadius: radius.sm,
                backgroundColor: isActive ? (indicatorColor ?? colors.primary) : 'transparent',
                gap: spacing.sm,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: disabled ? 0.5 : 1,
              }}
            >
              {tab.icon}
              <X2Text variant="labelM" color={isActive ? colors.onPrimary : colors.text}>
                {tab.label}
              </X2Text>
            </Pressable>
          );
        })}
      </View>

      {/* Content */}
      {children}
    </View>
  );

  const renderIconOnly = () => (
    <View style={{ gap: spacing.md }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingVertical: spacing.md,
        }}
      >
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeTabId;

          return (
            <Pressable
              key={tab.id}
              onPress={() => handleTabPress(tab.id)}
              disabled={disabled}
              accessible
              accessibilityRole="tab"
              accessibilityLabel={tab.label}
              accessibilityState={{ selected: isActive }}
              testID={testID ? `${testID}-tab-${index}` : undefined}
              style={{
                width: 48,
                height: 48,
                borderRadius: radius.full,
                backgroundColor: isActive
                  ? (indicatorColor ?? colors.primary)
                  : colors.surfaceVariant,
                justifyContent: 'center',
                alignItems: 'center',
                opacity: disabled ? 0.5 : 1,
              }}
            >
              {tab.icon}
            </Pressable>
          );
        })}
      </View>

      {/* Content */}
      {children}
    </View>
  );

  const renderArchivero = () => (
    <View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'flex-end' }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
            paddingHorizontal: spacing.sm,
          }}
        >
          {tabs.map((tab, index) => {
            const isActive = tab.id === activeTabId;
            return (
              <Pressable
                key={tab.id}
                onPress={() => handleTabPress(tab.id)}
                onLayout={(event) => onItemLayout(tab.id, event)}
                disabled={disabled}
                accessible
                accessibilityRole="tab"
                accessibilityLabel={tab.label}
                accessibilityState={{ selected: isActive, disabled }}
                testID={testID ? `${testID}-tab-${index}` : undefined}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: spacing.sm,
                  minHeight: 48,
                  paddingHorizontal: spacing.lg,
                  paddingVertical: spacing.md,
                  marginRight: spacing.xs,
                  marginBottom: isActive ? -1 : 0,
                  borderTopLeftRadius: radius.md,
                  borderTopRightRadius: radius.md,
                  borderWidth: StyleSheet.hairlineWidth,
                  borderBottomWidth: isActive ? 1 : StyleSheet.hairlineWidth,
                  borderColor: isActive ? colors.border : 'transparent',
                  borderBottomColor: isActive ? colors.surface : 'transparent',
                  backgroundColor: isActive ? colors.surface : colors.surfaceVariant,
                  opacity: disabled ? 0.5 : 1,
                }}
              >
                {tab.icon}
                <X2Text variant="labelM" color={isActive ? colors.text : colors.textSecondary}>
                  {tab.label}
                </X2Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
      {children}
    </View>
  );

  switch (variant) {
    case 'pill':
      return renderPill();
    case 'background':
      return renderBackground();
    case 'icon-only':
      return renderIconOnly();
    case 'archivero':
      return renderArchivero();
    case 'underline':
    default:
      return renderUnderline();
  }
}
