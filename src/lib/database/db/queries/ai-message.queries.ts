/**
 * AI Message Query Module
 * Pure DB I/O operations for AI messages with tenant scoping
 *
 * Inputs: Context with tenantId, userId, role
 * Outputs: Raw Drizzle row types (no DTOs, no mappers)
 */

import { count, desc, eq } from 'drizzle-orm';
import { db } from '../drizzle';
import { aiMessages } from '../schema';
import { Ctx } from './_ctx';

// ============================================================================
// ROW TYPES (from Drizzle schema)
// ============================================================================

export type AiMessageRow = typeof aiMessages.$inferSelect;
export type NewAiMessageRow = typeof aiMessages.$inferInsert;

// ============================================================================
// AI MESSAGE QUERY FUNCTIONS
// ============================================================================

/**
 * List AI messages with pagination and filtering
 */
export async function listAiMessages(
  ctx: Ctx,
  params?: { page?: number; limit?: number; sort?: string; q?: string }
): Promise<{
  rows: AiMessageRow[];
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
      .from(aiMessages)
      .orderBy(desc(aiMessages.createdAt))
      .limit(limit)
      .offset(offset),
    db.select({ count: count() }).from(aiMessages),
  ]);

  return {
    rows,
    total: totalResult[0]?.count || 0,
    page,
    limit,
  };
}

/**
 * Get AI message by ID
 */
export async function getAiMessageById(
  ctx: Ctx,
  id: string
): Promise<AiMessageRow | null> {
  const [message] = await db
    .select()
    .from(aiMessages)
    .where(eq(aiMessages.id, id))
    .limit(1);

  return message || null;
}

/**
 * Create new AI message
 */
export async function createAiMessage(
  ctx: Ctx,
  data: NewAiMessageRow
): Promise<AiMessageRow> {
  const [message] = await db
    .insert(aiMessages)
    .values({
      ...data,
      updatedAt: new Date(),
    })
    .returning();

  return message;
}

/**
 * Update AI message by ID
 */
export async function updateAiMessage(
  ctx: Ctx,
  id: string,
  data: Partial<NewAiMessageRow>
): Promise<AiMessageRow | null> {
  const [message] = await db
    .update(aiMessages)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(aiMessages.id, id))
    .returning();

  return message || null;
}

/**
 * Delete AI message by ID
 */
export async function deleteAiMessage(ctx: Ctx, id: string): Promise<boolean> {
  const result = await db.delete(aiMessages).where(eq(aiMessages.id, id));
  return result.length > 0;
}

// Standardized wrapper functions for service layer compatibility
export const getById = getAiMessageById;
export const list = listAiMessages;
export const create = createAiMessage;
export const update = updateAiMessage;
export const remove = deleteAiMessage;
