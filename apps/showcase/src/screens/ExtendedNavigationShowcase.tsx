import { useState } from 'react';
import { ScrollView } from 'react-native';
import {
  Breadcrumbs,
  Stepper,
  BottomSheet,
  SideMenu,
  Tabs,
  X2Surface,
  X2Text,
  X2Stack,
  X2Icon,
  X2Pressable,
  useThemeColors,
} from 'react-x2-native';
import { spacing } from '@react-x2-native/tokens';

export function ExtendedNavigationShowcase() {
  const colors = useThemeColors();
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [snapSheetOpen, setSnapSheetOpen] = useState(false);
  const [snapIndex, setSnapIndex] = useState(0);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [activeTabVariant, setActiveTabVariant] = useState<
    'underline' | 'pill' | 'background' | 'icon-only' | 'archivero'
  >('underline');

  const breadcrumbItems = [
    { id: 'home', label: 'Home', onPress: () => console.log('Home') },
    { id: 'products', label: 'Products', onPress: () => console.log('Products') },
    { id: 'electronics', label: 'Electronics', onPress: () => console.log('Electronics') },
    { id: 'phones', label: 'Phones', onPress: () => console.log('Phones') },
  ];

  const steps = [
    { id: '1', label: 'Personal Info', description: 'Your details' },
    { id: '2', label: 'Address', description: 'Shipping address' },
    { id: '3', label: 'Payment', description: 'Payment method' },
    { id: '4', label: 'Review', description: 'Order review' },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <X2Icon name="📊" size={16} /> },
    { id: 'details', label: 'Details', icon: <X2Icon name="📋" size={16} /> },
    { id: 'reviews', label: 'Reviews', icon: <X2Icon name="⭐" size={16} /> },
  ];

  const menuItems = [
    {
      id: 'home',
      label: 'Home',
      icon: <X2Icon name="🏠" size={16} />,
      onPress: () => setSideMenuOpen(false),
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: <X2Icon name="👤" size={16} />,
      onPress: () => setSideMenuOpen(false),
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <X2Icon name="⚙️" size={16} />,
      onPress: () => setSideMenuOpen(false),
    },
    {
      id: 'logout',
      label: 'Logout',
      icon: <X2Icon name="🚪" size={16} />,
      onPress: () => setSideMenuOpen(false),
    },
  ];

  return (
    <>
      <ScrollView>
        <X2Surface style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.lg }}>
          <X2Text variant="headingL" style={{ marginBottom: spacing.lg }}>
            Extended Navigation
          </X2Text>

          <X2Stack gap="xl" align="stretch">
            {/* Breadcrumbs */}
            <X2Stack gap="md" align="stretch">
              <X2Text variant="labelM" color={colors.primary}>
                Breadcrumbs
              </X2Text>
              <Breadcrumbs
                testID="breadcrumbs-1"
                items={breadcrumbItems}
                separator="→"
                maxItems={5}
                onNavigate={(id: string) => console.log(`Navigated to ${id}`)}
              />
            </X2Stack>

            {/* Stepper */}
            <X2Stack gap="md" align="stretch">
              <X2Text variant="labelM" color={colors.primary}>
                Stepper (Horizontal)
              </X2Text>
              <Stepper
                testID="stepper-1"
                steps={steps}
                currentStep={currentStep}
                variant="horizontal"
                showLabels={true}
                onStepPress={(index: number) => setCurrentStep(index)}
              />
              <X2Stack direction="row" gap="md" style={{ marginTop: spacing.md }}>
                <X2Pressable
                  onPress={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  variant="outline"
                  style={{ flex: 1, paddingVertical: spacing.md }}
                  disabled={currentStep === 0}
                >
                  <X2Text color={colors.primary} style={{ textAlign: 'center' }}>
                    Previous
                  </X2Text>
                </X2Pressable>
                <X2Pressable
                  onPress={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                  variant="solid"
                  style={{ flex: 1, paddingVertical: spacing.md }}
                  disabled={currentStep === steps.length - 1}
                >
                  <X2Text color={colors.onPrimary} style={{ textAlign: 'center' }}>
                    Next
                  </X2Text>
                </X2Pressable>
              </X2Stack>
            </X2Stack>

            {/* Stepper Vertical */}
            <X2Stack gap="md" align="stretch">
              <X2Text variant="labelM" color={colors.primary}>
                Stepper (Vertical)
              </X2Text>
              <Stepper
                testID="stepper-2"
                steps={steps}
                currentStep={currentStep}
                variant="vertical"
                showLabels={true}
              />
            </X2Stack>

            {/* Bottom Sheet */}
            <X2Stack gap="md" align="stretch">
              <X2Text variant="labelM" color={colors.primary}>
                Bottom Sheet
              </X2Text>
              <X2Pressable
                onPress={() => setBottomSheetOpen(true)}
                style={{ paddingVertical: spacing.md }}
              >
                <X2Text color={colors.onPrimary} style={{ textAlign: 'center' }}>
                  Open Bottom Sheet
                </X2Text>
              </X2Pressable>
              <X2Pressable
                onPress={() => setSnapSheetOpen(true)}
                variant="outline"
                borderColor={colors.primary}
                style={{ paddingVertical: spacing.md }}
              >
                <X2Text color={colors.primary} style={{ textAlign: 'center' }}>
                  Open Snap Sheet (40% / 90%)
                </X2Text>
              </X2Pressable>
            </X2Stack>

            {/* Side Menu */}
            <X2Stack gap="md" align="stretch">
              <X2Text variant="labelM" color={colors.primary}>
                Side Menu
              </X2Text>
              <X2Pressable
                onPress={() => setSideMenuOpen(true)}
                style={{ paddingVertical: spacing.md }}
              >
                <X2Text color={colors.onPrimary} style={{ textAlign: 'center' }}>
                  Open Menu
                </X2Text>
              </X2Pressable>
            </X2Stack>

            {/* Tabs Variants */}
            <X2Stack gap="md" align="stretch">
              <X2Text variant="labelM" color={colors.primary}>
                Tabs Variants
              </X2Text>

              {/* Variant Selector */}
              <Tabs
                testID="tabs-variant-selector"
                tabs={[
                  { id: 'underline', label: 'Underline' },
                  { id: 'pill', label: 'Pill' },
                  { id: 'background', label: 'Background' },
                  { id: 'icon-only', label: 'Icons' },
                  { id: 'archivero', label: 'Archivero' },
                ]}
                activeTabId={activeTabVariant}
                onTabPress={(id: string) => setActiveTabVariant(id as typeof activeTabVariant)}
                variant="pill"
              />

              {/* Current Variant Demo */}
              <X2Surface
                backgroundColor={colors.surfaceVariant}
                style={{ paddingVertical: spacing.lg }}
              >
                <Tabs
                  testID={`tabs-${activeTabVariant}`}
                  tabs={tabs}
                  activeTabId="overview"
                  onTabPress={(id: string) => console.log(`Tab selected: ${id}`)}
                  variant={activeTabVariant}
                >
                  <X2Stack
                    gap="md"
                    style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.lg }}
                  >
                    <X2Text variant="bodyM">
                      {activeTabVariant === 'underline' && 'Underline indicator style'}
                      {activeTabVariant === 'pill' && 'Pill-shaped tab buttons'}
                      {activeTabVariant === 'background' && 'Background fill style'}
                      {activeTabVariant === 'icon-only' && 'Icon-only circular tabs'}
                      {activeTabVariant === 'archivero' &&
                        'File cabinet tabs with active folder treatment'}
                    </X2Text>
                  </X2Stack>
                </Tabs>
              </X2Surface>
            </X2Stack>

            {/* Features Info */}
            <X2Surface backgroundColor={colors.surfaceVariant} style={{ padding: spacing.lg }}>
              <X2Text variant="labelM" color={colors.primary} style={{ marginBottom: spacing.sm }}>
                Features
              </X2Text>
              <X2Stack gap="xs">
                <X2Text variant="bodyS">✓ Breadcrumbs with ellipsis support</X2Text>
                <X2Text variant="bodyS">✓ Stepper with horizontal/vertical layouts</X2Text>
                <X2Text variant="bodyS">✓ Bottom Sheet with snap points</X2Text>
                <X2Text variant="bodyS">✓ Slide-in Side Menu with safe areas</X2Text>
                <X2Text variant="bodyS">✓ Unified Tabs API with 5 different styles</X2Text>
                <X2Text variant="bodyS">✓ Smooth spring animations</X2Text>
              </X2Stack>
            </X2Surface>
          </X2Stack>
        </X2Surface>
      </ScrollView>

      {/* Bottom Sheet Modal */}
      <BottomSheet
        isOpen={bottomSheetOpen}
        onClose={() => setBottomSheetOpen(false)}
        header={
          <X2Text variant="headingM" color={colors.text}>
            Sheet Content
          </X2Text>
        }
      >
        <X2Stack gap="md" style={{ paddingVertical: spacing.lg }}>
          <X2Text variant="bodyM" color={colors.text}>
            This is the bottom sheet content. It can contain any UI elements.
          </X2Text>
          <X2Pressable
            onPress={() => setBottomSheetOpen(false)}
            style={{ paddingVertical: spacing.md }}
          >
            <X2Text color={colors.onPrimary} style={{ textAlign: 'center' }}>
              Close
            </X2Text>
          </X2Pressable>
        </X2Stack>
      </BottomSheet>

      {/* Bottom Sheet with snap points: drag the handle between 40% and 90%, or down to close */}
      <BottomSheet
        isOpen={snapSheetOpen}
        onClose={() => setSnapSheetOpen(false)}
        snapPoints={[0.4, 0.9]}
        onSnapChange={setSnapIndex}
        header={
          <X2Text variant="headingM" color={colors.text}>
            Snap points ({snapIndex === 0 ? '40%' : '90%'})
          </X2Text>
        }
      >
        <ScrollView>
          <X2Stack gap="sm" style={{ paddingVertical: spacing.md }}>
            {Array.from({ length: 20 }, (_, i) => (
              <X2Text key={i} variant="bodyM" color={colors.text}>
                Row {i + 1}
              </X2Text>
            ))}
          </X2Stack>
        </ScrollView>
      </BottomSheet>

      {/* Side Menu Modal */}
      <SideMenu
        isOpen={sideMenuOpen}
        onClose={() => setSideMenuOpen(false)}
        items={menuItems}
        header={
          <X2Stack gap="sm">
            <X2Icon name="👤" size={40} />
            <X2Text variant="headingS" color={colors.text}>
              John Developer
            </X2Text>
          </X2Stack>
        }
        footer={
          <X2Text variant="bodyS" color={colors.textSecondary}>
            v1.0.0
          </X2Text>
        }
      />
    </>
  );
}
