import { faker } from '@faker-js/faker';
import {
  ministryAssessmentSchema,
  ministryMetricsSchema,
  ministryOrganizationSchema,
  ministrySearchSchema,
  ministryUserProfileSchema,
  organizationContextSchema,
  organizationScopedRequestSchema,
} from '@platform/shared/contracts';
import {
  ministryAssessmentResponseSchema,
  ministryDashboardResponseSchema,
  ministryOrganizationResponseSchema,
  ministryUserProfileResponseSchema,
} from '../contracts/ministry-platform.response';

// ============================================================================
// MINISTRY PLATFORM MOCK DATA GENERATORS
// ============================================================================

export const generateOrganizationContext = () => ({
  organizationId: faker.string.uuid(),
  userRole: faker.helpers.arrayElement(['owner', 'admin', 'member', 'viewer']),
  permissions: faker.helpers.arrayElements([
    'manage_users',
    'manage_content',
    'view_analytics',
    'manage_subscriptions',
    'moderate_community',
  ]),
  isOwner: faker.datatype.boolean(),
  isAdmin: faker.datatype.boolean(),
  canManageUsers: faker.datatype.boolean(),
  canManageContent: faker.datatype.boolean(),
  canViewAnalytics: faker.datatype.boolean(),
  canManageSubscriptions: faker.datatype.boolean(),
});

export const generateMinistryMetrics = () => ({
  apestScores: {
    apostolic: faker.number.int({ min: 0, max: 100 }),
    prophetic: faker.number.int({ min: 0, max: 100 }),
    evangelistic: faker.number.int({ min: 0, max: 100 }),
    shepherding: faker.number.int({ min: 0, max: 100 }),
    teaching: faker.number.int({ min: 0, max: 100 }),
  },
  contentMetrics: {
    totalContentCreated: faker.number.int({ min: 0, max: 1000 }),
    totalViews: faker.number.int({ min: 0, max: 10000 }),
    totalLikes: faker.number.int({ min: 0, max: 5000 }),
    totalShares: faker.number.int({ min: 0, max: 1000 }),
    engagementRate: faker.number.float({ min: 0, max: 1, fractionDigits: 2 }),
    averageContentRating: faker.number.float({
      min: 0,
      max: 5,
      fractionDigits: 1,
    }),
  },
  communityMetrics: {
    communitiesJoined: faker.number.int({ min: 0, max: 50 }),
    postsCreated: faker.number.int({ min: 0, max: 500 }),
    commentsMade: faker.number.int({ min: 0, max: 2000 }),
    collaborationsParticipated: faker.number.int({ min: 0, max: 100 }),
    networkConnections: faker.number.int({ min: 0, max: 1000 }),
  },
  learningMetrics: {
    assessmentsCompleted: faker.number.int({ min: 0, max: 20 }),
    contentItemsCompleted: faker.number.int({ min: 0, max: 200 }),
    learningStreak: faker.number.int({ min: 0, max: 365 }),
    totalLearningTime: faker.number.int({ min: 0, max: 10000 }),
    certificatesEarned: faker.number.int({ min: 0, max: 10 }),
  },
});

