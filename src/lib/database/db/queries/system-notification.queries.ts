/**
 * System Notification Query Module
 * Pure DB I/O operations for system notifications with tenant scoping
 *
 * Inputs: Context with tenantId, userId, role
 * Outputs: Raw Drizzle row types (no DTOs, no mappers)
 */

import { systemNotifications } from '../schema';
import { Ctx } from './_ctx';

// ============================================================================
// ROW TYPES (from Drizzle schema)
// ============================================================================

export type SystemNotificationRow = typeof systemNotifications.$inferSelect;
export type NewSystemNotificationRow = typeof systemNotifications.$inferInsert;

// ============================================================================
// SYSTEM NOTIFICATION QUERY FUNCTIONS
// ============================================================================

/**
 * List system notifications with pagination and filtering
 */
export async function listSystemNotifications(
  ctx: Ctx,
  params: { page?: number; limit?: number; filter?: Record<string, unknown> }
): Promise<{
  rows: SystemNotificationRow[];
  total: number;
  page: number;
  limit: number;
}> {
  /* TODO */
  return { rows: [], total: 0, page: 1, limit: 20 };
}

/**
 * Get system notification by ID
 */
export async function getSystemNotificationById(
  ctx: Ctx,
  id: string
): Promise<SystemNotificationRow | null> {
  /* TODO */
  return null;
}

/**
 * Create new system notification
 */
export async function createSystemNotification(
  ctx: Ctx,
  input: NewSystemNotificationRow
): Promise<SystemNotificationRow> {
  /* TODO */
  throw new Error('Not implemented');
}

/**
 * Update system notification by ID
 */
export async function updateSystemNotification(
  ctx: Ctx,
  id: string,
  patch: Partial<SystemNotificationRow>
): Promise<SystemNotificationRow | null> {
  /* TODO */
  return null;
}

/**
 * Delete system notification by ID
 */
export async function deleteSystemNotification(
  ctx: Ctx,
  id: string
): Promise<boolean> {
  /* TODO */
  return false;
}

// Standardized wrapper functions for service layer compatibility
export const getById = getSystemNotificationById;
export const list = listSystemNotifications;
export const create = createSystemNotification;
export const update = updateSystemNotification;
export const remove = deleteSystemNotification;
