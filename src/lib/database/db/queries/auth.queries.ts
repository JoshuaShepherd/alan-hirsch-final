/**
 * Auth Query Module - Stub Version
 * Minimal implementation to allow service compilation
 */

import type { Ctx } from './_ctx';

export type UserRow = {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  organizationId: string;
};

export type NewUserRow = {
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  organizationId: string;
};

// Stub implementations
export async function getUserById(
  ctx: Ctx,
  id: string
): Promise<UserRow | null> {
  throw new Error('Not implemented - stub version');
}

export async function createUser(ctx: Ctx, data: NewUserRow): Promise<UserRow> {
  throw new Error('Not implemented - stub version');
}

export async function updateUser(
  ctx: Ctx,
  id: string,
  data: Partial<NewUserRow>
): Promise<UserRow | null> {
  throw new Error('Not implemented - stub version');
}

export async function deleteUser(ctx: Ctx, id: string): Promise<boolean> {
  throw new Error('Not implemented - stub version');
}

export async function listUsers(
  ctx: Ctx,
  params?: { page?: number; limit?: number; sort?: string; q?: string }
): Promise<UserRow[]> {
  throw new Error('Not implemented - stub version');
}

// Additional methods needed by auth service
export async function getAuthById(
  ctx: Ctx,
  id: string
): Promise<UserRow | null> {
  return getUserById(ctx, id);
}

export async function createAuth(ctx: Ctx, data: NewUserRow): Promise<UserRow> {
  return createUser(ctx, data);
}

export async function updateAuth(
  ctx: Ctx,
  id: string,
  data: Partial<NewUserRow>
): Promise<UserRow | null> {
  return updateUser(ctx, id, data);
}

export async function removeAuth(ctx: Ctx, id: string): Promise<boolean> {
  return deleteUser(ctx, id);
}

export async function listAuths(
  ctx: Ctx,
  filters?: any
): Promise<{ rows: UserRow[]; total: number; page: number; limit: number }> {
  const users = await listUsers(ctx, filters);
  return {
    rows: users,
    total: users.length,
    page: 1,
    limit: 20,
  };
}

export async function validateCredentials(
  ctx: Ctx,
  email: string,
  password: string
): Promise<UserRow | null> {
  throw new Error('Not implemented - stub version');
}

export async function getUserByEmail(
  ctx: Ctx,
  email: string
): Promise<UserRow | null> {
  throw new Error('Not implemented - stub version');
}

// Standardized wrapper functions for service layer compatibility
export const getById = getUserById;
export const list = listUsers;
export const create = createUser;
export const update = updateUser;
export const remove = deleteUser;
