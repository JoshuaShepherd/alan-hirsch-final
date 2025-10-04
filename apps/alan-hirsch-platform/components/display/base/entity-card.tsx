'use client';

import { Badge } from '@platform/ui/badge';
import { Button } from '@platform/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@platform/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@platform/ui/dropdown-menu';
import { EntityCardProps } from '@/lib/types/component-props';
import { cn } from '@platform/shared/utils';
import {
  BookOpen,
  Building,
  Calendar,
  Edit,
  Eye,
  MessageSquare,
  MoreHorizontal,
  Star,
  Tag,
  Target,
  Trash2,
  TrendingUp,
  User,
  Users,
} from 'lucide-react';
import React from 'react';

// Generic icon mapping for common entity types
const getEntityIcon = (entityType: string, variant: string = 'default') => {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    user: User,
    organization: Building,
    assessment: Target,
    content: BookOpen,
    community: Users,
    subscription: Star,
    collaboration: TrendingUp,
    post: MessageSquare,
    category: Tag,
    series: BookOpen,
    default: Tag,
  };

  const Icon = iconMap[entityType.toLowerCase()] || iconMap.default;
  return <Icon className="h-4 w-4" />;
};

// Generic stat formatter
const formatStat = (value: number, type: string = 'number'): string => {
  switch (type) {
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value);
    case 'percentage':
      return `${value}%`;
    case 'date':
      return new Date(value).toLocaleDateString();
    case 'compact':
      if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1)}M`;
      }
      if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}K`;
      }
      return value.toString();
    default:
      return value.toLocaleString();
  }
};

