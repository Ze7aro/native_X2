import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, StyleSheet, View, type LayoutChangeEvent } from 'react-native';
import { radius, spacing } from '@react-x2-native/tokens';
import { useTheme } from '../../theme/ThemeContext';
import { X2Text } from '../../primitives/X2Text';
import { DashboardCard } from '../DashboardCard';
import type { ChartCardProps, ChartDataPoint } from './ChartCard.types';
import { useX2Strings } from '../../i18n/X2StringsProvider';

export function ChartCard({
  data,
  chartType = 'bar',
  status,
  emptyMessage: emptyMessageProp,
  customChart,
  chartHeight = 180,
  chartStyle,
  minValue,
  maxValue,
  showLabels = true,
  showGrid = true,
  valueFormatter = (value) => String(value),
  selectedIndex,
  defaultSelectedIndex,
  onPointPress,
  ...cardProps
}: ChartCardProps) {
  const strings = useX2Strings();
  const emptyMessage = emptyMessageProp ?? strings.chartEmpty;
  const derivedStatus = status ?? (data.length === 0 ? 'empty' : 'ready');

  return (
    <DashboardCard
      {...cardProps}
      status={derivedStatus}
      emptyMessage={emptyMessage}
      minHeight={cardProps.minHeight ?? chartHeight + 150}
    >
      {customChart ?? (
        <ChartPlot
          data={data}
          chartType={chartType}
          chartHeight={chartHeight}
          chartStyle={chartStyle}
          minValue={minValue}
          maxValue={maxValue}
          showLabels={showLabels}
          showGrid={showGrid}
          valueFormatter={valueFormatter}
          selectedIndex={selectedIndex}
          defaultSelectedIndex={defaultSelectedIndex}
          onPointPress={onPointPress}
        />
      )}
    </DashboardCard>
  );
}

interface ChartPlotProps {
  data: ChartCardProps['data'];
  chartType: NonNullable<ChartCardProps['chartType']>;
  chartHeight: number;
  chartStyle?: ChartCardProps['chartStyle'];
  minValue?: number;
  maxValue?: number;
  showLabels: boolean;
  showGrid: boolean;
  valueFormatter: NonNullable<ChartCardProps['valueFormatter']>;
  selectedIndex?: number;
  defaultSelectedIndex?: number;
  onPointPress?: ChartCardProps['onPointPress'];
}

function ChartPlot({
  data,
  chartType,
  chartHeight,
  chartStyle,
  minValue,
  maxValue,
  showLabels,
  showGrid,
  valueFormatter,
  selectedIndex,
  defaultSelectedIndex,
  onPointPress,
}: ChartPlotProps) {
  const strings = useX2Strings();
  const { colors } = useTheme();
  const [width, setWidth] = useState(0);
  const [internalSelectedIndex, setInternalSelectedIndex] = useState<number | undefined>(defaultSelectedIndex);
  const activeSelectedIndex = selectedIndex ?? internalSelectedIndex;
  const values = useMemo(() => data.map((point) => point.value), [data]);
  const resolvedMin = minValue ?? (chartType === 'bar' ? 0 : Math.min(...values));
  const resolvedMax = maxValue ?? Math.max(...values, resolvedMin + 1);
  const range = Math.max(resolvedMax - resolvedMin, 1);
  const plotHeight = Math.max(chartHeight - (showLabels ? 24 : 0), 1);
  const gridLines = showGrid ? [0, 0.25, 0.5, 0.75, 1] : [];

  const normalize = useCallback(
    (value: number) => Math.min(1, Math.max(0, (value - resolvedMin) / range)),
    [range, resolvedMin],
  );

  const selectPoint = useCallback(
    (point: ChartDataPoint, index: number) => {
      if (selectedIndex === undefined) setInternalSelectedIndex(index);
      onPointPress?.(point, index);
    },
    [onPointPress, selectedIndex],
  );

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  }, []);

  const selectedPoint = activeSelectedIndex === undefined ? undefined : data[activeSelectedIndex];

  return (
    <View>
      {selectedPoint && (
        <View style={styles.selectedValue}>
          <X2Text variant="labelM" color={colors.primary}>{selectedPoint.label}</X2Text>
          <X2Text variant="labelM">{valueFormatter(selectedPoint.value)}</X2Text>
        </View>
      )}
      <View
        style={[styles.chart, { height: chartHeight }, chartStyle]}
        onLayout={handleLayout}
        accessibilityRole="image"
        accessibilityLabel={strings.chart}
      >
        {gridLines.map((line) => (
          <View
            key={line}
            pointerEvents="none"
            style={[styles.gridLine, { top: line * plotHeight, backgroundColor: colors.divider }]}
          />
        ))}
        {chartType === 'bar' ? (
          <View style={styles.barPlot}>
            {data.map((point, index) => {
              const selected = activeSelectedIndex === index;
              const barHeight = Math.max(4, normalize(point.value) * plotHeight);
              return (
                <Pressable
                  key={point.id ?? `${point.label}-${index}`}
                  onPress={() => selectPoint(point, index)}
                  accessibilityRole="button"
                  accessibilityLabel={`${point.label}: ${valueFormatter(point.value)}`}
                  accessibilityState={{ selected }}
                  style={styles.barColumn}
                >
                  <View
                    style={[
                      styles.bar,
                      {
                        height: barHeight,
                        backgroundColor: point.color ?? colors.primary,
                        opacity: selected ? 1 : 0.75,
                        borderColor: selected ? colors.primaryVariant : 'transparent',
                      },
                    ]}
                  />
                  {showLabels && <X2Text variant="labelS" color={colors.textTertiary} numberOfLines={1}>{point.label}</X2Text>}
                </Pressable>
              );
            })}
          </View>
        ) : (
          <LinePlot
            data={data}
            width={width}
            height={plotHeight}
            normalize={normalize}
            showLabels={showLabels}
            colors={colors}
            selectedIndex={activeSelectedIndex}
            onPointPress={selectPoint}
            valueFormatter={valueFormatter}
          />
        )}
      </View>
    </View>
  );
}

