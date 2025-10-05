import { toContentCategoryResponseDTO } from '@/lib/mappers/content';
import { contentCategories, hasResults, isDefined } from '@platform/database';
import {
  createApiRoute,
  createPaginatedApiRoute,
  paginationInputSchema,
} from '@platform/shared/api/utils';
import {
  contentCategoryResponseSchema,
  newContentCategorySchema,
  paginatedContentCategoryListResponseSchema,
} from '@platform/shared/contracts';
import { and, desc, eq, like, or, sql } from 'drizzle-orm';
import { z } from 'zod';

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
  paginatedContentCategoryListResponseSchema,
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

    const mappedCategories = categories.map(toContentCategoryResponseDTO);
    const total = countResult[0]?.count ?? 0;

    return {
      items: mappedCategories,
      pagination: {
        page: page || 1,
        limit: limit || 20,
        total,
        totalPages: Math.ceil(total / (limit || 20)),
        hasNext: (page || 1) < Math.ceil(total / (limit || 20)),
        hasPrev: (page || 1) > 1,
      },
      success: true,
    };
  }
);

// POST /api/content/categories - Create new content category
export const POST = createApiRoute(
  newContentCategorySchema,
  contentCategoryResponseSchema,
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
    if (!hasResults(insertedCategories)) {
      throw new Error('Failed to create content category');
    }

    const newCategory = insertedCategories[0];
    if (!isDefined(newCategory)) {
      throw new Error('Failed to create content category');
    }

    return toContentCategoryResponseDTO(newCategory);
  }
);
