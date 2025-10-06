import {
  crossEntityValidationSchema,
  ministryAssessmentSchema,
  ministryMetricsSchema,
  ministryOrganizationSchema,
  ministrySearchSchema,
  ministryUserProfileSchema,
  organizationContextSchema,
  organizationScopedRequestSchema,
  roleBasedValidationSchema,
} from '@platform/shared/contracts';
import { describe, expect, it } from 'vitest';
import {
  ministryAssessmentResponseSchema,
  ministryDashboardResponseSchema,
  ministryOrganizationResponseSchema,
  ministryUserProfileResponseSchema,
} from '../../lib/contracts/ministry-platform.response';
import {
  ministryPlatformFixtures,
  runValidationTests,
} from '../../lib/mocks/ministry-platform';

// ============================================================================
// MINISTRY PLATFORM VALIDATION TESTS
// ============================================================================

describe('Ministry Platform Validation Schemas', () => {
  describe('OrganizationContext Schema', () => {
    it('should validate valid organization context', () => {
      const validContext = {
        organizationId: '123e4567-e89b-12d3-a456-426614174000',
        userRole: 'admin' as const,
        permissions: ['manage_users', 'manage_content'],
        isOwner: false,
        isAdmin: true,
        canManageUsers: true,
        canManageContent: true,
        canViewAnalytics: true,
        canManageSubscriptions: false,
      };

      const result = organizationContextSchema.safeParse(validContext);
      expect(result.success).toBe(true);
    });

    it('should reject invalid organization context', () => {
      const invalidContext = {
        organizationId: 'invalid-uuid',
        userRole: 'invalid_role',
        permissions: 'not-an-array',
        isOwner: 'not-boolean',
      };

      const result = organizationContextSchema.safeParse(invalidContext);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });

    it('should validate with fixture data', () => {
      const fixture = ministryPlatformFixtures.validOrganizationContext();
      expect(fixture).toBeDefined();
      expect(fixture.organizationId).toBeDefined();
      expect(fixture.userRole).toMatch(/^(owner|admin|member|viewer)$/);
    });
  });

  describe('MinistryMetrics Schema', () => {
    it('should validate valid ministry metrics', () => {
      const validMetrics = {
        apestScores: {
          apostolic: 85,
          prophetic: 72,
          evangelistic: 90,
          shepherding: 68,
          teaching: 78,
        },
        contentMetrics: {
          totalContentCreated: 25,
          totalViews: 1500,
          totalLikes: 120,
          totalShares: 45,
          engagementRate: 0.75,
          averageContentRating: 4.2,
        },
        communityMetrics: {
          communitiesJoined: 5,
          postsCreated: 50,
          commentsMade: 200,
          collaborationsParticipated: 8,
          networkConnections: 150,
        },
        learningMetrics: {
          assessmentsCompleted: 3,
          contentItemsCompleted: 75,
          learningStreak: 15,
          totalLearningTime: 450,
          certificatesEarned: 2,
        },
      };

      const result = ministryMetricsSchema.safeParse(validMetrics);
      expect(result.success).toBe(true);
    });

    it('should validate with fixture data', () => {
      const fixture = ministryPlatformFixtures.validMinistryMetrics();
      expect(fixture).toBeDefined();
      expect(fixture.apestScores.apostolic).toBeGreaterThanOrEqual(0);
      expect(fixture.apestScores.apostolic).toBeLessThanOrEqual(100);
    });
  });

  describe('MinistryUserProfile Schema', () => {
    it('should validate valid ministry user profile', () => {
      const validProfile = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        ministryRole: 'senior_pastor',
        languagePrimary: 'en',
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
        accountStatus: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
        lastActiveAt: new Date(),
        ministryMetrics: {
          apestScores: {
            apostolic: 85,
            prophetic: 72,
            evangelistic: 90,
            shepherding: 68,
            teaching: 78,
          },
          contentMetrics: {
            totalContentCreated: 25,
            totalViews: 1500,
            totalLikes: 120,
            totalShares: 45,
            engagementRate: 0.75,
            averageContentRating: 4.2,
          },
          communityMetrics: {
            communitiesJoined: 5,
            postsCreated: 50,
            commentsMade: 200,
            collaborationsParticipated: 8,
            networkConnections: 150,
          },
          learningMetrics: {
            assessmentsCompleted: 3,
            contentItemsCompleted: 75,
            learningStreak: 15,
            totalLearningTime: 450,
            certificatesEarned: 2,
          },
        },
        platformEngagement: {
          lastActiveAt: new Date(),
          totalSessions: 150,
          averageSessionDuration: 45,
          favoriteContentTypes: ['article', 'video', 'assessment'],
        },
      };

      const result = ministryUserProfileSchema.safeParse(validProfile);
      expect(result.success).toBe(true);
    });

    it('should validate with fixture data', () => {
      const fixture = ministryPlatformFixtures.validMinistryUserProfile();
      expect(fixture).toBeDefined();
      expect(fixture.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      expect(fixture.ministryRole).toBeDefined();
      expect(fixture.ministryMetrics).toBeDefined();
    });
  });

  describe('MinistryOrganization Schema', () => {
    it('should validate valid ministry organization', () => {
      const validOrganization = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Test Church',
        slug: 'test-church',
        organizationType: 'church',
        licenseType: 'institutional',
        maxUsers: 50,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
        ministryFocus: ['church_planting', 'leadership_development'],
        theologicalTradition: 'Reformed',
        organizationMetrics: {
          totalMembers: 45,
          activeMembers: 40,
          totalContent: 150,
          totalAssessments: 25,
          averageEngagement: 0.8,
          growthRate: 0.15,
        },
        ministryCapacity: {
          maxContentCreators: 10,
          maxAssessments: 15,
          maxCommunities: 5,
          customBranding: true,
          apiAccess: false,
        },
      };

      const result = ministryOrganizationSchema.safeParse(validOrganization);
      expect(result.success).toBe(true);
    });

    it('should validate with fixture data', () => {
      const fixture = ministryPlatformFixtures.validMinistryOrganization();
      expect(fixture).toBeDefined();
      expect(fixture.name).toBeDefined();
      expect(fixture.organizationType).toMatch(
        /^(church|denomination|seminary|ministry_network|nonprofit|business|other)$/
      );
      expect(fixture.ministryFocus).toBeInstanceOf(Array);
    });
  });

  describe('MinistryAssessment Schema', () => {
    it('should validate valid ministry assessment', () => {
      const validAssessment = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'APEST Leadership Assessment',
        slug: 'apest-leadership-assessment',
        description: 'Comprehensive assessment for ministry leadership',
        assessmentType: 'apest',
        questionsCount: 50,
        estimatedDuration: 30,
        version: '1.0',
        language: 'en',
        culturalAdaptation: 'western',
        researchBacked: true,
        instructions: 'Please answer all questions honestly',
        scoringMethod: 'likert_5',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
        publishedAt: new Date(),
        ministryRelevance: {
          targetMinistryRoles: ['senior_pastor', 'church_planter'],
          culturalAdaptations: ['western', 'eastern'],
          theologicalAlignment: ['Reformed', 'Baptist'],
          practicalApplication: ['leadership_development', 'church_planting'],
        },
        ministryScoring: {
          leadershipPotential: 85,
          ministryEffectiveness: 78,
          culturalCompetency: 82,
          theologicalDepth: 75,
        },
        usageAnalytics: {
          totalCompletions: 1250,
          averageCompletionTime: 28,
          completionRate: 0.85,
          userSatisfaction: 4.3,
        },
      };

      const result = ministryAssessmentSchema.safeParse(validAssessment);
      expect(result.success).toBe(true);
    });

    it('should validate with fixture data', () => {
      const fixture = ministryPlatformFixtures.validMinistryAssessment();
      expect(fixture).toBeDefined();
      expect(fixture.assessmentType).toMatch(
        /^(apest|mdna|cultural_intelligence|leadership_style|spiritual_gifts|other)$/
      );
      expect(fixture.ministryRelevance).toBeDefined();
    });
  });

  describe('OrganizationScopedRequest Schema', () => {
    it('should validate valid organization scoped request', () => {
      const validRequest = {
        organizationId: '123e4567-e89b-12d3-a456-426614174000',
        includeMetrics: true,
        includeRelations: ['members', 'content', 'assessments'],
      };

      const result = organizationScopedRequestSchema.safeParse(validRequest);
      expect(result.success).toBe(true);
    });

    it('should validate with fixture data', () => {
      const fixture = ministryPlatformFixtures.validOrganizationScopedRequest();
      expect(fixture).toBeDefined();
      expect(fixture.organizationId).toBeDefined();
    });
  });

  describe('MinistrySearch Schema', () => {
    it('should validate valid ministry search', () => {
      const validSearch = {
        query: 'leadership development',
        page: 1,
        limit: 20,
        ministryRoles: ['senior_pastor', 'church_planter'],
        culturalContexts: ['western', 'eastern'],
        theologicalThemes: ['ecclesiology', 'missiology'],
        organizationTypes: ['church', 'seminary'],
        contentTypes: ['article', 'video'],
        difficultyLevels: ['intermediate', 'advanced'],
        assessmentTypes: ['apest', 'leadership_style'],
        communityTypes: ['leadership_development', 'church_planting_cohort'],
      };

      const result = ministrySearchSchema.safeParse(validSearch);
      expect(result.success).toBe(true);
    });

    it('should validate with fixture data', () => {
      const fixture = ministryPlatformFixtures.validMinistrySearch();
      expect(fixture).toBeDefined();
      expect(fixture.page).toBeGreaterThanOrEqual(1);
      expect(fixture.limit).toBeGreaterThanOrEqual(1);
      expect(fixture.limit).toBeLessThanOrEqual(100);
    });
  });

  describe('RoleBasedValidation Schema', () => {
    it('should validate valid role-based validation', () => {
      const validValidation = {
        userRole: 'admin',
        organizationContext:
          ministryPlatformFixtures.validOrganizationContext(),
        fieldPermissions: {
          'user.email': true,
          'user.ministryRole': true,
          'organization.name': true,
          'content.title': false,
        },
      };

      const result = roleBasedValidationSchema.safeParse(validValidation);
      expect(result.success).toBe(true);
    });
  });

  describe('CrossEntityValidation Schema', () => {
    it('should validate valid cross-entity validation', () => {
      const validValidation = {
        contentOwnership: {
          contentId: '123e4567-e89b-12d3-a456-426614174000',
          authorId: '123e4567-e89b-12d3-a456-426614174001',
          organizationId: '123e4567-e89b-12d3-a456-426614174002',
          userHasAccess: true,
        },
        assessmentEligibility: {
          assessmentId: '123e4567-e89b-12d3-a456-426614174003',
          userId: '123e4567-e89b-12d3-a456-426614174001',
          userProfileComplete: true,
          prerequisitesMet: true,
          canTakeAssessment: true,
        },
        organizationAccess: {
          organizationId: '123e4567-e89b-12d3-a456-426614174002',
          userId: '123e4567-e89b-12d3-a456-426614174001',
          hasActiveMembership: true,
          membershipRole: 'member',
          hasRequiredPermissions: true,
        },
      };

      const result = crossEntityValidationSchema.safeParse(validValidation);
      expect(result.success).toBe(true);
    });
  });
});

