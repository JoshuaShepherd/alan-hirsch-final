import { z } from 'zod';
import {
  culturalContextSchema,
  visibilitySchema,
  membershipRoleSchema,
  attachmentSchema,
} from './shared';

// Community Validation Schemas
export const communityTypeSchema = z.enum([
  'general_discussion',
  'church_planting_cohort',
  'leadership_development',
  'theological_study',
  'regional_network',
  'ministry_focus',
  'apest_group',
]);

export const moderationLevelSchema = z.enum(['open', 'moderated', 'strict']);

export const communitySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  description: z.string().optional(),

  // Community Classification
  communityType: communityTypeSchema,

  // Geographic & Cultural Focus
  geographicFocus: z.array(z.string()).default([]), // Country codes
  culturalContext: culturalContextSchema.default('global'),

  // Language & Localization
  languagePrimary: z.string().default('en'),
  languagesSupported: z.array(z.string()).default(['en']),

  // Access Control
  visibility: visibilitySchema.default('public'),
  joinApprovalRequired: z.boolean().default(false),

  // Community Configuration
  maxMembers: z.number().int().min(1).optional(),
  allowGuestPosts: z.boolean().default(false),
  moderationLevel: moderationLevelSchema.default('moderated'),

  // Membership Statistics
  currentMemberCount: z.number().int().min(0).default(0),
  totalPostsCount: z.number().int().min(0).default(0),

  // Community Guidelines
  guidelines: z.string().optional(),
  rules: z.array(z.string()).default([]),

  // Leadership
  createdBy: z.string().uuid(),
  moderators: z.array(z.string().uuid()).default([]),

  // Status
  isActive: z.boolean().default(true),

  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const newCommunitySchema = communitySchema
  .omit({
    createdAt: true,
    updatedAt: true,
  })
  .partial({
    id: true,
  });

// Community Membership Validation Schemas - ⏳ PLANNED
export const communityMembershipRoleSchema = z.enum([
  'member',
  'moderator',
  'admin',
  'owner',
]);

export const membershipStatusSchema = z.enum([
  'active',
  'inactive',
  'pending',
  'banned',
  'left',
]);

export const communityMembershipSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  communityId: z.string().uuid(),

  // Membership Role
  role: communityMembershipRoleSchema.default('member'),

  // Status
  status: membershipStatusSchema.default('pending'),

  // Engagement Metrics
  postsCount: z.number().int().min(0).default(0),
  commentsCount: z.number().int().min(0).default(0),
  lastActiveAt: z.date().optional(),

  // Notifications
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(true),

  // Timestamps
  joinedAt: z.date().optional(),
  approvedAt: z.date().optional(),
  leftAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const newCommunityMembershipSchema = communityMembershipSchema
  .omit({
    createdAt: true,
    updatedAt: true,
  })
  .partial({
    id: true,
    joinedAt: true,
    approvedAt: true,
    leftAt: true,
    lastActiveAt: true,
  });

// Community Post Validation Schemas - ⏳ PLANNED
export const postTypeSchema = z.enum([
  'discussion',
  'question',
  'announcement',
  'resource_share',
  'prayer_request',
  'testimony',
]);

export const postStatusSchema = z.enum([
  'published',
  'draft',
  'pending_review',
  'flagged',
  'removed',
]);

export const communityPostSchema = z.object({
  id: z.string().uuid(),
  communityId: z.string().uuid(),
  authorId: z.string().uuid(),

  // Post Content
  title: z.string().optional(),
  content: z.string().min(1),

  // Post Classification
  postType: postTypeSchema.default('discussion'),

  // Threading
  parentPostId: z.string().uuid().optional(),
  replyCount: z.number().int().min(0).default(0),

  // Engagement
  upvotes: z.number().int().min(0).default(0),
  downvotes: z.number().int().min(0).default(0),
  viewCount: z.number().int().min(0).default(0),

  // Tagging & Categorization
  tags: z.array(z.string()).default([]),

  // Moderation
  status: postStatusSchema.default('published'),
  flaggedCount: z.number().int().min(0).default(0),
  moderationNotes: z.string().optional(),

  // Media Attachments
  attachments: z.array(attachmentSchema).default([]),

  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date(),
  publishedAt: z.date().optional(),
});

