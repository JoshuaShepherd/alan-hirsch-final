import {
  userProfileFormSchema,
  type UserProfileForm,
  type UserProfileResponse,
} from '@/lib/contracts';
import { BaseForm, FormFieldGroup, FormSection } from '@/lib/forms';
import { Button } from '@/lib/ui/button';
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
import { Plus, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { FormField } from '../form-field';

export interface UserProfileFormProps {
  onSuccess?: (user: UserProfileResponse) => void;
  onError?: (error: Error) => void;
  defaultValues?: Partial<UserProfileForm>;
  className?: string;
  isLoading?: boolean;
  mode?: 'create' | 'update' | 'profile';
}

/**
 * Comprehensive user profile form for creating, updating, or managing user profiles
 * Supports different modes for different use cases
 */
export function UserProfileForm({
  onSuccess,
  onError,
  defaultValues,
  className,
  isLoading = false,
  mode = 'profile',
}: UserProfileFormProps) {
  const form = useForm<UserProfileForm>({
    resolver: zodResolver(
      mode === 'update' || mode === 'profile'
        ? userProfileFormSchema.partial()
        : userProfileFormSchema
    ),
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

  const onSubmit = async (data: UserProfileForm) => {
    try {
      const endpoint = mode === 'create' ? '/api/users' : '/api/user/profile';
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
        throw new Error(errorData.message || 'Failed to save profile');
      }

      const result = await response.json();
      onSuccess?.(result.data);
    } catch (error) {
      console.error('Profile save error:', error);
      onError?.(
        error instanceof Error ? error : new Error('Failed to save profile')
      );
    }
  };

  const addTheologicalFocus = () => {
    const currentFocus = form.getValues('theologicalFocus') || [];
    form.setValue('theologicalFocus', [...currentFocus, '']);
  };

  const removeTheologicalFocus = (index: number) => {
    const currentFocus = form.getValues('theologicalFocus') || [];
    form.setValue(
      'theologicalFocus',
      currentFocus.filter((_: string, i: number) => i !== index)
    );
  };

  const updateTheologicalFocus = (index: number, value: string) => {
    const currentFocus = form.getValues('theologicalFocus') || [];
    const newFocus = [...currentFocus];
    newFocus[index] = value;
    form.setValue('theologicalFocus', newFocus);
  };

  const getTitle = () => {
    switch (mode) {
      case 'create':
        return 'Create Profile';
      case 'update':
        return 'Update Profile';
      default:
        return 'Profile Settings';
    }
  };

  const getDescription = () => {
    switch (mode) {
      case 'create':
        return 'Set up your ministry profile and preferences';
      case 'update':
        return 'Update your profile information';
      default:
        return 'Manage your profile settings and preferences';
    }
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
          submitText={mode === 'create' ? 'Create Profile' : 'Save Changes'}
          isLoading={isLoading}
          className="space-y-6"
        >
          {/* Basic Information */}
          <FormSection
            title="Basic Information"
            description="Essential profile details"
          >
            <FormFieldGroup columns={2}>
              <FormField
                name="firstName"
                label="First Name"
                required={mode === 'create'}
                description="Your first name"
              >
                <Input
                  {...form.register('firstName')}
                  placeholder="Enter first name"
                />
              </FormField>

              <FormField
                name="lastName"
                label="Last Name"
                required={mode === 'create'}
                description="Your last name"
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
              required={mode === 'create'}
              description="Primary email address"
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
              description="Tell others about yourself and your ministry"
            >
              <Textarea
                {...form.register('bio')}
                placeholder="Share your story, ministry focus, and what you're passionate about..."
                rows={4}
              />
            </FormField>
          </FormSection>

          {/* Ministry Context */}
          <FormSection
            title="Ministry Context"
            description="Your ministry role and background"
          >
            <FormFieldGroup columns={2}>
              <FormField
                name="ministryRole"
                label="Ministry Role"
                required={mode === 'create'}
                description="Your primary ministry role"
              >
                <Select
                  onValueChange={value =>
                    form.setValue('ministryRole', value as any)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="senior_pastor">Senior Pastor</SelectItem>
                    <SelectItem value="associate_pastor">
                      Associate Pastor
                    </SelectItem>
                    <SelectItem value="church_planter">
                      Church Planter
                    </SelectItem>
                    <SelectItem value="denominational_leader">
                      Denominational Leader
                    </SelectItem>
                    <SelectItem value="seminary_professor">
                      Seminary Professor
                    </SelectItem>
                    <SelectItem value="seminary_student">
                      Seminary Student
                    </SelectItem>
                    <SelectItem value="ministry_staff">
                      Ministry Staff
                    </SelectItem>
                    <SelectItem value="missionary">Missionary</SelectItem>
                    <SelectItem value="marketplace_minister">
                      Marketplace Minister
                    </SelectItem>
                    <SelectItem value="nonprofit_leader">
                      Nonprofit Leader
                    </SelectItem>
                    <SelectItem value="consultant">Consultant</SelectItem>
                    <SelectItem value="academic_researcher">
                      Academic Researcher
                    </SelectItem>
                    <SelectItem value="emerging_leader">
                      Emerging Leader
                    </SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField
                name="denomination"
                label="Denomination"
                description="Your religious tradition"
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
              description="Your church or ministry organization"
            >
              <Input
                {...form.register('organizationName')}
                placeholder="Organization name"
              />
            </FormField>

            <FormField
              name="yearsInMinistry"
              label="Years in Ministry"
              description="How long have you been serving in ministry?"
            >
              <Input
                type="number"
                {...form.register('yearsInMinistry', { valueAsNumber: true })}
                placeholder="0"
                min="0"
              />
            </FormField>
          </FormSection>

          {/* Theological Focus */}
          <FormSection
            title="Theological Focus"
            description="Areas of theological interest and expertise"
          >
            <div className="space-y-3">
              {(form.watch('theologicalFocus') || []).map(
                (focus: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={focus}
                      onChange={e =>
                        updateTheologicalFocus(index, e.target.value)
                      }
                      placeholder="e.g., Systematic Theology, Biblical Studies"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeTheologicalFocus(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )
              )}
              <Button
                type="button"
                variant="outline"
                onClick={addTheologicalFocus}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Theological Focus
              </Button>
            </div>
          </FormSection>

          {/* Location & Culture */}
          <FormSection
            title="Location & Culture"
            description="Your geographic and cultural context"
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
                description="Your timezone"
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
              description="Your preferred language"
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

          {/* Platform Settings */}
          <FormSection
            title="Platform Settings"
            description="Customize your platform experience"
          >
            <FormFieldGroup columns={2}>
              <FormField
                name="subdomain"
                label="Subdomain"
                description="Your custom subdomain"
              >
                <Input {...form.register('subdomain')} placeholder="username" />
              </FormField>

              <FormField
                name="platformTitle"
                label="Platform Title"
                description="Title for your platform"
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
            description="Control your privacy and visibility"
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
                    Display your assessment results publicly
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
                    Let other users connect with you
                  </p>
                </div>
                <Switch
                  checked={form.watch('privacySettings.allowNetworking')}
                  onCheckedChange={checked =>
                    form.setValue('privacySettings.allowNetworking', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Share Analytics</label>
                  <p className="text-sm text-gray-600">
                    Share usage analytics for platform improvement
                  </p>
                </div>
                <Switch
                  checked={form.watch('privacySettings.shareAnalytics')}
                  onCheckedChange={checked =>
                    form.setValue('privacySettings.shareAnalytics', checked)
                  }
                />
              </div>
            </div>
          </FormSection>

          {/* Email Notifications */}
          <FormSection
            title="Email Notifications"
            description="Choose what email updates you'd like to receive"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Daily Digest</label>
                  <p className="text-sm text-gray-600">
                    Daily summary of platform activity
                  </p>
                </div>
                <Switch
                  checked={form.watch('emailNotifications.dailyDigest')}
                  onCheckedChange={checked =>
                    form.setValue('emailNotifications.dailyDigest', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">
                    Collaboration Requests
                  </label>
                  <p className="text-sm text-gray-600">
                    Notifications for collaboration opportunities
                  </p>
                </div>
                <Switch
                  checked={form.watch(
                    'emailNotifications.collaborationRequests'
                  )}
                  onCheckedChange={checked =>
                    form.setValue(
                      'emailNotifications.collaborationRequests',
                      checked
                    )
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Revenue Reports</label>
                  <p className="text-sm text-gray-600">
                    Monthly revenue and analytics reports
                  </p>
                </div>
                <Switch
                  checked={form.watch('emailNotifications.revenueReports')}
                  onCheckedChange={checked =>
                    form.setValue('emailNotifications.revenueReports', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">
                    Community Updates
                  </label>
                  <p className="text-sm text-gray-600">
                    Updates from communities you're part of
                  </p>
                </div>
                <Switch
                  checked={form.watch('emailNotifications.communityUpdates')}
                  onCheckedChange={checked =>
                    form.setValue(
                      'emailNotifications.communityUpdates',
                      checked
                    )
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
