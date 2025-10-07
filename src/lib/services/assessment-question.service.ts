import {
  AssessmentQuestionCreateDTO,
  AssessmentQuestionListResponseDTO,
  AssessmentQuestionResponseDTO,
  AssessmentQuestionUpdateDTO,
} from '@/lib/contracts';
import type { Ctx } from '@/lib/database';
import * as Q from '@/lib/database/db/queries/assessment-question.queries';
import { z } from 'zod';
import {
  fromCreateAssessmentQuestionDTO,
  fromUpdateAssessmentQuestionDTO,
  toAssessmentQuestionDTO,
} from '../mappers/assessmentquestions.mapper';
import { BaseService } from './base.service';

// ============================================================================
// ASSESSMENT QUESTION SERVICE
// ============================================================================

export type AssessmentQuestionListParams = {
  assessmentId?: string;
  page?: number;
  limit?: number;
  sort?: string;
  dir?: 'asc' | 'desc';
  search?: string;
};

export class AssessmentQuestionService extends BaseService<
  z.infer<typeof AssessmentQuestionResponseDTO>
> {
  protected entityName = 'AssessmentQuestion';
  protected createSchema = AssessmentQuestionCreateDTO;
  protected updateSchema = AssessmentQuestionUpdateDTO;
  protected responseSchema = AssessmentQuestionResponseDTO;
  protected listResponseSchema = AssessmentQuestionListResponseDTO;

  /**
   * Get assessment question by ID
   */
  async get(
    ctx: Ctx,
    id: string
  ): Promise<z.infer<typeof AssessmentQuestionResponseDTO>> {
    try {
      const row = await Q.getAssessmentQuestionById(ctx, id);
      if (!row) {
        throw new Error('ASSESSMENT_QUESTION_NOT_FOUND');
      }
      const dto = toAssessmentQuestionDTO(row);
      return this.validateResponse(dto);
    } catch (error) {
      this.handleDatabaseError(error, 'get assessment question');
    }
  }

  /**
   * List assessment questions with pagination and filtering
   */
  async list(
    ctx: Ctx,
    params?: AssessmentQuestionListParams
  ): Promise<z.infer<typeof AssessmentQuestionListResponseDTO>> {
    try {
      const { rows, total, page, limit } = await Q.listAssessmentQuestions(
        ctx,
        params || {}
      );
      const data = rows.map(toAssessmentQuestionDTO);
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
      this.handleDatabaseError(error, 'list assessment questions');
    }
  }

  /**
   * Create new assessment question
   */
  async create(
    ctx: Ctx,
    input: z.infer<typeof AssessmentQuestionCreateDTO>
  ): Promise<z.infer<typeof AssessmentQuestionResponseDTO>> {
    try {
      const valid = this.validateCreateInput(input);
      const toRow = fromCreateAssessmentQuestionDTO(valid);
      const row = await Q.createAssessmentQuestion(ctx, toRow);
      const dto = toAssessmentQuestionDTO(row);
      return this.validateResponse(dto);
    } catch (error) {
      this.handleDatabaseError(error, 'create assessment question');
    }
  }

  /**
   * Update assessment question by ID
   */
  async update(
    ctx: Ctx,
    id: string,
    input: z.infer<typeof AssessmentQuestionUpdateDTO>
  ): Promise<z.infer<typeof AssessmentQuestionResponseDTO>> {
    try {
      const valid = this.validateUpdateInput(input);
      const patch = fromUpdateAssessmentQuestionDTO(valid);
      const row = await Q.updateAssessmentQuestion(ctx, id, patch);
      if (!row) {
        throw new Error('ASSESSMENT_QUESTION_NOT_FOUND');
      }
      const dto = toAssessmentQuestionDTO(row);
      return this.validateResponse(dto);
    } catch (error) {
      this.handleDatabaseError(error, 'update assessment question');
    }
  }

  /**
   * Delete assessment question by ID
   */
  async delete(ctx: Ctx, id: string): Promise<{ success: true }> {
    try {
      const ok = await Q.removeAssessmentQuestion(ctx, id);
      if (!ok) {
        throw new Error('ASSESSMENT_QUESTION_NOT_FOUND');
      }
      return { success: true };
    } catch (error) {
      this.handleDatabaseError(error, 'delete assessment question');
    }
  }

  // ============================================================================
  // SPECIALIZED METHODS (based on query module capabilities)
  // ============================================================================

  /**
   * List questions for a specific assessment
   */
  async listByAssessment(
    ctx: Ctx,
    assessmentId: string
  ): Promise<z.infer<typeof AssessmentQuestionListResponseDTO>> {
    try {
      const { rows, total, page, limit } = await Q.listQuestionsByAssessment(
        ctx,
        assessmentId
      );
      const data = rows.map(toAssessmentQuestionDTO);
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
      this.handleDatabaseError(error, 'list questions by assessment');
    }
  }

  /**
   * Get questions by category
   */
  async listByCategory(
    ctx: Ctx,
    category: string
  ): Promise<z.infer<typeof AssessmentQuestionListResponseDTO>> {
    try {
      const { rows, total, page, limit } = await Q.listQuestionsByCategory(
        ctx,
        category
      );
      const data = rows.map(toAssessmentQuestionDTO);
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
      this.handleDatabaseError(error, 'list questions by category');
    }
  }
}

// Export singleton instance
export const assessmentQuestionService = new AssessmentQuestionService();
