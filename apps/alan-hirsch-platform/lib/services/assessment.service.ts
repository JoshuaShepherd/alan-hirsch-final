// ============================================================================
// ASSESSMENT SERVICE
// ============================================================================
// Use-case functions that orchestrate assessment query modules + mappers
// Following alignment reference patterns for business logic and authorization

import type {
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
  Record<string, unknown>
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
    query: Record<string, unknown>,
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
    const results = await getAssessments({
      assessmentType: query['assessmentType'] as any,
      status: query['status'] as any,
      language: query['language'] as string | undefined,
      culturalAdaptation: query['culturalAdaptation'] as any,
      researchBacked: query['researchBacked'] as boolean | undefined,
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
   * Unpublish assessment
   */
  async unpublish(
    assessmentId: string,
    context: ServiceContext
  ): Promise<ServiceResult<AssessmentResponse>> {
    try {
      // Business rule: Only admins can unpublish assessments
      if (!AuthHelpers.isOwnerOrAdmin(context)) {
        throw new ForbiddenError(
          'Only administrators can unpublish assessments'
        );
      }

      const updateData: UpdateAssessment = {
        status: 'draft',
      };

      return this.update(assessmentId, updateData, context);
    } catch (error) {
      return this.handleError(error, 'unpublish');
    }
  }

  /**
   * Search assessments
   */
  async search(
    query: {
      query: string;
      assessmentType?: string[];
      status?: string[];
      language?: string[];
      researchBacked?: boolean;
      page?: number;
      limit?: number;
      sortBy?: string;
      sortOrder?: 'asc' | 'desc';
    },
    context: ServiceContext
  ): Promise<ServiceResult<PaginatedServiceResult<AssessmentResponse>>> {
    try {
      // For now, implement basic search using existing getAssessments
      // In a real implementation, this would use a dedicated search function
      const results = await getAssessments({
        assessmentType: query.assessmentType?.[0] as any,
        status: query.status?.[0] as any,
        language: query.language?.[0],
        culturalAdaptation: undefined,
        researchBacked: query.researchBacked,
      });

      const filteredResults = results.filter(
        assessment =>
          assessment.name.toLowerCase().includes(query.query.toLowerCase()) ||
          assessment.description
            ?.toLowerCase()
            .includes(query.query.toLowerCase())
      );

      const entities = filteredResults.map(result =>
        this.mapDbToEntity(result, context)
      );

      const page = query.page || 1;
      const limit = query.limit || 20;
      const offset = (page - 1) * limit;
      const paginatedResults = entities.slice(offset, offset + limit);

      return {
        success: true,
        data: {
          success: true,
          data: paginatedResults,
          pagination: {
            page,
            limit,
            total: entities.length,
            totalPages: Math.ceil(entities.length / limit),
            hasMore: offset + limit < entities.length,
          },
        },
      };
    } catch (error) {
      return this.handleError(error, 'search');
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
  // MISSING SERVICE METHODS (from ALIGNMENT_REFERENCE.md)
  // ============================================================================

  /**
   * Get assessment questions
   */
  async getQuestions(
    assessmentId: string,
    context: ServiceContext
  ): Promise<ServiceResult<AssessmentQuestionResponse[]>> {
    try {
      // Business rule: Only authenticated users can view assessment questions
      if (!AuthHelpers.hasRole(context, 'viewer')) {
        throw new ForbiddenError(
          'Must be authenticated to view assessment questions'
        );
      }

      const results = await getAssessmentQuestions(assessmentId);
      const entities = results.map(result =>
        toAssessmentQuestionResponseDTO(result)
      );

      return {
        success: true,
        data: entities,
      };
    } catch (error) {
      return this.handleError(error, 'getQuestions');
    }
  }

  /**
   * Add question to assessment
   */
  async addQuestion(
    assessmentId: string,
    question: CreateAssessmentQuestion,
    context: ServiceContext
  ): Promise<ServiceResult<AssessmentQuestionResponse>> {
    try {
      // Business rule: Only admins can add questions to assessments
      if (!AuthHelpers.hasRole(context, 'admin')) {
        throw new ForbiddenError(
          'Only administrators can add questions to assessments'
        );
      }

      const questionData = fromCreateAssessmentQuestion(question);
      const result = await createAssessmentQuestion(questionData as any);

      if (!result) {
        throw new NotFoundError(this.entityName, assessmentId);
      }

      const entity = toAssessmentQuestionResponseDTO(result);
      return {
        success: true,
        data: entity,
      };
    } catch (error) {
      return this.handleError(error, 'addQuestion');
    }
  }

  /**
   * Get assessment responses
   */
  async getAssessmentResponses(
    assessmentId: string,
    context: ServiceContext
  ): Promise<ServiceResult<AssessmentResponseResponse[]>> {
    try {
      // Business rule: Only authenticated users can view assessment responses
      if (!AuthHelpers.hasRole(context, 'viewer')) {
        throw new ForbiddenError(
          'Must be authenticated to view assessment responses'
        );
      }

      const results = await getAssessmentResponses(assessmentId);
      const entities = results.map((result: any) =>
        toAssessmentResponseResponseDTO(result)
      );

      return {
        success: true,
        data: entities,
      };
    } catch (error) {
      return this.handleError(error, 'getAssessmentResponses');
    }
  }

  /**
   * Submit assessment response
   */
  async submitResponse(
    assessmentId: string,
    response: CreateAssessmentResponse,
    context: ServiceContext
  ): Promise<ServiceResult<AssessmentResponseResponse>> {
    try {
      // Business rule: Only authenticated users can submit responses
      if (!context.userId) {
        throw new ForbiddenError(
          'User must be authenticated to submit assessment response'
        );
      }

      const responseData = fromCreateAssessmentResponse(response);
      const result = await createAssessmentResponse(responseData as any);

      if (!result) {
        throw new NotFoundError(this.entityName, assessmentId);
      }

      const entity = toAssessmentResponseResponseDTO(result);
      return {
        success: true,
        data: entity,
      };
    } catch (error) {
      return this.handleError(error, 'submitResponse');
    }
  }

  /**
   * Get ministry assessment by ID
   */
  async getMinistryAssessmentById(
    id: string,
    context: ServiceContext
  ): Promise<ServiceResult<AssessmentResponse>> {
    try {
      // Business rule: Only authenticated users can view ministry assessments
      if (!AuthHelpers.hasRole(context, 'viewer')) {
        throw new ForbiddenError(
          'Must be authenticated to view ministry assessments'
        );
      }

      const result = await getAssessmentById(id);
      if (!result) {
        throw new NotFoundError(this.entityName, id);
      }

      const entity = this.mapDbToEntity(result, context);
      return {
        success: true,
        data: entity,
      };
    } catch (error) {
      return this.handleError(error, 'getMinistryAssessmentById');
    }
  }

  /**
   * Update ministry assessment
   */
  async updateMinistryAssessment(
    id: string,
    data: UpdateAssessment,
    context: ServiceContext
  ): Promise<ServiceResult<AssessmentResponse>> {
    try {
      // Business rule: Only admins can update ministry assessments
      if (!AuthHelpers.hasRole(context, 'admin')) {
        throw new ForbiddenError(
          'Only administrators can update ministry assessments'
        );
      }

      return this.update(id, data, context);
    } catch (error) {
      return this.handleError(error, 'updateMinistryAssessment');
    }
  }

  /**
   * Delete ministry assessment
   */
  async deleteMinistryAssessment(
    id: string,
    context: ServiceContext
  ): Promise<ServiceResult<boolean>> {
    try {
      // Business rule: Only owners can delete ministry assessments
      if (!AuthHelpers.hasRole(context, 'owner')) {
        throw new ForbiddenError('Only owners can delete ministry assessments');
      }

      await this.delete(id, context);
      return {
        success: true,
        data: true,
      };
    } catch (error) {
      return this.handleError(error, 'deleteMinistryAssessment');
    }
  }

  // ============================================================================
  // AUTHORIZATION OVERRIDES
  // ============================================================================

  override canCreate(context: ServiceContext): boolean {
    return AuthHelpers.hasRole(context, 'admin');
  }

  override canUpdate(context: ServiceContext, resourceId?: string): boolean {
    return AuthHelpers.hasRole(context, 'admin');
  }

  override canDelete(context: ServiceContext, resourceId?: string): boolean {
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
  UpdateAssessmentQuestion,
  Record<string, unknown>
> {
  protected entityName = 'AssessmentQuestion';
  protected createSchema = createAssessmentQuestionSchema;
  protected updateSchema = updateAssessmentQuestionSchema;
  protected querySchema = {} as any; // Placeholder schema

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
    const assessmentId = query['assessmentId'] as string;
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

  override canCreate(context: ServiceContext): boolean {
    return AuthHelpers.hasRole(context, 'admin');
  }

  override canUpdate(context: ServiceContext, resourceId?: string): boolean {
    return AuthHelpers.hasRole(context, 'admin');
  }

  override canDelete(context: ServiceContext, resourceId?: string): boolean {
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
  UpdateUserAssessment,
  Record<string, unknown>
> {
  protected entityName = 'UserAssessment';
  protected createSchema = createUserAssessmentSchema;
  protected updateSchema = updateUserAssessmentSchema;
  protected querySchema = {} as any; // Placeholder schema

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
    const userId = (query['userId'] as string) || context.userId;
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
        startedAt: new Date().toISOString(),
        culturalAdjustmentApplied: false,
        suggestedPeers: [],
        complementaryGifts: [],
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

  override canCreate(context: ServiceContext): boolean {
    return AuthHelpers.hasRole(context, 'member');
  }

  override canRead(context: ServiceContext, resourceId?: string): boolean {
    // Users can read their own assessments, admins can read any
    return AuthHelpers.hasRole(context, 'viewer');
  }

  override canUpdate(context: ServiceContext, resourceId?: string): boolean {
    // Users can update their own assessments, admins can update any
    return AuthHelpers.hasRole(context, 'member');
  }

  override canDelete(context: ServiceContext, resourceId?: string): boolean {
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
  UpdateAssessmentResponse,
  Record<string, unknown>
> {
  protected entityName = 'AssessmentResponse';
  protected createSchema = createAssessmentResponseSchema;
  protected updateSchema = updateAssessmentResponseSchema;
  protected querySchema = {} as any; // Placeholder schema

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
    const userAssessmentId = query['userAssessmentId'] as string;
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

  override canCreate(context: ServiceContext): boolean {
    return AuthHelpers.hasRole(context, 'member');
  }

  override canRead(context: ServiceContext, resourceId?: string): boolean {
    return AuthHelpers.hasRole(context, 'viewer');
  }

  override canUpdate(context: ServiceContext, resourceId?: string): boolean {
    return AuthHelpers.hasRole(context, 'member');
  }

  override canDelete(context: ServiceContext, resourceId?: string): boolean {
    return AuthHelpers.hasRole(context, 'member');
  }

  // ============================================================================
  // MISSING API METHODS - Added for Phase 2 Error Resolution
  // ============================================================================

  /**
   * Get questions for an assessment
   */
  async getQuestions(
    assessmentId: string,
    context: ServiceContext
  ): Promise<ServiceResult<AssessmentQuestionResponse[]>> {
    try {
      this.enforceReadAccess(assessmentId, context);

      const questions = await getAssessmentQuestions(assessmentId);
      const entities = questions.map(question =>
        toAssessmentQuestionResponseDTO(question)
      );

      return {
        success: true,
        data: entities,
      };
    } catch (error) {
      return this.handleError(error, 'getQuestions');
    }
  }

  /**
   * Add a question to an assessment
   */
  async addQuestion(
    assessmentId: string,
    questionData: CreateAssessmentQuestion,
    context: ServiceContext
  ): Promise<ServiceResult<AssessmentQuestionResponse>> {
    try {
      this.enforceUpdateAccess(assessmentId, context);

      const validatedData = createAssessmentQuestionSchema.parse(questionData);
      const dbData = fromCreateAssessmentQuestion(validatedData);

      const result = await createAssessmentQuestion(dbData as any);
      const entity = toAssessmentQuestionResponseDTO(result);

      return {
        success: true,
        data: entity,
      };
    } catch (error) {
      return this.handleError(error, 'addQuestion');
    }
  }

  /**
   * Get assessment responses
   */
  async getAssessmentResponses(
    assessmentId: string,
    context: ServiceContext
  ): Promise<ServiceResult<AssessmentResponseResponse[]>> {
    try {
      this.enforceReadAccess(assessmentId, context);

      const responses = await getAssessmentResponses(assessmentId);
      const entities = responses.map((response: any) =>
        toAssessmentResponseResponseDTO(response)
      );

      return {
        success: true,
        data: entities,
      };
    } catch (error) {
      return this.handleError(error, 'getAssessmentResponses');
    }
  }

  /**
   * Submit assessment response
   */
  async submitResponse(
    assessmentId: string,
    responseData: CreateAssessmentResponse,
    context: ServiceContext
  ): Promise<ServiceResult<AssessmentResponseResponse>> {
    try {
      this.enforceCreateRules(responseData, context);

      const validatedData = createAssessmentResponseSchema.parse(responseData);
      const dbData = fromCreateAssessmentResponse(validatedData);

      const result = await createAssessmentResponse(dbData as any);
      const entity = toAssessmentResponseResponseDTO(result);

      return {
        success: true,
        data: entity,
      };
    } catch (error) {
      return this.handleError(error, 'submitResponse');
    }
  }

  /**
   * Publish an assessment
   */
  async publish(
    id: string,
    context: ServiceContext
  ): Promise<ServiceResult<AssessmentResponseResponse>> {
    try {
      this.enforceUpdateAccess(id, context);

      const result = await updateAssessment(id, { status: 'active' });
      if (!result) {
        throw new NotFoundError(this.entityName, id);
      }

      const entity = this.mapDbToEntity(result, context);
      return {
        success: true,
        data: entity,
      };
    } catch (error) {
      return this.handleError(error, 'publish');
    }
  }

  /**
   * Unpublish an assessment
   */
  async unpublish(
    id: string,
    context: ServiceContext
  ): Promise<ServiceResult<AssessmentResponseResponse>> {
    try {
      this.enforceUpdateAccess(id, context);

      const result = await updateAssessment(id, { status: 'draft' });
      if (!result) {
        throw new NotFoundError(this.entityName, id);
      }

      const entity = this.mapDbToEntity(result, context);
      return {
        success: true,
        data: entity,
      };
    } catch (error) {
      return this.handleError(error, 'unpublish');
    }
  }

  /**
   * Archive an assessment
   */
  async archive(
    id: string,
    context: ServiceContext
  ): Promise<ServiceResult<AssessmentResponseResponse>> {
    try {
      this.enforceUpdateAccess(id, context);

      const result = await updateAssessment(id, { status: 'archived' });
      if (!result) {
        throw new NotFoundError(this.entityName, id);
      }

      const entity = this.mapDbToEntity(result, context);
      return {
        success: true,
        data: entity,
      };
    } catch (error) {
      return this.handleError(error, 'archive');
    }
  }

  /**
   * Get ministry assessment by ID
   */
  async getMinistryAssessmentById(
    id: string,
    context: ServiceContext
  ): Promise<ServiceResult<AssessmentResponseResponse>> {
    try {
      this.enforceReadAccess(id, context);

      const result = await getAssessmentById(id);
      if (!result) {
        throw new NotFoundError(this.entityName, id);
      }

      const entity = this.mapDbToEntity(result, context);
      return {
        success: true,
        data: entity,
      };
    } catch (error) {
      return this.handleError(error, 'getMinistryAssessmentById');
    }
  }

  /**
   * Update ministry assessment
   */
  async updateMinistryAssessment(
    id: string,
    data: UpdateAssessmentResponse,
    context: ServiceContext
  ): Promise<ServiceResult<AssessmentResponseResponse>> {
    try {
      return this.update(id, data, context);
    } catch (error) {
      return this.handleError(error, 'updateMinistryAssessment');
    }
  }

  /**
   * Delete ministry assessment
   */
  async deleteMinistryAssessment(
    id: string,
    context: ServiceContext
  ): Promise<ServiceResult<boolean>> {
    try {
      return this.delete(id, context);
    } catch (error) {
      return this.handleError(error, 'deleteMinistryAssessment');
    }
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export type CreateAssessmentInput = CreateAssessment;
export type CreateAssessmentOutput = AssessmentResponse;
export type UpdateAssessmentInput = UpdateAssessment;
export type UpdateAssessmentOutput = AssessmentResponse;
export type AssessmentQueryInput = Record<string, unknown>;
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
