import { Avatar, AvatarFallback, AvatarImage } from '@platform/ui/avatar';
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
import {
  NewUserProfile,
  UserProfile,
  newUserProfileSchema,
} from '@/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, X } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { BaseForm, FormFieldGroup, FormSection } from '../base-form';
import { FormField } from '../form-field';

export interface UpdateUserFormProps {
  user: UserProfile;
  onSuccess?: (user: UserProfile) => void;
  onError?: (error: Error) => void;
  className?: string;
  isLoading?: boolean;
}

/**
 * Form for updating existing user profiles with partial validation
 */
export function UpdateUserForm({
  user,
  onSuccess,
  onError,
  className,
  isLoading = false,
}: UpdateUserFormProps) {
  const form = useForm<NewUserProfile>({
    resolver: zodResolver(newUserProfileSchema.partial()),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      displayName: user.displayName,
      bio: user.bio,
      avatarUrl: user.avatarUrl,
      ministryRole: user.ministryRole,
      denomination: user.denomination,
      organizationName: user.organizationName,
      yearsInMinistry: user.yearsInMinistry,
      countryCode: user.countryCode,
      timezone: user.timezone,
      languagePrimary: user.languagePrimary,
      culturalContext: user.culturalContext,
      leaderTier: user.leaderTier,
      subdomain: user.subdomain,
      customDomain: user.customDomain,
      platformTitle: user.platformTitle,
      subscriptionTier: user.subscriptionTier,
      theologicalFocus: user.theologicalFocus,
      brandColors: user.brandColors,
      emailNotifications: user.emailNotifications,
      privacySettings: user.privacySettings,
      onboardingCompleted: user.onboardingCompleted,
      onboardingStep: user.onboardingStep,
      accountStatus: user.accountStatus,
    },
  });

  // Update form when user prop changes
  useEffect(() => {
    form.reset({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      displayName: user.displayName,
      bio: user.bio,
      avatarUrl: user.avatarUrl,
      ministryRole: user.ministryRole,
      denomination: user.denomination,
      organizationName: user.organizationName,
      yearsInMinistry: user.yearsInMinistry,
      countryCode: user.countryCode,
      timezone: user.timezone,
      languagePrimary: user.languagePrimary,
      culturalContext: user.culturalContext,
      leaderTier: user.leaderTier,
      subdomain: user.subdomain,
      customDomain: user.customDomain,
      platformTitle: user.platformTitle,
      subscriptionTier: user.subscriptionTier,
      theologicalFocus: user.theologicalFocus,
      brandColors: user.brandColors,
      emailNotifications: user.emailNotifications,
      privacySettings: user.privacySettings,
      onboardingCompleted: user.onboardingCompleted,
      onboardingStep: user.onboardingStep,
      accountStatus: user.accountStatus,
    });
  }, [user, form]);

  const onSubmit = async (data: NewUserProfile) => {
    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update user');
      }

      const result = await response.json();
      onSuccess?.(result.data);
    } catch (error) {
      console.error('Update user error:', error);
      onError?.(
        error instanceof Error ? error : new Error('Failed to update user')
      );
    }
  };

  const handleAvatarUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload avatar');
      }

      const result = await response.json();
      form.setValue('avatarUrl', result.url);
    } catch (error) {
      console.error('Avatar upload error:', error);
      onError?.(
        error instanceof Error ? error : new Error('Failed to upload avatar')
      );
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Update Profile</CardTitle>
        <CardDescription>
          Update your profile information and preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <BaseForm
          form={form}
          onSubmit={onSubmit}
          submitText="Update Profile"
          isLoading={isLoading}
          className="space-y-6"
        >
          {/* Avatar Section */}
          <FormSection
            title="Profile Picture"
            description="Upload and manage your profile picture"
          >
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={form.watch('avatarUrl')} alt="Profile" />
                <AvatarFallback>
                  {user.firstName?.[0]}
                  {user.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) handleAvatarUpload(file);
                  }}
                  className="hidden"
                  id="avatar-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    document.getElementById('avatar-upload')?.click()
                  }
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Photo
                </Button>
                {form.watch('avatarUrl') && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => form.setValue('avatarUrl', undefined)}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                )}
              </div>
            </div>
          </FormSection>

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
              description="Brief description about yourself"
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
                  onValueChange={value =>
                    form.setValue('ministryRole', value as any)
                  }
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

          {/* Platform Configuration */}
          <FormSection
            title="Platform Settings"
            description="Platform-specific configuration and preferences"
          >
            <FormField
              name="subscriptionTier"
              label="Subscription Tier"
              description="Current subscription level"
            >
              <Select
                onValueChange={value =>
                  form.setValue('subscriptionTier', value as any)
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
                description="Custom subdomain for your platform"
              >
                <Input {...form.register('subdomain')} placeholder="username" />
              </FormField>

              <FormField
                name="platformTitle"
                label="Platform Title"
                description="Custom title for your platform"
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
            description="Configure your privacy preferences"
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
