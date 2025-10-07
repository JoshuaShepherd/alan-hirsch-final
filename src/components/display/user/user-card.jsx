'use client';
import { userCardPropsSchema, validateComponentProps, } from '@/lib/types/component-props';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/lib/ui/avatar';
import { Badge } from '@/lib/ui/badge';
import { Button } from '@/lib/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/lib/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from '@/lib/ui/dropdown-menu';
import { Award, Calendar, Edit, Eye, Globe, Mail, MapPin, MoreHorizontal, Trash2, Users, } from 'lucide-react';
export function UserCard({ item: user, variant = 'default', showActions = true, showStats = true, showMinistryInfo = true, showAssessmentScores = false, showContactInfo = false, onEdit, onDelete, onView, className, }) {
    // Runtime validation
    const validatedProps = validateComponentProps({
        item: user,
        variant,
        showActions,
        showStats,
        showMinistryInfo,
        showAssessmentScores,
        showContactInfo,
        className,
    }, userCardPropsSchema);
    const displayName = user.displayName || `${user.firstName} ${user.lastName}`;
    const initials = `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();
    // Get status color
    const getStatusColor = (status) => {
        const statusColors = {
            active: 'bg-green-100 text-green-800',
            inactive: 'bg-gray-100 text-gray-800',
            suspended: 'bg-red-100 text-red-800',
            pending_verification: 'bg-yellow-100 text-yellow-800',
        };
        return statusColors[status.toLowerCase()] || 'bg-gray-100 text-gray-800';
    };
    // Get ministry role color
    const getMinistryRoleColor = (role) => {
        const roleColors = {
            pastor: 'bg-blue-100 text-blue-800',
            church_planter: 'bg-purple-100 text-purple-800',
            missionary: 'bg-green-100 text-green-800',
            evangelist: 'bg-orange-100 text-orange-800',
            teacher: 'bg-indigo-100 text-indigo-800',
            prophet: 'bg-red-100 text-red-800',
            apostle: 'bg-yellow-100 text-yellow-800',
            other: 'bg-gray-100 text-gray-800',
        };
        return roleColors[role.toLowerCase()] || 'bg-gray-100 text-gray-800';
    };
    // Get subscription tier color
    const getSubscriptionTierColor = (tier) => {
        const tierColors = {
            free: 'bg-gray-100 text-gray-800',
            individual: 'bg-blue-100 text-blue-800',
            professional: 'bg-purple-100 text-purple-800',
            leader: 'bg-gold-100 text-gold-800',
            institutional: 'bg-green-100 text-green-800',
        };
        return tierColors[tier.toLowerCase()] || 'bg-gray-100 text-gray-800';
    };
    // Render compact variant
    if (variant === 'compact') {
        return (<Card className={cn('p-3', className)}>
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatarUrl} alt={displayName}/>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium truncate">{displayName}</h3>
            <p className="text-xs text-muted-foreground truncate">
              {user.email}
            </p>
            {showMinistryInfo && (<div className="flex items-center space-x-1 mt-1">
                <Badge className={cn('text-xs', getMinistryRoleColor(user.ministryRole))}>
                  {user.ministryRole.replace('_', ' ')}
                </Badge>
                {user.leaderTier && (<Badge variant="outline" className="text-xs">
                    {user.leaderTier}
                  </Badge>)}
              </div>)}
          </div>
          {showActions && (<DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4"/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {onView && (<DropdownMenuItem onClick={() => onView(user)}>
                    <Eye className="mr-2 h-4 w-4"/>
                    View
                  </DropdownMenuItem>)}
                {onEdit && (<DropdownMenuItem onClick={() => onEdit(user)}>
                    <Edit className="mr-2 h-4 w-4"/>
                    Edit
                  </DropdownMenuItem>)}
                {onDelete && (<>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onDelete(user.id)} className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4"/>
                      Delete
                    </DropdownMenuItem>
                  </>)}
              </DropdownMenuContent>
            </DropdownMenu>)}
        </div>
      </Card>);
    }
    // Render minimal variant
    if (variant === 'minimal') {
        return (<div className={cn('p-2 border rounded flex items-center justify-between', className)}>
        <div className="flex items-center space-x-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={user.avatarUrl} alt={displayName}/>
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{displayName}</span>
        </div>
        <Badge className={getStatusColor(user.accountStatus)}>
          {user.accountStatus.replace('_', ' ')}
        </Badge>
      </div>);
    }
    // Render default and detailed variants
    return (<Card className={cn('h-full', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatarUrl} alt={displayName}/>
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold leading-tight">{displayName}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              {variant === 'detailed' && user.bio && (<p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {user.bio}
                </p>)}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(user.accountStatus)}>
              {user.accountStatus.replace('_', ' ')}
            </Badge>
            {showActions && (<DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4"/>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {onView && (<DropdownMenuItem onClick={() => onView(user)}>
                      <Eye className="mr-2 h-4 w-4"/>
                      View Profile
                    </DropdownMenuItem>)}
                  {onEdit && (<DropdownMenuItem onClick={() => onEdit(user)}>
                      <Edit className="mr-2 h-4 w-4"/>
                      Edit
                    </DropdownMenuItem>)}
                  {onDelete && (<>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onDelete(user.id)} className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4"/>
                        Delete
                      </DropdownMenuItem>
                    </>)}
                </DropdownMenuContent>
              </DropdownMenu>)}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        {/* Ministry Information */}
        {showMinistryInfo && (<div className="space-y-2 mb-3">
            <div className="flex items-center space-x-2">
              <Badge className={getMinistryRoleColor(user.ministryRole)}>
                {user.ministryRole.replace('_', ' ')}
              </Badge>
              {user.leaderTier && (<Badge variant="outline">{user.leaderTier}</Badge>)}
              <Badge className={getSubscriptionTierColor(user.subscriptionTier)}>
                {user.subscriptionTier}
              </Badge>
            </div>

            {variant === 'detailed' && (<div className="flex items-center space-x-4 text-sm text-muted-foreground">
                {user.denomination && (<div className="flex items-center space-x-1">
                    <Users className="h-3 w-3"/>
                    <span>{user.denomination}</span>
                  </div>)}
                {user.yearsInMinistry && (<div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3"/>
                    <span>{user.yearsInMinistry} years</span>
                  </div>)}
                {user.countryCode && (<div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3"/>
                    <span>{user.countryCode}</span>
                  </div>)}
              </div>)}
          </div>)}

        {/* Assessment Scores */}
        {showAssessmentScores && user.assessmentTotal && (<div className="space-y-2 mb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Assessment Score</span>
              <span className="text-sm font-bold">
                {user.assessmentTotal}/600
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(user.assessmentTotal / 600) * 100}%` }}/>
            </div>
          </div>)}

        {/* Contact Information */}
        {showContactInfo && variant === 'detailed' && (<div className="space-y-1 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Mail className="h-3 w-3"/>
              <span>{user.email}</span>
            </div>
            {user.organizationName && (<div className="flex items-center space-x-2">
                <Users className="h-3 w-3"/>
                <span>{user.organizationName}</span>
              </div>)}
            {user.platformTitle && (<div className="flex items-center space-x-2">
                <Globe className="h-3 w-3"/>
                <span>{user.platformTitle}</span>
              </div>)}
          </div>)}

        {/* Stats */}
        {showStats && (variant === 'default' || variant === 'detailed') && (<div className="grid grid-cols-3 gap-2 mt-3">
            <div className="text-center">
              <div className="text-sm font-medium">
                {user.yearsInMinistry || 0}
              </div>
              <div className="text-xs text-muted-foreground">Years</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium">
                {user.leaderTier || 'N/A'}
              </div>
              <div className="text-xs text-muted-foreground">Tier</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium">{user.subscriptionTier}</div>
              <div className="text-xs text-muted-foreground">Plan</div>
            </div>
          </div>)}

        {/* Detailed Information */}
        {variant === 'detailed' && (<div className="space-y-2 mt-3">
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="mr-1 h-3 w-3"/>
              Joined {new Date(user.createdAt).toLocaleDateString()}
            </div>
            {user.lastActiveAt && (<div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3"/>
                Last active {new Date(user.lastActiveAt).toLocaleDateString()}
              </div>)}
            {user.onboardingCompleted && (<div className="flex items-center text-xs text-green-600">
                <Award className="mr-1 h-3 w-3"/>
                Onboarding completed
              </div>)}
          </div>)}
      </CardContent>

      {variant === 'detailed' && (onView || onEdit) && (<CardFooter className="pt-3">
          <div className="flex space-x-2 w-full">
            {onView && (<Button variant="outline" size="sm" onClick={() => onView(user)} className="flex-1">
                <Eye className="mr-2 h-4 w-4"/>
                View Profile
              </Button>)}
            {onEdit && (<Button size="sm" onClick={() => onEdit(user)} className="flex-1">
                <Edit className="mr-2 h-4 w-4"/>
                Edit
              </Button>)}
          </div>
        </CardFooter>)}
    </Card>);
}
