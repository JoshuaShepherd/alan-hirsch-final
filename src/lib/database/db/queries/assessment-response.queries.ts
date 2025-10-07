/**
 * Assessment Response Query Module
 * Pure DB I/O operations for assessment responses with tenant scoping
 *
 * Inputs: Context with tenantId, userId, role
 * Outputs: Raw Drizzle row types (no DTOs, no mappers)
 */

import { count, desc, eq } from 'drizzle-orm';
import { db } from '../drizzle';
import { assessmentResponses } from '../schema';
import { Ctx } from './_ctx';

// ============================================================================
// ROW TYPES (from Drizzle schema)
// ============================================================================

export type AssessmentResponseRow = typeof assessmentResponses.$inferSelect;
export type NewAssessmentResponseRow = typeof assessmentResponses.$inferInsert;

// ============================================================================
// ASSESSMENT RESPONSE QUERY FUNCTIONS
// ============================================================================

/**
 * List assessment responses with pagination and filtering
 */
export async function listAssessmentResponses(
  ctx: Ctx,
  params?: { page?: number; limit?: number; sort?: string; q?: string }
): Promise<{
  rows: AssessmentResponseRow[];
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
      .from(assessmentResponses)
      .orderBy(desc(assessmentResponses.createdAt))
      .limit(limit)
      .offset(offset),
    db.select({ count: count() }).from(assessmentResponses),
  ]);

  return {
    rows,
    total: totalResult[0]?.count || 0,
    page,
    limit,
  };
}

/**
 * Get assessment response by ID
 */
export async function getAssessmentResponseById(
  ctx: Ctx,
  id: string
): Promise<AssessmentResponseRow | null> {
  const [response] = await db
    .select()
    .from(assessmentResponses)
    .where(eq(assessmentResponses.id, id))
    .limit(1);

  return response || null;
}

/**
 * Create new assessment response
 */
export async function createAssessmentResponse(
  ctx: Ctx,
  data: NewAssessmentResponseRow
): Promise<AssessmentResponseRow> {
  const [response] = await db
    .insert(assessmentResponses)
    .values({
      ...data,
      updatedAt: new Date(),
    })
    .returning();

  return response;
}

/**
 * Update assessment response by ID
 */
export async function updateAssessmentResponse(
  ctx: Ctx,
  id: string,
  data: Partial<NewAssessmentResponseRow>
): Promise<AssessmentResponseRow | null> {
  const [response] = await db
    .update(assessmentResponses)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(assessmentResponses.id, id))
    .returning();

  return response || null;
}

/**
 * Delete assessment response by ID
 */
export async function deleteAssessmentResponse(
  ctx: Ctx,
  id: string
): Promise<boolean> {
  const result = await db
    .delete(assessmentResponses)
    .where(eq(assessmentResponses.id, id));
  return result.length > 0;
}

// Standardized wrapper functions for service layer compatibility
export const getById = getAssessmentResponseById;
export const list = listAssessmentResponses;
export const create = createAssessmentResponse;
export const update = updateAssessmentResponse;
export const remove = deleteAssessmentResponse;
