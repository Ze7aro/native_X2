import { useState } from 'react';
import { ScrollView } from 'react-native';
import {
  Modal,
  ConfirmDialog,
  StepDialog,
  FormField,
  ContextMenu,
  Tooltip,
  Popover,
  X2Surface,
  X2Text,
  X2Stack,
  X2Icon,
  X2Pressable,
  useToast,
  useThemeColors,
} from 'react-x2-native';
import { spacing } from '@react-x2-native/tokens';

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export function OverlaysShowcase() {
  const colors = useThemeColors();
  const { success, error } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [stepsOpen, setStepsOpen] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <>
      <ScrollView>
        <X2Surface style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.lg }}>
          <X2Text variant="headingL" style={{ marginBottom: spacing.lg }}>
            Overlays
          </X2Text>

          <X2Stack gap="xl" align="stretch">
            {/* Modal */}
            <X2Stack gap="md" align="stretch">
              <X2Text variant="labelM" color={colors.primary}>
                Modal
              </X2Text>
              <X2Pressable
                onPress={() => setModalOpen(true)}
                style={{ paddingVertical: spacing.md }}
              >
                <X2Text color={colors.onPrimary} style={{ textAlign: 'center' }}>
                  Open Modal
                </X2Text>
              </X2Pressable>
            </X2Stack>

            {/* ConfirmDialog and StepDialog */}
            <X2Stack gap="md" align="stretch">
              <X2Text variant="labelM" color={colors.primary}>
                ConfirmDialog / StepDialog
              </X2Text>
              <X2Pressable
                onPress={() => setConfirmOpen(true)}
                backgroundColor={colors.error}
                style={{ paddingVertical: spacing.md }}
              >
                <X2Text color={colors.onError} style={{ textAlign: 'center' }}>
                  Delete project (type to confirm)
                </X2Text>
              </X2Pressable>
              <X2Pressable
                onPress={() => setStepsOpen(true)}
                style={{ paddingVertical: spacing.md }}
              >
                <X2Text color={colors.onPrimary} style={{ textAlign: 'center' }}>
                  Open Step Dialog
                </X2Text>
              </X2Pressable>
            </X2Stack>

            {/* Context Menu */}
            <X2Stack gap="md" align="stretch">
              <X2Text variant="labelM" color={colors.primary}>
                Context Menu (Long Press)
              </X2Text>
              <ContextMenu
                testID="context-menu-1"
                actions={[
                  {
                    id: 'copy',
                    label: 'Copy',
                    icon: <X2Icon name="📋" size={16} />,
                    onPress: () => console.log('Copy'),
                  },
                  {
                    id: 'edit',
                    label: 'Edit',
                    icon: <X2Icon name="✏️" size={16} />,
                    onPress: () => console.log('Edit'),
                  },
                  {
                    id: 'share',
                    label: 'Share',
                    icon: <X2Icon name="📤" size={16} />,
                    onPress: () => console.log('Share'),
                  },
                  {
                    id: 'delete',
                    label: 'Delete',
                    icon: <X2Icon name="🗑️" size={16} />,
                    destructive: true,
                    onPress: () => console.log('Delete'),
                  },
                ]}
              >
                <X2Surface
                  backgroundColor={colors.primary}
                  style={{
                    paddingHorizontal: spacing.lg,
                    paddingVertical: spacing.lg,
                    borderRadius: 8,
                    alignItems: 'center',
                  }}
                >
                  <X2Text color={colors.onPrimary} variant="labelM">
                    Long Press Me
                  </X2Text>
                </X2Surface>
              </ContextMenu>
            </X2Stack>

            {/* Tooltip */}
            <X2Stack gap="md" align="stretch">
              <X2Text variant="labelM" color={colors.primary}>
                Tooltip (Press & Hold)
              </X2Text>
              <X2Stack
                direction="row"
                gap="md"
                style={{ justifyContent: 'space-around', flexWrap: 'wrap' }}
              >
                <Tooltip testID="tooltip-1" text="Top tooltip" position="top">
                  <X2Surface
                    style={{
                      paddingHorizontal: spacing.lg,
                      paddingVertical: spacing.md,
                      backgroundColor: colors.primary,
                      borderRadius: 6,
                    }}
                  >
                    <X2Text color={colors.onPrimary}>Top</X2Text>
                  </X2Surface>
                </Tooltip>

                <Tooltip testID="tooltip-2" text="Bottom tooltip" position="bottom">
                  <X2Surface
                    style={{
                      paddingHorizontal: spacing.lg,
                      paddingVertical: spacing.md,
                      backgroundColor: colors.primary,
                      borderRadius: 6,
                    }}
                  >
                    <X2Text color={colors.onPrimary}>Bottom</X2Text>
                  </X2Surface>
                </Tooltip>

                <Tooltip testID="tooltip-3" text="Right tooltip" position="right">
                  <X2Surface
                    style={{
                      paddingHorizontal: spacing.lg,
                      paddingVertical: spacing.md,
                      backgroundColor: colors.primary,
                      borderRadius: 6,
                    }}
                  >
                    <X2Text color={colors.onPrimary}>Right</X2Text>
                  </X2Surface>
                </Tooltip>
              </X2Stack>
            </X2Stack>

            <ConfirmDialog
              isOpen={confirmOpen}
              onClose={() => setConfirmOpen(false)}
              title="Delete project"
              description="You are about to delete Apollo."
              consequences={[
                'All files are removed',
                'Members lose access',
                'This cannot be undone',
              ]}
              requireText="Apollo"
              destructive
              confirmLabel="Delete"
              onConfirm={async () => {
                await wait(1200);
                success('Project deleted');
              }}
              onError={(err) => error(err instanceof Error ? err.message : 'Error')}
            />

            <StepDialog
              isOpen={stepsOpen}
              onClose={() => setStepsOpen(false)}
              title="New workspace"
              onFinish={async () => {
                await wait(1000);
                success('Workspace created');
              }}
              onError={(err) => error(err instanceof Error ? err.message : 'Error')}
              steps={[
                {
                  id: 'welcome',
                  title: 'Welcome',
                  description: 'A quick three-step setup.',
                  content: (
                    <X2Text variant="bodyM" color={colors.text}>
                      Create a workspace for your team.
                    </X2Text>
                  ),
                },
                {
                  id: 'email',
                  title: 'Owner email',
                  description: 'Needed to continue.',
                  canContinue: email.includes('@'),
                  content: (
                    <FormField
                      label="Email"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  ),
                },
                {
                  id: 'review',
                  title: 'Review',
                  content: (
                    <X2Text variant="bodyM" color={colors.text}>
                      Owner: {email}
                    </X2Text>
                  ),
                },
              ]}
            />

            {/* Popover */}
            <X2Stack gap="md" align="stretch">
              <X2Text variant="labelM" color={colors.primary}>
                Popover
              </X2Text>
              <X2Pressable
                onPress={() => setPopoverOpen(true)}
                style={{
                  paddingHorizontal: spacing.lg,
                  paddingVertical: spacing.md,
                  backgroundColor: colors.primary,
                  borderRadius: 6,
                  alignItems: 'center',
                }}
              >
                <X2Text color={colors.onPrimary}>Open Popover</X2Text>
              </X2Pressable>
            </X2Stack>

            {/* Features Info */}
            <X2Surface backgroundColor={colors.surfaceVariant} style={{ padding: spacing.lg }}>
              <X2Text variant="labelM" color={colors.primary} style={{ marginBottom: spacing.sm }}>
                Features
              </X2Text>
              <X2Stack gap="xs">
                <X2Text variant="bodyS">✓ Modal with customizable sizes</X2Text>
                <X2Text variant="bodyS">✓ ContextMenu with long-press detection</X2Text>
                <X2Text variant="bodyS">✓ Tooltip with delayed display</X2Text>
                <X2Text variant="bodyS">✓ Popover with positioning</X2Text>
                <X2Text variant="bodyS">✓ Smooth animations on all overlays</X2Text>
                <X2Text variant="bodyS">✓ Proper z-indexing and backdrop</X2Text>
              </X2Stack>
            </X2Surface>
          </X2Stack>
        </X2Surface>
      </ScrollView>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm Action"
        size="medium"
        actions={[
          { label: 'Cancel', onPress: () => setModalOpen(false), variant: 'outline' },
          // Async: the modal stays busy and locked until it resolves, then closes.
          {
            label: 'Save',
            variant: 'solid',
            onPress: async () => {
              await wait(1200);
              success('Saved');
            },
          },
          // Rejects: the modal stays open and reports the error.
          {
            label: 'Fail',
            variant: 'destructive',
            onPress: async () => {
              await wait(800);
              throw new Error('Server unavailable');
            },
          },
        ]}
        onActionError={(err) => error(err instanceof Error ? err.message : 'Error')}
      >
        <X2Text variant="bodyM" color={colors.text}>
          Are you sure you want to proceed with this action?
        </X2Text>
      </Modal>

      {/* Popover */}
      <Popover
        isOpen={popoverOpen}
        onClose={() => setPopoverOpen(false)}
        position="bottom"
        anchor={<X2Text>Trigger</X2Text>}
      >
        <X2Stack gap="md" align="stretch">
          <X2Text variant="labelM" color={colors.text}>
            Popover Content
          </X2Text>
          <X2Text variant="bodyS" color={colors.textSecondary}>
            This popover floats above the screen with customizable positioning.
          </X2Text>
          <X2Pressable
            onPress={() => setPopoverOpen(false)}
            variant="solid"
            style={{
              paddingVertical: spacing.md,
              marginTop: spacing.md,
            }}
          >
            <X2Text color={colors.onPrimary} style={{ textAlign: 'center' }}>
              Close
            </X2Text>
          </X2Pressable>
        </X2Stack>
      </Popover>
    </>
  );
}
