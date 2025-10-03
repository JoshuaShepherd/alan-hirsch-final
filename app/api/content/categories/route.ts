import {
  createApiRoute,
  createPaginatedApiRoute,
  paginationInputSchema,
  emptyInputSchema,
} from '@/lib/api/utils';
import {
  contentCategorySchema,
  newContentCategorySchema,
  ContentCategoryRow,
} from '@/lib/contracts';
import { contentCategories } from '@/lib/db/schema';
import { desc, eq, and, like, or, sql } from 'drizzle-orm';
import { z } from 'zod';

// Mapper function to convert Drizzle row to DTO
const mapContentCategoryRow = (row: ContentCategoryRow) =>
  contentCategorySchema.parse(row);

// Response schemas
const categoryResponseSchema = z.object({
  data: contentCategorySchema,
  success: z.boolean(),
});

// Input schema for category search
const categorySearchInputSchema = paginationInputSchema.extend({
  search: z.string().optional(),
  theologicalDiscipline: z
    .enum([
      'systematic',
      'biblical',
      'practical',
      'historical',
      'philosophical',
      'missional',
      'pastoral',
    ])
    .optional(),
  parentId: z.string().uuid().optional(),
  isActive: z.boolean().optional(),
});

// GET /api/content/categories - Get content categories
export const GET = createPaginatedApiRoute(
  categorySearchInputSchema,
  contentCategorySchema,
  async (input, { user, db }) => {
    const { page, limit, search, theologicalDiscipline, parentId, isActive } =
      input;
    const offset = ((page || 1) - 1) * (limit || 20);

    // Build where conditions
    const conditions = [];

    // Add search condition
    if (search) {
      conditions.push(
        or(
          like(contentCategories.name, `%${search}%`),
          like(contentCategories.description, `%${search}%`)
        )!
      );
    }

    // Add filter conditions
    if (theologicalDiscipline) {
      conditions.push(
        eq(contentCategories.theologicalDiscipline, theologicalDiscipline)
      );
    }
    if (parentId) {
      conditions.push(eq(contentCategories.parentId, parentId));
    }
    if (isActive !== undefined) {
      conditions.push(eq(contentCategories.isActive, isActive));
    }

    // Get categories
    const categories = await db
      .select()
      .from(contentCategories)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(contentCategories.createdAt))
      .limit(limit || 20)
      .offset(offset);

    // Get total count
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(contentCategories)
      .where(conditions.length > 0 ? and(...conditions) : undefined);

    return {
      items: categories.map(mapContentCategoryRow),
      total: countResult[0]?.count || 0,
    };
  }
);

// POST /api/content/categories - Create new content category
export const POST = createApiRoute(
  newContentCategorySchema,
  categoryResponseSchema,
  async (input, { user, db }) => {
    const insertedCategories = await db
      .insert(contentCategories)
      .values({
        ...input,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    // Ensure we have a valid category
    if (!insertedCategories || insertedCategories.length === 0) {
      throw new Error('Failed to create content category');
    }

    const newCategory = insertedCategories[0];

    return {
      data: mapContentCategoryRow(newCategory),
      success: true,
    };
  }
);
