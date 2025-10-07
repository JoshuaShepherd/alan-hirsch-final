// Auto-generated aggregate mappers
// Generated at: 2025-10-06T17:55:56.828Z

import type {
  UserProfilesSelect,
  OrganizationsSelect,
  AssessmentsSelect,
  ContentItemsSelect,
  CommunitiesSelect,
} from '@/lib/types';
import {
  userProfilesToApi,
  organizationsToApi,
  assessmentsToApi,
  contentItemsToApi,
  communitiesToApi,
} from '../database';

// Transform user profile with organization
export function userProfileWithOrganizationMapper(
  user: UserProfilesSelect,
  organization: OrganizationsSelect | null,
  membership: any | null
): any {
  return {
    user: userProfilesToApi(user),
    organization: organization ? organizationsToApi(organization) : null,
    membership: membership ? membership : null,
  };
}

// Transform assessment with questions
export function assessmentWithQuestionsMapper(
  assessment: AssessmentsSelect,
  questions: any[]
): any {
  return {
    assessment: assessmentsToApi(assessment),
    questions: questions.map(q => q),
    questionCount: questions.length,
  };
}

// Transform content item with series
export function contentItemWithSeriesMapper(
  contentItem: ContentItemsSelect,
  series: any | null,
  category: any | null,
  crossReferences: any[]
): any {
  return {
    contentItem: contentItemsToApi(contentItem),
    series: series ? series : null,
    category: category ? category : null,
    crossReferences: crossReferences.map(cr => cr),
  };
}

// Transform community with stats
export function communityWithStatsMapper(
  community: CommunitiesSelect,
  memberCount: number,
  postCount: number,
  recentPosts: any[]
): any {
  return {
    community: communitiesToApi(community),
    memberCount,
    postCount,
    recentPosts: recentPosts.map(post => post),
  };
}
