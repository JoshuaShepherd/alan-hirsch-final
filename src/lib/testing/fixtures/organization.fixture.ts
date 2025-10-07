import { faker } from '@faker-js/faker';

// Valid fixtures for Organization schemas
export const validOrganizationCreate = {
  name: faker.company.name(),
  slug: faker.helpers.slugify(faker.company.name()),
  description: faker.lorem.paragraph(),
  website: faker.internet.url(),
  logoUrl: faker.image.url(),
  organizationType: 'church' as const,
  sizeCategory: 'small' as const,
  contactEmail: faker.internet.email(),
  contactPhone: faker.phone.number(),
  address: {
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    postalCode: faker.location.zipCode(),
    country: faker.location.country(),
  },
};

export const validOrganizationUpdate = {
  id: faker.string.uuid(),
  name: faker.company.name(),
  description: faker.lorem.paragraph(),
  website: faker.internet.url(),
  contactEmail: faker.internet.email(),
};

export const validOrganizationResponse = {
  id: faker.string.uuid(),
  name: faker.company.name(),
  slug: faker.helpers.slugify(faker.company.name()),
  description: faker.lorem.paragraph(),
  website: faker.internet.url(),
  logoUrl: faker.image.url(),
  organizationType: 'church' as const,
  sizeCategory: 'small' as const,
  contactEmail: faker.internet.email(),
  contactPhone: faker.phone.number(),
  address: {
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    postalCode: faker.location.zipCode(),
    country: faker.location.country(),
  },
  licenseType: 'team' as const,
  maxUsers: faker.number.int({ min: 1, max: 100 }),
  billingEmail: faker.internet.email(),
  accountOwnerId: faker.string.uuid(),
  stripeCustomerId: faker.string.alphanumeric(20),
  stripeProductId: faker.string.alphanumeric(20),
  status: 'active' as const,
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
};

// Invalid fixtures for testing validation failures
export const invalidOrganizationCreate = {
  name: '', // Empty string
  slug: '', // Empty string
  website: 'not-a-url', // Invalid URL
  logoUrl: 'not-a-url', // Invalid URL
  contactEmail: 'invalid-email', // Invalid email
  organizationType: 'invalid_type' as any, // Invalid enum value
  sizeCategory: 'invalid_size' as any, // Invalid enum value
  address: 'not-an-object' as any, // Should be object
};

export const invalidOrganizationResponse = {
  id: 'not-a-uuid',
  name: '',
  website: 'not-a-url',
  contactEmail: 'invalid-email',
  organizationType: 'invalid_type' as any,
  createdAt: 'not-a-datetime',
  updatedAt: 'not-a-datetime',
};
