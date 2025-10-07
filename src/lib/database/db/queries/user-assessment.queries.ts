/**
 * User Assessment Query Module
 * Pure DB I/O operations for user assessments with tenant scoping
 *
 * Inputs: Context with tenantId, userId, role
 * Outputs: Raw Drizzle row types (no DTOs, no mappers)
 */

import { count, desc, eq } from 'drizzle-orm';
import { db } from '../drizzle';
import { userAssessments } from '../schema';
import { Ctx } from './_ctx';

// ============================================================================
// ROW TYPES (from Drizzle schema)
// ============================================================================

export type UserAssessmentRow = typeof userAssessments.$inferSelect;
export type NewUserAssessmentRow = typeof userAssessments.$inferInsert;

// ============================================================================
// USER ASSESSMENT QUERY FUNCTIONS
// ============================================================================

/**
 * List user assessments with pagination and filtering
 */
export async function listUserAssessments(
  ctx: Ctx,
  params?: { page?: number; limit?: number; sort?: string; q?: string }
): Promise<{
  rows: UserAssessmentRow[];
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
      .from(userAssessments)
      .orderBy(desc(userAssessments.createdAt))
      .limit(limit)
      .offset(offset),
    db.select({ count: count() }).from(userAssessments),
  ]);

  return {
    rows,
    total: totalResult[0]?.count || 0,
    page,
    limit,
  };
}

/**
 * Get user assessment by ID
 */
export async function getUserAssessmentById(
  ctx: Ctx,
  id: string
): Promise<UserAssessmentRow | null> {
  const [assessment] = await db
    .select()
    .from(userAssessments)
    .where(eq(userAssessments.id, id))
    .limit(1);

  return assessment || null;
}

/**
 * Create new user assessment
 */
export async function createUserAssessment(
  ctx: Ctx,
  data: NewUserAssessmentRow
): Promise<UserAssessmentRow> {
  const [assessment] = await db
    .insert(userAssessments)
    .values({
      ...data,
      updatedAt: new Date(),
    })
    .returning();

  return assessment;
}

/**
 * Update user assessment by ID
 */
export async function updateUserAssessment(
  ctx: Ctx,
  id: string,
  data: Partial<NewUserAssessmentRow>
): Promise<UserAssessmentRow | null> {
  const [assessment] = await db
    .update(userAssessments)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(userAssessments.id, id))
    .returning();

  return assessment || null;
}

/**
 * Delete user assessment by ID
 */
export async function deleteUserAssessment(
  ctx: Ctx,
  id: string
): Promise<boolean> {
  const result = await db
    .delete(userAssessments)
    .where(eq(userAssessments.id, id));
  return result.length > 0;
}

// Alias for service compatibility
export const removeUserAssessment = deleteUserAssessment;

/**
 * List assessments by user ID
 */
export async function listAssessmentsByUser(
  ctx: Ctx,
  userId: string,
  params?: { page?: number; limit?: number }
): Promise<{
  rows: UserAssessmentRow[];
  total: number;
  page: number;
  limit: number;
}> {
  /* TODO */
  return { rows: [], total: 0, page: 1, limit: 20 };
}

/**
 * List completed assessments by user ID
 */
export async function listCompletedAssessmentsByUser(
  ctx: Ctx,
  userId: string
): Promise<UserAssessmentRow[]> {
  /* TODO */
  return [];
}

/**
 * List user assessments by assessment ID
 */
export async function listUserAssessmentsByAssessment(
  ctx: Ctx,
  assessmentId: string,
  params?: { page?: number; limit?: number }
): Promise<{
  rows: UserAssessmentRow[];
  total: number;
  page: number;
  limit: number;
}> {
  /* TODO */
  return { rows: [], total: 0, page: 1, limit: 20 };
}

// Standardized wrapper functions for service layer compatibility
export const getById = getUserAssessmentById;
export const list = listUserAssessments;
export const create = createUserAssessment;
export const update = updateUserAssessment;
export const remove = deleteUserAssessment;
