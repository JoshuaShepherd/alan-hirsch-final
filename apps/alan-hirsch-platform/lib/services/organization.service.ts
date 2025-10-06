// ============================================================================
// ORGANIZATION SERVICE
// ============================================================================
// Use-case functions that orchestrate organization query modules + mappers
// Following alignment reference patterns for business logic and authorization

import type {
  CreateOrganization,
  CreateOrganizationMembership,
  OrganizationMembershipQuery,
  OrganizationMembershipResponse,
  OrganizationQuery,
  OrganizationResponse,
  UpdateOrganization,
  UpdateOrganizationMembership,
} from '@platform/contracts';
import {
  createOrganizationMembershipSchema,
  createOrganizationSchema,
  organizationMembershipQuerySchema,
  organizationQuerySchema,
  updateOrganizationMembershipSchema,
  updateOrganizationSchema,
} from '@platform/contracts';
import type { QueryContext } from '@platform/database';
import {
  acceptOrganizationInvitation,
  createOrganization,
  createOrganizationMembership,
  deleteOrganization,
  deleteOrganizationMembership,
  getOrganizationBilling,
  getOrganizationById,
  getOrganizationBySlug,
  getOrganizationMembers,
  getOrganizationMembershipById,
  getOrganizationStats,
  getOrganizationsByUser,
  inviteUserToOrganization,
  rejectOrganizationInvitation,
  searchOrganizations,
  updateOrganization,
  updateOrganizationMembership,
} from '@platform/database';
import {
  fromCreateOrganization,
  fromUpdateOrganization,
  toOrganizationResponseDTO,
} from '../mappers/organization';
import { BaseService } from './base.service';
import {
  AuthHelpers,
  ForbiddenError,
  NotFoundError,
  PaginatedServiceResult,
  ServiceContext,
  ServiceResult,
} from './types';

/**
 * Organization Service
 * Orchestrates organization domain operations with business logic and authorization
 */
export class OrganizationService extends BaseService<
  OrganizationResponse,
  CreateOrganization,
  UpdateOrganization,
  OrganizationQuery
