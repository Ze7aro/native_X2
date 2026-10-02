import React from 'react';
import { act, fireEvent, render } from '@testing-library/react-native';
import { BackHandler, View } from 'react-native';
import { BottomSheet, Modal, OverlayProvider, ThemeProvider } from 'react-x2-native';

const pressBack = () => (BackHandler as unknown as { __press: () => boolean }).__press();

function renderPortaled(ui: React.ReactElement) {
  return render(
    <ThemeProvider theme="light">
      <OverlayProvider>{ui}</OverlayProvider>
    </ThemeProvider>,
  );
}

describe('Modal actions', () => {
  it('closes after a sync action', () => {
    const onClose = jest.fn();
    const onPress = jest.fn();
    const { getByLabelText } = renderPortaled(
      <Modal isOpen onClose={onClose} actions={[{ label: 'Save', onPress }]}>
        <React.Fragment />
      </Modal>,
    );
    fireEvent.press(getByLabelText('Save'));
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('stays open and busy while an async action runs, then closes', async () => {
    const onClose = jest.fn();
    let resolve!: () => void;
    const onPress = jest.fn(() => new Promise<void>((r) => { resolve = r; }));
    const { getByLabelText } = renderPortaled(
      <Modal isOpen onClose={onClose} closeLabel="Close dialog" actions={[{ label: 'Save', onPress }]}>
        <React.Fragment />
      </Modal>,
    );
    fireEvent.press(getByLabelText('Save'));
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.press(getByLabelText('Save'));
    expect(onPress).toHaveBeenCalledTimes(1);

    act(() => { pressBack(); });
    expect(onClose).not.toHaveBeenCalled();

    await act(async () => { resolve(); });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('stays open and reports the error when an async action rejects', async () => {
    const onClose = jest.fn();
    const onActionError = jest.fn();
    const error = new Error('boom');
    const { getByLabelText } = renderPortaled(
      <Modal
        isOpen
        onClose={onClose}
        onActionError={onActionError}
        actions={[{ label: 'Save', onPress: () => Promise.reject(error) }]}
      >
        <React.Fragment />
      </Modal>,
    );
    await act(async () => { fireEvent.press(getByLabelText('Save')); });
    expect(onClose).not.toHaveBeenCalled();
    expect(onActionError).toHaveBeenCalledWith(error, expect.objectContaining({ label: 'Save' }));
  });

  it('honours autoClose={false}', () => {
    const onClose = jest.fn();
    const { getByLabelText } = renderPortaled(
      <Modal isOpen onClose={onClose} actions={[{ label: 'Next', onPress: jest.fn(), autoClose: false }]}>
        <React.Fragment />
      </Modal>,
    );
    fireEvent.press(getByLabelText('Next'));
    expect(onClose).not.toHaveBeenCalled();
  });
});

describe('dismissible', () => {
  it('blocks backdrop, close button and back button on Modal', () => {
    const onClose = jest.fn();
    const { getAllByLabelText } = renderPortaled(
      <Modal isOpen dismissible={false} onClose={onClose} closeLabel="Close dialog">
        <React.Fragment />
      </Modal>,
    );
    getAllByLabelText('Close dialog').forEach((node) => fireEvent.press(node));
    act(() => { expect(pressBack()).toBe(true); });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('blocks backdrop and back button on BottomSheet', () => {
    const onClose = jest.fn();
    const { getByLabelText } = renderPortaled(
      <BottomSheet isOpen dismissible={false} onClose={onClose} closeLabel="Close sheet">
        <React.Fragment />
      </BottomSheet>,
    );
    fireEvent.press(getByLabelText('Close sheet', { hidden: true }));
    act(() => { pressBack(); });
    expect(onClose).not.toHaveBeenCalled();
  });
});

describe('OverlayProvider', () => {
  it('routes the back button to the topmost overlay only', () => {
    const closeModal = jest.fn();
    const closeSheet = jest.fn();
    renderPortaled(
      <>
        <Modal isOpen onClose={closeModal}><React.Fragment /></Modal>
        <BottomSheet isOpen onClose={closeSheet}><React.Fragment /></BottomSheet>
      </>,
    );
    act(() => { pressBack(); });
    expect(closeSheet).toHaveBeenCalledTimes(1);
    expect(closeModal).not.toHaveBeenCalled();
  });

  it('does not intercept back when no overlay is open', () => {
    renderPortaled(<Modal isOpen={false} onClose={jest.fn()}><React.Fragment /></Modal>);
    expect(pressBack()).toBe(false);
  });
});

// The sheet wraps children in a View whose paddingBottom reserves the off-screen part of the sheet.
function wrapperPadding(node: { parent: unknown }): number | undefined {
  let current = node.parent as { props?: { style?: { paddingBottom?: number } }; parent: unknown } | null;
  while (current) {
    const padding = current.props?.style?.paddingBottom;
    if (padding !== undefined) return padding;
    current = current.parent as typeof current;
  }
  return undefined;
}

describe('BottomSheet snapPoints', () => {
  it('gives the sheet the largest height and keeps content above the current snap point', () => {
    const { getByTestId } = renderPortaled(
      <BottomSheet isOpen onClose={jest.fn()} snapPoints={[0.9, 0.4]} initialSnapIndex={0}>
        <View testID="content" />
      </BottomSheet>,
    );
    const paddingBottom = wrapperPadding(getByTestId('content'));
    // Window is 844 high: the 0.4 point is 0.5 * 844 = 422 below the fully open position.
    expect(paddingBottom).toBe(422);
  });

  it('opens at initialSnapIndex', () => {
    const { getByTestId } = renderPortaled(
      <BottomSheet isOpen onClose={jest.fn()} snapPoints={[0.4, 0.9]} initialSnapIndex={1}>
        <View testID="content" />
      </BottomSheet>,
    );
    const paddingBottom = wrapperPadding(getByTestId('content'));
    expect(paddingBottom).toBe(0);
  });
});
