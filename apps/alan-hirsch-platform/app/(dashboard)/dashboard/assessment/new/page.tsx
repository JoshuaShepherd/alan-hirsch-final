'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@platform/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@platform/ui/card';
import { Input } from '@platform/ui/input';
import { Label } from '@platform/ui/label';
import { Textarea } from '@platform/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@platform/ui/select';
import { Switch } from '@platform/ui/switch';
import { Loader2, Plus, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@platform/ui/alert';
import { useCreateAssessment } from '@/hooks/useAssessment';
import { createAssessmentRequestSchema } from '@platform/shared/contracts';
import type { CreateAssessmentRequest } from '@platform/shared/contracts';

export default function NewAssessmentPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { createAssessment, isLoading, error } = useCreateAssessment();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(createAssessmentRequestSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      assessmentType: 'apest',
      questionsCount: 1,
      estimatedDuration: 15,
      version: '1.0',
      language: 'en',
      culturalAdaptation: 'universal',
      researchBacked: false,
      scoringMethod: 'likert_5',
      status: 'draft',
    },
  });

  // Watch form values for dynamic updates
  const watchedName = watch('name');
  const watchedAssessmentType = watch('assessmentType');
  const watchedCulturalAdaptation = watch('culturalAdaptation');
  const watchedResearchBacked = watch('researchBacked');

  // Auto-generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // Update slug when name changes
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    register('name').onChange(e);
    if (name && !watch('slug')) {
      setValue('slug', generateSlug(name), { shouldValidate: true });
    }
  };

  const onSubmit = async (data: CreateAssessmentRequest) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const result = await createAssessment(data);
      setSubmitSuccess(true);

      // Redirect to assessment page after successful creation
      setTimeout(() => {
        window.location.href = '/dashboard/assessment';
      }, 2000);
    } catch (err) {
      console.error('Failed to create assessment:', err);
      setSubmitError(
        err instanceof Error ? err.message : 'Failed to create assessment'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className='max-w-2xl mx-auto p-6'>
        <Card>
          <CardContent className='pt-6'>
            <div className='text-center space-y-4'>
              <div className='mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center'>
                <Plus className='h-6 w-6 text-green-600' />
              </div>
              <div>
                <h3 className='text-lg font-medium text-gray-900'>
                  Assessment Created Successfully!
                </h3>
                <p className='text-sm text-gray-600 mt-1'>
                  Your assessment has been created and is ready to use.
                </p>
              </div>
              <p className='text-xs text-gray-500'>
                Redirecting to assessments page...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='max-w-2xl mx-auto p-6'>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Plus className='h-5 w-5' />
            Create New Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            {/* Error Display */}
            {(error || submitError) && (
              <Alert variant='destructive'>
                <AlertCircle className='h-4 w-4' />
                <AlertDescription>{error || submitError}</AlertDescription>
              </Alert>
            )}

            {/* Basic Information */}
            <div className='space-y-4'>
              <h3 className='text-lg font-medium'>Basic Information</h3>

              <div className='space-y-2'>
                <Label htmlFor='name'>Assessment Name *</Label>
                <Input
                  id='name'
                  {...register('name')}
                  onChange={handleNameChange}
                  placeholder='e.g., APEST Leadership Assessment'
                />
                {errors.name && (
                  <p className='text-sm text-red-600'>{errors.name.message}</p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='slug'>URL Slug *</Label>
                <Input
                  id='slug'
                  {...register('slug')}
                  placeholder='e.g., apest-leadership-assessment'
                />
                {errors.slug && (
                  <p className='text-sm text-red-600'>{errors.slug.message}</p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='description'>Description</Label>
                <Textarea
                  id='description'
                  {...register('description')}
                  placeholder='Brief description of the assessment...'
                  rows={3}
                />
                {errors.description && (
                  <p className='text-sm text-red-600'>
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>

            {/* Assessment Configuration */}
            <div className='space-y-4'>
              <h3 className='text-lg font-medium'>Assessment Configuration</h3>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='assessmentType'>Assessment Type *</Label>
                  <Select
                    value={watchedAssessmentType}
                    onValueChange={value =>
                      setValue('assessmentType', value as any)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select assessment type' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='apest'>
                        APEST (Apostolic, Prophetic, Evangelistic, Shepherding,
                        Teaching)
                      </SelectItem>
                      <SelectItem value='mdna'>MDNA (Missional DNA)</SelectItem>
                      <SelectItem value='cultural_intelligence'>
                        Cultural Intelligence
                      </SelectItem>
                      <SelectItem value='leadership_style'>
                        Leadership Style
                      </SelectItem>
                      <SelectItem value='spiritual_gifts'>
                        Spiritual Gifts
                      </SelectItem>
                      <SelectItem value='other'>Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.assessmentType && (
                    <p className='text-sm text-red-600'>
                      {errors.assessmentType.message}
                    </p>
                  )}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='questionsCount'>Number of Questions *</Label>
                  <Input
                    id='questionsCount'
                    type='number'
                    min='1'
                    {...register('questionsCount', { valueAsNumber: true })}
                  />
                  {errors.questionsCount && (
                    <p className='text-sm text-red-600'>
                      {errors.questionsCount.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='estimatedDuration'>
                    Estimated Duration (minutes)
                  </Label>
                  <Input
                    id='estimatedDuration'
                    type='number'
                    min='1'
                    {...register('estimatedDuration', { valueAsNumber: true })}
                  />
                  {errors.estimatedDuration && (
                    <p className='text-sm text-red-600'>
                      {errors.estimatedDuration.message}
                    </p>
                  )}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='passingScore'>Passing Score</Label>
                  <Input
                    id='passingScore'
                    type='number'
                    min='0'
                    {...register('passingScore', { valueAsNumber: true })}
                  />
                  {errors.passingScore && (
                    <p className='text-sm text-red-600'>
                      {errors.passingScore.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Localization & Cultural Adaptation */}
            <div className='space-y-4'>
              <h3 className='text-lg font-medium'>
                Localization & Cultural Adaptation
              </h3>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='language'>Language</Label>
                  <Select
                    value={watch('language')}
                    onValueChange={value => setValue('language', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select language' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='en'>English</SelectItem>
                      <SelectItem value='es'>Spanish</SelectItem>
                      <SelectItem value='fr'>French</SelectItem>
                      <SelectItem value='de'>German</SelectItem>
                      <SelectItem value='pt'>Portuguese</SelectItem>
                      <SelectItem value='zh'>Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.language && (
                    <p className='text-sm text-red-600'>
                      {errors.language.message}
                    </p>
                  )}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='culturalAdaptation'>
                    Cultural Adaptation
                  </Label>
                  <Select
                    value={watchedCulturalAdaptation}
                    onValueChange={value =>
                      setValue('culturalAdaptation', value as any)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select cultural context' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='universal'>Universal</SelectItem>
                      <SelectItem value='western'>Western</SelectItem>
                      <SelectItem value='eastern'>Eastern</SelectItem>
                      <SelectItem value='african'>African</SelectItem>
                      <SelectItem value='latin_american'>
                        Latin American
                      </SelectItem>
                      <SelectItem value='middle_eastern'>
                        Middle Eastern
                      </SelectItem>
                      <SelectItem value='oceanic'>Oceanic</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.culturalAdaptation && (
                    <p className='text-sm text-red-600'>
                      {errors.culturalAdaptation.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Research & Validity */}
            <div className='space-y-4'>
              <h3 className='text-lg font-medium'>Research & Validity</h3>

              <div className='flex items-center space-x-2'>
                <Switch
                  id='researchBacked'
                  checked={watchedResearchBacked}
                  onCheckedChange={checked =>
                    setValue('researchBacked', checked)
                  }
                />
                <Label htmlFor='researchBacked'>Research Backed</Label>
              </div>

              {watchedResearchBacked && (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='validityScore'>Validity Score (0-1)</Label>
                    <Input
                      id='validityScore'
                      type='number'
                      min='0'
                      max='1'
                      step='0.01'
                      {...register('validityScore', { valueAsNumber: true })}
                    />
                    {errors.validityScore && (
                      <p className='text-sm text-red-600'>
                        {errors.validityScore.message}
                      </p>
                    )}
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='reliabilityScore'>
                      Reliability Score (0-1)
                    </Label>
                    <Input
                      id='reliabilityScore'
                      type='number'
                      min='0'
                      max='1'
                      step='0.01'
                      {...register('reliabilityScore', { valueAsNumber: true })}
                    />
                    {errors.reliabilityScore && (
                      <p className='text-sm text-red-600'>
                        {errors.reliabilityScore.message}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Additional Configuration */}
            <div className='space-y-4'>
              <h3 className='text-lg font-medium'>Additional Configuration</h3>

              <div className='space-y-2'>
                <Label htmlFor='instructions'>Instructions</Label>
                <Textarea
                  id='instructions'
                  {...register('instructions')}
                  placeholder='Instructions for taking the assessment...'
                  rows={3}
                />
                {errors.instructions && (
                  <p className='text-sm text-red-600'>
                    {errors.instructions.message}
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='scoringMethod'>Scoring Method</Label>
                <Select
                  value={watch('scoringMethod')}
                  onValueChange={value =>
                    setValue('scoringMethod', value as any)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select scoring method' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='likert_5'>
                      Likert Scale (5-point)
                    </SelectItem>
                    <SelectItem value='likert_7'>
                      Likert Scale (7-point)
                    </SelectItem>
                    <SelectItem value='binary'>Binary (Yes/No)</SelectItem>
                    <SelectItem value='ranking'>Ranking</SelectItem>
                    <SelectItem value='weighted'>Weighted Scoring</SelectItem>
                  </SelectContent>
                </Select>
                {errors.scoringMethod && (
                  <p className='text-sm text-red-600'>
                    {errors.scoringMethod.message}
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='status'>Status</Label>
                <Select
                  value={watch('status')}
                  onValueChange={value => setValue('status', value as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='draft'>Draft</SelectItem>
                    <SelectItem value='active'>Active</SelectItem>
                    <SelectItem value='under_review'>Under Review</SelectItem>
                    <SelectItem value='archived'>Archived</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className='text-sm text-red-600'>
                    {errors.status.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className='flex justify-end space-x-4 pt-6'>
              <Button
                type='button'
                variant='outline'
                onClick={() => window.history.back()}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                disabled={!isValid || isSubmitting || isLoading}
              >
                {isSubmitting || isLoading ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Creating Assessment...
                  </>
                ) : (
                  'Create Assessment'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
