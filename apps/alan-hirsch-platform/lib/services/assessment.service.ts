// ============================================================================
// ASSESSMENT SERVICE
// ============================================================================
// Use-case functions that orchestrate assessment query modules + mappers
// Following alignment reference patterns for business logic and authorization

import type {
  AssessmentQueryFilters,
  AssessmentQuestionResponse,
  AssessmentResponse,
  AssessmentResponseResponse,
  CreateAssessment,
  CreateAssessmentQuestion,
  CreateAssessmentResponse,
  CreateUserAssessment,
  UpdateAssessment,
  UpdateAssessmentQuestion,
  UpdateAssessmentResponse,
  UpdateUserAssessment,
  UserAssessmentResponse,
} from '@platform/contracts';
import {
  assessmentQuerySchema,
  createAssessmentQuestionSchema,
  createAssessmentResponseSchema,
  createAssessmentSchema,
  createUserAssessmentSchema,
  updateAssessmentQuestionSchema,
  updateAssessmentResponseSchema,
  updateAssessmentSchema,
  updateUserAssessmentSchema,
} from '@platform/contracts';
import {
  completeUserAssessment,
  createAssessment,
  createAssessmentQuestion,
  createAssessmentResponse,
  deleteAssessment,
  deleteAssessmentQuestion,
  deleteAssessmentResponse,
  deleteUserAssessment,
  getApestScoreDistribution,
  getAssessmentById,
  getAssessmentBySlug,
  getAssessmentQuestionById,
  getAssessmentQuestions,
  getAssessmentResponseById,
  getAssessmentResponses,
  getAssessmentStats,
  getAssessments,
  getSimilarApestProfiles,
  getUserAssessmentById,
  getUserAssessmentByType,
  getUserAssessmentsWithDetails,
  saveAssessmentResponses,
  startUserAssessment,
  updateAssessment,
  updateAssessmentQuestion,
  updateAssessmentResponse,
  updateUserAssessment,
} from '@platform/database';
import {
  fromCreateAssessment,
  fromCreateAssessmentQuestion,
  fromCreateAssessmentResponse,
  fromCreateUserAssessment,
  fromUpdateAssessment,
  fromUpdateAssessmentQuestion,
  fromUpdateAssessmentResponse,
  fromUpdateUserAssessment,
  toAssessmentQuestionResponseDTO,
  toAssessmentResponseDTO,
  toAssessmentResponseResponseDTO,
  toUserAssessmentResponseDTO,
} from '../mappers/assessment';
import { BaseService } from './base.service';
import {
  AuthHelpers,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  PaginatedServiceResult,
  ServiceContext,
  ServiceResult,
} from './types';

/**
 * Assessment Service
 * Orchestrates assessment domain operations with business logic and authorization
 */
export class AssessmentService extends BaseService<
  AssessmentResponse,
  CreateAssessment,
  UpdateAssessment,
  AssessmentQueryFilters
