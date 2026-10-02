import React, { useState } from 'react';
import { View } from 'react-native';
import { Carousel, X2Surface, X2Text, X2Stack, useThemeColors } from 'react-x2-native';
import { spacing } from '@react-x2-native/tokens';

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
const TITLES = ['Slide One', 'Slide Two', 'Slide Three', 'Slide Four', 'Slide Five'];

export function CarouselShowcase() {
  const colors = useThemeColors();
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPageComplex, setCurrentPageComplex] = useState(0);

  const simplePages = COLORS.map((color, idx) => ({
    id: `simple-${idx}`,
    content: (
      <View
        style={{
          flex: 1,
          backgroundColor: color,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <X2Text variant="headingL" color={colors.onScrim}>
          {TITLES[idx]}
        </X2Text>
        <X2Text variant="bodyM" color={colors.onScrim} style={{ opacity: 0.8 }}>
          Slide {idx + 1}
        </X2Text>
      </View>
    ),
  }));

  const complexPages = [
    {
      id: 'intro',
      content: (
        <View style={{ flex: 1, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', padding: spacing.lg }}>
          <X2Text variant="headingL" color={colors.onPrimary} style={{ textAlign: 'center', marginBottom: spacing.md }}>
            Welcome to Carousel
          </X2Text>
          <X2Text variant="bodyM" color={colors.onPrimary} style={{ textAlign: 'center', opacity: 0.8 }}>
            Swipe to navigate through the slides
          </X2Text>
        </View>
      ),
    },
    {
      id: 'features',
      content: (
        <View style={{ flex: 1, backgroundColor: colors.success, justifyContent: 'center', alignItems: 'center', padding: spacing.lg }}>
          <X2Text variant="headingM" color={colors.onPrimary} style={{ marginBottom: spacing.md }}>
            Features
          </X2Text>
          <X2Stack gap="sm">
            <X2Text variant="bodyS" color={colors.onPrimary} style={{ opacity: 0.9 }}>✓ Smooth page transitions</X2Text>
            <X2Text variant="bodyS" color={colors.onPrimary} style={{ opacity: 0.9 }}>✓ Touch-based navigation</X2Text>
            <X2Text variant="bodyS" color={colors.onPrimary} style={{ opacity: 0.9 }}>✓ Animated indicators</X2Text>
          </X2Stack>
        </View>
      ),
    },
    {
      id: 'performance',
      content: (
        <View style={{ flex: 1, backgroundColor: colors.warning, justifyContent: 'center', alignItems: 'center', padding: spacing.lg }}>
          <X2Text variant="headingM" color={colors.onPrimary} style={{ marginBottom: spacing.md }}>
            Performance
          </X2Text>
          <X2Stack gap="sm">
            <X2Text variant="bodyS" color={colors.onPrimary} style={{ opacity: 0.9 }}>✓ Efficient rendering</X2Text>
            <X2Text variant="bodyS" color={colors.onPrimary} style={{ opacity: 0.9 }}>✓ 60 FPS scrolling</X2Text>
            <X2Text variant="bodyS" color={colors.onPrimary} style={{ opacity: 0.9 }}>✓ Minimal overhead</X2Text>
          </X2Stack>
        </View>
      ),
    },
  ];

  return (
    <X2Surface style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.lg }}>
      <X2Text variant="headingL" style={{ marginBottom: spacing.md }}>
        Carousel
      </X2Text>

      <X2Stack gap="lg">
        {/* Simple Carousel */}
        <X2Stack gap="md">
          <X2Text variant="labelM" color={colors.primary}>
            Simple Carousel
          </X2Text>
          <Carousel
            testID="carousel-simple"
            pages={simplePages}
            height={250}
            onPageChange={(idx) => setCurrentPage(idx)}
            showIndicators={true}
          />
          <X2Text variant="bodyS" color={colors.textSecondary}>
            Current page: {currentPage + 1} / {simplePages.length}
          </X2Text>
        </X2Stack>

        {/* Complex Carousel with Custom Colors */}
        <X2Stack gap="md">
          <X2Text variant="labelM" color={colors.primary}>
            Complex Carousel
          </X2Text>
          <Carousel
            testID="carousel-complex"
            pages={complexPages}
            height={280}
            onPageChange={(idx) => setCurrentPageComplex(idx)}
            showIndicators={true}
            indicatorColor={colors.surfaceVariant}
            activeIndicatorColor={colors.primary}
          />
          <X2Text variant="bodyS" color={colors.textSecondary}>
            Current page: {currentPageComplex + 1} / {complexPages.length}
          </X2Text>
        </X2Stack>

        {/* Current State Info */}
        <X2Surface
          backgroundColor={colors.surfaceVariant}
          style={{ padding: spacing.lg }}
        >
          <X2Text variant="labelM" color={colors.primary} style={{ marginBottom: spacing.sm }}>
            Carousel State
          </X2Text>
          <X2Stack gap="xs">
            <X2Text variant="bodyS">
              Simple carousel page: {currentPage + 1} of {simplePages.length}
            </X2Text>
            <X2Text variant="bodyS">
              Complex carousel page: {currentPageComplex + 1} of {complexPages.length}
            </X2Text>
          </X2Stack>
        </X2Surface>

        {/* Features */}
        <X2Surface backgroundColor={colors.surfaceVariant} style={{ padding: spacing.lg }}>
          <X2Text variant="labelM" color={colors.primary} style={{ marginBottom: spacing.sm }}>
            Features
          </X2Text>
          <X2Stack gap="xs">
            <X2Text variant="bodyS">✓ Touch-based swipe navigation</X2Text>
            <X2Text variant="bodyS">✓ Paging enabled (snap to page)</X2Text>
            <X2Text variant="bodyS">✓ Animated page indicators</X2Text>
            <X2Text variant="bodyS">✓ Page counter display</X2Text>
            <X2Text variant="bodyS">✓ Customizable indicator colors</X2Text>
            <X2Text variant="bodyS">✓ Optional page counter</X2Text>
            <X2Text variant="bodyS">✓ Full accessibility (radio roles)</X2Text>
            <X2Text variant="bodyS">✓ Disabled state support</X2Text>
            <X2Text variant="bodyS">✓ Efficient rendering (no re-renders)</X2Text>
            <X2Text variant="bodyS">✓ Page change callbacks</X2Text>
          </X2Stack>
        </X2Surface>

        {/* Usage Tips */}
        <X2Surface backgroundColor={colors.surfaceVariant} style={{ padding: spacing.lg }}>
          <X2Text variant="labelM" color={colors.primary} style={{ marginBottom: spacing.sm }}>
            Usage Tips
          </X2Text>
          <X2Stack gap="sm">
            <X2Text variant="bodyS" color={colors.textSecondary}>
              Pass array of pages with id and ReactNode content.
            </X2Text>
            <X2Text variant="bodyS" color={colors.textSecondary}>
              Use onPageChange callback to track current page.
            </X2Text>
            <X2Text variant="bodyS" color={colors.textSecondary}>
              Customize indicator colors for brand consistency.
            </X2Text>
            <X2Text variant="bodyS" color={colors.textSecondary}>
              Height can be adjusted per carousel.
            </X2Text>
            <X2Text variant="bodyS" color={colors.textSecondary}>
              Swipe horizontally or tap indicators to navigate.
            </X2Text>
          </X2Stack>
        </X2Surface>
      </X2Stack>
    </X2Surface>
  );
}
