import { createApiRoute, idInputSchema } from '@/lib/api/utils';
import {
  contentItemSchema,
  ContentItemRow,
  contentItemResponseSchema,
} from '@/lib/contracts';
import { contentItems, userProfiles, contentCategories } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

// Mapper function to convert Drizzle row to DTO
const mapContentItemRow = (row: any) => contentItemSchema.parse(row);

// Response schemas are now imported from contracts

// GET /api/content/[id] - Get content item by ID
export const GET = createApiRoute(
  idInputSchema,
  contentItemResponseSchema,
  async (input, { user, db }) => {
    const content = await db
      .select({
        id: contentItems.id,
        title: contentItems.title,
        slug: contentItems.slug,
        excerpt: contentItems.excerpt,
        content: contentItems.content,
        authorId: contentItems.authorId,
        coAuthors: contentItems.coAuthors,
        contentType: contentItems.contentType,
        format: contentItems.format,
        wordCount: contentItems.wordCount,
        estimatedReadingTime: contentItems.estimatedReadingTime,
        viewCount: contentItems.viewCount,
        likeCount: contentItems.likeCount,
        shareCount: contentItems.shareCount,
        commentCount: contentItems.commentCount,
        bookmarkCount: contentItems.bookmarkCount,
        primaryCategoryId: contentItems.primaryCategoryId,
        secondaryCategories: contentItems.secondaryCategories,
        tags: contentItems.tags,
        theologicalThemes: contentItems.theologicalThemes,
        seriesId: contentItems.seriesId,
        seriesOrder: contentItems.seriesOrder,
        visibility: contentItems.visibility,
        status: contentItems.status,
        networkAmplificationScore: contentItems.networkAmplificationScore,
        crossReferenceCount: contentItems.crossReferenceCount,
        aiEnhanced: contentItems.aiEnhanced,
        aiSummary: contentItems.aiSummary,
        aiKeyPoints: contentItems.aiKeyPoints,
        featuredImageUrl: contentItems.featuredImageUrl,
        videoUrl: contentItems.videoUrl,
        audioUrl: contentItems.audioUrl,
        attachments: contentItems.attachments,
        metaTitle: contentItems.metaTitle,
        metaDescription: contentItems.metaDescription,
        canonicalUrl: contentItems.canonicalUrl,
        originalSource: contentItems.originalSource,
        licenseType: contentItems.licenseType,
        attributionRequired: contentItems.attributionRequired,
        createdAt: contentItems.createdAt,
        updatedAt: contentItems.updatedAt,
        publishedAt: contentItems.publishedAt,
        scheduledAt: contentItems.scheduledAt,
        author: {
          id: userProfiles.id,
          firstName: userProfiles.firstName,
          lastName: userProfiles.lastName,
          displayName: userProfiles.displayName,
          avatarUrl: userProfiles.avatarUrl,
        },
        category: {
          id: contentCategories.id,
          name: contentCategories.name,
          slug: contentCategories.slug,
        },
      })
      .from(contentItems)
      .leftJoin(userProfiles, eq(contentItems.authorId, userProfiles.id))
      .leftJoin(
        contentCategories,
        eq(contentItems.primaryCategoryId, contentCategories.id)
      )
      .where(eq(contentItems.id, input.id))
      .limit(1);

    if (!content[0]) {
      throw new Error('Content not found');
    }

    // Increment view count
    await db
      .update(contentItems)
      .set({
        viewCount: (content[0].viewCount || 0) + 1,
        updatedAt: new Date(),
      })
      .where(eq(contentItems.id, input.id));

    const mappedContent = mapContentItemRow(content[0]);

    // Create standardized response
    return {
      data: mappedContent,
      success: true,
    };
  }
);

// PUT /api/content/[id] - Update content item
export const PUT = createApiRoute(
  idInputSchema.extend({
    title: z.string().min(1).optional(),
    excerpt: z.string().optional(),
    content: z.string().optional(),
    contentType: z
      .enum([
        'article',
        'video',
        'podcast',
        'framework',
        'tool',
        'case_study',
        'interview',
        'course_lesson',
      ])
      .optional(),
    format: z
      .enum(['text', 'video', 'audio', 'interactive', 'pdf', 'presentation'])
      .optional(),
    primaryCategoryId: z.string().uuid().optional(),
    secondaryCategories: z.array(z.string().uuid()).optional(),
    tags: z.array(z.string()).optional(),
    theologicalThemes: z.array(z.string()).optional(),
    seriesId: z.string().uuid().optional(),
    seriesOrder: z.number().int().min(0).optional(),
    visibility: z
      .enum(['public', 'premium', 'vip', 'private', 'organization'])
      .optional(),
    status: z
      .enum(['draft', 'published', 'archived', 'under_review', 'scheduled'])
      .optional(),
    featuredImageUrl: z.string().url().optional(),
    videoUrl: z.string().url().optional(),
    audioUrl: z.string().url().optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    canonicalUrl: z.string().url().optional(),
    originalSource: z.string().optional(),
    licenseType: z
      .enum([
        'all_rights_reserved',
        'creative_commons',
        'public_domain',
        'fair_use',
      ])
      .optional(),
    attributionRequired: z.boolean().optional(),
    publishedAt: z.date().optional(),
    scheduledAt: z.date().optional(),
  }),
  contentItemResponseSchema,
  async (input, { user, db }) => {
    const { id, ...updateData } = input;

    // Check if user has permission to update this content
    const existingContent = await db
      .select()
      .from(contentItems)
      .where(eq(contentItems.id, id))
      .limit(1);

    if (!existingContent[0]) {
      throw new Error('Content not found');
    }

    // Only author can update their content
    if (existingContent[0].authorId !== user.id) {
      throw new Error('Insufficient permissions');
    }

    const [updatedContent] = await db
      .update(contentItems)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(contentItems.id, id))
      .returning();

    const mappedContent = mapContentItemRow(updatedContent);

    // Create standardized response
    return {
      data: mappedContent,
      success: true,
    };
  }
);

// DELETE /api/content/[id] - Delete content item
export const DELETE = createApiRoute(
  idInputSchema,
  z.object({
    success: z.boolean(),
    message: z.string(),
  }),
  async (input, { user, db }) => {
    // Check if user has permission to delete this content
    const existingContent = await db
      .select()
      .from(contentItems)
      .where(eq(contentItems.id, input.id))
      .limit(1);

    if (!existingContent[0]) {
      throw new Error('Content not found');
    }

    // Only author can delete their content
    if (existingContent[0].authorId !== user.id) {
      throw new Error('Insufficient permissions');
    }

    // Delete content
    await db.delete(contentItems).where(eq(contentItems.id, input.id));

    return {
      success: true,
      message: 'Content deleted successfully',
    };
  }
);
