import { db } from '@platform/database/db/drizzle';
import {
  organizationMemberships,
  organizations,
  userProfiles,
} from '@platform/database/db/schema';
import {
  CreateOrganizationSchema,
  OrganizationEntitySchema,
  OrganizationQuerySchema,
  UpdateOrganizationSchema,
} from '@platform/contracts';
import { and, desc, eq, sql } from 'drizzle-orm';
import { z } from 'zod';
import { BaseService } from './base.service';

// ============================================================================
// ORGANIZATION SERVICE
// ============================================================================

export class OrganizationService extends BaseService<
  z.infer<typeof OrganizationEntitySchema>,
  z.infer<typeof CreateOrganizationSchema>,
  z.infer<typeof UpdateOrganizationSchema>,
  z.infer<typeof OrganizationQuerySchema>,
  typeof organizations
> {
  protected table = organizations;
  protected entityName = 'Organization';
  protected createSchema = CreateOrganizationSchema;
  protected updateSchema = UpdateOrganizationSchema;
  protected querySchema = OrganizationQuerySchema;
  protected outputSchema = OrganizationEntitySchema;

  /**
   * Find organization by slug
   */
  async findBySlug(
    slug: string
  ): Promise<z.infer<typeof OrganizationEntitySchema> | null> {
    try {
      const [result] = await db
        .select()
        .from(organizations)
        .where(eq(organizations.slug, slug))
        .limit(1);

      if (!result) return null;

      return this.outputSchema.parse(result);
    } catch (error) {
      throw this.handleDatabaseError(error, 'findBySlug');
    }
  }

  /**
   * Find organizations by account owner
   */
  async findByAccountOwner(
    accountOwnerId: string
  ): Promise<z.infer<typeof OrganizationEntitySchema>[]> {
    try {
      const results = await db
        .select()
        .from(organizations)
        .where(eq(organizations.accountOwnerId, accountOwnerId))
        .orderBy(desc(organizations.createdAt));

      return results.map(result => this.outputSchema.parse(result));
    } catch (error) {
      throw this.handleDatabaseError(error, 'findByAccountOwner');
    }
  }

  /**
   * Find organizations by type
   */
  async findByType(
    organizationType: string
  ): Promise<z.infer<typeof OrganizationEntitySchema>[]> {
    try {
      const results = await db
        .select()
        .from(organizations)
        .where(
          and(
            eq(organizations.organizationType, organizationType),
            eq(organizations.status, 'active')
          )
        )
        .orderBy(organizations.name);

      return results.map(result => this.outputSchema.parse(result));
    } catch (error) {
      throw this.handleDatabaseError(error, 'findByType');
    }
  }

  /**
   * Find organizations by size category
   */
  async findBySizeCategory(
    sizeCategory: string
  ): Promise<z.infer<typeof OrganizationEntitySchema>[]> {
    try {
      const results = await db
        .select()
        .from(organizations)
        .where(
          and(
            eq(organizations.sizeCategory, sizeCategory),
            eq(organizations.status, 'active')
          )
        )
        .orderBy(organizations.name);

      return results.map(result => this.outputSchema.parse(result));
    } catch (error) {
      throw this.handleDatabaseError(error, 'findBySizeCategory');
    }
  }

  /**
   * Find organizations by status
   */
  async findByStatus(
    status: string
  ): Promise<z.infer<typeof OrganizationEntitySchema>[]> {
    try {
      const results = await db
        .select()
        .from(organizations)
        .where(eq(organizations.status, status))
        .orderBy(organizations.name);

      return results.map(result => this.outputSchema.parse(result));
    } catch (error) {
      throw this.handleDatabaseError(error, 'findByStatus');
    }
  }

  /**
   * Get organization with members
   */
  async findWithMembers(organizationId: string): Promise<{
    organization: z.infer<typeof OrganizationEntitySchema>;
    members: Array<{
      membership: z.infer<typeof databaseOrganizationMembershipSchema>;
      user: any;
    }>;
  } | null> {
    try {
      const [organizationResult] = await db
        .select()
        .from(organizations)
        .where(eq(organizations.id, organizationId))
        .limit(1);

      if (!organizationResult) return null;

      const membersResults = await db
        .select({
          membership: organizationMemberships,
          user: userProfiles,
        })
        .from(organizationMemberships)
        .innerJoin(
          userProfiles,
          eq(organizationMemberships.userId, userProfiles.id)
        )
        .where(
          and(
            eq(organizationMemberships.organizationId, organizationId),
            eq(organizationMemberships.status, 'active')
          )
        )
        .orderBy(organizationMemberships.joinedAt);

      return {
        organization: this.outputSchema.parse(organizationResult),
        members: membersResults.map(({ membership, user }) => ({
          membership: databaseOrganizationMembershipSchema.parse(membership),
          user,
        })),
      };
    } catch (error) {
      throw this.handleDatabaseError(error, 'findWithMembers');
    }
  }

  /**
   * Get organization statistics
   */
  async getOrganizationStats(organizationId: string): Promise<{
    memberCount: number;
    activeMembers: number;
    pendingMembers: number;
    ownerCount: number;
    adminCount: number;
    memberCount: number;
  }> {
    try {
      const [stats] = await db
        .select({
          memberCount: sql<number>`count(*)`,
          activeMembers: sql<number>`count(case when status = 'active' then 1 end)`,
          pendingMembers: sql<number>`count(case when status = 'pending' then 1 end)`,
          ownerCount: sql<number>`count(case when role = 'owner' then 1 end)`,
          adminCount: sql<number>`count(case when role = 'admin' then 1 end)`,
          regularMemberCount: sql<number>`count(case when role = 'member' then 1 end)`,
        })
        .from(organizationMemberships)
        .where(eq(organizationMemberships.organizationId, organizationId));

      return {
        memberCount: stats?.memberCount || 0,
        activeMembers: stats?.activeMembers || 0,
        pendingMembers: stats?.pendingMembers || 0,
        ownerCount: stats?.ownerCount || 0,
        adminCount: stats?.adminCount || 0,
        regularMemberCount: stats?.regularMemberCount || 0,
      };
    } catch (error) {
      throw this.handleDatabaseError(error, 'getOrganizationStats');
    }
  }

  /**
   * Activate organization
   */
  async activate(
    organizationId: string
  ): Promise<z.infer<typeof OrganizationEntitySchema>> {
    try {
      const [result] = await db
        .update(organizations)
        .set({
          status: 'active',
          updatedAt: new Date(),
        })
        .where(eq(organizations.id, organizationId))
        .returning();

      return this.outputSchema.parse(result);
    } catch (error) {
      throw this.handleDatabaseError(error, 'activate');
    }
  }

  /**
   * Deactivate organization
   */
  async deactivate(
    organizationId: string
  ): Promise<z.infer<typeof OrganizationEntitySchema>> {
    try {
      const [result] = await db
        .update(organizations)
        .set({
          status: 'inactive',
          updatedAt: new Date(),
        })
        .where(eq(organizations.id, organizationId))
        .returning();

      return this.outputSchema.parse(result);
    } catch (error) {
      throw this.handleDatabaseError(error, 'deactivate');
    }
  }

  /**
   * Suspend organization
   */
  async suspend(
    organizationId: string
  ): Promise<z.infer<typeof OrganizationEntitySchema>> {
    try {
      const [result] = await db
        .update(organizations)
        .set({
          status: 'suspended',
          updatedAt: new Date(),
        })
        .where(eq(organizations.id, organizationId))
        .returning();

      return this.outputSchema.parse(result);
    } catch (error) {
      throw this.handleDatabaseError(error, 'suspend');
    }
  }

  /**
   * Check if slug is available
   */
  async isSlugAvailable(
    slug: string,
    excludeOrganizationId?: string
  ): Promise<boolean> {
    try {
      const whereConditions = [eq(organizations.slug, slug)];

      if (excludeOrganizationId) {
        whereConditions.push(
          sql`${organizations.id} != ${excludeOrganizationId}`
        );
      }

      const [result] = await db
        .select({ id: organizations.id })
        .from(organizations)
        .where(and(...whereConditions))
        .limit(1);

      return !result;
    } catch (error) {
      throw this.handleDatabaseError(error, 'isSlugAvailable');
    }
  }

  /**
   * Search organizations
   */
  async searchOrganizations(
    query: string,
    limit: number = 20
  ): Promise<z.infer<typeof OrganizationEntitySchema>[]> {
    try {
      const results = await db
        .select()
        .from(organizations)
        .where(
          and(
            eq(organizations.status, 'active'),
            sql`(
              ${organizations.name} ILIKE ${`%${query}%`} OR
              ${organizations.description} ILIKE ${`%${query}%`} OR
              ${organizations.slug} ILIKE ${`%${query}%`}
            )`
          )
        )
        .orderBy(desc(organizations.createdAt))
        .limit(limit);

      return results.map(result => this.outputSchema.parse(result));
    } catch (error) {
      throw this.handleDatabaseError(error, 'searchOrganizations');
    }
  }
}