export const newCommunityPostSchema = communityPostSchema
  .omit({
    createdAt: true,
    updatedAt: true,
  })
  .partial({
    id: true,
    publishedAt: true,
  });

// Community Post Vote Validation Schemas - ⏳ PLANNED
export const voteTypeSchema = z.enum(['upvote', 'downvote']);

export const communityPostVoteSchema = z.object({
  id: z.string().uuid(),
  postId: z.string().uuid(),
  userId: z.string().uuid(),

  // Vote Type
  voteType: voteTypeSchema,

  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const newCommunityPostVoteSchema = communityPostVoteSchema
  .omit({
    createdAt: true,
    updatedAt: true,
  })
  .partial({
    id: true,
  });

// Collaboration Validation Schemas - ⏳ PLANNED
export const collaborationTypeSchema = z.enum([
  'content_creation',
  'research_project',
  'course_development',
  'book_writing',
  'event_planning',
]);

export const revenueShareModelSchema = z.enum([
  'equal',
  'weighted',
  'lead_majority',
  'custom',
]);

export const collaborationStatusSchema = z.enum([
  'planning',
  'active',
  'review',
  'completed',
  'cancelled',
]);

export const collaboratorSchema = z.object({
  userId: z.string().uuid(),
  role: z.string(),
  revenueShare: z.number().min(0).max(100), // Percentage
  joinedAt: z.string().datetime(),
});

export const deliverableSchema = z.object({
  type: z.string(),
  description: z.string(),
  dueDate: z.string().datetime(),
  completed: z.boolean(),
});

export const communicationChannelSchema = z.object({
  type: z.string(),
  url: z.string().url(),
  primary: z.boolean(),
});

export const collaborationSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().optional(),

  // Collaboration Type
  collaborationType: collaborationTypeSchema,

  // Leadership
  leadAuthorId: z.string().uuid(),
  collaborators: z.array(collaboratorSchema).default([]),

  // Revenue Configuration
  revenueShareModel: revenueShareModelSchema.default('equal'),
  totalRevenueShare: z.number().int().min(0).max(100).default(100),

  // Project Management
  status: collaborationStatusSchema.default('planning'),

  // Timeline
  startDate: z.date().optional(),
  targetCompletionDate: z.date().optional(),
  actualCompletionDate: z.date().optional(),

  // Deliverables
  expectedDeliverables: z.array(deliverableSchema).default([]),

  // Network Impact
  networkAmplificationGoal: z.number().int().min(0).optional(),
  actualNetworkImpact: z.number().int().min(0).optional(),

  // Communication
  communicationChannels: z.array(communicationChannelSchema).default([]),

  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const newCollaborationSchema = collaborationSchema
  .omit({
    createdAt: true,
    updatedAt: true,
  })
  .partial({
    id: true,
    startDate: true,
    targetCompletionDate: true,
    actualCompletionDate: true,
  });

// Type exports
export type Community = z.infer<typeof communitySchema>;
export type NewCommunity = z.infer<typeof newCommunitySchema>;
export type CommunityMembership = z.infer<typeof communityMembershipSchema>;
export type NewCommunityMembership = z.infer<
  typeof newCommunityMembershipSchema
>;
export type CommunityPost = z.infer<typeof communityPostSchema>;
export type NewCommunityPost = z.infer<typeof newCommunityPostSchema>;
export type CommunityPostVote = z.infer<typeof communityPostVoteSchema>;
export type NewCommunityPostVote = z.infer<typeof newCommunityPostVoteSchema>;
export type Collaboration = z.infer<typeof collaborationSchema>;
export type NewCollaboration = z.infer<typeof newCollaborationSchema>;
