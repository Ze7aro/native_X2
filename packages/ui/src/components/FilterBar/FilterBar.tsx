import { StyleSheet, View } from 'react-native';
import { spacing } from '@react-x2-native/tokens';
import { SearchField } from '../SearchField';
import type { FilterBarProps } from './FilterBar.types';
import { useX2Strings } from '../../i18n/X2StringsProvider';

export function FilterBar({
  searchValue,
  defaultSearchValue,
  onSearchChange,
  onClear,
  searchPlaceholder: searchPlaceholderProp,
  children,
  actions,
  searchStyle,
  testID,
  style,
  ...props
}: FilterBarProps) {
  const strings = useX2Strings();
  const searchPlaceholder = searchPlaceholderProp ?? strings.searchAndFilter;
  return (
    <View {...props} style={[styles.container, style]} testID={testID}>
      <SearchField
        value={searchValue}
        defaultValue={defaultSearchValue}
        onChangeText={onSearchChange}
        onClear={onClear}
        placeholder={searchPlaceholder}
        containerStyle={[styles.search, searchStyle]}
        testID={testID ? `${testID}-search` : undefined}
      />
      {children && <View style={styles.filters}>{children}</View>}
      {actions && <View style={styles.actions}>{actions}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  search: {
    flexGrow: 1,
    flexBasis: 220,
  },
  filters: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginLeft: 'auto',
  },
});
