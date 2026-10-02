import React, { useCallback } from 'react';
import { FlatList, ListRenderItemInfo, View, ActivityIndicator } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { spacing } from '@react-x2-native/tokens';
import { defaultKeyExtractor } from '../../utils/keyExtractor';
import type { InfiniteListProps } from './InfiniteList.types';

export function InfiniteList<T>({
  items,
  renderItem,
  keyExtractor = defaultKeyExtractor,
  onEndReached,
  gap = spacing.md,
  loadMoreThreshold = 0.8,
  isLoading = false,
  scrollEnabled = true,
  nestedScrollEnabled = false,
  ListHeaderComponent,
  ListFooterComponent,
  testID,
  ...props
}: InfiniteListProps<T>) {
  const { colors } = useTheme();

  const renderFooter = useCallback(() => {
    const customFooter =
      typeof ListFooterComponent === 'function'
        ? React.createElement(ListFooterComponent)
        : ListFooterComponent;

    if (!isLoading && !customFooter) return null;

    return (
      <>
        {customFooter}
        {isLoading ? (
          <View
            style={{
              paddingVertical: spacing.lg,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : null}
      </>
    );
  }, [ListFooterComponent, isLoading, colors.primary]);

  const renderListItem = useCallback(
    ({ item, index }: ListRenderItemInfo<T>) => <>{renderItem(item, index)}</>,
    [renderItem]
  );

  // FlatList fires onEndReached repeatedly while the footer spinner is shown.
  const handleEndReached = useCallback(() => {
    if (!isLoading) onEndReached?.();
  }, [isLoading, onEndReached]);

  return (
    <FlatList
      {...props}
      data={items}
      renderItem={renderListItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={{ gap, padding: gap }}
      onEndReached={handleEndReached}
      onEndReachedThreshold={loadMoreThreshold}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={renderFooter}
      scrollEnabled={scrollEnabled}
      nestedScrollEnabled={nestedScrollEnabled}
      testID={testID}
    />
  );
}
