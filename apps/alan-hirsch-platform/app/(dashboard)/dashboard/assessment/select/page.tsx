'use client';

import { Badge } from '@platform/ui/badge';
import { Button } from '@platform/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@platform/ui/card';
import { Input } from '@platform/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@platform/ui/select';
import {
  useAssessments,
  useStartAssessment,
  useUserAssessments,
} from '@/hooks/useAssessment';
import type { AssessmentSearchRequest } from '@platform/shared/contracts';
import {
  AlertCircle,
  BookOpen,
  CheckCircle,
  Clock,
  Filter,
  Globe,
  Loader2,
  Play,
  Search,
  Star,
  Users,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AssessmentSelectPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('active');
  const [selectedCulturalAdaptation, setSelectedCulturalAdaptation] =
    useState<string>('');
  const [researchBackedOnly, setResearchBackedOnly] = useState(false);

  // Build filters object
  const filters: AssessmentSearchRequest = {
    page: 1,
    limit: 20,
    search: searchTerm || undefined,
    assessmentType: selectedType
      ? (selectedType as
          | 'apest'
          | 'mdna'
          | 'cultural_intelligence'
          | 'leadership_style'
          | 'spiritual_gifts'
          | 'other')
      : undefined,
    status: selectedStatus as 'draft' | 'active' | 'archived' | 'under_review',
    culturalAdaptation: selectedCulturalAdaptation
      ? (selectedCulturalAdaptation as
          | 'western'
          | 'eastern'
          | 'african'
          | 'latin_american'
          | 'middle_eastern'
          | 'oceanic'
          | 'global'
          | 'universal')
      : undefined,
    researchBacked: researchBackedOnly || undefined,
  };

  const {
    data: assessmentsResponse,
    isLoading: assessmentsLoading,
    error: assessmentsError,
  } = useAssessments(filters);
  const { data: userAssessmentsResponse, isLoading: userAssessmentsLoading } =
    useUserAssessments();
  const {
    startAssessment,
    isLoading: startingAssessment,
    error: startError,
  } = useStartAssessment();

  const assessments = assessmentsResponse?.items?.data || [];
  const userAssessments = userAssessmentsResponse?.items?.data || [];

  // Create a map of user assessments by assessment ID for quick lookup
  const userAssessmentMap = new Map(
    userAssessments.map(ua => [ua.assessmentId, ua])
  );

  const handleStartAssessment = async (assessmentId: string) => {
    try {
      const result = await startAssessment({ assessmentId });
      if (result) {
        router.push(`/dashboard/assessment/take/${assessmentId}`);
      }
    } catch (error) {
      console.error('Failed to start assessment:', error);
    }
  };

  const getAssessmentStatus = (assessmentId: string) => {
    const userAssessment = userAssessmentMap.get(assessmentId);
    if (!userAssessment) return 'not_started';
    if (userAssessment.completedAt) return 'completed';
    return 'in_progress';
  };

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

  if (assessmentsLoading || userAssessmentsLoading) {
    return (
      <div className='max-w-6xl mx-auto p-6'>
        <div className='flex items-center justify-center h-64'>
          <Loader2 className='h-8 w-8 animate-spin' />
          <span className='ml-2'>Loading assessments...</span>
        </div>
      </div>
    );
  }

  if (assessmentsError) {
    return (
      <div className='max-w-6xl mx-auto p-6'>
        <div className='flex items-center justify-center h-64'>
          <AlertCircle className='h-8 w-8 text-red-500' />
          <span className='ml-2 text-red-500'>Failed to load assessments</span>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-6xl mx-auto p-6'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>
          Assessment Center
        </h1>
        <p className='text-gray-600'>
          Discover your ministry gifts and leadership strengths through our
          comprehensive assessments.
        </p>
      </div>

      {/* Filters */}
      <Card className='mb-6'>
        <CardHeader>
          <CardTitle className='flex items-center'>
            <Filter className='mr-2 h-5 w-5' />
            Filter Assessments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {/* Search */}
            <div className='space-y-2'>
              <label className='text-sm font-medium'>Search</label>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                <Input
                  placeholder='Search assessments...'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className='pl-10'
                />
              </div>
            </div>

            {/* Assessment Type */}
            <div className='space-y-2'>
              <label className='text-sm font-medium'>Type</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder='All types' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=''>All types</SelectItem>
                  <SelectItem value='apest'>APEST</SelectItem>
                  <SelectItem value='mdna'>MDNA</SelectItem>
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
            </div>

            {/* Cultural Adaptation */}
            <div className='space-y-2'>
              <label className='text-sm font-medium'>Cultural Context</label>
              <Select
                value={selectedCulturalAdaptation}
                onValueChange={setSelectedCulturalAdaptation}
              >
                <SelectTrigger>
                  <SelectValue placeholder='All contexts' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=''>All contexts</SelectItem>
                  <SelectItem value='universal'>Universal</SelectItem>
                  <SelectItem value='western'>Western</SelectItem>
                  <SelectItem value='eastern'>Eastern</SelectItem>
                  <SelectItem value='african'>African</SelectItem>
                  <SelectItem value='latin_american'>Latin American</SelectItem>
                  <SelectItem value='middle_eastern'>Middle Eastern</SelectItem>
                  <SelectItem value='oceanic'>Oceanic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Research Backed */}
            <div className='space-y-2'>
              <label className='text-sm font-medium'>Research Quality</label>
              <Select
                value={researchBackedOnly ? 'research' : 'all'}
                onValueChange={value =>
                  setResearchBackedOnly(value === 'research')
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='All assessments' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All assessments</SelectItem>
                  <SelectItem value='research'>Research-backed only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assessment Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {assessments.map(assessment => {
          const status = getAssessmentStatus(assessment.id);
          const userAssessment = userAssessmentMap.get(assessment.id);

          return (
            <Card
              key={assessment.id}
              className='hover:shadow-lg transition-shadow'
            >
              <CardHeader>
                <div className='flex items-start justify-between'>
                  <div className='flex-1'>
                    <CardTitle className='text-lg mb-2'>
                      {assessment.name}
                    </CardTitle>
                    <div className='flex flex-wrap gap-2 mb-2'>
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
                  </div>
                  <div className='ml-2'>
                    {status === 'completed' && (
                      <CheckCircle className='h-6 w-6 text-green-500' />
                    )}
                    {status === 'in_progress' && (
                      <Clock className='h-6 w-6 text-orange-500' />
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {assessment.description && (
                  <p className='text-gray-600 text-sm mb-4 line-clamp-3'>
                    {assessment.description}
                  </p>
                )}

                <div className='space-y-2 mb-4'>
                  <div className='flex items-center text-sm text-gray-500'>
                    <Clock className='h-4 w-4 mr-2' />
                    {assessment.estimatedDuration || 15} minutes
                  </div>
                  <div className='flex items-center text-sm text-gray-500'>
                    <BookOpen className='h-4 w-4 mr-2' />
                    {assessment.questionsCount} questions
                  </div>
                  <div className='flex items-center text-sm text-gray-500'>
                    <Globe className='h-4 w-4 mr-2' />
                    {getCulturalAdaptationLabel(assessment.culturalAdaptation)}
                  </div>
                </div>

                {/* Progress indicator for in-progress assessments */}
                {status === 'in_progress' && userAssessment && (
                  <div className='mb-4'>
                    <div className='flex justify-between text-sm text-gray-600 mb-1'>
                      <span>Progress</span>
                      <span>{userAssessment.completionPercentage || 0}%</span>
                    </div>
                    <div className='w-full bg-gray-200 rounded-full h-2'>
                      <div
                        className='bg-orange-500 h-2 rounded-full transition-all duration-300'
                        style={{
                          width: `${userAssessment.completionPercentage || 0}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className='flex gap-2'>
                  {status === 'not_started' && (
                    <Button
                      onClick={() => handleStartAssessment(assessment.id)}
                      disabled={startingAssessment}
                      className='flex-1'
                    >
                      {startingAssessment ? (
                        <Loader2 className='h-4 w-4 animate-spin mr-2' />
                      ) : (
                        <Play className='h-4 w-4 mr-2' />
                      )}
                      Start Assessment
                    </Button>
                  )}

                  {status === 'in_progress' && (
                    <Button
                      onClick={() =>
                        router.push(
                          `/dashboard/assessment/take/${assessment.id}`
                        )
                      }
                      className='flex-1'
                    >
                      <Play className='h-4 w-4 mr-2' />
                      Continue
                    </Button>
                  )}

                  {status === 'completed' && (
                    <Button
                      onClick={() =>
                        router.push(
                          `/dashboard/assessment/results/${userAssessment?.id}`
                        )
                      }
                      variant='outline'
                      className='flex-1'
                    >
                      <CheckCircle className='h-4 w-4 mr-2' />
                      View Results
                    </Button>
                  )}

                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() =>
                      router.push(`/dashboard/assessment/${assessment.id}`)
                    }
                  >
                    Details
                  </Button>
                </div>

                {/* Error display */}
                {startError && (
                  <div className='mt-2 text-sm text-red-600'>{startError}</div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {assessments.length === 0 && !assessmentsLoading && (
        <Card className='text-center py-12'>
          <CardContent>
            <BookOpen className='h-12 w-12 text-gray-400 mx-auto mb-4' />
            <h3 className='text-lg font-medium text-gray-900 mb-2'>
              No assessments found
            </h3>
            <p className='text-gray-600 mb-4'>
              Try adjusting your filters or search terms to find assessments.
            </p>
            <Button
              variant='outline'
              onClick={() => {
                setSearchTerm('');
                setSelectedType('');
                setSelectedCulturalAdaptation('');
                setResearchBackedOnly(false);
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* User Assessment History */}
      {userAssessments.length > 0 && (
        <Card className='mt-8'>
          <CardHeader>
            <CardTitle className='flex items-center'>
              <Users className='mr-2 h-5 w-5' />
              Your Assessment History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              {userAssessments.slice(0, 5).map(userAssessment => (
                <div
                  key={userAssessment.id}
                  className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                >
                  <div className='flex items-center'>
                    <div className='mr-3'>
                      {userAssessment.completedAt ? (
                        <CheckCircle className='h-5 w-5 text-green-500' />
                      ) : (
                        <Clock className='h-5 w-5 text-orange-500' />
                      )}
                    </div>
                    <div>
                      <p className='font-medium'>
                        {userAssessment.assessment?.name ||
                          'Unknown Assessment'}
                      </p>
                      <p className='text-sm text-gray-600'>
                        {userAssessment.completedAt
                          ? `Completed ${new Date(userAssessment.completedAt).toLocaleDateString()}`
                          : `Started ${new Date(userAssessment.startedAt).toLocaleDateString()}`}
                      </p>
                    </div>
                  </div>
                  <div className='flex gap-2'>
                    {userAssessment.completedAt ? (
                      <Button
                        size='sm'
                        onClick={() =>
                          router.push(
                            `/dashboard/assessment/results/${userAssessment.id}`
                          )
                        }
                      >
                        View Results
                      </Button>
                    ) : (
                      <Button
                        size='sm'
                        onClick={() =>
                          router.push(
                            `/dashboard/assessment/take/${userAssessment.assessmentId}`
                          )
                        }
                      >
                        Continue
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {userAssessments.length > 5 && (
              <div className='mt-4 text-center'>
                <Button
                  variant='outline'
                  onClick={() => router.push('/dashboard/assessment/results')}
                >
                  View All Results
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
