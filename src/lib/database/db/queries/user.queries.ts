/**
 * User Query Module
 * Complete implementation with proper schema types and CRUD operations
 */

import { asc, count, desc, eq, like, or } from 'drizzle-orm';
import { db } from '../drizzle';
import { userProfiles } from '../schema';

import type { Ctx } from './_ctx';

export type UserRow = typeof userProfiles.$inferSelect;
export type NewUserRow = typeof userProfiles.$inferInsert;

export type UserListResult = {
  rows: UserRow[];
  total: number;
  page: number;
  limit: number;
};

// CRUD implementations
export async function getUserById(
  ctx: Ctx,
  id: string
): Promise<UserRow | null> {
  const [user] = await db
    .select()
    .from(userProfiles)
    .where(eq(userProfiles.id, id))
    .limit(1);

  return user || null;
}

export async function createUser(ctx: Ctx, data: NewUserRow): Promise<UserRow> {
  const [user] = await db
    .insert(userProfiles)
    .values({
      ...data,
      updatedAt: new Date(),
    })
    .returning();

  return user;
}

export async function updateUser(
  ctx: Ctx,
  id: string,
  data: Partial<NewUserRow>
): Promise<UserRow | null> {
  const [user] = await db
    .update(userProfiles)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(userProfiles.id, id))
    .returning();

  return user || null;
}

export async function deleteUser(ctx: Ctx, id: string): Promise<boolean> {
  const result = await db.delete(userProfiles).where(eq(userProfiles.id, id));

  return result.length > 0;
}

// Alias for service compatibility
export const removeUser = deleteUser;

export async function listUsers(
  ctx: Ctx,
  filters?: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }
): Promise<UserListResult> {
  const page = filters?.page || 1;
  const limit = filters?.limit || 10;
  const offset = (page - 1) * limit;

  // Build where condition
  let whereCondition = undefined;
  if (filters?.search) {
    whereCondition = or(
      like(userProfiles.firstName, `%${filters.search}%`),
      like(userProfiles.lastName, `%${filters.search}%`),
      like(userProfiles.email, `%${filters.search}%`),
      like(userProfiles.displayName, `%${filters.search}%`)
    );
  }

  // Build order by condition
  const sortOrder = filters?.sortOrder === 'asc' ? asc : desc;
  const sortBy = filters?.sortBy || 'createdAt';
  let orderByCondition;

  if (sortBy === 'createdAt') {
    orderByCondition = sortOrder(userProfiles.createdAt);
  } else if (sortBy === 'updatedAt') {
    orderByCondition = sortOrder(userProfiles.updatedAt);
  } else if (sortBy === 'lastName') {
    orderByCondition = sortOrder(userProfiles.lastName);
  } else if (sortBy === 'firstName') {
    orderByCondition = sortOrder(userProfiles.firstName);
  } else {
    orderByCondition = sortOrder(userProfiles.createdAt);
  }

  // Execute queries
  const [rows, totalResult] = await Promise.all([
    db
      .select()
      .from(userProfiles)
      .where(whereCondition)
      .orderBy(orderByCondition)
      .limit(limit)
      .offset(offset),
    db.select({ count: count() }).from(userProfiles).where(whereCondition),
  ]);

  return {
    rows,
    total: totalResult[0]?.count || 0,
    page,
    limit,
  };
}

// Additional utility functions
export async function getUserByEmail(
  ctx: Ctx,
  email: string
): Promise<UserRow | null> {
  const [user] = await db
    .select()
    .from(userProfiles)
    .where(eq(userProfiles.email, email))
    .limit(1);

  return user || null;
}

export async function getUserBySubdomain(
  ctx: Ctx,
  subdomain: string
): Promise<UserRow | null> {
  const [user] = await db
    .select()
    .from(userProfiles)
    .where(eq(userProfiles.subdomain, subdomain))
    .limit(1);

  return user || null;
}

export async function updateUserLastActive(
  ctx: Ctx,
  id: string
): Promise<void> {
  await db
    .update(userProfiles)
    .set({
      lastActiveAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(userProfiles.id, id));
}

// Standardized wrapper functions for service layer compatibility
export const getById = getUserById;
export const list = listUsers;
export const create = createUser;
export const update = updateUser;
export const remove = deleteUser;
