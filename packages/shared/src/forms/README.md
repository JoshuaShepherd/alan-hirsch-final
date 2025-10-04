# Type-Safe Form System

A comprehensive form handling system built with React Hook Form, Zod validation, and shadcn/ui components that provides complete type safety from user input to database persistence.

## 🎯 Features

- **Complete Type Safety**: Full TypeScript inference from Zod schemas to form data
- **Real-time Validation**: Instant validation feedback with debounced error checking
- **Form Persistence**: Auto-save form state to localStorage with restoration
- **File Upload**: Drag & drop file upload with progress tracking
- **Multi-step Forms**: Complex forms with step-by-step validation
- **URL Synchronization**: Sync form state with URL parameters for shareable links
- **Conditional Fields**: Show/hide fields based on other field values
- **Array Fields**: Dynamic lists with add/remove functionality
- **Accessibility**: Full ARIA support and keyboard navigation

## 📁 Structure

```
lib/forms/
├── hooks.ts              # Core form hooks and utilities
├── base-form.tsx         # Base form components
├── form-field.tsx        # Reusable field components
└── index.ts              # Main exports

components/forms/
├── base-form.tsx         # Base form wrapper
├── form-field.tsx        # Field wrapper components
├── user/                 # User-specific forms
├── assessments/          # Assessment forms
├── content/              # Content forms
├── organizations/        # Organization forms
├── advanced/             # Advanced form features
├── shared/               # Shared form components
└── examples/             # Example implementations
```

## 🚀 Quick Start

### Basic Form

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BaseForm, FormField } from '@/components/forms';
import { Input } from '@/components/ui/input';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
});

type FormData = z.infer<typeof schema>;

function MyForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    // Handle form submission
    console.log(data);
  };

  return (
    <BaseForm form={form} onSubmit={onSubmit}>
      <FormField name="name" label="Name" required>
        <Input {...form.register('name')} />
      </FormField>

      <FormField name="email" label="Email" required>
        <Input type="email" {...form.register('email')} />
      </FormField>
    </BaseForm>
  );
}
```

### Using Form Hooks

```tsx
import { useTypedForm } from '@/lib/forms/hooks';

function AdvancedForm() {
  const { form, handleSubmit, isSubmitting, errors } = useTypedForm(schema, {
    defaultValues: { name: '', email: '' },
    persistKey: 'my-form', // Auto-save to localStorage
    debounceMs: 300, // Real-time validation
  });

  const onSubmit = handleSubmit(async data => {
    // Type-safe data handling
    await submitToAPI(data);
  });

  return (
    <BaseForm form={form} onSubmit={onSubmit}>
      {/* Form fields */}
    </BaseForm>
  );
}
```

## 🔧 Core Hooks

### `useTypedForm<T>(schema, options)`

Main form hook that combines React Hook Form with Zod validation.

```tsx
const { form, handleSubmit, isSubmitting, errors, reset, setValue, watch } =
  useTypedForm(schema, {
    defaultValues: {},
    mode: 'onChange',
    persistKey: 'form-key',
    debounceMs: 300,
  });
```

### `useFormPersistence(form, persistKey)`

Auto-save form state to localStorage.

```tsx
useFormPersistence(form, 'my-form-key');
```

### `useMultiStepForm(steps, form)`

Multi-step form state management.

```tsx
const { state, nextStep, prevStep, validateCurrentStep } = useMultiStepForm(
  steps,
  form
);
```

### `useURLSync(form, basePath)`

Sync form state with URL parameters.

```tsx
const { updateURL, syncWithURL } = useURLSync(form, '/search');
```

### `useFileUpload(options)`

File upload with validation and progress tracking.

```tsx
const { files, handleFileChange, removeFile, validateFile } = useFileUpload({
  maxSize: 10 * 1024 * 1024, // 10MB
  acceptedTypes: ['image/*', 'application/pdf'],
  multiple: true,
});
```

## 📝 Form Components

### BaseForm

Wrapper component that provides consistent styling and error handling.

```tsx
<BaseForm
  form={form}
  onSubmit={onSubmit}
  submitText="Submit"
  showCancel={true}
  isLoading={isLoading}
  error={error}
  successMessage="Success!"
