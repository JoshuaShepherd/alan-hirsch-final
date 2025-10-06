// Community Query Module
// Pure functions for community operations with context-aware access control
import { and, asc, count, desc, eq, like, or, sql } from 'drizzle-orm';
import { db } from '../drizzle';
import { communities, communityMemberships, communityPosts, userProfiles, } from '../schema';
import { hasResults } from '../type-guards';
// ============================================================================
// COMMUNITY QUERIES
// ============================================================================
/**
 * Get community by ID with context-aware access control
 */
export async function getCommunityById(communityId, context) {
    const conditions = [eq(communities.id, communityId)];
    // Add context-based filtering for private communities
    if (context.userId && context.role !== 'admin') {
        const publicCondition = eq(communities.visibility, 'public');
        const memberCondition = sql `EXISTS (
      SELECT 1 FROM community_memberships
      WHERE community_id = ${communityId}
      AND user_id = ${context.userId}
      AND status = 'active'
    )`;
        const combinedCondition = or(publicCondition, memberCondition);
        if (combinedCondition) {
            conditions.push(combinedCondition);
        }
    }
    const result = await db
        .select()
        .from(communities)
        .where(and(...conditions))
        .limit(1);
    return hasResults(result) ? result[0] : null;
}
/**
 * Get community by slug with context-aware access control
 */
export async function getCommunityBySlug(slug, context) {
    const conditions = [eq(communities.slug, slug)];
    // Add context-based filtering for private communities
    if (context.userId && context.role !== 'admin') {
        const publicCondition = eq(communities.visibility, 'public');
        const memberCondition = sql `EXISTS (
      SELECT 1 FROM community_memberships
      WHERE community_id = communities.id
      AND user_id = ${context.userId}
      AND status = 'active'
    )`;
        const combinedCondition = or(publicCondition, memberCondition);
        if (combinedCondition) {
            conditions.push(combinedCondition);
        }
    }
    const result = await db
        .select()
        .from(communities)
        .where(and(...conditions))
        .limit(1);
    return hasResults(result) ? result[0] : null;
}
/**
 * Get public communities
 */
export async function getPublicCommunities(context, options = {}) {
    const { communityType, culturalContext, languagePrimary, limit = 20, offset = 0, orderBy = 'current_member_count', orderDirection = 'desc', } = options;
    const conditions = [
        eq(communities.visibility, 'public'),
        eq(communities.isActive, true),
    ];
    if (communityType) {
        conditions.push(eq(communities.communityType, communityType));
    }
    if (culturalContext) {
        conditions.push(eq(communities.culturalContext, culturalContext));
    }
    if (languagePrimary) {
        conditions.push(eq(communities.languagePrimary, languagePrimary));
    }
    const orderByField = {
        created_at: communities.createdAt,
        current_member_count: communities.currentMemberCount,
        total_posts_count: communities.totalPostsCount,
    }[orderBy];
    const orderDirectionFn = orderDirection === 'asc' ? asc : desc;
    const results = await db
        .select({
        community: communities,
        creator: userProfiles,
    })
        .from(communities)
        .leftJoin(userProfiles, eq(communities.createdBy, userProfiles.id))
        .where(and(...conditions))
        .orderBy(orderDirectionFn(orderByField))
        .limit(limit)
        .offset(offset);
    return results;
}
/**
 * Search communities with full-text search
 */
export async function searchCommunities(searchTerm, context, options = {}) {
    const { communityType, culturalContext, languagePrimary, limit = 20, offset = 0, } = options;
    const conditions = [
        or(like(communities.name, `%${searchTerm}%`), like(communities.description, `%${searchTerm}%`)),
        eq(communities.visibility, 'public'),
        eq(communities.isActive, true),
    ];
    if (communityType) {
        conditions.push(eq(communities.communityType, communityType));
    }
    if (culturalContext) {
        conditions.push(eq(communities.culturalContext, culturalContext));
    }
    if (languagePrimary) {
        conditions.push(eq(communities.languagePrimary, languagePrimary));
    }
    const results = await db
        .select({
        community: communities,
        creator: userProfiles,
    })
        .from(communities)
        .leftJoin(userProfiles, eq(communities.createdBy, userProfiles.id))
        .where(and(...conditions))
        .orderBy(desc(communities.currentMemberCount))
        .limit(limit)
        .offset(offset);
    return results;
}
/**
 * Get communities by user membership
 */
