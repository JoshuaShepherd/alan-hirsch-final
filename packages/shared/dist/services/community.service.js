import { db } from '@/lib/db/drizzle';
import { communities } from '@/lib/db/schema';
import { newCommunitySchema, queryCommunitySchema, updateCommunitySchema, } from '@/src/lib/schemas/crud.schemas';
import { databaseCommunitySchema } from '@/src/lib/schemas/database.schemas';
import { and, desc, eq, sql } from 'drizzle-orm';
import { BaseService } from './base.service';
// ============================================================================
// COMMUNITY SERVICE
// ============================================================================
export class CommunityService extends BaseService {
    table = communities;
    entityName = 'Community';
    createSchema = newCommunitySchema;
    updateSchema = updateCommunitySchema;
    querySchema = queryCommunitySchema;
    outputSchema = databaseCommunitySchema;
    /**
     * Find community by slug
     */
    async findBySlug(slug) {
        try {
            const [result] = await db
                .select()
                .from(communities)
                .where(eq(communities.slug, slug))
                .limit(1);
            if (!result)
                return null;
            return this.outputSchema.parse(result);
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'findBySlug');
        }
    }
    /**
     * Find active communities
     */
    async findActive() {
        try {
            const results = await db
                .select()
                .from(communities)
                .where(eq(communities.status, 'active'))
                .orderBy(communities.name);
            return results.map(result => this.outputSchema.parse(result));
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'findActive');
        }
    }
    /**
     * Find public communities
     */
    async findPublic() {
        try {
            const results = await db
                .select()
                .from(communities)
                .where(and(eq(communities.visibility, 'public'), eq(communities.status, 'active')))
                .orderBy(desc(communities.memberCount));
            return results.map(result => this.outputSchema.parse(result));
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'findPublic');
        }
    }
    /**
     * Find communities by type
     */
    async findByType(communityType) {
        try {
            const results = await db
                .select()
                .from(communities)
                .where(and(eq(communities.communityType, communityType), eq(communities.status, 'active')))
                .orderBy(communities.name);
            return results.map(result => this.outputSchema.parse(result));
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'findByType');
        }
    }
    /**
     * Find communities by focus
     */
    async findByFocus(focus) {
        try {
            const results = await db
                .select()
                .from(communities)
                .where(and(eq(communities.focus, focus), eq(communities.status, 'active')))
                .orderBy(desc(communities.memberCount));
            return results.map(result => this.outputSchema.parse(result));
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'findByFocus');
        }
    }
    /**
     * Search communities
     */
    async searchCommunities(query, limit = 20) {
        try {
            const results = await db
                .select()
                .from(communities)
                .where(and(eq(communities.status, 'active'), sql `(
              ${communities.name} ILIKE ${`%${query}%`} OR
              ${communities.description} ILIKE ${`%${query}%`} OR
              ${communities.slug} ILIKE ${`%${query}%`}
            )`))
                .orderBy(desc(communities.memberCount))
                .limit(limit);
            return results.map(result => this.outputSchema.parse(result));
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'searchCommunities');
        }
    }
    /**
     * Activate community
     */
    async activate(communityId) {
        try {
            const [result] = await db
                .update(communities)
                .set({
                status: 'active',
                updatedAt: new Date(),
            })
                .where(eq(communities.id, communityId))
                .returning();
            return this.outputSchema.parse(result);
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'activate');
        }
    }
    /**
     * Deactivate community
     */
    async deactivate(communityId) {
        try {
            const [result] = await db
                .update(communities)
                .set({
                status: 'inactive',
                updatedAt: new Date(),
            })
                .where(eq(communities.id, communityId))
                .returning();
            return this.outputSchema.parse(result);
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'deactivate');
        }
    }
    /**
     * Archive community
     */
    async archive(communityId) {
        try {
            const [result] = await db
                .update(communities)
                .set({
                status: 'archived',
                updatedAt: new Date(),
            })
                .where(eq(communities.id, communityId))
                .returning();
            return this.outputSchema.parse(result);
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'archive');
        }
    }
    /**
     * Get community statistics
     */
    async getCommunityStats() {
        try {
            const [totalStats] = await db
                .select({
                total: sql `count(*)`,
                active: sql `count(case when status = 'active' then 1 end)`,
                inactive: sql `count(case when status = 'inactive' then 1 end)`,
                pending: sql `count(case when status = 'pending' then 1 end)`,
                archived: sql `count(case when status = 'archived' then 1 end)`,
                totalMembers: sql `sum(member_count)`,
            })
                .from(communities);
            // Get type breakdown
            const typeStats = await db
                .select({
                communityType: communities.communityType,
                count: sql `count(*)`,
            })
                .from(communities)
                .groupBy(communities.communityType);
            const byType = typeStats.reduce((acc, stat) => {
                acc[stat.communityType] = stat.count;
                return acc;
            }, {});
            // Get focus breakdown
            const focusStats = await db
                .select({
                focus: communities.focus,
                count: sql `count(*)`,
            })
                .from(communities)
                .where(sql `${communities.focus} IS NOT NULL`)
                .groupBy(communities.focus);
            const byFocus = focusStats.reduce((acc, stat) => {
                const focus = stat.focus || 'other';
                acc[focus] = stat.count;
                return acc;
            }, {});
            // Get visibility breakdown
            const visibilityStats = await db
                .select({
                visibility: communities.visibility,
                count: sql `count(*)`,
            })
                .from(communities)
                .groupBy(communities.visibility);
            const byVisibility = visibilityStats.reduce((acc, stat) => {
                acc[stat.visibility] = stat.count;
                return acc;
            }, {});
            return {
                total: totalStats?.total || 0,
                active: totalStats?.active || 0,
                inactive: totalStats?.inactive || 0,
                pending: totalStats?.pending || 0,
                archived: totalStats?.archived || 0,
                byType,
                byFocus,
                byVisibility,
                totalMembers: totalStats?.totalMembers || 0,
            };
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'getCommunityStats');
        }
    }
    /**
     * Get trending communities
     */
    async getTrendingCommunities(limit = 10) {
        try {
            const results = await db
                .select()
                .from(communities)
                .where(and(eq(communities.status, 'active'), eq(communities.visibility, 'public')))
                .orderBy(desc(communities.memberCount))
                .limit(limit);
            return results.map(result => this.outputSchema.parse(result));
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'getTrendingCommunities');
        }
    }
    /**
     * Check if slug is available
     */
    async isSlugAvailable(slug, excludeCommunityId) {
        try {
            const whereConditions = [eq(communities.slug, slug)];
            if (excludeCommunityId) {
                whereConditions.push(sql `${communities.id} != ${excludeCommunityId}`);
            }
            const [result] = await db
                .select({ id: communities.id })
                .from(communities)
                .where(and(...whereConditions))
                .limit(1);
            return !result;
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'isSlugAvailable');
        }
    }
    /**
     * Update member count
     */
    async updateMemberCount(communityId, memberCount) {
        try {
            const [result] = await db
                .update(communities)
                .set({
                memberCount,
                updatedAt: new Date(),
            })
                .where(eq(communities.id, communityId))
                .returning();
            return this.outputSchema.parse(result);
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'updateMemberCount');
        }
    }
}
// ============================================================================
// EXPORTS
// ============================================================================
// CommunityService is already exported as a class above
// Create a singleton instance for convenience
export const communityService = new CommunityService();
//# sourceMappingURL=community.service.js.map