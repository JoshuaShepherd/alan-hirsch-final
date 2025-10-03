'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { customerPortalAction } from '@/lib/payments/actions';
import { useActionState } from 'react';
import { UserProfile } from '@/validations/auth';
import { useUserProfileAdapter } from '@/hooks';
import { Suspense } from 'react';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Loader2, PlusCircle, BookOpen, ClipboardList } from 'lucide-react';
import Link from 'next/link';

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
              <AvatarImage src={user.avatarUrl || ''} alt={user.displayName || user.firstName} />
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
              <p className="text-sm text-muted-foreground">
                {user.email}
              </p>
              <p className="text-sm text-muted-foreground capitalize">
                {user.ministryRole?.replace('_', ' ')}
              </p>
            </div>
          </div>
          {user.organizationName && (
            <div>
              <p className="text-sm font-medium">Organization</p>
              <p className="text-sm text-muted-foreground">{user.organizationName}</p>
            </div>
          )}
          {user.yearsInMinistry && (
            <div>
              <p className="text-sm font-medium">Years in Ministry</p>
              <p className="text-sm text-muted-foreground">{user.yearsInMinistry}</p>
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
              <p className="text-2xl font-bold text-orange-600">{user.assessmentTotal}/600</p>
              <p className="text-sm text-muted-foreground">
                {user.leaderTier ? `Leader Tier: ${user.leaderTier}` : 'Complete assessment to determine leader tier'}
              </p>
            </div>
          ) : (
            <div>
              <p className="text-sm text-muted-foreground mb-4">
                Complete your APEST assessment to discover your ministry gifts and leadership potential.
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
      <h1 className="text-lg lg:text-2xl font-medium mb-6">Dashboard</h1>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link href="/dashboard/assessment">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <ClipboardList className="h-8 w-8 text-blue-600" />
              <CardTitle className="text-lg">Take Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Discover your APEST ministry gifts
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/content">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <BookOpen className="h-8 w-8 text-green-600" />
              <CardTitle className="text-lg">Browse Content</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Read articles and resources
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/general">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <PlusCircle className="h-8 w-8 text-purple-600" />
              <CardTitle className="text-lg">Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Update your profile information
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/activity">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <Loader2 className="h-8 w-8 text-orange-600" />
              <CardTitle className="text-lg">Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                View your activity and progress
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Suspense fallback={<SubscriptionSkeleton />}>
        <ManageSubscription />
      </Suspense>
      <Suspense fallback={<TeamMembersSkeleton />}>
        <ProfileInfo />
      </Suspense>
      <Suspense fallback={<InviteTeamMemberSkeleton />}>
        <AssessmentProgress />
      </Suspense>
    </section>
  );
}
