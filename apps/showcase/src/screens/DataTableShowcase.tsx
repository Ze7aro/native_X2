import React, { useMemo, useState } from 'react';
import { ScrollView } from 'react-native';
import {
  DataTable,
  type DataTableColumn,
  type DataTableSort,
  X2Pressable,
  X2Stack,
  X2Surface,
  X2Text,
  useThemeColors,
} from 'react-x2-native';
import { spacing } from '@react-x2-native/tokens';

interface UserRow {
  id: string;
  name: string;
  role: string;
  status: 'Active' | 'Pending' | 'Paused';
  usage: number;
}

const rows: UserRow[] = [
  { id: 'usr-1', name: 'Ana García', role: 'Designer', status: 'Active', usage: 82 },
  { id: 'usr-2', name: 'Bruno Silva', role: 'Engineer', status: 'Active', usage: 64 },
  { id: 'usr-3', name: 'Carla Méndez', role: 'Product', status: 'Pending', usage: 41 },
  { id: 'usr-4', name: 'Diego Torres', role: 'Support', status: 'Paused', usage: 18 },
  { id: 'usr-5', name: 'Elena Rossi', role: 'Engineer', status: 'Active', usage: 93 },
  { id: 'usr-6', name: 'Felipe Costa', role: 'Marketing', status: 'Pending', usage: 36 },
  { id: 'usr-7', name: 'Gabriela Ruiz', role: 'Designer', status: 'Active', usage: 74 },
  { id: 'usr-8', name: 'Hugo Kim', role: 'Engineer', status: 'Active', usage: 57 },
  { id: 'usr-9', name: 'Irene López', role: 'Product', status: 'Paused', usage: 22 },
  { id: 'usr-10', name: 'Julián Pérez', role: 'Support', status: 'Active', usage: 68 },
  { id: 'usr-11', name: 'Karen Soto', role: 'Marketing', status: 'Pending', usage: 47 },
  { id: 'usr-12', name: 'Luis Fernández', role: 'Engineer', status: 'Active', usage: 88 },
];

export function DataTableShowcase() {
  const colors = useThemeColors();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [sort, setSort] = useState<DataTableSort | null>({
    columnId: 'usage',
    direction: 'desc',
  });

  const columns = useMemo<DataTableColumn<UserRow>[]>(
    () => [
      {
        id: 'name',
        header: 'Name',
        accessor: (user) => user.name,
        sortable: true,
        width: 180,
      },
      {
        id: 'role',
        header: 'Role',
        accessor: (user) => user.role,
        sortable: true,
        width: 140,
      },
      {
        id: 'status',
        header: 'Status',
        accessor: (user) => user.status,
        sortable: true,
        width: 130,
        renderCell: (user) => (
          <X2Text
            variant="labelM"
            color={user.status === 'Active' ? colors.success : colors.textSecondary}
          >
            {user.status}
          </X2Text>
        ),
      },
      {
        id: 'usage',
        header: 'Usage',
        accessor: (user) => user.usage,
        sortable: true,
        align: 'right',
        width: 110,
        renderCell: (user) => <X2Text>{user.usage}%</X2Text>,
      },
    ],
    [colors.success, colors.textSecondary],
  );

  return (
    <ScrollView>
      <X2Surface style={{ padding: spacing.lg }}>
        <X2Text variant="headingL" style={{ marginBottom: spacing.sm }}>
          Data Table
        </X2Text>
        <X2Text variant="bodyM" color={colors.textSecondary} style={{ marginBottom: spacing.lg }}>
          Una tabla funcional con ordenamiento, selección, paginación, estados y variantes visuales.
        </X2Text>

        <DataTable
          testID="data-table-users"
          data={rows}
          columns={columns}
          filterable
          filterPlaceholder="Search users by name, role or status"
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          sort={sort}
          onSortChange={setSort}
          pageSize={5}
          variant="glass"
          header={
            <X2Stack direction="row" justify="space-between" align="center">
              <X2Text variant="labelM" color={colors.primary}>
                {selectedKeys.length} selected
              </X2Text>
              <X2Pressable
                variant="outline"
                borderColor={colors.primary}
                onPress={() => setSelectedKeys([])}
                style={{ paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: 8 }}
              >
                <X2Text variant="labelM" color={colors.primary}>Clear</X2Text>
              </X2Pressable>
            </X2Stack>
          }
          renderRowActions={() => (
            <X2Text variant="labelM" color={colors.primary}>•••</X2Text>
          )}
        />

        <X2Surface backgroundColor={colors.surfaceVariant} style={{ marginTop: spacing.xl, padding: spacing.lg }}>
          <X2Text variant="labelM" color={colors.primary} style={{ marginBottom: spacing.sm }}>
            Implemented capabilities
          </X2Text>
          <X2Stack gap="xs" align="stretch">
            <X2Text variant="bodyS">✓ Generic columns with custom cell renderers</X2Text>
            <X2Text variant="bodyS">✓ Ascending, descending and reset sorting</X2Text>
            <X2Text variant="bodyS">✓ Single or multiple row selection</X2Text>
            <X2Text variant="bodyS">✓ Client-side pagination</X2Text>
            <X2Text variant="bodyS">✓ Loading and empty states</X2Text>
            <X2Text variant="bodyS">✓ Plain, outlined and glass variants</X2Text>
          </X2Stack>
        </X2Surface>
      </X2Surface>
    </ScrollView>
  );
}
