'use client';

import { UserListProps } from '@/lib/types/component-props';
import { cn } from '@platform/shared/utils';
import { Badge } from '@platform/ui/badge';
import { MapPin, Users } from 'lucide-react';
import { EntityGrid } from '../base/entity-list';
import { LoadingSkeleton } from '../base/loading-skeleton';
import { UserAvatar } from './user-avatar';
import { UserCard } from './user-card';

export function UserList({
  data: users,
  isLoading = false,
  error = null,
  pagination,
  onPageChange,
  onEdit,
  onDelete,
  onView,
  className,
}: UserListProps) {
  // Render user card
  const renderUserCard = (user: (typeof users)[0], index: number) => (
    <UserCard
      key={user.id}
      item={user}
      variant="default"
      showActions={true}
      showMinistryInfo={true}
      onEdit={onEdit}
      onDelete={onDelete}
      onView={onView}
    />
  );

  // Render user list item for table view
  const renderUserListItem = (user: (typeof users)[0], index: number) => (
    <div
      key={user.id}
      className="flex items-center space-x-4 p-4 border-b hover:bg-muted/50 cursor-pointer"
      onClick={() => onView?.(user)}
    >
      <UserAvatar user={user} size="md" showStatus={true} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <h3 className="font-medium truncate">
            {user.displayName || `${user.firstName} ${user.lastName}`}
          </h3>
          <Badge variant="outline" className="text-xs">
            {user.ministryRole.replace('_', ' ')}
          </Badge>
          {user.leaderTier && (
            <Badge variant="secondary" className="text-xs">
              {user.leaderTier}
            </Badge>
          )}
        </div>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
          <span>{user.email}</span>
          {user.denomination && (
            <div className="flex items-center space-x-1">
              <Users className="h-3 w-3" />
              <span>{user.denomination}</span>
            </div>
          )}
          {user.countryCode && (
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span>{user.countryCode}</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Badge
          className={cn(
            'text-xs',
            user.accountStatus === 'active'
              ? 'bg-green-100 text-green-800'
              : user.accountStatus === 'inactive'
                ? 'bg-gray-100 text-gray-800'
                : user.accountStatus === 'suspended'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
          )}
        >
          {user.accountStatus.replace('_', ' ')}
        </Badge>
        {user.subscriptionTier !== 'free' && (
          <Badge variant="outline" className="text-xs">
            {user.subscriptionTier}
          </Badge>
        )}
      </div>
    </div>
  );

  // Table columns for data table view
  const tableColumns = [
    {
      key: 'name' as keyof (typeof users)[0],
      label: 'Name',
      render: (user: (typeof users)[0]) => (
        <div className="flex items-center space-x-3">
          <UserAvatar user={user} size="sm" />
          <div>
            <div className="font-medium">
              {user.displayName || `${user.firstName} ${user.lastName}`}
            </div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'ministryRole' as keyof (typeof users)[0],
      label: 'Role',
      render: (user: (typeof users)[0]) => (
        <div className="flex items-center space-x-1">
          <Badge variant="outline" className="text-xs">
            {user.ministryRole.replace('_', ' ')}
          </Badge>
          {user.leaderTier && (
            <Badge variant="secondary" className="text-xs">
              {user.leaderTier}
            </Badge>
          )}
        </div>
      ),
    },
    {
      key: 'denomination' as keyof (typeof users)[0],
      label: 'Denomination',
      render: (user: (typeof users)[0]) => user.denomination || '-',
    },
    {
      key: 'countryCode' as keyof (typeof users)[0],
      label: 'Location',
      render: (user: (typeof users)[0]) => user.countryCode || '-',
    },
    {
      key: 'subscriptionTier' as keyof (typeof users)[0],
      label: 'Subscription',
      render: (user: (typeof users)[0]) => (
        <Badge
          variant={user.subscriptionTier === 'free' ? 'outline' : 'default'}
          className="text-xs"
        >
          {user.subscriptionTier}
        </Badge>
      ),
    },
    {
      key: 'accountStatus' as keyof (typeof users)[0],
      label: 'Status',
      render: (user: (typeof users)[0]) => (
        <Badge
          className={cn(
            'text-xs',
            user.accountStatus === 'active'
              ? 'bg-green-100 text-green-800'
              : user.accountStatus === 'inactive'
                ? 'bg-gray-100 text-gray-800'
                : user.accountStatus === 'suspended'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
          )}
        >
          {user.accountStatus.replace('_', ' ')}
        </Badge>
      ),
    },
    {
      key: 'createdAt' as keyof (typeof users)[0],
      label: 'Joined',
      render: (user: (typeof users)[0]) =>
        new Date(user.createdAt).toLocaleDateString(),
    },
  ];

  // Loading state
  if (isLoading) {
    return (
      <div className={className}>
        <LoadingSkeleton type="card" count={6} />
      </div>
    );
  }

  // Empty state
  if (users.length === 0) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center py-12 text-center',
          className
        )}
      >
        <Users className="h-12 w-12 text-muted-foreground mb-4" />
        <div className="text-muted-foreground">
          <h3 className="text-lg font-semibold">No users found</h3>
          <p className="text-sm">No users are available at this time.</p>
        </div>
      </div>
    );
  }

  // Filter options
  const filterOptions = [
    {
      key: 'ministryRole',
      label: 'Ministry Role',
      options: [
        { value: 'pastor', label: 'Pastor' },
        { value: 'church_planter', label: 'Church Planter' },
        { value: 'missionary', label: 'Missionary' },
        { value: 'evangelist', label: 'Evangelist' },
        { value: 'teacher', label: 'Teacher' },
        { value: 'prophet', label: 'Prophet' },
        { value: 'apostle', label: 'Apostle' },
        { value: 'other', label: 'Other' },
      ],
    },
    {
      key: 'subscriptionTier',
      label: 'Subscription',
      options: [
        { value: 'free', label: 'Free' },
        { value: 'individual', label: 'Individual' },
        { value: 'professional', label: 'Professional' },
        { value: 'leader', label: 'Leader' },
        { value: 'institutional', label: 'Institutional' },
      ],
    },
    {
      key: 'accountStatus',
      label: 'Status',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'suspended', label: 'Suspended' },
        { value: 'pending_verification', label: 'Pending Verification' },
      ],
    },
    {
      key: 'leaderTier',
      label: 'Leader Tier',
      options: [
        { value: 'core', label: 'Core' },
        { value: 'network', label: 'Network' },
        { value: 'emerging', label: 'Emerging' },
        { value: 'community', label: 'Community' },
      ],
    },
  ];

  // Render user list
  return (
    <EntityGrid
      items={users}
      renderItem={renderUserCard}
      columns={3}
      className={className}
    />
  );
}