// ============================================================================
// ORGANIZATION MEMBERSHIP SERVICE
// ============================================================================

export class OrganizationMembershipService extends BaseService<
  z.infer<typeof databaseOrganizationMembershipSchema>,
  z.infer<typeof newOrganizationMembershipSchema>,
  z.infer<typeof updateOrganizationMembershipSchema>,
  z.infer<typeof queryOrganizationMembershipSchema>,
  typeof organizationMemberships
> {
  protected table = organizationMemberships;
  protected entityName = 'OrganizationMembership';
  protected createSchema = newOrganizationMembershipSchema;
  protected updateSchema = updateOrganizationMembershipSchema;
  protected querySchema = queryOrganizationMembershipSchema;
  protected outputSchema = databaseOrganizationMembershipSchema;

  /**
   * Find membership by user and organization
   */
  async findByUserAndOrganization(
    userId: string,
    organizationId: string
  ): Promise<z.infer<typeof databaseOrganizationMembershipSchema> | null> {
    try {
      const [result] = await db
        .select()
        .from(organizationMemberships)
        .where(
          and(
            eq(organizationMemberships.userId, userId),
            eq(organizationMemberships.organizationId, organizationId)
          )
        )
        .limit(1);

      if (!result) return null;

      return this.outputSchema.parse(result);
    } catch (error) {
      throw this.handleDatabaseError(error, 'findByUserAndOrganization');
    }
  }

  /**
   * Find memberships by user
   */
  async findByUser(userId: string): Promise<
    Array<
      z.infer<typeof databaseOrganizationMembershipSchema> & {
        organization: z.infer<typeof OrganizationEntitySchema>;
      }
    >
  > {
    try {
      const results = await db
        .select({
          membership: organizationMemberships,
          organization: organizations,
        })
        .from(organizationMemberships)
        .innerJoin(
          organizations,
          eq(organizationMemberships.organizationId, organizations.id)
        )
        .where(eq(organizationMemberships.userId, userId))
        .orderBy(desc(organizationMemberships.joinedAt));

      return results.map(({ membership, organization }) => ({
        ...this.outputSchema.parse(membership),
        organization: OrganizationEntitySchema.parse(organization),
      }));
    } catch (error) {
      throw this.handleDatabaseError(error, 'findByUser');
    }
  }

  /**
   * Find memberships by organization
   */
  async findByOrganization(organizationId: string): Promise<
    Array<
      z.infer<typeof databaseOrganizationMembershipSchema> & {
        user: any;
      }
    >
  > {
    try {
      const results = await db
        .select({
          membership: organizationMemberships,
          user: userProfiles,
        })
        .from(organizationMemberships)
        .innerJoin(
          userProfiles,
          eq(organizationMemberships.userId, userProfiles.id)
        )
        .where(eq(organizationMemberships.organizationId, organizationId))
        .orderBy(organizationMemberships.joinedAt);

      return results.map(({ membership, user }) => ({
        ...this.outputSchema.parse(membership),
        user,
      }));
    } catch (error) {
      throw this.handleDatabaseError(error, 'findByOrganization');
    }
  }

  /**
   * Find active memberships by user
   */
  async findActiveByUser(userId: string): Promise<
    Array<
      z.infer<typeof databaseOrganizationMembershipSchema> & {
        organization: z.infer<typeof OrganizationEntitySchema>;
      }
    >
  > {
    try {
      const results = await db
        .select({
          membership: organizationMemberships,
          organization: organizations,
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
        )
        .orderBy(desc(organizationMemberships.joinedAt));

      return results.map(({ membership, organization }) => ({
        ...this.outputSchema.parse(membership),
        organization: OrganizationEntitySchema.parse(organization),
      }));
    } catch (error) {
      throw this.handleDatabaseError(error, 'findActiveByUser');
    }
  }

  /**
   * Find memberships by role
   */
  async findByRole(
    organizationId: string,
    role: string
  ): Promise<z.infer<typeof databaseOrganizationMembershipSchema>[]> {
    try {
      const results = await db
        .select()
        .from(organizationMemberships)
        .where(
          and(
            eq(organizationMemberships.organizationId, organizationId),
            eq(organizationMemberships.role, role),
            eq(organizationMemberships.status, 'active')
          )
        )
        .orderBy(organizationMemberships.joinedAt);

      return results.map(result => this.outputSchema.parse(result));
    } catch (error) {
      throw this.handleDatabaseError(error, 'findByRole');
    }
  }

  /**
   * Add user to organization
   */
  async addMember(
    userId: string,
    organizationId: string,
    role: string = 'member',
    invitedBy?: string
  ): Promise<z.infer<typeof databaseOrganizationMembershipSchema>> {
    try {
      // Check if membership already exists
      const existing = await this.findByUserAndOrganization(
        userId,
        organizationId
      );
      if (existing) {
        throw new Error('User is already a member of this organization');
      }

      const [result] = await db
        .insert(organizationMemberships)
        .values({
          userId,
          organizationId,
          role,
          status: 'active',
          joinedAt: new Date(),
          invitedBy,
          invitedAt: invitedBy ? new Date() : undefined,
        })
        .returning();

      return this.outputSchema.parse(result);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes('already a member')
      ) {
        throw error;
      }
      throw this.handleDatabaseError(error, 'addMember');
    }
  }

  /**
   * Remove user from organization
   */
  async removeMember(userId: string, organizationId: string): Promise<boolean> {
    try {
      await db
        .delete(organizationMemberships)
        .where(
          and(
            eq(organizationMemberships.userId, userId),
            eq(organizationMemberships.organizationId, organizationId)
          )
        );

      return true;
    } catch (error) {
      throw this.handleDatabaseError(error, 'removeMember');
    }
  }

  /**
   * Update member role
   */
  async updateMemberRole(
    userId: string,
    organizationId: string,
    newRole: string
  ): Promise<z.infer<typeof databaseOrganizationMembershipSchema>> {
    try {
      const [result] = await db
        .update(organizationMemberships)
        .set({
          role: newRole,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(organizationMemberships.userId, userId),
            eq(organizationMemberships.organizationId, organizationId)
          )
        )
        .returning();

      return this.outputSchema.parse(result);
    } catch (error) {
      throw this.handleDatabaseError(error, 'updateMemberRole');
    }
  }

  /**
   * Update membership status
   */
  async updateMembershipStatus(
    userId: string,
    organizationId: string,
    status: string
  ): Promise<z.infer<typeof databaseOrganizationMembershipSchema>> {
    try {
      const [result] = await db
        .update(organizationMemberships)
        .set({
          status,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(organizationMemberships.userId, userId),
            eq(organizationMemberships.organizationId, organizationId)
          )
        )
        .returning();

      return this.outputSchema.parse(result);
    } catch (error) {
      throw this.handleDatabaseError(error, 'updateMembershipStatus');
    }
  }

  /**
   * Check if user is member of organization
   */
  async isMember(userId: string, organizationId: string): Promise<boolean> {
    try {
      const membership = await this.findByUserAndOrganization(
        userId,
        organizationId
      );
      return membership ? membership.status === 'active' : false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Check if user has specific role in organization
   */
  async hasRole(
    userId: string,
    organizationId: string,
    role: string
  ): Promise<boolean> {
    try {
      const membership = await this.findByUserAndOrganization(
        userId,
        organizationId
      );
      return membership
        ? membership.role === role && membership.status === 'active'
        : false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Check if user is admin or owner of organization
   */
  async isAdminOrOwner(
    userId: string,
    organizationId: string
  ): Promise<boolean> {
    try {
      const membership = await this.findByUserAndOrganization(
        userId,
        organizationId
      );
      return membership
        ? (membership.role === 'admin' || membership.role === 'owner') &&
            membership.status === 'active'
        : false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get organization owners
   */
  async getOwners(
    organizationId: string
  ): Promise<z.infer<typeof databaseOrganizationMembershipSchema>[]> {
    try {
      return this.findByRole(organizationId, 'owner');
    } catch (error) {
      throw this.handleDatabaseError(error, 'getOwners');
    }
  }

  /**
   * Get organization admins
   */
  async getAdmins(
    organizationId: string
  ): Promise<z.infer<typeof databaseOrganizationMembershipSchema>[]> {
    try {
      return this.findByRole(organizationId, 'admin');
    } catch (error) {
      throw this.handleDatabaseError(error, 'getAdmins');
    }
  }

  /**
   * Get pending memberships
   */
  async getPendingMemberships(
    organizationId: string
  ): Promise<z.infer<typeof databaseOrganizationMembershipSchema>[]> {
    try {
      const results = await db
        .select()
        .from(organizationMemberships)
        .where(
          and(
            eq(organizationMemberships.organizationId, organizationId),
            eq(organizationMemberships.status, 'pending')
          )
        )
        .orderBy(organizationMemberships.invitedAt);

      return results.map(result => this.outputSchema.parse(result));
    } catch (error) {
      throw this.handleDatabaseError(error, 'getPendingMemberships');
    }
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

// Services are already exported as classes above
