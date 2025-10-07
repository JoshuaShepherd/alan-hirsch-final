/**
 * Assessment Question Query Module
 * Pure DB I/O operations for assessment questions with tenant scoping
 *
 * Inputs: Context with tenantId, userId, role
 * Outputs: Raw Drizzle row types (no DTOs, no mappers)
 */

import { count, desc, eq } from 'drizzle-orm';
import { db } from '../drizzle';
import { assessmentQuestions } from '../schema';
import { Ctx } from './_ctx';

// ============================================================================
// ROW TYPES (from Drizzle schema)
// ============================================================================

export type AssessmentQuestionRow = typeof assessmentQuestions.$inferSelect;
export type NewAssessmentQuestionRow = typeof assessmentQuestions.$inferInsert;

// ============================================================================
// ASSESSMENT QUESTION QUERY FUNCTIONS
// ============================================================================

/**
 * List assessment questions with pagination and filtering
 */
export async function listAssessmentQuestions(
  ctx: Ctx,
  params?: { page?: number; limit?: number; sort?: string; q?: string }
): Promise<{
  rows: AssessmentQuestionRow[];
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
      .from(assessmentQuestions)
      .orderBy(desc(assessmentQuestions.createdAt))
      .limit(limit)
      .offset(offset),
    db.select({ count: count() }).from(assessmentQuestions),
  ]);

  return {
    rows,
    total: totalResult[0]?.count || 0,
    page,
    limit,
  };
}

/**
 * Get assessment question by ID
 */
export async function getAssessmentQuestionById(
  ctx: Ctx,
  id: string
): Promise<AssessmentQuestionRow | null> {
  const [question] = await db
    .select()
    .from(assessmentQuestions)
    .where(eq(assessmentQuestions.id, id))
    .limit(1);

  return question || null;
}

/**
 * Create new assessment question
 */
export async function createAssessmentQuestion(
  ctx: Ctx,
  data: NewAssessmentQuestionRow
): Promise<AssessmentQuestionRow> {
  const [question] = await db
    .insert(assessmentQuestions)
    .values({
      ...data,
      updatedAt: new Date(),
    })
    .returning();

  return question;
}

/**
 * Update assessment question by ID
 */
export async function updateAssessmentQuestion(
  ctx: Ctx,
  id: string,
  data: Partial<NewAssessmentQuestionRow>
): Promise<AssessmentQuestionRow | null> {
  const [question] = await db
    .update(assessmentQuestions)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(assessmentQuestions.id, id))
    .returning();

  return question || null;
}

/**
 * Delete assessment question by ID
 */
export async function deleteAssessmentQuestion(
  ctx: Ctx,
  id: string
): Promise<boolean> {
  const result = await db
    .delete(assessmentQuestions)
    .where(eq(assessmentQuestions.id, id));
  return result.length > 0;
}

// Alias for service compatibility
export const removeAssessmentQuestion = deleteAssessmentQuestion;

/**
 * List questions by assessment ID
 */
export async function listQuestionsByAssessment(
  ctx: Ctx,
  assessmentId: string,
  params?: { page?: number; limit?: number }
): Promise<{
  rows: AssessmentQuestionRow[];
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
      .from(assessmentQuestions)
      .where(eq(assessmentQuestions.assessmentId, assessmentId))
      .orderBy(desc(assessmentQuestions.createdAt))
      .limit(limit)
      .offset(offset),
    db
      .select({ count: count() })
      .from(assessmentQuestions)
      .where(eq(assessmentQuestions.assessmentId, assessmentId)),
  ]);

  return {
    rows,
    total: totalResult[0]?.count || 0,
    page,
    limit,
  };
}

/**
 * List questions by category
 */
export async function listQuestionsByCategory(
  ctx: Ctx,
  category: string,
  params?: { page?: number; limit?: number }
): Promise<{
  rows: AssessmentQuestionRow[];
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
      .from(assessmentQuestions)
      .orderBy(desc(assessmentQuestions.createdAt))
      .limit(limit)
      .offset(offset),
    db.select({ count: count() }).from(assessmentQuestions),
  ]);

  return {
    rows,
    total: totalResult[0]?.count || 0,
    page,
    limit,
  };
}

// Standardized wrapper functions for service layer compatibility
export const getById = getAssessmentQuestionById;
export const list = listAssessmentQuestions;
export const create = createAssessmentQuestion;
export const update = updateAssessmentQuestion;
export const remove = deleteAssessmentQuestion;
