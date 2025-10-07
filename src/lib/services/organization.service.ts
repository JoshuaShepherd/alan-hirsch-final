import {
  OrganizationCreateDTO,
  OrganizationListResponseDTO,
  OrganizationResponseDTO,
  OrganizationUpdateDTO,
} from '@/lib/contracts';
import type { Ctx } from '@/lib/database';
import * as Q from '@/lib/database/db/queries/organization.queries';
import { z } from 'zod';
import {
  fromCreateOrganizationDTO,
  fromUpdateOrganizationDTO,
  toOrganizationDTO,
} from '../mappers/organization';
import { BaseService } from './base.service';

// ============================================================================
// ORGANIZATION SERVICE
// ============================================================================

export type OrganizationListParams = {
  q?: string;
  page?: number;
  limit?: number;
  sort?: string;
  dir?: 'asc' | 'desc';
};

export class OrganizationService extends BaseService<
  z.infer<typeof OrganizationResponseDTO>
> {
  protected entityName = 'Organization';
  protected createSchema = OrganizationCreateDTO;
  protected updateSchema = OrganizationUpdateDTO;
  protected responseSchema = OrganizationResponseDTO;
  protected listResponseSchema = OrganizationListResponseDTO;

  /**
   * Get organization by ID
   */
  async get(
    ctx: Ctx,
    id: string
  ): Promise<z.infer<typeof OrganizationResponseDTO>> {
    try {
      const row = await Q.getOrganizationById(ctx, id);
      if (!row) {
        throw new Error('ORGANIZATION_NOT_FOUND');
      }
      const dto = toOrganizationDTO(row);
      return this.validateResponse(dto);
    } catch (error) {
      this.handleDatabaseError(error, 'get organization');
    }
  }

  /**
   * List organizations with pagination and filtering
   */
  async list(
    ctx: Ctx,
    params?: OrganizationListParams
  ): Promise<z.infer<typeof OrganizationListResponseDTO>> {
    try {
      const { rows, total, page, limit } = await Q.listOrganizations(
        ctx,
        params || {}
      );
      const data = rows.map(toOrganizationDTO);
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
      this.handleDatabaseError(error, 'list organizations');
    }
  }

  /**
   * Create new organization
   */
  async create(
    ctx: Ctx,
    input: z.infer<typeof OrganizationCreateDTO>
  ): Promise<z.infer<typeof OrganizationResponseDTO>> {
    try {
      const valid = this.validateCreateInput(input);
      const toRow = fromCreateOrganizationDTO(valid);
      const row = await Q.createOrganization(ctx, toRow);
      const dto = toOrganizationDTO(row);
      return this.validateResponse(dto);
    } catch (error) {
      this.handleDatabaseError(error, 'create organization');
    }
  }

  /**
   * Update organization by ID
   */
  async update(
    ctx: Ctx,
    id: string,
    input: z.infer<typeof OrganizationUpdateDTO>
  ): Promise<z.infer<typeof OrganizationResponseDTO>> {
    try {
      const valid = this.validateUpdateInput(input);
      const patch = fromUpdateOrganizationDTO(valid);
      const row = await Q.updateOrganization(ctx, id, patch);
      if (!row) {
        throw new Error('ORGANIZATION_NOT_FOUND');
      }
      const dto = toOrganizationDTO(row);
      return this.validateResponse(dto);
    } catch (error) {
      this.handleDatabaseError(error, 'update organization');
    }
  }

  /**
   * Delete organization by ID
   */
  async delete(ctx: Ctx, id: string): Promise<{ success: true }> {
    try {
      const ok = await Q.removeOrganization(ctx, id);
      if (!ok) {
        throw new Error('ORGANIZATION_NOT_FOUND');
      }
      return { success: true };
    } catch (error) {
      this.handleDatabaseError(error, 'delete organization');
    }
  }

  // ============================================================================
  // SPECIALIZED METHODS (based on query module capabilities)
  // ============================================================================

  /**
   * Get organization by slug
   */
  async getBySlug(
    ctx: Ctx,
    slug: string
  ): Promise<z.infer<typeof OrganizationResponseDTO> | null> {
    try {
      const row = await Q.getOrganizationBySlug(ctx, slug);
      if (!row) return null;
      const dto = toOrganizationDTO(row);
      return this.validateResponse(dto);
    } catch (error) {
      this.handleDatabaseError(error, 'get organization by slug');
    }
  }

  /**
   * List organization memberships
   */
  async listMemberships(
    ctx: Ctx,
    organizationId: string
  ): Promise<z.infer<typeof OrganizationListResponseDTO>> {
    try {
      const { rows, total, page, limit } = await Q.listOrganizationMembers(
        ctx,
        organizationId,
        { page: 1, limit: 100 }
      );
      const data = rows.map(toOrganizationDTO);
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
      this.handleDatabaseError(error, 'list organization memberships');
    }
  }
}

// Export singleton instance
export const organizationService = new OrganizationService();
