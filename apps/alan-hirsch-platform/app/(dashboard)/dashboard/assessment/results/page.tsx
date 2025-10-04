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
import { useUserAssessments } from '@/hooks/useAssessment';
import {
  AlertCircle,
  BarChart3,
  BookOpen,
  CheckCircle,
  Clock,
  Filter,
  Loader2,
  Search,
  TrendingUp,
  Trophy,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AssessmentResultsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [completedFilter, setCompletedFilter] = useState<string>('all');

  // Build filters object
  const filters = {
    page: 1,
    limit: 50,
    assessmentType: selectedType || undefined,
    completed:
      completedFilter === 'completed'
        ? true
        : completedFilter === 'incomplete'
          ? false
          : undefined,
  };

  const {
    data: userAssessmentsResponse,
    isLoading,
    error,
  } = useUserAssessments(filters);
  const userAssessments = userAssessmentsResponse?.items?.data || [];

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

  const getLeaderTier = (totalScore: number) => {
    if (totalScore >= 500)
      return {
        tier: 'Advanced',
        color: 'text-purple-600',
        bg: 'bg-purple-100',
      };
    if (totalScore >= 400)
      return {
        tier: 'Intermediate',
        color: 'text-blue-600',
        bg: 'bg-blue-100',
      };
    if (totalScore >= 300)
      return {
        tier: 'Developing',
        color: 'text-green-600',
        bg: 'bg-green-100',
      };
    return { tier: 'Emerging', color: 'text-orange-600', bg: 'bg-orange-100' };
  };

  const getPrimaryGiftColor = (gift: string) => {
    const colors: Record<string, string> = {
      apostolic: 'bg-purple-500',
      prophetic: 'bg-red-500',
      evangelistic: 'bg-orange-500',
      shepherding: 'bg-green-500',
      teaching: 'bg-blue-500',
    };
    return colors[gift] || 'bg-gray-500';
  };

  // Filter assessments by search term
  const filteredAssessments = userAssessments.filter(assessment => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      assessment.assessment?.name?.toLowerCase().includes(searchLower) ||
      assessment.assessment?.assessmentType
        ?.toLowerCase()
        .includes(searchLower) ||
      assessment.primaryGift?.toLowerCase().includes(searchLower) ||
      assessment.secondaryGift?.toLowerCase().includes(searchLower)
    );
  });

  // Separate completed and incomplete assessments
  const completedAssessments = filteredAssessments.filter(ua => ua.completedAt);
  const incompleteAssessments = filteredAssessments.filter(
    ua => !ua.completedAt
  );

  if (isLoading) {
    return (
      <div className='max-w-6xl mx-auto p-6'>
        <div className='flex items-center justify-center h-64'>
          <Loader2 className='h-8 w-8 animate-spin' />
          <span className='ml-2'>Loading your assessments...</span>
        </div>
      </div>
    );
  }

  if (error) {
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
          Your Assessment Results
        </h1>
        <p className='text-gray-600'>
          Review your completed assessments and track your development progress.
        </p>
      </div>

      {/* Filters */}
      <Card className='mb-6'>
        <CardHeader>
          <CardTitle className='flex items-center'>
            <Filter className='mr-2 h-5 w-5' />
            Filter Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
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

            {/* Completion Status */}
            <div className='space-y-2'>
              <label className='text-sm font-medium'>Status</label>
              <Select
                value={completedFilter}
                onValueChange={setCompletedFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder='All assessments' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All assessments</SelectItem>
                  <SelectItem value='completed'>Completed only</SelectItem>
                  <SelectItem value='incomplete'>Incomplete only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      {completedAssessments.length > 0 && (
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8'>
          <Card>
            <CardContent className='p-4'>
              <div className='flex items-center'>
                <CheckCircle className='h-8 w-8 text-green-500 mr-3' />
                <div>
                  <div className='text-2xl font-bold'>
                    {completedAssessments.length}
                  </div>
                  <div className='text-sm text-gray-500'>Completed</div>
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
                    {incompleteAssessments.length}
                  </div>
                  <div className='text-sm text-gray-500'>In Progress</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='p-4'>
              <div className='flex items-center'>
                <Trophy className='h-8 w-8 text-yellow-500 mr-3' />
                <div>
                  <div className='text-2xl font-bold'>
                    {completedAssessments.length > 0
                      ? getLeaderTier(
                          Math.max(
                            ...completedAssessments.map(a => a.totalScore || 0)
                          )
                        ).tier
                      : 'N/A'}
                  </div>
                  <div className='text-sm text-gray-500'>Highest Tier</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='p-4'>
              <div className='flex items-center'>
                <BarChart3 className='h-8 w-8 text-blue-500 mr-3' />
                <div>
                  <div className='text-2xl font-bold'>
                    {completedAssessments.length > 0
                      ? Math.round(
                          completedAssessments.reduce(
                            (sum, a) => sum + (a.totalScore || 0),
                            0
                          ) / completedAssessments.length
                        )
                      : 0}
                  </div>
                  <div className='text-sm text-gray-500'>Average Score</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Completed Assessments */}
      {completedAssessments.length > 0 && (
        <div className='mb-8'>
          <h2 className='text-xl font-semibold text-gray-900 mb-4 flex items-center'>
            <CheckCircle className='h-5 w-5 text-green-500 mr-2' />
            Completed Assessments
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {completedAssessments.map(userAssessment => {
              const leaderTier = getLeaderTier(userAssessment.totalScore || 0);

              return (
                <Card
                  key={userAssessment.id}
                  className='hover:shadow-lg transition-shadow cursor-pointer'
                  onClick={() =>
                    router.push(
                      `/dashboard/assessment/results/${userAssessment.id}`
                    )
                  }
                >
                  <CardHeader>
                    <div className='flex items-start justify-between'>
                      <div className='flex-1'>
                        <CardTitle className='text-lg mb-2'>
                          {userAssessment.assessment?.name ||
                            'Unknown Assessment'}
                        </CardTitle>
                        <div className='flex flex-wrap gap-2 mb-2'>
                          <Badge variant='secondary'>
                            {getAssessmentTypeLabel(
                              userAssessment.assessment?.assessmentType || ''
                            )}
                          </Badge>
                          <Badge
                            className={`${leaderTier.bg} ${leaderTier.color} border-0`}
                          >
                            <Trophy className='h-3 w-3 mr-1' />
                            {leaderTier.tier}
                          </Badge>
                        </div>
                      </div>
                      <CheckCircle className='h-6 w-6 text-green-500' />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-3'>
                      {/* Score */}
                      <div className='text-center'>
                        <div className='text-2xl font-bold text-gray-900'>
                          {userAssessment.totalScore}
                        </div>
                        <div className='text-sm text-gray-500'>
                          out of {userAssessment.maxPossibleScore} points
                        </div>
                      </div>

                      {/* Primary Gifts */}
                      {userAssessment.primaryGift && (
                        <div className='flex items-center justify-center space-x-2'>
                          <div
                            className={`w-6 h-6 ${getPrimaryGiftColor(userAssessment.primaryGift)} rounded-full`}
                          />
                          <span className='text-sm font-medium capitalize'>
                            {userAssessment.primaryGift}
                          </span>
                          {userAssessment.secondaryGift && (
                            <>
                              <span className='text-gray-400'>+</span>
                              <span className='text-sm text-gray-600 capitalize'>
                                {userAssessment.secondaryGift}
                              </span>
                            </>
                          )}
                        </div>
                      )}

                      {/* Completion Info */}
                      <div className='text-center text-sm text-gray-500'>
                        Completed{' '}
                        {new Date(
                          userAssessment.completedAt!
                        ).toLocaleDateString()}
                        {userAssessment.completionTime && (
                          <span>
                            {' '}
                            • {userAssessment.completionTime} minutes
                          </span>
                        )}
                      </div>

                      <Button className='w-full' variant='outline'>
                        View Results
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Incomplete Assessments */}
      {incompleteAssessments.length > 0 && (
        <div className='mb-8'>
          <h2 className='text-xl font-semibold text-gray-900 mb-4 flex items-center'>
            <Clock className='h-5 w-5 text-orange-500 mr-2' />
            In Progress
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {incompleteAssessments.map(userAssessment => (
              <Card
                key={userAssessment.id}
                className='hover:shadow-lg transition-shadow'
              >
                <CardHeader>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <CardTitle className='text-lg mb-2'>
                        {userAssessment.assessment?.name ||
                          'Unknown Assessment'}
                      </CardTitle>
                      <Badge variant='secondary'>
                        {getAssessmentTypeLabel(
                          userAssessment.assessment?.assessmentType || ''
                        )}
                      </Badge>
                    </div>
                    <Clock className='h-6 w-6 text-orange-500' />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='space-y-3'>
                    {/* Progress */}
                    <div className='text-center'>
                      <div className='text-lg font-bold text-gray-900'>
                        {userAssessment.completionPercentage || 0}%
                      </div>
                      <div className='text-sm text-gray-500'>Complete</div>
                    </div>

                    {/* Started Info */}
                    <div className='text-center text-sm text-gray-500'>
                      Started{' '}
                      {new Date(userAssessment.startedAt).toLocaleDateString()}
                    </div>

                    <Button
                      className='w-full'
                      onClick={() =>
                        router.push(
                          `/dashboard/assessment/take/${userAssessment.assessmentId}`
                        )
                      }
                    >
                      Continue Assessment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredAssessments.length === 0 && (
        <Card className='text-center py-12'>
          <CardContent>
            <BarChart3 className='h-12 w-12 text-gray-400 mx-auto mb-4' />
            <h3 className='text-lg font-medium text-gray-900 mb-2'>
              No assessments found
            </h3>
            <p className='text-gray-600 mb-4'>
              {searchTerm || selectedType || completedFilter !== 'all'
                ? 'Try adjusting your filters to find assessments.'
                : "You haven't taken any assessments yet. Start your journey by taking an assessment."}
            </p>
            <div className='flex gap-2 justify-center'>
              {searchTerm || selectedType || completedFilter !== 'all' ? (
                <Button
                  variant='outline'
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedType('');
                    setCompletedFilter('all');
                  }}
                >
                  Clear Filters
                </Button>
              ) : (
                <Button
                  onClick={() => router.push('/dashboard/assessment/select')}
                >
                  Browse Assessments
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      {userAssessments.length > 0 && (
        <Card className='mt-8'>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <Button
                variant='outline'
                onClick={() => router.push('/dashboard/assessment/select')}
                className='h-auto p-4 flex flex-col items-center space-y-2'
              >
                <BookOpen className='h-6 w-6' />
                <span>Take Another Assessment</span>
              </Button>
              <Button
                variant='outline'
                onClick={() => router.push('/dashboard/content')}
                className='h-auto p-4 flex flex-col items-center space-y-2'
              >
                <TrendingUp className='h-6 w-6' />
                <span>Explore Content</span>
              </Button>
              <Button
                variant='outline'
                onClick={() => router.push('/dashboard/activity')}
                className='h-auto p-4 flex flex-col items-center space-y-2'
              >
                <BarChart3 className='h-6 w-6' />
                <span>View Progress</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
