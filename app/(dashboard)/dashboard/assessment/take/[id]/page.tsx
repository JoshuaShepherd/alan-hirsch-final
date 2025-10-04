'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import {
  useAssessment,
  useCompleteAssessment,
  useSaveAssessmentResponses,
  useUserAssessment,
} from '@/hooks/useAssessment';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Clock,
  Loader2,
  Save,
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface QuestionResponse {
  questionId: string;
  responseValue?: number;
  responseText?: string;
  responseTime?: number;
  confidence?: number;
  skipped?: boolean;
}

export default function TakeAssessmentPage() {
  const params = useParams();
  const router = useRouter();
  const assessmentId = params['id'] as string;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Map<string, QuestionResponse>>(
    new Map()
  );
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [questionStartTime, setQuestionStartTime] = useState<Date | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmComplete, setShowConfirmComplete] = useState(false);

  // Fetch assessment data
  const {
    data: assessmentResponse,
    isLoading: assessmentLoading,
    error: assessmentError,
  } = useAssessment(assessmentId);
  const { data: userAssessmentResponse, isLoading: userAssessmentLoading } =
    useUserAssessment(assessmentId);
  const { saveResponses, isLoading: savingResponses } =
    useSaveAssessmentResponses();
  const { completeAssessment, isLoading: completingAssessment } =
    useCompleteAssessment();

  const assessment = assessmentResponse;
  const userAssessment = userAssessmentResponse;
  const questions = assessment?.questions || [];

  // Initialize start time when assessment loads
  useEffect(() => {
    if (assessment && !startTime) {
      setStartTime(new Date());
      setQuestionStartTime(new Date());
    }
  }, [assessment, startTime]);

  // Load existing responses - responses are stored separately via useAssessmentResponses hook
  // This effect is kept for potential future use when responses are included in userAssessment
  useEffect(() => {
    // Responses are loaded separately via the useAssessmentResponses hook
    // This effect can be used for other initialization logic
  }, [userAssessment]);

  const currentQuestion = questions[currentQuestionIndex];
  const progress =
    questions.length > 0
      ? ((currentQuestionIndex + 1) / questions.length) * 100
      : 0;
  const currentResponse = responses.get(currentQuestion?.id || '');

  const handleResponseChange = useCallback(
    (questionId: string, response: Partial<QuestionResponse>) => {
      setResponses(prev => {
        const newResponses = new Map(prev);
        const existing = newResponses.get(questionId) || { questionId };
        newResponses.set(questionId, { ...existing, ...response });
        return newResponses;
      });
    },
    []
  );

  const handleQuestionNavigation = useCallback(
    (direction: 'prev' | 'next') => {
      if (direction === 'prev' && currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        setQuestionStartTime(new Date());
      } else if (
        direction === 'next' &&
        currentQuestionIndex < questions.length - 1
      ) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setQuestionStartTime(new Date());
      }
    },
    [currentQuestionIndex, questions.length]
  );

  const handleSaveProgress = useCallback(async () => {
    if (!userAssessment?.id || responses.size === 0) return;

    try {
      const responsesArray = Array.from(responses.values());
      await saveResponses({
        userAssessmentId: userAssessment.id,
        responses: responsesArray,
      });
      toast.success('Progress saved successfully');
    } catch (error) {
      console.error('Failed to save progress:', error);
      toast.error('Failed to save progress');
    }
  }, [userAssessment?.id, responses, saveResponses]);

  const handleCompleteAssessment = useCallback(async () => {
    if (!userAssessment?.id || !assessment) return;

    setIsSubmitting(true);
    try {
      // Calculate scores (simplified - in real implementation, this would be more sophisticated)
      const totalScore = Array.from(responses.values()).reduce(
        (sum, response) =>
          sum +
          (typeof response.responseValue === 'number'
            ? response.responseValue
            : 0),
        0
      );

      const maxPossibleScore = questions.length * 5; // Assuming 5-point Likert scale

      // Calculate APEST scores (simplified)
      const apestScores: Record<string, number> = {
        apostolic: 0,
        prophetic: 0,
        evangelistic: 0,
        shepherding: 0,
        teaching: 0,
      };

      questions.forEach((question: any) => {
        const response = responses.get(question.id);
        if (
          response?.responseValue &&
          question.apestDimension &&
          typeof response.responseValue === 'number' &&
          typeof question.apestDimension === 'string'
        ) {
          const dimension = question.apestDimension as keyof typeof apestScores;
          if (
            dimension in apestScores &&
            apestScores[dimension] !== undefined
          ) {
            apestScores[dimension] += response.responseValue ?? 0;
          }
        }
      });

      // Find primary and secondary gifts
      const sortedScores = Object.entries(apestScores).sort(([, a], [, b]) =>
        typeof b === 'number' && typeof a === 'number' ? b - a : 0
      );
      const primaryGift = sortedScores[0]?.[0];
      const secondaryGift = sortedScores[1]?.[0];

      const completionTime = startTime
        ? Math.round((Date.now() - startTime.getTime()) / 60000)
        : 0;

      await completeAssessment({
        userAssessmentId: userAssessment?.id ?? '',
        totalScore,
        maxPossibleScore,
        rawScores: apestScores,
        normalizedScores: apestScores, // In real implementation, these would be normalized
        primaryGift,
        secondaryGift,
        completionTime,
        responseConsistency: '0.85', // Placeholder
        aiInsights: 'Assessment completed successfully',
        personalizedRecommendations: {
          strengths: [primaryGift || 'leadership'],
          growthAreas: [secondaryGift || 'development'],
          actionItems: [
            'Continue developing your primary gifts',
            'Explore growth opportunities',
          ],
          contentRecommendations: [
            'Read related content',
            'Join discussion groups',
          ],
        },
      });

      toast.success('Assessment completed successfully!');
      router.push(`/dashboard/assessment/results/${userAssessment.id}`);
    } catch (error) {
      console.error('Failed to complete assessment:', error);
      toast.error('Failed to complete assessment');
    } finally {
      setIsSubmitting(false);
    }
  }, [
    userAssessment?.id,
    assessment,
    responses,
    questions,
    startTime,
    completeAssessment,
    router,
  ]);

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    const questionResponse = responses.get(currentQuestion.id);

    return (
      <Card className='mb-6'>
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            <span>
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            {currentQuestion.apestDimension && (
              <span className='text-sm font-normal text-gray-500 capitalize'>
                {currentQuestion.apestDimension} Dimension
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-medium mb-4'>
                {currentQuestion.questionText}
              </h3>

              {currentQuestion.questionType === 'likert' && (
                <RadioGroup
                  value={questionResponse?.responseValue?.toString() || ''}
                  onValueChange={value =>
                    handleResponseChange(currentQuestion.id, {
                      responseValue: parseInt(value),
                      responseTime: questionStartTime
                        ? Math.round(
                            (Date.now() - questionStartTime.getTime()) / 1000
                          )
                        : 0,
                    })
                  }
                  className='space-y-3'
                >
                  {currentQuestion.answerOptions?.map((option: any) => (
                    <div
                      key={option.value}
                      className='flex items-center space-x-2'
                    >
                      <RadioGroupItem
                        value={option.value.toString()}
                        id={`option-${option.value}`}
                      />
                      <Label
                        htmlFor={`option-${option.value}`}
                        className='flex-1 cursor-pointer'
                      >
                        <div className='flex items-center justify-between'>
                          <span>{option.label}</span>
                          <span className='text-sm text-gray-500'>
                            {option.value}
                          </span>
                        </div>
                        {option.description && (
                          <p className='text-sm text-gray-600 mt-1'>
                            {option.description}
                          </p>
                        )}
                      </Label>
                    </div>
                  )) || (
                    // Default Likert scale if no options provided
                    <>
                      {[1, 2, 3, 4, 5].map(value => (
                        <div
                          key={value}
                          className='flex items-center space-x-2'
                        >
                          <RadioGroupItem
                            value={value.toString()}
                            id={`option-${value}`}
                          />
                          <Label
                            htmlFor={`option-${value}`}
                            className='flex-1 cursor-pointer'
                          >
                            <div className='flex items-center justify-between'>
                              <span>
                                {value === 1 && 'Strongly Disagree'}
                                {value === 2 && 'Disagree'}
                                {value === 3 && 'Neutral'}
                                {value === 4 && 'Agree'}
                                {value === 5 && 'Strongly Agree'}
                              </span>
                              <span className='text-sm text-gray-500'>
                                {value}
                              </span>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </>
                  )}
                </RadioGroup>
              )}

              {currentQuestion.questionType === 'multiple_choice' &&
                currentQuestion.answerOptions && (
                  <RadioGroup
                    value={questionResponse?.responseValue?.toString() || ''}
                    onValueChange={value =>
                      handleResponseChange(currentQuestion.id, {
                        responseValue: parseInt(value),
                        responseTime: questionStartTime
                          ? Math.round(
                              (Date.now() - questionStartTime.getTime()) / 1000
                            )
                          : 0,
                      })
                    }
                    className='space-y-3'
                  >
                    {currentQuestion.answerOptions.map(option => (
                      <div
                        key={option.value}
                        className='flex items-center space-x-2'
                      >
                        <RadioGroupItem
                          value={option.value.toString()}
                          id={`option-${option.value}`}
                        />
                        <Label
                          htmlFor={`option-${option.value}`}
                          className='flex-1 cursor-pointer'
                        >
                          {option.label}
                          {option.description && (
                            <p className='text-sm text-gray-600 mt-1'>
                              {option.description}
                            </p>
                          )}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

              {currentQuestion.questionType === 'text' && (
                <Textarea
                  value={questionResponse?.responseText || ''}
                  onChange={e =>
                    handleResponseChange(currentQuestion.id, {
                      responseText: e.target.value,
                      responseTime: questionStartTime
                        ? Math.round(
                            (Date.now() - questionStartTime.getTime()) / 1000
                          )
                        : 0,
                    })
                  }
                  placeholder='Enter your response...'
                  rows={4}
                />
              )}

              {currentQuestion.questionType === 'binary' && (
                <RadioGroup
                  value={questionResponse?.responseValue?.toString() || ''}
                  onValueChange={value =>
                    handleResponseChange(currentQuestion.id, {
                      responseValue: parseInt(value),
                      responseTime: questionStartTime
                        ? Math.round(
                            (Date.now() - questionStartTime.getTime()) / 1000
                          )
                        : 0,
                    })
                  }
                  className='space-y-3'
                >
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='1' id='yes' />
                    <Label htmlFor='yes' className='cursor-pointer'>
                      Yes
                    </Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='0' id='no' />
                    <Label htmlFor='no' className='cursor-pointer'>
                      No
                    </Label>
                  </div>
                </RadioGroup>
              )}
            </div>

            {/* Confidence rating */}
            <div className='border-t pt-4'>
              <Label className='text-sm font-medium'>
                How confident are you in this answer?
              </Label>
              <RadioGroup
                value={questionResponse?.confidence?.toString() || ''}
                onValueChange={value =>
                  handleResponseChange(currentQuestion.id, {
                    confidence: parseInt(value),
                  })
                }
                className='flex space-x-4 mt-2'
              >
                {[1, 2, 3, 4, 5].map(value => (
                  <div key={value} className='flex items-center space-x-1'>
                    <RadioGroupItem
                      value={value.toString()}
                      id={`confidence-${value}`}
                    />
                    <Label
                      htmlFor={`confidence-${value}`}
                      className='text-sm cursor-pointer'
                    >
                      {value}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <div className='flex justify-between text-xs text-gray-500 mt-1'>
                <span>Not confident</span>
                <span>Very confident</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (assessmentLoading || userAssessmentLoading) {
    return (
      <div className='max-w-4xl mx-auto p-6'>
        <div className='flex items-center justify-center h-64'>
          <Loader2 className='h-8 w-8 animate-spin' />
          <span className='ml-2'>Loading assessment...</span>
        </div>
      </div>
    );
  }

  if (assessmentError || !assessment) {
    return (
      <div className='max-w-4xl mx-auto p-6'>
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertDescription>
            Failed to load assessment. Please try again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className='max-w-4xl mx-auto p-6'>
        <Alert>
          <AlertCircle className='h-4 w-4' />
          <AlertDescription>
            This assessment has no questions available.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto p-6'>
      {/* Header */}
      <div className='mb-6'>
        <div className='flex items-center justify-between mb-4'>
          <Button
            variant='outline'
            onClick={() => router.back()}
            className='flex items-center'
          >
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back
          </Button>
          <div className='flex items-center text-sm text-gray-500'>
            <Clock className='h-4 w-4 mr-1' />
            {startTime &&
              Math.round((Date.now() - startTime.getTime()) / 60000)}{' '}
            minutes
          </div>
        </div>

        <h1 className='text-2xl font-bold text-gray-900 mb-2'>
          {assessment.name}
        </h1>
        {assessment.description && (
          <p className='text-gray-600 mb-4'>{assessment.description}</p>
        )}

        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center text-sm text-gray-500'>
            <BookOpen className='h-4 w-4 mr-1' />
            {assessment.estimatedDuration || 15} minutes estimated
          </div>
          <Button
            variant='outline'
            size='sm'
            onClick={handleSaveProgress}
            disabled={savingResponses}
          >
            {savingResponses ? (
              <Loader2 className='h-4 w-4 animate-spin mr-2' />
            ) : (
              <Save className='h-4 w-4 mr-2' />
            )}
            Save Progress
          </Button>
        </div>

        <Progress value={progress} className='mb-4' />
        <div className='text-sm text-gray-600 text-center'>
          {currentQuestionIndex + 1} of {questions.length} questions
        </div>
      </div>

      {/* Question */}
      {renderQuestion()}

      {/* Navigation */}
      <div className='flex justify-between items-center'>
        <Button
          variant='outline'
          onClick={() => handleQuestionNavigation('prev')}
          disabled={currentQuestionIndex === 0}
        >
          <ArrowLeft className='h-4 w-4 mr-2' />
          Previous
        </Button>

        <div className='flex gap-2'>
          {currentQuestionIndex === questions.length - 1 ? (
            <Button
              onClick={() => setShowConfirmComplete(true)}
              disabled={isSubmitting || completingAssessment}
              className='bg-green-600 hover:bg-green-700'
            >
              {completingAssessment ? (
                <Loader2 className='h-4 w-4 animate-spin mr-2' />
              ) : (
                <CheckCircle className='h-4 w-4 mr-2' />
              )}
              Complete Assessment
            </Button>
          ) : (
            <Button
              onClick={() => handleQuestionNavigation('next')}
              disabled={currentQuestionIndex === questions.length - 1}
            >
              Next
              <ArrowRight className='h-4 w-4 ml-2' />
            </Button>
          )}
        </div>
      </div>

      {/* Completion Confirmation Modal */}
      {showConfirmComplete && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <Card className='w-full max-w-md mx-4'>
            <CardHeader>
              <CardTitle>Complete Assessment?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-gray-600 mb-4'>
                Are you sure you want to complete this assessment? You won't be
                able to make changes after completion.
              </p>
              <div className='flex gap-2 justify-end'>
                <Button
                  variant='outline'
                  onClick={() => setShowConfirmComplete(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCompleteAssessment}
                  disabled={isSubmitting || completingAssessment}
                  className='bg-green-600 hover:bg-green-700'
                >
                  {completingAssessment ? (
                    <Loader2 className='h-4 w-4 animate-spin mr-2' />
                  ) : (
                    <CheckCircle className='h-4 w-4 mr-2' />
                  )}
                  Complete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
