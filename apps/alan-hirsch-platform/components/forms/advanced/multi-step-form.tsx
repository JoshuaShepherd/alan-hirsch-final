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
import { Progress } from '@platform/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@platform/ui/select';
import { Textarea } from '@platform/ui/textarea';
import { useMultiStepForm } from '@/lib/forms/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormFieldGroup, FormSection } from '../base-form';
import { FormField } from '../form-field';

// Example multi-step form schema for user onboarding
const onboardingStep1Schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  displayName: z.string().optional(),
});

const onboardingStep2Schema = z.object({
  ministryRole: z.enum([
    'pastor',
    'elder',
    'deacon',
    'teacher',
    'evangelist',
    'apostle',
    'prophet',
    'shepherd',
    'leader',
    'member',
    'other',
  ]),
  denomination: z.string().optional(),
  organizationName: z.string().optional(),
  yearsInMinistry: z.number().int().min(0).optional(),
});

const onboardingStep3Schema = z.object({
  countryCode: z.string().length(2).optional(),
  timezone: z.string().optional(),
  languagePrimary: z.string().default('en'),
});

const onboardingStep4Schema = z.object({
  bio: z.string().optional(),
  theologicalFocus: z.array(z.string()).default([]),
  interests: z.array(z.string()).default([]),
});

const onboardingSchema = onboardingStep1Schema
  .merge(onboardingStep2Schema)
  .merge(onboardingStep3Schema)
  .merge(onboardingStep4Schema);

type OnboardingData = z.infer<typeof onboardingSchema>;

export interface MultiStepFormProps {
  onComplete?: (data: OnboardingData) => void;
  onError?: (error: Error) => void;
  className?: string;
  isLoading?: boolean;
}

/**
 * Example multi-step form for user onboarding
 */
export function MultiStepOnboardingForm({
  onComplete,
  onError,
  className,
  isLoading = false,
}: MultiStepFormProps) {
  const steps = [
    {
      id: 'personal',
      title: 'Personal Info',
      description: 'Basic information about you',
    },
    {
      id: 'ministry',
      title: 'Ministry Context',
      description: 'Your ministry background',
    },
    {
      id: 'location',
      title: 'Location & Culture',
      description: 'Where you serve',
    },
    {
      id: 'preferences',
      title: 'Preferences',
      description: 'Your interests and focus',
    },
  ];

  const form = useForm<OnboardingData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      languagePrimary: 'en',
      theologicalFocus: [],
      interests: [],
    },
  });

  const { state, nextStep, prevStep, validateCurrentStep } = useMultiStepForm(
    steps,
    form
  );

  const onSubmit = async (data: OnboardingData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onComplete?.(data);
    } catch (error) {
      console.error('Onboarding error:', error);
      onError?.(
        error instanceof Error
          ? error
          : new Error('Failed to complete onboarding')
      );
    }
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      nextStep();
    }
  };

  const handlePrevious = () => {
    prevStep();
  };

  const getStepContent = () => {
    switch (state.currentStep) {
      case 0:
        return (
          <FormSection
            title="Personal Information"
            description="Tell us about yourself"
          >
            <FormFieldGroup columns={2}>
              <FormField
                name="firstName"
                label="First Name"
                required
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
                required
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
              required
              description="Your primary email address"
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
              description="How you'd like to be known publicly (optional)"
            >
              <Input
                {...form.register('displayName')}
                placeholder="Display name"
              />
            </FormField>
          </FormSection>
        );

      case 1:
        return (
          <FormSection
            title="Ministry Context"
            description="Your ministry background"
          >
            <FormField
              name="ministryRole"
              label="Ministry Role"
              required
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
              description="Your religious tradition"
            >
              <Input
                {...form.register('denomination')}
                placeholder="e.g., Baptist, Methodist"
              />
            </FormField>

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
        );

      case 2:
        return (
          <FormSection title="Location & Culture" description="Where you serve">
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
        );

      case 3:
        return (
          <FormSection
            title="Preferences"
            description="Your interests and focus"
          >
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

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">
                  Theological Focus Areas
                </label>
                <p className="text-sm text-gray-600">
                  Select areas of theological interest
                </p>
                <div className="mt-2 space-y-2">
                  {[
                    'Systematic Theology',
                    'Biblical Studies',
                    'Practical Theology',
                    'Historical Theology',
                    'Philosophical Theology',
                    'Missional Theology',
                    'Pastoral Theology',
                  ].map(focus => (
                    <label key={focus} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={focus}
                        onChange={e => {
                          const currentFocus =
                            form.getValues('theologicalFocus') || [];
                          if (e.target.checked) {
                            form.setValue('theologicalFocus', [
                              ...currentFocus,
                              focus,
                            ]);
                          } else {
                            form.setValue(
                              'theologicalFocus',
                              currentFocus.filter(f => f !== focus)
                            );
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">{focus}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Interests</label>
                <p className="text-sm text-gray-600">
                  What are you interested in learning about?
                </p>
                <div className="mt-2 space-y-2">
                  {[
                    'Leadership Development',
                    'Church Planting',
                    'Discipleship',
                    'Evangelism',
                    'Social Justice',
                    'Worship',
                    'Youth Ministry',
                    'Community Development',
                  ].map(interest => (
                    <label
                      key={interest}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        value={interest}
                        onChange={e => {
                          const currentInterests =
                            form.getValues('interests') || [];
                          if (e.target.checked) {
                            form.setValue('interests', [
                              ...currentInterests,
                              interest,
                            ]);
                          } else {
                            form.setValue(
                              'interests',
                              currentInterests.filter(i => i !== interest)
                            );
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </FormSection>
        );

      default:
        return null;
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Complete Your Profile</CardTitle>
        <CardDescription>
          Let's get to know you better. This will help us personalize your
          experience.
        </CardDescription>
        <Progress
          value={((state.currentStep + 1) / steps.length) * 100}
          className="w-full"
        />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Step Navigation */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center space-x-2">
                  <div
                    className={`
                    flex items-center justify-center w-8 h-8 rounded-full border-2
                    ${
                      index === state.currentStep
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : index < state.currentStep
                          ? 'border-green-500 bg-green-500 text-white'
                          : 'border-gray-300 bg-white text-gray-500'
                    }
                  `}
                  >
                    {index < state.currentStep ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-sm font-medium">{step.title}</div>
                    <div className="text-xs text-gray-500">
                      {step.description}
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden sm:block w-8 h-0.5 bg-gray-300 mx-4" />
                )}
              </div>
            ))}
          </div>

          {/* Current Step Content */}
          <div className="min-h-[400px]">{getStepContent()}</div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={state.isFirstStep}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex items-center space-x-2">
              <Badge variant="outline">
                Step {state.currentStep + 1} of {steps.length}
              </Badge>
            </div>

            {state.isLastStep ? (
              <Button
                type="button"
                onClick={form.handleSubmit(onSubmit)}
                disabled={isLoading}
              >
                Complete Setup
              </Button>
            ) : (
              <Button type="button" onClick={handleNext}>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
