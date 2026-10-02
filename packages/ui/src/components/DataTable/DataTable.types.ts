import type { ReactNode } from 'react';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';

export type DataTableCellValue = string | number | boolean | Date | null | undefined;

export interface DataTableColumn<T> {
  id: string;
  header: ReactNode;
  accessor?: (item: T) => DataTableCellValue;
  renderCell?: (item: T, index: number) => ReactNode;
  sortable?: boolean;
  compare?: (a: T, b: T) => number;
  width?: number;
  align?: 'left' | 'center' | 'right';
}

export interface DataTableSort {
  columnId: string;
  direction: 'asc' | 'desc';
}

export type DataTableSelectionMode = 'none' | 'single' | 'multiple';
export type DataTableVariant = 'plain' | 'outlined' | 'glass';
export type DataTableDensity = 'compact' | 'comfortable';

export interface DataTableProps<T> extends ViewProps {
  data: T[];
  columns: DataTableColumn<T>[];
  keyExtractor?: (item: T, index: number) => string;
  variant?: DataTableVariant;
  density?: DataTableDensity;
  header?: ReactNode;
  footer?: ReactNode;
  filterable?: boolean;
  filterText?: string;
  defaultFilterText?: string;
  onFilterChange?: (value: string) => void;
  filterPlaceholder?: string;
  filterItem?: (item: T, query: string) => boolean;
  loading?: boolean;
  loadingContent?: ReactNode;
  emptyContent?: ReactNode;
  emptyMessage?: string;
  showHeader?: boolean;
  selectionMode?: DataTableSelectionMode;
  selectedKeys?: string[];
  defaultSelectedKeys?: string[];
  onSelectionChange?: (keys: string[]) => void;
  sort?: DataTableSort | null;
  defaultSort?: DataTableSort;
  onSortChange?: (sort: DataTableSort | null) => void;
  pageSize?: number;
  page?: number;
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  onRowPress?: (item: T, index: number) => void;
  renderRowActions?: (item: T, index: number) => ReactNode;
  rowStyle?: (item: T, index: number, selected: boolean) => StyleProp<ViewStyle>;
  minWidth?: number;
  testID?: string;
}
