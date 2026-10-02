import React, { useState } from 'react';
import { View } from 'react-native';
import {
  FormField,
  X2Pressable,
  X2Stack,
  X2Surface,
  X2Text,
  useThemeColors,
} from 'react-x2-native';
import { spacing } from '@react-x2-native/tokens';

export function FormFieldShowcase() {
  const colors = useThemeColors();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <View>
      <X2Surface style={{ padding: spacing.lg }}>
        <X2Text variant="headingL" style={{ marginBottom: spacing.sm }}>
          Form Field
        </X2Text>
        <X2Text variant="bodyM" color={colors.textSecondary} style={{ marginBottom: spacing.lg }}>
          Campos configurables con validación, estados visuales y mensajes accesibles.
        </X2Text>

        <X2Stack gap="lg">
          <FormField
            testID="form-email"
            label="Email"
            description="We will use this email for account notifications."
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            required
            validate={(value) => value.includes('@') ? undefined : 'Enter a valid email address'}
          />
          <FormField
            testID="form-password"
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="At least 8 characters"
            secureTextEntry
            required
            validateOn="change"
            validate={(value) => value.length >= 8 ? undefined : 'Use at least 8 characters'}
            helperText="Use a mix of letters, numbers and symbols."
            suffix={<X2Text color={colors.textTertiary}>•••</X2Text>}
          />
          <FormField
            label="Loading example"
            defaultValue="Syncing profile"
            loading
            helperText="This field is temporarily unavailable."
          />
        </X2Stack>

        <X2Pressable
          backgroundColor={colors.primary}
          onPress={() => setSubmitted(true)}
          style={{ alignSelf: 'flex-start', marginTop: spacing.lg, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderRadius: 8 }}
        >
          <X2Text color={colors.onPrimary}>Submit</X2Text>
        </X2Pressable>
        {submitted && (
          <X2Text variant="bodyS" color={colors.success} style={{ marginTop: spacing.md }}>
            Form submitted from showcase.
          </X2Text>
        )}
      </X2Surface>
    </View>
  );
}
