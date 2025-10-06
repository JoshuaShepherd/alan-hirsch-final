import { z } from 'zod';
// ============================================================================
// COMMUNITY ENTITY SCHEMAS
// ============================================================================
// Placeholder schemas for community functionality
// Community Entity Schema
export const communityEntitySchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1).max(200),
    slug: z.string().min(1).max(200),
    description: z.string().max(1000).optional(),
    type: z.enum(['public', 'private', 'invite_only']).default('public'),
    status: z.enum(['active', 'inactive', 'archived']).default('active'),
    memberCount: z.number().int().min(0).default(0),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
// Community Membership Entity Schema
export const communityMembershipEntitySchema = z.object({
    id: z.string().uuid(),
    communityId: z.string().uuid(),
    userId: z.string().uuid(),
    role: z.enum(['owner', 'admin', 'moderator', 'member']).default('member'),
    status: z.enum(['active', 'inactive', 'banned']).default('active'),
    joinedAt: z.string().datetime(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
// Community Post Entity Schema
export const communityPostEntitySchema = z.object({
    id: z.string().uuid(),
    communityId: z.string().uuid(),
    authorId: z.string().uuid(),
    title: z.string().min(1).max(200),
    content: z.string().min(1).max(10000),
    type: z
        .enum(['discussion', 'announcement', 'question', 'resource'])
        .default('discussion'),
    status: z.enum(['published', 'draft', 'archived']).default('published'),
    viewCount: z.number().int().min(0).default(0),
    likeCount: z.number().int().min(0).default(0),
    commentCount: z.number().int().min(0).default(0),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
// Community Post Vote Entity Schema
export const communityPostVoteEntitySchema = z.object({
    id: z.string().uuid(),
    postId: z.string().uuid(),
    userId: z.string().uuid(),
    voteType: z.enum(['up', 'down']),
    createdAt: z.string().datetime(),
});
// Collaboration Entity Schema
export const collaborationEntitySchema = z.object({
    id: z.string().uuid(),
    title: z.string().min(1).max(200),
    description: z.string().max(1000).optional(),
    type: z.enum(['project', 'initiative', 'partnership', 'event']),
    status: z
        .enum(['planning', 'active', 'completed', 'cancelled'])
        .default('planning'),
    leadUserId: z.string().uuid(),
    organizationId: z.string().uuid().optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
// ============================================================================
// CREATE SCHEMAS
// ============================================================================
export const createCommunitySchema = communityEntitySchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    memberCount: true,
});
export const createCommunityMembershipSchema = communityMembershipEntitySchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});
export const createCommunityPostSchema = communityPostEntitySchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    viewCount: true,
    likeCount: true,
    commentCount: true,
});
export const createCommunityPostVoteSchema = communityPostVoteEntitySchema.omit({
    id: true,
    createdAt: true,
});
export const createCollaborationSchema = collaborationEntitySchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});
// ============================================================================
// UPDATE SCHEMAS
// ============================================================================
export const updateCommunitySchema = createCommunitySchema.partial();
export const updateCommunityMembershipSchema = createCommunityMembershipSchema.partial();
export const updateCommunityPostSchema = createCommunityPostSchema.partial();
export const updateCollaborationSchema = createCollaborationSchema.partial();
// ============================================================================
// SCHEMA ALIASES FOR BACKWARD COMPATIBILITY
// ============================================================================
export const communitySchema = communityEntitySchema;
export const communityMembershipSchema = communityMembershipEntitySchema;
export const communityPostSchema = communityPostEntitySchema;
export const communityPostVoteSchema = communityPostVoteEntitySchema;
export const collaborationSchema = collaborationEntitySchema;
export const newCollaborationSchema = createCollaborationSchema;
export const newCommunityMembershipSchema = createCommunityMembershipSchema;
export const newCommunityPostSchema = createCommunityPostSchema;
export const newCommunityPostVoteSchema = createCommunityPostVoteSchema;
export const newCommunitySchema = createCommunitySchema;
//# sourceMappingURL=community.schema.js.map