// Auto-generated contracts for community
// Generated at: 2025-10-06T20:01:40.349Z

import { z } from 'zod';

// Entity validation schema for communities
export const communitiesEntitySchema = z.object({
  id: z.string().uuid().default('gen_random_uuid()').nullable(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  communityType: z.string().nullable(),
  geographicFocus: z.any(),
  culturalContext: z.string().nullable(),
  languagePrimary: z.string().default('en').nullable(),
  languagesSupported: z.array(z.string()),
  visibility: z
    .enum([
      'public',
      'premium',
      'vip',
      'private',
      'organization',
      'invite_only',
    ])
    .nullable(),
  joinApprovalRequired: z.boolean().default(false).nullable(),
  maxMembers: z.number().int().nullable(),
  allowGuestPosts: z.boolean().default(false).nullable(),
  moderationLevel: z.enum(['open', 'moderated', 'strict']).nullable(),
  currentMemberCount: z.number().int().default(0).nullable(),
  memberCount: z.number().int().default(0).nullable(),
  totalPostsCount: z.number().int().default(0).nullable(),
  guidelines: z.string().nullable(),
  rules: z.array(z.string()),
  createdBy: z.string().uuid(),
  moderators: z.any(),
  isActive: z.boolean().default(true).nullable(),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']).nullable(),
  focus: z.string().nullable(),
  createdAt: z.string().datetime().default('NOW()'),
  updatedAt: z.string().datetime().default('NOW()'),
});

// Create validation schema for communities
export const createcommunitiesSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  communityType: z.string(),
  geographicFocus: z.any().optional(),
  culturalContext: z.string(),
  languagePrimary: z.string().optional().default('en'),
  languagesSupported: z.array(z.string()).optional(),
  visibility: z.enum([
    'public',
    'premium',
    'vip',
    'private',
    'organization',
    'invite_only',
  ]),
  joinApprovalRequired: z.boolean().optional().default(false),
  maxMembers: z.number().int(),
  allowGuestPosts: z.boolean().optional().default(false),
  moderationLevel: z.enum(['open', 'moderated', 'strict']),
  currentMemberCount: z.number().int().optional().default(0),
  memberCount: z.number().int().optional().default(0),
  totalPostsCount: z.number().int().optional().default(0),
  guidelines: z.string(),
  rules: z.array(z.string()).optional(),
  createdBy: z.string().uuid(),
  moderators: z.any().optional(),
  isActive: z.boolean().optional().default(true),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']),
  focus: z.string(),
});

// Update validation schema for communities
export const updatecommunitiesSchema = z
  .object({
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    communityType: z.string(),
    geographicFocus: z.any().optional(),
    culturalContext: z.string(),
    languagePrimary: z.string().optional().default('en'),
    languagesSupported: z.array(z.string()).optional(),
    visibility: z.enum([
      'public',
      'premium',
      'vip',
      'private',
      'organization',
      'invite_only',
    ]),
    joinApprovalRequired: z.boolean().optional().default(false),
    maxMembers: z.number().int(),
    allowGuestPosts: z.boolean().optional().default(false),
    moderationLevel: z.enum(['open', 'moderated', 'strict']),
    currentMemberCount: z.number().int().optional().default(0),
    memberCount: z.number().int().optional().default(0),
    totalPostsCount: z.number().int().optional().default(0),
    guidelines: z.string(),
    rules: z.array(z.string()).optional(),
    createdBy: z.string().uuid(),
    moderators: z.any().optional(),
    isActive: z.boolean().optional().default(true),
    status: z.enum(['draft', 'published', 'archived', 'scheduled']),
    focus: z.string(),
    updatedAt: z.string().datetime().optional().default('NOW()'),
  })
  .partial();