export async function getCommunitiesByUser(userId, context, options = {}) {
    const { status = 'active', role, limit = 50, offset = 0 } = options;
    const conditions = [
        eq(communityMemberships.userId, userId),
        eq(communityMemberships.status, status),
    ];
    if (role) {
        conditions.push(eq(communityMemberships.role, role));
    }
    const results = await db
        .select({
        community: communities,
        membership: communityMemberships,
    })
        .from(communities)
        .innerJoin(communityMemberships, eq(communities.id, communityMemberships.communityId))
        .where(and(...conditions))
        .orderBy(desc(communityMemberships.joinedAt))
        .limit(limit)
        .offset(offset);
    return results;
}
/**
 * Get community statistics
 */
export async function getCommunityStats(communityId, context) {
    const community = await getCommunityById(communityId, context);
    if (!community)
        return null;
    const [memberStats, postStats] = await Promise.all([
        // Member statistics
        db
            .select({
            totalMembers: count(communityMemberships.id),
            activeMembers: count(sql `CASE WHEN ${communityMemberships.status} = 'active' THEN 1 END`),
            pendingMembers: count(sql `CASE WHEN ${communityMemberships.status} = 'pending' THEN 1 END`),
        })
            .from(communityMemberships)
            .where(eq(communityMemberships.communityId, communityId)),
        // Post statistics
        db
            .select({
            totalPosts: count(communityPosts.id),
            totalComments: sql `COALESCE(SUM(${communityPosts.commentCount}), 0)`,
            totalVotes: sql `COALESCE(SUM(${communityPosts.voteCount}), 0)`,
        })
            .from(communityPosts)
            .where(eq(communityPosts.communityId, communityId)),
    ]);
    const totalMembers = memberStats[0]?.totalMembers ?? 0;
    const totalPosts = postStats[0]?.totalPosts ?? 0;
    return {
        totalMembers,
        activeMembers: memberStats[0]?.activeMembers ?? 0,
        pendingMembers: memberStats[0]?.pendingMembers ?? 0,
        totalPosts,
        totalComments: postStats[0]?.totalComments ?? 0,
        totalVotes: postStats[0]?.totalVotes ?? 0,
        averagePostsPerMember: totalMembers > 0 ? totalPosts / totalMembers : 0,
    };
}
/**
 * Create community
 */
export async function createCommunity(communityData, context) {
    const result = await db
        .insert(communities)
        .values({
        ...communityData,
        createdBy: context.userId,
        createdAt: new Date(),
        updatedAt: new Date(),
    })
        .returning();
    if (!hasResults(result)) {
        throw new Error('Failed to create community');
    }
    // Auto-join creator as admin
    await createCommunityMembership({
        userId: context.userId,
        communityId: result[0].id,
        role: 'admin',
        status: 'active',
        joinedAt: new Date(),
    }, context);
    return result[0];
}
/**
 * Update community with context-aware validation
 */
export async function updateCommunity(communityId, updates, context) {
    // Verify user has access to update this community
    const existingCommunity = await getCommunityById(communityId, context);
    if (!existingCommunity) {
        throw new Error('Community not found or access denied');
    }
    // Check if user is creator or has admin role
    if (existingCommunity.createdBy !== context.userId &&
        context.role !== 'admin') {
        // Check if user is community admin
        const membership = await getCommunityMembership(communityId, context.userId, context);
        if (!membership || membership.role !== 'admin') {
            throw new Error('Insufficient permissions to update community');
        }
    }
    const result = await db
        .update(communities)
        .set({
        ...updates,
        updatedAt: new Date(),
    })
        .where(eq(communities.id, communityId))
        .returning();
    return hasResults(result) ? result[0] : null;
}
/**
 * Delete community with context-aware validation
 */
export async function deleteCommunity(communityId, context) {
    // Verify user has access to delete this community
    const existingCommunity = await getCommunityById(communityId, context);
    if (!existingCommunity) {
        throw new Error('Community not found or access denied');
    }
    // Only creator can delete community
    if (existingCommunity.createdBy !== context.userId &&
        context.role !== 'admin') {
        throw new Error('Only community creator can delete community');
    }
    const result = await db
        .delete(communities)
        .where(eq(communities.id, communityId));
    return result.length > 0;
}
// ============================================================================
// COMMUNITY MEMBERSHIP QUERIES
// ============================================================================
/**
 * Get community membership
 */
