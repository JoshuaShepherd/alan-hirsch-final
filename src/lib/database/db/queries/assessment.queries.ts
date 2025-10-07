/**
 * Assessment Query Module
 * Complete implementation with proper schema types and CRUD operations
 */

import { and, asc, count, desc, eq, like, or } from 'drizzle-orm';
import { db } from '../drizzle';
import { assessmentQuestions, assessments } from '../schema';

import type { Ctx } from './_ctx';

export type AssessmentRow = typeof assessments.$inferSelect;
export type NewAssessmentRow = typeof assessments.$inferInsert;

export type AssessmentListResult = {
  rows: AssessmentRow[];
  total: number;
  page: number;
  limit: number;
};

// CRUD implementations
export async function getAssessmentById(
  ctx: Ctx,
  id: string
): Promise<AssessmentRow | null> {
  const [assessment] = await db
    .select()
    .from(assessments)
    .where(eq(assessments.id, id))
    .limit(1);

  return assessment || null;
}

export async function createAssessment(
  ctx: Ctx,
  data: NewAssessmentRow
): Promise<AssessmentRow> {
  const [assessment] = await db
    .insert(assessments)
    .values({
      ...data,
      updatedAt: new Date(),
    })
    .returning();

  return assessment;
}

export async function updateAssessment(
  ctx: Ctx,
  id: string,
  data: Partial<NewAssessmentRow>
): Promise<AssessmentRow | null> {
  const [assessment] = await db
    .update(assessments)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(assessments.id, id))
    .returning();

  return assessment || null;
}

export async function deleteAssessment(ctx: Ctx, id: string): Promise<boolean> {
  const result = await db.delete(assessments).where(eq(assessments.id, id));

  return result.length > 0;
}

// Alias for service compatibility
export const removeAssessment = deleteAssessment;

export async function listAssessments(
  ctx: Ctx,
  filters?: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    assessmentType?: string;
    status?: string;
  }
): Promise<AssessmentListResult> {
  const page = filters?.page || 1;
  const limit = filters?.limit || 10;
  const offset = (page - 1) * limit;

  // Build where condition
  const conditions = [];

  if (filters?.search) {
    conditions.push(
      or(
        like(assessments.name, `%${filters.search}%`),
        like(assessments.description, `%${filters.search}%`)
      )
    );
  }

  if (filters?.assessmentType) {
    conditions.push(
      eq(assessments.assessmentType, filters.assessmentType as any)
    );
  }

  if (filters?.status) {
    conditions.push(eq(assessments.status, filters.status as any));
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
    orderByCondition = sortOrder(assessments.createdAt);
  } else if (sortBy === 'updatedAt') {
    orderByCondition = sortOrder(assessments.updatedAt);
  } else if (sortBy === 'name') {
    orderByCondition = sortOrder(assessments.name);
  } else if (sortBy === 'publishedAt') {
    orderByCondition = sortOrder(assessments.publishedAt);
  } else {
    orderByCondition = sortOrder(assessments.createdAt);
  }

  // Execute queries
  const [rows, totalResult] = await Promise.all([
    db
      .select()
      .from(assessments)
      .where(whereCondition)
      .orderBy(orderByCondition)
      .limit(limit)
      .offset(offset),
    db.select({ count: count() }).from(assessments).where(whereCondition),
  ]);

  return {
    rows,
    total: totalResult[0]?.count || 0,
    page,
    limit,
  };
}

// Additional utility functions
export async function getAssessmentBySlug(
  ctx: Ctx,
  slug: string
): Promise<AssessmentRow | null> {
  const [assessment] = await db
    .select()
    .from(assessments)
    .where(eq(assessments.slug, slug))
    .limit(1);

  return assessment || null;
}

export async function getQuestions(
  ctx: Ctx,
  assessmentId: string
): Promise<(typeof assessmentQuestions.$inferSelect)[]> {
  const questions = await db
    .select()
    .from(assessmentQuestions)
    .where(eq(assessmentQuestions.assessmentId, assessmentId))
    .orderBy(asc(assessmentQuestions.orderIndex));

  return questions;
}

// Standardized wrapper functions for service layer compatibility
export const getById = getAssessmentById;
export const list = listAssessments;
export const create = createAssessment;
export const update = updateAssessment;
export const remove = deleteAssessment;
