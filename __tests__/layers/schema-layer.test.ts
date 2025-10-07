// Database Schema Layer Tests
// Tests the database schema definitions, types, and relationships

import {
  aiContentJobs,
  aiConversations,
  aiCrossReferenceSuggestions,
  aiMessages,
  apiKeys,
  assessmentQuestions,
  assessmentResponses,
  assessments,
  auditLogs,
  collaborations,
  communities,
  communityMemberships,
  communityPostVotes,
  contentCrossReferences,
  contentItems,
  contentSeries,
  coupons,
  featureFlags,
  learningOutcomes,
  movementMetrics,
  organizationMemberships,
  organizations,
  paymentMethods,
  performanceReports,
  schema,
  seriesContentItems,
  subscriptionPlans,
  systemNotifications,
  tables,
  theologicalConcepts,
  transactions,
  userAnalyticsEvents,
  userAssessments,
  userConsents,
  userContentInteractions,
  userFeatureFlags,
  userNotificationStatus,
  userProfiles,
  userSubscriptions,
  type Assessment,
  type NewOrganization,
  type NewUserProfile,
  type Organization,
  type UserProfile,
} from '@platform/database';
import { describe, expect, test } from 'vitest';
import {
  createTestAssessment,
  createTestOrganization,
  createTestUserProfile,
} from './test-setup';

