import { z } from "zod";

// Shared enums
export const ContentTypeEnum = z.enum([
  "article",
  "video",
  "podcast",
  "framework",
  "tool",
  "case_study",
  "interview",
  "course_lesson",
]);

export const ContentFormatEnum = z.enum([
  "text",
  "video",
  "audio",
  "interactive",
  "pdf",
  "presentation",
]);

export const ContentVisibilityEnum = z.enum([
  "public",
  "premium",
  "vip",
  "private",
  "organization",
  "invite_only",
]);

export const ContentStatusEnum = z.enum([
  "draft",
  "published",
  "archived",
  "under_review",
  "scheduled",
]);

export const LicenseTypeEnum = z.enum([
  "all_rights_reserved",
  "creative_commons",
  "public_domain",
  "fair_use",
]);

// Ingress (Create/Update DTOs)
export const ContentItemCreateSchema = z.object({
  title: z.string(),
  slug: z.string(),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  authorId: z.string().uuid(),
  coAuthors: z.array(z.string()).default([]),
  contentType: ContentTypeEnum,
  format: ContentFormatEnum.default("text"),
  wordCount: z.number().int().min(0).optional(),
  estimatedReadingTime: z.number().int().min(0).optional(),
  primaryCategoryId: z.string().uuid().optional(),
  secondaryCategories: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  theologicalThemes: z.array(z.string()).default([]),
  seriesId: z.string().uuid().optional(),
  seriesOrder: z.number().int().min(0).optional(),
  visibility: ContentVisibilityEnum.default("public"),
  status: ContentStatusEnum.default("draft"),
  networkAmplificationScore: z.number().min(0).max(10).default(0.0),
  crossReferenceCount: z.number().int().min(0).default(0),
  aiEnhanced: z.boolean().default(false),
  aiSummary: z.string().optional(),
  aiKeyPoints: z.array(z.string()).default([]),
  featuredImageUrl: z.string().url().optional(),
  videoUrl: z.string().url().optional(),
  audioUrl: z.string().url().optional(),
  attachments: z.array(z.object({
    name: z.string(),
    url: z.string(),
    type: z.string(),
    size: z.number(),
  })).default([]),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  canonicalUrl: z.string().url().optional(),
  originalSource: z.string().optional(),
  licenseType: LicenseTypeEnum.default("all_rights_reserved"),
  attributionRequired: z.boolean().default(true),
});

export const ContentItemUpdateSchema = z.object({
  id: z.string().uuid(),
  title: z.string().optional(),
  slug: z.string().optional(),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  authorId: z.string().uuid().optional(),
  coAuthors: z.array(z.string()).optional(),
  contentType: ContentTypeEnum.optional(),
  format: ContentFormatEnum.optional(),
  wordCount: z.number().int().min(0).optional(),
  estimatedReadingTime: z.number().int().min(0).optional(),
  primaryCategoryId: z.string().uuid().optional(),
  secondaryCategories: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  theologicalThemes: z.array(z.string()).optional(),
  seriesId: z.string().uuid().optional(),
  seriesOrder: z.number().int().min(0).optional(),
  visibility: ContentVisibilityEnum.optional(),
  status: ContentStatusEnum.optional(),
  networkAmplificationScore: z.number().min(0).max(10).optional(),
  crossReferenceCount: z.number().int().min(0).optional(),
  aiEnhanced: z.boolean().optional(),
  aiSummary: z.string().optional(),
  aiKeyPoints: z.array(z.string()).optional(),
  featuredImageUrl: z.string().url().optional(),
  videoUrl: z.string().url().optional(),
  audioUrl: z.string().url().optional(),
  attachments: z.array(z.object({
    name: z.string(),
    url: z.string(),
    type: z.string(),
    size: z.number(),
  })).optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  canonicalUrl: z.string().url().optional(),
  originalSource: z.string().optional(),
  licenseType: LicenseTypeEnum.optional(),
  attributionRequired: z.boolean().optional(),
});

// Egress (API Response DTO)
export const ContentItemResponseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string().nullable(),
  content: z.string().nullable(),
  authorId: z.string().uuid(),
  coAuthors: z.array(z.string()),
  contentType: ContentTypeEnum,
  format: ContentFormatEnum,
  wordCount: z.number().int().nullable(),
  estimatedReadingTime: z.number().int().nullable(),
  viewCount: z.number().int(),
  likeCount: z.number().int(),
  shareCount: z.number().int(),
  commentCount: z.number().int(),
  bookmarkCount: z.number().int(),
  primaryCategoryId: z.string().uuid().nullable(),
  secondaryCategories: z.array(z.string()),
  tags: z.array(z.string()),
  theologicalThemes: z.array(z.string()),
  seriesId: z.string().uuid().nullable(),
  seriesOrder: z.number().int().nullable(),
  visibility: ContentVisibilityEnum,
  status: ContentStatusEnum,
  networkAmplificationScore: z.number(),
  crossReferenceCount: z.number().int(),
  aiEnhanced: z.boolean(),
  aiSummary: z.string().nullable(),
  aiKeyPoints: z.array(z.string()),
  featuredImageUrl: z.string().nullable(),
  videoUrl: z.string().nullable(),
  audioUrl: z.string().nullable(),
  attachments: z.array(z.object({
    name: z.string(),
    url: z.string(),
    type: z.string(),
    size: z.number(),
  })),
  metaTitle: z.string().nullable(),
  metaDescription: z.string().nullable(),
  canonicalUrl: z.string().nullable(),
  originalSource: z.string().nullable(),
  licenseType: LicenseTypeEnum,
  attributionRequired: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  publishedAt: z.string().datetime().nullable(),
  scheduledAt: z.string().datetime().nullable(),
});

// List envelope (standardized)
export const ContentItemListResponseSchema = z.object({
  data: z.array(ContentItemResponseSchema),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
});

// Types
export type ContentItemCreate = z.infer<typeof ContentItemCreateSchema>;
export type ContentItemUpdate = z.infer<typeof ContentItemUpdateSchema>;
export type ContentItemResponse = z.infer<typeof ContentItemResponseSchema>;
export type ContentItemListResponse = z.infer<typeof ContentItemListResponseSchema>;

