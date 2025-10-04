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
import { NewAssessment, newAssessmentSchema } from '@/validations/assessments';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { BaseForm, FormFieldGroup, FormSection } from '../base-form';
import { FormField } from '../form-field';

export interface AssessmentFormProps {
  onSuccess?: (assessment: NewAssessment) => void;
  onError?: (error: Error) => void;
  defaultValues?: Partial<NewAssessment>;
  className?: string;
  isLoading?: boolean;
  mode?: 'create' | 'update';
}

/**
 * Form for creating and updating assessments with complete validation
 */
export function AssessmentForm({
  onSuccess,
  onError,
  defaultValues,
  className,
  isLoading = false,
  mode = 'create',
}: AssessmentFormProps) {
  const form = useForm<NewAssessment>({
    resolver: zodResolver(
      mode === 'update' ? newAssessmentSchema.partial() : newAssessmentSchema
    ),
    defaultValues: {
      version: '1.0',
      language: 'en',
      culturalAdaptation: 'universal',
      researchBacked: false,
      scoringMethod: 'likert_5',
      status: 'draft',
      ...defaultValues,
    },
  });

  const onSubmit = async (data: NewAssessment) => {
    try {
      const endpoint =
        mode === 'create'
          ? '/api/assessments'
          : `/api/assessments/${defaultValues?.id}`;
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

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>
          {mode === 'create' ? 'Create Assessment' : 'Update Assessment'}
        </CardTitle>
        <CardDescription>
          {mode === 'create'
            ? 'Create a new assessment with questions and scoring'
            : 'Update assessment details and configuration'}
        </CardDescription>
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
              description="The name of the assessment"
            >
              <Input
                {...form.register('name')}
                placeholder="e.g., APEST Leadership Assessment"
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
                placeholder="apest-leadership-assessment"
              />
            </FormField>

            <FormField
              name="description"
              label="Description"
              description="Brief description of what this assessment measures"
            >
              <Textarea
                {...form.register('description')}
                placeholder="This assessment helps identify your primary ministry gifts..."
                rows={3}
              />
            </FormField>
          </FormSection>

          {/* Assessment Configuration */}
          <FormSection
            title="Assessment Configuration"
            description="Configure how the assessment works"
          >
            <FormFieldGroup columns={2}>
              <FormField
                name="assessmentType"
                label="Assessment Type"
                required
                description="The type of assessment"
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
                    <SelectItem value="likert_5">
                      Likert 5-Point Scale
                    </SelectItem>
                    <SelectItem value="likert_7">
                      Likert 7-Point Scale
                    </SelectItem>
                    <SelectItem value="binary">Binary (Yes/No)</SelectItem>
                    <SelectItem value="ranking">Ranking</SelectItem>
                    <SelectItem value="weighted">Weighted Scoring</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </FormFieldGroup>

            <FormFieldGroup columns={2}>
              <FormField
                name="questionsCount"
                label="Number of Questions"
                required
                description="Total number of questions in the assessment"
              >
                <Input
                  type="number"
                  {...form.register('questionsCount', { valueAsNumber: true })}
                  placeholder="25"
                  min="1"
                />
              </FormField>

              <FormField
                name="estimatedDuration"
                label="Estimated Duration (minutes)"
                description="How long the assessment typically takes"
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
            </FormFieldGroup>

            <FormField
              name="passingScore"
              label="Passing Score"
              description="Minimum score to pass (optional)"
            >
              <Input
                type="number"
                {...form.register('passingScore', { valueAsNumber: true })}
                placeholder="70"
                min="0"
              />
            </FormField>
          </FormSection>

          {/* Versioning & Localization */}
          <FormSection
            title="Versioning & Localization"
            description="Version control and language settings"
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
                description="Cultural context for the assessment"
              >
                <Select
                  onValueChange={value =>
                    form.setValue('culturalAdaptation', value as any)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select cultural context" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="universal">Universal</SelectItem>
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
                    <SelectItem value="global">Global</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </FormFieldGroup>
          </FormSection>

          {/* Research & Validity */}
          <FormSection
            title="Research & Validity"
            description="Research backing and validity metrics"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Research Backed</label>
                  <p className="text-sm text-gray-600">
                    Is this assessment backed by research?
                  </p>
                </div>
                <Switch
                  checked={form.watch('researchBacked')}
                  onCheckedChange={checked =>
                    form.setValue('researchBacked', checked)
                  }
                />
              </div>
            </div>

            <FormFieldGroup columns={2}>
              <FormField
                name="validityScore"
                label="Validity Score"
                description="Validity score (0-1 scale)"
              >
                <Input
                  type="number"
                  step="0.01"
                  {...form.register('validityScore', { valueAsNumber: true })}
                  placeholder="0.85"
                  min="0"
                  max="1"
                />
              </FormField>

              <FormField
                name="reliabilityScore"
                label="Reliability Score"
                description="Reliability score (0-1 scale)"
              >
                <Input
                  type="number"
                  step="0.01"
                  {...form.register('reliabilityScore', {
                    valueAsNumber: true,
                  })}
                  placeholder="0.90"
                  min="0"
                  max="1"
                />
              </FormField>
            </FormFieldGroup>
          </FormSection>

          {/* Instructions */}
          <FormSection
            title="Instructions"
            description="Instructions for taking the assessment"
          >
            <FormField
              name="instructions"
              label="Assessment Instructions"
              description="Clear instructions for users taking the assessment"
            >
              <Textarea
                {...form.register('instructions')}
                placeholder="Please read each statement carefully and select the response that best describes you..."
                rows={4}
              />
            </FormField>
          </FormSection>

          {/* Status */}
          <FormSection
            title="Status"
            description="Assessment status and visibility"
          >
            <FormField
              name="status"
              label="Status"
              description="Current status of the assessment"
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
          </FormSection>
        </BaseForm>
      </CardContent>
    </Card>
  );
}
