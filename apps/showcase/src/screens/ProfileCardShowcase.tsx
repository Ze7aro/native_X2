import React, { useState } from 'react';
import { ProfileCard, X2Surface, X2Text, X2Stack, X2Icon, useThemeColors } from 'react-x2-native';
import { spacing } from '@react-x2-native/tokens';

export function ProfileCardShowcase() {
  const colors = useThemeColors();
  const [actionLog, setActionLog] = useState('');

  const handleAction = (action: string) => {
    setActionLog(`${action} pressed`);
  };

  return (
    <X2Surface style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.lg }}>
      <X2Text variant="headingL" style={{ marginBottom: spacing.md }}>
        ProfileCard
      </X2Text>

      <X2Stack gap="lg">
        {/* Basic Profile Card */}
        <X2Stack gap="md">
          <X2Text variant="labelM" color={colors.primary}>
            Basic Profile
          </X2Text>
          <ProfileCard
            testID="profile-basic"
            avatar={
              <X2Surface
                backgroundColor={colors.primary}
                style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <X2Icon name="👤" size={40} color={colors.onPrimary} />
              </X2Surface>
            }
            title="John Developer"
            subtitle="Software Engineer"
            description="Passionate about React Native and open source"
            actions={[
              {
                label: 'Follow',
                onPress: () => handleAction('Follow'),
              },
              {
                label: 'Message',
                onPress: () => handleAction('Message'),
                variant: 'secondary',
              },
            ]}
          />
        </X2Stack>

        {/* Action Log */}
        {actionLog && (
          <X2Surface
            backgroundColor={colors.surfaceVariant}
            style={{ padding: spacing.md }}
          >
            <X2Text variant="labelM" color={colors.primary}>
              Last Action
            </X2Text>
            <X2Text variant="bodyS">{actionLog}</X2Text>
          </X2Surface>
        )}

        {/* Profile with Custom Content */}
        <X2Stack gap="md">
          <X2Text variant="labelM" color={colors.primary}>
            Profile with Stats
          </X2Text>
          <ProfileCard
            avatar={
              <X2Surface
                backgroundColor={colors.success}
                style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <X2Icon name="⭐" size={40} />
              </X2Surface>
            }
            title="Jane Designer"
            subtitle="Product Designer"
            description="Creating beautiful experiences"
          >
            <X2Stack direction="row" justify="space-around" align="center">
              <X2Stack align="center" gap="xs">
                <X2Text variant="headingS" color={colors.primary}>
                  42
                </X2Text>
                <X2Text variant="bodyS" color={colors.textSecondary}>
                  Projects
                </X2Text>
              </X2Stack>
              <X2Stack align="center" gap="xs">
                <X2Text variant="headingS" color={colors.primary}>
                  1.2K
                </X2Text>
                <X2Text variant="bodyS" color={colors.textSecondary}>
                  Followers
                </X2Text>
              </X2Stack>
              <X2Stack align="center" gap="xs">
                <X2Text variant="headingS" color={colors.primary}>
                  98
                </X2Text>
                <X2Text variant="bodyS" color={colors.textSecondary}>
                  Rating
                </X2Text>
              </X2Stack>
            </X2Stack>
          </ProfileCard>
        </X2Stack>

        {/* Multiple Actions Profile */}
        <X2Stack gap="md">
          <X2Text variant="labelM" color={colors.primary}>
            Multiple Actions
          </X2Text>
          <ProfileCard
            avatar={
              <X2Surface
                backgroundColor={colors.info}
                style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <X2Icon name="💻" size={40} />
              </X2Surface>
            }
            title="Alex Developer"
            subtitle="Full Stack Dev"
            description="Building amazing apps"
            actions={[
              {
                label: 'Visit',
                onPress: () => handleAction('Visit'),
              },
              {
                label: 'Contact',
                onPress: () => handleAction('Contact'),
                variant: 'secondary',
              },
            ]}
          />
        </X2Stack>

        {/* Minimal Profile */}
        <X2Stack gap="md">
          <X2Text variant="labelM" color={colors.primary}>
            Minimal Profile
          </X2Text>
          <ProfileCard
            avatar={
              <X2Surface
                backgroundColor={colors.warning}
                style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <X2Icon name="✨" size={40} />
              </X2Surface>
            }
            title="Simple Profile"
          />
        </X2Stack>

        {/* Documentation */}
        <X2Surface backgroundColor={colors.surfaceVariant} style={{ padding: spacing.lg }}>
          <X2Text variant="labelM" color={colors.primary} style={{ marginBottom: spacing.sm }}>
            Features
          </X2Text>
          <X2Stack gap="xs">
            <X2Text variant="bodyS">✓ Flexible avatar support</X2Text>
            <X2Text variant="bodyS">✓ Title, subtitle, description</X2Text>
            <X2Text variant="bodyS">✓ Custom content area</X2Text>
            <X2Text variant="bodyS">✓ Primary/secondary actions</X2Text>
            <X2Text variant="bodyS">✓ Automatic layout composition</X2Text>
            <X2Text variant="bodyS">✓ Full theme support</X2Text>
          </X2Stack>
        </X2Surface>
      </X2Stack>
    </X2Surface>
  );
}
