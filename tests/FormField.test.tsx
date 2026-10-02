import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { FormField } from 'react-x2-native';
import { renderWithTheme } from './testUtils';

describe('FormField', () => {
  it('validates required values on blur and exposes the error', () => {
    const { getByTestId, queryByTestId } = renderWithTheme(
      <FormField testID="email" label="Email" required />,
    );
    const input = getByTestId('email-input');

    fireEvent(input, 'blur');

    expect(getByTestId('email-error')).toBeTruthy();
    expect(queryByTestId('email-error')?.props.children).toBe('This field is required');
  });

  it('supports custom validation on change', () => {
    const { getByTestId, queryByTestId } = renderWithTheme(
      <FormField
        testID="username"
        label="Username"
        validateOn="change"
        validate={(value) => value.length >= 3 ? undefined : 'Use at least 3 characters'}
      />,
    );
    const input = getByTestId('username-input');

    fireEvent.changeText(input, 'ab');
    expect(getByTestId('username-error')).toBeTruthy();

    fireEvent.changeText(input, 'alex');
    expect(queryByTestId('username-error')).toBeNull();
  });
});
