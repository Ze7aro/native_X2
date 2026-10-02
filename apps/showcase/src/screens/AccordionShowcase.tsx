import React, { useState } from 'react';
import { Accordion, X2Surface, X2Text, X2Stack, X2Icon, useThemeColors } from 'react-x2-native';
import { spacing } from '@react-x2-native/tokens';

export function AccordionShowcase() {
  const colors = useThemeColors();
  const [expandedIds, setExpandedIds] = useState<string[]>(['section1']);

  const faqSections = [
    {
      id: 'section1',
      title: 'What is react-X2-native?',
      icon: <X2Icon name="❓" size={18} />,
      content: (
        <X2Text variant="bodyS" color={colors.textSecondary}>
          A personal library of reusable React Native components with modern UI patterns, optimized
          for touch interaction on iOS and Android.
        </X2Text>
      ),
    },
    {
      id: 'section2',
      title: 'How do I install it?',
      icon: <X2Icon name="📦" size={18} />,
      content: (
        <X2Stack gap="sm">
          <X2Text variant="bodyS">npm install react-x2-native</X2Text>
          <X2Text variant="bodyS" color={colors.textSecondary}>
            or with pnpm: pnpm add react-x2-native
          </X2Text>
        </X2Stack>
      ),
    },
    {
      id: 'section3',
      title: 'What components are available?',
      icon: <X2Icon name="🧩" size={18} />,
      content: (
        <X2Stack gap="sm">
          <X2Text variant="bodyS">Cards: SpotlightCard, TiltedCard, ProfileCard</X2Text>
          <X2Text variant="bodyS">Navigation: Dock, AnimatedTabs, SegmentedControl</X2Text>
          <X2Text variant="bodyS">Collections: Carousel, AnimatedList, Accordion</X2Text>
          <X2Text variant="bodyS">And many more coming soon!</X2Text>
        </X2Stack>
      ),
    },
    {
      id: 'section4',
      title: 'Is it accessible?',
      icon: <X2Icon name="♿" size={18} />,
      content: (
        <X2Text variant="bodyS" color={colors.textSecondary}>
          Yes! All components follow accessibility standards with screen reader support, keyboard
          navigation, and proper ARIA attributes.
        </X2Text>
      ),
    },
  ];

  return (
    <X2Surface style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.lg }}>
      <X2Text variant="headingL" style={{ marginBottom: spacing.md }}>
        Accordion
      </X2Text>

      <X2Stack gap="lg">
        {/* FAQ Accordion */}
        <X2Stack gap="md">
          <X2Text variant="labelM" color={colors.primary}>
            Frequently Asked Questions
          </X2Text>
          <Accordion
            testID="accordion-faq"
            sections={faqSections}
            expandedIds={expandedIds}
            onExpandChange={setExpandedIds}
            allowMultiple={true}
          />
        </X2Stack>

        {/* Expanded Sections Info */}
        <X2Surface backgroundColor={colors.surfaceVariant} style={{ padding: spacing.lg }}>
          <X2Text variant="labelM" color={colors.primary} style={{ marginBottom: spacing.sm }}>
            Expanded Sections
          </X2Text>
          <X2Stack gap="xs">
            {expandedIds.length === 0 ? (
              <X2Text variant="bodyS" color={colors.textSecondary}>
                No sections expanded
              </X2Text>
            ) : (
              expandedIds.map((id) => {
                const section = faqSections.find((s) => s.id === id);
                return (
                  <X2Text key={id} variant="bodyS">
                    • {section?.title}
                  </X2Text>
                );
              })
            )}
          </X2Stack>
        </X2Surface>

        {/* Features */}
        <X2Surface backgroundColor={colors.surfaceVariant} style={{ padding: spacing.lg }}>
          <X2Text variant="labelM" color={colors.primary} style={{ marginBottom: spacing.sm }}>
            Features
          </X2Text>
          <X2Stack gap="xs">
            <X2Text variant="bodyS">✓ Expandable/collapsible sections</X2Text>
            <X2Text variant="bodyS">✓ Single or multiple open sections</X2Text>
            <X2Text variant="bodyS">✓ Smooth height animations</X2Text>
            <X2Text variant="bodyS">✓ Optional section icons</X2Text>
            <X2Text variant="bodyS">✓ Controlled expansion state</X2Text>
            <X2Text variant="bodyS">✓ Full keyboard navigation</X2Text>
            <X2Text variant="bodyS">✓ Accessibility compliant</X2Text>
            <X2Text variant="bodyS">✓ Respects motion reduction</X2Text>
          </X2Stack>
        </X2Surface>

        {/* Usage Example */}
        <X2Surface backgroundColor={colors.surfaceVariant} style={{ padding: spacing.lg }}>
          <X2Text variant="labelM" color={colors.primary} style={{ marginBottom: spacing.sm }}>
            Usage Tips
          </X2Text>
          <X2Stack gap="sm">
            <X2Text variant="bodyS" color={colors.textSecondary}>
              Pass sections array with id, title, content, and optional icon.
            </X2Text>
            <X2Text variant="bodyS" color={colors.textSecondary}>
              Control expanded sections with expandedIds and onExpandChange.
            </X2Text>
            <X2Text variant="bodyS" color={colors.textSecondary}>
              Set allowMultiple to false for single-open sections (like iOS-style).
            </X2Text>
          </X2Stack>
        </X2Surface>
      </X2Stack>
    </X2Surface>
  );
}
