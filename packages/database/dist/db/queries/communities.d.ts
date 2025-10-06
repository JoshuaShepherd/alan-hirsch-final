import { communities, communityMemberships, communityPosts, userProfiles } from '../schema';
import type { NewCommunity, NewCommunityMembership, NewCommunityPost } from '../schema/community';
export interface QueryContext {
    organizationId?: string;
    userId?: string;
    role?: string;
}
/**
 * Get community by ID with context-aware access control
 */
export declare function getCommunityById(communityId: string, context: QueryContext): Promise<typeof communities.$inferSelect | null>;
/**
 * Get community by slug with context-aware access control
 */
export declare function getCommunityBySlug(slug: string, context: QueryContext): Promise<typeof communities.$inferSelect | null>;
/**
 * Get public communities
 */
export declare function getPublicCommunities(context: QueryContext, options?: {
    communityType?: string;
    culturalContext?: string;
    languagePrimary?: string;
    limit?: number;
    offset?: number;
    orderBy?: 'created_at' | 'current_member_count' | 'total_posts_count';
    orderDirection?: 'asc' | 'desc';
}): Promise<Array<{
    community: typeof communities.$inferSelect;
    creator: typeof userProfiles.$inferSelect | null;
}>>;
/**
 * Search communities with full-text search
 */
export declare function searchCommunities(searchTerm: string, context: QueryContext, options?: {
    communityType?: string;
    culturalContext?: string;
    languagePrimary?: string;
    limit?: number;
    offset?: number;
}): Promise<Array<{
    community: typeof communities.$inferSelect;
    creator: typeof userProfiles.$inferSelect | null;
}>>;
/**
 * Get communities by user membership
 */
export declare function getCommunitiesByUser(userId: string, context: QueryContext, options?: {
    status?: 'active' | 'pending' | 'inactive';
    role?: string;
    limit?: number;
    offset?: number;
}): Promise<Array<{
    community: typeof communities.$inferSelect;
    membership: typeof communityMemberships.$inferSelect;
}>>;
/**
 * Get community statistics
 */
export declare function getCommunityStats(communityId: string, context: QueryContext): Promise<{
    totalMembers: number;
    activeMembers: number;
    pendingMembers: number;
    totalPosts: number;
    totalComments: number;
    totalVotes: number;
    averagePostsPerMember: number;
} | null>;
/**
 * Create community
 */
export declare function createCommunity(communityData: NewCommunity, context: QueryContext): Promise<typeof communities.$inferSelect>;
/**
 * Update community with context-aware validation
 */
export declare function updateCommunity(communityId: string, updates: Partial<NewCommunity>, context: QueryContext): Promise<typeof communities.$inferSelect | null>;
/**
 * Delete community with context-aware validation
 */
export declare function deleteCommunity(communityId: string, context: QueryContext): Promise<boolean>;
/**
 * Get community membership
 */
export declare function getCommunityMembership(communityId: string, userId: string, context: QueryContext): Promise<typeof communityMemberships.$inferSelect | null>;
/**
 * Get community members
 */
export declare function getCommunityMembers(communityId: string, context: QueryContext, options?: {
    role?: string;
    status?: 'active' | 'pending' | 'inactive';
    limit?: number;
    offset?: number;
}): Promise<Array<typeof userProfiles.$inferSelect & {
    membership: typeof communityMemberships.$inferSelect;
}>>;
/**
 * Join community
 */
export declare function joinCommunity(communityId: string, context: QueryContext): Promise<typeof communityMemberships.$inferSelect>;
/**
 * Leave community
 */
export declare function leaveCommunity(communityId: string, context: QueryContext): Promise<boolean>;
/**
 * Create community membership
 */
export declare function createCommunityMembership(membershipData: NewCommunityMembership, context: QueryContext): Promise<typeof communityMemberships.$inferSelect>;
/**
 * Update community membership
 */
export declare function updateCommunityMembership(membershipId: string, updates: Partial<NewCommunityMembership>, context: QueryContext): Promise<typeof communityMemberships.$inferSelect | null>;
/**
 * Approve community membership
 */
export declare function approveCommunityMembership(membershipId: string, context: QueryContext): Promise<typeof communityMemberships.$inferSelect | null>;
/**
 * Reject community membership
 */
export declare function rejectCommunityMembership(membershipId: string, context: QueryContext): Promise<boolean>;
/**
 * Get community posts
 */
export declare function getCommunityPosts(communityId: string, context: QueryContext, options?: {
    limit?: number;
    offset?: number;
    orderBy?: 'created_at' | 'vote_count' | 'comment_count';
    orderDirection?: 'asc' | 'desc';
}): Promise<Array<{
    post: typeof communityPosts.$inferSelect;
    author: typeof userProfiles.$inferSelect | null;
}>>;
/**
 * Get community post by ID
 */
export declare function getCommunityPostById(postId: string, context: QueryContext): Promise<{
    post: typeof communityPosts.$inferSelect;
    author: typeof userProfiles.$inferSelect | null;
} | null>;
/**
 * Create community post
 */
export declare function createCommunityPost(postData: NewCommunityPost, context: QueryContext): Promise<typeof communityPosts.$inferSelect>;
/**
 * Update community post
 */
export declare function updateCommunityPost(postId: string, updates: Partial<NewCommunityPost>, context: QueryContext): Promise<typeof communityPosts.$inferSelect | null>;
/**
 * Delete community post
 */
export declare function deleteCommunityPost(postId: string, context: QueryContext): Promise<boolean>;
//# sourceMappingURL=communities.d.ts.map