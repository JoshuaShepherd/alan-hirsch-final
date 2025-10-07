// Auto-generated types for common
// Generated at: 2025-10-06T16:27:57.960Z

import { z } from 'zod';

export enum MinistryRole {
  SENIOR_PASTOR = 'senior_pastor',
  ASSOCIATE_PASTOR = 'associate_pastor',
  CHURCH_PLANTER = 'church_planter',
  WORSHIP_LEADER = 'worship_leader',
  YOUTH_PASTOR = 'youth_pastor',
  CHILDREN_PASTOR = 'children_pastor',
  MISSIONS_PASTOR = 'missions_pastor',
  EVANGELIST = 'evangelist',
  APOSTLE = 'apostle',
  PROPHET = 'prophet',
  TEACHER = 'teacher',
  SHEPHERD = 'shepherd'
}

export enum OrganizationType {
  CHURCH = 'church',
  DENOMINATION = 'denomination',
  SEMINARY = 'seminary',
  NONPROFIT = 'nonprofit',
  NETWORK = 'network',
  MINISTRY = 'ministry'
}

export enum OrganizationStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  SUSPENDED = 'suspended'
}

export enum OrganizationRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  MEMBER = 'member',
  VIEWER = 'viewer'
}

export enum MembershipStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  SUSPENDED = 'suspended'
}

export enum ContentType {
  ARTICLE = 'article',
  VIDEO = 'video',
  PODCAST = 'podcast',
  COURSE = 'course',
  BOOK = 'book',
  STUDY_GUIDE = 'study_guide'
}

export enum ContentStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
  SCHEDULED = 'scheduled'
}

export enum AssessmentType {
  APEST = 'apest',
  MDNA = 'mdna',
  CULTURAL_INTELLIGENCE = 'cultural_intelligence',
  SPIRITUAL_GIFTS = 'spiritual_gifts',
  PERSONALITY = 'personality'
}

export enum AssessmentStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DRAFT = 'draft'
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  LIKERT_SCALE = 'likert_scale',
  TEXT = 'text',
  RATING = 'rating'
}

export enum CommunityVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
  INVITE_ONLY = 'invite_only'
}

export enum PostType {
  DISCUSSION = 'discussion',
  ANNOUNCEMENT = 'announcement',
  QUESTION = 'question',
  RESOURCE = 'resource'
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc'
}

export enum SubscriptionTier {
  FREE = 'free',
  INDIVIDUAL = 'individual',
  PROFESSIONAL = 'professional',
  LEADER = 'leader',
  INSTITUTIONAL = 'institutional'
}
