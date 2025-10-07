import {
  UserAssessmentCreateDTO,
  UserAssessmentListResponseDTO,
  UserAssessmentResponseDTO,
  UserAssessmentUpdateDTO,
} from '@/lib/contracts';
import type { Ctx } from '@/lib/database';
import * as Q from '@/lib/database/db/queries/user-assessment.queries';
import { z } from 'zod';
import {
  fromCreateUserAssessmentDTO,
  fromUpdateUserAssessmentDTO,
  toUserAssessmentDTO,
} from '../mappers/userassessments.mapper';
import { BaseService } from './base.service';

// ============================================================================
// USER ASSESSMENT SERVICE
// ============================================================================

export type UserAssessmentListParams = {
  userId?: string;
  assessmentId?: string;
  page?: number;
  limit?: number;
  sort?: string;
  dir?: 'asc' | 'desc';
  search?: string;
};

export class UserAssessmentService extends BaseService<
  z.infer<typeof UserAssessmentResponseDTO>
> {
  protected entityName = 'UserAssessment';
  protected createSchema = UserAssessmentCreateDTO;
  protected updateSchema = UserAssessmentUpdateDTO;
  protected responseSchema = UserAssessmentResponseDTO;
  protected listResponseSchema = UserAssessmentListResponseDTO;

  /**
   * Get user assessment by ID
   */
  async get(
    ctx: Ctx,
    id: string
  ): Promise<z.infer<typeof UserAssessmentResponseDTO>> {
    try {
      const row = await Q.getUserAssessmentById(ctx, id);
      if (!row) {
        throw new Error('USER_ASSESSMENT_NOT_FOUND');
      }
      const dto = toUserAssessmentDTO(row);
      return this.validateResponse(dto);
    } catch (error) {
      this.handleDatabaseError(error, 'get user assessment');
    }
  }

  /**
   * List user assessments with pagination and filtering
   */
  async list(
    ctx: Ctx,
    params?: UserAssessmentListParams
  ): Promise<z.infer<typeof UserAssessmentListResponseDTO>> {
    try {
      const { rows, total, page, limit } = await Q.listUserAssessments(
        ctx,
        params || {}
      );
      const data = rows.map(toUserAssessmentDTO);
      const response = {
        data,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
      return this.validateListResponse(response);
    } catch (error) {
      this.handleDatabaseError(error, 'list user assessments');
    }
  }

  /**
   * Create new user assessment
   */
  async create(
    ctx: Ctx,
    input: z.infer<typeof UserAssessmentCreateDTO>
  ): Promise<z.infer<typeof UserAssessmentResponseDTO>> {
    try {
      const valid = this.validateCreateInput(input);
      const toRow = fromCreateUserAssessmentDTO(valid);
      const row = await Q.createUserAssessment(ctx, toRow);
      const dto = toUserAssessmentDTO(row);
      return this.validateResponse(dto);
    } catch (error) {
      this.handleDatabaseError(error, 'create user assessment');
    }
  }

  /**
   * Update user assessment by ID
   */
  async update(
    ctx: Ctx,
    id: string,
    input: z.infer<typeof UserAssessmentUpdateDTO>
  ): Promise<z.infer<typeof UserAssessmentResponseDTO>> {
    try {
      const valid = this.validateUpdateInput(input);
      const patch = fromUpdateUserAssessmentDTO(valid);
      const row = await Q.updateUserAssessment(ctx, id, patch);
      if (!row) {
        throw new Error('USER_ASSESSMENT_NOT_FOUND');
      }
      const dto = toUserAssessmentDTO(row);
      return this.validateResponse(dto);
    } catch (error) {
      this.handleDatabaseError(error, 'update user assessment');
    }
  }

  /**
   * Delete user assessment by ID
   */
  async delete(ctx: Ctx, id: string): Promise<{ success: true }> {
    try {
      const ok = await Q.removeUserAssessment(ctx, id);
      if (!ok) {
        throw new Error('USER_ASSESSMENT_NOT_FOUND');
      }
      return { success: true };
    } catch (error) {
      this.handleDatabaseError(error, 'delete user assessment');
    }
  }

  // ============================================================================
  // SPECIALIZED METHODS (based on query module capabilities)
  // ============================================================================

  /**
   * List assessments for a specific user
   */
  async listByUser(
    ctx: Ctx,
    userId: string
  ): Promise<z.infer<typeof UserAssessmentListResponseDTO>> {
    try {
      const { rows, total, page, limit } = await Q.listAssessmentsByUser(
        ctx,
        userId
      );
      const data = rows.map(toUserAssessmentDTO);
      const response = {
        data,
        pagination: {
          page: 1,
          limit: 100,
          total,
          totalPages: Math.ceil(total / 100),
        },
      };
      return this.validateListResponse(response);
    } catch (error) {
      this.handleDatabaseError(error, 'list assessments by user');
    }
  }

  /**
   * Get completed assessments for a user
   */
  async listCompletedByUser(
    ctx: Ctx,
    userId: string
  ): Promise<z.infer<typeof UserAssessmentListResponseDTO>> {
    try {
      const assessments = await Q.listCompletedAssessmentsByUser(ctx, userId);
      const data = assessments.map(toUserAssessmentDTO);
      const response = {
        data,
        pagination: {
          page: 1,
          limit: 100,
          total: assessments.length,
          totalPages: Math.ceil(assessments.length / 100),
        },
      };
      return this.validateListResponse(response);
    } catch (error) {
      this.handleDatabaseError(error, 'list completed assessments by user');
    }
  }

  /**
   * Get assessment results for a specific assessment
   */
  async listByAssessment(
    ctx: Ctx,
    assessmentId: string
  ): Promise<z.infer<typeof UserAssessmentListResponseDTO>> {
    try {
      const { rows, total, page, limit } =
        await Q.listUserAssessmentsByAssessment(ctx, assessmentId);
      const data = rows.map(toUserAssessmentDTO);
      const response = {
        data,
        pagination: {
          page: 1,
          limit: 100,
          total,
          totalPages: Math.ceil(total / 100),
        },
      };
      return this.validateListResponse(response);
    } catch (error) {
      this.handleDatabaseError(error, 'list user assessments by assessment');
    }
  }
}

// Export singleton instance
export const userAssessmentService = new UserAssessmentService();
