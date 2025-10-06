'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  createAssessmentSchema,
  type AssessmentResponse,
  type CreateAssessmentRequest,
} from '@platform/contracts';
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

export interface AssessmentFormProps {
  onSuccess?: (assessment: AssessmentResponse) => void;
  onError?: (error: Error) => void;
  defaultValues?: Partial<CreateAssessmentRequest>;
  className?: string;
  isLoading?: boolean;
  mode?: 'create' | 'update';
}

/**
 * Assessment form for creating and updating assessments
 * Uses contract schemas for validation and type safety
 */
export function AssessmentForm({
  onSuccess,
  onError,
  defaultValues,
  className,
  isLoading = false,
  mode = 'create',
}: AssessmentFormProps) {
  const form = useForm<CreateAssessmentRequest>({
    resolver: zodResolver(createAssessmentSchema),
    defaultValues: {
      assessmentType: 'apest',
      version: '1.0',
      language: 'en',
      culturalAdaptation: 'universal',
      researchBacked: false,
      scoringMethod: 'likert_5',
      status: 'draft',
      ...defaultValues,
    },
  });

  const onSubmit = async (data: CreateAssessmentRequest) => {
    try {
      const endpoint =
        mode === 'create' ? '/api/assessments' : `/api/assessments/${data.id}`;
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
        throw new Error(errorData.message || 'Failed to save assessment');
      }

      const result = await response.json();
      onSuccess?.(result.data);
    } catch (error) {
      console.error('Assessment save error:', error);
      onError?.(
        error instanceof Error ? error : new Error('Failed to save assessment')
      );
    }
  };

  const getTitle = () => {
    return mode === 'create' ? 'Create Assessment' : 'Update Assessment';
  };

  const getDescription = () => {
    return mode === 'create'
      ? 'Create a new assessment'
      : 'Update your assessment';
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
            mode === 'create' ? 'Create Assessment' : 'Update Assessment'
          }
          isLoading={isLoading}
          className="space-y-6"
        >
          {/* Basic Information */}
          <FormSection
            title="Basic Information"
            description="Essential assessment details"
          >
            <FormField
              name="name"
              label="Assessment Name"
              required
              description="The name of your assessment"
            >
              <Input
                {...form.register('name')}
                placeholder="Enter assessment name"
              />
            </FormField>

            <FormField
              name="slug"
              label="Slug"
              required
              description="URL-friendly identifier"
            >
              <Input {...form.register('slug')} placeholder="assessment-slug" />
            </FormField>

            <FormField
              name="description"
              label="Description"
              description="Brief description of the assessment"
            >
              <Textarea
                {...form.register('description')}
                placeholder="Describe what this assessment measures..."
                rows={4}
              />
            </FormField>

            <FormField
              name="instructions"
              label="Instructions"
              description="Instructions for taking the assessment"
            >
              <Textarea
                {...form.register('instructions')}
                placeholder="Provide clear instructions for participants..."
                rows={6}
              />
            </FormField>
          </FormSection>

          {/* Assessment Configuration */}
          <FormSection
            title="Assessment Configuration"
            description="Configure assessment parameters"
          >
            <FormFieldGroup columns={2}>
              <FormField
                name="assessmentType"
                label="Assessment Type"
                required
                description="Type of assessment"
              >
                <Select
                  onValueChange={value =>
                    form.setValue('assessmentType', value as any)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select assessment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apest">APEST</SelectItem>
                    <SelectItem value="mdna">MDNA</SelectItem>
                    <SelectItem value="cultural_intelligence">
                      Cultural Intelligence
                    </SelectItem>
                    <SelectItem value="leadership_style">
                      Leadership Style
                    </SelectItem>
                    <SelectItem value="spiritual_gifts">
                      Spiritual Gifts
                    </SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField
                name="questionsCount"
                label="Questions Count"
                required
                description="Number of questions"
              >
                <Input
                  type="number"
                  {...form.register('questionsCount', { valueAsNumber: true })}
                  placeholder="10"
                  min="1"
                />
              </FormField>
            </FormFieldGroup>

            <FormFieldGroup columns={2}>
              <FormField
                name="estimatedDuration"
                label="Estimated Duration (minutes)"
                description="How long to complete"
              >
                <Input
                  type="number"
                  {...form.register('estimatedDuration', {
                    valueAsNumber: true,
                  })}
                  placeholder="15"
                  min="1"
                />
              </FormField>

              <FormField
                name="passingScore"
                label="Passing Score"
                description="Minimum score to pass"
              >
                <Input
                  type="number"
                  {...form.register('passingScore', { valueAsNumber: true })}
                  placeholder="70"
                  min="0"
                />
              </FormField>
            </FormFieldGroup>
          </FormSection>

          {/* Validation and Reliability */}
          <FormSection
            title="Validation and Reliability"
            description="Assessment quality metrics"
          >
            <FormFieldGroup columns={2}>
              <FormField
                name="validityScore"
                label="Validity Score"
                description="Assessment validity (0-1)"
              >
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  max="1"
                  {...form.register('validityScore', { valueAsNumber: true })}
                  placeholder="0.85"
                />
              </FormField>

              <FormField
                name="reliabilityScore"
                label="Reliability Score"
                description="Assessment reliability (0-1)"
              >
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  max="1"
                  {...form.register('reliabilityScore', {
                    valueAsNumber: true,
                  })}
                  placeholder="0.90"
                />
              </FormField>
            </FormFieldGroup>
          </FormSection>

          {/* Localization and Adaptation */}
          <FormSection
            title="Localization and Adaptation"
            description="Cultural and language settings"
          >
            <FormFieldGroup columns={3}>
              <FormField
                name="version"
                label="Version"
                description="Assessment version"
              >
                <Input {...form.register('version')} placeholder="1.0" />
              </FormField>

              <FormField
                name="language"
                label="Language"
                description="Primary language"
              >
                <Select
                  onValueChange={value => form.setValue('language', value)}
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

              <FormField
                name="culturalAdaptation"
                label="Cultural Adaptation"
                description="Cultural context"
              >
                <Select
                  onValueChange={value =>
                    form.setValue('culturalAdaptation', value as any)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select culture" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="western">Western</SelectItem>
                    <SelectItem value="eastern">Eastern</SelectItem>
                    <SelectItem value="african">African</SelectItem>
                    <SelectItem value="latin_american">
                      Latin American
                    </SelectItem>
                    <SelectItem value="middle_eastern">
                      Middle Eastern
                    </SelectItem>
                    <SelectItem value="oceanic">Oceanic</SelectItem>
                    <SelectItem value="universal">Universal</SelectItem>
                    <SelectItem value="global">Global</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </FormFieldGroup>

            <FormField
              name="scoringMethod"
              label="Scoring Method"
              description="How responses are scored"
            >
              <Select
                onValueChange={value =>
                  form.setValue('scoringMethod', value as any)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select scoring method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="likert_5">Likert 5-Point</SelectItem>
                  <SelectItem value="likert_7">Likert 7-Point</SelectItem>
                  <SelectItem value="binary">Binary (Yes/No)</SelectItem>
                  <SelectItem value="ranking">Ranking</SelectItem>
                  <SelectItem value="weighted">Weighted</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </FormSection>

          {/* Status */}
          <FormSection
            title="Status"
            description="Assessment status and publication"
          >
            <FormField
              name="status"
              label="Status"
              description="Current status"
            >
              <Select
                onValueChange={value => form.setValue('status', value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField
              name="publishedAt"
              label="Published At"
              description="Publication date"
            >
              <Input type="datetime-local" {...form.register('publishedAt')} />
            </FormField>
          </FormSection>
        </BaseForm>
      </CardContent>
    </Card>
  );
}
