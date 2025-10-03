import { createApiRoute, idInputSchema } from '@/lib/api/utils';
import {
  contentItemResponseSchema,
  updateContentItemRequestSchema,
} from '@/lib/contracts';
import { contentItems, userProfiles, contentCategories } from '@/lib/db/schema';
import { toContentItemWithDetailsDTO } from '@/lib/mappers/content';
import { hasResults, isDefined } from '@/lib/db/type-guards';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

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

    if (!hasResults(content)) {
      throw new Error('Content not found');
    }

    const contentData = content[0];
    if (!isDefined(contentData)) {
      throw new Error('Content not found');
    }

    // Increment view count
    await db
      .update(contentItems)
      .set({
        viewCount: (contentData.viewCount ?? 0) + 1,
        updatedAt: new Date(),
      })
      .where(eq(contentItems.id, input.id));

    const mappedContent = toContentItemWithDetailsDTO(contentData);

    return mappedContent;
  }
);

// PUT /api/content/[id] - Update content item
export const PUT = createApiRoute(
  updateContentItemRequestSchema,
  contentItemResponseSchema,
  async (input, { user, db }) => {
    const { id, ...updateData } = input;

    // Check if user has permission to update this content
    const existingContent = await db
      .select()
      .from(contentItems)
      .where(eq(contentItems.id, id))
      .limit(1);

    if (!hasResults(existingContent)) {
      throw new Error('Content not found');
    }

    const existingContentData = existingContent[0];
    if (!isDefined(existingContentData)) {
      throw new Error('Content not found');
    }

    // Only author can update their content
    if (existingContentData.authorId !== user.id) {
      throw new Error('Insufficient permissions');
    }

    const updatedContents = await db
      .update(contentItems)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(contentItems.id, id))
      .returning();

    if (!hasResults(updatedContents)) {
      throw new Error('Failed to update content');
    }

    const updatedContent = updatedContents[0];
    if (!isDefined(updatedContent)) {
      throw new Error('Failed to update content');
    }

    const mappedContent = toContentItemWithDetailsDTO(updatedContent);

    return mappedContent;
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

    if (!hasResults(existingContent)) {
      throw new Error('Content not found');
    }

    const existingContentData = existingContent[0];
    if (!isDefined(existingContentData)) {
      throw new Error('Content not found');
    }

    // Only author can delete their content
    if (existingContentData.authorId !== user.id) {
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
