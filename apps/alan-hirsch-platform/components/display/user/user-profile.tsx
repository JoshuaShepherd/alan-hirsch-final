'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@platform/ui/avatar';
import { Badge } from '@platform/ui/badge';
import { Button } from '@platform/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@platform/ui/card';
import { Separator } from '@platform/ui/separator';
import { UserProfileProps } from '@/lib/types/component-props';
import { cn } from '@platform/shared/utils';
import {
  AlertCircle,
  Building,
  Calendar,
  CheckCircle,
  Clock,
  Edit,
  Globe,
  Mail,
  MapPin,
  Users,
  XCircle,
} from 'lucide-react';

export function UserProfile({
  data: user,
  isLoading = false,
  error = null,
  showFullProfile = true,
  showAssessmentResults = true,
  showCommunityActivity = false,
  showCollaborationHistory = false,
  onEdit,
  onDelete,
  onView,
  className,
}: UserProfileProps) {
  const displayName = user.displayName || `${user.firstName} ${user.lastName}`;
  const initials =
    `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();

  // Get status color and icon
  const getStatusInfo = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return { color: 'bg-green-100 text-green-800', icon: CheckCircle };
      case 'inactive':
        return { color: 'bg-gray-100 text-gray-800', icon: XCircle };
      case 'suspended':
        return { color: 'bg-red-100 text-red-800', icon: AlertCircle };
      case 'pending_verification':
        return { color: 'bg-yellow-100 text-yellow-800', icon: Clock };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: AlertCircle };
    }
  };

  // Get ministry role color
  const getMinistryRoleColor = (role: string) => {
    const roleColors: Record<string, string> = {
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
  const getSubscriptionTierColor = (tier: string) => {
    const tierColors: Record<string, string> = {
      free: 'bg-gray-100 text-gray-800',
      individual: 'bg-blue-100 text-blue-800',
      professional: 'bg-purple-100 text-purple-800',
      leader: 'bg-gold-100 text-gold-800',
      institutional: 'bg-green-100 text-green-800',
    };
    return tierColors[tier.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  const statusInfo = getStatusInfo(user.accountStatus);

  return (
    <div className={cn('space-y-6', className)}>
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.avatarUrl} alt={displayName} />
                <AvatarFallback className="text-lg">{initials}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{displayName}</h1>
                <p className="text-muted-foreground">{user.email}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge
                    className={cn(
                      'text-sm',
                      getMinistryRoleColor(user.ministryRole)
                    )}
                  >
                    {user.ministryRole.replace('_', ' ')}
                  </Badge>
                  {user.leaderTier && (
                    <Badge variant="outline">{user.leaderTier}</Badge>
                  )}
                  <Badge
                    className={cn(
                      'text-sm',
                      getSubscriptionTierColor(user.subscriptionTier)
                    )}
                  >
                    {user.subscriptionTier}
                  </Badge>
                  <Badge className={cn('text-sm', statusInfo.color)}>
                    <statusInfo.icon className="mr-1 h-3 w-3" />
                    {user.accountStatus.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            </div>
            {onEdit && (
              <Button onClick={() => onEdit(user)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bio */}
          {user.bio && (
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{user.bio}</p>
              </CardContent>
            </Card>
          )}

          {/* Ministry Information */}
          <Card>
            <CardHeader>
              <CardTitle>Ministry Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Building className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Organization</p>
                    <p className="text-sm text-muted-foreground">
                      {user.organizationName || 'Not specified'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Denomination</p>
                    <p className="text-sm text-muted-foreground">
                      {user.denomination || 'Not specified'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Years in Ministry</p>
                    <p className="text-sm text-muted-foreground">
                      {user.yearsInMinistry || 'Not specified'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">
                      {user.countryCode || 'Not specified'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assessment Results */}
          {showAssessmentResults &&
            (user.assessmentTotal || user.assessmentMovementAlignment) && (
              <Card>
                <CardHeader>
                  <CardTitle>Assessment Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {user.assessmentTotal && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Overall Score
                        </span>
                        <span className="text-sm font-bold">
                          {user.assessmentTotal}/600
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-blue-600 h-3 rounded-full"
                          style={{
                            width: `${(user.assessmentTotal / 600) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {user.assessmentMovementAlignment && (
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {user.assessmentMovementAlignment}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Movement Alignment
                        </div>
                      </div>
                    )}
                    {user.assessmentAudienceEngagement && (
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {user.assessmentAudienceEngagement}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Audience Engagement
                        </div>
                      </div>
                    )}
                    {user.assessmentContentReadiness && (
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {user.assessmentContentReadiness}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Content Readiness
                        </div>
                      </div>
                    )}
                    {user.assessmentRevenuePotential && (
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {user.assessmentRevenuePotential}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Revenue Potential
                        </div>
                      </div>
                    )}
                    {user.assessmentNetworkEffects && (
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {user.assessmentNetworkEffects}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Network Effects
                        </div>
                      </div>
                    )}
                    {user.assessmentStrategicFit && (
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {user.assessmentStrategicFit}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Strategic Fit
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

          {/* Platform Configuration */}
          {showFullProfile && (user.platformTitle || user.subdomain) && (
            <Card>
              <CardHeader>
                <CardTitle>Platform Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user.platformTitle && (
                    <div className="flex items-center space-x-3">
                      <Globe className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Platform Title</p>
                        <p className="text-sm text-muted-foreground">
                          {user.platformTitle}
                        </p>
                      </div>
                    </div>
                  )}
                  {user.subdomain && (
                    <div className="flex items-center space-x-3">
                      <Globe className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Subdomain</p>
                        <p className="text-sm text-muted-foreground">
                          {user.subdomain}
                        </p>
                      </div>
                    </div>
                  )}
                  {user.customDomain && (
                    <div className="flex items-center space-x-3">
                      <Globe className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Custom Domain</p>
                        <p className="text-sm text-muted-foreground">
                          {user.customDomain}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.email}</span>
              </div>
              {user.timezone && (
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.timezone}</span>
                </div>
              )}
              {user.languagePrimary && (
                <div className="flex items-center space-x-3">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.languagePrimary}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Account Status */}
          <Card>
            <CardHeader>
              <CardTitle>Account Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Onboarding</span>
                <Badge
                  className={
                    user.onboardingCompleted
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }
                >
                  {user.onboardingCompleted ? 'Completed' : 'In Progress'}
                </Badge>
              </div>
              {!user.onboardingCompleted && (
                <div className="flex items-center justify-between">
                  <span className="text-sm">Step</span>
                  <span className="text-sm font-medium">
                    {user.onboardingStep}/10
                  </span>
                </div>
              )}
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm">Last Active</span>
                <span className="text-sm text-muted-foreground">
                  {new Date(user.lastActiveAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Member Since</span>
                <span className="text-sm text-muted-foreground">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Theological Focus */}
          {user.theologicalFocus && user.theologicalFocus.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Theological Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {user.theologicalFocus.map((focus, index) => (
                    <Badge key={index} variant="outline">
                      {focus}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Privacy Settings */}
          {showFullProfile && (
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Public Profile</span>
                  <Badge
                    className={
                      user.privacySettings.publicProfile
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }
                  >
                    {user.privacySettings.publicProfile ? 'Public' : 'Private'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Show Assessment Results</span>
                  <Badge
                    className={
                      user.privacySettings.showAssessmentResults
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }
                  >
                    {user.privacySettings.showAssessmentResults ? 'Yes' : 'No'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Allow Networking</span>
                  <Badge
                    className={
                      user.privacySettings.allowNetworking
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }
                  >
                    {user.privacySettings.allowNetworking ? 'Yes' : 'No'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Share Analytics</span>
                  <Badge
                    className={
                      user.privacySettings.shareAnalytics
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }
                  >
                    {user.privacySettings.shareAnalytics ? 'Yes' : 'No'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
