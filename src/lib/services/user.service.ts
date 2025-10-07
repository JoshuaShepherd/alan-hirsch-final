import {
  UserCreateDTO,
  UserListResponseDTO,
  UserResponseDTO,
  UserUpdateDTO,
} from '@/lib/contracts';
import type { Ctx } from '@/lib/database';
import * as Q from '@/lib/database/db/queries/user.queries';
import { z } from 'zod';
import {
  fromCreateUserDTO,
  fromUpdateUserDTO,
  toUserDTO,
} from '../mappers/user';
import { BaseService } from './base.service';

// ============================================================================
// USER SERVICE
// ============================================================================

export type UserListParams = {
  q?: string;
  page?: number;
  limit?: number;
  sort?: string;
  dir?: 'asc' | 'desc';
};

export class UserService extends BaseService<z.infer<typeof UserResponseDTO>> {
  protected entityName = 'User';
  protected createSchema = UserCreateDTO;
  protected updateSchema = UserUpdateDTO;
  protected responseSchema = UserResponseDTO;
  protected listResponseSchema = UserListResponseDTO;

  /**
   * Get user by ID
   */
  async get(
    ctx: Ctx,
    id: string
  ): Promise<
    | { ok: true; data: z.infer<typeof UserResponseDTO> }
    | { ok: false; error: { code: string; message: string } }
  > {
    try {
      const row = await Q.getUserById(ctx, id);
      if (!row) {
        return this.notFound('User not found');
      }
      const dto = toUserDTO(row);
      const validation = this.validateResponse(dto);
      if (!validation.ok) return validation;
      return this.success(validation.data);
    } catch (error) {
      return this.handleDatabaseError(error, 'get user');
    }
  }

  /**
   * List users with pagination and filtering
   */
  async list(
    ctx: Ctx,
    params?: UserListParams
  ): Promise<
    | { ok: true; data: z.infer<typeof UserListResponseDTO> }
    | { ok: false; error: { code: string; message: string } }
  > {
    try {
      const { rows, total, page, limit } = await Q.listUsers(ctx, params || {});
      const data = rows.map(toUserDTO);
      const response = {
        data,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
      const validation = this.validateListResponse(response);
      if (!validation.ok) return validation;
      return this.success(validation.data);
    } catch (error) {
      return this.handleDatabaseError(error, 'list users');
    }
  }

  /**
   * Create new user
   */
  async create(
    ctx: Ctx,
    input: z.infer<typeof UserCreateDTO>
  ): Promise<
    | { ok: true; data: z.infer<typeof UserResponseDTO> }
    | { ok: false; error: { code: string; message: string } }
  > {
    try {
      const validation = this.validateCreateInput(input);
      if (!validation.ok) return validation;

      const toRow = fromCreateUserDTO(validation.data);
      const row = await Q.createUser(ctx, toRow);
      const dto = toUserDTO(row);
      const responseValidation = this.validateResponse(dto);
      if (!responseValidation.ok) return responseValidation;
      return this.success(responseValidation.data);
    } catch (error) {
      return this.handleDatabaseError(error, 'create user');
    }
  }

  /**
   * Update user by ID
   */
  async update(
    ctx: Ctx,
    id: string,
    input: z.infer<typeof UserUpdateDTO>
  ): Promise<
    | { ok: true; data: z.infer<typeof UserResponseDTO> }
    | { ok: false; error: { code: string; message: string } }
  > {
    try {
      const validation = this.validateUpdateInput(input);
      if (!validation.ok) return validation;

      const patch = fromUpdateUserDTO(validation.data);
      const row = await Q.updateUser(ctx, id, patch);
      if (!row) {
        return this.notFound('User not found');
      }
      const dto = toUserDTO(row);
      const responseValidation = this.validateResponse(dto);
      if (!responseValidation.ok) return responseValidation;
      return this.success(responseValidation.data);
    } catch (error) {
      return this.handleDatabaseError(error, 'update user');
    }
  }

  /**
   * Delete user by ID
   */
  async delete(
    ctx: Ctx,
    id: string
  ): Promise<
    | { ok: true; data: { success: true } }
    | { ok: false; error: { code: string; message: string } }
  > {
    try {
      const ok = await Q.removeUser(ctx, id);
      if (!ok) {
        return this.notFound('User not found');
      }
      return this.success({ success: true });
    } catch (error) {
      return this.handleDatabaseError(error, 'delete user');
    }
  }

  // ============================================================================
  // SPECIALIZED METHODS (based on query module capabilities)
  // ============================================================================

  /**
   * Get user by email
   */
  async getByEmail(
    ctx: Ctx,
    email: string
  ): Promise<
    | { ok: true; data: z.infer<typeof UserResponseDTO> | null }
    | { ok: false; error: { code: string; message: string } }
  > {
    try {
      const row = await Q.getUserByEmail(ctx, email);
      if (!row) return this.success(null);
      const dto = toUserDTO(row);
      const validation = this.validateResponse(dto);
      if (!validation.ok) return validation;
      return this.success(validation.data);
    } catch (error) {
      return this.handleDatabaseError(error, 'get user by email');
    }
  }

  /**
   * Get user by subdomain
   */
  async getBySubdomain(
    subdomain: string
  ): Promise<
    | { ok: true; data: z.infer<typeof UserResponseDTO> | null }
    | { ok: false; error: { code: string; message: string } }
  > {
    try {
      const row = await Q.getUserBySubdomain(subdomain);
      if (!row) return this.success(null);
      const dto = toUserDTO(row);
      const validation = this.validateResponse(dto);
      if (!validation.ok) return validation;
      return this.success(validation.data);
    } catch (error) {
      return this.handleDatabaseError(error, 'get user by subdomain');
    }
  }

  /**
   * Update user last active timestamp
   */
  async updateLastActive(
    ctx: Ctx,
    id: string
  ): Promise<
    | { ok: true; data: z.infer<typeof UserResponseDTO> }
    | { ok: false; error: { code: string; message: string } }
  > {
    try {
      const row = await Q.updateUserLastActive(ctx, id);
      if (!row) {
        return this.notFound('User not found');
      }
      const dto = toUserDTO(row);
      const validation = this.validateResponse(dto);
      if (!validation.ok) return validation;
      return this.success(validation.data);
    } catch (error) {
      return this.handleDatabaseError(error, 'update user last active');
    }
  }
}

// Export singleton instance
export const userService = new UserService();
