import {
  ContentCreateDTO,
  ContentListResponseDTO,
  ContentResponseDTO,
  ContentUpdateDTO,
} from '@/lib/contracts';
import type { Ctx } from '@/lib/database';
import * as Q from '@/lib/database/db/queries/content.queries';
import { z } from 'zod';
import {
  fromCreateContentDTO,
  fromUpdateContentDTO,
  toContentDTO,
} from '../mappers/content';
import { BaseService } from './base.service';

// ============================================================================
// CONTENT SERVICE
// ============================================================================

export type ContentListParams = {
  q?: string;
  page?: number;
  limit?: number;
  sort?: string;
  dir?: 'asc' | 'desc';
};

export class ContentService extends BaseService<
  z.infer<typeof ContentResponseDTO>
> {
  protected entityName = 'Content';
  protected createSchema = ContentCreateDTO;
  protected updateSchema = ContentUpdateDTO;
  protected responseSchema = ContentResponseDTO;
  protected listResponseSchema = ContentListResponseDTO;

  /**
   * Get content by ID
   */
  async get(ctx: Ctx, id: string): Promise<z.infer<typeof ContentResponseDTO>> {
    try {
      const row = await Q.getContentById(ctx, id);
      if (!row) {
        throw new Error('CONTENT_NOT_FOUND');
      }
      const dto = toContentDTO(row);
      return this.validateResponse(dto);
    } catch (error) {
      this.handleDatabaseError(error, 'get content');
    }
  }

  /**
   * List contents with pagination and filtering
   */
  async list(
    ctx: Ctx,
    params?: ContentListParams
  ): Promise<z.infer<typeof ContentListResponseDTO>> {
    try {
      const { rows, total, page, limit } = await Q.listContents(
        ctx,
        params || {}
      );
      const data = rows.map(toContentDTO);
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
      this.handleDatabaseError(error, 'list contents');
    }
  }

  /**
   * Create new content
   */
  async create(
    ctx: Ctx,
    input: z.infer<typeof ContentCreateDTO>
  ): Promise<z.infer<typeof ContentResponseDTO>> {
    try {
      const valid = this.validateCreateInput(input);
      const toRow = fromCreateContentDTO(valid);
      const row = await Q.createContent(ctx, toRow);
      const dto = toContentDTO(row);
      return this.validateResponse(dto);
    } catch (error) {
      this.handleDatabaseError(error, 'create content');
    }
  }

  /**
   * Update content by ID
   */
  async update(
    ctx: Ctx,
    id: string,
    input: z.infer<typeof ContentUpdateDTO>
  ): Promise<z.infer<typeof ContentResponseDTO>> {
    try {
      const valid = this.validateUpdateInput(input);
      const patch = fromUpdateContentDTO(valid);
      const row = await Q.updateContent(ctx, id, patch);
      if (!row) {
        throw new Error('CONTENT_NOT_FOUND');
      }
      const dto = toContentDTO(row);
      return this.validateResponse(dto);
    } catch (error) {
      this.handleDatabaseError(error, 'update content');
    }
  }

  /**
   * Delete content by ID
   */
  async delete(ctx: Ctx, id: string): Promise<{ success: true }> {
    try {
      const ok = await Q.removeContent(ctx, id);
      if (!ok) {
        throw new Error('CONTENT_NOT_FOUND');
      }
      return { success: true };
    } catch (error) {
      this.handleDatabaseError(error, 'delete content');
    }
  }

  // ============================================================================
  // SPECIALIZED METHODS (based on query module capabilities)
  // ============================================================================

  /**
   * Get content by slug
   */
  async getBySlug(
    ctx: Ctx,
    slug: string
  ): Promise<z.infer<typeof ContentResponseDTO> | null> {
    try {
      const row = await Q.getContentBySlug(ctx, slug);
      if (!row) return null;
      const dto = toContentDTO(row);
      return this.validateResponse(dto);
    } catch (error) {
      this.handleDatabaseError(error, 'get content by slug');
    }
  }

  /**
   * List content by series
   */
  async listBySeries(
    ctx: Ctx,
    seriesId: string
  ): Promise<z.infer<typeof ContentListResponseDTO>> {
    try {
      const { rows, total, page, limit } = await Q.listContentBySeries(
        ctx,
        seriesId
      );
      const data = rows.map(toContentDTO);
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
      this.handleDatabaseError(error, 'list content by series');
    }
  }
}

// Export singleton instance
export const contentService = new ContentService();