export async function getCommunityMembership(communityId, userId, context) {
    const result = await db
        .select()
        .from(communityMemberships)
        .where(and(eq(communityMemberships.communityId, communityId), eq(communityMemberships.userId, userId)))
        .limit(1);
    return hasResults(result) ? result[0] : null;
}
/**
 * Get community members
 */
export async function getCommunityMembers(communityId, context, options = {}) {
    const { role, status = 'active', limit = 50, offset = 0 } = options;
    const conditions = [
        eq(communityMemberships.communityId, communityId),
        eq(communityMemberships.status, status),
    ];
    if (role) {
        conditions.push(eq(communityMemberships.role, role));
    }
    const results = await db
        .select()
        .from(userProfiles)
        .innerJoin(communityMemberships, eq(userProfiles.id, communityMemberships.userId))
        .where(and(...conditions))
        .orderBy(desc(communityMemberships.joinedAt))
        .limit(limit)
        .offset(offset);
    return results;
}
/**
 * Join community
 */
export async function joinCommunity(communityId, context) {
    // Check if community exists and is joinable
    const community = await getCommunityById(communityId, context);
    if (!community) {
        throw new Error('Community not found');
    }
    if (!community.isActive) {
        throw new Error('Community is not active');
    }
    // Check if user is already a member
    const existingMembership = await getCommunityMembership(communityId, context.userId, context);
    if (existingMembership) {
        throw new Error('User is already a member of this community');
    }
    // Check if community requires approval
    const status = community.joinApprovalRequired ? 'pending' : 'active';
    const joinedAt = status === 'active' ? new Date() : undefined;
    return createCommunityMembership({
        userId: context.userId,
        communityId,
        role: 'member',
        status,
        joinedAt,
    }, context);
}
/**
 * Leave community
 */
export async function leaveCommunity(communityId, context) {
    const membership = await getCommunityMembership(communityId, context.userId, context);
    if (!membership) {
        throw new Error('User is not a member of this community');
    }
    // Prevent creator from leaving their own community
    const community = await getCommunityById(communityId, context);
    if (community?.createdBy === context.userId) {
        throw new Error('Community creator cannot leave their own community');
    }
    const result = await db
        .delete(communityMemberships)
        .where(eq(communityMemberships.id, membership.id));
    return result.length > 0;
}
/**
 * Create community membership
 */
export async function createCommunityMembership(membershipData, context) {
    const result = await db
        .insert(communityMemberships)
        .values({
        ...membershipData,
        createdAt: new Date(),
        updatedAt: new Date(),
    })
        .returning();
    if (!hasResults(result)) {
        throw new Error('Failed to create community membership');
    }
    return result[0];
}
/**
 * Update community membership
 */
export async function updateCommunityMembership(membershipId, updates, context) {
    const result = await db
        .update(communityMemberships)
        .set({
        ...updates,
        updatedAt: new Date(),
    })
        .where(eq(communityMemberships.id, membershipId))
        .returning();
    return hasResults(result) ? result[0] : null;
}
/**
 * Approve community membership
 */
export async function approveCommunityMembership(membershipId, context) {
    const membership = await db
        .select()
        .from(communityMemberships)
        .where(eq(communityMemberships.id, membershipId))
        .limit(1);
    if (!hasResults(membership)) {
        throw new Error('Membership not found');
    }
    // Check if user has permission to approve
    const community = await getCommunityById(membership[0].communityId, context);
    if (!community) {
        throw new Error('Community not found');
    }
    if (community.createdBy !== context.userId && context.role !== 'admin') {
        const adminMembership = await getCommunityMembership(community.id, context.userId, context);
        if (!adminMembership || adminMembership.role !== 'admin') {
            throw new Error('Insufficient permissions to approve membership');
        }
    }
    return updateCommunityMembership(membershipId, {
        status: 'active',
        joinedAt: new Date(),
    }, context);
}
/**
 * Reject community membership
 */
export async function rejectCommunityMembership(membershipId, context) {
    const membership = await db
        .select()
        .from(communityMemberships)
        .where(eq(communityMemberships.id, membershipId))
        .limit(1);
    if (!hasResults(membership)) {
        throw new Error('Membership not found');
    }
    // Check if user has permission to reject
    const community = await getCommunityById(membership[0].communityId, context);
    if (!community) {
        throw new Error('Community not found');
    }
    if (community.createdBy !== context.userId && context.role !== 'admin') {
        const adminMembership = await getCommunityMembership(community.id, context.userId, context);
        if (!adminMembership || adminMembership.role !== 'admin') {
            throw new Error('Insufficient permissions to reject membership');
        }
    }
    const result = await db
        .delete(communityMemberships)
        .where(eq(communityMemberships.id, membershipId));
    return result.length > 0;
}
// ============================================================================
// COMMUNITY POST QUERIES
// ============================================================================
/**
 * Get community posts
 */
