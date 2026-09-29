import React, { useState, useCallback, useMemo } from 'react';
import { View, Pressable, ViewStyle } from 'react-native';
import { ExpandableCard } from '../ExpandableCard';
import { X2Text, X2Stack, X2Icon } from '../../primitives';
import { useTheme } from '../../theme/ThemeContext';
import { spacing } from '@react-x2-native/tokens';
import type { AccordionProps, AccordionSection } from './Accordion.types';

export function Accordion({
  sections,
  expandedIds: controlledExpandedIds,
  onExpandChange,
  allowMultiple = true,
  disabled = false,
  testID,
  style,
  ...props
}: AccordionProps) {
  const { colors } = useTheme();

  const [uncontrolledExpandedIds, setUncontrolledExpandedIds] = useState<string[]>([]);
  const expandedIds = controlledExpandedIds ?? uncontrolledExpandedIds;

  const handleToggle = useCallback(
    (sectionId: string, expanded: boolean) => {
      let newExpandedIds: string[];

      if (allowMultiple) {
        newExpandedIds = expanded
          ? [...expandedIds, sectionId]
          : expandedIds.filter((id) => id !== sectionId);
      } else {
        newExpandedIds = expanded ? [sectionId] : [];
      }

      if (controlledExpandedIds === undefined) {
        setUncontrolledExpandedIds(newExpandedIds);
      }
      onExpandChange?.(newExpandedIds);
    },
    [expandedIds, allowMultiple, controlledExpandedIds, onExpandChange],
  );

  const containerStyle: ViewStyle = useMemo(
    () => ({
      gap: spacing.md,
      opacity: disabled ? 0.5 : 1,
    }),
    [disabled],
  );

  return (
    <View
      style={[containerStyle, style]}
      testID={testID}
      accessible
      accessibilityRole="region"
      {...props}
    >
      {sections.map((section) => {
        const isExpanded = expandedIds.includes(section.id);

        return (
          <ExpandableCard
            key={section.id}
            testID={testID ? `${testID}-section-${section.id}` : undefined}
            expanded={isExpanded}
            onToggle={(expanded) => handleToggle(section.id, expanded)}
            disabled={disabled}
            header={
              <X2Stack
                direction="row"
                justify="space-between"
                align="center"
                style={{ width: '100%' }}
              >
                <X2Stack
                  direction="row"
                  gap={spacing.md}
                  align="center"
                  style={{ flex: 1 }}
                >
                  {section.icon && (
                    <View
                      style={{
                        opacity: isExpanded ? 1 : 0.6,
                      }}
                    >
                      {section.icon}
                    </View>
                  )}
                  <X2Text
                    variant="labelL"
                    color={isExpanded ? colors.primary : colors.text}
                    style={{
                      flex: 1,
                    }}
                  >
                    {section.title}
                  </X2Text>
                </X2Stack>
                <X2Icon
                  name={isExpanded ? '▼' : '▶'}
                  size={16}
                  color={isExpanded ? colors.primary : colors.textSecondary}
                />
              </X2Stack>
            }
            accessibilityLabel={section.title}
            accessibilityHint={isExpanded ? 'Expanded' : 'Collapsed'}
          >
            {section.content}
          </ExpandableCard>
        );
      })}
    </View>
  );
}
