import type {
  AssessmentRow,
  CommunityRow,
  ContentItemRow,
  OrganizationMembershipRow,
  OrganizationRow,
  UserProfileRow,
} from '@/lib/contracts';
import type { OrganizationContext } from '@/lib/contracts/ministry-platform';
import {
  aggregateMinistryMetrics,
  applyRoleBasedVisibility,
  filterByPlantTerritory,
  filterByRolePermissions,
  getMinistryFieldPermissions,
  toAuthMinistryCombinedDTO,
  toMinistryAssessmentDTO,
  toMinistryCommunityDTO,
  toMinistryContentItemDTO,
  toMinistryOrganizationDTO,
  toMinistryUserProfileDTO,
  toOrganizationContextDTO,
  toOrganizationScopedDTO,
} from '@/lib/mappers/ministry-platform';
import { beforeEach, describe, expect, it } from 'vitest';

describe('Ministry Platform Mappers', () => {
  let mockUserProfile: UserProfileRow;
  let mockOrganization: OrganizationRow;
  let mockOrganizationMembership: OrganizationMembershipRow;
  let mockAssessment: AssessmentRow;
  let mockContentItem: ContentItemRow;
  let mockCommunity: CommunityRow;

  beforeEach(() => {
    // Mock user profile data
    mockUserProfile = {
      id: 'user-123',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      displayName: 'John Doe',
      avatarUrl: 'https://example.com/avatar.jpg',
      bio: 'Test bio',
      countryCode: 'US',
      timezone: 'America/New_York',
      languagePrimary: 'en',
      ministryRole: 'senior_pastor',
      leaderTier: 'core',
      subscriptionTier: 'professional',
      accountStatus: 'active',
      lastActiveAt: new Date('2024-01-01'),
      theologicalFocus: ['church_planting', 'leadership'],
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
      onboardingCompleted: true,
      onboardingStep: 5,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      // APEST scores
      assessmentMovementAlignment: 85,
      assessmentAudienceEngagement: 90,
      assessmentContentReadiness: 75,
      assessmentRevenuePotential: 80,
      assessmentStrategicFit: 88,
      assessmentTotal: 418,
    } as UserProfileRow;

    // Mock organization data
    mockOrganization = {
      id: 'org-123',
      name: 'Test Church',
      slug: 'test-church',
      description: 'A test church organization',
      website: 'https://testchurch.com',
      logoUrl: 'https://testchurch.com/logo.jpg',
      organizationType: 'church',
      sizeCategory: 'medium',
      contactEmail: 'contact@testchurch.com',
      contactPhone: '+1-555-0123',
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        country: 'US',
        postalCode: '12345',
      },
      licenseType: 'institutional',
      maxUsers: 50,
      accountOwnerId: 'user-123',
      billingEmail: 'billing@testchurch.com',
      status: 'active',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    } as OrganizationRow;

    // Mock organization membership data
    mockOrganizationMembership = {
      id: 'membership-123',
      userId: 'user-123',
      organizationId: 'org-123',
      role: 'admin',
      status: 'active',
      permissions: ['manage_users', 'manage_content', 'view_analytics'],
      joinedAt: new Date('2024-01-01'),
      invitedAt: new Date('2024-01-01'),
      invitedBy: 'user-456',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    } as OrganizationMembershipRow;

    // Mock assessment data
    mockAssessment = {
      id: 'assessment-123',
      name: 'APEST Assessment',
      slug: 'apest-assessment',
      description: 'Test APEST assessment',
      assessmentType: 'apest',
      questionsCount: 25,
      estimatedDuration: 30,
      passingScore: 70,
      version: '1.0',
      language: 'en',
      culturalAdaptation: 'western',
      researchBacked: true,
      validityScore: 0.85,
      reliabilityScore: 0.9,
      instructions: 'Complete all questions honestly',
      scoringMethod: 'likert_5',
      status: 'active',
      publishedAt: new Date('2024-01-01'),
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    } as AssessmentRow;

    // Mock content item data
    mockContentItem = {
      id: 'content-123',
      title: 'Test Content',
      slug: 'test-content',
      excerpt: 'Test excerpt',
      content: 'Test content body',
      contentType: 'article',
      format: 'text',
      status: 'published',
      visibility: 'public',
      featuredImageUrl: 'https://example.com/image.jpg',
      videoUrl: null,
      audioUrl: null,
      metaTitle: 'Test Meta Title',
      metaDescription: 'Test meta description',
      originalSource: null,
      licenseType: 'all_rights_reserved',
      authorId: 'user-123',
      primaryCategoryId: 'category-123',
      secondaryCategories: ['category-456'],
      tags: ['leadership', 'ministry'],
      theologicalThemes: ['church_planting'],
      publishedAt: new Date('2024-01-01'),
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    } as ContentItemRow;

    // Mock community data
    mockCommunity = {
      id: 'community-123',
      name: 'Test Community',
      slug: 'test-community',
      description: 'A test community',
      communityType: 'leadership_development',
      geographicFocus: ['US', 'CA'],
      culturalContext: 'western',
      languagePrimary: 'en',
      languagesSupported: ['en', 'es'],
      visibility: 'public',
      joinApprovalRequired: false,
      maxMembers: 100,
      allowGuestPosts: true,
      moderationLevel: 'moderated',
      currentMemberCount: 25,
      totalPostsCount: 150,
      guidelines: 'Be respectful and constructive',
      rules: ['No spam', 'Stay on topic'],
      createdBy: 'user-123',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    } as CommunityRow;
  });

  describe('toMinistryUserProfileDTO', () => {
    it('should map user profile to ministry user profile with all fields', () => {
      const result = toMinistryUserProfileDTO(mockUserProfile);

      expect(result.id).toBe('user-123');
      expect(result.email).toBe('test@example.com');
      expect(result.firstName).toBe('John');
      expect(result.lastName).toBe('Doe');
      expect(result.ministryRole).toBe('senior_pastor');
      expect(result.leaderTier).toBe('core');
      expect(result.subscriptionTier).toBe('professional');
      expect(result.ministryMetrics.apestScores.apostolic).toBe(85);
      expect(result.ministryMetrics.apestScores.prophetic).toBe(90);
      expect(result.networkAmplificationScore).toBeGreaterThan(0);
    });

    it('should handle null/undefined values gracefully', () => {
      const profileWithNulls = {
        ...mockUserProfile,
        displayName: null,
        avatarUrl: null,
        bio: null,
        countryCode: null,
        timezone: null,
        leaderTier: null,
        theologicalFocus: null,
        brandColors: null,
        emailNotifications: null,
        privacySettings: null,
        assessmentMovementAlignment: null,
        assessmentAudienceEngagement: null,
        assessmentContentReadiness: null,
        assessmentRevenuePotential: null,
        assessmentStrategicFit: null,
      } as UserProfileRow;

      const result = toMinistryUserProfileDTO(profileWithNulls);

      expect(result.displayName).toBe('');
      expect(result.avatarUrl).toBe('');
      expect(result.bio).toBe('');
      expect(result.countryCode).toBe('');
      expect(result.timezone).toBe('');
      expect(result.leaderTier).toBeUndefined();
      expect(result.theologicalFocus).toEqual([]);
      expect(result.brandColors).toEqual({
        primary: '#2563eb',
        secondary: '#64748b',
        accent: '#059669',
      });
      expect(result.ministryMetrics.apestScores.apostolic).toBe(0);
    });

    it('should include organization context when provided', () => {
      const organizationContext: OrganizationContext = {
        organizationId: 'org-123',
        userRole: 'admin',
        permissions: ['manage_users', 'manage_content'],
        isOwner: false,
        isAdmin: true,
        canManageUsers: true,
        canManageContent: true,
        canViewAnalytics: true,
        canManageSubscriptions: false,
      };

      const result = toMinistryUserProfileDTO(
        mockUserProfile,
        organizationContext
      );

      expect(result.organizationContext).toEqual(organizationContext);
    });
  });

  describe('toMinistryOrganizationDTO', () => {
    it('should map organization to ministry organization with all fields', () => {
      const result = toMinistryOrganizationDTO(mockOrganization, 25, 20);

      expect(result.id).toBe('org-123');
      expect(result.name).toBe('Test Church');
      expect(result.slug).toBe('test-church');
      expect(result.organizationType).toBe('church');
      expect(result.organizationMetrics.totalMembers).toBe(25);
      expect(result.organizationMetrics.activeMembers).toBe(20);
      expect(result.ministryCapacity.customBranding).toBe(false);
      expect(result.ministryCapacity.apiAccess).toBe(false);
    });

    it('should handle null/undefined values gracefully', () => {
      const orgWithNulls = {
        ...mockOrganization,
        description: null,
        website: null,
        logoUrl: null,
        sizeCategory: null,
        contactEmail: null,
        contactPhone: null,
        address: null,
        accountOwnerId: null,
        billingEmail: null,
        status: null,
      } as OrganizationRow;

      const result = toMinistryOrganizationDTO(orgWithNulls);

      expect(result.description).toBeUndefined();
      expect(result.website).toBeUndefined();
      expect(result.logoUrl).toBeUndefined();
      expect(result.sizeCategory).toBeUndefined();
      expect(result.contactEmail).toBeUndefined();
      expect(result.contactPhone).toBeUndefined();
      expect(result.address).toBeUndefined();
      expect(result.accountOwnerId).toBeUndefined();
      expect(result.billingEmail).toBeUndefined();
      expect(result.status).toBe('trial');
    });
  });

  describe('toMinistryAssessmentDTO', () => {
    it('should map assessment to ministry assessment with all fields', () => {
      const result = toMinistryAssessmentDTO(mockAssessment);

      expect(result.id).toBe('assessment-123');
      expect(result.name).toBe('APEST Assessment');
      expect(result.slug).toBe('apest-assessment');
      expect(result.assessmentType).toBe('apest');
      expect(result.questionsCount).toBe(25);
      expect(result.estimatedDuration).toBe(30);
      expect(result.status).toBe('active');
      expect(result.ministryRelevance.culturalAdaptations).toEqual(['western']);
      expect(result.usageAnalytics.totalCompletions).toBe(0);
    });

    it('should handle null/undefined values gracefully', () => {
      const assessmentWithNulls = {
        ...mockAssessment,
        description: null,
        estimatedDuration: null,
        passingScore: null,
        version: null,
        language: null,
        culturalAdaptation: null,
        researchBacked: null,
        validityScore: null,
        reliabilityScore: null,
        instructions: null,
        scoringMethod: null,
        status: null,
        publishedAt: null,
      } as AssessmentRow;

      const result = toMinistryAssessmentDTO(assessmentWithNulls);

      expect(result.description).toBe('');
      expect(result.estimatedDuration).toBeUndefined();
      expect(result.passingScore).toBeUndefined();
      expect(result.version).toBe('1.0');
      expect(result.language).toBe('en');
      expect(result.culturalAdaptation).toBe('universal');
      expect(result.researchBacked).toBe(false);
      expect(result.validityScore).toBeUndefined();
      expect(result.reliabilityScore).toBeUndefined();
      expect(result.instructions).toBe('');
      expect(result.scoringMethod).toBe('likert_5');
      expect(result.status).toBe('draft');
      expect(result.publishedAt).toBeUndefined();
    });
  });

  describe('toMinistryContentItemDTO', () => {
    it('should map content item to ministry content item with all fields', () => {
      const result = toMinistryContentItemDTO(mockContentItem);

      expect(result.id).toBe('content-123');
      expect(result.title).toBe('Test Content');
      expect(result.slug).toBe('test-content');
      expect(result.contentType).toBe('article');
      expect(result.format).toBe('text');
      expect(result.status).toBe('published');
      expect(result.visibility).toBe('public');
      expect(result.authorId).toBe('user-123');
      expect(result.ministryContext.theologicalDepth).toBe('intermediate');
      expect(result.ministryContext.practicalApplication).toBe('practical');
      expect(result.ministryImpact.ministryEffectivenessScore).toBe(0);
    });

    it('should handle null/undefined values gracefully', () => {
      const contentWithNulls = {
        ...mockContentItem,
        excerpt: null,
        content: null,
        format: null,
        status: null,
        visibility: null,
        featuredImageUrl: null,
        videoUrl: null,
        audioUrl: null,
        metaTitle: null,
        metaDescription: null,
        originalSource: null,
        licenseType: null,
        primaryCategoryId: null,
        secondaryCategories: null,
        tags: null,
        theologicalThemes: null,
        publishedAt: null,
      } as ContentItemRow;

      const result = toMinistryContentItemDTO(contentWithNulls);

      expect(result.excerpt).toBe('');
      expect(result.content).toBe('');
      expect(result.format).toBe('text');
      expect(result.status).toBe('draft');
      expect(result.visibility).toBe('public');
      expect(result.featuredImageUrl).toBeUndefined();
      expect(result.videoUrl).toBeUndefined();
      expect(result.audioUrl).toBeUndefined();
      expect(result.metaTitle).toBeUndefined();
      expect(result.metaDescription).toBeUndefined();
      expect(result.originalSource).toBeUndefined();
      expect(result.licenseType).toBe('all_rights_reserved');
      expect(result.primaryCategoryId).toBeUndefined();
      expect(result.secondaryCategories).toEqual([]);
      expect(result.tags).toEqual([]);
      expect(result.theologicalThemes).toEqual([]);
      expect(result.publishedAt).toBeUndefined();
    });
  });

  describe('toMinistryCommunityDTO', () => {
    it('should map community to ministry community with all fields', () => {
      const result = toMinistryCommunityDTO(mockCommunity);

      expect(result.id).toBe('community-123');
      expect(result.name).toBe('Test Community');
      expect(result.slug).toBe('test-community');
      expect(result.communityType).toBe('leadership_development');
      expect(result.visibility).toBe('public');
      expect(result.currentMemberCount).toBe(25);
      expect(result.totalPostsCount).toBe(150);
      expect(result.ministryContext.ministryStage).toBe('developing');
      expect(result.ministryContext.geographicScope).toBe('local');
      expect(result.ministryMetrics.activeMinistryLeaders).toBe(0);
    });

    it('should handle null/undefined values gracefully', () => {
      const communityWithNulls = {
        ...mockCommunity,
        description: null,
        geographicFocus: null,
        culturalContext: null,
        languagePrimary: null,
        languagesSupported: null,
        visibility: null,
        joinApprovalRequired: null,
        maxMembers: null,
        allowGuestPosts: null,
        moderationLevel: null,
        currentMemberCount: null,
        totalPostsCount: null,
        guidelines: null,
        rules: null,
      } as CommunityRow;

      const result = toMinistryCommunityDTO(communityWithNulls);

      expect(result.description).toBe('');
      expect(result.geographicFocus).toEqual([]);
      expect(result.culturalContext).toBe('global');
      expect(result.languagePrimary).toBe('en');
      expect(result.languagesSupported).toEqual(['en']);
      expect(result.visibility).toBe('public');
      expect(result.joinApprovalRequired).toBe(false);
      expect(result.maxMembers).toBeUndefined();
      expect(result.allowGuestPosts).toBe(false);
      expect(result.moderationLevel).toBe('moderated');
      expect(result.currentMemberCount).toBe(0);
      expect(result.totalPostsCount).toBe(0);
      expect(result.guidelines).toBeUndefined();
      expect(result.rules).toEqual([]);
    });
  });

  describe('toOrganizationContextDTO', () => {
    it('should map organization membership to organization context', () => {
      const result = toOrganizationContextDTO(mockOrganizationMembership);

      expect(result.organizationId).toBe('org-123');
      expect(result.userRole).toBe('admin');
      expect(result.permissions).toEqual([
        'manage_users',
        'manage_content',
        'view_analytics',
      ]);
      expect(result.isOwner).toBe(false);
      expect(result.isAdmin).toBe(true);
      expect(result.canManageUsers).toBe(true);
      expect(result.canManageContent).toBe(true);
      expect(result.canViewAnalytics).toBe(true);
      expect(result.canManageSubscriptions).toBe(false);
    });

    it('should handle owner role correctly', () => {
      const ownerMembership = {
        ...mockOrganizationMembership,
        role: 'owner' as const,
        permissions: [],
      };

      const result = toOrganizationContextDTO(ownerMembership);

      expect(result.isOwner).toBe(true);
      expect(result.isAdmin).toBe(true);
      expect(result.canManageUsers).toBe(true);
      expect(result.canManageContent).toBe(true);
      expect(result.canViewAnalytics).toBe(true);
      expect(result.canManageSubscriptions).toBe(true);
    });

    it('should handle member role correctly', () => {
      const memberMembership = {
        ...mockOrganizationMembership,
        role: 'member' as const,
        permissions: ['view_analytics'],
      };

      const result = toOrganizationContextDTO(memberMembership);

      expect(result.isOwner).toBe(false);
      expect(result.isAdmin).toBe(false);
      expect(result.canManageUsers).toBe(false);
      expect(result.canManageContent).toBe(false);
      expect(result.canViewAnalytics).toBe(true);
      expect(result.canManageSubscriptions).toBe(false);
    });
  });

  describe('toAuthMinistryCombinedDTO', () => {
    it('should combine auth user and ministry profile', () => {
      const authUser = { id: 'user-123', email: 'test@example.com' };
      const ministryProfile = toMinistryUserProfileDTO(mockUserProfile);
      const organizationContext: OrganizationContext = {
        organizationId: 'org-123',
        userRole: 'admin',
        permissions: ['manage_users'],
        isOwner: false,
        isAdmin: true,
        canManageUsers: true,
        canManageContent: false,
        canViewAnalytics: false,
        canManageSubscriptions: false,
      };

      const result = toAuthMinistryCombinedDTO(
        authUser,
        ministryProfile,
        organizationContext
      );

      expect(result.auth.id).toBe('user-123');
      expect(result.auth.email).toBe('test@example.com');
      expect(result.auth.isAuthenticated).toBe(true);
      expect(result.profile.id).toBe('user-123');
      expect(result.organizationContext).toEqual(organizationContext);
      expect(result.permissions).toEqual(['manage_users']);
      expect(result.ministryTier).toBe('core');
    });
  });

  describe('toOrganizationScopedDTO', () => {
    it('should wrap data with organization context', () => {
      const organizationContext: OrganizationContext = {
        organizationId: 'org-123',
        userRole: 'admin',
        permissions: ['manage_users'],
        isOwner: false,
        isAdmin: true,
        canManageUsers: true,
        canManageContent: false,
        canViewAnalytics: false,
        canManageSubscriptions: false,
      };
      const ministryProfile = toMinistryUserProfileDTO(mockUserProfile);
      const testData = { id: 'test-123', name: 'Test Data' };

      const result = toOrganizationScopedDTO(
        testData,
        organizationContext,
        ministryProfile
      );

      expect(result.data).toEqual(testData);
      expect(result.organizationContext).toEqual(organizationContext);
      expect(result.userContext.id).toBe('user-123');
      expect(result.userContext.role).toBe('admin');
      expect(result.userContext.permissions).toEqual(['manage_users']);
      expect(result.userContext.ministryTier).toBe('core');
      expect(result.accessLevel).toBe('admin');
    });
  });

  describe('filterByPlantTerritory', () => {
    it('should filter items by organization context', () => {
      const items = [
        { id: '1', organizationId: 'org-123' },
        { id: '2', organizationId: 'org-456' },
        { id: '3', organizationId: undefined },
        { id: '4', organizationId: 'org-123' },
      ];

      const organizationContext: OrganizationContext = {
        organizationId: 'org-123',
        userRole: 'admin',
        permissions: [],
        isOwner: false,
        isAdmin: true,
        canManageUsers: false,
        canManageContent: false,
        canViewAnalytics: false,
        canManageSubscriptions: false,
      };

      const result = filterByPlantTerritory(items, organizationContext);

      expect(result).toHaveLength(3);
      expect(result.map(item => item.id)).toEqual(['1', '3', '4']);
    });

    it('should return only public items when no organization context', () => {
      const items = [
        { id: '1', organizationId: 'org-123' },
        { id: '2', organizationId: 'org-456' },
        { id: '3', organizationId: undefined },
        { id: '4', organizationId: 'org-123' },
      ];

      const result = filterByPlantTerritory(items);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('3');
    });
  });

  describe('filterByRolePermissions', () => {
    it('should filter items by role permissions', () => {
      const items = [
        { id: '1', requiredPermission: 'manage_users' },
        { id: '2', requiredPermission: 'view_analytics' },
        { id: '3', requiredPermission: 'manage_content' },
        { id: '4', requiredPermission: undefined },
      ];

      const organizationContext: OrganizationContext = {
        organizationId: 'org-123',
        userRole: 'admin',
        permissions: ['manage_users', 'view_analytics'],
        isOwner: false,
        isAdmin: true,
        canManageUsers: true,
        canManageContent: false,
        canViewAnalytics: true,
        canManageSubscriptions: false,
      };

      const result = filterByRolePermissions(
        items,
        organizationContext,
        'requiredPermission'
      );

      expect(result).toHaveLength(3);
      expect(result.map(item => item.id)).toEqual(['1', '2', '4']);
    });

    it('should return all items when no organization context', () => {
      const items = [
        { id: '1', requiredPermission: 'manage_users' },
        { id: '2', requiredPermission: 'view_analytics' },
      ];

      const result = filterByRolePermissions(items);

      expect(result).toHaveLength(2);
    });
  });

  describe('applyRoleBasedVisibility', () => {
    it('should apply role-based field visibility', () => {
      const data = {
        id: 'user-123',
        email: 'test@example.com',
        subscriptionTier: 'professional',
        ministryMetrics: { apestScores: { apostolic: 85 } },
        organizationContext: { organizationId: 'org-123' },
      };

      const fieldPermissions = {
        email: ['owner', 'admin'],
        subscriptionTier: ['owner', 'admin'],
        ministryMetrics: ['owner', 'admin', 'member'],
        organizationContext: ['owner', 'admin', 'member'],
      };

      const result = applyRoleBasedVisibility(data, 'admin', fieldPermissions);

      expect(result.id).toBe('user-123');
      expect(result.email).toBe('test@example.com');
      expect(result.subscriptionTier).toBe('professional');
      expect(result.ministryMetrics).toEqual({
        apestScores: { apostolic: 85 },
      });
      expect(result.organizationContext).toEqual({ organizationId: 'org-123' });
    });

    it('should hide fields not accessible to user role', () => {
      const data = {
        id: 'user-123',
        email: 'test@example.com',
        subscriptionTier: 'professional',
        ministryMetrics: { apestScores: { apostolic: 85 } },
        organizationContext: { organizationId: 'org-123' },
      };

      const fieldPermissions = {
        email: ['owner'],
        subscriptionTier: ['owner', 'admin'],
        ministryMetrics: ['owner', 'admin', 'member'],
        organizationContext: ['owner', 'admin', 'member'],
      };

      const result = applyRoleBasedVisibility(data, 'member', fieldPermissions);

      expect(result.id).toBe('user-123');
      expect(result.email).toBeUndefined();
      expect(result.subscriptionTier).toBeUndefined();
      expect(result.ministryMetrics).toEqual({
        apestScores: { apostolic: 85 },
      });
      expect(result.organizationContext).toEqual({ organizationId: 'org-123' });
    });
  });

  describe('getMinistryFieldPermissions', () => {
    it('should return field permissions mapping', () => {
      const permissions = getMinistryFieldPermissions();

      expect(permissions).toHaveProperty('email');
      expect(permissions).toHaveProperty('subscriptionTier');
      expect(permissions).toHaveProperty('ministryMetrics');
      expect(permissions).toHaveProperty('organizationContext');
      expect(permissions['email']).toEqual(['owner', 'admin']);
      expect(permissions['ministryMetrics']).toEqual([
        'owner',
        'admin',
        'member',
      ]);
    });
  });

  describe('aggregateMinistryMetrics', () => {
    it('should aggregate ministry metrics from multiple sources', () => {
      const contentMetrics = {
        totalContentCreated: 10,
        totalViews: 1000,
        totalLikes: 50,
        totalShares: 25,
        engagementRate: 0.75,
        averageContentRating: 4.2,
      };

      const communityMetrics = {
        communitiesJoined: 3,
        postsCreated: 15,
        commentsMade: 45,
        collaborationsParticipated: 2,
        networkConnections: 30,
      };

      const learningMetrics = {
        assessmentsCompleted: 2,
        contentItemsCompleted: 8,
        learningStreak: 7,
        totalLearningTime: 120,
        certificatesEarned: 1,
      };

      const result = aggregateMinistryMetrics(
        mockUserProfile,
        contentMetrics,
        communityMetrics,
        learningMetrics
      );

      expect(result.apestScores.apostolic).toBe(85);
      expect(result.apestScores.prophetic).toBe(90);
      expect(result.contentMetrics.totalContentCreated).toBe(10);
      expect(result.contentMetrics.totalViews).toBe(1000);
      expect(result.communityMetrics.communitiesJoined).toBe(3);
      expect(result.learningMetrics.assessmentsCompleted).toBe(2);
    });

    it('should handle missing metrics gracefully', () => {
      const result = aggregateMinistryMetrics(mockUserProfile);

      expect(result.apestScores.apostolic).toBe(85);
      expect(result.contentMetrics.totalContentCreated).toBe(0);
      expect(result.communityMetrics.communitiesJoined).toBe(0);
      expect(result.learningMetrics.assessmentsCompleted).toBe(0);
    });
  });
});
