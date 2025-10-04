'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAssessment, useUserAssessments } from '@/hooks/useAssessment';
import {
  AlertCircle,
  ArrowLeft,
  BarChart3,
  BookOpen,
  CheckCircle,
  Clock,
  Edit,
  Globe,
  Loader2,
  Play,
  Settings,
  Star,
  Users,
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

export default function AssessmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const assessmentId = params.id as string;

  const {
    data: assessmentResponse,
    isLoading,
    error,
  } = useAssessment(assessmentId);
  const { data: userAssessmentsResponse } = useUserAssessments();

  const assessment = assessmentResponse?.data;
  const userAssessments = userAssessmentsResponse?.data?.items?.data || [];

  // Find user's assessment for this assessment
  const userAssessment = userAssessments.find(
    ua => ua.assessmentId === assessmentId
  );

  const getAssessmentTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      apest: 'APEST',
      mdna: 'MDNA',
      cultural_intelligence: 'Cultural Intelligence',
      leadership_style: 'Leadership Style',
      spiritual_gifts: 'Spiritual Gifts',
      other: 'Other',
    };
    return labels[type] || type;
  };

  const getCulturalAdaptationLabel = (adaptation: string) => {
    const labels: Record<string, string> = {
      universal: 'Universal',
      western: 'Western',
      eastern: 'Eastern',
      african: 'African',
      latin_american: 'Latin American',
      middle_eastern: 'Middle Eastern',
      oceanic: 'Oceanic',
    };
    return labels[adaptation] || adaptation;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      draft: 'bg-gray-100 text-gray-800',
      archived: 'bg-red-100 text-red-800',
      under_review: 'bg-yellow-100 text-yellow-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getQuestionTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      likert: 'Likert Scale',
      multiple_choice: 'Multiple Choice',
      binary: 'Yes/No',
      ranking: 'Ranking',
      text: 'Text Response',
    };
    return labels[type] || type;
  };

  if (isLoading) {
    return (
      <div className='max-w-6xl mx-auto p-6'>
        <div className='flex items-center justify-center h-64'>
          <Loader2 className='h-8 w-8 animate-spin' />
          <span className='ml-2'>Loading assessment...</span>
        </div>
      </div>
    );
  }

  if (error || !assessment) {
    return (
      <div className='max-w-6xl mx-auto p-6'>
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertDescription>
            Failed to load assessment. Please try again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className='max-w-6xl mx-auto p-6'>
      {/* Header */}
      <div className='mb-8'>
        <div className='flex items-center justify-between mb-4'>
          <Button
            variant='outline'
            onClick={() => router.back()}
            className='flex items-center'
          >
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back
          </Button>
          <div className='flex gap-2'>
            <Button
              variant='outline'
              onClick={() =>
                router.push(`/dashboard/assessment/edit/${assessment.id}`)
              }
            >
              <Edit className='h-4 w-4 mr-2' />
              Edit
            </Button>
            <Button
              variant='outline'
              onClick={() => router.push(`/dashboard/assessment/manage`)}
            >
              <Settings className='h-4 w-4 mr-2' />
              Manage
            </Button>
          </div>
        </div>

        <div className='flex items-start justify-between'>
          <div className='flex-1'>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>
              {assessment.name}
            </h1>
            <div className='flex items-center space-x-4 mb-4'>
              <Badge className={getStatusColor(assessment.status)}>
                {assessment.status}
              </Badge>
              <Badge variant='secondary'>
                {getAssessmentTypeLabel(assessment.assessmentType)}
              </Badge>
              {assessment.researchBacked && (
                <Badge
                  variant='outline'
                  className='text-green-600 border-green-600'
                >
                  <Star className='h-3 w-3 mr-1' />
                  Research-backed
                </Badge>
              )}
            </div>
            {assessment.description && (
              <p className='text-gray-600 mb-4'>{assessment.description}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col space-y-2'>
            {userAssessment ? (
              userAssessment.completedAt ? (
                <Button
                  onClick={() =>
                    router.push(
                      `/dashboard/assessment/results/${userAssessment.id}`
                    )
                  }
                  className='bg-green-600 hover:bg-green-700'
                >
                  <CheckCircle className='h-4 w-4 mr-2' />
                  View Results
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    router.push(`/dashboard/assessment/take/${assessment.id}`)
                  }
                >
                  <Play className='h-4 w-4 mr-2' />
                  Continue Assessment
                </Button>
              )
            ) : (
              <Button
                onClick={() =>
                  router.push(`/dashboard/assessment/take/${assessment.id}`)
                }
              >
                <Play className='h-4 w-4 mr-2' />
                Start Assessment
              </Button>
            )}
          </div>
        </div>
      </div>

      <Tabs defaultValue='overview' className='space-y-6'>
        <TabsList className='grid w-full grid-cols-4'>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          <TabsTrigger value='questions'>Questions</TabsTrigger>
          <TabsTrigger value='analytics'>Analytics</TabsTrigger>
          <TabsTrigger value='settings'>Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value='overview' className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            <Card>
              <CardContent className='p-4'>
                <div className='flex items-center'>
                  <BookOpen className='h-8 w-8 text-blue-500 mr-3' />
                  <div>
                    <div className='text-2xl font-bold'>
                      {assessment.questionsCount}
                    </div>
                    <div className='text-sm text-gray-500'>Questions</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-4'>
                <div className='flex items-center'>
                  <Clock className='h-8 w-8 text-orange-500 mr-3' />
                  <div>
                    <div className='text-2xl font-bold'>
                      {assessment.estimatedDuration || 15}
                    </div>
                    <div className='text-sm text-gray-500'>Minutes</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-4'>
                <div className='flex items-center'>
                  <Globe className='h-8 w-8 text-green-500 mr-3' />
                  <div>
                    <div className='text-lg font-bold'>
                      {getCulturalAdaptationLabel(
                        assessment.culturalAdaptation
                      )}
                    </div>
                    <div className='text-sm text-gray-500'>
                      Cultural Context
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-4'>
                <div className='flex items-center'>
                  <Users className='h-8 w-8 text-purple-500 mr-3' />
                  <div>
                    <div className='text-2xl font-bold'>
                      {
                        userAssessments.filter(
                          ua => ua.assessmentId === assessmentId
                        ).length
                      }
                    </div>
                    <div className='text-sm text-gray-500'>Completions</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Assessment Details */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <Card>
              <CardHeader>
                <CardTitle>Assessment Information</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div>
                  <label className='text-sm font-medium text-gray-500'>
                    Version
                  </label>
                  <p className='text-lg'>{assessment.version}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-500'>
                    Language
                  </label>
                  <p className='text-lg'>
                    {assessment.language?.toUpperCase()}
                  </p>
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-500'>
                    Scoring Method
                  </label>
                  <p className='text-lg capitalize'>
                    {assessment.scoringMethod?.replace('_', ' ')}
                  </p>
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-500'>
                    Created
                  </label>
                  <p className='text-lg'>
                    {new Date(assessment.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-500'>
                    Last Updated
                  </label>
                  <p className='text-lg'>
                    {new Date(assessment.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Research & Validity</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div>
                  <label className='text-sm font-medium text-gray-500'>
                    Research Backed
                  </label>
                  <p className='text-lg'>
                    {assessment.researchBacked ? (
                      <Badge className='bg-green-100 text-green-800'>
                        <Star className='h-3 w-3 mr-1' />
                        Yes
                      </Badge>
                    ) : (
                      <Badge variant='outline'>No</Badge>
                    )}
                  </p>
                </div>
                {assessment.validityScore && (
                  <div>
                    <label className='text-sm font-medium text-gray-500'>
                      Validity Score
                    </label>
                    <p className='text-lg'>{assessment.validityScore}</p>
                  </div>
                )}
                {assessment.reliabilityScore && (
                  <div>
                    <label className='text-sm font-medium text-gray-500'>
                      Reliability Score
                    </label>
                    <p className='text-lg'>{assessment.reliabilityScore}</p>
                  </div>
                )}
                {assessment.instructions && (
                  <div>
                    <label className='text-sm font-medium text-gray-500'>
                      Instructions
                    </label>
                    <p className='text-sm text-gray-700 mt-1'>
                      {assessment.instructions}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Questions Tab */}
        <TabsContent value='questions' className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Assessment Questions</CardTitle>
            </CardHeader>
            <CardContent>
              {assessment.questions && assessment.questions.length > 0 ? (
                <div className='space-y-4'>
                  {assessment.questions.map((question, index) => (
                    <div key={question.id} className='border rounded-lg p-4'>
                      <div className='flex items-start justify-between mb-2'>
                        <div className='flex-1'>
                          <div className='flex items-center space-x-2 mb-2'>
                            <span className='text-sm font-medium text-gray-500'>
                              Question {index + 1}
                            </span>
                            <Badge variant='outline'>
                              {getQuestionTypeLabel(question.questionType)}
                            </Badge>
                            {question.apestDimension && (
                              <Badge variant='secondary' className='capitalize'>
                                {question.apestDimension}
                              </Badge>
                            )}
                          </div>
                          <p className='text-lg font-medium mb-2'>
                            {question.questionText}
                          </p>
                        </div>
                      </div>

                      {question.answerOptions &&
                        question.answerOptions.length > 0 && (
                          <div className='ml-4'>
                            <p className='text-sm font-medium text-gray-500 mb-2'>
                              Answer Options:
                            </p>
                            <ul className='space-y-1'>
                              {question.answerOptions.map(
                                (option, optionIndex) => (
                                  <li
                                    key={optionIndex}
                                    className='text-sm text-gray-700'
                                  >
                                    <span className='font-medium'>
                                      {option.value}.
                                    </span>{' '}
                                    {option.label}
                                    {option.description && (
                                      <span className='text-gray-500'>
                                        {' '}
                                        - {option.description}
                                      </span>
                                    )}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}

                      <div className='flex items-center space-x-4 mt-3 text-sm text-gray-500'>
                        <span>Weight: {question.weight}</span>
                        {question.reverseScored && (
                          <Badge variant='outline' className='text-orange-600'>
                            Reverse Scored
                          </Badge>
                        )}
                        {question.isRequired && (
                          <Badge variant='outline' className='text-red-600'>
                            Required
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className='text-center py-8'>
                  <BookOpen className='h-12 w-12 text-gray-400 mx-auto mb-4' />
                  <h3 className='text-lg font-medium text-gray-900 mb-2'>
                    No Questions Available
                  </h3>
                  <p className='text-gray-600 mb-4'>
                    This assessment doesn't have any questions yet.
                  </p>
                  <Button
                    onClick={() =>
                      router.push(`/dashboard/assessment/edit/${assessment.id}`)
                    }
                  >
                    <Edit className='h-4 w-4 mr-2' />
                    Add Questions
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value='analytics' className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <Users className='h-5 w-5 mr-2' />
                  Completion Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-2'>
                  <div className='flex justify-between'>
                    <span className='text-sm text-gray-500'>Total Started</span>
                    <span className='font-medium'>
                      {
                        userAssessments.filter(
                          ua => ua.assessmentId === assessmentId
                        ).length
                      }
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-sm text-gray-500'>Completed</span>
                    <span className='font-medium'>
                      {
                        userAssessments.filter(
                          ua =>
                            ua.assessmentId === assessmentId && ua.completedAt
                        ).length
                      }
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-sm text-gray-500'>In Progress</span>
                    <span className='font-medium'>
                      {
                        userAssessments.filter(
                          ua =>
                            ua.assessmentId === assessmentId && !ua.completedAt
                        ).length
                      }
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <BarChart3 className='h-5 w-5 mr-2' />
                  Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-2'>
                  <div className='flex justify-between'>
                    <span className='text-sm text-gray-500'>Avg. Score</span>
                    <span className='font-medium'>
                      {(() => {
                        const completed = userAssessments.filter(
                          ua =>
                            ua.assessmentId === assessmentId &&
                            ua.completedAt &&
                            ua.totalScore
                        );
                        return completed.length > 0
                          ? Math.round(
                              completed.reduce(
                                (sum, ua) => sum + ua.totalScore!,
                                0
                              ) / completed.length
                            )
                          : 'N/A';
                      })()}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-sm text-gray-500'>Avg. Time</span>
                    <span className='font-medium'>
                      {(() => {
                        const completed = userAssessments.filter(
                          ua =>
                            ua.assessmentId === assessmentId &&
                            ua.completedAt &&
                            ua.completionTime
                        );
                        return completed.length > 0
                          ? Math.round(
                              completed.reduce(
                                (sum, ua) => sum + ua.completionTime!,
                                0
                              ) / completed.length
                            )
                          : 'N/A';
                      })()}{' '}
                      min
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <Star className='h-5 w-5 mr-2' />
                  Popular Gifts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-2'>
                  {(() => {
                    const completed = userAssessments.filter(
                      ua =>
                        ua.assessmentId === assessmentId &&
                        ua.completedAt &&
                        ua.primaryGift
                    );
                    const giftCounts = completed.reduce(
                      (acc, ua) => {
                        acc[ua.primaryGift!] = (acc[ua.primaryGift!] || 0) + 1;
                        return acc;
                      },
                      {} as Record<string, number>
                    );

                    const sortedGifts = Object.entries(giftCounts)
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 3);

                    return sortedGifts.length > 0 ? (
                      sortedGifts.map(([gift, count]) => (
                        <div key={gift} className='flex justify-between'>
                          <span className='text-sm text-gray-500 capitalize'>
                            {gift}
                          </span>
                          <span className='font-medium'>{count}</span>
                        </div>
                      ))
                    ) : (
                      <p className='text-sm text-gray-500'>No data available</p>
                    );
                  })()}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value='settings' className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Assessment Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div>
                  <label className='text-sm font-medium text-gray-500'>
                    Assessment Status
                  </label>
                  <p className='text-lg'>
                    <Badge className={getStatusColor(assessment.status)}>
                      {assessment.status}
                    </Badge>
                  </p>
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-500'>
                    URL Slug
                  </label>
                  <p className='text-lg font-mono'>{assessment.slug}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-500'>
                    Passing Score
                  </label>
                  <p className='text-lg'>
                    {assessment.passingScore || 'Not set'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
