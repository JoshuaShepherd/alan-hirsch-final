/**
 * Organization Membership Query Module
 * Pure DB I/O operations for organization memberships with tenant scoping
 *
 * Inputs: Context with tenantId, userId, role
 * Outputs: Raw Drizzle row types (no DTOs, no mappers)
 */

import { count, desc, eq } from 'drizzle-orm';
import { db } from '../drizzle';
import { organizationMemberships } from '../schema';
import { Ctx } from './_ctx';

// ============================================================================
// ROW TYPES (from Drizzle schema)
// ============================================================================

export type OrganizationMembershipRow =
  typeof organizationMemberships.$inferSelect;
export type NewOrganizationMembershipRow =
  typeof organizationMemberships.$inferInsert;

// ============================================================================
// ORGANIZATION MEMBERSHIP QUERY FUNCTIONS
// ============================================================================

/**
 * List organization memberships with pagination and filtering
 */
export async function listOrganizationMemberships(
  ctx: Ctx,
  params?: { page?: number; limit?: number; sort?: string; q?: string }
): Promise<{
  rows: OrganizationMembershipRow[];
  total: number;
  page: number;
  limit: number;
}> {
  const page = params?.page || 1;
  const limit = params?.limit || 10;
  const offset = (page - 1) * limit;

  const [rows, totalResult] = await Promise.all([
    db
      .select()
      .from(organizationMemberships)
      .orderBy(desc(organizationMemberships.createdAt))
      .limit(limit)
      .offset(offset),
    db.select({ count: count() }).from(organizationMemberships),
  ]);

  return {
    rows,
    total: totalResult[0]?.count || 0,
    page,
    limit,
  };
}

/**
 * Get organization membership by ID
 */
export async function getOrganizationMembershipById(
  ctx: Ctx,
  id: string
): Promise<OrganizationMembershipRow | null> {
  const [membership] = await db
    .select()
    .from(organizationMemberships)
    .where(eq(organizationMemberships.id, id))
    .limit(1);

  return membership || null;
}

/**
 * Create new organization membership
 */
export async function createOrganizationMembership(
  ctx: Ctx,
  data: NewOrganizationMembershipRow
): Promise<OrganizationMembershipRow> {
  const [membership] = await db
    .insert(organizationMemberships)
    .values({
      ...data,
      updatedAt: new Date(),
    })
    .returning();

  return membership;
}

/**
 * Update organization membership by ID
 */
export async function updateOrganizationMembership(
  ctx: Ctx,
  id: string,
  data: Partial<NewOrganizationMembershipRow>
): Promise<OrganizationMembershipRow | null> {
  const [membership] = await db
    .update(organizationMemberships)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(organizationMemberships.id, id))
    .returning();

  return membership || null;
}

/**
 * Delete organization membership by ID
 */
export async function deleteOrganizationMembership(
  ctx: Ctx,
  id: string
): Promise<boolean> {
  const result = await db
    .delete(organizationMemberships)
    .where(eq(organizationMemberships.id, id));
  return result.length > 0;
}

// Standardized wrapper functions for service layer compatibility
export const getById = getOrganizationMembershipById;
export const list = listOrganizationMemberships;
export const create = createOrganizationMembership;
export const update = updateOrganizationMembership;
export const remove = deleteOrganizationMembership;
