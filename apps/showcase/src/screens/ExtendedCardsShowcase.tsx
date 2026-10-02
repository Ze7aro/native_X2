import { useState } from 'react';
import { ScrollView } from 'react-native';
import {
  FeatureCard,
  StatsCard,
  ReviewCard,
  ProductCard,
  EventCard,
  GalleryCard,
  X2Surface,
  X2Text,
  X2Stack,
  X2Icon,
  useThemeColors,
} from 'react-x2-native';
import { spacing } from '@react-x2-native/tokens';

export function ExtendedCardsShowcase() {
  const colors = useThemeColors();
  const [, setSelectedProduct] = useState<string | null>(null);

  return (
    <ScrollView>
      <X2Surface style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.lg }}>
        <X2Text variant="headingL" style={{ marginBottom: spacing.lg }}>
          Extended Cards
        </X2Text>

        <X2Stack gap="xl">
          {/* Feature Cards */}
          <X2Stack gap="md">
            <X2Text variant="labelM" color={colors.primary}>
              Feature Cards
            </X2Text>
            <X2Stack gap="md">
              <FeatureCard
                testID="feature-card-1"
                icon={<X2Icon name="🚀" size={64} />}
                title="Fast Performance"
                description="Optimized for speed with 60 FPS animations"
                variant="default"
                onPress={() => console.log('Feature 1 pressed')}
              />
              <FeatureCard
                testID="feature-card-2"
                icon={<X2Icon name="🎨" size={48} />}
                title="Beautiful Design"
                description="Modern UI patterns"
                variant="compact"
                onPress={() => console.log('Feature 2 pressed')}
              />
              <FeatureCard
                testID="feature-card-3"
                icon={<X2Icon name="♿" size={72} />}
                title="Accessible"
                description="WCAG compliant components for everyone"
                variant="highlighted"
                backgroundColor={colors.primary}
                onPress={() => console.log('Feature 3 pressed')}
              />
            </X2Stack>
          </X2Stack>

          {/* Stats Cards */}
          <X2Stack gap="md">
            <X2Text variant="labelM" color={colors.primary}>
              Stats Cards
            </X2Text>
            <X2Stack gap="md" direction="row" style={{ flexWrap: 'wrap' }}>
              <X2Stack gap="md" style={{ flex: 1, minWidth: '48%' }}>
                <StatsCard
                  testID="stats-card-1"
                  label="Users"
                  value={12500}
                  trend="up"
                  trendValue="12% this month"
                />
                <StatsCard
                  testID="stats-card-2"
                  label="Revenue"
                  value={48}
                  unit="K€"
                  trend="up"
                  trendValue="8% increase"
                />
              </X2Stack>
              <X2Stack gap="md" style={{ flex: 1, minWidth: '48%' }}>
                <StatsCard
                  testID="stats-card-3"
                  label="Engagement"
                  value={87}
                  unit="%"
                  trend="down"
                  trendValue="3% decrease"
                />
                <StatsCard
                  testID="stats-card-4"
                  label="Conversion"
                  value={3.5}
                  unit="%"
                  trend="neutral"
                  trendValue="Stable"
                />
              </X2Stack>
            </X2Stack>
          </X2Stack>

          {/* Review Cards */}
          <X2Stack gap="md">
            <X2Text variant="labelM" color={colors.primary}>
              Review Cards
            </X2Text>
            <X2Stack gap="md">
              <ReviewCard
                testID="review-card-1"
                author="Sarah Developer"
                rating={5}
                text="Amazing component library! The animations are smooth and the accessibility is top-notch. Highly recommended for React Native projects."
                date="2 days ago"
                avatar={<X2Icon name="👩" size={40} />}
                onPress={() => console.log('Review 1 pressed')}
              />
              <ReviewCard
                testID="review-card-2"
                author="John Designer"
                rating={4}
                text="Great design tokens and well-structured components. Would love to see more documentation."
                date="1 week ago"
                avatar={<X2Icon name="👨" size={40} />}
                onPress={() => console.log('Review 2 pressed')}
              />
            </X2Stack>
          </X2Stack>

          {/* Product Cards */}
          <X2Stack gap="md">
            <X2Text variant="labelM" color={colors.primary}>
              Product Cards
            </X2Text>
            <X2Stack gap="md">
              <ProductCard
                testID="product-card-1"
                image={<X2Icon name="📱" size={120} />}
                title="React Native Phone"
                price="$599"
                originalPrice="$799"
                rating={4.5}
                inStock={true}
                onPress={() => setSelectedProduct('phone')}
                onAddToCart={() => console.log('Phone added to cart')}
              />
              <ProductCard
                testID="product-card-2"
                image={<X2Icon name="⌚" size={120} />}
                title="Smart Watch"
                price="$199"
                rating={4}
                inStock={false}
                onPress={() => setSelectedProduct('watch')}
                onAddToCart={() => console.log('Watch added to cart')}
              />
            </X2Stack>
          </X2Stack>

          {/* Event Cards */}
          <X2Stack gap="md">
            <X2Text variant="labelM" color={colors.primary}>
              Event Cards
            </X2Text>
            <X2Stack gap="md">
              <EventCard
                testID="event-card-1"
                title="React Native Conference 2026"
                date="March 15, 2026"
                time="9:00 AM"
                location="San Francisco, CA"
                attendees={2450}
                image={<X2Icon name="🎉" size={200} />}
                onPress={() => console.log('Event 1 pressed')}
                onRegister={() => console.log('Registered for event 1')}
              />
            </X2Stack>
          </X2Stack>

          {/* Gallery Cards */}
          <X2Stack gap="md">
            <X2Text variant="labelM" color={colors.primary}>
              Gallery Cards
            </X2Text>
            <GalleryCard
              testID="gallery-card-1"
              title="Component Gallery"
              maxVisible={4}
              images={[
                { id: '1', content: <X2Icon name="🎨" size={80} /> },
                { id: '2', content: <X2Icon name="🎭" size={80} /> },
                { id: '3', content: <X2Icon name="🎪" size={80} /> },
                { id: '4', content: <X2Icon name="🎬" size={80} /> },
                { id: '5', content: <X2Icon name="🎯" size={80} /> },
                { id: '6', content: <X2Icon name="🎲" size={80} /> },
              ]}
              onImagePress={(index: number, id: string) =>
                console.log(`Image ${index + 1} (${id}) pressed`)
              }
              onViewAll={() => console.log('View all gallery')}
            />
          </X2Stack>

          {/* Features Info */}
          <X2Surface backgroundColor={colors.surfaceVariant} style={{ padding: spacing.lg }}>
            <X2Text variant="labelM" color={colors.primary} style={{ marginBottom: spacing.sm }}>
              Features
            </X2Text>
            <X2Stack gap="xs">
              <X2Text variant="bodyS">✓ FeatureCard with 3 variants</X2Text>
              <X2Text variant="bodyS">✓ StatsCard with trend indicators</X2Text>
              <X2Text variant="bodyS">✓ ReviewCard with star ratings</X2Text>
              <X2Text variant="bodyS">✓ ProductCard with pricing</X2Text>
              <X2Text variant="bodyS">✓ EventCard with registration</X2Text>
              <X2Text variant="bodyS">✓ GalleryCard with infinite scroll</X2Text>
              <X2Text variant="bodyS">✓ All respect motion reduction</X2Text>
            </X2Stack>
          </X2Surface>
        </X2Stack>
      </X2Surface>
    </ScrollView>
  );
}