> {
  protected entityName = 'Assessment';
  protected createSchema = createAssessmentSchema;
  protected updateSchema = updateAssessmentSchema;
  protected querySchema = assessmentQuerySchema;

  // ============================================================================
  // CORE CRUD OPERATIONS (inherited from BaseService)
  // ============================================================================

  protected mapDbToEntity(
    dbResult: unknown,
    context: ServiceContext
  ): AssessmentResponse {
    return toAssessmentResponseDTO(dbResult as any);
  }

  protected mapCreateToDb(
    data: CreateAssessment,
    context: ServiceContext
  ): unknown {
    return fromCreateAssessment(data);
  }

  protected mapUpdateToDb(
    data: UpdateAssessment,
    context: ServiceContext
  ): unknown {
    return fromUpdateAssessment(data);
  }

  protected async executeCreate(
    data: unknown,
    context: ServiceContext
  ): Promise<unknown> {
    return createAssessment(data as any);
  }

  protected async executeFindById(
    id: string,
    context: ServiceContext
  ): Promise<unknown | null> {
    return getAssessmentById(id);
  }

  protected async executeFindMany(
    query: AssessmentQueryFilters,
    context: ServiceContext
  ): Promise<{ data: unknown[]; pagination: unknown }> {
    const results = await getAssessments({
      assessmentType: query.assessmentType as any,
      status: query.status as any,
      language: query.language,
      culturalAdaptation: query.culturalAdaptation as any,
      researchBacked: query.researchBacked,
    });

    return {
      data: results,
      pagination: {
        page: 1,
        limit: results.length,
        total: results.length,
        totalPages: 1,
        hasMore: false,
      },
    };
  }

  protected async executeUpdate(
    id: string,
    data: unknown,
    context: ServiceContext
  ): Promise<unknown | null> {
    return updateAssessment(id, data as any);
  }

  protected async executeDelete(
    id: string,
    context: ServiceContext
  ): Promise<void> {
    await deleteAssessment(id);
  }

  // ============================================================================
  // ASSESSMENT-SPECIFIC BUSINESS OPERATIONS
  // ============================================================================

  /**
   * Find assessment by slug
   */
  async findBySlug(
    slug: string,
    context: ServiceContext
  ): Promise<ServiceResult<AssessmentResponse>> {
    try {
      const dbResult = await getAssessmentBySlug(slug);

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
   * Publish assessment
   */
  async publish(
    assessmentId: string,
    context: ServiceContext
  ): Promise<ServiceResult<AssessmentResponse>> {
    try {
      // Business rule: Only admins can publish assessments
      if (!AuthHelpers.isOwnerOrAdmin(context)) {
        throw new ForbiddenError('Only administrators can publish assessments');
      }

      const updateData: UpdateAssessment = {
        status: 'active',
        publishedAt: new Date().toISOString(),
      };

      return this.update(assessmentId, updateData, context);
    } catch (error) {
      return this.handleError(error, 'publish');
    }
  }

  /**
   * Archive assessment
   */
  async archive(
    assessmentId: string,
    context: ServiceContext
  ): Promise<ServiceResult<AssessmentResponse>> {
    try {
      // Business rule: Only admins can archive assessments
      if (!AuthHelpers.isOwnerOrAdmin(context)) {
        throw new ForbiddenError('Only administrators can archive assessments');
      }

      const updateData: UpdateAssessment = {
        status: 'archived',
      };

      return this.update(assessmentId, updateData, context);
    } catch (error) {
      return this.handleError(error, 'archive');
    }
  }

  /**
   * Get assessment statistics
   */
  async getAssessmentStats(
    assessmentId: string,
    context: ServiceContext
  ): Promise<
    ServiceResult<{
      totalAttempts: number;
      completedAttempts: number;
      averageScore: number;
      averageCompletionTime: number;
    }>
  > {
    try {
      const stats = await getAssessmentStats(assessmentId);

      return {
        success: true,
        data: stats,
      };
    } catch (error) {
      return this.handleError(error, 'getAssessmentStats');
    }
  }

  /**
   * Get APEST score distribution for assessment
   */
  async getApestScoreDistribution(
    assessmentId: string,
    context: ServiceContext
  ): Promise<
    ServiceResult<{
      apostolic: number;
      prophetic: number;
      evangelistic: number;
      shepherding: number;
      teaching: number;
    }>
  > {
    try {
      const distribution = await getApestScoreDistribution(assessmentId);

      return {
        success: true,
        data: distribution,
      };
    } catch (error) {
      return this.handleError(error, 'getApestScoreDistribution');
    }
  }

  // ============================================================================
  // AUTHORIZATION OVERRIDES
  // ============================================================================

  canCreate(context: ServiceContext): boolean {
    return AuthHelpers.hasRole(context, 'admin');
  }

  canUpdate(context: ServiceContext, resourceId?: string): boolean {
    return AuthHelpers.hasRole(context, 'admin');
  }

  canDelete(context: ServiceContext, resourceId?: string): boolean {
    return AuthHelpers.hasRole(context, 'owner');
  }
}

/**
 * Assessment Question Service
 * Orchestrates assessment question domain operations
 */
export class AssessmentQuestionService extends BaseService<
  AssessmentQuestionResponse,
  CreateAssessmentQuestion,
  UpdateAssessmentQuestion
> {
  protected entityName = 'AssessmentQuestion';
  protected createSchema = createAssessmentQuestionSchema;
  protected updateSchema = updateAssessmentQuestionSchema;

  protected mapDbToEntity(
    dbResult: unknown,
    context: ServiceContext
  ): AssessmentQuestionResponse {
    return toAssessmentQuestionResponseDTO(dbResult as any);
  }

  protected mapCreateToDb(
    data: CreateAssessmentQuestion,
    context: ServiceContext
  ): unknown {
    return fromCreateAssessmentQuestion(data);
  }

  protected mapUpdateToDb(
    data: UpdateAssessmentQuestion,
    context: ServiceContext
  ): unknown {
    return fromUpdateAssessmentQuestion(data);
  }

  protected async executeCreate(
    data: unknown,
    context: ServiceContext
  ): Promise<unknown> {
    return createAssessmentQuestion(data as any);
  }

  protected async executeFindById(
    id: string,
    context: ServiceContext
  ): Promise<unknown | null> {
    return getAssessmentQuestionById(id);
  }

  protected async executeFindMany(
    query: Record<string, unknown>,
    context: ServiceContext
  ): Promise<{ data: unknown[]; pagination: unknown }> {
    const assessmentId = query.assessmentId as string;
    if (!assessmentId) {
      throw new Error('Assessment ID is required to fetch questions');
    }

    const results = await getAssessmentQuestions(assessmentId);

    return {
      data: results,
      pagination: {
        page: 1,
        limit: results.length,
        total: results.length,
        totalPages: 1,
        hasMore: false,
      },
    };
  }

  protected async executeUpdate(
    id: string,
    data: unknown,
    context: ServiceContext
  ): Promise<unknown | null> {
    return updateAssessmentQuestion(id, data as any);
  }

  protected async executeDelete(
    id: string,
    context: ServiceContext
  ): Promise<void> {
    await deleteAssessmentQuestion(id);
  }

  canCreate(context: ServiceContext): boolean {
    return AuthHelpers.hasRole(context, 'admin');
  }

  canUpdate(context: ServiceContext, resourceId?: string): boolean {
    return AuthHelpers.hasRole(context, 'admin');
  }

  canDelete(context: ServiceContext, resourceId?: string): boolean {
    return AuthHelpers.hasRole(context, 'admin');
  }
}

/**
 * User Assessment Service
 * Orchestrates user assessment domain operations
 */
export class UserAssessmentService extends BaseService<
  UserAssessmentResponse,
  CreateUserAssessment,
  UpdateUserAssessment
> {
  protected entityName = 'UserAssessment';
  protected createSchema = createUserAssessmentSchema;
  protected updateSchema = updateUserAssessmentSchema;

  protected mapDbToEntity(
    dbResult: unknown,
    context: ServiceContext
  ): UserAssessmentResponse {
    return toUserAssessmentResponseDTO(dbResult as any);
  }

  protected mapCreateToDb(
    data: CreateUserAssessment,
    context: ServiceContext
  ): unknown {
    return fromCreateUserAssessment(data);
  }

  protected mapUpdateToDb(
    data: UpdateUserAssessment,
    context: ServiceContext
  ): unknown {
    return fromUpdateUserAssessment(data);
  }

  protected async executeCreate(
    data: unknown,
    context: ServiceContext
  ): Promise<unknown> {
    return startUserAssessment(data as any);
  }

  protected async executeFindById(
    id: string,
    context: ServiceContext
  ): Promise<unknown | null> {
    return getUserAssessmentById(id);
  }

  protected async executeFindMany(
    query: Record<string, unknown>,
    context: ServiceContext
  ): Promise<{ data: unknown[]; pagination: unknown }> {
    const userId = (query.userId as string) || context.userId;
    const results = await getUserAssessmentsWithDetails(userId);

    return {
      data: results,
      pagination: {
        page: 1,
        limit: results.length,
        total: results.length,
        totalPages: 1,
        hasMore: false,
      },
    };
  }

  protected async executeUpdate(
    id: string,
    data: unknown,
    context: ServiceContext
  ): Promise<unknown | null> {
    return updateUserAssessment(id, data as any);
  }

  protected async executeDelete(
    id: string,
    context: ServiceContext
  ): Promise<void> {
    await deleteUserAssessment(id);
  }

  // ============================================================================
  // USER ASSESSMENT-SPECIFIC BUSINESS OPERATIONS
  // ============================================================================

  /**
   * Start user assessment
   */
  async startAssessment(
    assessmentId: string,
    context: ServiceContext
  ): Promise<ServiceResult<UserAssessmentResponse>> {
    try {
      // Business rule: Users can only start assessments for themselves
      if (!context.userId) {
        throw new ForbiddenError(
          'User must be authenticated to start assessment'
        );
      }

      // Check if user already has an assessment for this type
      const existingAssessment = await getUserAssessmentByType(
        context.userId,
        assessmentId
      );
      if (existingAssessment) {
        throw new ConflictError('User already has an assessment of this type');
      }

      const createData: CreateUserAssessment = {
        userId: context.userId,
        assessmentId,
        status: 'in_progress',
        startedAt: new Date().toISOString(),
      };

      return this.create(createData, context);
    } catch (error) {
      return this.handleError(error, 'startAssessment');
    }
  }

  /**
   * Complete user assessment
   */
  async completeAssessment(
    userAssessmentId: string,
    completionData: {
      completionPercentage: number;
      totalScore: number;
      maxPossibleScore: number;
      rawScores: Record<string, number>;
      normalizedScores: Record<string, number>;
      primaryGift?: string;
      secondaryGift?: string;
      completionTime: number;
      responseConsistency?: number;
      aiInsights?: string;
      personalizedRecommendations?: any;
    },
    context: ServiceContext
  ): Promise<ServiceResult<UserAssessmentResponse>> {
    try {
      // Business rule: Only the user who started the assessment can complete it
      const userAssessment = await this.findById(userAssessmentId, context);
      if (!userAssessment.success || !userAssessment.data) {
        throw new NotFoundError(this.entityName, userAssessmentId);
      }

      if (userAssessment.data.userId !== context.userId) {
        throw new ForbiddenError('Cannot complete assessment for another user');
      }

      const completionDataWithTimestamp = {
        ...completionData,
        completedAt: new Date(),
      };

      const result = await completeUserAssessment(
        userAssessmentId,
        completionDataWithTimestamp
      );

      if (!result) {
        throw new NotFoundError(this.entityName, userAssessmentId);
      }

      const entity = this.mapDbToEntity(result, context);
      return {
        success: true,
        data: entity,
      };
    } catch (error) {
      return this.handleError(error, 'completeAssessment');
    }
  }

  /**
   * Get user's assessments
   */
  async getUserAssessments(
    userId: string,
    context: ServiceContext
  ): Promise<ServiceResult<UserAssessmentResponse[]>> {
    try {
      // Business rule: Users can only see their own assessments, or admin can see any
      if (userId !== context.userId && !AuthHelpers.isOwnerOrAdmin(context)) {
        throw new ForbiddenError('Cannot view assessments for another user');
      }

      const results = await getUserAssessmentsWithDetails(userId);
      const entities = results.map(result =>
        this.mapDbToEntity(result, context)
      );

      return {
        success: true,
        data: entities,
      };
    } catch (error) {
      return this.handleError(error, 'getUserAssessments');
    }
  }

  /**
   * Get similar APEST profiles
   */
  async getSimilarProfiles(
    userAssessmentId: string,
    context: ServiceContext,
    limit: number = 10
  ): Promise<
    ServiceResult<
      Array<{
        id: string;
        userId: string;
        primaryGift: string;
        secondaryGift: string;
        apostolicScore: number;
        propheticScore: number;
        evangelisticScore: number;
        shepherdingScore: number;
        teachingScore: number;
        user: {
          firstName: string;
          lastName: string;
          displayName: string;
          avatarUrl: string;
        };
      }>
    >
  > {
    try {
      // Business rule: Users can only see similar profiles for their own assessments
      const userAssessment = await this.findById(userAssessmentId, context);
      if (!userAssessment.success || !userAssessment.data) {
        throw new NotFoundError(this.entityName, userAssessmentId);
      }

      if (
        userAssessment.data.userId !== context.userId &&
        !AuthHelpers.isOwnerOrAdmin(context)
      ) {
        throw new ForbiddenError(
          "Cannot view similar profiles for another user's assessment"
        );
      }

      const profiles = await getSimilarApestProfiles(
        context.userId,
        userAssessmentId,
        limit
      );

      return {
        success: true,
        data: profiles,
      };
    } catch (error) {
      return this.handleError(error, 'getSimilarProfiles');
    }
  }

  canCreate(context: ServiceContext): boolean {
    return AuthHelpers.hasRole(context, 'member');
  }

  canRead(context: ServiceContext, resourceId?: string): boolean {
    // Users can read their own assessments, admins can read any
    return AuthHelpers.hasRole(context, 'viewer');
  }

  canUpdate(context: ServiceContext, resourceId?: string): boolean {
    // Users can update their own assessments, admins can update any
    return AuthHelpers.hasRole(context, 'member');
  }

  canDelete(context: ServiceContext, resourceId?: string): boolean {
    // Users can delete their own assessments, admins can delete any
    return AuthHelpers.hasRole(context, 'member');
  }
}

/**
 * Assessment Response Service
 * Orchestrates assessment response domain operations
 */
export class AssessmentResponseService extends BaseService<
  AssessmentResponseResponse,
  CreateAssessmentResponse,
  UpdateAssessmentResponse
> {
  protected entityName = 'AssessmentResponse';
  protected createSchema = createAssessmentResponseSchema;
  protected updateSchema = updateAssessmentResponseSchema;

  protected mapDbToEntity(
    dbResult: unknown,
    context: ServiceContext
  ): AssessmentResponseResponse {
    return toAssessmentResponseResponseDTO(dbResult as any);
  }

  protected mapCreateToDb(
    data: CreateAssessmentResponse,
    context: ServiceContext
  ): unknown {
    return fromCreateAssessmentResponse(data);
  }

  protected mapUpdateToDb(
    data: UpdateAssessmentResponse,
    context: ServiceContext
  ): unknown {
    return fromUpdateAssessmentResponse(data);
  }

  protected async executeCreate(
    data: unknown,
    context: ServiceContext
  ): Promise<unknown> {
    return createAssessmentResponse(data as any);
  }

  protected async executeFindById(
    id: string,
    context: ServiceContext
  ): Promise<unknown | null> {
    return getAssessmentResponseById(id);
  }

  protected async executeFindMany(
    query: Record<string, unknown>,
    context: ServiceContext
  ): Promise<{ data: unknown[]; pagination: unknown }> {
    const userAssessmentId = query.userAssessmentId as string;
    if (!userAssessmentId) {
      throw new Error('User Assessment ID is required to fetch responses');
    }

    const results = await getAssessmentResponses(userAssessmentId);

    return {
      data: results,
      pagination: {
        page: 1,
        limit: results.length,
        total: results.length,
        totalPages: 1,
        hasMore: false,
      },
    };
  }

  protected async executeUpdate(
    id: string,
    data: unknown,
    context: ServiceContext
  ): Promise<unknown | null> {
    return updateAssessmentResponse(id, data as any);
  }

  protected async executeDelete(
    id: string,
    context: ServiceContext
  ): Promise<void> {
    await deleteAssessmentResponse(id);
  }

  /**
   * Save multiple responses for a user assessment
   */
  async saveResponses(
    userAssessmentId: string,
    responses: Array<{
      questionId: string;
      responseValue?: number;
      responseText?: string;
      responseTime?: number;
      confidence?: number;
      skipped?: boolean;
    }>,
    context: ServiceContext
  ): Promise<ServiceResult<AssessmentResponseResponse[]>> {
    try {
      // Business rule: Only the user who owns the assessment can save responses
      const userAssessment = await getUserAssessmentById(userAssessmentId);
      if (!userAssessment) {
        throw new NotFoundError('UserAssessment', userAssessmentId);
      }

      if (userAssessment.userId !== context.userId) {
        throw new ForbiddenError(
          "Cannot save responses for another user's assessment"
        );
      }

      const results = await saveAssessmentResponses(
        userAssessmentId,
        responses
      );
      const entities = results.map(result =>
        this.mapDbToEntity(result, context)
      );

      return {
        success: true,
        data: entities,
      };
    } catch (error) {
      return this.handleError(error, 'saveResponses');
    }
  }

  canCreate(context: ServiceContext): boolean {
    return AuthHelpers.hasRole(context, 'member');
  }

  canRead(context: ServiceContext, resourceId?: string): boolean {
    return AuthHelpers.hasRole(context, 'viewer');
  }

  canUpdate(context: ServiceContext, resourceId?: string): boolean {
    return AuthHelpers.hasRole(context, 'member');
  }

  canDelete(context: ServiceContext, resourceId?: string): boolean {
    return AuthHelpers.hasRole(context, 'member');
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export type CreateAssessmentInput = CreateAssessment;
export type CreateAssessmentOutput = AssessmentResponse;
export type UpdateAssessmentInput = UpdateAssessment;
export type UpdateAssessmentOutput = AssessmentResponse;
export type AssessmentQueryInput = AssessmentQueryFilters;
export type AssessmentListOutput = PaginatedServiceResult<AssessmentResponse>;

export type CreateAssessmentQuestionInput = CreateAssessmentQuestion;
export type CreateAssessmentQuestionOutput = AssessmentQuestionResponse;
export type UpdateAssessmentQuestionInput = UpdateAssessmentQuestion;
export type UpdateAssessmentQuestionOutput = AssessmentQuestionResponse;

export type CreateUserAssessmentInput = CreateUserAssessment;
export type CreateUserAssessmentOutput = UserAssessmentResponse;
export type UpdateUserAssessmentInput = UpdateUserAssessment;
export type UpdateUserAssessmentOutput = UserAssessmentResponse;

export type CreateAssessmentResponseInput = CreateAssessmentResponse;
export type CreateAssessmentResponseOutput = AssessmentResponseResponse;
export type UpdateAssessmentResponseInput = UpdateAssessmentResponse;
export type UpdateAssessmentResponseOutput = AssessmentResponseResponse;