> {
  protected entityName = 'Organization';
  protected createSchema = createOrganizationSchema;
  protected updateSchema = updateOrganizationSchema;
  protected querySchema = organizationQuerySchema;

  // ============================================================================
  // CORE CRUD OPERATIONS (inherited from BaseService)
  // ============================================================================

  protected mapDbToEntity(
    dbResult: unknown,
    context: ServiceContext
  ): OrganizationResponse {
    return toOrganizationResponseDTO(dbResult as any);
  }

  protected mapCreateToDb(
    data: CreateOrganization,
    context: ServiceContext
  ): unknown {
    return fromCreateOrganization(data);
  }

  protected mapUpdateToDb(
    data: UpdateOrganization,
    context: ServiceContext
  ): unknown {
    return fromUpdateOrganization(data);
  }

  protected async executeCreate(
    data: unknown,
    context: ServiceContext
  ): Promise<unknown> {
    const queryContext = this.mapToQueryContext(context);
    return createOrganization(data as any, queryContext);
  }

  protected async executeFindById(
    id: string,
    context: ServiceContext
  ): Promise<unknown | null> {
    const queryContext = this.mapToQueryContext(context);
    return getOrganizationById(id, queryContext);
  }

  protected async executeFindMany(
    query: OrganizationQuery,
    context: ServiceContext
  ): Promise<{
    data: unknown[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasMore: boolean;
    };
  }> {
    const queryContext = this.mapToQueryContext(context);
    const searchResult = await searchOrganizations(
      query.search || '',
      queryContext,
      {
        limit: query.limit || 20,
        offset: ((query.page || 1) - 1) * (query.limit || 20),
        organizationType: query.organizationType,
        sizeCategory: query.sizeCategory,
        status: query.status as any,
      }
    );

    // Handle SearchResult type - extract the data array
    const results = Array.isArray(searchResult)
      ? searchResult
      : (searchResult as any).data || [];

    return {
      data: results,
      pagination: {
        page: query.page || 1,
        limit: query.limit || 20,
        total: results.length, // This would be improved with proper count query
        totalPages: Math.ceil(results.length / (query.limit || 20)),
        hasMore: results.length === (query.limit || 20),
      },
    };
  }

  protected async executeUpdate(
    id: string,
    data: unknown,
    context: ServiceContext
  ): Promise<unknown | null> {
    const queryContext = this.mapToQueryContext(context);
    return updateOrganization(id, data as any, queryContext);
  }

  protected async executeDelete(
    id: string,
    context: ServiceContext
  ): Promise<void> {
    const queryContext = this.mapToQueryContext(context);
    await deleteOrganization(id, queryContext);
  }

  // ============================================================================
  // ORGANIZATION-SPECIFIC BUSINESS OPERATIONS
  // ============================================================================

  /**
   * Find organization by slug
   */
  async findBySlug(
    slug: string,
    context: ServiceContext
  ): Promise<ServiceResult<OrganizationResponse>> {
    try {
      const queryContext = this.mapToQueryContext(context);
      const dbResult = await getOrganizationBySlug(slug, queryContext);

      if (!dbResult) {
        throw new NotFoundError(this.entityName, slug);
      }

      const entity = this.mapDbToEntity(dbResult, context);
      return {
        success: true,
        data: entity,
      };
    } catch (error) {
      return this.handleError(error, 'findBySlug');
    }
  }

  /**
   * Get user's organizations
   */
  async getUserOrganizations(
    userId: string,
    context: ServiceContext,
    options: {
      status?: 'active' | 'pending' | 'inactive';
      role?: string;
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<ServiceResult<OrganizationResponse[]>> {
    try {
      // Business rule: Users can only see their own organizations, or admin can see any
      if (userId !== context.userId && !AuthHelpers.isOwnerOrAdmin(context)) {
        throw new ForbiddenError('Cannot view organizations for another user');
      }

      const queryContext = this.mapToQueryContext(context);
      const results = await getOrganizationsByUser(
        userId,
        queryContext,
        options
      );

      const entities = results.map(result =>
        this.mapDbToEntity(result, context)
      );
      return {
        success: true,
        data: entities,
      };
    } catch (error) {
      return this.handleError(error, 'getUserOrganizations');
    }
  }

  /**
   * Get organization statistics
   */
  async getOrganizationStats(
    organizationId: string,
    context: ServiceContext
  ): Promise<
    ServiceResult<{
      totalMembers: number;
      activeMembers: number;
      pendingInvitations: number;
      totalSubscriptions: number;
      activeSubscriptions: number;
      monthlyRevenue: number;
      totalRevenue: number;
    }>
  > {
    try {
      // Business rule: Only organization members can see stats
      if (
        !AuthHelpers.canAccessOrganizationResource(
          context,
          organizationId,
          'member'
        )
      ) {
        throw new ForbiddenError('Cannot view organization stats');
      }

      const queryContext = this.mapToQueryContext(context);
      const stats = await getOrganizationStats(organizationId, queryContext);

      if (!stats) {
        throw new NotFoundError(this.entityName, organizationId);
      }

      return {
        success: true,
        data: stats,
      };
    } catch (error) {
      return this.handleError(error, 'getOrganizationStats');
    }
  }

  /**
   * Get organization members
   */
  async getOrganizationMembers(
    organizationId: string,
    context: ServiceContext,
    options: {
      role?: string;
      status?: 'active' | 'pending' | 'inactive';
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<
    ServiceResult<
      Array<{
        id: string;
        firstName: string;
        lastName: string;
        displayName?: string;
        email: string;
        avatarUrl?: string;
        ministryRole: string;
        membership: {
          id: string;
          role: string;
          status: string;
          joinedAt: string;
          invitedBy?: string;
        };
      }>
    >
  > {
    try {
      // Business rule: Only organization members can see other members
      if (
        !AuthHelpers.canAccessOrganizationResource(
          context,
          organizationId,
          'member'
        )
      ) {
        throw new ForbiddenError('Cannot view organization members');
      }

      const queryContext = this.mapToQueryContext(context);
      const results = await getOrganizationMembers(
        organizationId,
        queryContext,
        options
      );

      const entities = results.map(result => ({
        id: result.id,
        firstName: result.firstName,
        lastName: result.lastName,
        displayName: result.displayName ?? undefined,
        email: result.email,
        avatarUrl: result.avatarUrl ?? undefined,
        ministryRole: result.ministryRole,
        membership: {
          id: result.membership.id,
          role: result.membership.role,
          status: result.membership.status ?? 'active',
          joinedAt:
            result.membership.joinedAt?.toISOString() ??
            new Date().toISOString(),
          invitedBy: result.membership.invitedBy ?? undefined,
        },
      }));

      return {
        success: true,
        data: entities,
      };
    } catch (error) {
      return this.handleError(error, 'getOrganizationMembers');
    }
  }

  /**
   * Get organization billing information
   */
  async getBillingInfo(
    organizationId: string,
    context: ServiceContext
  ): Promise<
    ServiceResult<{
      billingEmail: string;
      contactEmail: string;
      contactPhone: string;
      address: Record<string, unknown>;
      licenseType: string;
      maxUsers: number;
      currentUsers: number;
      subscriptionStatus: string;
    }>
  > {
    try {
      // Business rule: Only organization admins can see billing info
      if (
        !AuthHelpers.canAccessOrganizationResource(
          context,
          organizationId,
          'admin'
        )
      ) {
        throw new ForbiddenError(
          'Cannot view organization billing information'
        );
      }

      const queryContext = this.mapToQueryContext(context);
      const billing = await getOrganizationBilling(
        organizationId,
        queryContext
      );

      if (!billing) {
        throw new NotFoundError(this.entityName, organizationId);
      }

      return {
        success: true,
        data: billing,
      };
    } catch (error) {
      return this.handleError(error, 'getBillingInfo');
    }
  }

  /**
   * Invite user to organization
   */
  async inviteUser(
    organizationId: string,
    userEmail: string,
    role: string,
    context: ServiceContext
  ): Promise<ServiceResult<OrganizationMembershipResponse>> {
    try {
      // Business rule: Only organization admins can invite users
      if (
        !AuthHelpers.canAccessOrganizationResource(
          context,
          organizationId,
          'admin'
        )
      ) {
        throw new ForbiddenError('Cannot invite users to organization');
      }

      const queryContext = this.mapToQueryContext(context);
      const membership = await inviteUserToOrganization(
        organizationId,
        userEmail,
        role,
        queryContext
      );

      // TODO: Implement organization membership mapper
      // const entity = toOrganizationMembershipResponseDTO(membership);
      return {
        success: true,
        data: membership as any, // Temporary fix
      };
    } catch (error) {
      return this.handleError(error, 'inviteUser');
    }
  }

  // ============================================================================
  // AUTHORIZATION OVERRIDES
  // ============================================================================

  override canCreate(context: ServiceContext): boolean {
    return AuthHelpers.hasRole(context, 'member');
  }

  override canRead(context: ServiceContext, resourceId?: string): boolean {
    // Users can read organizations they're members of, admins can read any
    if (resourceId) {
      return AuthHelpers.canAccessOrganizationResource(
        context,
        resourceId,
        'viewer'
      );
    }
    return AuthHelpers.hasRole(context, 'viewer');
  }

  override canUpdate(context: ServiceContext, resourceId?: string): boolean {
    // Only organization owners and admins can update
    if (resourceId) {
      return AuthHelpers.canAccessOrganizationResource(
        context,
        resourceId,
        'admin'
      );
    }
    return AuthHelpers.hasRole(context, 'admin');
  }

  override canDelete(context: ServiceContext, resourceId?: string): boolean {
    // Only organization owners can delete
    if (resourceId) {
      return AuthHelpers.canAccessOrganizationResource(
        context,
        resourceId,
        'owner'
      );
    }
    return AuthHelpers.hasRole(context, 'owner');
  }

  // ============================================================================
  // HELPER METHODS
  // ============================================================================

  private mapToQueryContext(context: ServiceContext): QueryContext {
    return {
      userId: context.userId,
      organizationId: context.tenantId,
      role: context.role,
    };
  }
}

/**
 * Organization Membership Service
 * Orchestrates organization membership domain operations
 */
export class OrganizationMembershipService extends BaseService<
  OrganizationMembershipResponse,
  CreateOrganizationMembership,
  UpdateOrganizationMembership,
  OrganizationMembershipQuery
> {
  protected entityName = 'OrganizationMembership';
  protected createSchema = createOrganizationMembershipSchema;
  protected updateSchema = updateOrganizationMembershipSchema;
  protected querySchema = organizationMembershipQuerySchema;

  protected mapDbToEntity(
    dbResult: unknown,
    context: ServiceContext
  ): OrganizationMembershipResponse {
    // TODO: Implement organization membership mapper
    return dbResult as any; // Temporary fix
  }

  protected mapCreateToDb(
    data: CreateOrganizationMembership,
    context: ServiceContext
  ): unknown {
    // TODO: Implement organization membership mapper
    return data as any; // Temporary fix
  }

  protected mapUpdateToDb(
    data: UpdateOrganizationMembership,
    context: ServiceContext
  ): unknown {
    // TODO: Implement organization membership mapper
    return data as any; // Temporary fix
  }

  protected async executeCreate(
    data: unknown,
    context: ServiceContext
  ): Promise<unknown> {
    const queryContext = this.mapToQueryContext(context);
    return createOrganizationMembership(data as any, queryContext);
  }

  protected async executeFindById(
    id: string,
    context: ServiceContext
  ): Promise<unknown | null> {
    const queryContext = this.mapToQueryContext(context);
    return getOrganizationMembershipById(id, queryContext);
  }

  protected async executeFindMany(
    query: OrganizationMembershipQuery,
    context: ServiceContext
  ): Promise<{
    data: unknown[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasMore: boolean;
    };
  }> {
    // This would need to be implemented based on specific requirements
    throw new Error('FindMany not implemented for OrganizationMembership');
  }

  protected async executeUpdate(
    id: string,
    data: unknown,
    context: ServiceContext
  ): Promise<unknown | null> {
    const queryContext = this.mapToQueryContext(context);
    return updateOrganizationMembership(id, data as any, queryContext);
  }

  protected async executeDelete(
    id: string,
    context: ServiceContext
  ): Promise<void> {
    const queryContext = this.mapToQueryContext(context);
    await deleteOrganizationMembership(id, queryContext);
  }

  // ============================================================================
  // MEMBERSHIP-SPECIFIC BUSINESS OPERATIONS
  // ============================================================================

  /**
   * Accept organization invitation
   */
  async acceptInvitation(
    membershipId: string,
    context: ServiceContext
  ): Promise<ServiceResult<OrganizationMembershipResponse>> {
    try {
      // Business rule: Only the invited user can accept their invitation
      const membership = await this.findById(membershipId, context);
      if (!membership.success || !membership.data) {
        throw new NotFoundError(this.entityName, membershipId);
      }

      if (membership.data.userId !== context.userId) {
        throw new ForbiddenError('Cannot accept invitation for another user');
      }

      const queryContext = this.mapToQueryContext(context);
      const result = await acceptOrganizationInvitation(
        membershipId,
        queryContext
      );

      if (!result) {
        throw new NotFoundError(this.entityName, membershipId);
      }

      const entity = this.mapDbToEntity(result, context);
      return {
        success: true,
        data: entity,
      };
    } catch (error) {
      return this.handleError(error, 'acceptInvitation');
    }
  }

  /**
   * Reject organization invitation
   */
  async rejectInvitation(
    membershipId: string,
    context: ServiceContext
  ): Promise<ServiceResult<boolean>> {
    try {
      // Business rule: Only the invited user can reject their invitation
      const membership = await this.findById(membershipId, context);
      if (!membership.success || !membership.data) {
        throw new NotFoundError(this.entityName, membershipId);
      }

      if (membership.data.userId !== context.userId) {
        throw new ForbiddenError('Cannot reject invitation for another user');
      }

      const queryContext = this.mapToQueryContext(context);
      await rejectOrganizationInvitation(membershipId, queryContext);

      return {
        success: true,
        data: true,
      };
    } catch (error) {
      return this.handleError(error, 'rejectInvitation');
    }
  }

  /**
   * Remove member from organization
   */
  async removeMember(
    membershipId: string,
    context: ServiceContext
  ): Promise<ServiceResult<boolean>> {
    try {
      // Business rule: Only organization admins can remove members
      const membership = await this.findById(membershipId, context);
      if (!membership.success || !membership.data) {
        throw new NotFoundError(this.entityName, membershipId);
      }

      // Check if user has admin access to the organization
      if (
        !AuthHelpers.canAccessOrganizationResource(
          context,
          membership.data.organizationId,
          'admin'
        )
      ) {
        throw new ForbiddenError('Cannot remove member from organization');
      }

      const queryContext = this.mapToQueryContext(context);
      await deleteOrganizationMembership(membershipId, queryContext);

      return {
        success: true,
        data: true,
      };
    } catch (error) {
      return this.handleError(error, 'removeMember');
    }
  }

  /**
   * Update member role
   */
  async updateMemberRole(
    membershipId: string,
    role: string,
    context: ServiceContext
  ): Promise<ServiceResult<OrganizationMembershipResponse>> {
    try {
      // Business rule: Only organization admins can update member roles
      const membership = await this.findById(membershipId, context);
      if (!membership.success || !membership.data) {
        throw new NotFoundError(this.entityName, membershipId);
      }

      // Check if user has admin access to the organization
      if (
        !AuthHelpers.canAccessOrganizationResource(
          context,
          membership.data.organizationId,
          'admin'
        )
      ) {
        throw new ForbiddenError('Cannot update member role');
      }

      const updateData: UpdateOrganizationMembership = {
        role: role as any,
      };

      return this.update(membershipId, updateData, context);
    } catch (error) {
      return this.handleError(error, 'updateMemberRole');
    }
  }

  override canCreate(context: ServiceContext): boolean {
    return AuthHelpers.hasRole(context, 'admin');
  }

  override canRead(context: ServiceContext, resourceId?: string): boolean {
    return AuthHelpers.hasRole(context, 'viewer');
  }

  override canUpdate(context: ServiceContext, resourceId?: string): boolean {
    return AuthHelpers.hasRole(context, 'admin');
  }

  override canDelete(context: ServiceContext, resourceId?: string): boolean {
    return AuthHelpers.hasRole(context, 'admin');
  }

  private mapToQueryContext(context: ServiceContext): QueryContext {
    return {
      userId: context.userId,
      organizationId: context.tenantId,
      role: context.role,
    };
  }

  // ============================================================================
  // MISSING API METHODS - Added for Phase 2 Error Resolution
  // ============================================================================

  /**
   * Invite user to organization
   */
  async inviteUser(
    organizationId: string,
    email: string,
    role: string,
    context: ServiceContext
  ): Promise<ServiceResult<OrganizationMembershipResponse>> {
    try {
      this.enforceUpdateAccess(organizationId, context);

      const membershipData: CreateOrganizationMembership = {
        organizationId,
        userId: '', // Will be resolved by email
        role: role as any,
        status: 'pending',
        permissions: [], // Default empty permissions array
      };

      // TODO: Implement actual invitation logic with email lookup
      const result = await this.create(membershipData, context);
      return result;
    } catch (error) {
      return this.handleError(error, 'inviteUser');
    }
  }

  /**
   * Get organization members
   */
  async getMembers(
    organizationId: string,
    query: Record<string, unknown>,
    context: ServiceContext
  ): Promise<ServiceResult<OrganizationMembershipResponse[]>> {
    try {
      this.enforceReadAccess(organizationId, context);

      // TODO: Implement getMembers query
      const members: OrganizationMembershipResponse[] = [];

      return {
        success: true,
        data: members,
      };
    } catch (error) {
      return this.handleError(error, 'getMembers');
    }
  }

  /**
   * Add member to organization
   */
  async addMember(
    organizationId: string,
    membershipData: CreateOrganizationMembership,
    context: ServiceContext
  ): Promise<ServiceResult<OrganizationMembershipResponse>> {
    try {
      this.enforceUpdateAccess(organizationId, context);

      const data = {
        ...membershipData,
        organizationId,
      };

      return this.create(data, context);
    } catch (error) {
      return this.handleError(error, 'addMember');
    }
  }

  /**
   * Search ministry organizations
   */
  async searchMinistryOrganizations(
    query: OrganizationMembershipQuery,
    context: ServiceContext
  ): Promise<ServiceResult<OrganizationMembershipResponse[]>> {
    try {
      this.enforceListAccess(context);

      const result = await this.findMany(query, context);
      return {
        success: result.success,
        data: result.data || [],
        error: result.error,
      };
    } catch (error) {
      return this.handleError(error, 'searchMinistryOrganizations');
    }
  }

  /**
   * Create ministry organization
   */
  async createMinistryOrganization(
    data: CreateOrganizationMembership,
    context: ServiceContext
  ): Promise<ServiceResult<OrganizationMembershipResponse>> {
    try {
      return this.create(data, context);
    } catch (error) {
      return this.handleError(error, 'createMinistryOrganization');
    }
  }

  /**
   * Get ministry organization by ID
   */
  async getMinistryOrganizationById(
    id: string,
    context: ServiceContext
  ): Promise<ServiceResult<OrganizationMembershipResponse>> {
    try {
      return this.findById(id, context);
    } catch (error) {
      return this.handleError(error, 'getMinistryOrganizationById');
    }
  }

  /**
   * Update ministry organization
   */
  async updateMinistryOrganization(
    id: string,
    data: UpdateOrganizationMembership,
    context: ServiceContext
  ): Promise<ServiceResult<OrganizationMembershipResponse>> {
    try {
      return this.update(id, data, context);
    } catch (error) {
      return this.handleError(error, 'updateMinistryOrganization');
    }
  }

  /**
   * Delete ministry organization
   */
  async deleteMinistryOrganization(
    id: string,
    context: ServiceContext
  ): Promise<ServiceResult<boolean>> {
    try {
      return this.delete(id, context);
    } catch (error) {
      return this.handleError(error, 'deleteMinistryOrganization');
    }
  }

  /**
   * Get organization members
   */
  async getOrganizationMembers(
    organizationId: string,
    query: Record<string, unknown>,
    context: ServiceContext
  ): Promise<ServiceResult<OrganizationMembershipResponse[]>> {
    try {
      return this.getMembers(organizationId, query, context);
    } catch (error) {
      return this.handleError(error, 'getOrganizationMembers');
    }
  }

  /**
   * Invite organization member
   */
  async inviteOrganizationMember(
    organizationId: string,
    email: string,
    role: string,
    context: ServiceContext
  ): Promise<ServiceResult<OrganizationMembershipResponse>> {
    try {
      return this.inviteUser(organizationId, email, role, context);
    } catch (error) {
      return this.handleError(error, 'inviteOrganizationMember');
    }
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export type CreateOrganizationInput = CreateOrganization;
export type CreateOrganizationOutput = OrganizationResponse;
export type UpdateOrganizationInput = UpdateOrganization;
export type UpdateOrganizationOutput = OrganizationResponse;
export type OrganizationQueryInput = OrganizationQuery;
export type OrganizationListOutput =
  PaginatedServiceResult<OrganizationResponse>;

export type CreateOrganizationMembershipInput = CreateOrganizationMembership;
export type CreateOrganizationMembershipOutput = OrganizationMembershipResponse;
export type UpdateOrganizationMembershipInput = UpdateOrganizationMembership;
export type UpdateOrganizationMembershipOutput = OrganizationMembershipResponse;
