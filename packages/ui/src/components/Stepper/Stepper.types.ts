import type { ViewProps } from 'react-native';

export interface StepperItem {
  id: string;
  label: string;
  description?: string;
  status?: 'completed' | 'current' | 'pending';
}

export interface StepperProps extends ViewProps {
  steps: StepperItem[];
  currentStep: number;
  onStepPress?: (stepIndex: number, stepId: string) => void;
  variant?: 'horizontal' | 'vertical';
  showLabels?: boolean;
  disabled?: boolean;
  testID?: string;
}
