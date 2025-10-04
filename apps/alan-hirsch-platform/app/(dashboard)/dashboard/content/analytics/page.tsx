'use client';

import { Badge } from '@platform/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@platform/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@platform/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@platform/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@platform/ui/tabs';
import { useContentItems } from '@/hooks/useContent';
import {
  Activity,
  BarChart3,
  Bookmark,
  Calendar,
  Clock,
  Eye,
  Heart,
  MessageCircle,
  PieChart,
  Target,
  TrendingUp,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface ContentAnalytics {
  totalContent: number;
  publishedContent: number;
  draftContent: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  totalBookmarks: number;
  totalShares: number;
  averageReadingTime: number;
  topPerformingContent: Array<{
    id: string;
    title: string;
    contentType: string;
    views: number;
    likes: number;
    comments: number;
    engagement: number;
  }>;
  contentByType: Array<{
    type: string;
    count: number;
    views: number;
    engagement: number;
  }>;
  monthlyStats: Array<{
    month: string;
    views: number;
    likes: number;
    comments: number;
    content: number;
  }>;
}

export default function ContentAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('views');
  const [analytics, setAnalytics] = useState<ContentAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { data: contentData } = useContentItems({
    page: 1,
    limit: 100,
    status: 'published',
  });

  useEffect(() => {
    // Simulate analytics calculation
    const calculateAnalytics = () => {
      const contentItems = contentData || [];
      const totalContent = contentItems.length;
      const publishedContent = contentItems.filter(
        (item: any) => item.status === 'published'
      ).length;
      const draftContent = contentItems.filter(
        (item: any) => item.status === 'draft'
      ).length;

      const totalViews = contentItems.reduce(
        (sum, item) => sum + (item.viewCount || 0),
        0
      );
      const totalLikes = contentItems.reduce(
        (sum, item) => sum + (item.likeCount || 0),
        0
      );
      const totalComments = contentItems.reduce(
        (sum, item) => sum + (item.commentCount || 0),
        0
      );
      const totalBookmarks = contentItems.reduce(
        (sum, item) => sum + (item.bookmarkCount || 0),
        0
      );
      const totalShares = contentItems.reduce(
        (sum, item) => sum + (item.shareCount || 0),
        0
      );
      const averageReadingTime =
        contentItems.reduce(
          (sum, item) => sum + (item.estimatedReadingTime || 0),
          0
        ) / totalContent || 0;

      // Top performing content
      const topPerformingContent = contentItems
        .map(item => ({
          id: item.id,
          title: item.title,
          contentType: item.contentType,
          views: item.viewCount || 0,
          likes: item.likeCount || 0,
          comments: item.commentCount || 0,
          engagement:
            (((item.likeCount || 0) +
              (item.commentCount || 0) +
              (item.shareCount || 0)) /
              Math.max(item.viewCount || 1, 1)) *
            100,
        }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 10);

      // Content by type
      const contentByTypeMap = new Map();
      contentItems.forEach(item => {
        const existing = contentByTypeMap.get(item.contentType) || {
          type: item.contentType,
          count: 0,
          views: 0,
          engagement: 0,
        };
        existing.count += 1;
        existing.views += item.viewCount || 0;
        existing.engagement +=
          (((item.likeCount || 0) +
            (item.commentCount || 0) +
            (item.shareCount || 0)) /
            Math.max(item.viewCount || 1, 1)) *
          100;
        contentByTypeMap.set(item.contentType, existing);
      });

      const contentByType = Array.from(contentByTypeMap.values()).map(item => ({
        ...item,
        engagement: item.engagement / item.count,
      }));

      // Monthly stats (simplified)
      const monthlyStats = [
        { month: 'Jan', views: 1250, likes: 89, comments: 23, content: 12 },
        { month: 'Feb', views: 1890, likes: 134, comments: 45, content: 15 },
        { month: 'Mar', views: 2150, likes: 167, comments: 67, content: 18 },
        { month: 'Apr', views: 1980, likes: 145, comments: 52, content: 14 },
        { month: 'May', views: 2340, likes: 189, comments: 78, content: 22 },
        { month: 'Jun', views: 2670, likes: 201, comments: 89, content: 25 },
      ];

      setAnalytics({
        totalContent,
        publishedContent,
        draftContent,
        totalViews,
        totalLikes,
        totalComments,
        totalBookmarks,
        totalShares,
        averageReadingTime,
        topPerformingContent,
        contentByType,
        monthlyStats,
      });
      setIsLoading(false);
    };

    if (contentData && contentData.length > 0) {
      calculateAnalytics();
    }
  }, [contentData]);

  if (isLoading) {
    return (
      <div className='max-w-7xl mx-auto p-6'>
        <div className='flex items-center justify-center min-h-[400px]'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4'></div>
            <p>Loading analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className='max-w-7xl mx-auto p-6'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-red-600 mb-4'>
            Error Loading Analytics
          </h1>
          <p className='text-gray-600'>
            Unable to load content analytics data.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto p-6 space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>
            Content Analytics
          </h1>
          <p className='text-lg text-gray-600 mt-2'>
            Track performance and engagement metrics for your content.
          </p>
        </div>
        <div className='flex items-center gap-4'>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className='w-32'>
              <Calendar className='w-4 h-4 mr-2' />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='7d'>Last 7 days</SelectItem>
              <SelectItem value='30d'>Last 30 days</SelectItem>
              <SelectItem value='90d'>Last 90 days</SelectItem>
              <SelectItem value='1y'>Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <Card>
          <CardContent className='pt-6'>
            <div className='flex items-center'>
              <div className='p-2 bg-blue-100 rounded-lg'>
                <Eye className='h-6 w-6 text-blue-600' />
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>Total Views</p>
                <p className='text-2xl font-bold'>
                  {analytics.totalViews.toLocaleString()}
                </p>
                <div className='flex items-center text-sm text-green-600'>
                  <TrendingUp className='w-3 h-3 mr-1' />
                  +12.5%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='pt-6'>
            <div className='flex items-center'>
              <div className='p-2 bg-red-100 rounded-lg'>
                <Heart className='h-6 w-6 text-red-600' />
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>Total Likes</p>
                <p className='text-2xl font-bold'>
                  {analytics.totalLikes.toLocaleString()}
                </p>
                <div className='flex items-center text-sm text-green-600'>
                  <TrendingUp className='w-3 h-3 mr-1' />
                  +8.2%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='pt-6'>
            <div className='flex items-center'>
              <div className='p-2 bg-green-100 rounded-lg'>
                <MessageCircle className='h-6 w-6 text-green-600' />
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>Comments</p>
                <p className='text-2xl font-bold'>
                  {analytics.totalComments.toLocaleString()}
                </p>
                <div className='flex items-center text-sm text-green-600'>
                  <TrendingUp className='w-3 h-3 mr-1' />
                  +15.3%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='pt-6'>
            <div className='flex items-center'>
              <div className='p-2 bg-purple-100 rounded-lg'>
                <Bookmark className='h-6 w-6 text-purple-600' />
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>Bookmarks</p>
                <p className='text-2xl font-bold'>
                  {analytics.totalBookmarks.toLocaleString()}
                </p>
                <div className='flex items-center text-sm text-green-600'>
                  <TrendingUp className='w-3 h-3 mr-1' />
                  +6.7%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Overview */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <Card className='lg:col-span-2'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <BarChart3 className='w-5 h-5' />
              Content Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-2 gap-4'>
              <div className='text-center p-4 bg-gray-50 rounded-lg'>
                <div className='text-2xl font-bold text-blue-600'>
                  {analytics.totalContent}
                </div>
                <div className='text-sm text-gray-600'>Total Content</div>
              </div>
              <div className='text-center p-4 bg-gray-50 rounded-lg'>
                <div className='text-2xl font-bold text-green-600'>
                  {analytics.publishedContent}
                </div>
                <div className='text-sm text-gray-600'>Published</div>
              </div>
              <div className='text-center p-4 bg-gray-50 rounded-lg'>
                <div className='text-2xl font-bold text-orange-600'>
                  {analytics.draftContent}
                </div>
                <div className='text-sm text-gray-600'>Drafts</div>
              </div>
              <div className='text-center p-4 bg-gray-50 rounded-lg'>
                <div className='text-2xl font-bold text-purple-600'>
                  {analytics.averageReadingTime.toFixed(1)}
                </div>
                <div className='text-sm text-gray-600'>
                  Avg. Read Time (min)
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <PieChart className='w-5 h-5' />
              Content by Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              {analytics.contentByType.map(item => (
                <div
                  key={item.type}
                  className='flex items-center justify-between'
                >
                  <div className='flex items-center gap-2'>
                    <div className='w-3 h-3 bg-blue-500 rounded-full'></div>
                    <span className='text-sm font-medium capitalize'>
                      {item.type}
                    </span>
                  </div>
                  <div className='text-right'>
                    <div className='text-sm font-bold'>{item.count}</div>
                    <div className='text-xs text-gray-500'>
                      {item.views} views
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue='performance' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='performance'>Top Performing</TabsTrigger>
          <TabsTrigger value='engagement'>Engagement</TabsTrigger>
          <TabsTrigger value='trends'>Trends</TabsTrigger>
        </TabsList>

        <TabsContent value='performance' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Target className='w-5 h-5' />
                Top Performing Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Content</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Likes</TableHead>
                    <TableHead>Comments</TableHead>
                    <TableHead>Engagement</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analytics.topPerformingContent.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <div className='font-medium'>{item.title}</div>
                          <div className='text-sm text-gray-500'>
                            #{index + 1}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant='secondary'>{item.contentType}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center gap-1'>
                          <Eye className='w-4 h-4 text-gray-500' />
                          {item.views.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center gap-1'>
                          <Heart className='w-4 h-4 text-red-500' />
                          {item.likes}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center gap-1'>
                          <MessageCircle className='w-4 h-4 text-blue-500' />
                          {item.comments}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center gap-1'>
                          <Activity className='w-4 h-4 text-green-500' />
                          {item.engagement.toFixed(1)}%
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='engagement' className='space-y-4'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Activity className='w-5 h-5' />
                  Engagement Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium'>Like Rate</span>
                    <span className='text-lg font-bold'>
                      {(
                        (analytics.totalLikes / analytics.totalViews) *
                        100
                      ).toFixed(2)}
                      %
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium'>Comment Rate</span>
                    <span className='text-lg font-bold'>
                      {(
                        (analytics.totalComments / analytics.totalViews) *
                        100
                      ).toFixed(2)}
                      %
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium'>Bookmark Rate</span>
                    <span className='text-lg font-bold'>
                      {(
                        (analytics.totalBookmarks / analytics.totalViews) *
                        100
                      ).toFixed(2)}
                      %
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium'>Share Rate</span>
                    <span className='text-lg font-bold'>
                      {(
                        (analytics.totalShares / analytics.totalViews) *
                        100
                      ).toFixed(2)}
                      %
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Clock className='w-5 h-5' />
                  Reading Behavior
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium'>
                      Average Reading Time
                    </span>
                    <span className='text-lg font-bold'>
                      {analytics.averageReadingTime.toFixed(1)} min
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium'>
                      Total Reading Time
                    </span>
                    <span className='text-lg font-bold'>
                      {Math.round(
                        analytics.totalViews * analytics.averageReadingTime
                      ).toLocaleString()}{' '}
                      min
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium'>
                      Content Completion Rate
                    </span>
                    <span className='text-lg font-bold'>78.5%</span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium'>Bounce Rate</span>
                    <span className='text-lg font-bold'>21.5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value='trends' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <TrendingUp className='w-5 h-5' />
                Monthly Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Likes</TableHead>
                    <TableHead>Comments</TableHead>
                    <TableHead>New Content</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analytics.monthlyStats.map(stat => (
                    <TableRow key={stat.month}>
                      <TableCell className='font-medium'>
                        {stat.month}
                      </TableCell>
                      <TableCell>{stat.views.toLocaleString()}</TableCell>
                      <TableCell>{stat.likes}</TableCell>
                      <TableCell>{stat.comments}</TableCell>
                      <TableCell>{stat.content}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