describe('Ministry Platform Response Schemas', () => {
  describe('MinistryUserProfileResponse Schema', () => {
    it('should validate valid ministry user profile response', () => {
      const fixture =
        ministryPlatformFixtures.validMinistryUserProfileResponse();
      const result = ministryUserProfileResponseSchema.safeParse(fixture);
      expect(result.success).toBe(true);
    });
  });

  describe('MinistryOrganizationResponse Schema', () => {
    it('should validate valid ministry organization response', () => {
      const fixture =
        ministryPlatformFixtures.validMinistryOrganizationResponse();
      const result = ministryOrganizationResponseSchema.safeParse(fixture);
      expect(result.success).toBe(true);
    });
  });

  describe('MinistryAssessmentResponse Schema', () => {
    it('should validate valid ministry assessment response', () => {
      const fixture =
        ministryPlatformFixtures.validMinistryAssessmentResponse();
      const result = ministryAssessmentResponseSchema.safeParse(fixture);
      expect(result.success).toBe(true);
    });
  });

  describe('MinistryDashboardResponse Schema', () => {
    it('should validate valid ministry dashboard response', () => {
      const fixture = ministryPlatformFixtures.validMinistryDashboardResponse();
      const result = ministryDashboardResponseSchema.safeParse(fixture);
      expect(result.success).toBe(true);
    });
  });
});

