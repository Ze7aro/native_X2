import { useState } from 'react';
import {
  AnimatedList,
  X2Surface,
  X2Text,
  X2Stack,
  X2Pressable,
  useThemeColors,
} from 'react-x2-native';
import { spacing } from '@react-x2-native/tokens';

export function AnimatedListShowcase() {
  const colors = useThemeColors();
  const [items, setItems] = useState([
    { id: '1', content: 'First item' },
    { id: '2', content: 'Second item' },
    { id: '3', content: 'Third item' },
    { id: '4', content: 'Fourth item' },
    { id: '5', content: 'Fifth item' },
  ]);

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddItem = () => {
    const newId = Math.random().toString();
    setItems((prev) => [...prev, { id: newId, content: `New item ${prev.length + 1}` }]);
  };

  return (
    <X2Surface style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.lg }}>
      <X2Text variant="headingL" style={{ marginBottom: spacing.md }}>
        AnimatedList
      </X2Text>

      <X2Stack gap="lg">
        {/* Basic Animated List */}
        <X2Stack gap="md">
          <X2Text variant="labelM" color={colors.primary}>
            Animated List Items
          </X2Text>
          <AnimatedList
            testID="animated-list"
            items={items}
            gap={spacing.sm}
            animationDuration={300}
            renderItem={(item) => (
              <X2Surface
                backgroundColor={colors.surfaceVariant}
                style={{
                  padding: spacing.md,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <X2Text variant="bodyM">{item.content}</X2Text>
                <X2Pressable
                  backgroundColor={colors.error}
                  onPress={() => handleRemoveItem(item.id)}
                  style={{
                    paddingVertical: spacing.sm,
                    paddingHorizontal: spacing.md,
                    borderRadius: 6,
                  }}
                >
                  <X2Text color={colors.onPrimary} variant="labelM">
                    Remove
                  </X2Text>
                </X2Pressable>
              </X2Surface>
            )}
          />
        </X2Stack>

        {/* Add Button */}
        <X2Pressable
          backgroundColor={colors.success}
          onPress={handleAddItem}
          style={{
            paddingVertical: spacing.md,
            paddingHorizontal: spacing.lg,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <X2Text color={colors.onPrimary} variant="labelL">
            Add Item
          </X2Text>
        </X2Pressable>

        {/* Info */}
        <X2Surface backgroundColor={colors.surfaceVariant} style={{ padding: spacing.lg }}>
          <X2Text variant="labelM" color={colors.primary} style={{ marginBottom: spacing.sm }}>
            Item Count
          </X2Text>
          <X2Text variant="bodyM">{items.length} items in list</X2Text>
        </X2Surface>

        {/* Features */}
        <X2Surface backgroundColor={colors.surfaceVariant} style={{ padding: spacing.lg }}>
          <X2Text variant="labelM" color={colors.primary} style={{ marginBottom: spacing.sm }}>
            Features
          </X2Text>
          <X2Stack gap="xs">
            <X2Text variant="bodyS">✓ Fade in/up on entry</X2Text>
            <X2Text variant="bodyS">✓ Fade out/down on exit</X2Text>
            <X2Text variant="bodyS">✓ Staggered animations (50ms delay)</X2Text>
            <X2Text variant="bodyS">✓ Spring layout transitions</X2Text>
            <X2Text variant="bodyS">✓ Custom render function support</X2Text>
            <X2Text variant="bodyS">✓ Configurable gap and duration</X2Text>
            <X2Text variant="bodyS">✓ Efficient list rendering</X2Text>
          </X2Stack>
        </X2Surface>
      </X2Stack>
    </X2Surface>
  );
}
