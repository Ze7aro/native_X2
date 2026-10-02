import { useState } from 'react';
import { SegmentedControl, X2Surface, X2Text, X2Stack, useThemeColors } from 'react-x2-native';
import { spacing } from '@react-x2-native/tokens';

export function SegmentedControlShowcase() {
  const colors = useThemeColors();
  const [selectedSize, setSelectedSize] = useState('medium');
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [selectedStatus, setSelectedStatus] = useState('active');

  const sizeOptions = [
    { id: 'small', label: 'Small' },
    { id: 'medium', label: 'Medium' },
    { id: 'large', label: 'Large' },
  ];

  const themeOptions = [
    { id: 'light', label: 'Light' },
    { id: 'dark', label: 'Dark' },
    { id: 'auto', label: 'Auto' },
  ];

  const statusOptions = [
    { id: 'active', label: 'Active' },
    { id: 'inactive', label: 'Inactive' },
  ];

  return (
    <X2Surface style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.lg }}>
      <X2Text variant="headingL" style={{ marginBottom: spacing.md }}>
        SegmentedControl
      </X2Text>

      <X2Stack gap="lg">
        {/* Basic Example */}
        <X2Stack gap="md">
          <X2Text variant="labelM" color={colors.primary}>
            Basic Segmented Control
          </X2Text>
          <SegmentedControl
            testID="segmented-basic"
            options={sizeOptions}
            selectedId={selectedSize}
            onSelect={setSelectedSize}
          />
          <X2Text variant="bodyS" color={colors.textSecondary}>
            Selected: {sizeOptions.find((opt) => opt.id === selectedSize)?.label}
          </X2Text>
        </X2Stack>

        {/* Theme Segmented Control */}
        <X2Stack gap="md">
          <X2Text variant="labelM" color={colors.primary}>
            Theme Selection
          </X2Text>
          <SegmentedControl
            testID="segmented-theme"
            options={themeOptions}
            selectedId={selectedTheme}
            onSelect={setSelectedTheme}
            selectedBackgroundColor={colors.success}
            backgroundColor={colors.surfaceVariant}
          />
          <X2Text variant="bodyS" color={colors.textSecondary}>
            Theme: {themeOptions.find((opt) => opt.id === selectedTheme)?.label}
          </X2Text>
        </X2Stack>

        {/* Status Selection */}
        <X2Stack gap="md">
          <X2Text variant="labelM" color={colors.primary}>
            Status Toggle
          </X2Text>
          <SegmentedControl
            testID="segmented-status"
            options={statusOptions}
            selectedId={selectedStatus}
            onSelect={setSelectedStatus}
            selectedBackgroundColor={colors.warning}
          />
          <X2Text variant="bodyS" color={colors.textSecondary}>
            Status: {statusOptions.find((opt) => opt.id === selectedStatus)?.label}
          </X2Text>
        </X2Stack>

        {/* Disabled State */}
        <X2Stack gap="md">
          <X2Text variant="labelM" color={colors.primary}>
            Disabled State
          </X2Text>
          <SegmentedControl
            disabled
            options={[
              { id: 'option1', label: 'Option 1' },
              { id: 'option2', label: 'Option 2' },
            ]}
            selectedId="option1"
            onSelect={() => {}}
          />
        </X2Stack>

        {/* Current Selections */}
        <X2Surface backgroundColor={colors.surfaceVariant} style={{ padding: spacing.lg }}>
          <X2Text variant="labelM" color={colors.primary} style={{ marginBottom: spacing.sm }}>
            Current Selections
          </X2Text>
          <X2Stack gap="xs">
            <X2Text variant="bodyS">
              Size: {sizeOptions.find((opt) => opt.id === selectedSize)?.label}
            </X2Text>
            <X2Text variant="bodyS">
              Theme: {themeOptions.find((opt) => opt.id === selectedTheme)?.label}
            </X2Text>
            <X2Text variant="bodyS">
              Status: {statusOptions.find((opt) => opt.id === selectedStatus)?.label}
            </X2Text>
          </X2Stack>
        </X2Surface>

        {/* Features */}
        <X2Surface backgroundColor={colors.surfaceVariant} style={{ padding: spacing.lg }}>
          <X2Text variant="labelM" color={colors.primary} style={{ marginBottom: spacing.sm }}>
            Features
          </X2Text>
          <X2Stack gap="xs">
            <X2Text variant="bodyS">✓ Compact multi-option selector</X2Text>
            <X2Text variant="bodyS">✓ Animated background indicator</X2Text>
            <X2Text variant="bodyS">✓ Spring animations (damping: 15)</X2Text>
            <X2Text variant="bodyS">✓ Respects reduce motion preferences</X2Text>
            <X2Text variant="bodyS">✓ Customizable colors (background, selected)</X2Text>
            <X2Text variant="bodyS">✓ Full accessibility (radio roles)</X2Text>
            <X2Text variant="bodyS">✓ Disabled state support</X2Text>
            <X2Text variant="bodyS">✓ Equal-width segments</X2Text>
            <X2Text variant="bodyS">✓ Touch feedback (opacity)</X2Text>
          </X2Stack>
        </X2Surface>

        {/* Usage Example */}
        <X2Surface backgroundColor={colors.surfaceVariant} style={{ padding: spacing.lg }}>
          <X2Text variant="labelM" color={colors.primary} style={{ marginBottom: spacing.sm }}>
            Usage Tips
          </X2Text>
          <X2Stack gap="sm">
            <X2Text variant="bodyS" color={colors.textSecondary}>
              Pass array of options with id and label.
            </X2Text>
            <X2Text variant="bodyS" color={colors.textSecondary}>
              Use selectedId prop to control selection.
            </X2Text>
            <X2Text variant="bodyS" color={colors.textSecondary}>
              Customize background and selected colors.
            </X2Text>
            <X2Text variant="bodyS" color={colors.textSecondary}>
              Best for 2-4 options (more than 4, use Tabs).
            </X2Text>
          </X2Stack>
        </X2Surface>
      </X2Stack>
    </X2Surface>
  );
}
