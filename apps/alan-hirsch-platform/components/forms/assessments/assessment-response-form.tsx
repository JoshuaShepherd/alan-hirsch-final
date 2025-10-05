import { zodResolver } from '@hookform/resolvers/zod';
import {
  SaveResponsesInput,
  saveResponsesInputSchema,
} from '@platform/shared/contracts';
import { Badge } from '@platform/ui/badge';
import { Button } from '@platform/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@platform/ui/card';
import { Label } from '@platform/ui/label';
import { Progress } from '@platform/ui/progress';
import { RadioGroup, RadioGroupItem } from '@platform/ui/radio-group';
import { Slider } from '@platform/ui/slider';
import { Textarea } from '@platform/ui/textarea';
import { ArrowLeft, ArrowRight, Clock, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export interface AssessmentQuestion {
  id: string;
  questionText: string;
  questionType: 'likert' | 'multiple_choice' | 'binary' | 'ranking' | 'text';
  orderIndex: number;
  isRequired: boolean;
  answerOptions?: Array<{
    value: number;
    label: string;
    description?: string;
  }>;
  apestDimension?: string;
}

export interface AssessmentResponseFormProps {
  assessmentId: string;
  questions: AssessmentQuestion[];
  onSuccess?: (responses: SaveResponsesInput) => void;
  onError?: (error: Error) => void;
  onSaveProgress?: (responses: SaveResponsesInput) => void;
  className?: string;
  isLoading?: boolean;
  autoSave?: boolean;
  autoSaveInterval?: number; // in milliseconds
}

/**
 * Form for taking assessments with real-time progress saving
 */
export function AssessmentResponseForm({
  assessmentId,
  questions,
  onSuccess,
  onError,
  onSaveProgress,
  className,
  isLoading = false,
  autoSave = true,
  autoSaveInterval = 30000, // 30 seconds
}: AssessmentResponseFormProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [startTime] = useState(Date.now());
  const [questionStartTimes, setQuestionStartTimes] = useState<
    Record<string, number>
  >({});

  const form = useForm<SaveResponsesInput>({
    resolver: zodResolver(saveResponsesInputSchema),
    defaultValues: {
      responses: questions.map(q => ({
        questionId: q.id,
        responseValue: undefined,
        responseText: undefined,
        responseTime: 0,
        confidence: undefined,
        skipped: false,
      })),
    },
  });

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  // Auto-save functionality
  useEffect(() => {
    if (!autoSave || !onSaveProgress) return;

    const interval = setInterval(() => {
      const formData = form.getValues();
      onSaveProgress(formData);
    }, autoSaveInterval);

    return () => clearInterval(interval);
  }, [autoSave, autoSaveInterval, onSaveProgress, form]);

  // Track question start time
  useEffect(() => {
    if (currentQuestion) {
      setQuestionStartTimes(prev => ({
        ...prev,
        [currentQuestion.id]: Date.now(),
      }));
    }
  }, [currentQuestion]);

  const recordResponseTime = (questionId: string) => {
    const startTime = questionStartTimes[questionId];
    if (startTime) {
      const responseTime = Math.floor((Date.now() - startTime) / 1000);
      const currentResponses = form.getValues('responses');
      const updatedResponses = currentResponses.map(r =>
        r.questionId === questionId ? { ...r, responseTime } : r
      );
      form.setValue('responses', updatedResponses);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      recordResponseTime(currentQuestion.id);
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      recordResponseTime(currentQuestion.id);
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const goToQuestion = (index: number) => {
    recordResponseTime(currentQuestion.id);
    setCurrentQuestionIndex(index);
  };

  const onSubmit = async (data: SaveResponsesInput) => {
    try {
      const response = await fetch(
        `/api/user/assessments/${assessmentId}/responses`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save responses');
      }

      const result = await response.json();
      onSuccess?.(result.data);
    } catch (error) {
      console.error('Assessment response error:', error);
      onError?.(
        error instanceof Error ? error : new Error('Failed to save responses')
      );
    }
  };

  const handleResponseChange = (
    questionId: string,
    value: any,
    type: 'value' | 'text' | 'confidence'
  ) => {
    const currentResponses = form.getValues('responses');
    const updatedResponses = currentResponses.map(r => {
      if (r.questionId === questionId) {
        return {
          ...r,
          [type === 'value'
            ? 'responseValue'
            : type === 'text'
              ? 'responseText'
              : 'confidence']: value,
          skipped: false,
        };
      }
      return r;
    });
    form.setValue('responses', updatedResponses);
  };

  const skipQuestion = (questionId: string) => {
    const currentResponses = form.getValues('responses');
    const updatedResponses = currentResponses.map(r =>
      r.questionId === questionId ? { ...r, skipped: true } : r
    );
    form.setValue('responses', updatedResponses);
    nextQuestion();
  };

  const renderQuestion = (question: AssessmentQuestion) => {
    const currentResponse = form
      .watch('responses')
      .find(r => r.questionId === question.id);

    switch (question.questionType) {
      case 'likert':
        return (
          <RadioGroup
            value={currentResponse?.responseValue?.toString()}
            onValueChange={value =>
              handleResponseChange(question.id, parseInt(value), 'value')
            }
            className="space-y-3"
          >
            {question.answerOptions?.map(option => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value.toString()}
                  id={`${question.id}-${option.value}`}
                />
                <Label
                  htmlFor={`${question.id}-${option.value}`}
                  className="flex-1"
                >
                  <div className="font-medium">{option.label}</div>
                  {option.description && (
                    <div className="text-sm text-gray-600">
                      {option.description}
                    </div>
                  )}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'multiple_choice':
        return (
          <RadioGroup
            value={currentResponse?.responseValue?.toString()}
            onValueChange={value =>
              handleResponseChange(question.id, parseInt(value), 'value')
            }
            className="space-y-3"
          >
            {question.answerOptions?.map(option => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value.toString()}
                  id={`${question.id}-${option.value}`}
                />
                <Label
                  htmlFor={`${question.id}-${option.value}`}
                  className="flex-1"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'binary':
        return (
          <RadioGroup
            value={currentResponse?.responseValue?.toString()}
            onValueChange={value =>
              handleResponseChange(question.id, parseInt(value), 'value')
            }
            className="flex space-x-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id={`${question.id}-yes`} />
              <Label htmlFor={`${question.id}-yes`}>Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="0" id={`${question.id}-no`} />
              <Label htmlFor={`${question.id}-no`}>No</Label>
            </div>
          </RadioGroup>
        );

      case 'text':
        return (
          <Textarea
            value={currentResponse?.responseText || ''}
            onChange={e =>
              handleResponseChange(question.id, e.target.value, 'text')
            }
            placeholder="Enter your response..."
            rows={4}
          />
        );

      case 'ranking':
        return (
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Rank the following options (1 = most important, 5 = least
              important):
            </p>
            {question.answerOptions?.map(option => (
              <div key={option.value} className="flex items-center space-x-3">
                <Label className="w-32">{option.label}</Label>
                <Slider
                  value={[currentResponse?.responseValue || 1]}
                  onValueChange={([value]) =>
                    handleResponseChange(question.id, value, 'value')
                  }
                  min={1}
                  max={question.answerOptions?.length || 5}
                  step={1}
                  className="flex-1"
                />
                <span className="w-8 text-sm font-medium">
                  {currentResponse?.responseValue || 1}
                </span>
              </div>
            ))}
          </div>
        );

      default:
        return <div>Unsupported question type</div>;
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Assessment</CardTitle>
            <CardDescription>
              Question {currentQuestionIndex + 1} of {questions.length}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">
              {Math.floor((Date.now() - startTime) / 1000 / 60)} min
            </span>
          </div>
        </div>
        <Progress value={progress} className="w-full" />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Question Navigation */}
          <div className="flex flex-wrap gap-2">
            {questions.map((_, index) => {
              const response = form
                .watch('responses')
                .find(r => r.questionId === questions[index].id);
              const isAnswered =
                response &&
                (response.responseValue !== undefined || response.responseText);
              const isCurrent = index === currentQuestionIndex;

              return (
                <Button
                  key={index}
                  type="button"
                  variant={
                    isCurrent ? 'default' : isAnswered ? 'secondary' : 'outline'
                  }
                  size="sm"
                  onClick={() => goToQuestion(index)}
                  className="h-8 w-8 p-0"
                >
                  {index + 1}
                </Button>
              );
            })}
          </div>

          {/* Current Question */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">
                {currentQuestion.questionText}
              </h3>
              {currentQuestion.apestDimension && (
                <Badge variant="outline">
                  {currentQuestion.apestDimension}
                </Badge>
              )}
            </div>

            {renderQuestion(currentQuestion)}

            {/* Confidence Level */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                How confident are you in this answer?
              </Label>
              <RadioGroup
                value={currentResponse?.confidence?.toString()}
                onValueChange={value =>
                  handleResponseChange(
                    currentQuestion.id,
                    parseInt(value),
                    'confidence'
                  )
                }
                className="flex space-x-6"
              >
                {[1, 2, 3, 4, 5].map(level => (
                  <div key={level} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={level.toString()}
                      id={`confidence-${level}`}
                    />
                    <Label htmlFor={`confidence-${level}`} className="text-sm">
                      {level}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Not confident</span>
                <span>Very confident</span>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={prevQuestion}
              disabled={currentQuestionIndex === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex space-x-2">
              {currentQuestion.isRequired && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => skipQuestion(currentQuestion.id)}
                >
                  Skip
                </Button>
              )}

              {onSaveProgress && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onSaveProgress(form.getValues())}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Progress
                </Button>
              )}
            </div>

            {currentQuestionIndex === questions.length - 1 ? (
              <Button
                type="button"
                onClick={form.handleSubmit(onSubmit)}
                disabled={isLoading}
              >
                Complete Assessment
              </Button>
            ) : (
              <Button type="button" onClick={nextQuestion}>
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
