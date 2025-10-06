/**
 * Centralized Test Data Factory
 *
 * This factory provides consistent test data creation across all test files,
 * ensuring data consistency and reducing duplication.
 */

import { faker } from '@faker-js/faker';

export class TestDataFactory {
  /**
   * Create a test user with realistic data
   */
  static createUser(overrides: Partial<any> = {}) {
    return {
      id: faker.string.uuid(),
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      ministryRole: faker.helpers.arrayElement([
        'senior_pastor',
        'associate_pastor',
        'youth_pastor',
        'worship_leader',
        'small_group_leader',
        'volunteer',
      ]),
      denomination: faker.helpers.arrayElement([
        'Baptist',
        'Methodist',
        'Presbyterian',
        'Lutheran',
        'Episcopal',
        'Non-denominational',
      ]),
      churchSize: faker.helpers.arrayElement([
        'small',
        'medium',
        'large',
        'mega',
      ]),
      experience: faker.number.int({ min: 0, max: 50 }),
      accountStatus: 'active',
      privacySettings: {
        publicProfile: faker.datatype.boolean(),
        shareData: faker.datatype.boolean(),
      },
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      lastActiveAt: faker.date.recent(),
      ...overrides,
    };
  }

  /**
   * Create a test organization with realistic data
   */
  static createOrganization(overrides: Partial<any> = {}) {
    return {
      id: faker.string.uuid(),
      name: faker.company.name(),
      slug: faker.helpers.slugify(faker.company.name()).toLowerCase(),
      description: faker.lorem.paragraph(),
      website: faker.internet.url(),
      logoUrl: faker.image.url(),
      status: 'active',
      accountOwnerId: faker.string.uuid(),
      settings: {
        allowPublicRegistration: faker.datatype.boolean(),
        requireApproval: faker.datatype.boolean(),
      },
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      ...overrides,
    };
  }

  /**
   * Create a test assessment with realistic data
   */
  static createAssessment(overrides: Partial<any> = {}) {
    return {
      id: faker.string.uuid(),
      name: faker.lorem.words(3),
      slug: faker.helpers.slugify(faker.lorem.words(3)).toLowerCase(),
      description: faker.lorem.paragraph(),
      assessmentType: faker.helpers.arrayElement([
        'apest',
        'spiritual_gifts',
        'personality',
      ]),
      status: faker.helpers.arrayElement(['active', 'inactive', 'draft']),
      questionsCount: faker.number.int({ min: 5, max: 50 }),
      researchBacked: faker.datatype.boolean(),
      estimatedTimeMinutes: faker.number.int({ min: 10, max: 60 }),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      ...overrides,
    };
  }

