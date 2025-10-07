import { faker } from '@faker-js/faker';

// Valid fixtures for UserProfile schemas
export const validUserProfileCreate = {
  email: faker.internet.email(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  displayName: faker.person.fullName(),
  bio: faker.lorem.sentence(),
  avatarUrl: faker.image.avatar(),
  ministryRole: 'senior_pastor' as const,
  denomination: 'Baptist',
  organizationName: faker.company.name(),
  yearsInMinistry: faker.number.int({ min: 1, max: 40 }),
  countryCode: 'US',
  timezone: 'America/New_York',
  languagePrimary: 'en',
  culturalContext: 'western' as const,
  assessmentMovementAlignment: faker.number.int({ min: 0, max: 100 }),
  assessmentAudienceEngagement: faker.number.int({ min: 0, max: 100 }),
  assessmentContentReadiness: faker.number.int({ min: 0, max: 100 }),
  assessmentRevenuePotential: faker.number.int({ min: 0, max: 100 }),
  assessmentNetworkEffects: faker.number.int({ min: 0, max: 100 }),
  assessmentStrategicFit: faker.number.int({ min: 0, max: 100 }),
  assessmentTotal: faker.number.int({ min: 0, max: 600 }),
  leaderTier: 'core' as const,
  subdomain: faker.internet.domainWord(),
  customDomain: faker.internet.domainName(),
  platformTitle: faker.company.catchPhrase(),
  subscriptionTier: 'professional' as const,
  theologicalFocus: ['missional', 'apostolic', 'movement'],
  brandColors: {
    primary: '#2563eb',
    secondary: '#64748b',
    accent: '#059669',
  },
  emailNotifications: {
    dailyDigest: true,
    collaborationRequests: true,
    revenueReports: false,
    communityUpdates: true,
  },
  privacySettings: {
    publicProfile: true,
    showAssessmentResults: false,
    allowNetworking: true,
    shareAnalytics: false,
  },
  onboardingCompleted: false,
  onboardingStep: 1,
  accountStatus: 'pending_verification' as const,
};

export const validUserProfileUpdate = {
  id: faker.string.uuid(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  bio: faker.lorem.sentence(),
  ministryRole: 'church_planter' as const,
  yearsInMinistry: faker.number.int({ min: 1, max: 40 }),
};

export const validUserProfileResponse = {
  id: faker.string.uuid(),
  email: faker.internet.email(),
  passwordHash: null,
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  displayName: faker.person.fullName(),
  bio: faker.lorem.sentence(),
  avatarUrl: faker.image.avatar(),
  ministryRole: 'senior_pastor' as const,
  denomination: 'Baptist',
  organizationName: faker.company.name(),
  yearsInMinistry: faker.number.int({ min: 1, max: 40 }),
  countryCode: 'US',
  timezone: 'America/New_York',
  languagePrimary: 'en',
  culturalContext: 'western' as const,
  assessmentMovementAlignment: faker.number.int({ min: 0, max: 100 }),
  assessmentAudienceEngagement: faker.number.int({ min: 0, max: 100 }),
  assessmentContentReadiness: faker.number.int({ min: 0, max: 100 }),
  assessmentRevenuePotential: faker.number.int({ min: 0, max: 100 }),
  assessmentNetworkEffects: faker.number.int({ min: 0, max: 100 }),
  assessmentStrategicFit: faker.number.int({ min: 0, max: 100 }),
  assessmentTotal: faker.number.int({ min: 0, max: 600 }),
  leaderTier: 'core' as const,
  subdomain: faker.internet.domainWord(),
  customDomain: faker.internet.domainName(),
  platformTitle: faker.company.catchPhrase(),
  subscriptionTier: 'professional' as const,
  theologicalFocus: ['missional', 'apostolic', 'movement'],
  brandColors: {
    primary: '#2563eb',
    secondary: '#64748b',
    accent: '#059669',
  },
  emailNotifications: {
    dailyDigest: true,
    collaborationRequests: true,
    revenueReports: false,
    communityUpdates: true,
  },
  privacySettings: {
    publicProfile: true,
    showAssessmentResults: false,
    allowNetworking: true,
    shareAnalytics: false,
  },
  onboardingCompleted: true,
  onboardingStep: 5,
  accountStatus: 'active' as const,
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
  lastActiveAt: faker.date.recent().toISOString(),
};

// Invalid fixtures for testing validation failures
export const invalidUserProfileCreate = {
  email: 'invalid-email', // Invalid email format
  firstName: '', // Empty string
  ministryRole: 'invalid_role' as any, // Invalid enum value
  assessmentMovementAlignment: 150, // Out of range (0-100)
  theologicalFocus: 'not-an-array' as any, // Should be array
  brandColors: 'not-an-object' as any, // Should be object
  emailNotifications: 'not-an-object' as any, // Should be object
  privacySettings: 'not-an-object' as any, // Should be object
};

export const invalidUserProfileResponse = {
  id: 'not-a-uuid',
  email: 'invalid-email',
  ministryRole: 'invalid_role' as any,
  subscriptionTier: 'invalid_tier' as any,
  createdAt: 'not-a-datetime',
  updatedAt: 'not-a-datetime',
  lastActiveAt: 'not-a-datetime',
};
