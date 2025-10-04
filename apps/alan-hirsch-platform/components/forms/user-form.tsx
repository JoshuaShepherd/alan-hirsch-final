import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/components/ui';
import type { UserProfile } from '@platform/shared/contracts';
import { newUserProfileSchema, userProfileSchema } from '@platform/shared/contracts';
import { useTypedForm } from '@/lib/forms/hooks';
import type { UserFormProps } from '@/lib/types/component-props';
import { BaseForm, FormField, FormGrid, FormSection } from './base-form';

// ============================================================================
// User Form Component - Type-Safe Implementation
// ============================================================================

export function UserForm({
  user,
  onSubmit,
  onCancel,
  isLoading = false,
  mode = 'create',
  showAdvancedFields = false,
  className,
}: UserFormProps) {
  const schema =
    mode === 'create' ? newUserProfileSchema : userProfileSchema.partial();

  const form = useTypedForm({
    schema,
    defaultValues: user || {},
    onSubmit: async data => {
      await onSubmit(data);
    },
    resetOnSuccess: mode === 'create',
  });

  const {
    register,
    formState: { errors },
    watch,
  } = form;

  return (
    <BaseForm
      form={form}
      submitText={mode === 'create' ? 'Create User' : 'Update User'}
      isLoading={isLoading}
      className={className}
    >
      <FormSection
        title="Basic Information"
        description="Enter the user's basic profile information"
      >
        <FormGrid columns={2}>
          <FormField
            label="First Name"
            required
            error={errors.firstName?.message}
          >
            <Input {...register('firstName')} placeholder="Enter first name" />
          </FormField>

          <FormField
            label="Last Name"
            required
            error={errors.lastName?.message}
          >
            <Input {...register('lastName')} placeholder="Enter last name" />
          </FormField>
        </FormGrid>

        <FormField label="Email" required error={errors.email?.message}>
          <Input
            {...register('email')}
            type="email"
            placeholder="Enter email address"
          />
        </FormField>

        <FormField
          label="Bio"
          description="A brief description of the user"
          error={errors.bio?.message}
        >
          <Textarea
            {...register('bio')}
            placeholder="Enter user bio"
            rows={3}
          />
        </FormField>
      </FormSection>

      <FormSection
        title="Profile Settings"
        description="Configure user profile preferences"
      >
        <FormGrid columns={2}>
          <FormField label="Timezone" error={errors.timezone?.message}>
            <Select {...register('timezone')}>
              <SelectTrigger>
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UTC">UTC</SelectItem>
                <SelectItem value="America/New_York">Eastern Time</SelectItem>
                <SelectItem value="America/Chicago">Central Time</SelectItem>
                <SelectItem value="America/Denver">Mountain Time</SelectItem>
                <SelectItem value="America/Los_Angeles">
                  Pacific Time
                </SelectItem>
                <SelectItem value="Europe/London">London</SelectItem>
                <SelectItem value="Europe/Paris">Paris</SelectItem>
                <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                <SelectItem value="Asia/Shanghai">Shanghai</SelectItem>
                <SelectItem value="Australia/Sydney">Sydney</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Language" error={errors.language?.message}>
            <Select {...register('language')}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="it">Italian</SelectItem>
                <SelectItem value="pt">Portuguese</SelectItem>
                <SelectItem value="ru">Russian</SelectItem>
                <SelectItem value="zh">Chinese</SelectItem>
                <SelectItem value="ja">Japanese</SelectItem>
                <SelectItem value="ko">Korean</SelectItem>
                <SelectItem value="ar">Arabic</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
        </FormGrid>

        <FormField
          label="Cultural Context"
          description="The cultural background that influences the user's perspective"
          error={errors.culturalContext?.message}
        >
          <Select {...register('culturalContext')}>
            <SelectTrigger>
              <SelectValue placeholder="Select cultural context" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="western">Western</SelectItem>
              <SelectItem value="eastern">Eastern</SelectItem>
              <SelectItem value="african">African</SelectItem>
              <SelectItem value="latin_american">Latin American</SelectItem>
              <SelectItem value="middle_eastern">Middle Eastern</SelectItem>
              <SelectItem value="oceanic">Oceanic</SelectItem>
              <SelectItem value="global">Global</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </FormSection>

      {showAdvancedFields && (
        <FormSection
          title="Advanced Settings"
          description="Additional user configuration options"
        >
          <FormGrid columns={2}>
            <FormField
              label="Ministry Role"
              error={errors.ministryRole?.message}
            >
              <Select {...register('ministryRole')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select ministry role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pastor">Pastor</SelectItem>
                  <SelectItem value="elder">Elder</SelectItem>
                  <SelectItem value="deacon">Deacon</SelectItem>
                  <SelectItem value="leader">Leader</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="visitor">Visitor</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Status" error={errors.isActive?.message}>
              <Select {...register('isActive')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Active</SelectItem>
                  <SelectItem value="false">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </FormGrid>
        </FormSection>
      )}

      <div className="flex justify-end gap-3">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
        )}
      </div>
    </BaseForm>
  );
}

// ============================================================================
// User Form with API Integration
// ============================================================================

export function UserFormWithAPI({
  user,
  onSuccess,
  onCancel,
  mode = 'create',
  showAdvancedFields = false,
  className,
}: Omit<UserFormProps, 'onSubmit' | 'isLoading'> & {
  onSuccess?: (user: UserProfile) => void;
}) {
  const endpoint = mode === 'create' ? '/api/users' : `/api/users/${user?.id}`;
  const method = mode === 'create' ? 'POST' : 'PUT';

  const form = useTypedForm({
    schema:
      mode === 'create' ? newUserProfileSchema : userProfileSchema.partial(),
    defaultValues: user || {},
    onSubmit: async data => {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      const result = await response.json();
      onSuccess?.(result.data);
    },
    onSuccess: data => {
      onSuccess?.(data as UserProfile);
    },
    resetOnSuccess: mode === 'create',
  });

  return (
    <UserForm
      user={user}
      onSubmit={async () => {}} // Handled by the form hook
      onCancel={onCancel}
      isLoading={form.formState.isLoading}
      mode={mode}
      showAdvancedFields={showAdvancedFields}
      className={className}
    />
  );
}

// ============================================================================
// Export Components
// ============================================================================

export { UserForm, UserFormWithAPI };
