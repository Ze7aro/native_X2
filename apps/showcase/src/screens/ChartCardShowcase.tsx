import React, { useState } from 'react';
import {
  ChartCard,
  type ChartCardType,
  X2Pressable,
  X2Stack,
  X2Text,
  useThemeColors,
} from 'react-x2-native';
import { spacing } from '@react-x2-native/tokens';

const data = [
  { id: 'jan', label: 'Jan', value: 24 },
  { id: 'feb', label: 'Feb', value: 38 },
  { id: 'mar', label: 'Mar', value: 32 },
  { id: 'apr', label: 'Apr', value: 56 },
  { id: 'may', label: 'May', value: 48 },
  { id: 'jun', label: 'Jun', value: 72 },
];

export function ChartCardShowcase() {
  const colors = useThemeColors();
  const [chartType, setChartType] = useState<ChartCardType>('bar');
  const [selectedPoint, setSelectedPoint] = useState('Tap a data point to inspect it');

  return (
    <X2Stack gap="lg" style={{ padding: spacing.lg }}>
      <X2Text variant="headingL">Chart Card</X2Text>
      <X2Text variant="bodyM" color={colors.textSecondary}>
        Gráficos ligeros sin dependencia externa, con barras, líneas, labels y selección.
      </X2Text>

      <X2Stack direction="row" gap="sm">
        {(['bar', 'line'] as ChartCardType[]).map((nextType) => (
          <X2Pressable
            key={nextType}
            variant={chartType === nextType ? 'solid' : 'outline'}
            backgroundColor={chartType === nextType ? colors.primary : undefined}
            borderColor={colors.primary}
            onPress={() => setChartType(nextType)}
            style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: 8 }}
          >
            <X2Text color={chartType === nextType ? colors.onPrimary : colors.primary}>
              {nextType}
            </X2Text>
          </X2Pressable>
        ))}
      </X2Stack>

      <ChartCard
        testID="chart-revenue"
        title="Monthly revenue"
        subtitle="Last six months"
        metric="$72k"
        metricLabel="Best month"
        trend={{ direction: 'up', value: '+18%', label: 'vs previous period' }}
        data={data}
        chartType={chartType}
        valueFormatter={(value) => `$${value}k`}
        onPointPress={(point) => setSelectedPoint(`${point.label}: $${point.value}k`)}
        footer={
          <X2Text variant="bodyS" color={colors.textSecondary}>
            {selectedPoint}
          </X2Text>
        }
        variant="glass"
      />
    </X2Stack>
  );
}
