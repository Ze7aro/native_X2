import React, { useCallback, useState } from 'react';
import {
  Grid,
  ItemStack,
  Timeline,
  InfiniteList,
  X2Surface,
  X2Text,
  X2Stack,
  X2Icon,
  useThemeColors,
} from 'react-x2-native';
import { spacing } from '@react-x2-native/tokens';

type CollectionItem = {
  id: number;
  title: string;
};

export function ExtendedCollectionsShowcase() {
  const colors = useThemeColors();
  const [infiniteItems, setInfiniteItems] = useState<CollectionItem[]>(
    Array.from({ length: 10 }, (_, i) => ({ id: i, title: `Item ${i + 1}` }))
  );
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const gridItems = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    title: `Card ${i + 1}`,
  }));

  const stackItems = ['JavaScript', 'React Native', 'TypeScript', 'Reanimated'];

  const timelineItems = [
    {
      id: '1',
      title: 'Project Started',
      description: 'Initial setup and planning',
      timestamp: 'Jan 1, 2026',
      status: 'completed' as const,
      icon: <X2Icon name="🚀" size={20} />,
    },
    {
      id: '2',
      title: 'Phase 1 Complete',
      description: 'Base components built',
      timestamp: 'Jan 15, 2026',
      status: 'completed' as const,
      icon: <X2Icon name="✓" size={20} />,
    },
    {
      id: '3',
      title: 'Phase 2 Complete',
      description: '10 MVP components implemented',
      timestamp: 'Feb 1, 2026',
      status: 'completed' as const,
      icon: <X2Icon name="✓" size={20} />,
    },
    {
      id: '4',
      title: 'Phase 3 In Progress',
      description: 'Extended families being added',
      timestamp: 'Sep 29, 2026',
      status: 'current' as const,
      icon: <X2Icon name="⚡" size={20} />,
    },
    {
      id: '5',
      title: 'Phase 4 Planned',
      description: 'Advanced interactions',
      timestamp: 'Q4 2026',
      status: 'pending' as const,
    },
  ];

  const handleInfiniteLoad = useCallback(() => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setInfiniteItems((prev) => [
        ...prev,
        ...Array.from({ length: 5 }, (_, i) => ({
          id: prev.length + i,
          title: `Item ${prev.length + i + 1}`,
        })),
      ]);
      setIsLoadingMore(false);
    }, 1000);
  }, []);

  const listHeader = (
    <X2Surface style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.lg }}>
      <X2Text variant="headingL" style={{ marginBottom: spacing.lg }}>
        Extended Collections
      </X2Text>

      <X2Stack gap="xl" align="stretch">
        <X2Stack gap="md" align="stretch">
          <X2Text variant="labelM" color={colors.primary}>
            Grid (2 Columns)
          </X2Text>
          <Grid
            testID="grid-1"
            items={gridItems}
            numColumns={2}
            gap={spacing.md}
            renderItem={(item: CollectionItem) => (
              <X2Surface
                backgroundColor={colors.surfaceVariant}
                style={{
                  paddingHorizontal: spacing.md,
                  paddingVertical: spacing.lg,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X2Icon name="📦" size={48} />
                <X2Text
                  variant="labelM"
                  color={colors.text}
                  style={{ marginTop: spacing.sm, textAlign: 'center' }}
                >
                  {item.title}
                </X2Text>
              </X2Surface>
            )}
            scrollEnabled={false}
          />
        </X2Stack>

        <X2Stack gap="md" align="stretch">
          <X2Text variant="labelM" color={colors.primary}>
            ItemStack (Horizontal with Dividers)
          </X2Text>
          <ItemStack
            testID="stack-1"
            items={stackItems}
            direction="horizontal"
            spacing={spacing.md}
            dividers={false}
            renderItem={(item: string) => (
              <X2Surface
                backgroundColor={colors.primary}
                style={{
                  paddingHorizontal: spacing.lg,
                  paddingVertical: spacing.md,
                  borderRadius: 8,
                }}
              >
                <X2Text variant="labelM" color={colors.onPrimary}>
                  {item}
                </X2Text>
              </X2Surface>
            )}
            scrollEnabled
          />
        </X2Stack>

        <X2Stack gap="md" align="stretch">
          <X2Text variant="labelM" color={colors.primary}>
            ItemStack (Vertical with Dividers)
          </X2Text>
          <ItemStack
            testID="stack-2"
            items={['Item 1', 'Item 2', 'Item 3']}
            direction="vertical"
            spacing={spacing.sm}
            dividers
            renderItem={(item: string) => (
              <X2Text variant="bodyM" color={colors.text}>
                • {item}
              </X2Text>
            )}
            scrollEnabled={false}
          />
        </X2Stack>

        <X2Stack gap="md" align="stretch">
          <X2Text variant="labelM" color={colors.primary}>
            Timeline
          </X2Text>
          <Timeline
            testID="timeline-1"
            items={timelineItems}
            onItemPress={(item) => console.log(`Timeline item ${item.id} pressed`)}
          />
        </X2Stack>

        <X2Text variant="labelM" color={colors.primary}>
          Infinite List (Scrollable)
        </X2Text>
      </X2Stack>
    </X2Surface>
  );

  const listFooter = (
    <X2Surface
      backgroundColor={colors.surfaceVariant}
      style={{ padding: spacing.lg, marginTop: spacing.md, marginBottom: spacing.lg }}
    >
      <X2Text variant="labelM" color={colors.primary} style={{ marginBottom: spacing.sm }}>
        Features
      </X2Text>
      <X2Stack gap="xs">
        <X2Text variant="bodyS">✓ Grid with configurable columns</X2Text>
        <X2Text variant="bodyS">✓ ItemStack for vertical/horizontal layouts</X2Text>
        <X2Text variant="bodyS">✓ Timeline with status indicators</X2Text>
        <X2Text variant="bodyS">✓ InfiniteList with pagination</X2Text>
        <X2Text variant="bodyS">✓ Flexible rendering with custom items</X2Text>
        <X2Text variant="bodyS">✓ Divider and gap support</X2Text>
      </X2Stack>
    </X2Surface>
  );

  return (
    <InfiniteList
      testID="infinite-list-1"
      items={infiniteItems}
      gap={spacing.sm}
      isLoading={isLoadingMore}
      nestedScrollEnabled
      style={{ flex: 1 }}
      onEndReached={handleInfiniteLoad}
      loadMoreThreshold={0.7}
      ListHeaderComponent={listHeader}
      ListFooterComponent={listFooter}
      renderItem={(item: CollectionItem) => (
        <X2Surface
          backgroundColor={colors.surface}
          style={{ paddingHorizontal: spacing.md, paddingVertical: spacing.md, borderRadius: 6 }}
        >
          <X2Text variant="bodyM" color={colors.text}>
            {item.title}
          </X2Text>
        </X2Surface>
      )}
    />
  );
}
