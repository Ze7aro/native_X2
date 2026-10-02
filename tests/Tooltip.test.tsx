import React from 'react';
import { Text } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import { Tooltip } from 'react-x2-native';
import { renderWithTheme } from './testUtils';

describe('Tooltip', () => {
  it('shows its content when the trigger is pressed', () => {
    const { getByTestId, getByText } = renderWithTheme(
      <Tooltip text="Helpful information" testID="tooltip-trigger">
        <Text>Trigger</Text>
      </Tooltip>
    );

    fireEvent.press(getByTestId('tooltip-trigger'));

    expect(getByText('Helpful information')).toBeTruthy();
  });
});