// Query validation schema for communities
export const communitiesQuerySchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  communityType: z.string(),
  geographicFocus: z.any().optional(),
  culturalContext: z.string(),
  languagePrimary: z.string().optional().default('en'),
  languagesSupported: z.array(z.string()).optional(),
  visibility: z.enum([
    'public',
    'premium',
    'vip',
    'private',
    'organization',
    'invite_only',
  ]),
  joinApprovalRequired: z.boolean().optional().default(false),
  maxMembers: z.number().int(),
  allowGuestPosts: z.boolean().optional().default(false),
  moderationLevel: z.enum(['open', 'moderated', 'strict']),
  currentMemberCount: z.number().int().optional().default(0),
  memberCount: z.number().int().optional().default(0),
  totalPostsCount: z.number().int().optional().default(0),
  guidelines: z.string(),
  rules: z.array(z.string()).optional(),
  createdBy: z.string().uuid(),
  moderators: z.any().optional(),
  isActive: z.boolean().optional().default(true),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']),
  focus: z.string(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().optional(),
});

// Entity validation schema for communityMemberships
export const communityMembershipsEntitySchema = z.object({
  id: z.string().uuid().default('gen_random_uuid()').nullable(),
  userId: z.string().uuid(),
  communityId: z.string().uuid(),
  role: z.string().nullable(),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']).nullable(),
  postsCount: z.number().int().default(0).nullable(),
  commentsCount: z.number().int().default(0).nullable(),
  lastActiveAt: z.string().datetime().nullable(),
  emailNotifications: z.boolean().default(true).nullable(),
  pushNotifications: z.boolean().default(true).nullable(),
  joinedAt: z.string().datetime().default('NOW()').nullable(),
  approvedAt: z.string().datetime().nullable(),
  leftAt: z.string().datetime().nullable(),
  createdAt: z.string().datetime().default('NOW()'),
  updatedAt: z.string().datetime().default('NOW()'),
});

// Create validation schema for communityMemberships
export const createcommunityMembershipsSchema = z.object({
  userId: z.string().uuid(),
  communityId: z.string().uuid(),
  role: z.string(),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']),
  postsCount: z.number().int().optional().default(0),
  commentsCount: z.number().int().optional().default(0),
  emailNotifications: z.boolean().optional().default(true),
  pushNotifications: z.boolean().optional().default(true),
  joinedAt: z.string().datetime().optional().default('NOW()'),
  approvedAt: z.string().datetime(),
  leftAt: z.string().datetime(),
});

// Update validation schema for communityMemberships
export const updatecommunityMembershipsSchema = z
  .object({
    userId: z.string().uuid(),
    communityId: z.string().uuid(),
    role: z.string(),
    status: z.enum(['draft', 'published', 'archived', 'scheduled']),
    postsCount: z.number().int().optional().default(0),
    commentsCount: z.number().int().optional().default(0),
    lastActiveAt: z.string().datetime(),
    emailNotifications: z.boolean().optional().default(true),
    pushNotifications: z.boolean().optional().default(true),
    joinedAt: z.string().datetime().optional().default('NOW()'),
    approvedAt: z.string().datetime(),
    leftAt: z.string().datetime(),
    updatedAt: z.string().datetime().optional().default('NOW()'),
  })
  .partial();

