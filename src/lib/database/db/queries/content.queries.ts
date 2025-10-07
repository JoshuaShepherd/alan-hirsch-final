/**
 * Content Query Module
 * Complete implementation with proper schema types and CRUD operations
 */

import { and, asc, count, desc, eq, like, or } from 'drizzle-orm';
import { db } from '../drizzle';
import { contentItems } from '../schema';

import type { Ctx } from './_ctx';

export type ContentRow = typeof contentItems.$inferSelect;
export type NewContentRow = typeof contentItems.$inferInsert;

export type ContentListResult = {
  rows: ContentRow[];
  total: number;
  page: number;
  limit: number;
};

// CRUD implementations
export async function getContentById(
  ctx: Ctx,
  id: string
): Promise<ContentRow | null> {
  const [content] = await db
    .select()
    .from(contentItems)
    .where(eq(contentItems.id, id))
    .limit(1);

  return content || null;
}

export async function createContent(
  ctx: Ctx,
  data: NewContentRow
): Promise<ContentRow> {
  const [content] = await db
    .insert(contentItems)
    .values({
      ...data,
      updatedAt: new Date(),
    })
    .returning();

  return content;
}

export async function updateContent(
  ctx: Ctx,
  id: string,
  data: Partial<NewContentRow>
): Promise<ContentRow | null> {
  const [content] = await db
    .update(contentItems)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(contentItems.id, id))
    .returning();

  return content || null;
}

export async function deleteContent(ctx: Ctx, id: string): Promise<boolean> {
  const result = await db.delete(contentItems).where(eq(contentItems.id, id));

  return result.length > 0;
}

export async function listContents(
  ctx: Ctx,
  filters?: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    contentType?: string;
    status?: string;
    authorId?: string;
    seriesId?: string;
    categoryId?: string;
  }
): Promise<ContentListResult> {
  const page = filters?.page || 1;
  const limit = filters?.limit || 10;
  const offset = (page - 1) * limit;

  // Build where condition
  const conditions = [];

  if (filters?.search) {
    conditions.push(
      or(
        like(contentItems.title, `%${filters.search}%`),
        like(contentItems.excerpt, `%${filters.search}%`),
        like(contentItems.content, `%${filters.search}%`)
      )
    );
  }

  if (filters?.contentType) {
    conditions.push(eq(contentItems.contentType, filters.contentType as any));
  }

  if (filters?.status) {
    conditions.push(eq(contentItems.status, filters.status as any));
  }

  if (filters?.authorId) {
    conditions.push(eq(contentItems.authorId, filters.authorId));
  }

  if (filters?.seriesId) {
    conditions.push(eq(contentItems.seriesId, filters.seriesId));
  }

  if (filters?.categoryId) {
    conditions.push(eq(contentItems.primaryCategoryId, filters.categoryId));
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
    orderByCondition = sortOrder(contentItems.createdAt);
  } else if (sortBy === 'updatedAt') {
    orderByCondition = sortOrder(contentItems.updatedAt);
  } else if (sortBy === 'title') {
    orderByCondition = sortOrder(contentItems.title);
  } else if (sortBy === 'publishedAt') {
    orderByCondition = sortOrder(contentItems.publishedAt);
  } else if (sortBy === 'viewCount') {
    orderByCondition = sortOrder(contentItems.viewCount);
  } else {
    orderByCondition = sortOrder(contentItems.createdAt);
  }

  // Execute queries
  const [rows, totalResult] = await Promise.all([
    db
      .select()
      .from(contentItems)
      .where(whereCondition)
      .orderBy(orderByCondition)
      .limit(limit)
      .offset(offset),
    db.select({ count: count() }).from(contentItems).where(whereCondition),
  ]);

  return {
    rows,
    total: totalResult[0]?.count || 0,
    page,
    limit,
  };
}

// Additional methods needed by content service
export async function removeContent(ctx: Ctx, id: string): Promise<boolean> {
  return deleteContent(ctx, id);
}

export async function getContentBySlug(
  ctx: Ctx,
  slug: string
): Promise<ContentRow | null> {
  const [content] = await db
    .select()
    .from(contentItems)
    .where(eq(contentItems.slug, slug))
    .limit(1);

  return content || null;
}

export async function listContentBySeries(
  ctx: Ctx,
  seriesId: string,
  params?: { page?: number; limit?: number }
): Promise<{ rows: ContentRow[]; total: number; page: number; limit: number }> {
  const page = params?.page || 1;
  const limit = params?.limit || 10;
  const offset = (page - 1) * limit;

  // Execute queries
  const [rows, totalResult] = await Promise.all([
    db
      .select()
      .from(contentItems)
      .where(eq(contentItems.seriesId, seriesId))
      .orderBy(asc(contentItems.seriesOrder), asc(contentItems.createdAt))
      .limit(limit)
      .offset(offset),
    db
      .select({ count: count() })
      .from(contentItems)
      .where(eq(contentItems.seriesId, seriesId)),
  ]);

  return {
    rows,
    total: totalResult[0]?.count || 0,
    page,
    limit,
  };
}

// Standardized wrapper functions for service layer compatibility
export const getById = getContentById;
export const list = listContents;
export const create = createContent;
export const update = updateContent;
export const remove = deleteContent;
