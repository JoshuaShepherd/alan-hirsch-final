// Auto-generated types for business
// Generated at: 2025-10-06T16:27:57.960Z

import type {
  AssessmentQuestionsSelect,
  AssessmentsSelect,
  CommunitiesSelect,
  CommunityPostVotesSelect,
  ContentCrossReferencesSelect,
  ContentItemsSelect,
  ContentSeriesSelect,
  OrganizationMembershipsSelect,
  OrganizationsSelect,
  UserProfilesSelect,
} from '@/lib/database';

export interface UserProfileWithOrganization {
  user: UserProfilesSelect;
  organization: OrganizationsSelect | null;
  membership: OrganizationMembershipsSelect | null;
}

export interface AssessmentWithQuestions {
  assessment: AssessmentsSelect;
  questions: AssessmentQuestionsSelect[];
  questionCount: number;
}

export interface ContentItemWithSeries {
  contentItem: ContentItemsSelect;
  series: ContentSeriesSelect | null;
  category: ContentSeriesSelect | null;
  crossReferences: ContentCrossReferencesSelect[];
}

export interface CommunityWithStats {
  community: CommunitiesSelect;
  memberCount: number;
  postCount: number;
  recentPosts: CommunityPostVotesSelect[];
}