function LinePlot({
  data,
  width,
  height,
  normalize,
  showLabels,
  colors,
  selectedIndex,
  onPointPress,
  valueFormatter,
}: {
  data: ChartDataPoint[];
  width: number;
  height: number;
  normalize: (value: number) => number;
  showLabels: boolean;
  colors: ReturnType<typeof useTheme>['colors'];
  selectedIndex?: number;
  onPointPress: (point: ChartDataPoint, index: number) => void;
  valueFormatter: (value: number) => string;
}) {
  const points = data.map((point, index) => ({
    x: data.length > 1 ? (index / (data.length - 1)) * width : width / 2,
    y: (1 - normalize(point.value)) * height,
  }));

  return (
    <View style={StyleSheet.absoluteFill}>
      {points.slice(0, -1).map((point, index) => {
        const nextPoint = points[index + 1];
        const dx = nextPoint.x - point.x;
        const dy = nextPoint.y - point.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        return (
          <View
            key={`${data[index].id ?? data[index].label}-line`}
            pointerEvents="none"
            style={[
              styles.segment,
              {
                left: (point.x + nextPoint.x) / 2 - length / 2,
                top: (point.y + nextPoint.y) / 2 - 1,
                width: length,
                backgroundColor: colors.primary,
                transform: [{ rotate: `${angle}deg` }],
              },
            ]}
          />
        );
      })}
      {points.map((point, index) => {
        const item = data[index];
        const selected = selectedIndex === index;
        return (
          <Pressable
            key={item.id ?? `${item.label}-${index}`}
            onPress={() => onPointPress(item, index)}
            accessibilityRole="button"
            accessibilityLabel={`${item.label}: ${valueFormatter(item.value)}`}
            accessibilityState={{ selected }}
            style={[
              styles.point,
              {
                left: point.x - 8,
                top: point.y - 8,
                backgroundColor: selected ? colors.primaryVariant : colors.primary,
                borderColor: colors.surface,
              },
            ]}
          />
        );
      })}
      {showLabels && (
        <View style={styles.lineLabels} pointerEvents="none">
          {data.map((point) => (
            <X2Text key={point.id ?? point.label} variant="labelS" color={colors.textTertiary} numberOfLines={1} style={styles.lineLabel}>
              {point.label}
            </X2Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  selectedValue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  chart: {
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: StyleSheet.hairlineWidth,
  },
  barPlot: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: spacing.xs,
  },
  barColumn: {
    flex: 1,
    minWidth: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: spacing.xs,
  },
  bar: {
    width: '70%',
    minWidth: 6,
    borderWidth: 2,
    borderRadius: radius.sm,
  },
  segment: {
    position: 'absolute',
    height: 2,
  },
  point: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderWidth: 3,
    borderRadius: 8,
  },
  lineLabels: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lineLabel: {
    maxWidth: 60,
  },
});
