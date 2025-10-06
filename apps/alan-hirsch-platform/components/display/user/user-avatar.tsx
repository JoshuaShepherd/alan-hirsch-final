'use client';

import { UserAvatarProps } from '@/lib/types/component-props';
import { cn } from '@platform/shared/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@platform/ui/avatar';

export function UserAvatar({
  user,
  size = 'md',
  showStatus = false,
  onClick,
  className,
}: UserAvatarProps) {
  const displayName = user.displayName || `${user.firstName} ${user.lastName}`;
  const initials =
    `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();

  // Size configurations
  const sizeConfig = {
    sm: {
      avatar: 'h-6 w-6',
      badge: 'h-2 w-2',
      text: 'text-xs',
    },
    md: {
      avatar: 'h-8 w-8',
      badge: 'h-2 w-2',
      text: 'text-xs',
    },
    lg: {
      avatar: 'h-12 w-12',
      badge: 'h-3 w-3',
      text: 'text-sm',
    },
    xl: {
      avatar: 'h-16 w-16',
      badge: 'h-3 w-3',
      text: 'text-base',
    },
  };

  // Get ministry role color
  const getMinistryRoleColor = (role: string) => {
    const roleColors: Record<string, string> = {
      pastor: 'bg-blue-100 text-blue-800 border-blue-200',
      church_planter: 'bg-purple-100 text-purple-800 border-purple-200',
      missionary: 'bg-green-100 text-green-800 border-green-200',
      evangelist: 'bg-orange-100 text-orange-800 border-orange-200',
      teacher: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      prophet: 'bg-red-100 text-red-800 border-red-200',
      apostle: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      other: 'bg-gray-100 text-gray-800 border-gray-200',
    };
    return (
      roleColors[role.toLowerCase()] ||
      'bg-gray-100 text-gray-800 border-gray-200'
    );
  };

  // Get online status color
  const getOnlineStatusColor = (isActive: boolean) => {
    return isActive ? 'bg-green-500' : 'bg-gray-400';
  };

  const config = sizeConfig[size];

  return (
    <div className={cn('relative inline-block', className)}>
      <Avatar className={config.avatar}>
        <AvatarImage src={user.avatarUrl} alt={displayName} />
        <AvatarFallback className={config.text}>{initials}</AvatarFallback>
      </Avatar>

      {/* Status Indicator */}
      {showStatus && (
        <div
          className={cn(
            'absolute -bottom-0.5 -right-0.5 rounded-full border-2 border-white',
            config.badge,
            getOnlineStatusColor(user.accountStatus === 'active')
          )}
        />
      )}
    </div>
  );
}

// Group avatar component for multiple users
interface UserGroupAvatarProps {
  users: Array<{
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string;
    displayName?: string;
  }>;
  maxVisible?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function UserGroupAvatar({
  users,
  maxVisible = 3,
  size = 'md',
  className,
}: UserGroupAvatarProps) {
  const sizeConfig = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  const visibleUsers = users.slice(0, maxVisible);
  const remainingCount = Math.max(0, users.length - maxVisible);

  return (
    <div className={cn('flex -space-x-2', className)}>
      {visibleUsers.map((user, index) => {
        const displayName =
          user.displayName || `${user.firstName} ${user.lastName}`;
        const initials =
          `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();

        return (
          <Avatar
            key={user.id}
            className={cn(sizeConfig[size], 'border-2 border-white')}
          >
            <AvatarImage src={user.avatarUrl} alt={displayName} />
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
        );
      })}

      {remainingCount > 0 && (
        <Avatar
          className={cn(sizeConfig[size], 'border-2 border-white bg-muted')}
        >
          <AvatarFallback className="text-xs">+{remainingCount}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
