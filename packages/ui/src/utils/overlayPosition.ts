export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Size {
  width: number;
  height: number;
}

export type OverlayPlacement = 'top' | 'bottom' | 'left' | 'right';

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), Math.max(min, max));

// Places `content` next to `anchor`, flipping to the opposite side if it doesn't fit, then clamps to the screen.
export function computeOverlayPosition(
  anchor: Rect,
  content: Size,
  placement: OverlayPlacement,
  offset: number,
  screen: Size,
  margin = 8,
): { left: number; top: number } {
  const fits = {
    top: anchor.y - offset - content.height >= margin,
    bottom: anchor.y + anchor.height + offset + content.height <= screen.height - margin,
    left: anchor.x - offset - content.width >= margin,
    right: anchor.x + anchor.width + offset + content.width <= screen.width - margin,
  };
  const opposite: Record<OverlayPlacement, OverlayPlacement> = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left',
  };
  const side = !fits[placement] && fits[opposite[placement]] ? opposite[placement] : placement;

  let left: number;
  let top: number;
  switch (side) {
    case 'top':
      top = anchor.y - offset - content.height;
      left = anchor.x + anchor.width / 2 - content.width / 2;
      break;
    case 'bottom':
      top = anchor.y + anchor.height + offset;
      left = anchor.x + anchor.width / 2 - content.width / 2;
      break;
    case 'left':
      left = anchor.x - offset - content.width;
      top = anchor.y + anchor.height / 2 - content.height / 2;
      break;
    case 'right':
      left = anchor.x + anchor.width + offset;
      top = anchor.y + anchor.height / 2 - content.height / 2;
      break;
  }

  return {
    left: clamp(left, margin, screen.width - content.width - margin),
    top: clamp(top, margin, screen.height - content.height - margin),
  };
}
