import { useCallback, useEffect, useRef, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export interface ItemLayout {
  x: number;
  width: number;
}

const SPRING_CONFIG = { damping: 15, mass: 1 };

// Re-positions on activeId changes too: onLayout alone doesn't fire when only the selection changes.
export function useSelectionIndicator(
  activeId: string | undefined,
  {
    reducedMotion = false,
    onMove,
  }: {
    reducedMotion?: boolean;
    onMove?: (layout: ItemLayout, animated: boolean) => void;
  } = {}
) {
  const layouts = useRef<Record<string, ItemLayout>>({});
  const hasPositioned = useRef(false);
  const onMoveRef = useRef(onMove);
  onMoveRef.current = onMove;
  const [layoutVersion, setLayoutVersion] = useState(0);

  const x = useSharedValue(0);
  const width = useSharedValue(0);

  const onItemLayout = useCallback((id: string, event: LayoutChangeEvent) => {
    const { x: itemX, width: itemWidth } = event.nativeEvent.layout;
    layouts.current[id] = { x: itemX, width: itemWidth };
    setLayoutVersion((v) => v + 1);
  }, []);

  useEffect(() => {
    const layout = activeId !== undefined ? layouts.current[activeId] : undefined;
    if (!layout) return;

    // First placement is instant so the indicator doesn't fly in from x = 0.
    const animated = !reducedMotion && hasPositioned.current;
    x.value = animated ? withSpring(layout.x, SPRING_CONFIG) : layout.x;
    width.value = animated ? withSpring(layout.width, SPRING_CONFIG) : layout.width;
    hasPositioned.current = true;
    onMoveRef.current?.(layout, animated);
  }, [activeId, layoutVersion, reducedMotion, x, width]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }],
    width: width.value,
  }));

  return { onItemLayout, indicatorStyle, x, width };
}