  /**
   * Create a test assessment question
   */
  static createAssessmentQuestion(overrides: Partial<any> = {}) {
    return {
      id: faker.string.uuid(),
      assessmentId: faker.string.uuid(),
      questionText: faker.lorem.sentence(),
      orderIndex: faker.number.int({ min: 1, max: 100 }),
      questionType: faker.helpers.arrayElement([
        'multiple_choice',
        'single_choice',
        'text',
        'rating',
        'boolean',
      ]),
      options: faker.helpers.arrayElements(
        ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree'],
        { min: 2, max: 5 }
      ),
      required: faker.datatype.boolean(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      ...overrides,
    };
  }

  /**
   * Create a test content item
   */
  static createContentItem(overrides: Partial<any> = {}) {
    return {
      id: faker.string.uuid(),
      title: faker.lorem.sentence(),
      slug: faker.helpers.slugify(faker.lorem.sentence()).toLowerCase(),
      content: faker.lorem.paragraphs(3),
      excerpt: faker.lorem.sentence(),
      status: faker.helpers.arrayElement(['draft', 'published', 'archived']),
      visibility: faker.helpers.arrayElement([
        'public',
        'private',
        'organization',
      ]),
      contentType: faker.helpers.arrayElement([
        'article',
        'video',
        'podcast',
        'ebook',
      ]),
      authorId: faker.string.uuid(),
      categoryId: faker.string.uuid(),
      tags: faker.helpers.arrayElements(
        [
          'leadership',
          'ministry',
          'spiritual_growth',
          'church_management',
          'outreach',
        ],
        { min: 1, max: 3 }
      ),
      featuredImageUrl: faker.image.url(),
      readingTimeMinutes: faker.number.int({ min: 1, max: 30 }),
      viewCount: faker.number.int({ min: 0, max: 10000 }),
      publishedAt: faker.date.past(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      ...overrides,
    };
  }

  /**
   * Create a test community
   */
  static createCommunity(overrides: Partial<any> = {}) {
    return {
      id: faker.string.uuid(),
      name: faker.lorem.words(2),
      slug: faker.helpers.slugify(faker.lorem.words(2)).toLowerCase(),
      description: faker.lorem.paragraph(),
      visibility: faker.helpers.arrayElement(['public', 'private']),
      createdBy: faker.string.uuid(),
      memberCount: faker.number.int({ min: 0, max: 1000 }),
      isActive: faker.datatype.boolean(),
      settings: {
        allowMemberPosts: faker.datatype.boolean(),
        requireApproval: faker.datatype.boolean(),
        moderationLevel: faker.helpers.arrayElement(['low', 'medium', 'high']),
      },
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      ...overrides,
    };
  }

  /**
   * Create a test subscription plan
   */
  static createSubscriptionPlan(overrides: Partial<any> = {}) {
    return {
      id: faker.string.uuid(),
      name: faker.helpers.arrayElement(['Basic', 'Premium', 'Enterprise']),
      slug: faker.helpers
        .slugify(faker.helpers.arrayElement(['Basic', 'Premium', 'Enterprise']))
        .toLowerCase(),
      description: faker.lorem.paragraph(),
      price: faker.number.int({ min: 0, max: 1000 }),
      currency: 'USD',
      interval: faker.helpers.arrayElement(['month', 'year']),
      features: faker.helpers.arrayElements(
        [
          'unlimited_assessments',
          'advanced_analytics',
          'priority_support',
          'custom_branding',
          'api_access',
        ],
        { min: 1, max: 5 }
      ),
      isActive: faker.datatype.boolean(),
      maxUsers: faker.number.int({ min: 1, max: 1000 }),
      contentAccessLevel: faker.helpers.arrayElement([
        'basic',
        'premium',
        'vip',
      ]),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      ...overrides,
    };
  }

  /**
   * Create a test user assessment
   */
  static createUserAssessment(overrides: Partial<any> = {}) {
    return {
      id: faker.string.uuid(),
      userId: faker.string.uuid(),
      assessmentId: faker.string.uuid(),
      status: faker.helpers.arrayElement([
        'in_progress',
        'completed',
        'abandoned',
      ]),
      score: faker.number.int({ min: 0, max: 100 }),
      completedAt: faker.date.recent(),
      timeSpentMinutes: faker.number.int({ min: 5, max: 60 }),
      responses: faker.number.int({ min: 0, max: 50 }),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      ...overrides,
    };
  }

  /**
   * Create a test assessment response
   */
  static createAssessmentResponse(overrides: Partial<any> = {}) {
    return {
      id: faker.string.uuid(),
      userAssessmentId: faker.string.uuid(),
      questionId: faker.string.uuid(),
      responseValue: faker.helpers.arrayElement([
        'Strongly Agree',
        'Agree',
        'Neutral',
        'Disagree',
        'Strongly Disagree',
      ]),
      responseText: faker.lorem.sentence(),
      responseNumber: faker.number.int({ min: 1, max: 5 }),
      timeSpentSeconds: faker.number.int({ min: 5, max: 300 }),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      ...overrides,
    };
  }

  /**
   * Create a test organization membership
   */
  static createOrganizationMembership(overrides: Partial<any> = {}) {
    return {
      id: faker.string.uuid(),
      userId: faker.string.uuid(),
      organizationId: faker.string.uuid(),
      role: faker.helpers.arrayElement(['member', 'admin', 'owner']),
      status: faker.helpers.arrayElement(['active', 'pending', 'inactive']),
      joinedAt: faker.date.past(),
      invitedBy: faker.string.uuid(),
      permissions: {
        canManageUsers: faker.datatype.boolean(),
        canManageContent: faker.datatype.boolean(),
        canViewAnalytics: faker.datatype.boolean(),
      },
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      ...overrides,
    };
  }

  /**
   * Create a test content category
   */
  static createContentCategory(overrides: Partial<any> = {}) {
    return {
      id: faker.string.uuid(),
      name: faker.lorem.word(),
      slug: faker.helpers.slugify(faker.lorem.word()).toLowerCase(),
      description: faker.lorem.sentence(),
      parentId: null,
      orderIndex: faker.number.int({ min: 1, max: 100 }),
      isActive: faker.datatype.boolean(),
      contentCount: faker.number.int({ min: 0, max: 100 }),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      ...overrides,
    };
  }

  /**
   * Create a test user subscription
   */
  static createUserSubscription(overrides: Partial<any> = {}) {
    return {
      id: faker.string.uuid(),
      userId: faker.string.uuid(),
      planId: faker.string.uuid(),
      status: faker.helpers.arrayElement([
        'active',
        'canceled',
        'past_due',
        'trialing',
      ]),
      currentPeriodStart: faker.date.past(),
      currentPeriodEnd: faker.date.future(),
      cancelAtPeriodEnd: faker.datatype.boolean(),
      stripeSubscriptionId: faker.string.alphanumeric(20),
      stripeCustomerId: faker.string.alphanumeric(20),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      ...overrides,
    };
  }

  /**
   * Create multiple test records of the same type
   */
  static createMany<T>(factory: () => T, count: number): T[] {
    return Array.from({ length: count }, factory);
  }

  /**
   * Create a test request object
   */
  static createRequest(overrides: Partial<any> = {}) {
    return {
      method: faker.helpers.arrayElement(['GET', 'POST', 'PUT', 'DELETE']),
      url: faker.internet.url(),
      headers: {
        'content-type': 'application/json',
        'user-agent': faker.internet.userAgent(),
        ...overrides.headers,
      },
      body: overrides.body || null,
      query: overrides.query || {},
      params: overrides.params || {},
      ...overrides,
    };
  }

  /**
   * Create a test response object
   */
  static createResponse(overrides: Partial<any> = {}) {
    return {
      status: faker.number.int({ min: 200, max: 599 }),
      headers: {
        'content-type': 'application/json',
        ...overrides.headers,
      },
      body: overrides.body || null,
      ...overrides,
    };
  }
}

// Export individual factory methods for convenience
export const {
  createUser,
  createOrganization,
  createAssessment,
  createAssessmentQuestion,
  createContentItem,
  createCommunity,
  createSubscriptionPlan,
  createUserAssessment,
  createAssessmentResponse,
  createOrganizationMembership,
  createContentCategory,
  createUserSubscription,
  createMany,
  createRequest,
  createResponse,
} = TestDataFactory;
