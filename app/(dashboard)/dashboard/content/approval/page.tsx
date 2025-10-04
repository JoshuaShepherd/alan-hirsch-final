'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useContentItems } from '@/hooks/useContent';
import { createClient } from '@/lib/supabase/client';
import { format } from 'date-fns';
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  Filter,
  MessageSquare,
  Search,
  TrendingUp,
  User,
  XCircle,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface ReviewComment {
  id: string;
  contentId: string;
  reviewerId: string;
  reviewerName: string;
  comment: string;
  action: 'approve' | 'request_changes' | 'reject';
  createdAt: string;
}

export default function ContentApprovalPage() {
  const supabase = createClient();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedContentId, setSelectedContentId] = useState<string | null>(
    null
  );
  const [reviewComment, setReviewComment] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('under_review');

  const {
    data: contentData,
    isLoading,
    error,
  } = useContentItems({
    page: 1,
    limit: 50,
    status: statusFilter,
  });

  const contentItems = contentData || [];

  const handleApprovalAction = async (
    contentId: string,
    action: 'approve' | 'request_changes' | 'reject'
  ) => {
    setIsProcessing(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        toast.error('You must be logged in to perform approval actions');
        return;
      }

      const newStatus =
        action === 'approve'
          ? 'published'
          : action === 'request_changes'
            ? 'draft'
            : 'rejected';

      const response = await fetch(`/api/content/${contentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          status: newStatus,
          publishedAt:
            action === 'approve' ? new Date().toISOString() : undefined,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update content status');
      }

      // TODO: Create review comment record
      if (reviewComment.trim()) {
        // Store the review comment
        console.log('Review comment:', reviewComment);
      }

      toast.success(`Content ${action.replace('_', ' ')} successfully`);
      setReviewComment('');
      setSelectedContentId(null);

      // Refresh the content list
      window.location.reload();
    } catch (error) {
      console.error('Error processing approval:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to process approval'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const filteredContent = contentItems.filter((item: any) => {
    const matchesSearch =
      searchTerm === '' ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const pendingReview = filteredContent.filter(
    (item: any) => item.status === 'under_review'
  );
  const scheduledContent = filteredContent.filter(
    (item: any) => item.status === 'scheduled'
  );
  const recentActivity = filteredContent.slice(0, 10);

  if (isLoading) {
    return (
      <div className='max-w-7xl mx-auto p-6'>
        <div className='flex items-center justify-center min-h-[400px]'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4'></div>
            <p>Loading content for review...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='max-w-7xl mx-auto p-6'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-red-600 mb-4'>
            Error Loading Content
          </h1>
          <p className='text-gray-600'>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto p-6 space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>Content Approval</h1>
          <p className='text-lg text-gray-600 mt-2'>
            Review and approve content for publication.
          </p>
        </div>
        <div className='flex items-center gap-4'>
          <div className='text-right'>
            <div className='text-2xl font-bold text-blue-600'>
              {pendingReview.length}
            </div>
            <div className='text-sm text-gray-500'>Pending Review</div>
          </div>
          <div className='text-right'>
            <div className='text-2xl font-bold text-green-600'>
              {scheduledContent.length}
            </div>
            <div className='text-sm text-gray-500'>Scheduled</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <Card>
          <CardContent className='pt-6'>
            <div className='flex items-center'>
              <AlertCircle className='h-4 w-4 text-orange-600' />
              <div className='ml-2'>
                <p className='text-sm font-medium text-gray-600'>
                  Pending Review
                </p>
                <p className='text-2xl font-bold'>{pendingReview.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='pt-6'>
            <div className='flex items-center'>
              <Clock className='h-4 w-4 text-blue-600' />
              <div className='ml-2'>
                <p className='text-sm font-medium text-gray-600'>Scheduled</p>
                <p className='text-2xl font-bold'>{scheduledContent.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='pt-6'>
            <div className='flex items-center'>
              <CheckCircle className='h-4 w-4 text-green-600' />
              <div className='ml-2'>
                <p className='text-sm font-medium text-gray-600'>
                  Published Today
                </p>
                <p className='text-2xl font-bold'>0</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='pt-6'>
            <div className='flex items-center'>
              <TrendingUp className='h-4 w-4 text-purple-600' />
              <div className='ml-2'>
                <p className='text-sm font-medium text-gray-600'>
                  Total Content
                </p>
                <p className='text-2xl font-bold'>{contentItems.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className='pt-6'>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='flex-1'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                <Input
                  placeholder='Search content...'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className='pl-10'
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className='w-48'>
                <Filter className='w-4 h-4 mr-2' />
                <SelectValue placeholder='Filter by status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='under_review'>Under Review</SelectItem>
                <SelectItem value='scheduled'>Scheduled</SelectItem>
                <SelectItem value='draft'>Draft</SelectItem>
                <SelectItem value='published'>Published</SelectItem>
                <SelectItem value='all'>All Status</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Content Review Tabs */}
      <Tabs defaultValue='pending' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='pending' className='flex items-center gap-2'>
            <AlertCircle className='w-4 h-4' />
            Pending Review ({pendingReview.length})
          </TabsTrigger>
          <TabsTrigger value='scheduled' className='flex items-center gap-2'>
            <Clock className='w-4 h-4' />
            Scheduled ({scheduledContent.length})
          </TabsTrigger>
          <TabsTrigger value='activity' className='flex items-center gap-2'>
            <TrendingUp className='w-4 h-4' />
            Recent Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value='pending' className='space-y-4'>
          {pendingReview.length === 0 ? (
            <Card>
              <CardContent className='pt-6'>
                <div className='text-center py-8'>
                  <CheckCircle className='w-12 h-12 text-green-500 mx-auto mb-4' />
                  <h3 className='text-lg font-medium text-gray-900 mb-2'>
                    All caught up!
                  </h3>
                  <p className='text-gray-600'>
                    No content pending review at the moment.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className='space-y-4'>
              {pendingReview.map(item => (
                <Card
                  key={item.id}
                  className='hover:shadow-md transition-shadow'
                >
                  <CardContent className='pt-6'>
                    <div className='flex items-start justify-between'>
                      <div className='flex-1'>
                        <div className='flex items-center gap-2 mb-2'>
                          <h3 className='text-lg font-semibold'>
                            {item.title}
                          </h3>
                          <Badge variant='secondary'>{item.contentType}</Badge>
                          <Badge variant='outline'>Under Review</Badge>
                        </div>

                        <p className='text-gray-600 mb-3 line-clamp-2'>
                          {item.excerpt || 'No excerpt available'}
                        </p>

                        <div className='flex items-center gap-4 text-sm text-gray-500'>
                          <div className='flex items-center gap-1'>
                            <User className='w-4 h-4' />
                            {item.authorId || 'Unknown'}
                          </div>
                          <div className='flex items-center gap-1'>
                            <Calendar className='w-4 h-4' />
                            {format(new Date(item.createdAt), 'MMM dd, yyyy')}
                          </div>
                          <div className='flex items-center gap-1'>
                            <Eye className='w-4 h-4' />
                            {item.viewCount} views
                          </div>
                        </div>
                      </div>

                      <div className='flex items-center gap-2 ml-4'>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() =>
                            window.open(
                              `/dashboard/content/${item.slug}`,
                              '_blank'
                            )
                          }
                        >
                          <Eye className='w-4 h-4' />
                        </Button>
                        <Button
                          variant='default'
                          size='sm'
                          onClick={() =>
                            handleApprovalAction(item.id, 'approve')
                          }
                          disabled={isProcessing}
                        >
                          <CheckCircle className='w-4 h-4 mr-1' />
                          Approve
                        </Button>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() =>
                            handleApprovalAction(item.id, 'request_changes')
                          }
                          disabled={isProcessing}
                        >
                          <AlertCircle className='w-4 h-4 mr-1' />
                          Request Changes
                        </Button>
                        <Button
                          variant='destructive'
                          size='sm'
                          onClick={() =>
                            void handleApprovalAction(item.id, 'reject')
                          }
                          disabled={isProcessing}
                        >
                          <XCircle className='w-4 h-4 mr-1' />
                          Reject
                        </Button>
                      </div>
                    </div>

                    {/* Review Comment Section */}
                    {selectedContentId === item.id && (
                      <div className='mt-4 pt-4 border-t'>
                        <Label htmlFor={`comment-${item.id}`}>
                          Review Comment
                        </Label>
                        <Textarea
                          id={`comment-${item.id}`}
                          value={reviewComment}
                          onChange={e => setReviewComment(e.target.value)}
                          placeholder='Provide feedback for the author...'
                          rows={3}
                          className='mt-1'
                        />
                        <div className='flex gap-2 mt-2'>
                          <Button
                            size='sm'
                            onClick={() => {
                              void handleApprovalAction(item.id, 'approve');
                              setSelectedContentId(null);
                            }}
                            disabled={isProcessing}
                          >
                            Approve & Publish
                          </Button>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => {
                              void handleApprovalAction(
                                item.id,
                                'request_changes'
                              );
                              setSelectedContentId(null);
                            }}
                            disabled={isProcessing}
                          >
                            Request Changes
                          </Button>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => setSelectedContentId(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}

                    {selectedContentId !== item.id && (
                      <div className='mt-3 pt-3 border-t'>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => setSelectedContentId(item.id)}
                        >
                          <MessageSquare className='w-4 h-4 mr-1' />
                          Add Review Comment
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value='scheduled' className='space-y-4'>
          {scheduledContent.length === 0 ? (
            <Card>
              <CardContent className='pt-6'>
                <div className='text-center py-8'>
                  <Clock className='w-12 h-12 text-blue-500 mx-auto mb-4' />
                  <h3 className='text-lg font-medium text-gray-900 mb-2'>
                    No scheduled content
                  </h3>
                  <p className='text-gray-600'>
                    No content is currently scheduled for future publication.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className='space-y-4'>
              {scheduledContent.map(item => (
                <Card
                  key={item.id}
                  className='hover:shadow-md transition-shadow'
                >
                  <CardContent className='pt-6'>
                    <div className='flex items-start justify-between'>
                      <div className='flex-1'>
                        <div className='flex items-center gap-2 mb-2'>
                          <h3 className='text-lg font-semibold'>
                            {item.title}
                          </h3>
                          <Badge variant='secondary'>{item.contentType}</Badge>
                          <Badge
                            variant='outline'
                            className='flex items-center gap-1'
                          >
                            <Clock className='w-3 h-3' />
                            {item.scheduledAt
                              ? format(
                                  new Date(item.scheduledAt),
                                  'MMM dd, yyyy'
                                )
                              : 'Scheduled'}
                          </Badge>
                        </div>

                        <p className='text-gray-600 mb-3 line-clamp-2'>
                          {item.excerpt || 'No excerpt available'}
                        </p>

                        <div className='flex items-center gap-4 text-sm text-gray-500'>
                          <div className='flex items-center gap-1'>
                            <User className='w-4 h-4' />
                            {item.authorId || 'Unknown'}
                          </div>
                          <div className='flex items-center gap-1'>
                            <Calendar className='w-4 h-4' />
                            Scheduled:{' '}
                            {item.scheduledAt
                              ? format(
                                  new Date(item.scheduledAt),
                                  'MMM dd, yyyy HH:mm'
                                )
                              : 'Not set'}
                          </div>
                        </div>
                      </div>

                      <div className='flex items-center gap-2 ml-4'>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() =>
                            window.open(
                              `/dashboard/content/${item.slug}`,
                              '_blank'
                            )
                          }
                        >
                          <Eye className='w-4 h-4' />
                        </Button>
                        <Button
                          variant='default'
                          size='sm'
                          onClick={() =>
                            handleApprovalAction(item.id, 'approve')
                          }
                          disabled={isProcessing}
                        >
                          <CheckCircle className='w-4 h-4 mr-1' />
                          Publish Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value='activity' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Content</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentActivity.map(item => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <div className='font-medium'>{item.title}</div>
                          <div className='text-sm text-gray-500'>
                            {item.contentType}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{item.authorId || 'Unknown'}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            item.status === 'published'
                              ? 'default'
                              : item.status === 'draft'
                                ? 'secondary'
                                : item.status === 'under_review'
                                  ? 'outline'
                                  : item.status === 'scheduled'
                                    ? 'outline'
                                    : 'secondary'
                          }
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {item.publishedAt
                          ? format(new Date(item.publishedAt), 'MMM dd, yyyy')
                          : item.updatedAt
                            ? format(new Date(item.updatedAt), 'MMM dd, yyyy')
                            : format(new Date(item.createdAt), 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() =>
                            window.open(
                              `/dashboard/content/${item.slug}`,
                              '_blank'
                            )
                          }
                        >
                          <Eye className='w-4 h-4' />
                        </Button>
                      </TableCell>
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
