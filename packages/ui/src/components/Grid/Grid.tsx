import React, { useCallback } from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import { spacing } from '@react-x2-native/tokens';
import { defaultKeyExtractor } from '../../utils/keyExtractor';
import type { GridProps } from './Grid.types';

export function Grid<T>({
  items,
  renderItem,
  keyExtractor = defaultKeyExtractor,
  numColumns = 2,
  gap = spacing.md,
  contentContainerStyle,
  onEndReached,
  onEndReachedThreshold = 0.8,
  scrollEnabled = true,
  testID,
  style,
  ...props
}: GridProps<T>) {
  const renderGridItem = useCallback(
    ({ item, index }: ListRenderItemInfo<T>) => (
      // flex: 1 / numColumns keeps a partially filled last row from stretching.
      <View style={{ flex: 1 / numColumns }}>{renderItem(item, index)}</View>
    ),
    [numColumns, renderItem]
  );

  return (
    <FlatList
      {...props}
      style={style}
      data={items}
      renderItem={renderGridItem}
      keyExtractor={keyExtractor}
      numColumns={numColumns}
      key={numColumns}
      columnWrapperStyle={numColumns > 1 ? { columnGap: gap } : undefined}
      contentContainerStyle={[{ rowGap: gap, padding: gap }, contentContainerStyle]}
      scrollEnabled={scrollEnabled}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      testID={testID}
    />
  );
}
