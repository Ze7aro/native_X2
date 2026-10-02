import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { CommandMenu } from 'react-x2-native';
import { renderWithTheme } from './testUtils';

describe('CommandMenu', () => {
  it('filters commands and selects an action', () => {
    const onClose = jest.fn();
    const onSettings = jest.fn();
    const { getByTestId, queryByTestId } = renderWithTheme(
      <CommandMenu
        isOpen
        onClose={onClose}
        testID="commands"
        items={[
          {
            id: 'settings',
            label: 'Open settings',
            keywords: ['preferences'],
            onPress: onSettings,
          },
          { id: 'help', label: 'Open help', onPress: jest.fn() },
        ]}
      />
    );

    fireEvent.changeText(getByTestId('commands-search-input'), 'preferences');

    expect(getByTestId('commands-item-settings')).toBeTruthy();
    expect(queryByTestId('commands-item-help')).toBeNull();

    fireEvent.press(getByTestId('commands-item-settings'));
    expect(onSettings).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
