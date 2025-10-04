'use client';

import { Badge } from '@platform/ui/badge';
import { Button } from '@platform/ui/button';
import { Calendar } from '@platform/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@platform/ui/card';
import { Label } from '@platform/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@platform/ui/popover';
import { Textarea } from '@platform/ui/textarea';
import type { ContentItemResponse } from '@platform/shared/contracts';
import { createClient } from '@platform/database/supabase/client';
import { cn } from '@platform/shared/utils';
import { format } from 'date-fns';
import {
  AlertCircle,
  CalendarIcon,
  CheckCircle,
  Clock,
  Edit,
  Eye,
  Send,
  XCircle,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface PublishingWorkflowProps {
  content: ContentItemResponse;
  onStatusChange?: (newStatus: string) => void;
  onScheduleChange?: (scheduledAt: Date | null) => void;
}

const statusOptions = [
  {
    value: 'draft',
    label: 'Draft',
    color: 'secondary',
    description: 'Work in progress',
  },
  {
    value: 'under_review',
    label: 'Under Review',
    color: 'outline',
    description: 'Awaiting approval',
  },
  {
    value: 'published',
    label: 'Published',
    color: 'default',
    description: 'Live and visible',
  },
  {
    value: 'scheduled',
    label: 'Scheduled',
    color: 'outline',
    description: 'Will be published later',
  },
  {
    value: 'archived',
    label: 'Archived',
    color: 'secondary',
    description: 'No longer active',
  },
];

const approvalActions = [
  { value: 'approve', label: 'Approve', icon: CheckCircle, color: 'default' },
  {
    value: 'request_changes',
    label: 'Request Changes',
    icon: AlertCircle,
    color: 'outline',
  },
  { value: 'reject', label: 'Reject', icon: XCircle, color: 'destructive' },
];

export function PublishingWorkflow({
  content,
  onStatusChange,
  onScheduleChange,
}: PublishingWorkflowProps) {
  const supabase = createClient();
  const [isUpdating, setIsUpdating] = useState(false);
  const [reviewComment, setReviewComment] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    content.scheduledAt ? new Date(content.scheduledAt) : undefined
  );

  const handleStatusUpdate = async (newStatus: string, comment?: string) => {
    setIsUpdating(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        toast.error('You must be logged in to update content status');
        return;
      }

      const updateData: any = {
        status: newStatus,
        updatedAt: new Date().toISOString(),
      };

      if (newStatus === 'published' && content.status !== 'published') {
        updateData.publishedAt = new Date().toISOString();
      }

      if (newStatus === 'scheduled' && selectedDate) {
        updateData.scheduledAt = selectedDate.toISOString();
      } else if (newStatus !== 'scheduled') {
        updateData.scheduledAt = null;
      }

      const response = await fetch(`/api/content/${content.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update content status');
      }

      // TODO: Send notification to author if status changed
      if (comment) {
        // TODO: Create review comment record
        console.log('Review comment:', comment);
      }

      toast.success(`Content ${newStatus.replace('_', ' ')} successfully`);
      onStatusChange?.(newStatus);
      setReviewComment('');
    } catch (error) {
      console.error('Error updating content status:', error);
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to update content status'
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const handleScheduleUpdate = async (date: Date | undefined) => {
    if (!date) return;

    setSelectedDate(date);
    setIsUpdating(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        toast.error('You must be logged in to schedule content');
        return;
      }

      const response = await fetch(`/api/content/${content.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          scheduledAt: date.toISOString(),
          status: 'scheduled',
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to schedule content');
      }

      toast.success(`Content scheduled for ${format(date, 'PPP')}`);
      onScheduleChange?.(date);
    } catch (error) {
      console.error('Error scheduling content:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to schedule content'
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const currentStatus = statusOptions.find(s => s.value === content.status);
  const canApprove = content.status === 'under_review';
  const canSchedule = ['draft', 'under_review'].includes(content.status);
  const canPublish = ['draft', 'under_review'].includes(content.status);

  return (
    <div className='space-y-6'>
      {/* Current Status */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Clock className='w-5 h-5' />
            Publishing Status
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex items-center justify-between'>
            <div>
              <div className='flex items-center gap-2 mb-1'>
                <Badge variant={currentStatus?.color as any}>
                  {currentStatus?.label}
                </Badge>
                {content.scheduledAt && (
                  <Badge variant='outline' className='flex items-center gap-1'>
                    <CalendarIcon className='w-3 h-3' />
                    {format(new Date(content.scheduledAt), 'MMM dd, yyyy')}
                  </Badge>
                )}
              </div>
              <p className='text-sm text-gray-600'>
                {currentStatus?.description}
              </p>
            </div>
            <div className='text-right text-sm text-gray-500'>
              <div>
                Created: {format(new Date(content.createdAt), 'MMM dd, yyyy')}
              </div>
              {content.publishedAt && (
                <div>
                  Published:{' '}
                  {format(new Date(content.publishedAt), 'MMM dd, yyyy')}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className='flex gap-2 pt-4 border-t'>
            {canPublish && (
              <Button
                onClick={() => handleStatusUpdate('published')}
                disabled={isUpdating}
                size='sm'
              >
                <CheckCircle className='w-4 h-4 mr-1' />
                Publish Now
              </Button>
            )}

            {canApprove && (
              <>
                {approvalActions.map(action => (
                  <Button
                    key={action.value}
                    variant={action.color as any}
                    size='sm'
                    onClick={() =>
                      handleStatusUpdate(
                        action.value === 'approve' ? 'published' : action.value
                      )
                    }
                    disabled={isUpdating}
                  >
                    <action.icon className='w-4 h-4 mr-1' />
                    {action.label}
                  </Button>
                ))}
              </>
            )}

            {content.status === 'published' && (
              <Button
                variant='outline'
                size='sm'
                onClick={() => handleStatusUpdate('archived')}
                disabled={isUpdating}
              >
                <XCircle className='w-4 h-4 mr-1' />
                Archive
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Scheduling */}
      {canSchedule && (
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <CalendarIcon className='w-5 h-5' />
              Schedule Publishing
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center gap-4'>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    className={cn(
                      'w-64 justify-start text-left font-normal',
                      !selectedDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Calendar
                    mode='single'
                    selected={selectedDate}
                    onSelect={handleScheduleUpdate}
                    disabled={date => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              {selectedDate && (
                <Button
                  onClick={() => handleStatusUpdate('scheduled')}
                  disabled={isUpdating}
                  size='sm'
                >
                  <Send className='w-4 h-4 mr-1' />
                  Schedule
                </Button>
              )}
            </div>

            <p className='text-sm text-gray-600'>
              Select a future date to schedule automatic publishing.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Review Comments */}
      {canApprove && (
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <AlertCircle className='w-5 h-5' />
              Review & Feedback
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <Label htmlFor='review-comment'>Add Review Comment</Label>
              <Textarea
                id='review-comment'
                value={reviewComment}
                onChange={e => setReviewComment(e.target.value)}
                placeholder='Provide feedback for the author...'
                rows={3}
              />
            </div>

            <div className='flex gap-2'>
              <Button
                variant='default'
                size='sm'
                onClick={() => handleStatusUpdate('published', reviewComment)}
                disabled={isUpdating || !reviewComment.trim()}
              >
                <CheckCircle className='w-4 h-4 mr-1' />
                Approve & Publish
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() =>
                  handleStatusUpdate('request_changes', reviewComment)
                }
                disabled={isUpdating || !reviewComment.trim()}
              >
                <Edit className='w-4 h-4 mr-1' />
                Request Changes
              </Button>
              <Button
                variant='destructive'
                size='sm'
                onClick={() => handleStatusUpdate('reject', reviewComment)}
                disabled={isUpdating || !reviewComment.trim()}
              >
                <XCircle className='w-4 h-4 mr-1' />
                Reject
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Publishing History */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Eye className='w-5 h-5' />
            Publishing History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-3'>
            <div className='flex items-center justify-between text-sm'>
              <span className='text-gray-600'>Created</span>
              <span>
                {format(new Date(content.createdAt), 'MMM dd, yyyy HH:mm')}
              </span>
            </div>

            {content.updatedAt !== content.createdAt && (
              <div className='flex items-center justify-between text-sm'>
                <span className='text-gray-600'>Last Updated</span>
                <span>
                  {format(new Date(content.updatedAt), 'MMM dd, yyyy HH:mm')}
                </span>
              </div>
            )}

            {content.publishedAt && (
              <div className='flex items-center justify-between text-sm'>
                <span className='text-gray-600'>Published</span>
                <span>
                  {format(new Date(content.publishedAt), 'MMM dd, yyyy HH:mm')}
                </span>
              </div>
            )}

            {content.scheduledAt && (
              <div className='flex items-center justify-between text-sm'>
                <span className='text-gray-600'>Scheduled</span>
                <span>
                  {format(new Date(content.scheduledAt), 'MMM dd, yyyy HH:mm')}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

