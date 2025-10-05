'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  organizationFormSchema,
  type OrganizationForm,
  type OrganizationResponse,
} from '@platform/shared/contracts';
import { BaseForm } from '@platform/shared/forms/base-form';
import { FormFieldGroup, FormSection } from '@platform/shared/forms/form-field';
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
import { useForm } from 'react-hook-form';
import { FormField } from '../form-field';

export interface OrganizationFormProps {
  onSuccess?: (organization: OrganizationResponse) => void;
  onError?: (error: Error) => void;
  defaultValues?: Partial<OrganizationForm>;
  className?: string;
  isLoading?: boolean;
  mode?: 'create' | 'update';
}

/**
 * Organization form for creating and updating organizations
 * Uses contract schemas for validation and type safety
 */
export function OrganizationForm({
  onSuccess,
  onError,
  defaultValues,
  className,
  isLoading = false,
  mode = 'create',
}: OrganizationFormProps) {
  const form = useForm<OrganizationForm>({
    resolver: zodResolver(organizationFormSchema),
    defaultValues: {
      organizationType: 'church',
      licenseType: 'individual',
      maxUsers: 1,
      ...defaultValues,
    },
  });

  const onSubmit = async (data: OrganizationForm) => {
    try {
      const endpoint =
        mode === 'create'
          ? '/api/organizations'
          : `/api/organizations/${data.id}`;
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

  const getTitle = () => {
    return mode === 'create' ? 'Create Organization' : 'Update Organization';
  };

  const getDescription = () => {
    return mode === 'create'
      ? 'Create a new organization'
      : 'Update your organization';
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{getTitle()}</CardTitle>
        <CardDescription>{getDescription()}</CardDescription>
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
              name="description"
              label="Description"
              description="Brief description of the organization"
            >
              <Textarea
                {...form.register('description')}
                placeholder="Describe your organization's mission and purpose..."
                rows={4}
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

          {/* Organization Details */}
          <FormSection
            title="Organization Details"
            description="Organization classification and type"
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
                    <SelectItem value="seminary">Seminary</SelectItem>
                    <SelectItem value="ministry_network">
                      Ministry Network
                    </SelectItem>
                    <SelectItem value="nonprofit">Nonprofit</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField
                name="sizeCategory"
                label="Size Category"
                description="Organization size"
              >
                <Select
                  onValueChange={value =>
                    form.setValue('sizeCategory', value as any)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="startup">Startup</SelectItem>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </FormFieldGroup>
          </FormSection>

          {/* Contact Information */}
          <FormSection
            title="Contact Information"
            description="Organization contact details"
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
                description="Primary contact phone"
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
          <FormSection title="Address" description="Organization address">
            <FormFieldGroup columns={2}>
              <FormField
                name="address.street"
                label="Street Address"
                description="Street address"
              >
                <Input
                  {...form.register('address.street')}
                  placeholder="123 Main St"
                />
              </FormField>

              <FormField name="address.city" label="City" description="City">
                <Input {...form.register('address.city')} placeholder="City" />
              </FormField>
            </FormFieldGroup>

            <FormFieldGroup columns={3}>
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
                description="Postal or ZIP code"
              >
                <Input
                  {...form.register('address.postalCode')}
                  placeholder="12345"
                />
              </FormField>

              <FormField
                name="address.country"
                label="Country"
                description="Country"
              >
                <Input
                  {...form.register('address.country')}
                  placeholder="Country"
                />
              </FormField>
            </FormFieldGroup>
          </FormSection>

          {/* Settings */}
          <FormSection
            title="Settings"
            description="Organization settings and licensing"
          >
            <FormFieldGroup columns={2}>
              <FormField
                name="licenseType"
                label="License Type"
                description="Organization license type"
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
                    <SelectItem value="team">Team</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField
                name="maxUsers"
                label="Maximum Users"
                description="Maximum number of users"
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
        </BaseForm>
      </CardContent>
    </Card>
  );
}
