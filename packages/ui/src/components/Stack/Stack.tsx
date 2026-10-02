import React, { useMemo } from 'react';
import {
  ScrollView,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { spacing as tokens } from '@react-x2-native/tokens';
import { X2Divider } from '../../primitives/X2Divider';
import type { StackProps } from './Stack.types';

export function Stack<T>({
  items,
  renderItem,
  direction = 'vertical',
  spacing = tokens.md,
  dividers = false,
  scrollEnabled = true,
  testID,
  style,
  ...props
}: StackProps<T>) {
  const { colors } = useTheme();

  const isHorizontal = direction === 'horizontal';

  const containerStyle: ViewStyle = useMemo(
    () => ({
      flexDirection: isHorizontal ? 'row' : 'column',
      gap: spacing,
    }),
    [isHorizontal, spacing],
  );

  const content = (
    <View style={[containerStyle, style]} testID={testID} {...props}>
      {items.map((item, index) => (
        <React.Fragment key={getItemKey(item, index)}>
          {renderItem(item, index)}
          {dividers && index < items.length - 1 && (
            <X2Divider color={colors.surfaceVariant} />
          )}
        </React.Fragment>
      ))}
    </View>
  );

  if (scrollEnabled) {
    return (
      <ScrollView
        horizontal={isHorizontal}
        scrollEnabled={scrollEnabled}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {content}
      </ScrollView>
    );
  }

  return content;
}

function getItemKey(item: unknown, index: number): string {
  if (item !== null && typeof item === 'object' && 'id' in item) {
    const id = (item as { id: unknown }).id;
    if (typeof id === 'string' || typeof id === 'number') return String(id);
  }
  return `stack-item-${index}`;
}
