import { databaseUserProfileSchema } from '@platform/contracts/entities/user.schema';
import { CreateUserOperationSchema as newUserProfileSchema, ListUsersOperationSchema as queryUserProfileSchema, UpdateUserOperationSchema as updateUserProfileSchema, } from '@platform/contracts/operations/user.operations';
import { db, organizationMemberships, organizations, userProfiles, } from '@platform/database';
import { and, desc, eq, sql } from 'drizzle-orm';
import { BaseService } from './base.service';
// ============================================================================
// USER SERVICE
// ============================================================================
export class UserService extends BaseService {
    table = userProfiles;
    entityName = 'User';
    createSchema = newUserProfileSchema;
    updateSchema = updateUserProfileSchema;
    querySchema = queryUserProfileSchema;
    outputSchema = databaseUserProfileSchema;
    /**
     * Find user by email address
     */
    async findByEmail(email) {
        try {
            const [result] = await db
                .select()
                .from(userProfiles)
                .where(eq(userProfiles.email, email))
                .limit(1);
            if (!result)
                return null;
            return this.outputSchema.parse(result);
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'findByEmail');
        }
    }
    /**
     * Find user by subdomain
     */
    async findBySubdomain(subdomain) {
        try {
            const [result] = await db
                .select()
                .from(userProfiles)
                .where(eq(userProfiles.subdomain, subdomain))
                .limit(1);
            if (!result)
                return null;
            return this.outputSchema.parse(result);
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'findBySubdomain');
        }
    }
    /**
     * Find user with their organizations
     */
    async findWithOrganizations(userId) {
        try {
            const [userResult] = await db
                .select()
                .from(userProfiles)
                .where(eq(userProfiles.id, userId))
                .limit(1);
            if (!userResult)
                return null;
            const organizationResults = await db
                .select({
                organization: organizations,
                membership: organizationMemberships,
            })
                .from(organizationMemberships)
                .innerJoin(organizations, eq(organizationMemberships.organizationId, organizations.id))
                .where(and(eq(organizationMemberships.userId, userId), eq(organizationMemberships.status, 'active')));
            const user = this.outputSchema.parse(userResult);
            return {
                user,
                organizations: organizationResults,
            };
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'findWithOrganizations');
        }
    }
    /**
     * Update user's last active timestamp
     */
    async updateLastActive(userId) {
        try {
            const [result] = await db
                .update(userProfiles)
                .set({ lastActiveAt: new Date() })
                .where(eq(userProfiles.id, userId))
                .returning();
            return this.outputSchema.parse(result);
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'updateLastActive');
        }
    }
    /**
     * Update user's password (if supported by schema)
     */
    async updatePassword(userId, hashedPassword) {
        try {
            // Check if table has password field
            const tableColumns = Object.keys(userProfiles._.columns);
            if (!tableColumns.includes('password')) {
                throw new Error('User table does not support password updates');
            }
            await db
                .update(userProfiles)
                .set({
                // Password hash is managed by Supabase Auth, not in user_profiles table
                updatedAt: new Date(),
            })
                .where(eq(userProfiles.id, userId));
            return true;
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'updatePassword');
        }
    }
    /**
     * Deactivate user account
     */
    async deactivateUser(userId) {
        try {
            const [result] = await db
                .update(userProfiles)
                .set({
                accountStatus: 'inactive',
                updatedAt: new Date(),
            })
                .where(eq(userProfiles.id, userId))
                .returning();
            return this.outputSchema.parse(result);
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'deactivateUser');
        }
    }
    /**
     * Activate user account
     */
    async activateUser(userId) {
        try {
            const [result] = await db
                .update(userProfiles)
                .set({
                accountStatus: 'active',
                updatedAt: new Date(),
            })
                .where(eq(userProfiles.id, userId))
                .returning();
            return this.outputSchema.parse(result);
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'activateUser');
        }
    }
    /**
     * Get user statistics
     */
    async getUserStats(userId) {
        try {
            const [user] = await db
                .select({
                lastActiveAt: userProfiles.lastActiveAt,
            })
                .from(userProfiles)
                .where(eq(userProfiles.id, userId))
                .limit(1);
            const [contentStats] = await db
                .select({
                totalContent: sql `count(*)`,
                publishedContent: sql `count(case when status = 'published' then 1 end)`,
                totalViews: sql `coalesce(sum(view_count), 0)`,
            })
                .from(userProfiles)
                .where(eq(userProfiles.id, userId));
            const [orgStats] = await db
                .select({
                organizationCount: sql `count(*)`,
            })
                .from(organizationMemberships)
                .where(and(eq(organizationMemberships.userId, userId), eq(organizationMemberships.status, 'active')));
            return {
                totalContent: contentStats?.totalContent || 0,
                publishedContent: contentStats?.publishedContent || 0,
                totalViews: contentStats?.totalViews || 0,
                organizationCount: orgStats?.organizationCount || 0,
                lastActiveAt: user?.lastActiveAt || null,
            };
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'getUserStats');
        }
    }
    /**
     * Search users by name, email, or ministry role
     */
    async searchUsers(query, limit = 20) {
        try {
            const results = await db
                .select()
                .from(userProfiles)
                .where(and(eq(userProfiles.accountStatus, 'active'), sql `(
              ${userProfiles.firstName} ILIKE ${`%${query}%`} OR
              ${userProfiles.lastName} ILIKE ${`%${query}%`} OR
              ${userProfiles.displayName} ILIKE ${`%${query}%`} OR
              ${userProfiles.email} ILIKE ${`%${query}%`} OR
              ${userProfiles.ministryRole} ILIKE ${`%${query}%`}
            )`))
                .orderBy(desc(userProfiles.lastActiveAt))
                .limit(limit);
            return results.map(result => this.outputSchema.parse(result));
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'searchUsers');
        }
    }
    /**
     * Find users by country code
     */
    async findByCountry(countryCode, limit = 50) {
        try {
            const results = await db
                .select()
                .from(userProfiles)
                .where(and(eq(userProfiles.countryCode, countryCode), eq(userProfiles.accountStatus, 'active')))
                .orderBy(desc(userProfiles.lastActiveAt))
                .limit(limit);
            return results.map(result => this.outputSchema.parse(result));
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'findByCountry');
        }
    }
    /**
     * Find users by ministry role
     */
    async findByMinistryRole(ministryRole, limit = 50) {
        try {
            const results = await db
                .select()
                .from(userProfiles)
                .where(and(eq(userProfiles.ministryRole, ministryRole), eq(userProfiles.accountStatus, 'active')))
                .orderBy(desc(userProfiles.lastActiveAt))
                .limit(limit);
            return results.map(result => this.outputSchema.parse(result));
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'findByMinistryRole');
        }
    }
    /**
     * Get users created within a date range
     */
    async findByDateRange(startDate, endDate) {
        try {
            const results = await db
                .select()
                .from(userProfiles)
                .where(and(sql `${userProfiles.createdAt} >= ${startDate}`, sql `${userProfiles.createdAt} <= ${endDate}`))
                .orderBy(desc(userProfiles.createdAt));
            return results.map(result => this.outputSchema.parse(result));
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'findByDateRange');
        }
    }
    /**
     * Update user's assessment scores
     */
    async updateAssessmentScores(userId, scores) {
        try {
            const [result] = await db
                .update(userProfiles)
                .set({
                ...scores,
                updatedAt: new Date(),
            })
                .where(eq(userProfiles.id, userId))
                .returning();
            return this.outputSchema.parse(result);
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'updateAssessmentScores');
        }
    }
    /**
     * Check if email is already in use
     */
    async isEmailInUse(email, excludeUserId) {
        try {
            const whereConditions = [eq(userProfiles.email, email)];
            if (excludeUserId) {
                whereConditions.push(sql `${userProfiles.id} != ${excludeUserId}`);
            }
            const [result] = await db
                .select({ id: userProfiles.id })
                .from(userProfiles)
                .where(and(...whereConditions))
                .limit(1);
            return !!result;
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'isEmailInUse');
        }
    }
    /**
     * Check if subdomain is already in use
     */
    async isSubdomainInUse(subdomain, excludeUserId) {
        try {
            const whereConditions = [eq(userProfiles.subdomain, subdomain)];
            if (excludeUserId) {
                whereConditions.push(sql `${userProfiles.id} != ${excludeUserId}`);
            }
            const [result] = await db
                .select({ id: userProfiles.id })
                .from(userProfiles)
                .where(and(...whereConditions))
                .limit(1);
            return !!result;
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'isSubdomainInUse');
        }
    }
}
// ============================================================================
// EXPORTS
// ============================================================================
// UserService is already exported as a class above
//# sourceMappingURL=user.service.js.map