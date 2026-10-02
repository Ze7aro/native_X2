import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import {
  View,
  ScrollView,
  ViewStyle,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  LayoutChangeEvent,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useReducedMotion } from '@react-x2-native/core';
import { useTheme } from '../../theme/ThemeContext';
import { X2Text } from '../../primitives';
import { spacing, radius } from '@react-x2-native/tokens';
import type { CarouselProps } from './Carousel.types';
import { useX2Strings } from '../../i18n/X2StringsProvider';

function CarouselIndicator({
  active,
  color,
  activeColor,
  reducedMotion,
}: {
  active: boolean;
  color: string;
  activeColor: string;
  reducedMotion: boolean;
}) {
  const width = useSharedValue(active ? 24 : 8);

  useEffect(() => {
    const target = active ? 24 : 8;
    width.value = reducedMotion ? target : withSpring(target, { damping: 15, mass: 1 });
  }, [active, reducedMotion, width]);

  const animatedStyle = useAnimatedStyle(() => ({ width: width.value }));

  return (
    <Animated.View
      style={[
        {
          height: 8,
          borderRadius: 4,
          backgroundColor: active ? activeColor : color,
        },
        animatedStyle,
      ]}
    />
  );
}

export function Carousel({
  pages,
  initialPage = 0,
  height = 300,
  showIndicators = true,
  showCounter = true,
  indicatorColor,
  activeIndicatorColor,
  onPageChange,
  disabled = false,
  testID,
  style,
  ...props
}: CarouselProps) {
  const strings = useX2Strings();
  const { colors } = useTheme();
  const reducedMotion = useReducedMotion();

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageWidth, setPageWidth] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const currentPageRef = useRef(initialPage);

  const goToPage = useCallback(
    (index: number) => {
      if (index === currentPageRef.current || index < 0 || index >= pages.length) return;
      currentPageRef.current = index;
      setCurrentPage(index);
      onPageChange?.(index, pages[index].id);
    },
    [pages, onPageChange]
  );

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const width = event.nativeEvent.layout.width;
      if (width === pageWidth) return;
      setPageWidth(width);
      // Keep the current page in view on first layout and on rotation.
      requestAnimationFrame(() => {
        scrollViewRef.current?.scrollTo({ x: currentPageRef.current * width, animated: false });
      });
    },
    [pageWidth]
  );

  const handleMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (pageWidth === 0) return;
      goToPage(Math.round(event.nativeEvent.contentOffset.x / pageWidth));
    },
    [pageWidth, goToPage]
  );

  const handleIndicatorPress = useCallback(
    (index: number) => {
      if (disabled) return;
      scrollViewRef.current?.scrollTo({ x: index * pageWidth, animated: !reducedMotion });
      goToPage(index);
    },
    [disabled, pageWidth, reducedMotion, goToPage]
  );

  const carouselContainerStyle: ViewStyle = useMemo(
    () => ({
      height,
      overflow: 'hidden',
      borderRadius: radius.lg,
      backgroundColor: colors.surface,
      opacity: disabled ? 0.5 : 1,
    }),
    [height, colors.surface, disabled]
  );

  return (
    <View {...props} style={style}>
      <View style={carouselContainerStyle} onLayout={handleLayout} testID={testID}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          onMomentumScrollEnd={handleMomentumScrollEnd}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={!disabled}
          testID={testID ? `${testID}-scrollview` : undefined}
        >
          {pages.map((page, index) => (
            <View
              key={page.id}
              style={{ width: pageWidth, height: '100%' }}
              testID={testID ? `${testID}-page-${index}` : undefined}
            >
              {page.content}
            </View>
          ))}
        </ScrollView>
      </View>

      {showIndicators && pages.length > 1 && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: spacing.md,
            gap: spacing.sm,
          }}
          accessibilityRole="radiogroup"
        >
          {pages.map((page, index) => {
            const isActive = index === currentPage;

            return (
              <Pressable
                key={page.id}
                onPress={() => handleIndicatorPress(index)}
                disabled={disabled}
                hitSlop={8}
                testID={testID ? `${testID}-indicator-${index}` : undefined}
                accessible
                accessibilityRole="radio"
                accessibilityLabel={strings.pageOf(index + 1, pages.length)}
                accessibilityState={{ checked: isActive, disabled }}
              >
                <CarouselIndicator
                  active={isActive}
                  color={indicatorColor ?? colors.surfaceVariant}
                  activeColor={activeIndicatorColor ?? colors.primary}
                  reducedMotion={reducedMotion}
                />
              </Pressable>
            );
          })}
        </View>
      )}

      {showCounter && (
        <X2Text
          variant="labelM"
          color={colors.textSecondary}
          style={{ textAlign: 'center', paddingBottom: spacing.sm }}
        >
          {currentPage + 1} / {pages.length}
        </X2Text>
      )}
    </View>
  );
}