export const generateMinistryUserProfile = () => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  displayName: faker.person.fullName(),
  bio: faker.lorem.paragraph(),
  avatarUrl: faker.image.avatar(),
  ministryRole: faker.helpers.arrayElement([
    'senior_pastor',
    'associate_pastor',
    'church_planter',
    'denominational_leader',
    'seminary_professor',
    'seminary_student',
    'ministry_staff',
    'missionary',
    'marketplace_minister',
    'nonprofit_leader',
    'consultant',
    'academic_researcher',
    'emerging_leader',
    'other',
  ]),
  denomination: faker.helpers.arrayElement([
    'Baptist',
    'Methodist',
    'Presbyterian',
    'Lutheran',
    'Anglican',
    'Pentecostal',
    'Non-denominational',
    'Catholic',
    'Orthodox',
    'Other',
  ]),
  organizationName: faker.company.name(),
  yearsInMinistry: faker.number.int({ min: 0, max: 50 }),
  countryCode: faker.location.countryCode(),
  timezone: faker.location.timeZone(),
  languagePrimary: 'en',
  culturalContext: faker.helpers.arrayElement([
    'western',
    'eastern',
    'african',
    'latin_american',
    'middle_eastern',
    'oceanic',
    'mixed',
    'global',
  ]),
  assessmentMovementAlignment: faker.number.int({ min: 0, max: 100 }),
  assessmentAudienceEngagement: faker.number.int({ min: 0, max: 100 }),
  assessmentContentReadiness: faker.number.int({ min: 0, max: 100 }),
  assessmentRevenuePotential: faker.number.int({ min: 0, max: 100 }),
  assessmentNetworkEffects: faker.number.int({ min: 0, max: 100 }),
  assessmentStrategicFit: faker.number.int({ min: 0, max: 100 }),
  assessmentTotal: faker.number.int({ min: 0, max: 600 }),
  leaderTier: faker.helpers.arrayElement([
    'core',
    'network',
    'emerging',
    'community',
  ]),
  subdomain: faker.internet.domainWord(),
  customDomain: faker.internet.domainName(),
  platformTitle: faker.company.buzzPhrase(),
  subscriptionTier: faker.helpers.arrayElement([
    'free',
    'individual',
    'professional',
    'leader',
    'institutional',
  ]),
  theologicalFocus: faker.helpers.arrayElements([
    'theology',
    'missiology',
    'ecclesiology',
    'christology',
    'pneumatology',
    'soteriology',
    'eschatology',
  ]),
  brandColors: {
    primary: faker.color.rgb(),
    secondary: faker.color.rgb(),
    accent: faker.color.rgb(),
  },
  emailNotifications: {
    dailyDigest: faker.datatype.boolean(),
    collaborationRequests: faker.datatype.boolean(),
    revenueReports: faker.datatype.boolean(),
    communityUpdates: faker.datatype.boolean(),
  },
  privacySettings: {
    publicProfile: faker.datatype.boolean(),
    showAssessmentResults: faker.datatype.boolean(),
    allowNetworking: faker.datatype.boolean(),
    shareAnalytics: faker.datatype.boolean(),
  },
  onboardingCompleted: faker.datatype.boolean(),
  onboardingStep: faker.number.int({ min: 1, max: 10 }),
  accountStatus: faker.helpers.arrayElement([
    'active',
    'inactive',
    'suspended',
    'pending_verification',
  ]),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  lastActiveAt: faker.date.recent(),

  // Ministry-specific extensions
  organizationContext: generateOrganizationContext(),
  ministryMetrics: generateMinistryMetrics(),
  platformEngagement: {
    lastActiveAt: faker.date.recent(),
    totalSessions: faker.number.int({ min: 0, max: 1000 }),
    averageSessionDuration: faker.number.int({ min: 5, max: 120 }),
    favoriteContentTypes: faker.helpers.arrayElements([
      'article',
      'video',
      'assessment',
      'podcast',
      'ebook',
    ]),
  },
  ministrySpecialization: faker.helpers.arrayElements([
    'church_planting',
    'leadership_development',
    'discipleship',
    'evangelism',
    'missions',
    'worship',
    'youth_ministry',
    'children_ministry',
    'counseling',
    'education',
  ]),
  targetAudience: faker.helpers.arrayElements([
    'pastors',
    'church_leaders',
    'ministry_workers',
    'seminary_students',
    'missionaries',
    'church_planters',
    'denominational_leaders',
  ]),
  ministryGoals: faker.helpers.arrayElements([
    'church_growth',
    'leadership_development',
    'discipleship',
    'evangelism',
    'missions',
    'community_outreach',
    'theological_education',
  ]),
  networkAmplificationScore: faker.number.int({ min: 0, max: 100 }),
  influenceRadius: faker.number.int({ min: 0, max: 1000 }),
});

