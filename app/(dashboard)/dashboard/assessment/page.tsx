'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Loader2 } from 'lucide-react';
import { useAssessmentAdapter } from '@/hooks';

interface AssessmentQuestion {
  id: string;
  questionText: string;
  answerOptions: string[];
  apestDimension: string;
}

interface Assessment {
  id: string;
  name: string;
  description: string;
  questions: AssessmentQuestion[];
}

export default function AssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Use the new assessment hook
  const { assessment, isLoading, error: assessmentError } = useAssessmentAdapter('550e8400-e29b-41d4-a716-446655440010');

  const handleResponse = (questionId: string, value: number) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    const mockQuestions = [
      { id: '1', questionText: 'Sample Question 1', answerOptions: ['Option 1', 'Option 2'], apestDimension: 'apostolic' },
      { id: '2', questionText: 'Sample Question 2', answerOptions: ['Option 1', 'Option 2'], apestDimension: 'prophetic' }
    ];
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Start user assessment
      const userAssessmentResponse = await fetch('/api/user/assessments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assessmentId: assessment!.id })
      });
      
      if (!userAssessmentResponse.ok) {
        throw new Error('Failed to start assessment');
      }
      
      const { data: userAssessment } = await userAssessmentResponse.json();

      // Submit responses
      const responsesArray = Object.entries(responses).map(([questionId, answer]) => ({
        questionId,
        answer
      }));

      const submitResponse = await fetch(`/api/user/assessments/${userAssessment.id}/responses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ responses: responsesArray })
      });

      if (!submitResponse.ok) {
        throw new Error('Failed to submit responses');
      }

      // Complete assessment
      const completeResponse = await fetch(`/api/user/assessments/${userAssessment.id}/complete`, {
        method: 'POST'
      });

      if (!completeResponse.ok) {
        throw new Error('Failed to complete assessment');
      }

      // Redirect to results
      window.location.href = `/dashboard/assessment/results/${userAssessment.id}`;
    } catch (error) {
      console.error('Failed to submit assessment:', error);
      setError('Failed to submit assessment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Loading assessment...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (assessmentError) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-red-600 mb-4">{assessmentError}</p>
              <Button onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                void window.location.reload();
              }}>Try Again</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-gray-600">No assessment found.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Mock questions for now - in a real app, these would come from the API
  const mockQuestions = [
    { id: '1', questionText: 'Sample Question 1', answerOptions: ['Option 1', 'Option 2'], apestDimension: 'apostolic' },
    { id: '2', questionText: 'Sample Question 2', answerOptions: ['Option 1', 'Option 2'], apestDimension: 'prophetic' }
  ];
  
  const question = mockQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === mockQuestions.length - 1;
  const canProceed = question ? responses[question.id] !== undefined : false;
  const progress = ((currentQuestion + 1) / mockQuestions.length) * 100;

  if (!question) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-gray-500">Question not found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>{assessment.name}</CardTitle>
          <p className="text-sm text-gray-600">{assessment.description}</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Question {currentQuestion + 1} of {mockQuestions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">{question.questionText}</h3>
              <RadioGroup
                value={responses[question.id]?.toString() || ''}
                onValueChange={(value) => handleResponse(question.id, parseInt(value))}
                className="space-y-3"
              >
                {question.answerOptions.map((option: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              
              {isLastQuestion ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceed || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Complete Assessment'
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