// Query validation schema for communityMemberships
export const communityMembershipsQuerySchema = z.object({
  userId: z.string().uuid(),
  communityId: z.string().uuid(),
  role: z.string(),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']),
  postsCount: z.number().int().optional().default(0),
  commentsCount: z.number().int().optional().default(0),
  emailNotifications: z.boolean().optional().default(true),
  pushNotifications: z.boolean().optional().default(true),
  joinedAt: z.string().datetime().optional().default('NOW()'),
  approvedAt: z.string().datetime(),
  leftAt: z.string().datetime(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().optional(),
});

// Entity validation schema for communityPostVotes
export const communityPostVotesEntitySchema = z.object({
  id: z.string().uuid().default('gen_random_uuid()').nullable(),
  postId: z.string().uuid(),
  userId: z.string().uuid(),
  voteType: z.string().nullable(),
  createdAt: z.string().datetime().default('NOW()'),
  updatedAt: z.string().datetime().default('NOW()'),
});

// Create validation schema for communityPostVotes
export const createcommunityPostVotesSchema = z.object({
  postId: z.string().uuid(),
  userId: z.string().uuid(),
  voteType: z.string(),
});

// Update validation schema for communityPostVotes
export const updatecommunityPostVotesSchema = z
  .object({
    postId: z.string().uuid(),
    userId: z.string().uuid(),
    voteType: z.string(),
    updatedAt: z.string().datetime().optional().default('NOW()'),
  })
  .partial();

// Query validation schema for communityPostVotes
export const communityPostVotesQuerySchema = z.object({
  postId: z.string().uuid(),
  userId: z.string().uuid(),
  voteType: z.string(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().optional(),
});

// Entity validation schema for collaborations
export const collaborationsEntitySchema = z.object({
  id: z.string().uuid().default('gen_random_uuid()').nullable(),
  title: z.string(),
  description: z.string().nullable(),
  collaborationType: z.string().nullable(),
  leadAuthorId: z.string().uuid(),
  collaborators: z.any(),
  revenueShareModel: z.string().nullable(),
  totalRevenueShare: z.number().int().default(100).nullable(),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']).nullable(),
  startDate: z.string().datetime().nullable(),
  targetCompletionDate: z.string().datetime().nullable(),
  actualCompletionDate: z.string().datetime().nullable(),
  expectedDeliverables: z.any(),
  networkAmplificationGoal: z.number().int().nullable(),
  actualNetworkImpact: z.number().int().nullable(),
  communicationChannels: z.any(),
  createdAt: z.string().datetime().default('NOW()'),
  updatedAt: z.string().datetime().default('NOW()'),
});

// Create validation schema for collaborations
export const createcollaborationsSchema = z.object({
  title: z.string(),
  description: z.string(),
  collaborationType: z.string(),
  leadAuthorId: z.string().uuid(),
  collaborators: z.any().optional(),
  revenueShareModel: z.string(),
  totalRevenueShare: z.number().int().optional().default(100),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']),
  startDate: z.string().datetime(),
  targetCompletionDate: z.string().datetime(),
  actualCompletionDate: z.string().datetime(),
  expectedDeliverables: z.any().optional(),
  networkAmplificationGoal: z.number().int(),
  actualNetworkImpact: z.number().int(),
  communicationChannels: z.any().optional(),
});

// Update validation schema for collaborations
export const updatecollaborationsSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    collaborationType: z.string(),
    leadAuthorId: z.string().uuid(),
    collaborators: z.any().optional(),
    revenueShareModel: z.string(),
    totalRevenueShare: z.number().int().optional().default(100),
    status: z.enum(['draft', 'published', 'archived', 'scheduled']),
    startDate: z.string().datetime(),
    targetCompletionDate: z.string().datetime(),
    actualCompletionDate: z.string().datetime(),
    expectedDeliverables: z.any().optional(),
    networkAmplificationGoal: z.number().int(),
    actualNetworkImpact: z.number().int(),
    communicationChannels: z.any().optional(),
    updatedAt: z.string().datetime().optional().default('NOW()'),
  })
  .partial();

// Query validation schema for collaborations
export const collaborationsQuerySchema = z.object({
  title: z.string(),
  description: z.string(),
  collaborationType: z.string(),
  leadAuthorId: z.string().uuid(),
  collaborators: z.any().optional(),
  revenueShareModel: z.string(),
  totalRevenueShare: z.number().int().optional().default(100),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']),
  startDate: z.string().datetime(),
  targetCompletionDate: z.string().datetime(),
  actualCompletionDate: z.string().datetime(),
  expectedDeliverables: z.any().optional(),
  networkAmplificationGoal: z.number().int(),
  actualNetworkImpact: z.number().int(),
  communicationChannels: z.any().optional(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().optional(),
});
