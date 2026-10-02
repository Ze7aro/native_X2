import React from 'react';
import { act, fireEvent, render } from '@testing-library/react-native';
import { ConfirmDialog, OverlayProvider, StepDialog, ThemeProvider } from 'react-x2-native';

function renderPortaled(ui: React.ReactElement) {
  return render(
    <ThemeProvider theme="light">
      <OverlayProvider>{ui}</OverlayProvider>
    </ThemeProvider>,
  );
}

const isDisabled = (node: { props: { accessibilityState?: { disabled?: boolean } } }) =>
  !!node.props.accessibilityState?.disabled;

describe('ConfirmDialog', () => {
  it('shows description and consequences', () => {
    const { getByText } = renderPortaled(
      <ConfirmDialog
        isOpen
        onClose={jest.fn()}
        onConfirm={jest.fn()}
        title="Delete project"
        description="This cannot be undone."
        consequences={['All files are removed', 'Members lose access']}
      />,
    );
    expect(getByText('This cannot be undone.')).toBeTruthy();
    expect(getByText('•  All files are removed')).toBeTruthy();
    expect(getByText('•  Members lose access')).toBeTruthy();
  });

  it('confirms and closes when there is no text requirement', () => {
    const onConfirm = jest.fn();
    const onClose = jest.fn();
    const { getByLabelText } = renderPortaled(
      <ConfirmDialog isOpen onClose={onClose} onConfirm={onConfirm} title="Archive" />,
    );
    fireEvent.press(getByLabelText('Confirm'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('keeps confirm disabled until the required text is typed', async () => {
    const onConfirm = jest.fn();
    const onClose = jest.fn();
    const { getByLabelText, getByTestId } = renderPortaled(
      <ConfirmDialog
        isOpen
        testID="cd"
        onClose={onClose}
        onConfirm={onConfirm}
        title="Delete"
        requireText="DELETE"
      />,
    );
    expect(isDisabled(getByLabelText('Confirm'))).toBe(true);

    fireEvent.changeText(getByTestId('cd-input-input'), 'delete');
    expect(isDisabled(getByLabelText('Confirm'))).toBe(true);

    fireEvent.changeText(getByTestId('cd-input-input'), 'DELETE');
    expect(isDisabled(getByLabelText('Confirm'))).toBe(false);

    await act(async () => { fireEvent.press(getByLabelText('Confirm')); });
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('stays open and shows the error when confirming fails', async () => {
    const onClose = jest.fn();
    const onError = jest.fn();
    const error = new Error('Server unavailable');
    const { getByLabelText, getByText } = renderPortaled(
      <ConfirmDialog
        isOpen
        onClose={onClose}
        onError={onError}
        onConfirm={() => Promise.reject(error)}
        title="Delete"
      />,
    );
    await act(async () => { fireEvent.press(getByLabelText('Confirm')); });
    expect(onClose).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalledWith(error);
    expect(getByText('Server unavailable')).toBeTruthy();
  });

  it('cancels without confirming', () => {
    const onConfirm = jest.fn();
    const onClose = jest.fn();
    const { getByLabelText } = renderPortaled(
      <ConfirmDialog isOpen onClose={onClose} onConfirm={onConfirm} title="Delete" cancelLabel="Keep it" />,
    );
    fireEvent.press(getByLabelText('Keep it'));
    expect(onConfirm).not.toHaveBeenCalled();
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe('StepDialog', () => {
  const makeSteps = (overrides: Partial<Parameters<typeof StepDialog>[0]['steps'][number]>[] = []) =>
    ['One', 'Two', 'Three'].map((name, i) => ({
      id: name,
      title: `Step ${name}`,
      content: <React.Fragment />,
      ...overrides[i],
    }));

  it('moves forward and back through the steps', async () => {
    const { getByLabelText, getByText, queryByLabelText } = renderPortaled(
      <StepDialog isOpen onClose={jest.fn()} onFinish={jest.fn()} title="Setup" steps={makeSteps()} />,
    );
    expect(getByText('Step 1 of 3')).toBeTruthy();
    expect(queryByLabelText('Back')).toBeNull();

    await act(async () => { fireEvent.press(getByLabelText('Next')); });
    expect(getByText('Step 2 of 3')).toBeTruthy();
    expect(getByText('Step Two')).toBeTruthy();

    fireEvent.press(getByLabelText('Back'));
    expect(getByText('Step 1 of 3')).toBeTruthy();
  });

  it('disables next until the step can continue', () => {
    const { getByLabelText } = renderPortaled(
      <StepDialog
        isOpen
        onClose={jest.fn()}
        onFinish={jest.fn()}
        title="Setup"
        steps={makeSteps([{ canContinue: false }])}
      />,
    );
    expect(isDisabled(getByLabelText('Next'))).toBe(true);
  });

  it('finishes on the last step and closes', async () => {
    const onFinish = jest.fn();
    const onClose = jest.fn();
    const { getByLabelText } = renderPortaled(
      <StepDialog isOpen onClose={onClose} onFinish={onFinish} title="Setup" steps={makeSteps()} />,
    );
    await act(async () => { fireEvent.press(getByLabelText('Next')); });
    await act(async () => { fireEvent.press(getByLabelText('Next')); });
    expect(onFinish).not.toHaveBeenCalled();

    await act(async () => { fireEvent.press(getByLabelText('Finish')); });
    expect(onFinish).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('stays on the step and shows the error when onNext fails', async () => {
    const onError = jest.fn();
    const { getByLabelText, getByText } = renderPortaled(
      <StepDialog
        isOpen
        onClose={jest.fn()}
        onFinish={jest.fn()}
        onError={onError}
        title="Setup"
        steps={makeSteps([{ onNext: () => Promise.reject(new Error('Invalid email')) }])}
      />,
    );
    await act(async () => { fireEvent.press(getByLabelText('Next')); });
    expect(getByText('Step 1 of 3')).toBeTruthy();
    expect(getByText('Invalid email')).toBeTruthy();
    expect(onError).toHaveBeenCalledTimes(1);
  });

  it('supports a controlled step', () => {
    const onStepChange = jest.fn();
    const { getByLabelText, getByText } = renderPortaled(
      <StepDialog
        isOpen
        step={1}
        onStepChange={onStepChange}
        onClose={jest.fn()}
        onFinish={jest.fn()}
        title="Setup"
        steps={makeSteps()}
      />,
    );
    expect(getByText('Step 2 of 3')).toBeTruthy();
    fireEvent.press(getByLabelText('Back'));
    expect(onStepChange).toHaveBeenCalledWith(0);
  });
});
