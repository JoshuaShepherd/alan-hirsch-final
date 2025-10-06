import { zodResolver } from '@hookform/resolvers/zod';
import { BaseForm } from '@platform/shared/forms/base-form';
import { FormFieldGroup, FormSection } from '@platform/shared/forms/form-field';
import { useFormPersistence, useURLSync } from '@platform/shared/forms/hooks';
import { Badge } from '@platform/ui/badge';
import { Button } from '@platform/ui/button';
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
import { Switch } from '@platform/ui/switch';
import { Textarea } from '@platform/ui/textarea';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FileUploadField, ImageUploadField } from '../advanced/file-upload';
import { ConditionalField, FormField } from '../form-field';

// Comprehensive form schema demonstrating various field types
const comprehensiveFormSchema = z.object({
  // Basic fields
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  age: z
    .number()
    .int()
    .min(18, 'Must be at least 18')
    .max(120, 'Must be less than 120'),

  // Conditional fields
  hasOrganization: z.boolean().default(false),
  organizationName: z.string().optional(),
  organizationType: z
    .enum(['church', 'ministry', 'nonprofit', 'other'])
    .optional(),

  // Complex fields
  preferences: z.object({
    newsletter: z.boolean().default(true),
    notifications: z.boolean().default(true),
    theme: z.enum(['light', 'dark', 'auto']).default('auto'),
  }),

  // Arrays
  interests: z.array(z.string()).default([]),
  skills: z.array(z.string()).default([]),

  // File uploads
  avatar: z.string().optional(),
  documents: z.array(z.string()).default([]),

  // Rich text
  bio: z.string().optional(),
  notes: z.string().optional(),
});

type ComprehensiveFormData = z.infer<typeof comprehensiveFormSchema>;

export interface ComprehensiveFormExampleProps {
  onSuccess?: (data: ComprehensiveFormData) => void;
  onError?: (error: Error) => void;
  className?: string;
  persistKey?: string;
  syncWithURL?: boolean;
}

/**
 * Comprehensive form example demonstrating all form features:
 * - Type-safe form handling with Zod validation
 * - Real-time validation and error display
 * - Conditional field logic
 * - File upload with progress tracking
 * - Form persistence
 * - URL synchronization
 * - Complex nested objects
 * - Array fields
 * - Multi-step-like sections
 */
