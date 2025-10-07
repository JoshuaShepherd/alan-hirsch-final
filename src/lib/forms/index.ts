// Form utilities and hooks
export * from './hooks';

// Form validation utilities
export { zodResolver } from '@hookform/resolvers/zod';

// Re-export commonly used types
export type { FieldErrors, FieldValues, UseFormReturn } from 'react-hook-form';
export type { z } from 'zod';

// UI Form components from shadcn/ui
export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from '@/lib/ui/form';

// Base form components
export {
  BaseForm,
  FormActions,
  FormSection,
} from '@/components/forms/base-form';

// Form field components
export {
  ConditionalField,
  FormField as CustomFormField,
  FormFieldArray,
  FormFieldGroup,
} from '@/components/forms/form-field';

// Form hooks aliases for easier usage
export { useTypedForm as useZodForm } from './hooks';
