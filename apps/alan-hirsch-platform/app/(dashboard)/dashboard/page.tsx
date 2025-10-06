'use client';

import { useUserProfileAdapter } from '@/hooks';
import { customerPortalAction } from '@platform/shared/payments/actions';
import { Avatar, AvatarFallback, AvatarImage } from '@platform/ui/avatar';
import { Button } from '@platform/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@platform/ui/card';
import { BookOpen, ClipboardList, Loader2, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

interface ActionState {
  error?: string;
  success?: string;
}

function SubscriptionSkeleton() {
  return (
    <Card className="mb-8 h-[140px]">
      <CardHeader>
        <CardTitle>Team Subscription</CardTitle>
      </CardHeader>
    </Card>
  );
}

function ManageSubscription() {
  const { data: userResponse } = useUserProfileAdapter();
  const user = userResponse?.data;

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Subscription</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="mb-4 sm:mb-0">
              <p className="font-medium">
                Current Plan: {user?.subscriptionTier || 'Free'}
              </p>
              <p className="text-sm text-muted-foreground">
                {user?.accountStatus === 'active'
                  ? 'Active account'
                  : user?.accountStatus === 'pending_verification'
                    ? 'Pending verification'
                    : 'Account inactive'}
              </p>
            </div>
            <form action={customerPortalAction}>
              <Button type="submit" variant="outline">
                Manage Subscription
              </Button>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TeamMembersSkeleton() {
  return (
    <Card className="mb-8 h-[140px]">
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="animate-pulse space-y-4 mt-1">
          <div className="flex items-center space-x-4">
            <div className="size-8 rounded-full bg-gray-200"></div>
            <div className="space-y-2">
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
              <div className="h-3 w-14 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ProfileInfo() {
  const { data: userResponse } = useUserProfileAdapter();
  const user = userResponse?.data;

  if (!user) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Loading profile...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage
                src={user.avatarUrl || ''}
                alt={user.displayName || user.firstName}
              />
              <AvatarFallback>
                {(user.displayName || `${user.firstName} ${user.lastName}`)
                  .split(' ')
                  .map((n: string) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">
                {user.displayName || `${user.firstName} ${user.lastName}`}
              </p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <p className="text-sm text-muted-foreground capitalize">
                {user.ministryRole?.replace('_', ' ')}
              </p>
            </div>
          </div>
          {user.organizationName && (
            <div>
              <p className="text-sm font-medium">Organization</p>
              <p className="text-sm text-muted-foreground">
                {user.organizationName}
              </p>
            </div>
          )}
          {user.yearsInMinistry && (
            <div>
              <p className="text-sm font-medium">Years in Ministry</p>
              <p className="text-sm text-muted-foreground">
                {user.yearsInMinistry}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function InviteTeamMemberSkeleton() {
  return (
    <Card className="h-[260px]">
      <CardHeader>
        <CardTitle>Invite Team Member</CardTitle>
      </CardHeader>
    </Card>
  );
}

function AssessmentProgress() {
  const { data: userResponse } = useUserProfileAdapter();
  const user = userResponse?.data;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assessment Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {user?.assessmentTotal ? (
            <div>
              <p className="text-sm font-medium">APEST Assessment Score</p>
              <p className="text-2xl font-bold text-orange-600">
                {user.assessmentTotal}/600
              </p>
              <p className="text-sm text-muted-foreground">
                {user.leaderTier
                  ? `Leader Tier: ${user.leaderTier}`
                  : 'Complete assessment to determine leader tier'}
              </p>
            </div>
          ) : (
            <div>
              <p className="text-sm text-muted-foreground mb-4">
                Complete your APEST assessment to discover your ministry gifts
                and leadership potential.
              </p>
              <Link href="/dashboard/assessment">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Start Assessment
                </Button>
              </Link>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  return (
    <section className="flex-1 p-4 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here&apos;s an overview of your ministry development
          journey.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link href="/dashboard/assessment/select">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <ClipboardList className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Take Assessment</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Discover your APEST ministry gifts and leadership strengths
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/content">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Browse Content</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Read articles, resources, and ministry insights
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/general">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                  <PlusCircle className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Profile</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Update your profile and ministry information
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/activity">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                  <Loader2 className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Activity</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                View your activity and development progress
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile and Subscription */}
        <div className="lg:col-span-1 space-y-6">
          <Suspense fallback={<SubscriptionSkeleton />}>
            <ManageSubscription />
          </Suspense>
          <Suspense fallback={<TeamMembersSkeleton />}>
            <ProfileInfo />
          </Suspense>
        </div>

        {/* Right Column - Assessment Progress and Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <Suspense fallback={<InviteTeamMemberSkeleton />}>
            <AssessmentProgress />
          </Suspense>

          {/* Recent Activity Card */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <ClipboardList className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Assessment Completed</p>
                    <p className="text-xs text-gray-500">
                      APEST Assessment - 2 hours ago
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-green-100 rounded-full">
                    <BookOpen className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Content Read</p>
                    <p className="text-xs text-gray-500">
                      &ldquo;Understanding Your Apostolic Calling&rdquo; -
                      Yesterday
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <PlusCircle className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Profile Updated</p>
                    <p className="text-xs text-gray-500">
                      Ministry role and organization - 3 days ago
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
