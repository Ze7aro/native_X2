import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { spacing, radius } from '@react-x2-native/tokens';
import { useTheme } from '../../theme/ThemeContext';
import { X2Text } from '../../primitives/X2Text';
import { FilterBar } from '../FilterBar';
import { EmptyState } from '../EmptyState';
import { Pagination } from '../Pagination';
import type {
  DataTableCellValue,
  DataTableColumn,
  DataTableProps,
  DataTableSort,
} from './DataTable.types';
import { useX2Strings } from '../../i18n/X2StringsProvider';
import { defaultKeyExtractor } from '../../utils/keyExtractor';

export function DataTable<T>({
  data,
  columns,
  keyExtractor = defaultKeyExtractor,
  variant = 'outlined',
  density = 'comfortable',
  header,
  footer,
  filterable = false,
  filterText,
  defaultFilterText = '',
  onFilterChange,
  filterPlaceholder: filterPlaceholderProp,
  filterItem,
  loading = false,
  loadingContent,
  emptyContent,
  emptyMessage: emptyMessageProp,
  showHeader = true,
  selectionMode = 'none',
  selectedKeys,
  defaultSelectedKeys = [],
  onSelectionChange,
  sort,
  defaultSort,
  onSortChange,
  pageSize,
  page,
  defaultPage = 1,
  onPageChange,
  onRowPress,
  renderRowActions,
  rowStyle,
  minWidth,
  testID,
  style,
  ...props
}: DataTableProps<T>) {
  const strings = useX2Strings();
  const filterPlaceholder = filterPlaceholderProp ?? strings.searchTable;
  const emptyMessage = emptyMessageProp ?? strings.noDataAvailable;
  const { colors } = useTheme();
  const [internalSelectedKeys, setInternalSelectedKeys] = useState(defaultSelectedKeys);
  const [internalSort, setInternalSort] = useState<DataTableSort | null>(defaultSort ?? null);
  const [internalPage, setInternalPage] = useState(defaultPage);
  const [internalFilterText, setInternalFilterText] = useState(defaultFilterText);

  const activeSelectedKeys = selectedKeys ?? internalSelectedKeys;
  const activeSort = sort === undefined ? internalSort : sort;
  const activePage = page ?? internalPage;
  const activeFilterText = filterText ?? internalFilterText;

  const filteredData = useMemo(() => {
    const query = activeFilterText.trim().toLocaleLowerCase();
    if (!query) return data;
    if (filterItem) return data.filter((item) => filterItem(item, query));

    return data.filter((item) =>
      columns.some((column) => {
        if (!column.accessor) return false;
        return formatCellValue(column.accessor(item)).toLocaleLowerCase().includes(query);
      })
    );
  }, [activeFilterText, columns, data, filterItem]);

  const sortedData = useMemo(() => {
    if (!activeSort) return filteredData;

    const column = columns.find((candidate) => candidate.id === activeSort.columnId);
    if (!column?.accessor && !column?.compare) return filteredData;

    return [...filteredData].sort((left, right) => {
      const comparison = column.compare
        ? column.compare(left, right)
        : compareValues(column.accessor?.(left), column.accessor?.(right));
      return activeSort.direction === 'asc' ? comparison : -comparison;
    });
  }, [activeSort, columns, filteredData]);

  const totalPages = pageSize ? Math.max(1, Math.ceil(sortedData.length / pageSize)) : 1;
  const safePage = Math.min(Math.max(activePage, 1), totalPages);
  const visibleData = pageSize
    ? sortedData.slice((safePage - 1) * pageSize, safePage * pageSize)
    : sortedData;

  const updatePage = useCallback(
    (nextPage: number) => {
      if (page === undefined) setInternalPage(nextPage);
      onPageChange?.(nextPage);
    },
    [onPageChange, page]
  );

  useEffect(() => {
    if (activePage !== safePage) updatePage(safePage);
  }, [activePage, safePage, updatePage]);

  const updateSelection = useCallback(
    (nextKeys: string[]) => {
      if (selectedKeys === undefined) setInternalSelectedKeys(nextKeys);
      onSelectionChange?.(nextKeys);
    },
    [onSelectionChange, selectedKeys]
  );

  const updateFilter = useCallback(
    (nextValue: string) => {
      if (filterText === undefined) setInternalFilterText(nextValue);
      onFilterChange?.(nextValue);
      if (pageSize) updatePage(1);
    },
    [filterText, onFilterChange, pageSize, updatePage]
  );

  const updateSort = useCallback(
    (nextSort: DataTableSort | null) => {
      if (sort === undefined) setInternalSort(nextSort);
      onSortChange?.(nextSort);
      if (pageSize) updatePage(1);
    },
    [onSortChange, pageSize, sort, updatePage]
  );

  const getKey = useCallback((item: T, index: number) => keyExtractor(item, index), [keyExtractor]);

  const toggleRowSelection = useCallback(
    (item: T, index: number) => {
      const key = getKey(item, index);
      if (selectionMode === 'single') {
        updateSelection(activeSelectedKeys.includes(key) ? [] : [key]);
        return;
      }
      if (selectionMode !== 'multiple') return;

      updateSelection(
        activeSelectedKeys.includes(key)
          ? activeSelectedKeys.filter((selectedKey) => selectedKey !== key)
          : [...activeSelectedKeys, key]
      );
    },
    [activeSelectedKeys, getKey, selectionMode, updateSelection]
  );

  const visibleKeys = useMemo(
    () => visibleData.map((item, index) => getKey(item, index)),
    [getKey, visibleData]
  );
  const allVisibleSelected =
    selectionMode === 'multiple' &&
    visibleKeys.length > 0 &&
    visibleKeys.every((key) => activeSelectedKeys.includes(key));

  const toggleAllVisible = useCallback(() => {
    if (selectionMode !== 'multiple') return;
    if (allVisibleSelected) {
      updateSelection(activeSelectedKeys.filter((key) => !visibleKeys.includes(key)));
      return;
    }
    updateSelection(Array.from(new Set([...activeSelectedKeys, ...visibleKeys])));
  }, [activeSelectedKeys, allVisibleSelected, selectionMode, updateSelection, visibleKeys]);

  const handleHeaderPress = useCallback(
    (column: DataTableColumn<T>) => {
      if (!column.sortable || (!column.accessor && !column.compare)) return;
      if (activeSort?.columnId !== column.id) {
        updateSort({ columnId: column.id, direction: 'asc' });
      } else if (activeSort.direction === 'asc') {
        updateSort({ columnId: column.id, direction: 'desc' });
      } else {
        updateSort(null);
      }
    },
    [activeSort, updateSort]
  );

  const tableStyle = useMemo<ViewStyle>(
    () => ({
      minWidth: minWidth ?? Math.max(520, columns.length * 140),
      borderRadius: radius.lg,
      borderWidth: variant === 'outlined' ? StyleSheet.hairlineWidth : 0,
      borderColor: colors.border,
      backgroundColor: variant === 'glass' ? `${colors.surface}E6` : colors.surface,
      overflow: 'hidden',
    }),
    [colors.border, colors.surface, columns.length, minWidth, variant]
  );

  const rowPadding = density === 'compact' ? spacing.sm : spacing.md;

  return (
    <View {...props} style={[styles.container, style]} testID={testID}>
      {filterable && (
        <FilterBar
          searchValue={activeFilterText}
          onSearchChange={updateFilter}
          onClear={() => updateFilter('')}
          searchPlaceholder={filterPlaceholder}
          testID={testID ? `${testID}-filters` : undefined}
          style={styles.filterBar}
        />
      )}
      {header && <View style={styles.toolbar}>{header}</View>}

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={tableStyle}>
          {showHeader && (
            <View style={[styles.row, styles.headerRow, { borderBottomColor: colors.border }]}>
              {selectionMode === 'multiple' && (
                <SelectionControl
                  checked={allVisibleSelected}
                  indeterminate={activeSelectedKeys.length > 0 && !allVisibleSelected}
                  onPress={toggleAllVisible}
                  label={strings.selectAllRows}
                  color={colors.primary}
                  onColor={colors.onPrimary}
                />
              )}
              {columns.map((column) => (
                <TableHeader
                  key={column.id}
                  column={column}
                  sort={activeSort?.columnId === column.id ? activeSort.direction : undefined}
                  onPress={() => handleHeaderPress(column)}
                  padding={rowPadding}
                  textColor={colors.textSecondary}
                />
              ))}
              {renderRowActions && <View style={{ width: 64 }} />}
            </View>
          )}

          {loading ? (
            <View style={styles.stateContainer}>
              {loadingContent ?? <ActivityIndicator color={colors.primary} />}
            </View>
          ) : visibleData.length === 0 ? (
            <View style={styles.stateContainer}>
              {emptyContent ?? <EmptyState title={emptyMessage} compact />}
            </View>
          ) : (
            <ScrollView
              style={pageSize ? { maxHeight: 420 } : undefined}
              nestedScrollEnabled
              showsVerticalScrollIndicator={pageSize !== undefined}
            >
              {visibleData.map((item, index) => {
                const key = getKey(item, index);
                const isSelected = activeSelectedKeys.includes(key);
                const row = (
                  <View
                    style={[
                      styles.row,
                      { borderBottomColor: colors.divider },
                      isSelected && { backgroundColor: `${colors.primary}14` },
                      rowStyle?.(item, index, isSelected),
                    ]}
                  >
                    {selectionMode !== 'none' && (
                      <SelectionControl
                        checked={isSelected}
                        onPress={() => toggleRowSelection(item, index)}
                        label={strings.selectRow(index + 1)}
                        color={colors.primary}
                        onColor={colors.onPrimary}
                      />
                    )}
                    {columns.map((column) => (
                      <View
                        key={column.id}
                        style={[
                          styles.cell,
                          { paddingVertical: rowPadding, paddingHorizontal: rowPadding },
                          column.width ? { width: column.width } : styles.defaultCell,
                          getAlignStyle(column.align),
                        ]}
                      >
                        {column.renderCell ? (
                          column.renderCell(item, index)
                        ) : (
                          <X2Text numberOfLines={2}>
                            {formatCellValue(column.accessor?.(item))}
                          </X2Text>
                        )}
                      </View>
                    ))}
                    {renderRowActions && (
                      <View style={styles.actionsCell}>{renderRowActions(item, index)}</View>
                    )}
                  </View>
                );

                return onRowPress ? (
                  <Pressable
                    key={key}
                    onPress={() => onRowPress(item, index)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                  >
                    {row}
                  </Pressable>
                ) : (
                  <React.Fragment key={key}>{row}</React.Fragment>
                );
              })}
            </ScrollView>
          )}
        </View>
      </ScrollView>

      {pageSize && totalPages > 1 && (
        <Pagination
          page={safePage}
          pageCount={totalPages}
          onPageChange={updatePage}
          testID={testID ? `${testID}-pagination` : undefined}
        />
      )}

      {footer && <View style={styles.footer}>{footer}</View>}
    </View>
  );
}

function TableHeader<T>({
  column,
  sort,
  onPress,
  padding,
  textColor,
}: {
  column: DataTableColumn<T>;
  sort?: DataTableSort['direction'];
  onPress: () => void;
  padding: number;
  textColor: string;
}) {
  const strings = useX2Strings();
  const content = (
    <View
      style={[
        styles.headerCell,
        { paddingVertical: padding, paddingHorizontal: padding },
        column.width ? { width: column.width } : styles.defaultCell,
        getAlignStyle(column.align),
      ]}
    >
      <X2Text variant="labelM" color={textColor}>
        {column.header}
        {sort === 'asc' ? ' ↑' : sort === 'desc' ? ' ↓' : ''}
      </X2Text>
    </View>
  );

  return column.sortable ? (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={strings.sortBy(String(column.header))}
    >
      {content}
    </Pressable>
  ) : (
    content
  );
}

function SelectionControl({
  checked,
  indeterminate = false,
  onPress,
  label,
  color,
  onColor,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onPress: () => void;
  label: string;
  color: string;
  onColor: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="checkbox"
      accessibilityLabel={label}
      accessibilityState={{ checked }}
      hitSlop={8}
      style={styles.selectionControl}
    >
      <View
        style={[
          styles.checkbox,
          { borderColor: color, backgroundColor: checked ? color : 'transparent' },
        ]}
      >
        {(checked || indeterminate) && <X2Text color={onColor}>{indeterminate ? '−' : '✓'}</X2Text>}
      </View>
    </Pressable>
  );
}

function compareValues(left: DataTableCellValue, right: DataTableCellValue): number {
  if (left === right) return 0;
  if (left === null || left === undefined) return -1;
  if (right === null || right === undefined) return 1;
  if (left instanceof Date && right instanceof Date) return left.getTime() - right.getTime();
  if (typeof left === 'number' && typeof right === 'number') return left - right;
  if (typeof left === 'boolean' && typeof right === 'boolean') return Number(left) - Number(right);
  return String(left).localeCompare(String(right), undefined, {
    numeric: true,
    sensitivity: 'base',
  });
}

function formatCellValue(value: DataTableCellValue): string {
  if (value instanceof Date) return value.toLocaleDateString();
  if (value === null || value === undefined) return '—';
  return String(value);
}

function getAlignStyle(align: DataTableColumn<unknown>['align']): ViewStyle {
  if (align === 'center') return { alignItems: 'center' };
  if (align === 'right') return { alignItems: 'flex-end' };
  return { alignItems: 'flex-start' };
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  toolbar: {
    marginBottom: spacing.md,
  },
  filterBar: {
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerRow: {
    backgroundColor: 'rgba(127, 127, 127, 0.08)',
  },
  headerCell: {
    justifyContent: 'center',
  },
  cell: {
    justifyContent: 'center',
  },
  defaultCell: {
    width: 140,
  },
  actionsCell: {
    width: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectionControl: {
    width: 48,
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stateContainer: {
    minHeight: 120,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  footer: {
    marginTop: spacing.md,
  },
});
