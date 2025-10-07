import {
  AssessmentCreateDTO,
  AssessmentListResponseDTO,
  AssessmentResponseDTO,
  AssessmentUpdateDTO,
} from '@/lib/contracts';
import type { Ctx } from '@/lib/database';
import * as Q from '@/lib/database/db/queries/assessment.queries';
import { z } from 'zod';
import {
  fromCreateAssessmentDTO,
  fromUpdateAssessmentDTO,
  toAssessmentDTO,
} from '../mappers/assessment';
import { BaseService } from './base.service';

// ============================================================================
// ASSESSMENT SERVICE
// ============================================================================

export type AssessmentListParams = {
  q?: string;
  page?: number;
  limit?: number;
  sort?: string;
  dir?: 'asc' | 'desc';
};

export class AssessmentService extends BaseService<
  z.infer<typeof AssessmentResponseDTO>
> {
  protected entityName = 'Assessment';
  protected createSchema = AssessmentCreateDTO;
  protected updateSchema = AssessmentUpdateDTO;
  protected responseSchema = AssessmentResponseDTO;
  protected listResponseSchema = AssessmentListResponseDTO;

  /**
   * Get assessment by ID
   */
  async get(
    ctx: Ctx,
    id: string
  ): Promise<
    | { ok: true; data: z.infer<typeof AssessmentResponseDTO> }
    | { ok: false; error: { code: string; message: string } }
  > {
    try {
      const row = await Q.getById(ctx, id);
      if (!row) {
        return this.notFound('Assessment not found');
      }
      const dto = toAssessmentDTO(row);
      const validation = this.validateResponse(dto);
      if (!validation.ok) return validation;
      return this.success(validation.data);
    } catch (error) {
      return this.handleDatabaseError(error, 'get assessment');
    }
  }

  /**
   * List assessments with pagination and filtering
   */
  async list(
    ctx: Ctx,
    params?: AssessmentListParams
  ): Promise<z.infer<typeof AssessmentListResponseDTO>> {
    try {
      const { rows, total, page, limit } = await Q.list(ctx, params || {});
      const data = rows.map(toAssessmentDTO);
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
      this.handleDatabaseError(error, 'list assessments');
    }
  }

  /**
   * Create new assessment
   */
  async create(
    ctx: Ctx,
    input: z.infer<typeof AssessmentCreateDTO>
  ): Promise<z.infer<typeof AssessmentResponseDTO>> {
    try {
      const valid = this.validateCreateInput(input);
      const toRow = fromCreateAssessmentDTO(valid);
      const row = await Q.create(ctx, toRow);
      const dto = toAssessmentDTO(row);
      return this.validateResponse(dto);
    } catch (error) {
      this.handleDatabaseError(error, 'create assessment');
    }
  }

  /**
   * Update assessment by ID
   */
  async update(
    ctx: Ctx,
    id: string,
    input: z.infer<typeof AssessmentUpdateDTO>
  ): Promise<z.infer<typeof AssessmentResponseDTO>> {
    try {
      const valid = this.validateUpdateInput(input);
      const changes = fromUpdateAssessmentDTO(valid);
      const row = await Q.update(ctx, id, changes);
      if (!row) {
        throw new Error('ASSESSMENT_NOT_FOUND');
      }
      const dto = toAssessmentDTO(row);
      return this.validateResponse(dto);
    } catch (error) {
      this.handleDatabaseError(error, 'update assessment');
    }
  }

  /**
   * Delete assessment by ID
   */
  async delete(ctx: Ctx, id: string): Promise<{ success: true }> {
    try {
      const ok = await Q.remove(ctx, id);
      if (!ok) {
        throw new Error('ASSESSMENT_NOT_FOUND');
      }
      return { success: true };
    } catch (error) {
      this.handleDatabaseError(error, 'delete assessment');
    }
  }

  // ============================================================================
  // SPECIALIZED METHODS (based on query module capabilities)
  // ============================================================================

  /**
   * Get assessment by slug
   */
  async getBySlug(
    ctx: Ctx,
    slug: string
  ): Promise<z.infer<typeof AssessmentResponseDTO> | null> {
    try {
      const row = await Q.getAssessmentBySlug(ctx, slug);
      if (!row) return null;
      const dto = toAssessmentDTO(row);
      return this.validateResponse(dto);
    } catch (error) {
      this.handleDatabaseError(error, 'get assessment by slug');
    }
  }

  /**
   * List assessment questions
   */
  async listQuestions(
    ctx: Ctx,
    assessmentId: string
  ): Promise<z.infer<typeof AssessmentListResponseDTO>> {
    try {
      const questions = await Q.getQuestions(ctx, assessmentId);
      const data = questions.map(toAssessmentDTO);
      const response = {
        data,
        pagination: {
          page: 1,
          limit: 100,
          total: questions.length,
          totalPages: Math.ceil(questions.length / 100),
        },
      };
      return this.validateListResponse(response);
    } catch (error) {
      this.handleDatabaseError(error, 'list assessment questions');
    }
  }
}

// Export singleton instance
export const assessmentService = new AssessmentService();
