'use client';

import { cn } from '@/lib/utils';
import { BarChart3, BookOpen, CheckCircle, Grid, Plus } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigationItems = [
  {
    name: 'Library',
    href: '/dashboard/content',
    icon: BookOpen,
    description: 'Browse all content',
  },
  {
    name: 'Create',
    href: '/dashboard/content/new',
    icon: Plus,
    description: 'Create new content',
  },
  {
    name: 'Manage',
    href: '/dashboard/content/manage',
    icon: Grid,
    description: 'Manage content',
  },
  {
    name: 'Approval',
    href: '/dashboard/content/approval',
    icon: CheckCircle,
    description: 'Review and approve',
  },
  {
    name: 'Analytics',
    href: '/dashboard/content/analytics',
    icon: BarChart3,
    description: 'View performance',
  },
];

interface ContentNavigationProps {
  className?: string;
}

export function ContentNavigation({ className }: ContentNavigationProps) {
  const pathname = usePathname();

  return (
    <nav className={cn('flex space-x-1', className)}>
      {navigationItems.map(item => {
        const isActive =
          pathname === item.href ||
          (item.href !== '/dashboard/content' &&
            pathname?.startsWith(item.href));

        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              isActive
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            )}
          >
            <item.icon className='w-4 h-4' />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function ContentNavigationMobile({ className }: ContentNavigationProps) {
  const pathname = usePathname();

  return (
    <div className={cn('flex flex-col space-y-1', className)}>
      {navigationItems.map(item => {
        const isActive =
          pathname === item.href ||
          (item.href !== '/dashboard/content' &&
            pathname?.startsWith(item.href));

        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              isActive
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            )}
          >
            <item.icon className='w-5 h-5' />
            <div>
              <div>{item.name}</div>
              <div className='text-xs text-gray-500'>{item.description}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

