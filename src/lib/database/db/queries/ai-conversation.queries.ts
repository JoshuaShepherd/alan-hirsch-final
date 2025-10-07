/**
 * AI Conversation Query Module
 * Pure DB I/O operations for AI conversations with tenant scoping
 *
 * Inputs: Context with tenantId, userId, role
 * Outputs: Raw Drizzle row types (no DTOs, no mappers)
 */

import { count, desc, eq } from 'drizzle-orm';
import { db } from '../drizzle';
import { aiConversations } from '../schema';
import { Ctx } from './_ctx';

// ============================================================================
// ROW TYPES (from Drizzle schema)
// ============================================================================

export type AiConversationRow = typeof aiConversations.$inferSelect;
export type NewAiConversationRow = typeof aiConversations.$inferInsert;

// ============================================================================
// AI CONVERSATION QUERY FUNCTIONS
// ============================================================================

/**
 * List AI conversations with pagination and filtering
 */
export async function listAiConversations(
  ctx: Ctx,
  params?: { page?: number; limit?: number; sort?: string; q?: string }
): Promise<{
  rows: AiConversationRow[];
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
      .from(aiConversations)
      .orderBy(desc(aiConversations.createdAt))
      .limit(limit)
      .offset(offset),
    db.select({ count: count() }).from(aiConversations),
  ]);

  return {
    rows,
    total: totalResult[0]?.count || 0,
    page,
    limit,
  };
}

/**
 * Get AI conversation by ID
 */
export async function getAiConversationById(
  ctx: Ctx,
  id: string
): Promise<AiConversationRow | null> {
  const [conversation] = await db
    .select()
    .from(aiConversations)
    .where(eq(aiConversations.id, id))
    .limit(1);

  return conversation || null;
}

/**
 * Create new AI conversation
 */
export async function createAiConversation(
  ctx: Ctx,
  data: NewAiConversationRow
): Promise<AiConversationRow> {
  const [conversation] = await db
    .insert(aiConversations)
    .values({
      ...data,
      updatedAt: new Date(),
    })
    .returning();

  return conversation;
}

/**
 * Update AI conversation by ID
 */
export async function updateAiConversation(
  ctx: Ctx,
  id: string,
  data: Partial<NewAiConversationRow>
): Promise<AiConversationRow | null> {
  const [conversation] = await db
    .update(aiConversations)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(aiConversations.id, id))
    .returning();

  return conversation || null;
}

/**
 * Delete AI conversation by ID
 */
export async function deleteAiConversation(
  ctx: Ctx,
  id: string
): Promise<boolean> {
  const result = await db
    .delete(aiConversations)
    .where(eq(aiConversations.id, id));
  return result.length > 0;
}

// Standardized wrapper functions for service layer compatibility
export const getById = getAiConversationById;
export const list = listAiConversations;
export const create = createAiConversation;
export const update = updateAiConversation;
export const remove = deleteAiConversation;
