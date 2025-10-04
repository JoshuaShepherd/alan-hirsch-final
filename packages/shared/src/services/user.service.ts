import { db } from '@platform/database/db/drizzle';
import {
  organizationMemberships,
  organizations,
  userProfiles,
} from '@platform/database/db/schema';
import {
  CreateUserSchema,
  UpdateUserSchema,
  UserEntitySchema,
  UserQuerySchema,
} from '@platform/contracts/entities';
import { and, desc, eq, sql } from 'drizzle-orm';
import { z } from 'zod';
import { BaseService } from './base.service';

// ============================================================================
// USER SERVICE
// ============================================================================

export class UserService extends BaseService<
  z.infer<typeof UserEntitySchema>,
  z.infer<typeof CreateUserSchema>,
  z.infer<typeof UpdateUserSchema>,
  z.infer<typeof UserQuerySchema>,
  typeof userProfiles
> {
  protected table = userProfiles;
  protected entityName = 'User';
  protected createSchema = CreateUserSchema;
  protected updateSchema = UpdateUserSchema;
  protected querySchema = UserQuerySchema;
  protected outputSchema = UserEntitySchema;

  /**
   * Find user by email address
   */
  async findByEmail(
    email: string
  ): Promise<z.infer<typeof UserEntitySchema> | null> {
    try {
      const [result] = await db
        .select()
        .from(userProfiles)
        .where(eq(userProfiles.email, email))
        .limit(1);

      if (!result) return null;

      return this.outputSchema.parse(result);
    } catch (error) {
      throw this.handleDatabaseError(error, 'findByEmail');
    }
  }

  /**
   * Find user by subdomain
   */
  async findBySubdomain(
    subdomain: string
  ): Promise<z.infer<typeof databaseUserProfileSchema> | null> {
    try {
      const [result] = await db
        .select()
        .from(userProfiles)
        .where(eq(userProfiles.subdomain, subdomain))
        .limit(1);

      if (!result) return null;

      return this.outputSchema.parse(result);
    } catch (error) {
      throw this.handleDatabaseError(error, 'findBySubdomain');
    }
  }

  /**
   * Find user with their organizations
   */
  async findWithOrganizations(userId: string): Promise<{
    user: z.infer<typeof databaseUserProfileSchema>;
    organizations: Array<{
      organization: any;
      membership: any;
    }>;
  } | null> {
    try {
      const [userResult] = await db
        .select()
        .from(userProfiles)
        .where(eq(userProfiles.id, userId))
        .limit(1);

      if (!userResult) return null;

      const organizationResults = await db
        .select({
          organization: organizations,
          membership: organizationMemberships,
        })
        .from(organizationMemberships)
        .innerJoin(
          organizations,
          eq(organizationMemberships.organizationId, organizations.id)
        )
        .where(
          and(
            eq(organizationMemberships.userId, userId),
            eq(organizationMemberships.status, 'active')
          )
        );

      const user = this.outputSchema.parse(userResult);

      return {
        user,
        organizations: organizationResults,
      };
    } catch (error) {
      throw this.handleDatabaseError(error, 'findWithOrganizations');
    }
  }

  /**
   * Update user's last active timestamp
   */
  async updateLastActive(
    userId: string
  ): Promise<z.infer<typeof databaseUserProfileSchema>> {
    try {
      const [result] = await db
        .update(userProfiles)
        .set({ lastActiveAt: new Date() })
        .where(eq(userProfiles.id, userId))
        .returning();

      return this.outputSchema.parse(result);
    } catch (error) {
      throw this.handleDatabaseError(error, 'updateLastActive');
    }
  }

  /**
   * Update user's password (if supported by schema)
   */
  async updatePassword(
    userId: string,
    hashedPassword: string
  ): Promise<boolean> {
    try {
      // Check if table has password field
      const tableColumns = Object.keys(userProfiles._.columns);
      if (!tableColumns.includes('password')) {
        throw new Error('User table does not support password updates');
      }

      await db
        .update(userProfiles)
        .set({
          password: hashedPassword,
          updatedAt: new Date(),
        })
        .where(eq(userProfiles.id, userId));

      return true;
    } catch (error) {
      throw this.handleDatabaseError(error, 'updatePassword');
    }
  }

  /**
   * Deactivate user account
   */
  async deactivateUser(
    userId: string
  ): Promise<z.infer<typeof databaseUserProfileSchema>> {
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
    } catch (error) {
      throw this.handleDatabaseError(error, 'deactivateUser');
    }
  }

  /**
   * Activate user account
   */
  async activateUser(
    userId: string
  ): Promise<z.infer<typeof databaseUserProfileSchema>> {
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
    } catch (error) {
      throw this.handleDatabaseError(error, 'activateUser');
    }
  }

  /**
   * Get user statistics
   */
  async getUserStats(userId: string): Promise<{
    totalContent: number;
    publishedContent: number;
    totalViews: number;
    organizationCount: number;
    lastActiveAt: Date | null;
  }> {
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
          totalContent: sql<number>`count(*)`,
          publishedContent: sql<number>`count(case when status = 'published' then 1 end)`,
          totalViews: sql<number>`coalesce(sum(view_count), 0)`,
        })
        .from(userProfiles)
        .where(eq(userProfiles.id, userId));

      const [orgStats] = await db
        .select({
          organizationCount: sql<number>`count(*)`,
        })
        .from(organizationMemberships)
        .where(
          and(
            eq(organizationMemberships.userId, userId),
            eq(organizationMemberships.status, 'active')
          )
        );

      return {
        totalContent: contentStats?.totalContent || 0,
        publishedContent: contentStats?.publishedContent || 0,
        totalViews: contentStats?.totalViews || 0,
        organizationCount: orgStats?.organizationCount || 0,
        lastActiveAt: user?.lastActiveAt || null,
      };
    } catch (error) {
      throw this.handleDatabaseError(error, 'getUserStats');
    }
  }

  /**
   * Search users by name, email, or ministry role
   */
  async searchUsers(
    query: string,
    limit: number = 20
  ): Promise<z.infer<typeof databaseUserProfileSchema>[]> {
    try {
      const results = await db
        .select()
        .from(userProfiles)
        .where(
          and(
            eq(userProfiles.accountStatus, 'active'),
            sql`(
              ${userProfiles.firstName} ILIKE ${`%${query}%`} OR
              ${userProfiles.lastName} ILIKE ${`%${query}%`} OR
              ${userProfiles.displayName} ILIKE ${`%${query}%`} OR
              ${userProfiles.email} ILIKE ${`%${query}%`} OR
              ${userProfiles.ministryRole} ILIKE ${`%${query}%`}
            )`
          )
        )
        .orderBy(desc(userProfiles.lastActiveAt))
        .limit(limit);

      return results.map(result => this.outputSchema.parse(result));
    } catch (error) {
      throw this.handleDatabaseError(error, 'searchUsers');
    }
  }

  /**
   * Find users by country code
   */
  async findByCountry(
    countryCode: string,
    limit: number = 50
  ): Promise<z.infer<typeof databaseUserProfileSchema>[]> {
    try {
      const results = await db
        .select()
        .from(userProfiles)
        .where(
          and(
            eq(userProfiles.countryCode, countryCode),
            eq(userProfiles.accountStatus, 'active')
          )
        )
        .orderBy(desc(userProfiles.lastActiveAt))
        .limit(limit);

      return results.map(result => this.outputSchema.parse(result));
    } catch (error) {
      throw this.handleDatabaseError(error, 'findByCountry');
    }
  }

  /**
   * Find users by ministry role
   */
  async findByMinistryRole(
    ministryRole: string,
    limit: number = 50
  ): Promise<z.infer<typeof databaseUserProfileSchema>[]> {
    try {
      const results = await db
        .select()
        .from(userProfiles)
        .where(
          and(
            eq(userProfiles.ministryRole, ministryRole),
            eq(userProfiles.accountStatus, 'active')
          )
        )
        .orderBy(desc(userProfiles.lastActiveAt))
        .limit(limit);

      return results.map(result => this.outputSchema.parse(result));
    } catch (error) {
      throw this.handleDatabaseError(error, 'findByMinistryRole');
    }
  }

  /**
   * Get users created within a date range
   */
  async findByDateRange(
    startDate: Date,
    endDate: Date
  ): Promise<z.infer<typeof databaseUserProfileSchema>[]> {
    try {
      const results = await db
        .select()
        .from(userProfiles)
        .where(
          and(
            sql`${userProfiles.createdAt} >= ${startDate}`,
            sql`${userProfiles.createdAt} <= ${endDate}`
          )
        )
        .orderBy(desc(userProfiles.createdAt));

      return results.map(result => this.outputSchema.parse(result));
    } catch (error) {
      throw this.handleDatabaseError(error, 'findByDateRange');
    }
  }

  /**
   * Update user's assessment scores
   */
  async updateAssessmentScores(
    userId: string,
    scores: {
      movementAlignment?: number;
      audienceEngagement?: number;
      contentReadiness?: number;
      revenuePotential?: number;
      networkEffects?: number;
      strategicFit?: number;
      total?: number;
    }
  ): Promise<z.infer<typeof databaseUserProfileSchema>> {
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
    } catch (error) {
      throw this.handleDatabaseError(error, 'updateAssessmentScores');
    }
  }

  /**
   * Check if email is already in use
   */
  async isEmailInUse(email: string, excludeUserId?: string): Promise<boolean> {
    try {
      const whereConditions = [eq(userProfiles.email, email)];

      if (excludeUserId) {
        whereConditions.push(sql`${userProfiles.id} != ${excludeUserId}`);
      }

      const [result] = await db
        .select({ id: userProfiles.id })
        .from(userProfiles)
        .where(and(...whereConditions))
        .limit(1);

      return !!result;
    } catch (error) {
      throw this.handleDatabaseError(error, 'isEmailInUse');
    }
  }

  /**
   * Check if subdomain is already in use
   */
  async isSubdomainInUse(
    subdomain: string,
    excludeUserId?: string
  ): Promise<boolean> {
    try {
      const whereConditions = [eq(userProfiles.subdomain, subdomain)];

      if (excludeUserId) {
        whereConditions.push(sql`${userProfiles.id} != ${excludeUserId}`);
      }

      const [result] = await db
        .select({ id: userProfiles.id })
        .from(userProfiles)
        .where(and(...whereConditions))
        .limit(1);

      return !!result;
    } catch (error) {
      throw this.handleDatabaseError(error, 'isSubdomainInUse');
    }
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

// UserService is already exported as a class above
