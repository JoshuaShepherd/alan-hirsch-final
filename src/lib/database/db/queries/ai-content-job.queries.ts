/**
 * AI Content Job Query Module
 * Pure DB I/O operations for AI content jobs with tenant scoping
 *
 * Inputs: Context with tenantId, userId, role
 * Outputs: Raw Drizzle row types (no DTOs, no mappers)
 */

import { count, desc, eq } from 'drizzle-orm';
import { db } from '../drizzle';
import { aiContentJobs } from '../schema';
import { Ctx } from './_ctx';

// ============================================================================
// ROW TYPES (from Drizzle schema)
// ============================================================================

export type AiContentJobRow = typeof aiContentJobs.$inferSelect;
export type NewAiContentJobRow = typeof aiContentJobs.$inferInsert;

// ============================================================================
// AI CONTENT JOB QUERY FUNCTIONS
// ============================================================================

/**
 * List AI content jobs with pagination and filtering
 */
export async function listAiContentJobs(
  ctx: Ctx,
  params?: { page?: number; limit?: number; sort?: string; q?: string }
): Promise<{
  rows: AiContentJobRow[];
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
      .from(aiContentJobs)
      .orderBy(desc(aiContentJobs.createdAt))
      .limit(limit)
      .offset(offset),
    db.select({ count: count() }).from(aiContentJobs),
  ]);

  return {
    rows,
    total: totalResult[0]?.count || 0,
    page,
    limit,
  };
}

/**
 * Get AI content job by ID
 */
export async function getAiContentJobById(
  ctx: Ctx,
  id: string
): Promise<AiContentJobRow | null> {
  const [job] = await db
    .select()
    .from(aiContentJobs)
    .where(eq(aiContentJobs.id, id))
    .limit(1);

  return job || null;
}

/**
 * Create new AI content job
 */
export async function createAiContentJob(
  ctx: Ctx,
  data: NewAiContentJobRow
): Promise<AiContentJobRow> {
  const [job] = await db
    .insert(aiContentJobs)
    .values({
      ...data,
      updatedAt: new Date(),
    })
    .returning();

  return job;
}

/**
 * Update AI content job by ID
 */
export async function updateAiContentJob(
  ctx: Ctx,
  id: string,
  data: Partial<NewAiContentJobRow>
): Promise<AiContentJobRow | null> {
  const [job] = await db
    .update(aiContentJobs)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(aiContentJobs.id, id))
    .returning();

  return job || null;
}

/**
 * Delete AI content job by ID
 */
export async function deleteAiContentJob(
  ctx: Ctx,
  id: string
): Promise<boolean> {
  const result = await db.delete(aiContentJobs).where(eq(aiContentJobs.id, id));
  return result.length > 0;
}

// Standardized wrapper functions for service layer compatibility
export const getById = getAiContentJobById;
export const list = listAiContentJobs;
export const create = createAiContentJob;
export const update = updateAiContentJob;
export const remove = deleteAiContentJob;