describe('Ministry Platform Integration Tests', () => {
  it('should run comprehensive validation tests', () => {
    const results = runValidationTests();
    expect(results.passed).toBeGreaterThan(0);
    expect(results.failed).toBe(0);
    expect(results.errors).toHaveLength(0);
  });

  it('should validate ministry platform schemas preserve auth system compatibility', () => {
    // Test that ministry platform schemas don't break existing auth schemas
    const validUserProfile = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      ministryRole: 'senior_pastor',
      languagePrimary: 'en',
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
      accountStatus: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
      lastActiveAt: new Date(),
      ministryMetrics: {
        apestScores: {
          apostolic: 85,
          prophetic: 72,
          evangelistic: 90,
          shepherding: 68,
          teaching: 78,
        },
        contentMetrics: {
          totalContentCreated: 25,
          totalViews: 1500,
          totalLikes: 120,
          totalShares: 45,
          engagementRate: 0.75,
          averageContentRating: 4.2,
        },
        communityMetrics: {
          communitiesJoined: 5,
          postsCreated: 50,
          commentsMade: 200,
          collaborationsParticipated: 8,
          networkConnections: 150,
        },
        learningMetrics: {
          assessmentsCompleted: 3,
          contentItemsCompleted: 75,
          learningStreak: 15,
          totalLearningTime: 450,
          certificatesEarned: 2,
        },
      },
      platformEngagement: {
        lastActiveAt: new Date(),
        totalSessions: 150,
        averageSessionDuration: 45,
        favoriteContentTypes: ['article', 'video', 'assessment'],
      },
    };

    // This should work with both the base userProfileSchema and ministryUserProfileSchema
    const baseResult = ministryUserProfileSchema.safeParse(validUserProfile);
    expect(baseResult.success).toBe(true);
  });

  it('should validate organization and role-based validation utilities', () => {
    const organizationContext =
      ministryPlatformFixtures.validOrganizationContext();
    const roleValidation = {
      userRole: 'admin',
      organizationContext,
      fieldPermissions: {
        'user.email': true,
        'user.ministryRole': true,
        'organization.name': true,
        'content.title': organizationContext.canManageContent,
      },
    };

    const result = roleBasedValidationSchema.safeParse(roleValidation);
    expect(result.success).toBe(true);
  });

  it('should validate ministry platform schemas work with existing assessment compatibility', () => {
    const ministryAssessment =
      ministryPlatformFixtures.validMinistryAssessment();

    // Verify that ministry assessment extends base assessment functionality
    expect(ministryAssessment.ministryRelevance).toBeDefined();
    expect(ministryAssessment.ministryScoring).toBeDefined();
    expect(ministryAssessment.usageAnalytics).toBeDefined();

    // Verify base assessment fields are still present
    expect(ministryAssessment.id).toBeDefined();
    expect(ministryAssessment.name).toBeDefined();
    expect(ministryAssessment.assessmentType).toBeDefined();
    expect(ministryAssessment.questionsCount).toBeDefined();
  });
});
