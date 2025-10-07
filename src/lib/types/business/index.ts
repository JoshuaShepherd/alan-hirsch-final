// Auto-generated types for business logic
// Generated at: 2025-10-06T17:20:33.398Z

import type {
  AssessmentsSelect,
  CommunitiesSelect,
  ContentItemsSelect,
  OrganizationsSelect,
  UserAssessmentsSelect,
  UserProfilesSelect,
  UserSubscriptionsSelect,
} from '@/lib/database';

// Domain aggregates
export interface UserAggregate {
  profile: UserProfilesSelect;
  organization?: OrganizationsSelect;
  assessments: UserAssessmentsSelect[];
  subscriptions: UserSubscriptionsSelect[];
  communities: CommunitiesSelect[];
}

export interface OrganizationAggregate {
  organization: OrganizationsSelect;
  members: UserProfilesSelect[];
  assessments: AssessmentsSelect[];
  content: ContentItemsSelect[];
}

export interface AssessmentAggregate {
  assessment: AssessmentsSelect;
  questions: AssessmentQuestionSelect[]; // Will be properly typed when question types are available
  responses: AssessmentResponseSelect[]; // Will be properly typed when response types are available
  users: UserProfilesSelect[];
}

// Computed types
export interface UserMetrics {
  userId: string;
  assessmentScore: number;
  contentEngagement: number;
  communityActivity: number;
  subscriptionTier: string;
}

export interface OrganizationMetrics {
  organizationId: string;
  memberCount: number;
  activeAssessments: number;
  publishedContent: number;
  communityCount: number;
}

export interface AssessmentMetrics {
  assessmentId: string;
  completionRate: number;
  averageScore: number;
  totalResponses: number;
  userEngagement: number;
}

// Business domain types
export interface MinistryContext {
  role: string;
  denomination?: string;
  organizationName?: string;
  yearsInMinistry?: number;
  countryCode?: string;
  culturalContext?: string;
}

export interface AssessmentResult {
  assessmentId: string;
  userId: string;
  completedAt: Date;
  score: number;
  responses: Record<string, unknown>;
  insights: string[];
}

export interface ContentEngagement {
  contentId: string;
  userId: string;
  engagementType: string;
  duration?: number;
  completed: boolean;
  rating?: number;
}

// Placeholder types for future implementation
export type AssessmentQuestionSelect = Record<string, unknown>;
export type AssessmentResponseSelect = Record<string, unknown>;
