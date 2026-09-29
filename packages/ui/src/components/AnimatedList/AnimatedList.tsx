import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import Animated, {
  FadeInUp,
  FadeOutDown,
  Layout,
} from 'react-native-reanimated';
import { spacing } from '@react-x2-native/tokens';
import type { AnimatedListProps } from './AnimatedList.types';

const AnimatedView = Animated.createAnimatedComponent(View);

export function AnimatedList({
  items,
  renderItem,
  gap = spacing.md,
  animationDuration = 300,
  onItemPress,
  testID,
  style,
  ...props
}: AnimatedListProps) {
  const containerStyle: ViewStyle = useMemo(
    () => ({
      gap,
    }),
    [gap],
  );

  return (
    <View
      style={[containerStyle, style]}
      testID={testID}
      {...props}
    >
      {items.map((item, index) => (
        <AnimatedView
          key={item.id}
          entering={FadeInUp.duration(animationDuration).delay(index * 50)}
          exiting={FadeOutDown.duration(animationDuration)}
          layout={Layout.springify()}
          testID={testID ? `${testID}-item-${index}` : undefined}
        >
          {renderItem ? renderItem(item, index) : item.content}
        </AnimatedView>
      ))}
    </View>
  );
}
