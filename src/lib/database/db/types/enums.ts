/**
 * Database Enum Types
 * Extracted from Drizzle schema definitions for type safety
 */

// Assessment Types
export type AssessmentType =
  | 'apest'
  | 'mdna'
  | 'cultural_intelligence'
  | 'leadership_style'
  | 'spiritual_gifts'
  | 'other';

// Assessment Status
export type AssessmentStatus = 'draft' | 'active' | 'archived' | 'under_review';

// Cultural Context
export type CulturalContext =
  | 'western'
  | 'eastern'
  | 'african'
  | 'latin_american'
  | 'middle_eastern'
  | 'oceanic'
  | 'global';

// Scoring Method
export type ScoringMethod =
  | 'likert_5'
  | 'likert_7'
  | 'binary'
  | 'ranking'
  | 'weighted';

// Community Types
export type CommunityType =
  | 'general_discussion'
  | 'church_planting_cohort'
  | 'leadership_development'
  | 'theological_study'
  | 'regional_network'
  | 'ministry_focus'
  | 'apest_group';

// Community Visibility
export type CommunityVisibility =
  | 'organization'
  | 'public'
  | 'private'
  | 'invite_only';

// Community Membership Role
export type CommunityRole = 'owner' | 'admin' | 'member' | 'moderator';

// Community Membership Status
export type CommunityMembershipStatus =
  | 'active'
  | 'inactive'
  | 'pending'
  | 'banned'
  | 'left';

// Content Types
export type ContentType =
  | 'framework'
  | 'article'
  | 'video'
  | 'podcast'
  | 'tool'
  | 'case_study'
  | 'interview'
  | 'course_lesson';

// Content Status (for content items)
export type ContentStatus =
  | 'draft'
  | 'archived'
  | 'under_review'
  | 'published'
  | 'scheduled';

// Content Series Status (for content series)
export type ContentSeriesStatus =
  | 'draft'
  | 'archived'
  | 'under_review'
  | 'published';

// Content Visibility
export type ContentVisibility =
  | 'organization'
  | 'public'
  | 'premium'
  | 'vip'
  | 'private'
  | 'invite_only';

// Content Series Types
export type ContentSeriesType =
  | 'course'
  | 'learning_path'
  | 'book_series'
  | 'podcast_series'
  | 'video_series'
  | 'framework';

// Organization Types
export type OrganizationType =
  | 'other'
  | 'denomination'
  | 'church'
  | 'seminary'
  | 'ministry_network'
  | 'nonprofit'
  | 'business';

// Organization Status
export type OrganizationStatus = 'active' | 'suspended' | 'trial' | 'cancelled';

// Organization Membership Role
export type OrganizationRole = 'owner' | 'admin' | 'member' | 'viewer';

// Organization Membership Status
export type OrganizationMembershipStatus =
  | 'active'
  | 'inactive'
  | 'cancelled'
  | 'pending';

// User Ministry Role
export type MinistryRole =
  | 'senior_pastor'
  | 'associate_pastor'
  | 'church_planter'
  | 'denominational_leader'
  | 'seminary_professor'
  | 'seminary_student'
  | 'ministry_staff'
  | 'missionary'
  | 'marketplace_minister'
  | 'nonprofit_leader'
  | 'consultant'
  | 'academic_researcher'
  | 'emerging_leader'
  | 'other';

// User Account Status
export type AccountStatus =
  | 'active'
  | 'inactive'
  | 'suspended'
  | 'pending_verification';

// Subscription Tier
export type SubscriptionTier =
  | 'free'
  | 'individual'
  | 'professional'
  | 'leader'
  | 'institutional';

// Collaboration Types
export type CollaborationType =
  | 'content_creation'
  | 'research_project'
  | 'course_development'
  | 'book_writing'
  | 'event_planning';

// Collaboration Status
export type CollaborationStatus =
  | 'active'
  | 'cancelled'
  | 'completed'
  | 'planning'
  | 'review';