export async function getCommunityPosts(communityId, context, options = {}) {
    const { limit = 20, offset = 0, orderBy = 'created_at', orderDirection = 'desc', } = options;
    // Verify user has access to this community
    const community = await getCommunityById(communityId, context);
    if (!community) {
        throw new Error('Community not found or access denied');
    }
    const orderByField = {
        created_at: communityPosts.createdAt,
        vote_count: communityPosts.voteCount,
        comment_count: communityPosts.commentCount,
    }[orderBy];
    const orderDirectionFn = orderDirection === 'asc' ? asc : desc;
    const results = await db
        .select({
        post: communityPosts,
        author: userProfiles,
    })
        .from(communityPosts)
        .leftJoin(userProfiles, eq(communityPosts.authorId, userProfiles.id))
        .where(eq(communityPosts.communityId, communityId))
        .orderBy(orderDirectionFn(orderByField))
        .limit(limit)
        .offset(offset);
    return results;
}
/**
 * Get community post by ID
 */
export async function getCommunityPostById(postId, context) {
    const result = await db
        .select({
        post: communityPosts,
        author: userProfiles,
    })
        .from(communityPosts)
        .leftJoin(userProfiles, eq(communityPosts.authorId, userProfiles.id))
        .where(eq(communityPosts.id, postId))
        .limit(1);
    if (!hasResults(result))
        return null;
    // Verify user has access to this community
    const community = await getCommunityById(result[0].post.communityId, context);
    if (!community) {
        throw new Error('Community not found or access denied');
    }
    return result[0];
}
/**
 * Create community post
 */
export async function createCommunityPost(postData, context) {
    // Verify user has access to this community
    const community = await getCommunityById(postData.communityId, context);
    if (!community) {
        throw new Error('Community not found or access denied');
    }
    // Check if user is a member
    const membership = await getCommunityMembership(postData.communityId, context.userId, context);
    if (!membership || membership.status !== 'active') {
        throw new Error('User must be an active member to post');
    }
    const result = await db
        .insert(communityPosts)
        .values({
        ...postData,
        authorId: context.userId,
        createdAt: new Date(),
        updatedAt: new Date(),
    })
        .returning();
    if (!hasResults(result)) {
        throw new Error('Failed to create community post');
    }
    return result[0];
}
/**
 * Update community post
 */
export async function updateCommunityPost(postId, updates, context) {
    const existingPost = await db
        .select()
        .from(communityPosts)
        .where(eq(communityPosts.id, postId))
        .limit(1);
    if (!hasResults(existingPost)) {
        throw new Error('Post not found');
    }
    // Check if user is the author or has admin permissions
    if (existingPost[0]['authorId'] !== context.userId &&
        context.role !== 'admin') {
        const community = await getCommunityById(existingPost[0]['communityId'], context);
        if (community?.createdBy !== context.userId) {
            const membership = await getCommunityMembership(existingPost[0]['communityId'], context.userId, context);
            if (!membership || membership.role !== 'admin') {
                throw new Error('Insufficient permissions to update post');
            }
        }
    }
    const result = await db
        .update(communityPosts)
        .set({
        ...updates,
        updatedAt: new Date(),
    })
        .where(eq(communityPosts.id, postId))
        .returning();
    return hasResults(result) ? result[0] : null;
}
/**
 * Delete community post
 */
export async function deleteCommunityPost(postId, context) {
    const existingPost = await db
        .select()
        .from(communityPosts)
        .where(eq(communityPosts.id, postId))
        .limit(1);
    if (!hasResults(existingPost)) {
        throw new Error('Post not found');
    }
    // Check if user is the author or has admin permissions
    if (existingPost[0]['authorId'] !== context.userId &&
        context.role !== 'admin') {
        const community = await getCommunityById(existingPost[0]['communityId'], context);
        if (community?.createdBy !== context.userId) {
            const membership = await getCommunityMembership(existingPost[0]['communityId'], context.userId, context);
            if (!membership || membership.role !== 'admin') {
                throw new Error('Insufficient permissions to delete post');
            }
        }
    }
    const result = await db
        .delete(communityPosts)
        .where(eq(communityPosts.id, postId));
    return result.length > 0;
}
//# sourceMappingURL=communities.js.map