>
  {/* Form fields */}
</BaseForm>
```

### FormField

Reusable field wrapper with validation display.

```tsx
<FormField
  name="email"
  label="Email Address"
  required
  description="Your email address"
  helpText="We'll never share your email"
>
  <Input type="email" {...form.register('email')} />
</FormField>
```

### FormFieldGroup

Grid layout for multiple fields.

```tsx
<FormFieldGroup columns={2} gap="md">
  <FormField name="firstName" label="First Name">
    <Input {...form.register('firstName')} />
  </FormField>
  <FormField name="lastName" label="Last Name">
    <Input {...form.register('lastName')} />
  </FormField>
</FormFieldGroup>
```

### ConditionalField

Show/hide fields based on other field values.

```tsx
<ConditionalField name="hasOrganization" condition={value => value === true}>
  <FormField name="organizationName" label="Organization Name">
    <Input {...form.register('organizationName')} />
  </FormField>
</ConditionalField>
```

## 🎨 Advanced Features

### File Upload

```tsx
import {
  FileUploadField,
  ImageUploadField,
} from '@/components/forms/advanced/file-upload';

<FileUploadField
  name="documents"
  label="Upload Documents"
  multiple={true}
  maxSize={10 * 1024 * 1024}
  acceptedTypes={['application/pdf', 'image/*']}
  onUpload={handleFileUpload}
/>;
```

### Multi-step Forms

```tsx
import { MultiStepOnboardingForm } from '@/components/forms/advanced/multi-step-form';

<MultiStepOnboardingForm
  onComplete={data => console.log('Completed:', data)}
  onError={error => console.error('Error:', error)}
/>;
```

### Search Forms

```tsx
import { ContentSearchForm } from '@/components/forms/shared/search-form';

<ContentSearchForm
  onSearch={filters => handleSearch(filters)}
  syncWithURL={true}
  showFilters={true}
  showSorting={true}
/>;
```

## 🔗 Integration with API Routes

Forms integrate seamlessly with your existing type-safe API routes:

```tsx
const onSubmit = async (data: FormData) => {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const result = await response.json();
    onSuccess?.(result.data);
  } catch (error) {
    onError?.(error);
  }
};
```

## 🧪 Testing

The form system includes comprehensive test utilities:

```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CreateUserForm } from '@/components/forms/user/create-user-form';

test('should validate required fields', async () => {
  render(<CreateUserForm onSuccess={() => {}} onError={() => {}} />);

  const submitButton = screen.getByRole('button', { name: /create user/i });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
  });
});
```

## 📚 Examples

See the comprehensive examples in:

- `/components/forms/examples/comprehensive-form-example.tsx`
- `/app/(dashboard)/forms-demo/page.tsx`

## 🎯 Best Practices

1. **Use Existing Schemas**: Always use your existing Zod schemas from `/validations/`
2. **Type Safety**: Leverage TypeScript inference for complete type safety
3. **Error Handling**: Provide clear error messages and recovery options
4. **Accessibility**: Use proper ARIA labels and keyboard navigation
5. **Performance**: Use debounced validation for real-time feedback
6. **Persistence**: Save form state for better user experience
7. **Validation**: Keep validation logic in Zod schemas, not components

## 🔄 Migration Guide

If you're migrating from basic React Hook Form:

1. Replace `useForm` with `useTypedForm`
2. Wrap forms with `BaseForm` component
3. Use `FormField` for consistent styling
4. Add Zod schemas for validation
5. Implement error handling with `onError` callbacks

## 🐛 Troubleshooting

### Common Issues

1. **Type Errors**: Ensure Zod schemas match your form data structure
2. **Validation Not Working**: Check that `zodResolver` is properly configured
3. **File Upload Issues**: Verify file size limits and accepted types
4. **Persistence Problems**: Check localStorage permissions and key conflicts

### Debug Mode

Enable debug mode for form development:

```tsx
const form = useForm({
  resolver: zodResolver(schema),
  mode: 'onChange', // Real-time validation
  shouldFocusError: true, // Focus on first error
});
```

## 📖 API Reference

For complete API documentation, see the TypeScript definitions in the source files. All components and hooks are fully typed with JSDoc comments.
