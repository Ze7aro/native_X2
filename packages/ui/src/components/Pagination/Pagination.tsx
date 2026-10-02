import React, { useCallback } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { spacing } from '@react-x2-native/tokens';
import { useTheme } from '../../theme/ThemeContext';
import { X2Text } from '../../primitives/X2Text';
import type { PaginationProps } from './Pagination.types';
import { useX2Strings } from '../../i18n/X2StringsProvider';

export function Pagination({
  page,
  pageCount,
  onPageChange,
  previousLabel: previousLabelProp,
  nextLabel: nextLabelProp,
  previousIcon = '‹',
  nextIcon = '›',
  style,
  testID,
  ...props
}: PaginationProps) {
  const strings = useX2Strings();
  const previousLabel = previousLabelProp ?? strings.previousPage;
  const nextLabel = nextLabelProp ?? strings.nextPage;
  const { colors } = useTheme();
  const safePageCount = Math.max(1, Math.floor(pageCount));
  const safePage = Math.min(Math.max(Math.floor(page), 1), safePageCount);
  const isFirstPage = safePage <= 1;
  const isLastPage = safePage >= safePageCount;

  const changePage = useCallback(
    (nextPage: number) => {
      const boundedPage = Math.min(Math.max(Math.floor(nextPage), 1), safePageCount);
      if (boundedPage !== safePage) onPageChange(boundedPage);
    },
    [onPageChange, safePage, safePageCount]
  );

  return (
    <View {...props} style={[styles.container, style]} testID={testID}>
      <Pressable
        disabled={isFirstPage}
        onPress={() => changePage(safePage - 1)}
        accessibilityRole="button"
        accessibilityLabel={previousLabel}
        accessibilityState={{ disabled: isFirstPage }}
        style={({ pressed }) => [
          styles.pageButton,
          { opacity: isFirstPage ? 0.4 : pressed ? 0.65 : 1 },
        ]}
        testID={testID ? `${testID}-previous` : undefined}
      >
        <X2Text color={colors.primary}>{previousIcon}</X2Text>
      </Pressable>
      <X2Text
        variant="labelM"
        color={colors.textSecondary}
        accessibilityLabel={strings.pageOf(safePage, safePageCount)}
      >
        {safePage} / {safePageCount}
      </X2Text>
      <Pressable
        disabled={isLastPage}
        onPress={() => changePage(safePage + 1)}
        accessibilityRole="button"
        accessibilityLabel={nextLabel}
        accessibilityState={{ disabled: isLastPage }}
        style={({ pressed }) => [
          styles.pageButton,
          { opacity: isLastPage ? 0.4 : pressed ? 0.65 : 1 },
        ]}
        testID={testID ? `${testID}-next` : undefined}
      >
        <X2Text color={colors.primary}>{nextIcon}</X2Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    padding: spacing.sm,
  },
  pageButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