export const generateMinistryOrganization = () => ({
  id: faker.string.uuid(),
  name: faker.company.name(),
  slug: faker.internet.domainWord(),
  description: faker.lorem.paragraph(),
  website: faker.internet.url(),
  logoUrl: faker.image.url(),
  organizationType: faker.helpers.arrayElement([
    'church',
    'denomination',
    'seminary',
    'ministry_network',
    'nonprofit',
    'business',
    'other',
  ]),
  sizeCategory: faker.helpers.arrayElement([
    'small',
    'medium',
    'large',
    'enterprise',
  ]),
  contactEmail: faker.internet.email(),
  contactPhone: faker.phone.number(),
  address: {
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
    postalCode: faker.location.zipCode(),
  },
  licenseType: faker.helpers.arrayElement([
    'individual',
    'institutional',
    'enterprise',
  ]),
  maxUsers: faker.number.int({ min: 1, max: 1000 }),
  billingEmail: faker.internet.email(),
  accountOwnerId: faker.string.uuid(),
  status: faker.helpers.arrayElement([
    'active',
    'inactive',
    'trial',
    'suspended',
  ]),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),

  // Ministry-specific extensions
  ministryFocus: faker.helpers.arrayElements([
    'church_planting',
    'leadership_development',
    'discipleship',
    'evangelism',
    'missions',
    'worship',
    'youth_ministry',
    'children_ministry',
    'counseling',
    'education',
  ]),
  theologicalTradition: faker.helpers.arrayElement([
    'Reformed',
    'Wesleyan',
    'Baptist',
    'Pentecostal',
    'Lutheran',
    'Anglican',
    'Presbyterian',
    'Non-denominational',
  ]),
  denominationalAffiliation: faker.company.name(),
  organizationMetrics: {
    totalMembers: faker.number.int({ min: 0, max: 1000 }),
    activeMembers: faker.number.int({ min: 0, max: 500 }),
    totalContent: faker.number.int({ min: 0, max: 5000 }),
    totalAssessments: faker.number.int({ min: 0, max: 100 }),
    averageEngagement: faker.number.float({
      min: 0,
      max: 1,
      fractionDigits: 2,
    }),
    growthRate: faker.number.float({ min: -1, max: 1, fractionDigits: 2 }),
  },
  ministryCapacity: {
    maxContentCreators: faker.number.int({ min: 0, max: 100 }),
    maxAssessments: faker.number.int({ min: 0, max: 50 }),
    maxCommunities: faker.number.int({ min: 0, max: 20 }),
    customBranding: faker.datatype.boolean(),
    apiAccess: faker.datatype.boolean(),
  },
});

export const generateMinistryAssessment = () => ({
  id: faker.string.uuid(),
  name: faker.lorem.words(3),
  slug: faker.internet.domainWord(),
  description: faker.lorem.paragraph(),
  assessmentType: faker.helpers.arrayElement([
    'apest',
    'mdna',
    'cultural_intelligence',
    'leadership_style',
    'spiritual_gifts',
    'other',
  ]),
  questionsCount: faker.number.int({ min: 5, max: 100 }),
  estimatedDuration: faker.number.int({ min: 10, max: 120 }),
  passingScore: faker.number.int({ min: 60, max: 90 }),
  version: faker.system.semver(),
  language: 'en',
  culturalAdaptation: faker.helpers.arrayElement([
    'western',
    'eastern',
    'african',
    'latin_american',
    'middle_eastern',
    'oceanic',
    'universal',
    'global',
  ]),
  researchBacked: faker.datatype.boolean(),
  validityScore: faker.number.float({ min: 0, max: 1, fractionDigits: 2 }),
  reliabilityScore: faker.number.float({ min: 0, max: 1, fractionDigits: 2 }),
  instructions: faker.lorem.paragraph(),
  scoringMethod: faker.helpers.arrayElement([
    'likert_5',
    'likert_7',
    'binary',
    'ranking',
    'weighted',
  ]),
  status: faker.helpers.arrayElement([
    'draft',
    'active',
    'archived',
    'under_review',
  ]),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  publishedAt: faker.date.recent(),

  // Ministry-specific extensions
  ministryRelevance: {
    targetMinistryRoles: faker.helpers.arrayElements([
      'senior_pastor',
      'associate_pastor',
      'church_planter',
      'denominational_leader',
      'seminary_professor',
      'seminary_student',
      'ministry_staff',
      'missionary',
      'marketplace_minister',
      'nonprofit_leader',
      'consultant',
      'academic_researcher',
      'emerging_leader',
      'other',
    ]),
    culturalAdaptations: faker.helpers.arrayElements([
      'western',
      'eastern',
      'african',
      'latin_american',
      'middle_eastern',
      'oceanic',
      'mixed',
      'global',
    ]),
    theologicalAlignment: faker.helpers.arrayElements([
      'Reformed',
      'Wesleyan',
      'Baptist',
      'Pentecostal',
      'Lutheran',
      'Anglican',
      'Presbyterian',
      'Non-denominational',
    ]),
    practicalApplication: faker.helpers.arrayElements([
      'leadership_development',
      'church_planting',
      'discipleship',
      'evangelism',
      'missions',
      'worship',
      'youth_ministry',
      'children_ministry',
    ]),
  },
  ministryScoring: {
    leadershipPotential: faker.number.int({ min: 0, max: 100 }),
    ministryEffectiveness: faker.number.int({ min: 0, max: 100 }),
    culturalCompetency: faker.number.int({ min: 0, max: 100 }),
    theologicalDepth: faker.number.int({ min: 0, max: 100 }),
  },
  usageAnalytics: {
    totalCompletions: faker.number.int({ min: 0, max: 10000 }),
    averageCompletionTime: faker.number.int({ min: 10, max: 120 }),
    completionRate: faker.number.float({ min: 0, max: 1, fractionDigits: 2 }),
    userSatisfaction: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
  },
});

