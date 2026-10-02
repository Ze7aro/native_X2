import React from 'react';
import { act, fireEvent } from '@testing-library/react-native';
import { Pressable } from 'react-native';
import { Toast, ToastProvider, useToast } from 'react-x2-native';
import { renderWithTheme } from './testUtils';

describe('Toast', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('dismisses itself after the configured duration', () => {
    const onDismiss = jest.fn();
    renderWithTheme(
      <Toast message="Saved" duration={1000} onDismiss={onDismiss} />,
    );

    act(() => jest.advanceTimersByTime(1000));

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('runs an action and dismisses when pressed', () => {
    const onAction = jest.fn();
    const onDismiss = jest.fn();
    const { getByTestId } = renderWithTheme(
      <Toast
        testID="toast"
        message="Saved"
        action={{ label: 'Undo', onPress: onAction }}
        onDismiss={onDismiss}
      />,
    );

    fireEvent.press(getByTestId('toast-action'));

    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});

describe('ToastProvider', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  function Trigger() {
    const { error, success, toast } = useToast();
    return (
      <>
        <Pressable testID="ok" onPress={() => success('Saved')} />
        <Pressable testID="fail" onPress={() => error('Failed')} />
        <Pressable testID="many" onPress={() => ['a', 'b', 'c', 'd'].forEach((m) => toast(m))} />
      </>
    );
  }

  it('shows toasts from anywhere and auto-dismisses success after 4s', () => {
    const { getByTestId, queryByText } = renderWithTheme(
      <ToastProvider><Trigger /></ToastProvider>,
    );
    fireEvent.press(getByTestId('ok'));
    expect(queryByText('Saved')).toBeTruthy();
    act(() => jest.advanceTimersByTime(4000));
    expect(queryByText('Saved')).toBeNull();
  });

  it('keeps error toasts for 7s', () => {
    const { getByTestId, queryByText } = renderWithTheme(
      <ToastProvider><Trigger /></ToastProvider>,
    );
    fireEvent.press(getByTestId('fail'));
    act(() => jest.advanceTimersByTime(6999));
    expect(queryByText('Failed')).toBeTruthy();
    act(() => jest.advanceTimersByTime(1));
    expect(queryByText('Failed')).toBeNull();
  });

  it('stacks at most maxVisible toasts', () => {
    const { getByTestId, queryByText } = renderWithTheme(
      <ToastProvider maxVisible={3}><Trigger /></ToastProvider>,
    );
    fireEvent.press(getByTestId('many'));
    expect(queryByText('a')).toBeNull();
    expect(queryByText('b')).toBeTruthy();
    expect(queryByText('d')).toBeTruthy();
  });

  it('throws a clear error outside the provider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    expect(() => renderWithTheme(<Trigger />)).toThrow('useToast must be used inside <ToastProvider>');
    spy.mockRestore();
  });
});
