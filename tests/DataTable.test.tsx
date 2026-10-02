import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { DataTable, type DataTableColumn } from 'react-x2-native';
import { renderWithTheme } from './testUtils';

interface Row {
  id: string;
  name: string;
  role: string;
}

const columns: DataTableColumn<Row>[] = [
  { id: 'name', header: 'Name', accessor: (row) => row.name, sortable: true },
  { id: 'role', header: 'Role', accessor: (row) => row.role },
];

describe('DataTable', () => {
  it('filters rows through its built-in search field', () => {
    const { getByTestId, getByText, queryByText } = renderWithTheme(
      <DataTable
        testID="users"
        data={[
          { id: '1', name: 'Alice', role: 'Designer' },
          { id: '2', name: 'Bruno', role: 'Engineer' },
        ]}
        columns={columns}
        filterable
      />,
    );

    expect(getByText('Alice')).toBeTruthy();
    expect(getByText('Bruno')).toBeTruthy();

    fireEvent.changeText(getByTestId('users-filters-search-input'), 'alice');

    expect(getByText('Alice')).toBeTruthy();
    expect(queryByText('Bruno')).toBeNull();
  });

  it('renders the empty state when no rows are available', () => {
    const { getByText } = renderWithTheme(
      <DataTable data={[]} columns={columns} emptyMessage="No users" />,
    );

    expect(getByText('No users')).toBeTruthy();
  });
});
