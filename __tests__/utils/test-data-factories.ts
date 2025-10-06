/**
 * Test data factories for consistent test data creation
 */
import { faker } from '@faker-js/faker';

export const testDataFactories = {
  user: (overrides = {}) => ({
    id: faker.string.uuid(),
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    displayName: faker.person.fullName(),
    ministryRole: 'pastor',
    organizationName: faker.company.name(),
    accountStatus: 'active',
    onboardingCompleted: true,
    onboardingStep: 5,
    languagePrimary: 'en',
    subscriptionTier: 'free',
    theologicalFocus: ['evangelical', 'reformed'],
    brandColors: {
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#059669',
    },
    emailNotifications: {
      dailyDigest: true,
      collaborationRequests: true,
      revenueReports: true,
      communityUpdates: true,
    },
    privacySettings: {
      publicProfile: true,
      showAssessmentResults: false,
      allowNetworking: true,
      shareAnalytics: false,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    lastActiveAt: new Date(),
    ...overrides,
  }),

  assessment: (overrides = {}) => ({
    id: faker.string.uuid(),
    name: faker.lorem.words(3),
    slug: faker.lorem.slug(),
    description: faker.lorem.paragraph(),
    category: 'spiritual_gifts',
    status: 'published',
    isPublic: true,
    estimatedDuration: 15,
    questionsCount: 20,
    authorId: faker.string.uuid(),
    organizationId: faker.string.uuid(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }),

  organization: (overrides = {}) => ({
    id: faker.string.uuid(),
    name: faker.company.name(),
    slug: faker.lorem.slug(),
    organizationType: 'church',
    accountOwnerId: faker.string.uuid(),
    status: 'active',
    licenseType: 'organization',
    maxUsers: 50,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }),

  content: (overrides = {}) => ({
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    slug: faker.lorem.slug(),
    content: faker.lorem.paragraphs(3),
    contentType: 'article',
    status: 'published',
    authorId: faker.string.uuid(),
    organizationId: faker.string.uuid(),
    tags: ['leadership', 'ministry'],
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }),

  ministryPlatform: (overrides = {}) => ({
    id: faker.string.uuid(),
    name: faker.company.name(),
    slug: faker.lorem.slug(),
    description: faker.lorem.paragraph(),
    platformType: 'church_management',
    status: 'active',
    ownerId: faker.string.uuid(),
    organizationId: faker.string.uuid(),
    features: ['membership', 'giving', 'events'],
    pricing: {
      monthly: 99,
      yearly: 999,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }),
};

export const createTestUser = (overrides = {}) =>
  testDataFactories.user(overrides);
export const createTestAssessment = (overrides = {}) =>
  testDataFactories.assessment(overrides);
export const createTestOrganization = (overrides = {}) =>
  testDataFactories.organization(overrides);
export const createTestContent = (overrides = {}) =>
  testDataFactories.content(overrides);
export const createTestMinistryPlatform = (overrides = {}) =>
  testDataFactories.ministryPlatform(overrides);
