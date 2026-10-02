import { useState } from 'react';
import {
  DashboardCard,
  type DashboardCardStatus,
  X2Pressable,
  X2Stack,
  X2Text,
  useThemeColors,
} from 'react-x2-native';
import { spacing } from '@react-x2-native/tokens';

export function DashboardCardShowcase() {
  const colors = useThemeColors();
  const [status, setStatus] = useState<DashboardCardStatus>('ready');
  const [retryCount, setRetryCount] = useState(0);

  return (
    <X2Stack gap="lg" style={{ padding: spacing.lg }}>
      <X2Text variant="headingL">Dashboard Card</X2Text>
      <X2Text variant="bodyM" color={colors.textSecondary}>
        Composición para métricas y contenido de aplicación con estados completos.
      </X2Text>

      <X2Stack direction="row" gap="sm" style={{ flexWrap: 'wrap' }}>
        {(['ready', 'loading', 'empty', 'error'] as DashboardCardStatus[]).map((nextStatus) => (
          <X2Pressable
            key={nextStatus}
            variant={status === nextStatus ? 'solid' : 'outline'}
            backgroundColor={status === nextStatus ? colors.primary : undefined}
            borderColor={colors.primary}
            onPress={() => setStatus(nextStatus)}
            style={{ paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: 8 }}
          >
            <X2Text
              variant="labelM"
              color={status === nextStatus ? colors.onPrimary : colors.primary}
            >
              {nextStatus}
            </X2Text>
          </X2Pressable>
        ))}
      </X2Stack>

      <DashboardCard
        testID="dashboard-revenue"
        title="Monthly revenue"
        subtitle="Compared with the previous month"
        icon={<X2Text color={colors.primary}>$</X2Text>}
        metric="$48,240"
        metricLabel="Total revenue"
        trend={{ direction: 'up', value: '+12.4%', label: 'this month' }}
        status={status}
        errorMessage={`Unable to load revenue data (retry ${retryCount})`}
        onRetry={() => setRetryCount((count) => count + 1)}
        headerAction={
          <X2Text variant="labelM" color={colors.primary}>
            View all
          </X2Text>
        }
        footer={
          <X2Text variant="bodyS" color={colors.textSecondary}>
            Updated a few seconds ago
          </X2Text>
        }
        variant="glass"
      >
        <X2Text variant="bodyS" color={colors.textSecondary}>
          Your revenue is trending above the forecast for this period.
        </X2Text>
      </DashboardCard>
    </X2Stack>
  );
}
