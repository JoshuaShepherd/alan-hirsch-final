import { faker } from '@faker-js/faker';

// Valid fixtures for Assessment schemas
export const validAssessmentCreate = {
  name: faker.lorem.words(3),
  slug: faker.helpers.slugify(faker.lorem.words(2)),
  description: faker.lorem.sentence(),
  assessmentType: 'apest' as const,
  questionsCount: faker.number.int({ min: 5, max: 50 }),
  estimatedDuration: faker.number.int({ min: 10, max: 120 }),
  passingScore: faker.number.int({ min: 60, max: 100 }),
  version: '1.0',
  language: 'en',
  culturalAdaptation: 'universal' as const,
  researchBacked: true,
  validityScore: faker.number.float({ min: 0.7, max: 1.0, fractionDigits: 2 }),
  reliabilityScore: faker.number.float({
    min: 0.7,
    max: 1.0,
    fractionDigits: 2,
  }),
  instructions: faker.lorem.paragraph(),
  scoringMethod: 'likert_5' as const,
  status: 'active' as const,
};

export const validAssessmentUpdate = {
  id: faker.string.uuid(),
  name: faker.lorem.words(3),
  description: faker.lorem.sentence(),
  questionsCount: faker.number.int({ min: 5, max: 50 }),
  status: 'under_review' as const,
};

export const validAssessmentResponse = {
  id: faker.string.uuid(),
  name: faker.lorem.words(3),
  slug: faker.helpers.slugify(faker.lorem.words(2)),
  description: faker.lorem.sentence(),
  assessmentType: 'apest' as const,
  questionsCount: faker.number.int({ min: 5, max: 50 }),
  estimatedDuration: faker.number.int({ min: 10, max: 120 }),
  passingScore: faker.number.int({ min: 60, max: 100 }),
  version: '1.0',
  language: 'en',
  culturalAdaptation: 'universal' as const,
  researchBacked: true,
  validityScore: faker.number.float({ min: 0.7, max: 1.0, fractionDigits: 2 }),
  reliabilityScore: faker.number.float({
    min: 0.7,
    max: 1.0,
    fractionDigits: 2,
  }),
  instructions: faker.lorem.paragraph(),
  scoringMethod: 'likert_5' as const,
  status: 'active' as const,
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
  publishedAt: faker.date.recent().toISOString(),
};

// Invalid fixtures for testing validation failures
export const invalidAssessmentCreate = {
  name: '', // Empty string
  slug: '', // Empty string
  assessmentType: 'invalid_type' as any, // Invalid enum value
  questionsCount: 0, // Below minimum (1)
  estimatedDuration: -5, // Negative number
  passingScore: -10, // Negative number
  validityScore: 1.5, // Above maximum (1.0)
  reliabilityScore: 2.0, // Above maximum (1.0)
  scoringMethod: 'invalid_method' as any, // Invalid enum value
  status: 'invalid_status' as any, // Invalid enum value
  culturalAdaptation: 'invalid_adaptation' as any, // Invalid enum value
};

export const invalidAssessmentResponse = {
  id: 'not-a-uuid',
  name: '',
  slug: '',
  assessmentType: 'invalid_type' as any,
  questionsCount: 'not-a-number' as any,
  createdAt: 'not-a-datetime',
  updatedAt: 'not-a-datetime',
  publishedAt: 'not-a-datetime',
};
