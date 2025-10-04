'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  useAssessmentResponses,
  useUserAssessment,
} from '@/hooks/useAssessment';
import {
  AlertCircle,
  ArrowLeft,
  BarChart3,
  BookOpen,
  CheckCircle,
  Clock,
  Download,
  Heart,
  Lightbulb,
  Loader2,
  Share2,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function AssessmentResultsPage() {
  const params = useParams();
  const router = useRouter();
  const userAssessmentId = params.id as string;

  const {
    data: userAssessmentResponse,
    isLoading,
    error,
  } = useUserAssessment(userAssessmentId);
  const { data: responsesResponse } = useAssessmentResponses(userAssessmentId);

  const userAssessment = userAssessmentResponse?.data;
  const responses = responsesResponse?.data || [];

  const getApestColor = (dimension: string) => {
    const colors: Record<string, string> = {
      apostolic: 'bg-purple-500',
      prophetic: 'bg-red-500',
      evangelistic: 'bg-orange-500',
      shepherding: 'bg-green-500',
      teaching: 'bg-blue-500',
    };
    return colors[dimension] || 'bg-gray-500';
  };

  const getApestIcon = (dimension: string) => {
    const icons: Record<string, any> = {
      apostolic: Zap,
      prophetic: Heart,
      evangelistic: Target,
      shepherding: Users,
      teaching: BookOpen,
    };
    return icons[dimension] || BookOpen;
  };

  const getApestDescription = (dimension: string) => {
    const descriptions: Record<string, string> = {
      apostolic:
        'Pioneering, church planting, and extending the kingdom of God',
      prophetic: 'Hearing from God and speaking truth to power',
      evangelistic: 'Sharing the gospel and reaching the lost',
      shepherding: "Caring for and nurturing God's people",
      teaching: "Understanding and communicating God's truth",
    };
    return descriptions[dimension] || '';
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${userAssessment?.assessment?.name} Results`,
        text: `Check out my assessment results!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Results link copied to clipboard');
    }
  };

  const handleDownload = () => {
    // In a real implementation, this would generate a PDF
    toast.info('Download feature coming soon');
  };

  if (isLoading) {
    return (
      <div className='max-w-6xl mx-auto p-6'>
        <div className='flex items-center justify-center h-64'>
          <Loader2 className='h-8 w-8 animate-spin' />
          <span className='ml-2'>Loading results...</span>
        </div>
      </div>
    );
  }

  if (error || !userAssessment) {
    return (
      <div className='max-w-6xl mx-auto p-6'>
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertDescription>
            Failed to load assessment results. Please try again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!userAssessment.completedAt) {
    return (
      <div className='max-w-6xl mx-auto p-6'>
        <Alert>
          <Clock className='h-4 w-4' />
          <AlertDescription>
            This assessment is not yet completed. Please complete the assessment
            to view results.
          </AlertDescription>
        </Alert>
        <div className='mt-4'>
          <Button
            onClick={() =>
              router.push(
                `/dashboard/assessment/take/${userAssessment.assessmentId}`
              )
            }
          >
            Continue Assessment
          </Button>
        </div>
      </div>
    );
  }

  const apestScores = userAssessment.rawScores || {};
  const normalizedScores = userAssessment.normalizedScores || {};
  const leaderTier = getLeaderTier(userAssessment.totalScore || 0);
  const maxScore = userAssessment.maxPossibleScore || 600;

  // Sort APEST dimensions by score
  const sortedApestScores = Object.entries(apestScores)
    .sort(([, a], [, b]) => b - a)
    .map(([dimension, score]) => ({
      dimension,
      score,
      normalizedScore: normalizedScores[dimension] || 0,
      percentage: (score / (maxScore / 5)) * 100, // Assuming equal distribution across 5 dimensions
    }));

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
            <Button variant='outline' onClick={handleShare}>
              <Share2 className='h-4 w-4 mr-2' />
              Share
            </Button>
            <Button variant='outline' onClick={handleDownload}>
              <Download className='h-4 w-4 mr-2' />
              Download
            </Button>
          </div>
        </div>

        <div className='text-center'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            {userAssessment.assessment?.name} Results
          </h1>
          <p className='text-gray-600 mb-4'>
            Completed on{' '}
            {new Date(userAssessment.completedAt).toLocaleDateString()}
          </p>
          <div className='flex items-center justify-center gap-4'>
            <Badge className={`${leaderTier.bg} ${leaderTier.color} border-0`}>
              <Trophy className='h-4 w-4 mr-1' />
              {leaderTier.tier} Leader
            </Badge>
            <Badge variant='outline'>
              <Clock className='h-4 w-4 mr-1' />
              {userAssessment.completionTime} minutes
            </Badge>
            <Badge variant='outline'>
              <CheckCircle className='h-4 w-4 mr-1' />
              {userAssessment.totalScore}/{maxScore} points
            </Badge>
          </div>
        </div>
      </div>

      <Tabs defaultValue='overview' className='space-y-6'>
        <TabsList className='grid w-full grid-cols-4'>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          <TabsTrigger value='apest'>APEST Profile</TabsTrigger>
          <TabsTrigger value='insights'>Insights</TabsTrigger>
          <TabsTrigger value='recommendations'>Recommendations</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value='overview' className='space-y-6'>
          {/* Overall Score */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <BarChart3 className='h-5 w-5 mr-2' />
                Overall Assessment Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-center space-y-4'>
                <div className='text-4xl font-bold text-gray-900'>
                  {userAssessment.totalScore}
                </div>
                <div className='text-lg text-gray-600'>
                  out of {maxScore} possible points
                </div>
                <Progress
                  value={(userAssessment.totalScore / maxScore) * 100}
                  className='w-full max-w-md mx-auto'
                />
                <div className='text-sm text-gray-500'>
                  {Math.round((userAssessment.totalScore / maxScore) * 100)}% of
                  maximum score
                </div>
              </div>
            </CardContent>
          </Card>

          {/* APEST Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Your APEST Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
                {sortedApestScores.map(({ dimension, score, percentage }) => {
                  const Icon = getApestIcon(dimension);
                  const color = getApestColor(dimension);

                  return (
                    <div key={dimension} className='text-center space-y-2'>
                      <div
                        className={`w-12 h-12 ${color} rounded-full flex items-center justify-center mx-auto`}
                      >
                        <Icon className='h-6 w-6 text-white' />
                      </div>
                      <div className='text-sm font-medium capitalize'>
                        {dimension}
                      </div>
                      <div className='text-lg font-bold'>{score}</div>
                      <Progress value={percentage} className='h-2' />
                      <div className='text-xs text-gray-500'>
                        {Math.round(percentage)}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Primary Gifts */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <Star className='h-5 w-5 mr-2 text-yellow-500' />
                  Primary Gift
                </CardTitle>
              </CardHeader>
              <CardContent>
                {userAssessment.primaryGift && (
                  <div className='text-center space-y-2'>
                    <div
                      className={`w-16 h-16 ${getApestColor(userAssessment.primaryGift)} rounded-full flex items-center justify-center mx-auto`}
                    >
                      {(() => {
                        const Icon = getApestIcon(userAssessment.primaryGift);
                        return <Icon className='h-8 w-8 text-white' />;
                      })()}
                    </div>
                    <div className='text-xl font-bold capitalize'>
                      {userAssessment.primaryGift}
                    </div>
                    <div className='text-sm text-gray-600'>
                      {getApestDescription(userAssessment.primaryGift)}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <TrendingUp className='h-5 w-5 mr-2 text-blue-500' />
                  Secondary Gift
                </CardTitle>
              </CardHeader>
              <CardContent>
                {userAssessment.secondaryGift && (
                  <div className='text-center space-y-2'>
                    <div
                      className={`w-16 h-16 ${getApestColor(userAssessment.secondaryGift)} rounded-full flex items-center justify-center mx-auto`}
                    >
                      {(() => {
                        const Icon = getApestIcon(userAssessment.secondaryGift);
                        return <Icon className='h-8 w-8 text-white' />;
                      })()}
                    </div>
                    <div className='text-xl font-bold capitalize'>
                      {userAssessment.secondaryGift}
                    </div>
                    <div className='text-sm text-gray-600'>
                      {getApestDescription(userAssessment.secondaryGift)}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* APEST Profile Tab */}
        <TabsContent value='apest' className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {sortedApestScores.map(({ dimension, score, percentage }) => {
              const Icon = getApestIcon(dimension);
              const color = getApestColor(dimension);

              return (
                <Card key={dimension}>
                  <CardHeader>
                    <CardTitle className='flex items-center'>
                      <div
                        className={`w-8 h-8 ${color} rounded-full flex items-center justify-center mr-3`}
                      >
                        <Icon className='h-4 w-4 text-white' />
                      </div>
                      <span className='capitalize'>{dimension}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-4'>
                      <div className='text-center'>
                        <div className='text-3xl font-bold'>{score}</div>
                        <div className='text-sm text-gray-500'>Raw Score</div>
                      </div>
                      <Progress value={percentage} className='h-3' />
                      <div className='text-sm text-gray-600'>
                        {getApestDescription(dimension)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value='insights' className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Lightbulb className='h-5 w-5 mr-2' />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              {userAssessment.aiInsights ? (
                <div className='prose max-w-none'>
                  <p className='text-gray-700'>{userAssessment.aiInsights}</p>
                </div>
              ) : (
                <p className='text-gray-500 italic'>
                  No AI insights available for this assessment.
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Assessment Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-gray-900'>
                    {userAssessment.completionTime}
                  </div>
                  <div className='text-sm text-gray-500'>
                    Minutes to Complete
                  </div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-gray-900'>
                    {responses.length}
                  </div>
                  <div className='text-sm text-gray-500'>
                    Questions Answered
                  </div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-gray-900'>
                    {userAssessment.responseConsistency
                      ? `${Math.round(userAssessment.responseConsistency * 100)}%`
                      : 'N/A'}
                  </div>
                  <div className='text-sm text-gray-500'>
                    Response Consistency
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value='recommendations' className='space-y-6'>
          {userAssessment.personalizedRecommendations ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center'>
                    <Star className='h-5 w-5 mr-2 text-yellow-500' />
                    Your Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className='space-y-2'>
                    {userAssessment.personalizedRecommendations.strengths.map(
                      (strength, index) => (
                        <li key={index} className='flex items-center'>
                          <CheckCircle className='h-4 w-4 text-green-500 mr-2' />
                          <span className='capitalize'>{strength}</span>
                        </li>
                      )
                    )}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center'>
                    <TrendingUp className='h-5 w-5 mr-2 text-blue-500' />
                    Growth Areas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className='space-y-2'>
                    {userAssessment.personalizedRecommendations.growthAreas.map(
                      (area, index) => (
                        <li key={index} className='flex items-center'>
                          <Target className='h-4 w-4 text-blue-500 mr-2' />
                          <span className='capitalize'>{area}</span>
                        </li>
                      )
                    )}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center'>
                    <Lightbulb className='h-5 w-5 mr-2 text-orange-500' />
                    Action Items
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className='space-y-2'>
                    {userAssessment.personalizedRecommendations.actionItems.map(
                      (item, index) => (
                        <li key={index} className='flex items-center'>
                          <Zap className='h-4 w-4 text-orange-500 mr-2' />
                          <span>{item}</span>
                        </li>
                      )
                    )}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center'>
                    <BookOpen className='h-5 w-5 mr-2 text-green-500' />
                    Recommended Content
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className='space-y-2'>
                    {userAssessment.personalizedRecommendations.contentRecommendations.map(
                      (content, index) => (
                        <li key={index} className='flex items-center'>
                          <BookOpen className='h-4 w-4 text-green-500 mr-2' />
                          <span>{content}</span>
                        </li>
                      )
                    )}
                  </ul>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className='text-center py-8'>
                <Lightbulb className='h-12 w-12 text-gray-400 mx-auto mb-4' />
                <h3 className='text-lg font-medium text-gray-900 mb-2'>
                  No Recommendations Available
                </h3>
                <p className='text-gray-600'>
                  Personalized recommendations are not available for this
                  assessment.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Next Steps */}
      <Card className='mt-8'>
        <CardHeader>
          <CardTitle>What's Next?</CardTitle>
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
              <BookOpen className='h-6 w-6' />
              <span>Explore Content</span>
            </Button>
            <Button
              variant='outline'
              onClick={() => router.push('/dashboard/activity')}
              className='h-auto p-4 flex flex-col items-center space-y-2'
            >
              <TrendingUp className='h-6 w-6' />
              <span>View Progress</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
