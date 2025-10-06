// ============================================================================
// USER SERVICE
// ============================================================================
// Use-case functions that orchestrate user query modules + mappers
// Following alignment reference patterns for business logic and authorization

import type {
  CreateUserProfile,
  UpdateUserProfile,
  UserProfileQuery,
  UserProfileResponse,
} from '@platform/contracts';
import {
  createUserProfileSchema,
  updateUserProfileSchema,
  userProfileQuerySchema,
} from '@platform/contracts';
import type { QueryContext } from '@platform/database';
import {
  createUserProfile,
  getUserApestScores,
  getUserMinistryContext,
  getUserOnboardingStatus,
  getUserPlatformSettings,
  getUserProfileByEmail,
  getUserProfileById,
  getUserProfileBySubdomain,
  getUserStats,
  searchUserProfiles,
  updateUserLastActive,
  updateUserProfile,
} from '@platform/database';
import {
  fromCreateUserProfile,
  fromUpdateUserProfile,
  toUserProfileResponseDTO,
} from '../mappers/user';
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
 * User Service
 * Orchestrates user domain operations with business logic and authorization
 */
export class UserService extends BaseService<
  UserProfileResponse,
  CreateUserProfile,
  UpdateUserProfile,
  UserProfileQuery
> {
  protected entityName = 'UserProfile';
  protected createSchema = createUserProfileSchema;
  protected updateSchema = updateUserProfileSchema;
  protected querySchema = userProfileQuerySchema;

  // ============================================================================
  // CORE CRUD OPERATIONS (inherited from BaseService)
  // ============================================================================

  protected mapDbToEntity(
    dbResult: unknown,
    context: ServiceContext
  ): UserProfileResponse {
    return toUserProfileResponseDTO(dbResult as any);
  }

  protected mapCreateToDb(
    data: CreateUserProfile,
    context: ServiceContext
  ): unknown {
    return fromCreateUserProfile(data);
  }

  protected mapUpdateToDb(
    data: UpdateUserProfile,
    context: ServiceContext
  ): unknown {
    return fromUpdateUserProfile(data);
  }

  protected async executeCreate(
    data: unknown,
    context: ServiceContext
  ): Promise<unknown> {
    const queryContext = this.mapToQueryContext(context);
    return createUserProfile(data as any, queryContext);
  }

  protected async executeFindById(
    id: string,
    context: ServiceContext
  ): Promise<unknown | null> {
    const queryContext = this.mapToQueryContext(context);
    return getUserProfileById(id, queryContext);
  }

  protected async executeFindMany(
    query: UserProfileQuery,
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

    // Map camelCase sortBy to snake_case database field names
    const orderByMapping: Record<
      string,
      'name' | 'created_at' | 'last_active_at'
    > = {
      firstName: 'name',
      lastName: 'name',
      email: 'name',
      createdAt: 'created_at',
      updatedAt: 'created_at',
      lastActiveAt: 'last_active_at',
      ministryRole: 'name',
      assessmentTotal: 'name',
    };

    const dbOrderBy =
      orderByMapping[query.sortBy ?? 'createdAt'] ?? 'created_at';

    const results = await searchUserProfiles(query.search ?? '', queryContext, {
      limit: query.limit ?? 20,
      offset: ((query.page ?? 1) - 1) * (query.limit ?? 20),
      orderBy: dbOrderBy,
      orderDirection: query.sortOrder ?? 'desc',
    });

    return {
      data: results,
      pagination: {
        page: query.page ?? 1,
        limit: query.limit ?? 20,
        total: results.length, // This would be improved with proper count query
        totalPages: Math.ceil(results.length / (query.limit ?? 20)),
        hasMore: results.length === (query.limit ?? 20),
      },
    };
  }

  protected async executeUpdate(
    id: string,
    data: unknown,
    context: ServiceContext
  ): Promise<unknown | null> {
    const queryContext = this.mapToQueryContext(context);
    return updateUserProfile(id, data as any, queryContext);
  }

  protected async executeDelete(
    id: string,
    context: ServiceContext
  ): Promise<void> {
    const queryContext = this.mapToQueryContext(context);
    // Note: deleteUserProfile would need to be implemented in query module
    throw new Error('User deletion not implemented yet');
  }

  // ============================================================================
  // USER-SPECIFIC BUSINESS OPERATIONS
  // ============================================================================

  /**
   * Find user by email address
   */
  async findByEmail(
    email: string,
    context: ServiceContext
  ): Promise<ServiceResult<UserProfileResponse>> {
    try {
      const queryContext = this.mapToQueryContext(context);
      const dbResult = await getUserProfileByEmail(email, queryContext);

      if (!dbResult) {
        throw new NotFoundError(this.entityName, email);
      }

      const entity = this.mapDbToEntity(dbResult, context);
      return {
        success: true,
        data: entity,
      };
    } catch (error) {
      return this.handleError(error, 'findByEmail');
    }
  }

  /**
   * Find user by subdomain
   */
  async findBySubdomain(
    subdomain: string,
    context: ServiceContext
  ): Promise<ServiceResult<UserProfileResponse>> {
    try {
      // Subdomain lookup doesn't require organization context
      const dbResult = await getUserProfileBySubdomain(subdomain);

      if (!dbResult) {
        throw new NotFoundError(this.entityName, subdomain);
      }

      // Create context without tenant restrictions for subdomain lookup
      const lookupContext = { ...context, tenantId: undefined };
      const entity = this.mapDbToEntity(dbResult, lookupContext);

      return {
        success: true,
        data: entity,
      };
    } catch (error) {
      return this.handleError(error, 'findBySubdomain');
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
    },
    context: ServiceContext
  ): Promise<ServiceResult<UserProfileResponse>> {
    try {
      // Business rule: Only user can update their own assessment scores
      if (context.userId !== userId && !AuthHelpers.isOwnerOrAdmin(context)) {
        throw new ForbiddenError(
          'Cannot update assessment scores for another user'
        );
      }

      const updateData: UpdateUserProfile = {
        assessmentMovementAlignment: scores.movementAlignment,
        assessmentAudienceEngagement: scores.audienceEngagement,
        assessmentContentReadiness: scores.contentReadiness,
        assessmentRevenuePotential: scores.revenuePotential,
        assessmentNetworkEffects: scores.networkEffects,
        assessmentStrategicFit: scores.strategicFit,
      };

      return this.update(userId, updateData, context);
    } catch (error) {
      return this.handleError(error, 'updateAssessmentScores');
    }
  }

  /**
   * Complete user onboarding
   */
  async completeOnboarding(
    userId: string,
    context: ServiceContext
  ): Promise<ServiceResult<UserProfileResponse>> {
    try {
      // Business rule: Only user can complete their own onboarding
      if (context.userId !== userId) {
        throw new ForbiddenError('Cannot complete onboarding for another user');
      }

      const updateData: UpdateUserProfile = {
        onboardingCompleted: true,
        onboardingStep: 10, // Final step
      };

      return this.update(userId, updateData, context);
    } catch (error) {
      return this.handleError(error, 'completeOnboarding');
    }
  }

  /**
   * Update user's last active timestamp
   */
  async updateLastActive(
    userId: string,
    context: ServiceContext
  ): Promise<ServiceResult<UserProfileResponse>> {
    try {
      // Business rule: Only user can update their own last active
      if (context.userId !== userId) {
        throw new ForbiddenError('Cannot update last active for another user');
      }

      // Use the database function directly since lastActiveAt is system-managed
      const queryContext = this.mapToQueryContext(context);
      await updateUserLastActive(userId, queryContext);

      // Return the updated user profile
      return this.findById(userId, context);
    } catch (error) {
      return this.handleError(error, 'updateLastActive');
    }
  }

  /**
   * Get user statistics
   */
  async getUserStats(
    userId: string,
    context: ServiceContext
  ): Promise<
    ServiceResult<{
      totalContent: number;
      publishedContent: number;
      totalViews: number;
      totalSubscribers: number;
      activeSubscribers: number;
      communitiesJoined: number;
      assessmentsCompleted: number;
    }>
  > {
    try {
      // Business rule: User can only see their own stats, or admin can see any
      if (context.userId !== userId && !AuthHelpers.isOwnerOrAdmin(context)) {
        throw new ForbiddenError('Cannot view stats for another user');
      }

      const queryContext = this.mapToQueryContext(context);
      const stats = await getUserStats(userId, queryContext);

      if (!stats) {
        throw new NotFoundError(this.entityName, userId);
      }

      return {
        success: true,
        data: stats,
      };
    } catch (error) {
      return this.handleError(error, 'getUserStats');
    }
  }

  /**
   * Get user's APEST assessment scores
   */
  async getApestScores(
    userId: string,
    context: ServiceContext
  ): Promise<
    ServiceResult<{
      movementAlignment: number;
      audienceEngagement: number;
      contentReadiness: number;
      revenuePotential: number;
      networkEffects: number;
      strategicFit: number;
      total: number;
      leaderTier: string;
    }>
  > {
    try {
      // Business rule: User can see their own scores, or admin can see any
      if (context.userId !== userId && !AuthHelpers.isOwnerOrAdmin(context)) {
        throw new ForbiddenError('Cannot view APEST scores for another user');
      }

      const queryContext = this.mapToQueryContext(context);
      const scores = await getUserApestScores(userId, queryContext);

      if (!scores) {
        throw new NotFoundError(this.entityName, userId);
      }

      return {
        success: true,
        data: scores,
      };
    } catch (error) {
      return this.handleError(error, 'getApestScores');
    }
  }

  /**
   * Get user's ministry context
   */
  async getMinistryContext(
    userId: string,
    context: ServiceContext
  ): Promise<
    ServiceResult<{
      ministryRole: string;
      denomination: string;
      organizationName: string;
      yearsInMinistry: number;
      countryCode: string;
      timezone: string;
      culturalContext: string;
      theologicalFocus: string[];
      languagePrimary: string;
    }>
  > {
    try {
      // Business rule: User can see their own context, or admin can see any
      if (context.userId !== userId && !AuthHelpers.isOwnerOrAdmin(context)) {
        throw new ForbiddenError(
          'Cannot view ministry context for another user'
        );
      }

      const queryContext = this.mapToQueryContext(context);
      const ministryContextData = await getUserMinistryContext(
        userId,
        queryContext
      );

      if (!ministryContextData) {
        throw new NotFoundError(this.entityName, userId);
      }

      return {
        success: true,
        data: ministryContextData,
      };
    } catch (error) {
      return this.handleError(error, 'getMinistryContext');
    }
  }

  /**
   * Get user's platform settings
   */
  async getPlatformSettings(
    userId: string,
    context: ServiceContext
  ): Promise<
    ServiceResult<{
      subdomain: string;
      customDomain: string;
      platformTitle: string;
      brandColors: Record<string, string>;
      emailNotifications: Record<string, boolean>;
      privacySettings: Record<string, boolean>;
    }>
  > {
    try {
      // Business rule: User can see their own settings, or admin can see any
      if (context.userId !== userId && !AuthHelpers.isOwnerOrAdmin(context)) {
        throw new ForbiddenError(
          'Cannot view platform settings for another user'
        );
      }

      const queryContext = this.mapToQueryContext(context);
      const settings = await getUserPlatformSettings(userId, queryContext);

      if (!settings) {
        throw new NotFoundError(this.entityName, userId);
      }

      return {
        success: true,
        data: settings,
      };
    } catch (error) {
      return this.handleError(error, 'getPlatformSettings');
    }
  }

  /**
   * Get user's onboarding status
   */
  async getOnboardingStatus(
    userId: string,
    context: ServiceContext
  ): Promise<
    ServiceResult<{
      completed: boolean;
      step: number;
      nextStep?: string;
    }>
  > {
    try {
      // Business rule: User can see their own status, or admin can see any
      if (context.userId !== userId && !AuthHelpers.isOwnerOrAdmin(context)) {
        throw new ForbiddenError(
          'Cannot view onboarding status for another user'
        );
      }

      const queryContext = this.mapToQueryContext(context);
      const status = await getUserOnboardingStatus(userId, queryContext);

      if (!status) {
        throw new NotFoundError(this.entityName, userId);
      }

      return {
        success: true,
        data: status,
      };
    } catch (error) {
      return this.handleError(error, 'getOnboardingStatus');
    }
  }

  // ============================================================================
  // AUTHORIZATION OVERRIDES
  // ============================================================================

  override canRead(context: ServiceContext, resourceId?: string): boolean {
    // Users can read their own profile, admins can read any
    if (resourceId && context.userId === resourceId) return true;
    return AuthHelpers.hasRole(context, 'admin');
  }

  override canUpdate(context: ServiceContext, resourceId?: string): boolean {
    // Users can update their own profile, admins can update any
    if (resourceId && context.userId === resourceId) return true;
    return AuthHelpers.hasRole(context, 'admin');
  }

  override canCreate(context: ServiceContext): boolean {
    // Only admins can create users (registration handled separately)
    return AuthHelpers.hasRole(context, 'admin');
  }

  override canDelete(context: ServiceContext, resourceId?: string): boolean {
    // Only owners can delete users
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

// ============================================================================
// EXPORTS
// ============================================================================

export type CreateUserInput = CreateUserProfile;
export type CreateUserOutput = UserProfileResponse;
export type UpdateUserInput = UpdateUserProfile;
export type UpdateUserOutput = UserProfileResponse;
export type UserQueryInput = UserProfileQuery;
export type UserListOutput = PaginatedServiceResult<UserProfileResponse>;