// ============================================================================
// VALIDATION TEST FIXTURES
// ============================================================================

export const ministryPlatformFixtures = {
  // Organization Context
  validOrganizationContext: () =>
    organizationContextSchema.parse(generateOrganizationContext()),

  // Ministry Metrics
  validMinistryMetrics: () =>
    ministryMetricsSchema.parse(generateMinistryMetrics()),

  // Ministry User Profile
  validMinistryUserProfile: () =>
    ministryUserProfileSchema.parse(generateMinistryUserProfile()),

  // Ministry Organization
  validMinistryOrganization: () =>
    ministryOrganizationSchema.parse(generateMinistryOrganization()),

  // Ministry Assessment
  validMinistryAssessment: () =>
    ministryAssessmentSchema.parse(generateMinistryAssessment()),

  // Request Schemas
  validOrganizationScopedRequest: () =>
    organizationScopedRequestSchema.parse({
      organizationId: faker.string.uuid(),
      includeMetrics: faker.datatype.boolean(),
      includeRelations: faker.helpers.arrayElements([
        'members',
        'content',
        'assessments',
        'communities',
      ]),
    }),

  validMinistrySearch: () =>
    ministrySearchSchema.parse({
      query: faker.lorem.words(2),
      page: faker.number.int({ min: 1, max: 10 }),
      limit: faker.number.int({ min: 1, max: 100 }),
      ministryRoles: faker.helpers.arrayElements([
        'senior_pastor',
        'associate_pastor',
        'church_planter',
        'denominational_leader',
      ]),
      culturalContexts: faker.helpers.arrayElements([
        'western',
        'eastern',
        'african',
        'global',
      ]),
      theologicalThemes: faker.helpers.arrayElements([
        'theology',
        'missiology',
        'ecclesiology',
      ]),
    }),

  // Response Schemas
  validMinistryUserProfileResponse: () =>
    ministryUserProfileResponseSchema.parse({
      data: generateMinistryUserProfile(),
      success: true,
      message: 'Ministry user profile retrieved successfully',
      ministryContext: {
        userMinistryRole: 'senior_pastor',
        organizationContext: generateOrganizationContext(),
        culturalContext: 'western',
        permissions: ['manage_content', 'view_analytics'],
      },
      metadata: {
        requestId: faker.string.uuid(),
        timestamp: faker.date.recent().toISOString(),
        version: '1.0.0',
        processingTime: faker.number.int({ min: 10, max: 500 }),
      },
    }),

  validMinistryOrganizationResponse: () =>
    ministryOrganizationResponseSchema.parse({
      data: generateMinistryOrganization(),
      success: true,
      message: 'Ministry organization retrieved successfully',
      metadata: {
        requestId: faker.string.uuid(),
        timestamp: faker.date.recent().toISOString(),
        version: '1.0.0',
      },
    }),

  validMinistryAssessmentResponse: () =>
    ministryAssessmentResponseSchema.parse({
      data: generateMinistryAssessment(),
      success: true,
      message: 'Ministry assessment retrieved successfully',
      metadata: {
        requestId: faker.string.uuid(),
        timestamp: faker.date.recent().toISOString(),
        version: '1.0.0',
      },
    }),

  validMinistryDashboardResponse: () =>
    ministryDashboardResponseSchema.parse({
      data: {
        userMetrics: generateMinistryMetrics(),
        organizationMetrics: {
          totalMembers: faker.number.int({ min: 0, max: 1000 }),
          activeMembers: faker.number.int({ min: 0, max: 500 }),
          totalContent: faker.number.int({ min: 0, max: 5000 }),
          totalAssessments: faker.number.int({ min: 0, max: 100 }),
          averageEngagement: faker.number.float({
            min: 0,
            max: 1,
            fractionDigits: 2,
          }),
          growthRate: faker.number.float({
            min: -1,
            max: 1,
            fractionDigits: 2,
          }),
        },
        recentActivity: [
          {
            id: faker.string.uuid(),
            type: 'content_created',
            title: 'New Article Created',
            description: 'Created new article on leadership',
            timestamp: faker.date.recent().toISOString(),
            user: {
              id: faker.string.uuid(),
              firstName: faker.person.firstName(),
              lastName: faker.person.lastName(),
              displayName: faker.person.fullName(),
              avatarUrl: faker.image.avatar(),
            },
          },
        ],
        recommendations: [
          {
            type: 'content',
            title: 'Leadership Development Article',
            description: 'Recommended based on your ministry role',
            reason: 'High relevance to your current focus areas',
            priority: 'high',
            actionUrl: faker.internet.url(),
          },
          {
            type: 'assessment',
            title: 'APEST Leadership Assessment',
            description: 'Complete your leadership profile',
            reason: 'You have not completed this assessment yet',
            priority: 'medium',
            actionUrl: faker.internet.url(),
          },
        ],
      },
      success: true,
      message: 'Ministry dashboard retrieved successfully',
      metadata: {
        requestId: faker.string.uuid(),
        timestamp: faker.date.recent().toISOString(),
        version: '1.0.0',
      },
    }),
};

