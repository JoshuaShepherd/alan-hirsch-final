/**
 * Community Membership Query Module
 * Pure DB I/O operations for community memberships with tenant scoping
 *
 * Inputs: Context with tenantId, userId, role
 * Outputs: Raw Drizzle row types (no DTOs, no mappers)
 */

import { count, desc, eq } from 'drizzle-orm';
import { db } from '../drizzle';
import { communityMemberships } from '../schema';
import { Ctx } from './_ctx';

// ============================================================================
// ROW TYPES (from Drizzle schema)
// ============================================================================

export type CommunityMembershipRow = typeof communityMemberships.$inferSelect;
export type NewCommunityMembershipRow =
  typeof communityMemberships.$inferInsert;

// ============================================================================
// COMMUNITY MEMBERSHIP QUERY FUNCTIONS
// ============================================================================

/**
 * List community memberships with pagination and filtering
 */
export async function listCommunityMemberships(
  ctx: Ctx,
  params?: { page?: number; limit?: number; sort?: string; q?: string }
): Promise<{
  rows: CommunityMembershipRow[];
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
      .from(communityMemberships)
      .orderBy(desc(communityMemberships.createdAt))
      .limit(limit)
      .offset(offset),
    db.select({ count: count() }).from(communityMemberships),
  ]);

  return {
    rows,
    total: totalResult[0]?.count || 0,
    page,
    limit,
  };
}

/**
 * Get community membership by ID
 */
export async function getCommunityMembershipById(
  ctx: Ctx,
  id: string
): Promise<CommunityMembershipRow | null> {
  const [membership] = await db
    .select()
    .from(communityMemberships)
    .where(eq(communityMemberships.id, id))
    .limit(1);

  return membership || null;
}

/**
 * Create new community membership
 */
export async function createCommunityMembership(
  ctx: Ctx,
  data: NewCommunityMembershipRow
): Promise<CommunityMembershipRow> {
  const [membership] = await db
    .insert(communityMemberships)
    .values({
      ...data,
      updatedAt: new Date(),
    })
    .returning();

  return membership;
}

/**
 * Update community membership by ID
 */
export async function updateCommunityMembership(
  ctx: Ctx,
  id: string,
  data: Partial<NewCommunityMembershipRow>
): Promise<CommunityMembershipRow | null> {
  const [membership] = await db
    .update(communityMemberships)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(communityMemberships.id, id))
    .returning();

  return membership || null;
}

/**
 * Delete community membership by ID
 */
export async function deleteCommunityMembership(
  ctx: Ctx,
  id: string
): Promise<boolean> {
  const result = await db
    .delete(communityMemberships)
    .where(eq(communityMemberships.id, id));
  return result.length > 0;
}

// Standardized wrapper functions for service layer compatibility
export const getById = getCommunityMembershipById;
export const list = listCommunityMemberships;
export const create = createCommunityMembership;
export const update = updateCommunityMembership;
export const remove = deleteCommunityMembership;
