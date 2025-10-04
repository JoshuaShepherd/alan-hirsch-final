import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@platform/ui/card';
import { Input } from '@platform/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@platform/ui/select';
import { Textarea } from '@platform/ui/textarea';
import { NewOrganization, newOrganizationSchema } from '@/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { BaseForm, FormFieldGroup, FormSection } from '../base-form';
import { FormField } from '../form-field';

export interface OrganizationFormProps {
  onSuccess?: (organization: NewOrganization) => void;
  onError?: (error: Error) => void;
  defaultValues?: Partial<NewOrganization>;
  className?: string;
  isLoading?: boolean;
  mode?: 'create' | 'update';
}

/**
 * Form for creating and updating organizations
 */
export function OrganizationForm({
  onSuccess,
  onError,
  defaultValues,
  className,
  isLoading = false,
  mode = 'create',
}: OrganizationFormProps) {
  const form = useForm<NewOrganization>({
    resolver: zodResolver(
      mode === 'update'
        ? newOrganizationSchema.partial()
        : newOrganizationSchema
    ),
    defaultValues: {
      licenseType: 'individual',
      maxUsers: 1,
      status: 'trial',
      ...defaultValues,
    },
  });

  const onSubmit = async (data: NewOrganization) => {
    try {
      const endpoint =
        mode === 'create'
          ? '/api/organizations'
          : `/api/organizations/${defaultValues?.id}`;
      const method = mode === 'create' ? 'POST' : 'PATCH';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save organization');
      }

      const result = await response.json();
      onSuccess?.(result.data);
    } catch (error) {
      console.error('Organization save error:', error);
      onError?.(
        error instanceof Error
          ? error
          : new Error('Failed to save organization')
      );
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>
          {mode === 'create' ? 'Create Organization' : 'Update Organization'}
        </CardTitle>
        <CardDescription>
          {mode === 'create'
            ? 'Create a new organization for your ministry or church'
            : 'Update organization details and settings'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <BaseForm
          form={form}
          onSubmit={onSubmit}
          submitText={
            mode === 'create' ? 'Create Organization' : 'Update Organization'
          }
          isLoading={isLoading}
          className="space-y-6"
        >
          {/* Basic Information */}
          <FormSection
            title="Basic Information"
            description="Essential organization details"
          >
            <FormField
              name="name"
              label="Organization Name"
              required
              description="The name of your organization"
            >
              <Input
                {...form.register('name')}
                placeholder="Enter organization name"
              />
            </FormField>

            <FormField
              name="slug"
              label="URL Slug"
              required
              description="URL-friendly identifier (lowercase, hyphens only)"
            >
              <Input
                {...form.register('slug')}
                placeholder="organization-slug"
              />
            </FormField>

            <FormField
              name="description"
              label="Description"
              description="Brief description of your organization"
            >
              <Textarea
                {...form.register('description')}
                placeholder="Tell us about your organization..."
                rows={3}
              />
            </FormField>

            <FormField
              name="website"
              label="Website"
              description="Organization website URL"
            >
              <Input
                {...form.register('website')}
                placeholder="https://example.com"
              />
            </FormField>
          </FormSection>

          {/* Organization Classification */}
          <FormSection
            title="Organization Classification"
            description="Classify your organization type and size"
          >
            <FormFieldGroup columns={2}>
              <FormField
                name="organizationType"
                label="Organization Type"
                required
                description="Type of organization"
              >
                <Select
                  onValueChange={value =>
                    form.setValue('organizationType', value as any)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select organization type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="church">Church</SelectItem>
                    <SelectItem value="denomination">Denomination</SelectItem>
                    <SelectItem value="ministry">Ministry</SelectItem>
                    <SelectItem value="nonprofit">Nonprofit</SelectItem>
                    <SelectItem value="school">School</SelectItem>
                    <SelectItem value="conference">Conference</SelectItem>
                    <SelectItem value="network">Network</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField
                name="sizeCategory"
                label="Size Category"
                description="Organization size category"
              >
                <Select
                  onValueChange={value =>
                    form.setValue('sizeCategory', value as any)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select size category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small (1-50 people)</SelectItem>
                    <SelectItem value="medium">
                      Medium (51-200 people)
                    </SelectItem>
                    <SelectItem value="large">
                      Large (201-1000 people)
                    </SelectItem>
                    <SelectItem value="enterprise">
                      Enterprise (1000+ people)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </FormFieldGroup>
          </FormSection>

          {/* Contact Information */}
          <FormSection
            title="Contact Information"
            description="Primary contact details"
          >
            <FormFieldGroup columns={2}>
              <FormField
                name="contactEmail"
                label="Contact Email"
                description="Primary contact email"
              >
                <Input
                  type="email"
                  {...form.register('contactEmail')}
                  placeholder="contact@example.com"
                />
              </FormField>

              <FormField
                name="contactPhone"
                label="Contact Phone"
                description="Primary contact phone number"
              >
                <Input
                  {...form.register('contactPhone')}
                  placeholder="+1 (555) 123-4567"
                />
              </FormField>
            </FormFieldGroup>

            <FormField
              name="billingEmail"
              label="Billing Email"
              description="Email for billing and invoices"
            >
              <Input
                type="email"
                {...form.register('billingEmail')}
                placeholder="billing@example.com"
              />
            </FormField>
          </FormSection>

          {/* Address */}
          <FormSection
            title="Address"
            description="Physical address information"
          >
            <FormField
              name="address.street"
              label="Street Address"
              description="Street address"
            >
              <Input
                {...form.register('address.street')}
                placeholder="123 Main Street"
              />
            </FormField>

            <FormFieldGroup columns={3}>
              <FormField name="address.city" label="City" description="City">
                <Input {...form.register('address.city')} placeholder="City" />
              </FormField>

              <FormField
                name="address.state"
                label="State/Province"
                description="State or province"
              >
                <Input
                  {...form.register('address.state')}
                  placeholder="State"
                />
              </FormField>

              <FormField
                name="address.postalCode"
                label="Postal Code"
                description="ZIP or postal code"
              >
                <Input
                  {...form.register('address.postalCode')}
                  placeholder="12345"
                />
              </FormField>
            </FormFieldGroup>

            <FormField
              name="address.country"
              label="Country"
              description="Country"
            >
              <Input
                {...form.register('address.country')}
                placeholder="United States"
              />
            </FormField>
          </FormSection>

          {/* Licensing & Billing */}
          <FormSection
            title="Licensing & Billing"
            description="License type and user limits"
          >
            <FormFieldGroup columns={2}>
              <FormField
                name="licenseType"
                label="License Type"
                description="Type of license"
              >
                <Select
                  onValueChange={value =>
                    form.setValue('licenseType', value as any)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select license type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="institutional">Institutional</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField
                name="maxUsers"
                label="Maximum Users"
                description="Maximum number of users allowed"
              >
                <Input
                  type="number"
                  {...form.register('maxUsers', { valueAsNumber: true })}
                  placeholder="1"
                  min="1"
                />
              </FormField>
            </FormFieldGroup>
          </FormSection>

          {/* Status */}
          <FormSection
            title="Status"
            description="Organization status and visibility"
          >
            <FormField
              name="status"
              label="Status"
              description="Current organization status"
            >
              <Select
                onValueChange={value => form.setValue('status', value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="trial">Trial</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </FormSection>
        </BaseForm>
      </CardContent>
    </Card>
  );
}