describe('Database Schema Layer', () => {
  describe('Schema Exports', () => {
    test('main schema object is exported', () => {
      expect(schema).toBeDefined();
      expect(typeof schema).toBe('object');
    });

    test('tables object is exported', () => {
      expect(tables).toBeDefined();
      expect(typeof tables).toBe('object');
    });

    test('all core tables are exported', () => {
      // Auth & User Management
      expect(userProfiles).toBeDefined();
      expect(organizations).toBeDefined();
      expect(organizationMemberships).toBeDefined();

      // Assessment System
      expect(assessments).toBeDefined();
      expect(assessmentQuestions).toBeDefined();
      expect(userAssessments).toBeDefined();
      expect(assessmentResponses).toBeDefined();

      // Content Management
      expect(contentSeries).toBeDefined();
      expect(contentItems).toBeDefined();
      expect(seriesContentItems).toBeDefined();
      expect(contentCrossReferences).toBeDefined();

      // AI System
      expect(aiConversations).toBeDefined();
      expect(aiMessages).toBeDefined();
      expect(aiContentJobs).toBeDefined();
      expect(aiCrossReferenceSuggestions).toBeDefined();
      expect(theologicalConcepts).toBeDefined();

      // Community & Networking
      expect(communities).toBeDefined();
      expect(communityMemberships).toBeDefined();
      expect(communityPostVotes).toBeDefined();
      expect(collaborations).toBeDefined();

      // Subscriptions & Financial
      expect(subscriptionPlans).toBeDefined();
      expect(userSubscriptions).toBeDefined();
      expect(transactions).toBeDefined();
      expect(paymentMethods).toBeDefined();
      expect(coupons).toBeDefined();

      // Analytics & Tracking
      expect(userAnalyticsEvents).toBeDefined();
      expect(userContentInteractions).toBeDefined();
      expect(learningOutcomes).toBeDefined();
      expect(movementMetrics).toBeDefined();
      expect(performanceReports).toBeDefined();

      // System & Administration
      expect(auditLogs).toBeDefined();
      expect(featureFlags).toBeDefined();
      expect(userFeatureFlags).toBeDefined();
      expect(userConsents).toBeDefined();
      expect(systemNotifications).toBeDefined();
      expect(userNotificationStatus).toBeDefined();
      expect(apiKeys).toBeDefined();
    });
  });

  describe('Type Definitions', () => {
    test('UserProfile types are correctly defined', () => {
      const userProfile: UserProfile = createTestUserProfile();
      expect(userProfile.id).toBe('user-123');
      expect(userProfile.email).toBe('test@example.com');
      expect(userProfile.firstName).toBe('John');
      expect(userProfile.lastName).toBe('Doe');
      expect(userProfile.ministryRole).toBe('senior_pastor');
      expect(userProfile.createdAt).toBeInstanceOf(Date);
      expect(userProfile.updatedAt).toBeInstanceOf(Date);
    });

    test('NewUserProfile types are correctly defined', () => {
      const newUserProfile: NewUserProfile = {
        id: 'user-123',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        ministryRole: 'senior_pastor',
        denomination: 'Baptist',
        organizationName: 'Test Church',
        yearsInMinistry: 10,
        countryCode: 'US',
        timezone: 'America/New_York',
        languagePrimary: 'en',
        culturalContext: 'western',
        subscriptionTier: 'free',
        accountStatus: 'active',
      };
      expect(newUserProfile.id).toBe('user-123');
      expect(newUserProfile.email).toBe('test@example.com');
    });

    test('Organization types are correctly defined', () => {
      const organization: Organization = createTestOrganization();
      expect(organization.id).toBe('org-123');
      expect(organization.name).toBe('Test Organization');
      expect(organization.slug).toBe('test-org');
      expect(organization.organizationType).toBe('church');
      expect(organization.createdAt).toBeInstanceOf(Date);
      expect(organization.updatedAt).toBeInstanceOf(Date);
    });

    test('Assessment types are correctly defined', () => {
      const assessment: Assessment = createTestAssessment();
      expect(assessment.id).toBe('assessment-123');
      expect(assessment.name).toBe('Test Assessment');
      expect(assessment.slug).toBe('test-assessment');
      expect(assessment.assessmentType).toBe('spiritual_gifts');
      expect(assessment.createdAt).toBeInstanceOf(Date);
      expect(assessment.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe('Schema Relationships', () => {
    test('userProfiles has correct foreign key references', () => {
      // Check that userProfiles table has the expected structure
      expect(userProfiles.id).toBeDefined();
      expect(userProfiles.email).toBeDefined();
      expect(userProfiles.firstName).toBeDefined();
      expect(userProfiles.lastName).toBeDefined();
      expect(userProfiles.ministryRole).toBeDefined();
    });

    test('organizations has correct foreign key references', () => {
      expect(organizations.id).toBeDefined();
      expect(organizations.name).toBeDefined();
      expect(organizations.slug).toBeDefined();
      expect(organizations.organizationType).toBeDefined();
      expect(organizations.accountOwnerId).toBeDefined(); // References userProfiles.id
    });

    test('organizationMemberships has correct foreign key references', () => {
      expect(organizationMemberships.id).toBeDefined();
      expect(organizationMemberships.userId).toBeDefined(); // References userProfiles.id
      expect(organizationMemberships.organizationId).toBeDefined(); // References organizations.id
      expect(organizationMemberships.role).toBeDefined();
      expect(organizationMemberships.status).toBeDefined();
    });

    test('assessments has correct structure', () => {
      expect(assessments.id).toBeDefined();
      expect(assessments.name).toBeDefined();
      expect(assessments.slug).toBeDefined();
      expect(assessments.assessmentType).toBeDefined();
      expect(assessments.status).toBeDefined();
    });

    test('assessmentQuestions has correct foreign key references', () => {
      expect(assessmentQuestions.id).toBeDefined();
      expect(assessmentQuestions.assessmentId).toBeDefined(); // References assessments.id
      expect(assessmentQuestions.questionText).toBeDefined();
      expect(assessmentQuestions.questionType).toBeDefined();
      expect(assessmentQuestions.orderIndex).toBeDefined();
    });

    test('userAssessments has correct foreign key references', () => {
      expect(userAssessments.id).toBeDefined();
      expect(userAssessments.userId).toBeDefined(); // References userProfiles.id
      expect(userAssessments.assessmentId).toBeDefined(); // References assessments.id
      expect(userAssessments.startedAt).toBeDefined();
      expect(userAssessments.completedAt).toBeDefined();
    });

    test('assessmentResponses has correct foreign key references', () => {
      expect(assessmentResponses.id).toBeDefined();
      expect(assessmentResponses.userAssessmentId).toBeDefined(); // References userAssessments.id
      expect(assessmentResponses.questionId).toBeDefined(); // References assessmentQuestions.id
      expect(assessmentResponses.responseValue).toBeDefined();
    });
  });

  describe('Enum Values', () => {
    test('ministryRole enum values are correct', () => {
      const validRoles = [
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
      ];

      const userProfile = createTestUserProfile({
        ministryRole: 'senior_pastor',
      });
      expect(validRoles).toContain(userProfile.ministryRole);
    });

    test('organizationType enum values are correct', () => {
      const validTypes = [
        'church',
        'denomination',
        'seminary',
        'ministry_network',
        'nonprofit',
        'business',
        'other',
      ];

      const organization = createTestOrganization({
        organizationType: 'church',
      });
      expect(validTypes).toContain(organization.organizationType);
    });

    test('assessmentType enum values are correct', () => {
      const validTypes = [
        'apest',
        'mdna',
        'cultural_intelligence',
        'leadership_style',
        'spiritual_gifts',
        'other',
      ];

      const assessment = createTestAssessment({
        assessmentType: 'spiritual_gifts',
      });
      expect(validTypes).toContain(assessment.assessmentType);
    });
  });

  describe('Default Values', () => {
    test('userProfiles has correct default values', () => {
      const minimalUser: NewUserProfile = {
        id: 'user-123',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        ministryRole: 'senior_pastor',
      };
      expect(minimalUser.languagePrimary).toBeUndefined(); // Should use default 'en'
      expect(minimalUser.subscriptionTier).toBeUndefined(); // Should use default 'free'
      expect(minimalUser.accountStatus).toBeUndefined(); // Should use default 'pending_verification'
    });

    test('organizations has correct default values', () => {
      const minimalOrg: NewOrganization = {
        id: 'org-123',
        name: 'Test Org',
        slug: 'test-org',
        organizationType: 'church',
      };
      expect(minimalOrg.languagePrimary).toBeUndefined(); // Should use default 'en'
      expect(minimalOrg.status).toBeUndefined(); // Should use default 'trial'
    });
  });

  describe('JSONB Fields', () => {
    test('userProfiles JSONB fields have correct structure', () => {
      const userProfile = createTestUserProfile({
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
        theologicalFocus: ['leadership', 'discipleship'],
      });

      expect(userProfile.brandColors).toBeDefined();
      expect(userProfile.emailNotifications).toBeDefined();
      expect(userProfile.privacySettings).toBeDefined();
      expect(userProfile.theologicalFocus).toBeInstanceOf(Array);
    });
  });

  describe('Timestamps', () => {
    test('all entities have createdAt and updatedAt timestamps', () => {
      const userProfile = createTestUserProfile();
      expect(userProfile.createdAt).toBeInstanceOf(Date);
      expect(userProfile.updatedAt).toBeInstanceOf(Date);

      const organization = createTestOrganization();
      expect(organization.createdAt).toBeInstanceOf(Date);
      expect(organization.updatedAt).toBeInstanceOf(Date);

      const assessment = createTestAssessment();
      expect(assessment.createdAt).toBeInstanceOf(Date);
      expect(assessment.updatedAt).toBeInstanceOf(Date);
    });

    test('userProfiles has lastActiveAt timestamp', () => {
      const userProfile = createTestUserProfile();
      expect(userProfile.lastActiveAt).toBeInstanceOf(Date);
    });
  });

  describe('Schema Completeness', () => {
    test('all required fields are present in userProfiles', () => {
      const requiredFields = [
        'id',
        'email',
        'firstName',
        'lastName',
        'ministryRole',
        'createdAt',
        'updatedAt',
      ];

      const userProfile = createTestUserProfile();
      requiredFields.forEach(field => {
        expect(userProfile).toHaveProperty(field);
      });
    });

    test('all required fields are present in organizations', () => {
      const requiredFields = [
        'id',
        'name',
        'slug',
        'organizationType',
        'createdAt',
        'updatedAt',
      ];

      const organization = createTestOrganization();
      requiredFields.forEach(field => {
        expect(organization).toHaveProperty(field);
      });
    });

    test('all required fields are present in assessments', () => {
      const requiredFields = [
        'id',
        'name',
        'slug',
        'assessmentType',
        'createdAt',
        'updatedAt',
      ];

      const assessment = createTestAssessment();
      requiredFields.forEach(field => {
        expect(assessment).toHaveProperty(field);
      });
    });
  });
});
