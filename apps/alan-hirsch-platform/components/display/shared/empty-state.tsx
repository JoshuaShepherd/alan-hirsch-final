'use client';

import { Button } from '@platform/ui/button';
import { Card, CardContent } from '@platform/ui/card';
import { cn } from '@platform/shared/utils';
import {
  BookOpen,
  Building,
  FileText,
  LucideIcon,
  MessageSquare,
  Plus,
  Search,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';
import React from 'react';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: LucideIcon | React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
    variant?:
      | 'default'
      | 'outline'
      | 'secondary'
      | 'ghost'
      | 'link'
      | 'destructive';
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
    variant?:
      | 'default'
      | 'outline'
      | 'secondary'
      | 'ghost'
      | 'link'
      | 'destructive';
  };
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

// Default icons for common empty states
const getDefaultIcon = (title: string): LucideIcon => {
  const lowerTitle = title.toLowerCase();

  if (lowerTitle.includes('user') || lowerTitle.includes('member'))
    return Users;
  if (lowerTitle.includes('content') || lowerTitle.includes('article'))
    return FileText;
  if (lowerTitle.includes('assessment') || lowerTitle.includes('test'))
    return Target;
  if (lowerTitle.includes('community') || lowerTitle.includes('group'))
    return Users;
  if (lowerTitle.includes('organization') || lowerTitle.includes('company'))
    return Building;
  if (lowerTitle.includes('post') || lowerTitle.includes('message'))
    return MessageSquare;
  if (lowerTitle.includes('series') || lowerTitle.includes('course'))
    return BookOpen;
  if (lowerTitle.includes('analytics') || lowerTitle.includes('stats'))
    return TrendingUp;
  if (lowerTitle.includes('search') || lowerTitle.includes('result'))
    return Search;

  return FileText;
};

export function EmptyState({
  title,
  description,
  icon,
  action,
  secondaryAction,
  className,
  size = 'md',
}: EmptyStateProps) {
  // Size configurations
  const sizeConfig = {
    sm: {
      icon: 'h-8 w-8',
      title: 'text-lg',
      description: 'text-sm',
      padding: 'py-8',
    },
    md: {
      icon: 'h-12 w-12',
      title: 'text-xl',
      description: 'text-sm',
      padding: 'py-12',
    },
    lg: {
      icon: 'h-16 w-16',
      title: 'text-2xl',
      description: 'text-base',
      padding: 'py-16',
    },
  };

  const config = sizeConfig[size];
  const defaultIcon = getDefaultIcon(title);

  // Render icon
  const renderIcon = () => {
    if (React.isValidElement(icon)) {
      return icon;
    }

    const IconComponent = icon || defaultIcon;
    return (
      <IconComponent className={cn(config.icon, 'text-muted-foreground')} />
    );
  };

  return (
    <Card className={cn('w-full', className)}>
      <CardContent
        className={cn(
          'flex flex-col items-center justify-center text-center',
          config.padding
        )}
      >
        <div className="mb-4">{renderIcon()}</div>

        <h3
          className={cn(
            'font-semibold text-muted-foreground mb-2',
            config.title
          )}
        >
          {title}
        </h3>

        {description && (
          <p
            className={cn(
              'text-muted-foreground mb-6 max-w-md',
              config.description
            )}
          >
            {description}
          </p>
        )}

        {(action || secondaryAction) && (
          <div className="flex flex-col sm:flex-row gap-3">
            {action && (
              <Button
                onClick={action.onClick}
                variant={action.variant || 'default'}
                className="min-w-[120px]"
              >
                <Plus className="mr-2 h-4 w-4" />
                {action.label}
              </Button>
            )}
            {secondaryAction && (
              <Button
                onClick={secondaryAction.onClick}
                variant={secondaryAction.variant || 'outline'}
                className="min-w-[120px]"
              >
                {secondaryAction.label}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Predefined empty states for common scenarios
export function EmptyUsersState({
  onCreateUser,
  onImportUsers,
  className,
}: {
  onCreateUser: () => void;
  onImportUsers?: () => void;
  className?: string;
}) {
  return (
    <EmptyState
      title="No users found"
      description="Get started by creating your first user or importing existing users from your system."
      icon={Users}
      action={{
        label: 'Create User',
        onClick: onCreateUser,
      }}
      secondaryAction={
        onImportUsers
          ? {
              label: 'Import Users',
              onClick: onImportUsers,
              variant: 'outline',
            }
          : undefined
      }
      className={className}
    />
  );
}

export function EmptyContentState({
  onCreateContent,
  onImportContent,
  className,
}: {
  onCreateContent: () => void;
  onImportContent?: () => void;
  className?: string;
}) {
  return (
    <EmptyState
      title="No content found"
      description="Start building your content library by creating your first article, video, or resource."
      icon={FileText}
      action={{
        label: 'Create Content',
        onClick: onCreateContent,
      }}
      secondaryAction={
        onImportContent
          ? {
              label: 'Import Content',
              onClick: onImportContent,
              variant: 'outline',
            }
          : undefined
      }
      className={className}
    />
  );
}

export function EmptyAssessmentsState({
  onCreateAssessment,
  onImportAssessment,
  className,
}: {
  onCreateAssessment: () => void;
  onImportAssessment?: () => void;
  className?: string;
}) {
  return (
    <EmptyState
      title="No assessments found"
      description="Create your first assessment to start evaluating your team's strengths and growth areas."
      icon={Target}
      action={{
        label: 'Create Assessment',
        onClick: onCreateAssessment,
      }}
      secondaryAction={
        onImportAssessment
          ? {
              label: 'Import Assessment',
              onClick: onImportAssessment,
              variant: 'outline',
            }
          : undefined
      }
      className={className}
    />
  );
}

export function EmptyCommunitiesState({
  onCreateCommunity,
  onJoinCommunity,
  className,
}: {
  onCreateCommunity: () => void;
  onJoinCommunity?: () => void;
  className?: string;
}) {
  return (
    <EmptyState
      title="No communities found"
      description="Join existing communities or create your own to connect with like-minded individuals."
      icon={Users}
      action={{
        label: 'Create Community',
        onClick: onCreateCommunity,
      }}
      secondaryAction={
        onJoinCommunity
          ? {
              label: 'Browse Communities',
              onClick: onJoinCommunity,
              variant: 'outline',
            }
          : undefined
      }
      className={className}
    />
  );
}

export function EmptyOrganizationsState({
  onCreateOrganization,
  onJoinOrganization,
  className,
}: {
  onCreateOrganization: () => void;
  onJoinOrganization?: () => void;
  className?: string;
}) {
  return (
    <EmptyState
      title="No organizations found"
      description="Create your organization or join an existing one to collaborate with your team."
      icon={Building}
      action={{
        label: 'Create Organization',
        onClick: onCreateOrganization,
      }}
      secondaryAction={
        onJoinOrganization
          ? {
              label: 'Join Organization',
              onClick: onJoinOrganization,
              variant: 'outline',
            }
          : undefined
      }
      className={className}
    />
  );
}

export function EmptySearchResults({
  searchQuery,
  onClearSearch,
  className,
}: {
  searchQuery: string;
  onClearSearch: () => void;
  className?: string;
}) {
  return (
    <EmptyState
      title={`No results for "${searchQuery}"`}
      description="Try adjusting your search terms or filters to find what you're looking for."
      icon={Search}
      action={{
        label: 'Clear Search',
        onClick: onClearSearch,
        variant: 'outline',
      }}
      className={className}
    />
  );
}
