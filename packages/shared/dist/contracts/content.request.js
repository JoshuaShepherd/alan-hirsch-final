import { z } from 'zod';
// Content Request DTOs - Input validation for API endpoints
// Create Content Item Request
export const createContentItemRequestSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255),
    slug: z
        .string()
        .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
    excerpt: z.string().optional(),
    content: z.string().optional(),
    contentType: z.enum([
        'article',
        'video',
        'podcast',
        'framework',
        'tool',
        'case_study',
        'interview',
        'course_lesson',
    ]),
    format: z
        .enum(['text', 'video', 'audio', 'interactive', 'pdf', 'presentation'])
        .default('text'),
    primaryCategoryId: z.string().uuid().optional(),
    secondaryCategories: z.array(z.string().uuid()).default([]),
    tags: z.array(z.string()).default([]),
    theologicalThemes: z.array(z.string()).default([]),
    seriesId: z.string().uuid().optional(),
    seriesOrder: z.number().int().min(0).default(0),
    visibility: z
        .enum(['public', 'premium', 'vip', 'private', 'organization'])
        .default('public'),
    status: z
        .enum(['draft', 'published', 'archived', 'under_review', 'scheduled'])
        .default('draft'),
    featuredImageUrl: z.string().url().optional(),
    videoUrl: z.string().url().optional(),
    audioUrl: z.string().url().optional(),
    attachments: z
        .array(z.object({
        name: z.string(),
        url: z.string().url(),
        type: z.string(),
        size: z.number(),
    }))
        .default([]),
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
        .default('all_rights_reserved'),
    attributionRequired: z.boolean().default(false),
    publishedAt: z.date().optional(),
    scheduledAt: z.date().optional(),
});
// Update Content Item Request
export const updateContentItemRequestSchema = z
    .object({
    id: z.string().uuid('Invalid content ID'),
})
    .merge(createContentItemRequestSchema.partial().omit({
    slug: true, // Slug shouldn't be updatable
}));
// Content Search Request
export const contentSearchRequestSchema = z.object({
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(20),
    search: z.string().optional(),
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
    status: z
        .enum(['draft', 'published', 'archived', 'under_review', 'scheduled'])
        .default('published'),
    visibility: z
        .enum(['public', 'premium', 'vip', 'private', 'organization'])
        .optional(),
    categoryId: z.string().uuid().optional(),
    authorId: z.string().uuid().optional(),
    tags: z.array(z.string()).optional(),
    theologicalThemes: z.array(z.string()).optional(),
    seriesId: z.string().uuid().optional(),
});
// Create Content Category Request
export const createContentCategoryRequestSchema = z.object({
    name: z.string().min(1, 'Category name is required').max(100),
    slug: z
        .string()
        .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
    description: z.string().optional(),
    parentId: z.string().uuid().optional(),
    orderIndex: z.number().int().min(0).default(0),
    isActive: z.boolean().default(true),
    icon: z.string().optional(),
    color: z.string().optional(),
});
// Update Content Category Request
export const updateContentCategoryRequestSchema = z
    .object({
    id: z.string().uuid('Invalid category ID'),
})
    .merge(createContentCategoryRequestSchema.partial().omit({
    slug: true, // Slug shouldn't be updatable
}));
// Create Content Series Request
export const createContentSeriesRequestSchema = z.object({
    title: z.string().min(1, 'Series title is required').max(255),
    slug: z
        .string()
        .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
    description: z.string().optional(),
    categoryId: z.string().uuid().optional(),
    status: z
        .enum(['draft', 'published', 'archived', 'under_review'])
        .default('draft'),
    featuredImageUrl: z.string().url().optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
});
// Update Content Series Request
export const updateContentSeriesRequestSchema = z
    .object({
    id: z.string().uuid('Invalid series ID'),
})
    .merge(createContentSeriesRequestSchema.partial().omit({
    slug: true, // Slug shouldn't be updatable
}));
//# sourceMappingURL=content.request.js.map