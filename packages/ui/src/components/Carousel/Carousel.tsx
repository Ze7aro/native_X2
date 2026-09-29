import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
  View,
  ScrollView,
  ViewStyle,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  Extrapolate,
  interpolate,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, radius } from '@react-x2-native/tokens';
import type { CarouselProps } from './Carousel.types';

export function Carousel({
  pages,
  initialPage = 0,
  height = 300,
  showIndicators = true,
  indicatorColor,
  activeIndicatorColor,
  onPageChange,
  loop = false,
  disabled = false,
  testID,
  style,
  ...props
}: CarouselProps) {
  const { colors } = useTheme();

  const [currentPage, setCurrentPage] = useState(initialPage);
  const scrollViewRef = useRef<ScrollView>(null);
  const containerWidth = useRef(0);

  const indicatorScale = useSharedValue(1);

  const handleLayout = useCallback((e: any) => {
    containerWidth.current = e.nativeEvent.layout.width;
  }, []);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (containerWidth.current === 0) return;

      const contentOffsetX = event.nativeEvent.contentOffset.x;
      const pageIndex = Math.round(contentOffsetX / containerWidth.current);

      if (pageIndex !== currentPage && pageIndex < pages.length) {
        setCurrentPage(pageIndex);
        onPageChange?.(pageIndex, pages[pageIndex].id);
      }
    },
    [currentPage, pages, onPageChange],
  );

  const handleIndicatorPress = useCallback(
    (index: number) => {
      if (!disabled && scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: index * containerWidth.current,
          animated: true,
        });
        setCurrentPage(index);
        onPageChange?.(index, pages[index].id);
      }
    },
    [disabled, pages, onPageChange],
  );

  const carouselContainerStyle: ViewStyle = useMemo(
    () => ({
      height,
      overflow: 'hidden',
      borderRadius: radius.lg,
      backgroundColor: colors.surface,
      opacity: disabled ? 0.5 : 1,
    }),
    [height, colors.surface, disabled],
  );

  const pageContainerStyle: ViewStyle = useMemo(
    () => ({
      width: '100%',
      height: '100%',
    }),
    [],
  );

  return (
    <View style={[style]} {...props}>
      {/* Carousel Container */}
      <View
        style={carouselContainerStyle}
        onLayout={handleLayout}
        testID={testID}
      >
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          onScroll={handleScroll}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={!disabled}
          contentContainerStyle={{
            width: `${pages.length * 100}%`,
          }}
        >
          {pages.map((page, index) => (
            <View
              key={page.id}
              style={[pageContainerStyle]}
              testID={testID ? `${testID}-page-${index}` : undefined}
            >
              {page.content}
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Indicators */}
      {showIndicators && pages.length > 1 && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: spacing.md,
            gap: spacing.sm,
          }}
        >
          {pages.map((page, index) => {
            const isActive = index === currentPage;

            return (
              <Pressable
                key={page.id}
                onPress={() => handleIndicatorPress(index)}
                disabled={disabled}
                testID={testID ? `${testID}-indicator-${index}` : undefined}
                accessible
                accessibilityRole="radio"
                accessibilityLabel={`Page ${index + 1}`}
                accessibilityState={{ selected: isActive }}
                style={{
                  opacity: disabled ? 0.5 : 1,
                }}
              >
                <Animated.View
                  style={[
                    {
                      width: isActive ? 24 : 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: isActive
                        ? activeIndicatorColor ?? colors.primary
                        : indicatorColor ?? colors.surfaceVariant,
                      transition: 'all 0.3s ease-in-out',
                    },
                  ]}
                />
              </Pressable>
            );
          })}
        </View>
      )}

      {/* Page Counter */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          paddingBottom: spacing.sm,
        }}
      >
        <Animated.Text
          style={{
            fontSize: 12,
            color: colors.textSecondary,
            fontWeight: '500',
          }}
        >
          {currentPage + 1} / {pages.length}
        </Animated.Text>
      </View>
    </View>
  );
}