export function ComprehensiveFormExample({
  onSuccess,
  onError,
  className,
  persistKey = 'comprehensive-form',
  syncWithURL = false,
}: ComprehensiveFormExampleProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ComprehensiveFormData>({
    resolver: zodResolver(comprehensiveFormSchema),
    defaultValues: {
      hasOrganization: false,
      preferences: {
        newsletter: true,
        notifications: true,
        theme: 'auto',
      },
      interests: [],
      skills: [],
      documents: [],
    },
  });

  // Form persistence
  useFormPersistence(form, persistKey);

  // URL synchronization
  const { updateURL } = useURLSync(form, '/form-example');

  const onSubmit = async (data: ComprehensiveFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('Form submitted with data:', data);
      onSuccess?.(data);
    } catch (error) {
      console.error('Form submission error:', error);
      onError?.(
        error instanceof Error ? error : new Error('Failed to submit form')
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const addInterest = () => {
    const currentInterests = form.getValues('interests') || [];
    form.setValue('interests', [...currentInterests, '']);
  };

  const removeInterest = (index: number) => {
    const currentInterests = form.getValues('interests') || [];
    form.setValue(
      'interests',
      currentInterests.filter((_, i) => i !== index)
    );
  };

  const updateInterest = (index: number, value: string) => {
    const currentInterests = form.getValues('interests') || [];
    const newInterests = [...currentInterests];
    newInterests[index] = value;
    form.setValue('interests', newInterests);
  };

  const addSkill = () => {
    const currentSkills = form.getValues('skills') || [];
    form.setValue('skills', [...currentSkills, '']);
  };

  const removeSkill = (index: number) => {
    const currentSkills = form.getValues('skills') || [];
    form.setValue(
      'skills',
      currentSkills.filter((_, i) => i !== index)
    );
  };

  const updateSkill = (index: number, value: string) => {
    const currentSkills = form.getValues('skills') || [];
    const newSkills = [...currentSkills];
    newSkills[index] = value;
    form.setValue('skills', newSkills);
  };

  const handleFileUpload = async (files: File[]): Promise<string[]> => {
    // Simulate file upload
    await new Promise(resolve => setTimeout(resolve, 1000));
    return files.map(file => `https://example.com/uploads/${file.name}`);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Comprehensive Form Example</CardTitle>
        <CardDescription>
          This form demonstrates all the advanced features of our form system:
          type safety, validation, conditional fields, file uploads,
          persistence, and more.
        </CardDescription>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">Type-Safe</Badge>
          <Badge variant="outline">Real-time Validation</Badge>
          <Badge variant="outline">File Upload</Badge>
          <Badge variant="outline">Form Persistence</Badge>
          <Badge variant="outline">Conditional Fields</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <BaseForm
          form={form}
          onSubmit={onSubmit}
          submitText="Submit Comprehensive Form"
          isLoading={isSubmitting}
          className="space-y-8"
        >
          {/* Basic Information */}
          <FormSection
            title="Basic Information"
            description="Essential personal details"
          >
            <FormFieldGroup columns={2}>
              <FormField
                name="name"
                label="Full Name"
                required
                description="Your full name"
              >
                <Input
                  {...form.register('name')}
                  placeholder="Enter your name"
                />
              </FormField>

              <FormField
                name="email"
                label="Email Address"
                required
                description="Your email address"
              >
                <Input
                  type="email"
                  {...form.register('email')}
                  placeholder="your@email.com"
                />
              </FormField>
            </FormFieldGroup>

            <FormField
              name="age"
              label="Age"
              required
              description="Your age (must be 18 or older)"
            >
              <Input
                type="number"
                {...form.register('age', { valueAsNumber: true })}
                placeholder="25"
                min="18"
                max="120"
              />
            </FormField>
          </FormSection>

          {/* Organization Information (Conditional) */}
          <FormSection
            title="Organization Information"
            description="Tell us about your organization"
          >
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">
                  Are you part of an organization?
                </label>
                <p className="text-sm text-gray-600">
                  Check if you represent an organization
                </p>
              </div>
              <Switch
                checked={form.watch('hasOrganization')}
                onCheckedChange={checked =>
                  form.setValue('hasOrganization', checked)
                }
              />
            </div>

            <ConditionalField
              name="hasOrganization"
              condition={value => value === true}
            >
              <FormFieldGroup columns={2}>
                <FormField
                  name="organizationName"
                  label="Organization Name"
                  required
                  description="Name of your organization"
                >
                  <Input
                    {...form.register('organizationName')}
                    placeholder="Organization name"
                  />
                </FormField>

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
                      <SelectItem value="ministry">Ministry</SelectItem>
                      <SelectItem value="nonprofit">Nonprofit</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
              </FormFieldGroup>
            </ConditionalField>
          </FormSection>

          {/* Preferences */}
          <FormSection
            title="Preferences"
            description="Configure your preferences"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Newsletter</label>
                  <p className="text-sm text-gray-600">
                    Receive our newsletter
                  </p>
                </div>
                <Switch
                  checked={form.watch('preferences.newsletter')}
                  onCheckedChange={checked =>
                    form.setValue('preferences.newsletter', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Notifications</label>
                  <p className="text-sm text-gray-600">
                    Receive push notifications
                  </p>
                </div>
                <Switch
                  checked={form.watch('preferences.notifications')}
                  onCheckedChange={checked =>
                    form.setValue('preferences.notifications', checked)
                  }
                />
              </div>

              <FormField
                name="preferences.theme"
                label="Theme Preference"
                description="Choose your preferred theme"
              >
                <Select
                  onValueChange={value =>
                    form.setValue('preferences.theme', value as any)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="auto">Auto</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </div>
          </FormSection>

          {/* Dynamic Arrays */}
          <FormSection
            title="Interests & Skills"
            description="Tell us about your interests and skills"
          >
            {/* Interests */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Interests</label>
              <div className="space-y-2">
                {(form.watch('interests') || []).map((interest, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={interest}
                      onChange={e => updateInterest(index, e.target.value)}
                      placeholder="Enter an interest"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeInterest(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addInterest}
                  className="w-full"
                >
                  Add Interest
                </Button>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Skills</label>
              <div className="space-y-2">
                {(form.watch('skills') || []).map((skill, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={skill}
                      onChange={e => updateSkill(index, e.target.value)}
                      placeholder="Enter a skill"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeSkill(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addSkill}
                  className="w-full"
                >
                  Add Skill
                </Button>
              </div>
            </div>
          </FormSection>

          {/* File Uploads */}
          <FormSection
            title="File Uploads"
            description="Upload your avatar and documents"
          >
            <FormFieldGroup columns={2}>
              <div>
                <label className="text-sm font-medium mb-2 block">Avatar</label>
                <ImageUploadField
                  name="avatar"
                  maxSize={5 * 1024 * 1024} // 5MB
                  onUpload={handleFileUpload}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Documents
                </label>
                <FileUploadField
                  name="documents"
                  multiple={true}
                  maxFiles={3}
                  acceptedTypes={[
                    'application/pdf',
                    'application/msword',
                    'text/plain',
                  ]}
                  onUpload={handleFileUpload}
                />
              </div>
            </FormFieldGroup>
          </FormSection>

          {/* Rich Text */}
          <FormSection
            title="Additional Information"
            description="Share more about yourself"
          >
            <FormField
              name="bio"
              label="Bio"
              description="Tell us about yourself"
            >
              <Textarea
                {...form.register('bio')}
                placeholder="Share your story..."
                rows={4}
              />
            </FormField>

            <FormField
              name="notes"
              label="Notes"
              description="Any additional notes or comments"
            >
              <Textarea
                {...form.register('notes')}
                placeholder="Additional notes..."
                rows={3}
              />
            </FormField>
          </FormSection>

          {/* URL Sync Button */}
          {syncWithURL && (
            <div className="pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => updateURL(form.getValues())}
              >
                Sync with URL
              </Button>
            </div>
          )}
        </BaseForm>
      </CardContent>
    </Card>
  );
}
