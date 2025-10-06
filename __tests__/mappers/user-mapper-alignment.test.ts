import type { CreateUserProfile, UpdateUserProfile } from '@platform/contracts';
import type { UserProfile } from '@platform/database';
import { describe, expect, it } from 'vitest';

// Import the actual mapper functions
import {
  fromCreateUserProfile,
  fromUpdateUserProfile,
  getAPESTProfile,
  getUserDisplayName,
  isUserProfileComplete,
  toUserProfileEntity,
  toUserProfileResponseDTO,
} from '../../apps/alan-hirsch-platform/lib/mappers/user';

describe('User Mapper Alignment Tests', () => {
  // Mock database row that matches the actual UserProfile type
  const mockUserProfileRow: UserProfile = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    email: 'test@example.com',
    passwordHash: 'hashed_password',
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
    assessmentMovementAlignment: 85,
    assessmentAudienceEngagement: 72,
    assessmentContentReadiness: 90,
    assessmentRevenuePotential: 68,
    assessmentNetworkEffects: 78,
    assessmentStrategicFit: 82,
    assessmentTotal: 475,
    leaderTier: 'core',
    subdomain: 'john-doe',
    customDomain: 'johndoe.com',
    platformTitle: 'John Doe Ministry',
    subscriptionTier: 'professional',
    theologicalFocus: ['missional', 'apostolic'],
    brandColors: {
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#059669',
    },
    emailNotifications: {
      dailyDigest: true,
      collaborationRequests: true,
      revenueReports: true,
      communityUpdates: false,
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
    updatedAt: new Date('2023-12-01T00:00:00Z'),
    lastActiveAt: new Date('2023-12-01T12:00:00Z'),
  };

  const mockUserProfileWithRelations = {
    ...mockUserProfileRow,
    organization: {
      id: '123e4567-e89b-12d3-a456-426614174002',
      name: 'Test Organization',
      slug: 'test-org',
      type: 'church',
    },
    subscription: {
      id: '123e4567-e89b-12d3-a456-426614174003',
      planName: 'Professional Plan',
      status: 'active',
      tier: 'professional',
    },
  };

  describe('toUserProfileEntity', () => {
    it('should transform database row to UserProfileEntity correctly', () => {
      const result = toUserProfileEntity(mockUserProfileRow);

      expect(result).toMatchObject({
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
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
        assessmentMovementAlignment: 85,
        assessmentAudienceEngagement: 72,
        assessmentContentReadiness: 90,
        assessmentRevenuePotential: 68,
        assessmentNetworkEffects: 78,
        assessmentStrategicFit: 82,
        assessmentTotal: 475,
        leaderTier: 'core',
        subdomain: 'john-doe',
        customDomain: 'johndoe.com',
        platformTitle: 'John Doe Ministry',
        subscriptionTier: 'professional',
        theologicalFocus: ['missional', 'apostolic'],
        onboardingCompleted: true,
        onboardingStep: 5,
        accountStatus: 'active',
      });

      // Validate timestamps are ISO strings
      expect(result.createdAt).toBe('2023-01-01T00:00:00.000Z');
      expect(result.updatedAt).toBe('2023-12-01T00:00:00.000Z');
      expect(result.lastActiveAt).toBe('2023-12-01T12:00:00.000Z');

      // Validate complex objects
      expect(result.brandColors).toEqual({
        primary: '#2563eb',
        secondary: '#64748b',
        accent: '#059669',
      });

      expect(result.emailNotifications).toEqual({
        dailyDigest: true,
        collaborationRequests: true,
        revenueReports: true,
        communityUpdates: false,
      });

      expect(result.privacySettings).toEqual({
        publicProfile: true,
        showAssessmentResults: false,
        allowNetworking: true,
        shareAnalytics: false,
      });
    });

    it('should handle null and undefined values correctly', () => {
      const rowWithNulls: UserProfile = {
        ...mockUserProfileRow,
        displayName: null,
        bio: null,
        avatarUrl: null,
        denomination: null,
        organizationName: null,
        yearsInMinistry: null,
        countryCode: null,
        timezone: null,
        culturalContext: null,
        assessmentMovementAlignment: null,
        assessmentAudienceEngagement: null,
        assessmentContentReadiness: null,
        assessmentRevenuePotential: null,
        assessmentNetworkEffects: null,
        assessmentStrategicFit: null,
        assessmentTotal: null,
        leaderTier: null,
        subdomain: null,
        customDomain: null,
        platformTitle: null,
      };

      const result = toUserProfileEntity(rowWithNulls);

      expect(result.displayName).toBeUndefined();
      expect(result.bio).toBeUndefined();
      expect(result.avatarUrl).toBeUndefined();
      expect(result.denomination).toBeUndefined();
      expect(result.organizationName).toBeUndefined();
      expect(result.yearsInMinistry).toBeUndefined();
      expect(result.countryCode).toBeUndefined();
      expect(result.timezone).toBeUndefined();
      expect(result.culturalContext).toBeUndefined();
      expect(result.assessmentMovementAlignment).toBeUndefined();
      expect(result.assessmentAudienceEngagement).toBeUndefined();
      expect(result.assessmentContentReadiness).toBeUndefined();
      expect(result.assessmentRevenuePotential).toBeUndefined();
      expect(result.assessmentNetworkEffects).toBeUndefined();
      expect(result.assessmentStrategicFit).toBeUndefined();
      expect(result.assessmentTotal).toBeUndefined();
      expect(result.leaderTier).toBeUndefined();
      expect(result.subdomain).toBeUndefined();
      expect(result.customDomain).toBeUndefined();
      expect(result.platformTitle).toBeUndefined();
    });

    it('should provide default values for complex objects', () => {
      const rowWithNullObjects: UserProfile = {
        ...mockUserProfileRow,
        theologicalFocus: null,
        brandColors: null,
        emailNotifications: null,
        privacySettings: null,
      };

      const result = toUserProfileEntity(rowWithNullObjects);

      expect(result.theologicalFocus).toEqual([]);
      expect(result.brandColors).toEqual({
        accent: '#059669',
        primary: '#2563eb',
        secondary: '#64748b',
      });
      expect(result.emailNotifications).toEqual({
        dailyDigest: true,
        revenueReports: true,
        communityUpdates: true,
        collaborationRequests: true,
      });
      expect(result.privacySettings).toEqual({
        publicProfile: true,
        shareAnalytics: false,
        allowNetworking: true,
        showAssessmentResults: false,
      });
    });
  });

  describe('toUserProfileResponseDTO', () => {
    it('should transform database row with relations to UserProfileResponse', () => {
      const result = toUserProfileResponseDTO(mockUserProfileWithRelations);

      // Validate base entity fields
      expect(result.id).toBe('123e4567-e89b-12d3-a456-426614174000');
      expect(result.email).toBe('test@example.com');
      expect(result.firstName).toBe('John');
      expect(result.lastName).toBe('Doe');

      // Validate computed fields
      expect(result.isActive).toBe(true);
      expect(result.hasCompletedOnboarding).toBe(true);
      expect(result.fullName).toBe('John Doe');
      expect(result.displayNameOrFullName).toBe('Johnny');
      expect(result.hasCustomDomain).toBe(true);
      expect(result.hasSubdomain).toBe(true);
      expect(result.isPublicProfile).toBe(true);
      expect(result.canReceiveNotifications).toBe(true);
      expect(result.assessmentCompleted).toBe(true);

      // Validate APEST gift calculation
      expect(result.primaryGift).toBe('teaching'); // Highest score (90)
      expect(result.secondaryGift).toBe('apostolic'); // Second highest (85)

      // Validate ministry experience formatting
      expect(result.ministryExperience).toBe('10 years in ministry');

      // Validate location display
      expect(result.locationDisplay).toBe('US (America/New_York)');

      // Validate related data
      expect(result.organization).toEqual({
        id: '123e4567-e89b-12d3-a456-426614174002',
        name: 'Test Organization',
        slug: 'test-org',
        type: 'church',
      });

      expect(result.subscription).toEqual({
        id: '123e4567-e89b-12d3-a456-426614174003',
        planName: 'Professional Plan',
        status: 'active',
        tier: 'professional',
      });
    });

    it('should handle missing related data', () => {
      const result = toUserProfileResponseDTO(mockUserProfileRow);

      expect(result.organization).toBeUndefined();
      expect(result.subscription).toBeUndefined();
    });

    it('should calculate APEST gifts correctly with different scores', () => {
      const rowWithDifferentScores = {
        ...mockUserProfileRow,
        assessmentMovementAlignment: 95, // Highest
        assessmentAudienceEngagement: 88, // Second highest
        assessmentContentReadiness: 75,
        assessmentRevenuePotential: 60,
        assessmentNetworkEffects: 70,
        assessmentStrategicFit: 65,
      };

      const result = toUserProfileResponseDTO(rowWithDifferentScores);

      expect(result.primaryGift).toBe('apostolic'); // Highest score (95)
      expect(result.secondaryGift).toBe('prophetic'); // Second highest (88)
    });

    it('should handle missing years in ministry', () => {
      const rowWithoutYears = {
        ...mockUserProfileRow,
        yearsInMinistry: null,
      };

      const result = toUserProfileResponseDTO(rowWithoutYears);

      expect(result.ministryExperience).toBeUndefined();
    });

    it('should handle singular year in ministry', () => {
      const rowWithOneYear = {
        ...mockUserProfileRow,
        yearsInMinistry: 1,
      };

      const result = toUserProfileResponseDTO(rowWithOneYear);

      expect(result.ministryExperience).toBe('1 year in ministry');
    });
  });

  describe('fromCreateUserProfile', () => {
    it('should transform CreateUserProfile to database insert format', () => {
      const createData: CreateUserProfile = {
        email: 'newuser@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        displayName: 'Jane S.',
        bio: 'New user bio',
        avatarUrl: 'https://example.com/jane.jpg',
        ministryRole: 'church_planter',
        denomination: 'Methodist',
        organizationName: 'New Church',
        yearsInMinistry: 5,
        countryCode: 'CA',
        timezone: 'America/Toronto',
        culturalContext: 'western',
        leaderTier: 'emerging',
        subdomain: 'jane-smith',
        customDomain: 'janesmith.com',
        platformTitle: 'Jane Smith Ministry',
        languagePrimary: 'en',
        subscriptionTier: 'individual',
        theologicalFocus: ['evangelistic', 'missional'],
        brandColors: {
          primary: '#10b981',
          secondary: '#6b7280',
          accent: '#f59e0b',
        },
        emailNotifications: {
          dailyDigest: false,
          collaborationRequests: true,
          revenueReports: true,
          communityUpdates: true,
        },
        privacySettings: {
          publicProfile: false,
          showAssessmentResults: true,
          allowNetworking: false,
          shareAnalytics: true,
        },
        onboardingCompleted: false,
        onboardingStep: 1,
        accountStatus: 'pending_verification',
      };

      const result = fromCreateUserProfile(createData);

      expect(result).toMatchObject({
        email: 'newuser@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        displayName: 'Jane S.',
        bio: 'New user bio',
        avatarUrl: 'https://example.com/jane.jpg',
        ministryRole: 'church_planter',
        denomination: 'Methodist',
        organizationName: 'New Church',
        yearsInMinistry: 5,
        countryCode: 'CA',
        timezone: 'America/Toronto',
        culturalContext: 'western',
        leaderTier: 'emerging',
        subdomain: 'jane-smith',
        customDomain: 'janesmith.com',
        platformTitle: 'Jane Smith Ministry',
        languagePrimary: 'en',
        subscriptionTier: 'individual',
        theologicalFocus: ['evangelistic', 'missional'],
        onboardingCompleted: false,
        onboardingStep: 1,
        accountStatus: 'pending_verification',
      });

      expect(result.brandColors).toEqual({
        primary: '#10b981',
        secondary: '#6b7280',
        accent: '#f59e0b',
      });

      expect(result.emailNotifications).toEqual({
        dailyDigest: false,
        collaborationRequests: true,
        revenueReports: true,
        communityUpdates: true,
      });

      expect(result.privacySettings).toEqual({
        publicProfile: false,
        showAssessmentResults: true,
        allowNetworking: false,
        shareAnalytics: true,
      });
    });

    it('should handle null values by converting to null', () => {
      const createDataWithNulls: CreateUserProfile = {
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        ministryRole: 'senior_pastor',
        displayName: null,
        bio: null,
        avatarUrl: null,
        denomination: null,
        organizationName: null,
        yearsInMinistry: null,
        countryCode: null,
        timezone: null,
        culturalContext: null,
        leaderTier: null,
        subdomain: null,
        customDomain: null,
        platformTitle: null,
      };

      const result = fromCreateUserProfile(createDataWithNulls);

      expect(result.displayName).toBeNull();
      expect(result.bio).toBeNull();
      expect(result.avatarUrl).toBeNull();
      expect(result.denomination).toBeNull();
      expect(result.organizationName).toBeNull();
      expect(result.yearsInMinistry).toBeNull();
      expect(result.countryCode).toBeNull();
      expect(result.timezone).toBeNull();
      expect(result.culturalContext).toBeNull();
      expect(result.leaderTier).toBeNull();
      expect(result.subdomain).toBeNull();
      expect(result.customDomain).toBeNull();
      expect(result.platformTitle).toBeNull();
    });
  });

  describe('fromUpdateUserProfile', () => {
    it('should transform UpdateUserProfile to database update format', () => {
      const updateData: UpdateUserProfile = {
        firstName: 'Updated',
        lastName: 'Name',
        displayName: 'Updated Display',
        bio: 'Updated bio',
        ministryRole: 'associate_pastor',
        yearsInMinistry: 15,
        subscriptionTier: 'leader',
        accountStatus: 'active',
      };

      const result = fromUpdateUserProfile(updateData);

      expect(result).toMatchObject({
        firstName: 'Updated',
        lastName: 'Name',
        displayName: 'Updated Display',
        bio: 'Updated bio',
        ministryRole: 'associate_pastor',
        yearsInMinistry: 15,
        subscriptionTier: 'leader',
        accountStatus: 'active',
      });

      // Should always update the updated_at timestamp
      expect(result.updatedAt).toBeInstanceOf(Date);
    });

    it('should only include defined fields in update', () => {
      const updateData: UpdateUserProfile = {
        firstName: 'Only First Name',
      };

      const result = fromUpdateUserProfile(updateData);

      expect(result.firstName).toBe('Only First Name');
      expect(result.lastName).toBeUndefined();
      expect(result.email).toBeUndefined();
      expect(result.updatedAt).toBeInstanceOf(Date);
    });

    it('should convert null values to null for database', () => {
      const updateData: UpdateUserProfile = {
        displayName: null,
        bio: null,
        denomination: null,
        yearsInMinistry: null,
      };

      const result = fromUpdateUserProfile(updateData);

      expect(result.displayName).toBeNull();
      expect(result.bio).toBeNull();
      expect(result.denomination).toBeNull();
      expect(result.yearsInMinistry).toBeNull();
    });
  });

  describe('Utility Functions', () => {
    describe('isUserProfileComplete', () => {
      it('should return true for complete profile', () => {
        const completeProfile = toUserProfileResponseDTO(
          mockUserProfileWithRelations
        );
        expect(isUserProfileComplete(completeProfile)).toBe(true);
      });

      it('should return false for incomplete profile', () => {
        const incompleteProfile = toUserProfileResponseDTO({
          ...mockUserProfileRow,
          firstName: 'Test',
          lastName: 'User',
          ministryRole: 'senior_pastor',
          onboardingCompleted: false,
        });
        expect(isUserProfileComplete(incompleteProfile)).toBe(false);
      });
    });

    describe('getUserDisplayName', () => {
      it('should return displayName when available', () => {
        const profile = toUserProfileResponseDTO(mockUserProfileWithRelations);
        expect(getUserDisplayName(profile)).toBe('Johnny');
      });

      it('should return fullName when displayName is not available', () => {
        const profile = toUserProfileResponseDTO({
          ...mockUserProfileRow,
          displayName: null,
        });
        expect(getUserDisplayName(profile)).toBe('John Doe');
      });
    });

    describe('getAPESTProfile', () => {
      it('should return APEST profile when assessment is completed', () => {
        const profile = toUserProfileResponseDTO(mockUserProfileWithRelations);
        const apestProfile = getAPESTProfile(profile);

        expect(apestProfile).not.toBeNull();
        expect(apestProfile?.primary).toBe('teaching');
        expect(apestProfile?.secondary).toBe('apostolic');
        expect(apestProfile?.scores).toEqual({
          apostolic: 85,
          prophetic: 72,
          evangelistic: 78,
          shepherding: 82,
          teaching: 90,
        });
      });

      it('should return null when assessment is not completed', () => {
        const profile = toUserProfileResponseDTO({
          ...mockUserProfileRow,
          assessmentTotal: null,
        });
        const apestProfile = getAPESTProfile(profile);
        expect(apestProfile).toBeNull();
      });
    });
  });
});
