'use client';

import { ContentItemCardProps } from '@/lib/types/component-props';
import { cn } from '@platform/shared/utils';
import { Avatar, AvatarFallback } from '@platform/ui/avatar';
import { Badge } from '@platform/ui/badge';
import { Button } from '@platform/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@platform/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@platform/ui/dropdown-menu';
import {
  Bookmark,
  Calendar,
  Clock,
  Edit,
  Eye,
  FileText,
  Headphones,
  Heart,
  Link,
  MessageSquare,
  MoreHorizontal,
  Presentation,
  Tag,
  Trash2,
  User,
  Video,
  Eye as ViewIcon,
} from 'lucide-react';
import React from 'react';

export function ContentItemCard({
  item: content,
  variant = 'default',
  showActions = true,
  showStats = true,
  showAuthor = true,
  showExcerpt = true,
  showTags = true,
  showCategory = true,
  onEdit,
  onDelete,
  onView,
  className,
}: ContentItemCardProps) {
  // Component uses contract-derived types for type safety

  // Get content type icon
  const getContentTypeIcon = (type: string) => {
    const iconMap: Record<
      string,
      React.ComponentType<{ className?: string }>
    > = {
      article: FileText,
      video: Video,
      podcast: Headphones,
      framework: Presentation,
      tool: Tag,
      case_study: FileText,
      interview: Video,
      course_lesson: BookOpen,
    };
    const Icon = iconMap[type.toLowerCase()] || FileText;
    return <Icon className="h-4 w-4" />;
  };

  // Get content type color
  const getContentTypeColor = (type: string) => {
    const typeColors: Record<string, string> = {
      article: 'bg-blue-100 text-blue-800',
      video: 'bg-red-100 text-red-800',
      podcast: 'bg-purple-100 text-purple-800',
      framework: 'bg-green-100 text-green-800',
      tool: 'bg-orange-100 text-orange-800',
      case_study: 'bg-indigo-100 text-indigo-800',
      interview: 'bg-pink-100 text-pink-800',
      course_lesson: 'bg-cyan-100 text-cyan-800',
    };
    return typeColors[type.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  // Get status color
  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-yellow-100 text-yellow-800',
      archived: 'bg-gray-100 text-gray-800',
      under_review: 'bg-blue-100 text-blue-800',
      scheduled: 'bg-purple-100 text-purple-800',
    };
    return statusColors[status.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  // Get format icon
  const getFormatIcon = (format: string) => {
    const formatMap: Record<
      string,
      React.ComponentType<{ className?: string }>
    > = {
      text: FileText,
      video: Video,
      audio: Headphones,
      interactive: Presentation,
      pdf: FileText,
      presentation: Presentation,
    };
    const Icon = formatMap[format.toLowerCase()] || FileText;
    return <Icon className="h-3 w-3" />;
  };

  const contentTypeIcon = getContentTypeIcon(content.contentType);

  // Render compact variant
  if (variant === 'compact') {
    return (
      <Card className={cn('p-3', className)}>
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">{contentTypeIcon}</div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium truncate">{content.title}</h3>
            <p className="text-xs text-muted-foreground truncate">
              {content.contentType.replace('_', ' ')}
            </p>
            <div className="flex items-center space-x-1 mt-1">
              <Badge
                className={cn(
                  'text-xs',
                  getContentTypeColor(content.contentType)
                )}
              >
                {content.contentType.replace('_', ' ')}
              </Badge>
              <Badge className={cn('text-xs', getStatusColor(content.status))}>
                {content.status.replace('_', ' ')}
              </Badge>
            </div>
          </div>
          {showActions && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {onView && (
                  <DropdownMenuItem onClick={() => onView(content)}>
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </DropdownMenuItem>
                )}
                {onEdit && (
                  <DropdownMenuItem onClick={() => onEdit(content)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                )}
                {onDelete && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => onDelete(content.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </Card>
    );
  }

  // Render minimal variant
  if (variant === 'minimal') {
    return (
      <div
        className={cn(
          'p-2 border rounded flex items-center justify-between',
          className
        )}
      >
        <div className="flex items-center space-x-2">
          {contentTypeIcon}
          <span className="text-sm font-medium">{content.title}</span>
        </div>
        <Badge className={getStatusColor(content.status)}>
          {content.status.replace('_', ' ')}
        </Badge>
      </div>
    );
  }

  // Render default and detailed variants
  return (
    <Card className={cn('h-full', className)}>
      {/* Featured Image */}
      {content.featuredImageUrl && variant !== 'compact' && (
        <div className="aspect-video w-full overflow-hidden rounded-t-lg">
          <img
            src={content.featuredImageUrl}
            alt={content.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              {contentTypeIcon}
              <Badge
                className={cn(
                  'text-xs',
                  getContentTypeColor(content.contentType)
                )}
              >
                {content.contentType.replace('_', ' ')}
              </Badge>
              <Badge className={cn('text-xs', getStatusColor(content.status))}>
                {content.status.replace('_', ' ')}
              </Badge>
              <div className="flex items-center text-xs text-muted-foreground">
                {getFormatIcon(content.format)}
                <span className="ml-1">{content.format}</span>
              </div>
            </div>
            <h3 className="font-semibold leading-tight">{content.title}</h3>
            {variant === 'detailed' && content.excerpt && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {content.excerpt}
              </p>
            )}
          </div>
          {showActions && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {onView && (
                  <DropdownMenuItem onClick={() => onView(content)}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                )}
                {onEdit && (
                  <DropdownMenuItem onClick={() => onEdit(content)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                )}
                {onDelete && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => onDelete(content.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        {/* Author Information */}
        {showAuthor && (
          <div className="flex items-center space-x-2 mb-3">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs">
                <User className="h-3 w-3" />
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">
              Author ID: {content.authorId}
            </span>
          </div>
        )}

        {/* Excerpt */}
        {showExcerpt && variant === 'default' && content.excerpt && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {content.excerpt}
          </p>
        )}

        {/* Stats */}
        {showStats && (
          <div className="grid grid-cols-4 gap-2 mb-3">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <ViewIcon className="h-3 w-3 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {content.viewCount || 0}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">Views</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <Heart className="h-3 w-3 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {content.likeCount || 0}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">Likes</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <MessageSquare className="h-3 w-3 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {content.commentCount || 0}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">Comments</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <Bookmark className="h-3 w-3 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {content.bookmarkCount || 0}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">Saves</div>
            </div>
          </div>
        )}

        {/* Tags */}
        {showTags && content.tags && content.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {content.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {content.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{content.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Category */}
        {showCategory && content.primaryCategoryId && (
          <div className="flex items-center space-x-1 mb-3">
            <Tag className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Category: {content.primaryCategoryId}
            </span>
          </div>
        )}

        {/* Additional Information */}
        <div className="space-y-1 text-xs text-muted-foreground">
          {content.wordCount && (
            <div className="flex items-center space-x-1">
              <FileText className="h-3 w-3" />
              <span>{content.wordCount} words</span>
            </div>
          )}
          {content.estimatedReadingTime && (
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{content.estimatedReadingTime} min read</span>
            </div>
          )}
          {content.seriesId && (
            <div className="flex items-center space-x-1">
              <Link className="h-3 w-3" />
              <span>Part of series</span>
            </div>
          )}
        </div>

        {/* Detailed Information */}
        {variant === 'detailed' && (
          <div className="space-y-2 mt-3">
            {content.publishedAt && (
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                Published {new Date(content.publishedAt).toLocaleDateString()}
              </div>
            )}
            {content.scheduledAt && (
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                Scheduled for{' '}
                {new Date(content.scheduledAt).toLocaleDateString()}
              </div>
            )}
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="mr-1 h-3 w-3" />
              Created {new Date(content.createdAt).toLocaleDateString()}
            </div>
            {content.aiEnhanced && (
              <div className="flex items-center text-xs text-blue-600">
                <span className="mr-1">✨</span>
                AI Enhanced
              </div>
            )}
          </div>
        )}
      </CardContent>

      {variant === 'detailed' && (onView || onEdit) && (
        <CardFooter className="pt-3">
          <div className="flex space-x-2 w-full">
            {onView && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onView(content)}
                className="flex-1"
              >
                <Eye className="mr-2 h-4 w-4" />
                View Content
              </Button>
            )}
            {onEdit && (
              <Button
                size="sm"
                onClick={() => onEdit(content)}
                className="flex-1"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
