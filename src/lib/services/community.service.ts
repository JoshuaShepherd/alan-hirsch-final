import {
  CommunityCreateDTO,
  CommunityListResponseDTO,
  CommunityResponseDTO,
  CommunityUpdateDTO,
} from '@/lib/contracts';
import type { Ctx } from '@/lib/database';
import * as Q from '@/lib/database/db/queries/community.queries';
import { z } from 'zod';
import {
  fromCreateCommunityDTO,
  fromUpdateCommunityDTO,
  toCommunityDTO,
} from '../mappers/community';
import { BaseService } from './base.service';

// ============================================================================
// COMMUNITY SERVICE
// ============================================================================

export type CommunityListParams = {
  q?: string;
  page?: number;
  limit?: number;
  sort?: string;
  dir?: 'asc' | 'desc';
};

export class CommunityService extends BaseService<
  z.infer<typeof CommunityResponseDTO>
> {
  protected entityName = 'Community';
  protected createSchema = CommunityCreateDTO;
  protected updateSchema = CommunityUpdateDTO;
  protected responseSchema = CommunityResponseDTO;
  protected listResponseSchema = CommunityListResponseDTO;

  /**
   * Get community by ID
   */
  async get(
    ctx: Ctx,
    id: string
  ): Promise<z.infer<typeof CommunityResponseDTO>> {
    try {
      const row = await Q.getCommunityById(ctx, id);
      if (!row) {
        throw new Error('COMMUNITY_NOT_FOUND');
      }
      const dto = toCommunityDTO(row);
      return this.validateResponse(dto);
    } catch (error) {
      this.handleDatabaseError(error, 'get community');
    }
  }

  /**
   * List communities with pagination and filtering
   */
  async list(
    ctx: Ctx,
    params?: CommunityListParams
  ): Promise<z.infer<typeof CommunityListResponseDTO>> {
    try {
      const { rows, total, page, limit } = await Q.listCommunitys(
        ctx,
        params || {}
      );
      const data = rows.map(toCommunityDTO);
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
      this.handleDatabaseError(error, 'list communities');
    }
  }

  /**
   * Create new community
   */
  async create(
    ctx: Ctx,
    input: z.infer<typeof CommunityCreateDTO>
  ): Promise<z.infer<typeof CommunityResponseDTO>> {
    try {
      const valid = this.validateCreateInput(input);
      const toRow = fromCreateCommunityDTO(valid);
      const row = await Q.createCommunity(ctx, toRow);
      const dto = toCommunityDTO(row);
      return this.validateResponse(dto);
    } catch (error) {
      this.handleDatabaseError(error, 'create community');
    }
  }

  /**
   * Update community by ID
   */
  async update(
    ctx: Ctx,
    id: string,
    input: z.infer<typeof CommunityUpdateDTO>
  ): Promise<z.infer<typeof CommunityResponseDTO>> {
    try {
      const valid = this.validateUpdateInput(input);
      const patch = fromUpdateCommunityDTO(valid);
      const row = await Q.updateCommunity(ctx, id, patch);
      if (!row) {
        throw new Error('COMMUNITY_NOT_FOUND');
      }
      const dto = toCommunityDTO(row);
      return this.validateResponse(dto);
    } catch (error) {
      this.handleDatabaseError(error, 'update community');
    }
  }

  /**
   * Delete community by ID
   */
  async delete(ctx: Ctx, id: string): Promise<{ success: true }> {
    try {
      const ok = await Q.removeCommunity(ctx, id);
      if (!ok) {
        throw new Error('COMMUNITY_NOT_FOUND');
      }
      return { success: true };
    } catch (error) {
      this.handleDatabaseError(error, 'delete community');
    }
  }

  // ============================================================================
  // SPECIALIZED METHODS (based on query module capabilities)
  // ============================================================================

  /**
   * Get community by slug
   */
  async getBySlug(
    ctx: Ctx,
    slug: string
  ): Promise<z.infer<typeof CommunityResponseDTO> | null> {
    try {
      const row = await Q.getCommunityBySlug(ctx, slug);
      if (!row) return null;
      const dto = toCommunityDTO(row);
      return this.validateResponse(dto);
    } catch (error) {
      this.handleDatabaseError(error, 'get community by slug');
    }
  }

  /**
   * List community posts
   */
  async listPosts(
    ctx: Ctx,
    communityId: string
  ): Promise<z.infer<typeof CommunityListResponseDTO>> {
    try {
      const { rows, total, page, limit } = await Q.listPosts(ctx, communityId, {
        page: 1,
        limit: 100,
      });
      const data = rows.map(toCommunityDTO);
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
      this.handleDatabaseError(error, 'list community posts');
    }
  }
}

// Export singleton instance
export const communityService = new CommunityService();
