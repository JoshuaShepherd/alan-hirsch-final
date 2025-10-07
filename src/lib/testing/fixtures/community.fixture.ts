import { faker } from '@faker-js/faker';

// Valid fixtures for Community schemas
export const validCommunityCreate = {
  name: faker.lorem.words(2),
  slug: faker.helpers.slugify(faker.lorem.words(2)),
  description: faker.lorem.paragraph(),
  communityType: 'general_discussion' as const,
  geographicFocus: ['North America', 'Europe'],
  culturalContext: 'western',
  languagePrimary: 'en',
  languagesSupported: ['en', 'es'],
  visibility: 'public' as const,
  joinApprovalRequired: false,
  maxMembers: faker.number.int({ min: 10, max: 1000 }),
  allowGuestPosts: true,
  moderationLevel: 'moderated' as const,
  guidelines: faker.lorem.paragraph(),
  rules: ['Be respectful', 'Stay on topic'],
  createdBy: faker.string.uuid(),
};

export const validCommunityUpdate = {
  id: faker.string.uuid(),
  name: faker.lorem.words(2),
  description: faker.lorem.paragraph(),
  visibility: 'private' as const,
};

export const validCommunityResponse = {
  id: faker.string.uuid(),
  name: faker.lorem.words(2),
  slug: faker.helpers.slugify(faker.lorem.words(2)),
  description: faker.lorem.paragraph(),
  communityType: 'general_discussion' as const,
  geographicFocus: ['North America', 'Europe'],
  culturalContext: 'western',
  languagePrimary: 'en',
  languagesSupported: ['en', 'es'],
  visibility: 'public' as const,
  joinApprovalRequired: false,
  maxMembers: faker.number.int({ min: 10, max: 1000 }),
  allowGuestPosts: true,
  moderationLevel: 'moderated' as const,
  guidelines: faker.lorem.paragraph(),
  rules: ['Be respectful', 'Stay on topic'],
  createdBy: faker.string.uuid(),
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
  memberCount: faker.number.int({ min: 0, max: 1000 }),
  postCount: faker.number.int({ min: 0, max: 10000 }),
  currentMemberCount: faker.number.int({ min: 0, max: 1000 }),
  totalPostsCount: faker.number.int({ min: 0, max: 10000 }),
  moderators: [],
  isActive: true,
  status: 'active' as const,
  focus: faker.lorem.sentence(),
};

// Invalid fixtures for testing validation failures
export const invalidCommunityCreate = {
  name: '', // Empty string
  slug: '', // Empty string
  communityType: 'invalid_type' as any, // Invalid enum value
  visibility: 'invalid_visibility' as any, // Invalid enum value
  moderationLevel: 'invalid_level' as any, // Invalid enum value
  joinApprovalRequired: 'not-a-boolean' as any, // Should be boolean
  allowGuestPosts: 'not-a-boolean' as any, // Should be boolean
  maxMembers: -1, // Negative number
  geographicFocus: 'not-an-array' as any, // Should be array
  languagesSupported: 'not-an-array' as any, // Should be array
  rules: 'not-an-array' as any, // Should be array
};

export const invalidCommunityResponse = {
  id: 'not-a-uuid',
  name: '',
  communityType: 'invalid_type' as any,
  visibility: 'invalid_visibility' as any,
  createdAt: 'not-a-datetime',
  updatedAt: 'not-a-datetime',
  memberCount: 'not-a-number' as any,
  postCount: 'not-a-number' as any,
};
