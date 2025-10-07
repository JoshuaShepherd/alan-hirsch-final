/**
 * Organization Query Module
 * Complete implementation with proper schema types and CRUD operations
 */

import { and, asc, count, desc, eq, like, or } from 'drizzle-orm';
import { db } from '../drizzle';
import { organizationMemberships, organizations } from '../schema';

import type { Ctx } from './_ctx';

export type OrganizationRow = typeof organizations.$inferSelect;
export type NewOrganizationRow = typeof organizations.$inferInsert;

export type OrganizationListResult = {
  rows: OrganizationRow[];
  total: number;
  page: number;
  limit: number;
};

// CRUD implementations
export async function getOrganizationById(
  ctx: Ctx,
  id: string
): Promise<OrganizationRow | null> {
  const [organization] = await db
    .select()
    .from(organizations)
    .where(eq(organizations.id, id))
    .limit(1);

  return organization || null;
}

export async function createOrganization(
  ctx: Ctx,
  data: NewOrganizationRow
): Promise<OrganizationRow> {
  const [organization] = await db
    .insert(organizations)
    .values({
      ...data,
      updatedAt: new Date(),
    })
    .returning();

  return organization;
}

export async function updateOrganization(
  ctx: Ctx,
  id: string,
  data: Partial<NewOrganizationRow>
): Promise<OrganizationRow | null> {
  const [organization] = await db
    .update(organizations)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(organizations.id, id))
    .returning();

  return organization || null;
}

export async function deleteOrganization(
  ctx: Ctx,
  id: string
): Promise<boolean> {
  const result = await db.delete(organizations).where(eq(organizations.id, id));

  return result.length > 0;
}

// Alias for service compatibility
export const removeOrganization = deleteOrganization;

export async function listOrganizations(
  ctx: Ctx,
  filters?: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    organizationType?: string;
    status?: string;
  }
): Promise<OrganizationListResult> {
  const page = filters?.page || 1;
  const limit = filters?.limit || 10;
  const offset = (page - 1) * limit;

  // Build where condition
  const conditions = [];

  if (filters?.search) {
    conditions.push(
      or(
        like(organizations.name, `%${filters.search}%`),
        like(organizations.description, `%${filters.search}%`)
      )
    );
  }

  if (filters?.organizationType) {
    conditions.push(
      eq(organizations.organizationType, filters.organizationType as any)
    );
  }

  if (filters?.status) {
    conditions.push(eq(organizations.status, filters.status as any));
  }

  const whereCondition =
    conditions.length > 0
      ? conditions.length === 1
        ? conditions[0]
        : and(...conditions)
      : undefined;

  // Build order by condition
  const sortOrder = filters?.sortOrder === 'asc' ? asc : desc;
  const sortBy = filters?.sortBy || 'createdAt';
  let orderByCondition;

  if (sortBy === 'createdAt') {
    orderByCondition = sortOrder(organizations.createdAt);
  } else if (sortBy === 'updatedAt') {
    orderByCondition = sortOrder(organizations.updatedAt);
  } else if (sortBy === 'name') {
    orderByCondition = sortOrder(organizations.name);
  } else {
    orderByCondition = sortOrder(organizations.createdAt);
  }

  // Execute queries
  const [rows, totalResult] = await Promise.all([
    db
      .select()
      .from(organizations)
      .where(whereCondition)
      .orderBy(orderByCondition)
      .limit(limit)
      .offset(offset),
    db.select({ count: count() }).from(organizations).where(whereCondition),
  ]);

  return {
    rows,
    total: totalResult[0]?.count || 0,
    page,
    limit,
  };
}

// Additional utility functions
export async function getOrganizationBySlug(
  ctx: Ctx,
  slug: string
): Promise<OrganizationRow | null> {
  const [organization] = await db
    .select()
    .from(organizations)
    .where(eq(organizations.slug, slug))
    .limit(1);

  return organization || null;
}

export async function listOrganizationMembers(
  ctx: Ctx,
  organizationId: string
): Promise<(typeof organizationMemberships.$inferSelect)[]> {
  const members = await db
    .select()
    .from(organizationMemberships)
    .where(eq(organizationMemberships.organizationId, organizationId));

  return members;
}

// Standardized wrapper functions for service layer compatibility
export const getById = getOrganizationById;
export const list = listOrganizations;
export const create = createOrganization;
export const update = updateOrganization;
export const remove = deleteOrganization;
