import React from 'react';
import { Text } from 'react-native';
import { act, fireEvent, render } from '@testing-library/react-native';
import { ContextMenu, OverlayProvider, Popover, ThemeProvider, Tooltip } from 'react-x2-native';

function renderPortaled(ui: React.ReactElement) {
  return render(
    <ThemeProvider theme="light">
      <OverlayProvider>{ui}</OverlayProvider>
    </ThemeProvider>
  );
}

// Popover and Tooltip fade in through an animated style that the Reanimated mock never advances,
// so for them only the computed position is asserted.
type TestNode = {
  props: { onLayout?: (event: unknown) => void; style?: unknown };
  parent: TestNode | null;
};

// The tests' anchor is measured at (24, 24, 120, 40) and the window is 390 x 844 (see reactNativeMock).
const ANCHOR = { x: 24, y: 24, width: 120, height: 40 };

function flatten(style: unknown): Record<string, number | string | undefined> {
  if (Array.isArray(style)) return style.reduce((acc, item) => ({ ...acc, ...flatten(item) }), {});
  return (style ?? {}) as Record<string, number | string | undefined>;
}

// Finds the positioned overlay container above `node` (the one that reports its size via onLayout).
function overlayContainer(node: TestNode): TestNode {
  let current: TestNode | null = node;
  while (current) {
    if (current.props.onLayout) return current;
    current = current.parent;
  }
  throw new Error('No container with onLayout above the node');
}

const layOut = (container: TestNode, width: number, height: number) =>
  act(() => {
    container.props.onLayout?.({ nativeEvent: { layout: { width, height } } });
  });

describe('Popover', () => {
  it('stays hidden until measured, then sits below the anchor, centered', () => {
    const onClose = jest.fn();
    const { getByText } = renderPortaled(
      <Popover isOpen onClose={onClose} anchor={<Text>Anchor</Text>} offset={8}>
        <Text>Popover body</Text>
      </Popover>
    );
    const container = overlayContainer(getByText('Popover body') as unknown as TestNode);
    expect(flatten(container.props.style).opacity).toBe(0);

    layOut(container, 100, 50);
    const style = flatten(
      overlayContainer(getByText('Popover body') as unknown as TestNode).props.style
    );
    expect(style.left).toBe(ANCHOR.x + ANCHOR.width / 2 - 100 / 2);
    expect(style.top).toBe(ANCHOR.y + ANCHOR.height + 8);
  });

  it('closes from the backdrop and renders nothing when closed', () => {
    const onClose = jest.fn();
    const { getByLabelText, queryByText, rerender } = renderPortaled(
      <Popover isOpen onClose={onClose} anchor={<Text>Anchor</Text>} closeLabel="Close it">
        <Text>Popover body</Text>
      </Popover>
    );
    fireEvent.press(getByLabelText('Close it', { hidden: true }));
    expect(onClose).toHaveBeenCalledTimes(1);

    rerender(
      <ThemeProvider theme="light">
        <OverlayProvider>
          <Popover isOpen={false} onClose={onClose} anchor={<Text>Anchor</Text>}>
            <Text>Popover body</Text>
          </Popover>
        </OverlayProvider>
      </ThemeProvider>
    );
    expect(queryByText('Popover body')).toBeNull();
  });
});

describe('ContextMenu', () => {
  const actions = (onCopy: () => void) => [
    { id: 'copy', label: 'Copy', onPress: onCopy },
    { id: 'delete', label: 'Delete', onPress: jest.fn(), destructive: true },
  ];

  it('opens on long press, runs an action and closes', () => {
    const onCopy = jest.fn();
    const onOpen = jest.fn();
    const onClose = jest.fn();
    const { getByTestId, getByText, queryByText } = renderPortaled(
      <ContextMenu testID="menu" actions={actions(onCopy)} onOpen={onOpen} onClose={onClose}>
        <Text>Hold me</Text>
      </ContextMenu>
    );
    expect(queryByText('Copy')).toBeNull();

    fireEvent(getByTestId('menu'), 'longPress');
    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(getByText('Copy')).toBeTruthy();

    fireEvent.press(getByText('Copy'));
    expect(onCopy).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(queryByText('Copy')).toBeNull();
  });

  it('positions the menu below the anchor once measured', () => {
    const { getByTestId, getByText } = renderPortaled(
      <ContextMenu testID="menu" actions={actions(jest.fn())}>
        <Text>Hold me</Text>
      </ContextMenu>
    );
    fireEvent(getByTestId('menu'), 'longPress');
    const container = overlayContainer(getByText('Copy') as unknown as TestNode);
    expect(flatten(container.props.style).opacity).toBe(0);

    layOut(container, 100, 50);
    const style = flatten(overlayContainer(getByText('Copy') as unknown as TestNode).props.style);
    expect(style.opacity).toBe(1);
    expect(style.left).toBe(ANCHOR.x + ANCHOR.width / 2 - 100 / 2);
    expect(style.top).toBeGreaterThan(ANCHOR.y + ANCHOR.height);
  });

  it('forgets the previous size so a reopened menu is not placed with stale measurements', () => {
    const { getByTestId, getByText, queryByText } = renderPortaled(
      <ContextMenu testID="menu" actions={actions(jest.fn())}>
        <Text>Hold me</Text>
      </ContextMenu>
    );
    fireEvent(getByTestId('menu'), 'longPress');
    layOut(overlayContainer(getByText('Copy') as unknown as TestNode), 200, 100);
    fireEvent.press(getByText('Copy'));
    expect(queryByText('Copy')).toBeNull();

    fireEvent(getByTestId('menu'), 'longPress');
    const style = flatten(overlayContainer(getByText('Copy') as unknown as TestNode).props.style);
    expect(style.opacity).toBe(0);
  });
});

describe('Tooltip', () => {
  it('places the tooltip next to the anchor once measured', () => {
    const { getByTestId, getByText } = renderPortaled(
      <Tooltip text="Helpful" testID="trigger" position="bottom">
        <Text>Trigger</Text>
      </Tooltip>
    );
    fireEvent.press(getByTestId('trigger'));
    const container = overlayContainer(getByText('Helpful') as unknown as TestNode);
    expect(flatten(container.props.style).opacity).toBe(0);

    layOut(container, 80, 30);
    const style = flatten(
      overlayContainer(getByText('Helpful') as unknown as TestNode).props.style
    );
    expect(style.left).toBe(ANCHOR.x + ANCHOR.width / 2 - 80 / 2);
    expect(style.top as number).toBeGreaterThan(ANCHOR.y + ANCHOR.height);
  });
});
