import { faker } from '@faker-js/faker';

// Valid fixtures for Content Item schemas
export const validContentItemCreate = {
  title: faker.lorem.sentence(),
  slug: faker.helpers.slugify(faker.lorem.words(3)),
  content: faker.lorem.paragraphs(3),
  excerpt: faker.lorem.sentence(),
  contentType: 'article' as const,
  format: 'text' as const,
  visibility: 'public' as const,
  status: 'published' as const,
  featured: false,
  tags: ['missional', 'leadership', 'church-planting'],
  categoryId: faker.string.uuid(),
  authorId: faker.string.uuid(),
  readingTime: faker.number.int({ min: 1, max: 30 }),
  seoTitle: faker.lorem.sentence(),
  seoDescription: faker.lorem.paragraph(),
  featuredImageUrl: faker.image.url(),
  videoUrl: faker.internet.url(),
  audioUrl: faker.internet.url(),
  downloadUrl: faker.internet.url(),
  isPremium: false,
  price: null,
  currency: 'USD',
  publishedAt: faker.date.recent().toISOString(),
  scheduledAt: null,
};

export const validContentItemUpdate = {
  id: faker.string.uuid(),
  title: faker.lorem.sentence(),
  content: faker.lorem.paragraphs(3),
  status: 'draft' as const,
  tags: ['missional', 'apostolic', 'movement'],
};

export const validContentItemResponse = {
  id: faker.string.uuid(),
  title: faker.lorem.sentence(),
  slug: faker.helpers.slugify(faker.lorem.words(3)),
  content: faker.lorem.paragraphs(3),
  excerpt: faker.lorem.sentence(),
  contentType: 'article' as const,
  format: 'text' as const,
  visibility: 'public' as const,
  status: 'published' as const,
  featured: false,
  tags: ['missional', 'leadership', 'church-planting'],
  categoryId: faker.string.uuid(),
  authorId: faker.string.uuid(),
  readingTime: faker.number.int({ min: 1, max: 30 }),
  seoTitle: faker.lorem.sentence(),
  seoDescription: faker.lorem.paragraph(),
  featuredImageUrl: faker.image.url(),
  videoUrl: faker.internet.url(),
  audioUrl: faker.internet.url(),
  downloadUrl: faker.internet.url(),
  isPremium: false,
  price: null,
  currency: 'USD',
  publishedAt: faker.date.recent().toISOString(),
  scheduledAt: null,
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
  viewCount: faker.number.int({ min: 0, max: 10000 }),
  likeCount: faker.number.int({ min: 0, max: 1000 }),
  shareCount: faker.number.int({ min: 0, max: 500 }),
  coAuthors: [],
  wordCount: faker.number.int({ min: 100, max: 5000 }),
  estimatedReadingTime: faker.number.int({ min: 1, max: 30 }),
  commentCount: faker.number.int({ min: 0, max: 100 }),
  bookmarkCount: faker.number.int({ min: 0, max: 50 }),
  primaryCategoryId: faker.string.uuid(),
  secondaryCategories: [],
  theologicalThemes: ['missional', 'apostolic'],
  seriesId: faker.string.uuid(),
  seriesOrder: faker.number.int({ min: 1, max: 10 }),
  networkAmplificationScore: faker.number.int({ min: 0, max: 100 }),
  crossReferenceCount: faker.number.int({ min: 0, max: 20 }),
  aiEnhanced: false,
  aiSummary: faker.lorem.paragraph(),
  aiKeyPoints: [faker.lorem.sentence(), faker.lorem.sentence()],
  attachments: [],
  metaTitle: faker.lorem.sentence(),
  metaDescription: faker.lorem.paragraph(),
  canonicalUrl: faker.internet.url(),
  originalSource: faker.company.name(),
  licenseType: 'all_rights_reserved' as const,
  attributionRequired: true,
};

// Invalid fixtures for testing validation failures
export const invalidContentItemCreate = {
  title: '', // Empty string
  slug: '', // Empty string
  contentType: 'invalid_type' as any, // Invalid enum value
  status: 'invalid_status' as any, // Invalid enum value
  featured: 'not-a-boolean' as any, // Should be boolean
  tags: 'not-an-array' as any, // Should be array
  readingTime: -1, // Negative number
  isPremium: 'not-a-boolean' as any, // Should be boolean
  price: 'not-a-number' as any, // Should be number or null
  currency: 'invalid_currency', // Invalid currency code
  publishedAt: 'not-a-datetime', // Invalid datetime
  scheduledAt: 'not-a-datetime', // Invalid datetime
};

export const invalidContentItemResponse = {
  id: 'not-a-uuid',
  title: '',
  contentType: 'invalid_type' as any,
  status: 'invalid_status' as any,
  createdAt: 'not-a-datetime',
  updatedAt: 'not-a-datetime',
  publishedAt: 'not-a-datetime',
  viewCount: 'not-a-number' as any,
  likeCount: 'not-a-number' as any,
  shareCount: 'not-a-number' as any,
};
