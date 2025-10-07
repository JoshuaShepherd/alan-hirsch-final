// Auto-generated tests for UserProfiles mapper
// Generated at: 2025-01-27T10:00:00.000Z

import type { UserProfileCreate, UserProfileUpdate } from '@/lib/contracts';
import type { UserProfilesSelect } from '@/lib/types';
import { describe, expect, it } from 'vitest';
import { fromCreate, fromUpdate, toDTO } from '../user-profiles.mapper';

describe('UserProfiles Mapper', () => {
  const mockUserProfileSelect: UserProfilesSelect = {
    id: 'test-id',
    email: 'test@example.com',
    passwordHash: 'hashed-password',
    firstName: 'John',
    lastName: 'Doe',
    displayName: 'Johnny',
    bio: 'Test bio',
    avatarUrl: 'https://example.com/avatar.jpg',
    ministryRole: 'senior_pastor',
    denomination: 'Baptist',
    organizationName: 'Test Church',
    yearsInMinistry: 10,
    countryCode: 'US',
    timezone: 'America/New_York',
    languagePrimary: 'en',
    culturalContext: 'western',
    assessmentMovementAlignment: 8,
    assessmentAudienceEngagement: 7,
    assessmentContentReadiness: 9,
    assessmentRevenuePotential: 6,
    assessmentNetworkEffects: 8,
    assessmentStrategicFit: 7,
    assessmentTotal: 45,
    leaderTier: 'core',
    subdomain: 'testchurch',
    customDomain: 'testchurch.com',
    platformTitle: 'Test Church Platform',
    subscriptionTier: 'professional',
    theologicalFocus: ['evangelism', 'discipleship'],
    brandColors: {
      primary: '#000000',
      secondary: '#ffffff',
      accent: '#ff0000',
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
    createdAt: new Date('2023-01-01T00:00:00Z'),
    updatedAt: new Date('2023-01-02T00:00:00Z'),
    lastActiveAt: new Date('2023-01-03T00:00:00Z'),
  };

  const mockUserProfileCreate: UserProfileCreate = {
    email: 'test@example.com',
    passwordHash: 'hashed-password',
    firstName: 'John',
    lastName: 'Doe',
    displayName: 'Johnny',
    bio: 'Test bio',
    avatarUrl: 'https://example.com/avatar.jpg',
    ministryRole: 'senior_pastor',
    denomination: 'Baptist',
    organizationName: 'Test Church',
    yearsInMinistry: 10,
    countryCode: 'US',
    timezone: 'America/New_York',
    languagePrimary: 'en',
    culturalContext: 'western',
    assessmentMovementAlignment: 8,
    assessmentAudienceEngagement: 7,
    assessmentContentReadiness: 9,
    assessmentRevenuePotential: 6,
    assessmentNetworkEffects: 8,
    assessmentStrategicFit: 7,
    assessmentTotal: 45,
    leaderTier: 'core',
    subdomain: 'testchurch',
    customDomain: 'testchurch.com',
    platformTitle: 'Test Church Platform',
    subscriptionTier: 'professional',
    theologicalFocus: ['evangelism', 'discipleship'],
    brandColors: {
      primary: '#000000',
      secondary: '#ffffff',
      accent: '#ff0000',
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
  };

  describe('fromCreate', () => {
    it('should transform UserProfileCreate to UserProfilesInsert', () => {
      const result = fromCreate(mockUserProfileCreate);

      expect(result).toEqual({
        email: 'test@example.com',
        passwordHash: 'hashed-password',
        firstName: 'John',
        lastName: 'Doe',
        displayName: 'Johnny',
        bio: 'Test bio',
        avatarUrl: 'https://example.com/avatar.jpg',
        ministryRole: 'senior_pastor',
        denomination: 'Baptist',
        organizationName: 'Test Church',
        yearsInMinistry: 10,
        countryCode: 'US',
        timezone: 'America/New_York',
        languagePrimary: 'en',
        culturalContext: 'western',
        assessmentMovementAlignment: 8,
        assessmentAudienceEngagement: 7,
        assessmentContentReadiness: 9,
        assessmentRevenuePotential: 6,
        assessmentNetworkEffects: 8,
        assessmentStrategicFit: 7,
        assessmentTotal: 45,
        leaderTier: 'core',
        subdomain: 'testchurch',
        customDomain: 'testchurch.com',
        platformTitle: 'Test Church Platform',
        subscriptionTier: 'professional',
        theologicalFocus: ['evangelism', 'discipleship'],
        brandColors: {
          primary: '#000000',
          secondary: '#ffffff',
          accent: '#ff0000',
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
      });
    });
  });

  describe('fromUpdate', () => {
    it('should transform UserProfileUpdate to UserProfilesUpdate with id', () => {
      const updateInput: UserProfileUpdate = {
        id: 'test-id',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
      };

      const result = fromUpdate(updateInput);

      expect(result).toEqual({
        id: 'test-id',
        changes: {
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane@example.com',
          passwordHash: undefined,
          displayName: undefined,
          bio: undefined,
          avatarUrl: undefined,
          ministryRole: undefined,
          denomination: undefined,
          organizationName: undefined,
          yearsInMinistry: undefined,
          countryCode: undefined,
          timezone: undefined,
          languagePrimary: undefined,
          culturalContext: undefined,
          assessmentMovementAlignment: undefined,
          assessmentAudienceEngagement: undefined,
          assessmentContentReadiness: undefined,
          assessmentRevenuePotential: undefined,
          assessmentNetworkEffects: undefined,
          assessmentStrategicFit: undefined,
          assessmentTotal: undefined,
          leaderTier: undefined,
          subdomain: undefined,
          customDomain: undefined,
          platformTitle: undefined,
          subscriptionTier: undefined,
          theologicalFocus: undefined,
          brandColors: undefined,
          emailNotifications: undefined,
          privacySettings: undefined,
          onboardingCompleted: undefined,
          onboardingStep: undefined,
          accountStatus: undefined,
          updatedAt: undefined,
          lastActiveAt: undefined,
        },
      });
    });
  });

  describe('toDTO', () => {
    it('should transform UserProfilesSelect to UserProfileResponse', () => {
      const result = toDTO(mockUserProfileSelect);

      expect(result).toEqual({
        id: 'test-id',
        email: 'test@example.com',
        passwordHash: 'hashed-password',
        firstName: 'John',
        lastName: 'Doe',
        displayName: 'Johnny',
        bio: 'Test bio',
        avatarUrl: 'https://example.com/avatar.jpg',
        ministryRole: 'senior_pastor',
        denomination: 'Baptist',
        organizationName: 'Test Church',
        yearsInMinistry: 10,
        countryCode: 'US',
        timezone: 'America/New_York',
        languagePrimary: 'en',
        culturalContext: 'western',
        assessmentMovementAlignment: 8,
        assessmentAudienceEngagement: 7,
        assessmentContentReadiness: 9,
        assessmentRevenuePotential: 6,
        assessmentNetworkEffects: 8,
        assessmentStrategicFit: 7,
        assessmentTotal: 45,
        leaderTier: 'core',
        subdomain: 'testchurch',
        customDomain: 'testchurch.com',
        platformTitle: 'Test Church Platform',
        subscriptionTier: 'professional',
        theologicalFocus: ['evangelism', 'discipleship'],
        brandColors: {
          primary: '#000000',
          secondary: '#ffffff',
          accent: '#ff0000',
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
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-02T00:00:00.000Z',
        lastActiveAt: '2023-01-03T00:00:00.000Z',
      });
    });

    it('should normalize dates to ISO strings', () => {
      const result = toDTO(mockUserProfileSelect);

      expect(result.createdAt).toBe('2023-01-01T00:00:00.000Z');
      expect(result.updatedAt).toBe('2023-01-02T00:00:00.000Z');
      expect(result.lastActiveAt).toBe('2023-01-03T00:00:00.000Z');
    });
  });
});
