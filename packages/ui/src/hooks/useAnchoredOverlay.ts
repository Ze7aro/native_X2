import { useCallback, useRef, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import type { LayoutChangeEvent, View, ViewStyle } from 'react-native';
import { computeOverlayPosition } from '../utils/overlayPosition';
import type { OverlayPlacement, Rect, Size } from '../utils/overlayPosition';

interface UseAnchoredOverlayOptions {
  placement: OverlayPlacement;
  offset: number;
}

/**
 * Shared plumbing for overlays that sit next to a trigger (Popover, Tooltip, ContextMenu):
 * measures the anchor, learns the overlay's own size from its layout, and computes where to put it.
 *
 * - Attach `anchorRef` to the trigger (with `collapsable={false}`) and call `measureAnchor` before showing.
 * - Spread `positionStyle` on the overlay and pass `onContentLayout` as its `onLayout`.
 *   The overlay stays invisible (opacity 0) until both measurements exist, so it never flashes at (0, 0).
 * - Call `resetSize` when the overlay closes if its content can change between openings.
 */
export function useAnchoredOverlay({ placement, offset }: UseAnchoredOverlayOptions) {
  const screen = useWindowDimensions();
  const anchorRef = useRef<View>(null);
  const [anchorRect, setAnchorRect] = useState<Rect | null>(null);
  const [contentSize, setContentSize] = useState<Size | null>(null);

  const measureAnchor = useCallback((onMeasured?: (rect: Rect) => void) => {
    anchorRef.current?.measureInWindow((x, y, width, height) => {
      const rect = { x, y, width, height };
      setAnchorRect(rect);
      onMeasured?.(rect);
    });
  }, []);

  const onContentLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setContentSize({ width, height });
  }, []);

  const resetSize = useCallback(() => setContentSize(null), []);

  const coords =
    anchorRect && contentSize
      ? computeOverlayPosition(anchorRect, contentSize, placement, offset, screen)
      : null;

  const positionStyle: ViewStyle = {
    position: 'absolute',
    left: coords?.left ?? 0,
    top: coords?.top ?? 0,
    opacity: coords ? 1 : 0,
  };

  return {
    screen,
    anchorRef,
    measureAnchor,
    onContentLayout,
    resetSize,
    /** Null until both the anchor and the overlay have been measured. */
    coords,
    positionStyle,
  };
}
