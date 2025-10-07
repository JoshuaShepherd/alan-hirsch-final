import { BaseForm, FormFieldGroup, FormSection } from '@/lib/forms';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/lib/ui/card';
import { Input } from '@/lib/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/ui/select';
import { Switch } from '@/lib/ui/switch';
import { Textarea } from '@/lib/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormField } from '../form-field';
/**
 * Form for creating new user profiles with complete validation
 */
export function CreateUserForm({
  onSuccess,
  onError,
  defaultValues,
  className,
  isLoading = false,
}) {
  const form = useForm({
    resolver: zodResolver(newUserProfileSchema),
    defaultValues: {
      subscriptionTier: 'free',
      accountStatus: 'pending_verification',
      onboardingCompleted: false,
      onboardingStep: 1,
      languagePrimary: 'en',
      brandColors: {
        primary: '#2563eb',
        secondary: '#64748b',
        accent: '#059669',
      },
      emailNotifications: {
        dailyDigest: true,
        collaborationRequests: true,
        revenueReports: true,
        communityUpdates: true,
      },
      privacySettings: {
        publicProfile: true,
        showAssessmentResults: false,
        allowNetworking: true,
        shareAnalytics: false,
      },
      theologicalFocus: [],
      ...defaultValues,
    },
  });
  const onSubmit = async data => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create user');
      }
      const result = await response.json();
      onSuccess?.(result.data);
    } catch (error) {
      console.error('Create user error:', error);
      onError?.(
        error instanceof Error ? error : new Error('Failed to create user')
      );
    }
  };
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Create New User</CardTitle>
        <CardDescription>
          Create a new user profile with ministry context and preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <BaseForm
          form={form}
          onSubmit={onSubmit}
          submitText="Create User"
          isLoading={isLoading}
          className="space-y-6"
        >
          {/* Basic Information */}
          <FormSection
            title="Basic Information"
            description="Essential user details and contact information"
          >
            <FormFieldGroup columns={2}>
              <FormField
                name="firstName"
                label="First Name"
                required
                description="User's first name"
              >
                <Input
                  {...form.register('firstName')}
                  placeholder="Enter first name"
                />
              </FormField>

              <FormField
                name="lastName"
                label="Last Name"
                required
                description="User's last name"
              >
                <Input
                  {...form.register('lastName')}
                  placeholder="Enter last name"
                />
              </FormField>
            </FormFieldGroup>

            <FormField
              name="email"
              label="Email Address"
              required
              description="Primary email address for account"
            >
              <Input
                type="email"
                {...form.register('email')}
                placeholder="user@example.com"
              />
            </FormField>

            <FormField
              name="displayName"
              label="Display Name"
              description="Public display name (optional)"
            >
              <Input
                {...form.register('displayName')}
                placeholder="Display name"
              />
            </FormField>

            <FormField
              name="bio"
              label="Bio"
              description="Brief description about the user"
            >
              <Textarea
                {...form.register('bio')}
                placeholder="Tell us about yourself..."
                rows={3}
              />
            </FormField>
          </FormSection>

          {/* Ministry Context */}
          <FormSection
            title="Ministry Context"
            description="Ministry role and organizational information"
          >
            <FormFieldGroup columns={2}>
              <FormField
                name="ministryRole"
                label="Ministry Role"
                required
                description="Primary ministry role"
              >
                <Select
                  onValueChange={value => form.setValue('ministryRole', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select ministry role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pastor">Pastor</SelectItem>
                    <SelectItem value="elder">Elder</SelectItem>
                    <SelectItem value="deacon">Deacon</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="evangelist">Evangelist</SelectItem>
                    <SelectItem value="apostle">Apostle</SelectItem>
                    <SelectItem value="prophet">Prophet</SelectItem>
                    <SelectItem value="shepherd">Shepherd</SelectItem>
                    <SelectItem value="leader">Leader</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField
                name="denomination"
                label="Denomination"
                description="Religious denomination or tradition"
              >
                <Input
                  {...form.register('denomination')}
                  placeholder="e.g., Baptist, Methodist"
                />
              </FormField>
            </FormFieldGroup>

            <FormField
              name="organizationName"
              label="Organization"
              description="Church or ministry organization name"
            >
              <Input
                {...form.register('organizationName')}
                placeholder="Organization name"
              />
            </FormField>

            <FormField
              name="yearsInMinistry"
              label="Years in Ministry"
              description="Number of years serving in ministry"
            >
              <Input
                type="number"
                {...form.register('yearsInMinistry', { valueAsNumber: true })}
                placeholder="0"
                min="0"
              />
            </FormField>
          </FormSection>

          {/* Geographic & Cultural Context */}
          <FormSection
            title="Location & Culture"
            description="Geographic and cultural context information"
          >
            <FormFieldGroup columns={2}>
              <FormField
                name="countryCode"
                label="Country"
                description="Two-letter country code"
              >
                <Input
                  {...form.register('countryCode')}
                  placeholder="US"
                  maxLength={2}
                />
              </FormField>

              <FormField
                name="timezone"
                label="Timezone"
                description="User's timezone"
              >
                <Input
                  {...form.register('timezone')}
                  placeholder="America/New_York"
                />
              </FormField>
            </FormFieldGroup>

            <FormField
              name="languagePrimary"
              label="Primary Language"
              description="Primary language for the platform"
            >
              <Select
                onValueChange={value => form.setValue('languagePrimary', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="pt">Portuguese</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                  <SelectItem value="ja">Japanese</SelectItem>
                  <SelectItem value="ko">Korean</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </FormSection>

          {/* Platform Configuration */}
          <FormSection
            title="Platform Settings"
            description="Platform-specific configuration and preferences"
          >
            <FormField
              name="subscriptionTier"
              label="Subscription Tier"
              description="Initial subscription level"
            >
              <Select
                onValueChange={value =>
                  form.setValue('subscriptionTier', value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subscription tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="leader">Leader</SelectItem>
                  <SelectItem value="institutional">Institutional</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormFieldGroup columns={2}>
              <FormField
                name="subdomain"
                label="Subdomain"
                description="Custom subdomain for user's platform"
              >
                <Input {...form.register('subdomain')} placeholder="username" />
              </FormField>

              <FormField
                name="platformTitle"
                label="Platform Title"
                description="Custom title for user's platform"
              >
                <Input
                  {...form.register('platformTitle')}
                  placeholder="My Ministry Platform"
                />
              </FormField>
            </FormFieldGroup>
          </FormSection>

          {/* Privacy Settings */}
          <FormSection
            title="Privacy Settings"
            description="Configure user privacy preferences"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Public Profile</label>
                  <p className="text-sm text-gray-600">
                    Allow others to view your profile
                  </p>
                </div>
                <Switch
                  checked={form.watch('privacySettings.publicProfile')}
                  onCheckedChange={checked =>
                    form.setValue('privacySettings.publicProfile', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">
                    Show Assessment Results
                  </label>
                  <p className="text-sm text-gray-600">
                    Display assessment results publicly
                  </p>
                </div>
                <Switch
                  checked={form.watch('privacySettings.showAssessmentResults')}
                  onCheckedChange={checked =>
                    form.setValue(
                      'privacySettings.showAssessmentResults',
                      checked
                    )
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">
                    Allow Networking
                  </label>
                  <p className="text-sm text-gray-600">
                    Allow other users to connect with you
                  </p>
                </div>
                <Switch
                  checked={form.watch('privacySettings.allowNetworking')}
                  onCheckedChange={checked =>
                    form.setValue('privacySettings.allowNetworking', checked)
                  }
                />
              </div>
            </div>
          </FormSection>
        </BaseForm>
      </CardContent>
    </Card>
  );
}
