import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { Modal, Tabs } from 'react-x2-native';
import { renderWithTheme } from './testUtils';

describe('Tabs and overlays', () => {
  it('supports the archivero tabs variant', () => {
    const onTabPress = jest.fn();
    const { getByTestId } = renderWithTheme(
      <Tabs
        testID="tabs"
        variant="archivero"
        tabs={[
          { id: 'files', label: 'Files' },
          { id: 'archive', label: 'Archive' },
        ]}
        activeTabId="files"
        onTabPress={onTabPress}
      />
    );

    fireEvent.press(getByTestId('tabs-tab-1'));
    expect(onTabPress).toHaveBeenCalledWith('archive');
  });

  it('closes a modal through the shared backdrop label', () => {
    const onClose = jest.fn();
    const { getAllByLabelText } = renderWithTheme(
      <Modal isOpen onClose={onClose} closeLabel="Close dialog">
        <React.Fragment />
      </Modal>
    );

    fireEvent.press(getAllByLabelText('Close dialog')[0]);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