export function EntityCard<T extends Record<string, any>>({
  item,
  variant = 'default',
  showActions = true,
  showStats = true,
  onEdit,
  onDelete,
  onView,
  className,
}: EntityCardProps<T>) {
  // Determine entity type from item structure
  const entityType = (() => {
    if ('email' in item && 'firstName' in item) return 'user';
    if ('name' in item && 'organizationType' in item) return 'organization';
    if ('assessmentType' in item && 'questionsCount' in item)
      return 'assessment';
    if ('contentType' in item && 'title' in item) return 'content';
    if ('communityType' in item && 'currentMemberCount' in item)
      return 'community';
    if ('planType' in item && 'priceMonthly' in item) return 'subscription';
    if ('collaborationType' in item && 'leadAuthorId' in item)
      return 'collaboration';
    if ('postType' in item && 'content' in item) return 'post';
    if ('parentId' in item && 'theologicalDiscipline' in item)
      return 'category';
    if ('seriesType' in item && 'totalItems' in item) return 'series';
    return 'default';
  })();

  // Extract common fields with fallbacks
  const title = item.title || item.name || item.displayName || 'Untitled';
  const description = item.description || item.excerpt || item.bio || '';
  const status =
    item.status || item.accountStatus || item.visibility || 'active';
  const createdAt = item.createdAt || item.joinedAt || item.publishedAt;
  const updatedAt = item.updatedAt || item.lastActiveAt;

  // Extract stats based on entity type
  const stats = (() => {
    if (!showStats) return [];

    switch (entityType) {
      case 'user':
        return [
          { label: 'Ministry Years', value: item.yearsInMinistry || 0 },
          { label: 'Leader Tier', value: item.leaderTier || 'N/A' },
          { label: 'Subscription', value: item.subscriptionTier || 'free' },
        ];
      case 'organization':
        return [
          { label: 'Members', value: item.maxUsers || 1 },
          { label: 'Type', value: item.organizationType || 'N/A' },
          { label: 'Status', value: item.status || 'active' },
        ];
      case 'assessment':
        return [
          { label: 'Questions', value: item.questionsCount || 0 },
          { label: 'Duration', value: `${item.estimatedDuration || 0}min` },
          { label: 'Type', value: item.assessmentType || 'N/A' },
        ];
      case 'content':
        return [
          { label: 'Views', value: item.viewCount || 0, type: 'compact' },
          { label: 'Likes', value: item.likeCount || 0, type: 'compact' },
          { label: 'Type', value: item.contentType || 'N/A' },
        ];
      case 'community':
        return [
          {
            label: 'Members',
            value: item.currentMemberCount || 0,
            type: 'compact',
          },
          { label: 'Posts', value: item.totalPostsCount || 0, type: 'compact' },
          { label: 'Type', value: item.communityType || 'N/A' },
        ];
      case 'subscription':
        return [
          { label: 'Price', value: item.priceMonthly || 0, type: 'currency' },
          { label: 'Type', value: item.planType || 'N/A' },
          { label: 'Trial', value: item.trialDays || 0, suffix: ' days' },
        ];
      case 'collaboration':
        return [
          { label: 'Collaborators', value: item.collaborators?.length || 0 },
          { label: 'Status', value: item.status || 'planning' },
          { label: 'Type', value: item.collaborationType || 'N/A' },
        ];
      case 'post':
        return [
          { label: 'Upvotes', value: item.upvotes || 0, type: 'compact' },
          { label: 'Replies', value: item.replyCount || 0, type: 'compact' },
          { label: 'Type', value: item.postType || 'N/A' },
        ];
      default:
        return [];
    }
  })();

  // Get status color
  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      published: 'bg-green-100 text-green-800',
      completed: 'bg-green-100 text-green-800',
      draft: 'bg-yellow-100 text-yellow-800',
      pending: 'bg-yellow-100 text-yellow-800',
      inactive: 'bg-gray-100 text-gray-800',
      archived: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800',
      suspended: 'bg-red-100 text-red-800',
      public: 'bg-blue-100 text-blue-800',
      private: 'bg-purple-100 text-purple-800',
    };
    return statusColors[status.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  // Render compact variant
  if (variant === 'compact') {
    return (
      <Card className={cn('p-3', className)}>
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            {getEntityIcon(entityType, variant)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium truncate">{title}</h3>
            <p className="text-xs text-muted-foreground truncate">
              {description || `${entityType} item`}
            </p>
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
                  <DropdownMenuItem onClick={() => onView(item)}>
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </DropdownMenuItem>
                )}
                {onEdit && (
                  <DropdownMenuItem onClick={() => onEdit(item)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                )}
                {onDelete && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => onDelete(item.id || item.userId)}
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
      <div className={cn('p-2 border rounded', className)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getEntityIcon(entityType, variant)}
            <span className="text-sm font-medium">{title}</span>
          </div>
          <Badge className={getStatusColor(status)}>{status}</Badge>
        </div>
      </div>
    );
  }

  // Render default and detailed variants
  return (
    <Card className={cn('h-full', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            {getEntityIcon(entityType, variant)}
            <div>
              <h3 className="font-semibold leading-tight">{title}</h3>
              {variant === 'detailed' && (
                <p className="text-sm text-muted-foreground mt-1">
                  {description}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(status)}>{status}</Badge>
            {showActions && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {onView && (
                    <DropdownMenuItem onClick={() => onView(item)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                  )}
                  {onEdit && (
                    <DropdownMenuItem onClick={() => onEdit(item)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                  )}
                  {onDelete && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => onDelete(item.id || item.userId)}
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
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        {variant === 'default' && description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        )}

        {stats.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-3">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-sm font-medium">
                  {stat.type === 'currency'
                    ? formatStat(stat.value, 'currency')
                    : stat.type === 'compact'
                      ? formatStat(stat.value, 'compact')
                      : stat.value}
                  {stat.suffix}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {variant === 'detailed' && (
          <div className="space-y-2 mt-3">
            {createdAt && (
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                Created {new Date(createdAt).toLocaleDateString()}
              </div>
            )}
            {updatedAt && updatedAt !== createdAt && (
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                Updated {new Date(updatedAt).toLocaleDateString()}
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
                onClick={() => onView(item)}
                className="flex-1"
              >
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Button>
            )}
            {onEdit && (
              <Button size="sm" onClick={() => onEdit(item)} className="flex-1">
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