// ============================================================================
// VALIDATION TEST HELPERS
// ============================================================================

export const runValidationTests = () => {
  const results = {
    passed: 0,
    failed: 0,
    errors: [] as string[],
  };

  const testSchemas = [
    {
      name: 'OrganizationContext',
      fixture: ministryPlatformFixtures.validOrganizationContext,
    },
    {
      name: 'MinistryMetrics',
      fixture: ministryPlatformFixtures.validMinistryMetrics,
    },
    {
      name: 'MinistryUserProfile',
      fixture: ministryPlatformFixtures.validMinistryUserProfile,
    },
    {
      name: 'MinistryOrganization',
      fixture: ministryPlatformFixtures.validMinistryOrganization,
    },
    {
      name: 'MinistryAssessment',
      fixture: ministryPlatformFixtures.validMinistryAssessment,
    },
    {
      name: 'OrganizationScopedRequest',
      fixture: ministryPlatformFixtures.validOrganizationScopedRequest,
    },
    {
      name: 'MinistrySearch',
      fixture: ministryPlatformFixtures.validMinistrySearch,
    },
    {
      name: 'MinistryUserProfileResponse',
      fixture: ministryPlatformFixtures.validMinistryUserProfileResponse,
    },
    {
      name: 'MinistryOrganizationResponse',
      fixture: ministryPlatformFixtures.validMinistryOrganizationResponse,
    },
    {
      name: 'MinistryAssessmentResponse',
      fixture: ministryPlatformFixtures.validMinistryAssessmentResponse,
    },
    {
      name: 'MinistryDashboardResponse',
      fixture: ministryPlatformFixtures.validMinistryDashboardResponse,
    },
  ];

  testSchemas.forEach(({ name, fixture }) => {
    try {
      const result = fixture();
      if (result) {
        results.passed++;
        console.log(`✅ ${name} validation passed`);
      } else {
        results.failed++;
        results.errors.push(`${name}: Validation returned falsy result`);
      }
    } catch (error) {
      results.failed++;
      results.errors.push(
        `${name}: ${error instanceof Error ? error.message : String(error)}`
      );
      console.error(`❌ ${name} validation failed:`, error);
    }
  });

  console.log(`\n📊 Validation Test Results:`);
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);

  if (results.errors.length > 0) {
    console.log(`\n🚨 Errors:`);
    results.errors.forEach(error => console.log(`  - ${error}`));
  }

  return results;
};
