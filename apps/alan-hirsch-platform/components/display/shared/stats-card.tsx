'use client';

import { Badge } from '@platform/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@platform/ui/card';
import { cn } from '@platform/shared/utils';
import { LucideIcon, Minus, TrendingDown, TrendingUp } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
    period: string;
  };
  icon?: LucideIcon;
  loading?: boolean;
  className?: string;
  description?: string;
  format?: 'number' | 'currency' | 'percentage' | 'compact';
}

export function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  loading = false,
  className,
  description,
  format = 'number',
}: StatsCardProps) {
  // Format value based on type
  const formatValue = (val: string | number): string => {
    if (typeof val === 'string') return val;

    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(val);
      case 'percentage':
        return `${val}%`;
      case 'compact':
        if (val >= 1000000) {
          return `${(val / 1000000).toFixed(1)}M`;
        }
        if (val >= 1000) {
          return `${(val / 1000).toFixed(1)}K`;
        }
        return val.toLocaleString();
      default:
        return val.toLocaleString();
    }
  };

  // Get change icon and color
  const getChangeInfo = () => {
    if (!change) return null;

    const { type, value: changeValue } = change;

    switch (type) {
      case 'increase':
        return {
          icon: TrendingUp,
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          text: '+',
        };
      case 'decrease':
        return {
          icon: TrendingDown,
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          text: '-',
        };
      case 'neutral':
        return {
          icon: Minus,
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          text: '',
        };
      default:
        return null;
    }
  };

  const changeInfo = getChangeInfo();

  if (loading) {
    return (
      <Card className={cn('', className)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="h-4 w-24 bg-muted animate-pulse rounded" />
          {Icon && <div className="h-4 w-4 bg-muted animate-pulse rounded" />}
        </CardHeader>
        <CardContent>
          <div className="h-8 w-16 bg-muted animate-pulse rounded mb-2" />
          <div className="h-3 w-20 bg-muted animate-pulse rounded" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatValue(value)}</div>
        {change && changeInfo && (
          <div className="flex items-center space-x-1 mt-1">
            <Badge
              variant="outline"
              className={cn(
                'text-xs px-1 py-0',
                changeInfo.color,
                changeInfo.bgColor
              )}
            >
              <changeInfo.icon className="mr-1 h-3 w-3" />
              {changeInfo.text}
              {Math.abs(change.value)}%
            </Badge>
            <span className="text-xs text-muted-foreground">
              {change.period}
            </span>
          </div>
        )}
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

// Stats grid component
interface StatsGridProps {
  stats: Array<{
    title: string;
    value: string | number;
    change?: {
      value: number;
      type: 'increase' | 'decrease' | 'neutral';
      period: string;
    };
    icon?: LucideIcon;
    description?: string;
    format?: 'number' | 'currency' | 'percentage' | 'compact';
  }>;
  loading?: boolean;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function StatsGrid({
  stats,
  loading = false,
  columns = 4,
  className,
}: StatsGridProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={cn('grid gap-4', gridCols[columns], className)}>
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          icon={stat.icon}
          description={stat.description}
          format={stat.format}
          loading={loading}
        />
      ))}
    </div>
  );
}
