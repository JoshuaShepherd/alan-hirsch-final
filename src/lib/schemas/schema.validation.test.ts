import { describe, expect, it } from 'vitest';
import {
  // Database schemas
  databaseUserProfileSchema,
  newContentItemSchema,
  newOrganizationSchema,
  // CRUD schemas
  newUserProfileSchema,
  validateAssessment,
  validateCommunity,
  validateContentItem,
  validateOrganization,
  validateSubscriptionPlan,
  validateUserAssessment,
  // Validation helpers
  validateUserProfile,
} from './index';

// ============================================================================
// SAMPLE DATABASE DATA - Based on actual database structure
// ============================================================================

const sampleUserProfile = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  email: 'test@example.com',
  first_name: 'John',
  last_name: 'Doe',
  display_name: 'John Doe',
  bio: 'Ministry leader with 15 years of experience',
  avatar_url: 'https://example.com/avatar.jpg',
  ministry_role: 'senior_pastor',
  denomination: 'Baptist',
  organization_name: 'First Baptist Church',
  years_in_ministry: 15,
  country_code: 'US',
  timezone: 'America/New_York',
  cultural_context: 'western',
  assessment_movement_alignment: 85,
  assessment_audience_engagement: 92,
  assessment_content_readiness: 78,
  assessment_revenue_potential: 65,
  assessment_network_effects: 88,
  assessment_strategic_fit: 82,
  assessment_total: 490,
  leader_tier: 'core',
  subdomain: 'john-doe',
  custom_domain: 'johndoe.com',
  platform_title: 'John Doe Ministry',
  language_primary: 'en',
  subscription_tier: 'professional',
  theological_focus: ['leadership', 'discipleship', 'church_planting'],
  brand_colors: {
    accent: '#059669',
    primary: '#2563eb',
    secondary: '#64748b',
  },
  email_notifications: {
    dailyDigest: true,
    revenueReports: true,
    communityUpdates: true,
    collaborationRequests: true,
  },
  privacy_settings: {
    publicProfile: true,
    shareAnalytics: false,
    allowNetworking: true,
    showAssessmentResults: false,
  },
  onboarding_completed: true,
  onboarding_step: 5,
  account_status: 'active',
  created_at: '2025-01-27T10:00:00Z',
  updated_at: '2025-01-27T10:00:00Z',
  last_active_at: '2025-01-27T10:00:00Z',
};

const sampleOrganization = {
  id: '123e4567-e89b-12d3-a456-426614174001',
  name: 'First Baptist Church',
  slug: 'first-baptist-church',
  description: 'A thriving church community',
  website: 'https://firstbaptistchurch.com',
  logo_url: 'https://firstbaptistchurch.com/logo.jpg',
  organization_type: 'church',
  size_category: 'large',
  contact_email: 'info@firstbaptistchurch.com',
  contact_phone: '+1-555-123-4567',
  address: {
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zip: '12345',
    country: 'US',
  },
  billing_email: 'billing@firstbaptistchurch.com',
  account_owner_id: '123e4567-e89b-12d3-a456-426614174000',
  license_type: 'team',
  max_users: 50,
  status: 'active',
  created_at: '2025-01-27T10:00:00Z',
  updated_at: '2025-01-27T10:00:00Z',
};

const sampleContentItem = {
  id: '123e4567-e89b-12d3-a456-426614174002',
  title: 'The Art of Leadership in Ministry',
  slug: 'art-of-leadership-ministry',
  excerpt:
    'Discover the essential principles of effective leadership in ministry contexts.',
  content:
    'Leadership in ministry requires a unique blend of spiritual maturity and practical skills...',
  author_id: '123e4567-e89b-12d3-a456-426614174000',
  co_authors: [],
  content_type: 'article',
  format: 'markdown',
  word_count: 2500,
  estimated_reading_time: 10,
  view_count: 150,
  like_count: 25,
  share_count: 8,
  comment_count: 12,
  bookmark_count: 5,
  primary_category_id: '123e4567-e89b-12d3-a456-426614174003',
  secondary_categories: ['123e4567-e89b-12d3-a456-426614174004'],
  tags: ['leadership', 'ministry', 'discipleship'],
  theological_themes: ['ecclesiology', 'pneumatology'],
  // series_id and series_order are optional and should be omitted when undefined
  visibility: 'public',
  status: 'published',
  network_amplification_score: 0.75,
  cross_reference_count: 3,
  ai_enhanced: true,
  ai_summary:
    'This article explores key leadership principles for ministry contexts.',
  ai_key_points: [
    'Spiritual foundation is essential',
    'Practical skills matter',
    'Community building is crucial',
  ],
  featured_image_url: 'https://example.com/leadership-image.jpg',
  // video_url and audio_url are optional and should be omitted when undefined
  attachments: [],
  meta_title: 'Ministry Leadership: Essential Principles',
  meta_description:
    'Learn the essential principles of effective leadership in ministry.',
  canonical_url: 'https://example.com/art-of-leadership-ministry',
  // original_source and scheduled_at are optional and should be omitted when undefined
  published_at: '2025-01-27T10:00:00Z',
  license_type: 'all_rights_reserved',
  attribution_required: true,
  created_at: '2025-01-27T10:00:00Z',
  updated_at: '2025-01-27T10:00:00Z',
};

const sampleAssessment = {
  id: '123e4567-e89b-12d3-a456-426614174005',
  name: 'APEST Leadership Assessment',
  slug: 'apest-leadership-assessment',
  description:
    'Discover your primary and secondary APEST gifts for ministry leadership.',
  assessment_type: 'apest',
  questions_count: 50,
  estimated_duration: 15,
  passing_score: 70,
  validity_score: 0.89,
  reliability_score: 0.92,
  instructions:
    'Answer each question honestly based on your natural tendencies and preferences.',
  published_at: '2025-01-27T10:00:00Z',
  version: '2.1',
  language: 'en',
  cultural_adaptation: 'universal',
  research_backed: true,
  scoring_method: 'likert_5',
  status: 'active',
  created_at: '2025-01-27T10:00:00Z',
  updated_at: '2025-01-27T10:00:00Z',
};

const sampleUserAssessment = {
  id: '123e4567-e89b-12d3-a456-426614174006',
  user_id: '123e4567-e89b-12d3-a456-426614174000',
  assessment_id: '123e4567-e89b-12d3-a456-426614174005',
  started_at: '2025-01-27T10:00:00Z',
  completed_at: '2025-01-27T10:15:00Z',
  completion_percentage: 100,
  raw_scores: {
    apostolic: 85,
    prophetic: 92,
    evangelistic: 78,
    shepherding: 88,
    teaching: 82,
  },
  total_score: 425,
  max_possible_score: 500,
  apostolic_score: 85,
  prophetic_score: 92,
  evangelistic_score: 78,
  shepherding_score: 88,
  teaching_score: 82,
  normalized_scores: {
    apostolic: 0.85,
    prophetic: 0.92,
    evangelistic: 0.78,
    shepherding: 0.88,
    teaching: 0.82,
  },
  primary_gift: 'prophetic',
  secondary_gift: 'shepherding',
  response_consistency: 0.87,
  completion_time: 900,
  confidence_level: 4,
  cultural_adjustment_applied: true,
  cultural_adjustment_factor: 1.05,
  ai_insights:
    'You show strong prophetic and shepherding gifts, making you well-suited for pastoral care and spiritual guidance.',
  personalized_recommendations: {
    recommendations: [
      'Focus on developing your teaching gifts',
      'Consider mentoring opportunities',
      'Explore prophetic ministry training',
    ],
  },
  suggested_peers: [],
  complementary_gifts: ['teaching', 'apostolic'],
  created_at: '2025-01-27T10:00:00Z',
  updated_at: '2025-01-27T10:15:00Z',
};

const sampleSubscriptionPlan = {
  id: '123e4567-e89b-12d3-a456-426614174007',
  name: 'Professional Plan',
  slug: 'professional-plan',
  description: 'Perfect for ministry leaders and organizations',
  plan_type: 'professional',
  price_monthly: 29.99,
  price_annual: 299.99,
  currency: 'USD',
  content_access_level: 'premium',
  features: {
    ai_interactions: 1000,
    storage_gb: 10,
    custom_domain: true,
    analytics: true,
    priority_support: true,
  },
  max_users: 5,
  storage_limit: 10240,
  bandwidth_limit: 100000,
  stripe_product_id: 'prod_1234567890',
  stripe_price_id_monthly: 'price_1234567890_monthly',
  stripe_price_id_annual: 'price_1234567890_annual',
  is_active: true,
  is_popular: true,
  sort_order: 2,
  trial_days: 14,
  created_at: '2025-01-27T10:00:00Z',
  updated_at: '2025-01-27T10:00:00Z',
};

const sampleCommunity = {
  id: '123e4567-e89b-12d3-a456-426614174008',
  name: 'Ministry Leaders Network',
  slug: 'ministry-leaders-network',
  description: 'A community for ministry leaders to connect and share insights',
  community_type: 'professional',
  max_members: 500,
  guidelines:
    'Be respectful, share valuable insights, and support one another.',
  created_by: '123e4567-e89b-12d3-a456-426614174000',
  geographic_focus: ['North America', 'Europe'],
  cultural_context: 'western',
  language_primary: 'en',
  languages_supported: ['en', 'es', 'fr'],
  visibility: 'public',
  join_approval_required: false,
  allow_guest_posts: false,
  moderation_level: 'moderated',
  current_member_count: 125,
  total_posts_count: 340,
  rules: [
    'No spam or self-promotion',
    'Keep discussions relevant to ministry leadership',
    'Respect different denominational perspectives',
  ],
  moderators: [],
  is_active: true,
  created_at: '2025-01-27T10:00:00Z',
  updated_at: '2025-01-27T10:00:00Z',
};

// ============================================================================
// DATABASE SCHEMA VALIDATION TESTS
// ============================================================================

describe('Database Schema Validation', () => {
  describe('User Profile Schema', () => {
    it('should validate a complete user profile', () => {
      const result = validateUserProfile(sampleUserProfile);
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });

    it('should validate with validation helper function', () => {
      const result = databaseUserProfileSchema.safeParse(sampleUserProfile);
      expect(result.success).toBe(true);
    });

    it('should reject invalid email format', () => {
      const invalidProfile = { ...sampleUserProfile, email: 'invalid-email' };
      const result = validateUserProfile(invalidProfile);
      expect(result.success).toBe(false);
      expect(result.errorMessage).toContain('email');
    });

    it('should reject invalid UUID format', () => {
      const invalidProfile = { ...sampleUserProfile, id: 'invalid-uuid' };
      const result = validateUserProfile(invalidProfile);
      expect(result.success).toBe(false);
      expect(result.errorMessage).toContain('UUID');
    });

    it('should reject APEST scores outside 0-100 range', () => {
      const invalidProfile = {
        ...sampleUserProfile,
        assessment_movement_alignment: 150,
      };
      const result = validateUserProfile(invalidProfile);
      expect(result.success).toBe(false);
      expect(result.errorMessage).toContain('between 0 and 100');
    });
  });

  describe('Organization Schema', () => {
    it('should validate a complete organization', () => {
      const result = validateOrganization(sampleOrganization);
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });

    it('should reject invalid website URL', () => {
      const invalidOrg = { ...sampleOrganization, website: 'not-a-url' };
      const result = validateOrganization(invalidOrg);
      expect(result.success).toBe(false);
      expect(result.errorMessage).toContain('URL');
    });

    it('should validate with optional fields omitted', () => {
      const minimalOrg = {
        ...sampleOrganization,
        // Omit optional fields instead of setting to undefined
      };
      // Remove the optional fields
      delete (minimalOrg as any).website;
      delete (minimalOrg as any).logo_url;
      delete (minimalOrg as any).contact_phone;
      delete (minimalOrg as any).address;

      const result = validateOrganization(minimalOrg);
      expect(result.success).toBe(true);
    });
  });

  describe('Content Item Schema', () => {
    it('should validate a complete content item', () => {
      const result = validateContentItem(sampleContentItem);
      if (!result.success) {
        console.error('Validation failed:', result.errorMessage);
        console.error(
          'Sample data:',
          JSON.stringify(sampleContentItem, null, 2)
        );
      }
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });

    it('should reject invalid content type', () => {
      const invalidContent = {
        ...sampleContentItem,
        content_type: 'invalid_type',
      };
      const result = validateContentItem(invalidContent);
      expect(result.success).toBe(false);
      expect(result.errorMessage).toContain('content type');
    });

    it('should validate with omitted optional fields', () => {
      const contentWithOmitted = {
        ...sampleContentItem,
        // Omit optional fields entirely instead of setting to undefined
      };
      // Remove the optional fields that were set to undefined
      delete (contentWithOmitted as any).video_url;
      delete (contentWithOmitted as any).audio_url;
      delete (contentWithOmitted as any).series_id;
      delete (contentWithOmitted as any).series_order;
      delete (contentWithOmitted as any).original_source;
      delete (contentWithOmitted as any).scheduled_at;

      const result = validateContentItem(contentWithOmitted);
      expect(result.success).toBe(true);
    });
  });

  describe('Assessment Schema', () => {
    it('should validate a complete assessment', () => {
      const result = validateAssessment(sampleAssessment);
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });

    it('should reject invalid assessment type', () => {
      const invalidAssessment = {
        ...sampleAssessment,
        assessment_type: 'invalid_type',
      };
      const result = validateAssessment(invalidAssessment);
      expect(result.success).toBe(false);
      expect(result.errorMessage).toContain('assessment type');
    });

    it('should validate with optional fields omitted', () => {
      const minimalAssessment = {
        ...sampleAssessment,
        // Omit optional fields instead of setting to undefined
      };
      // Remove the optional fields that were set to undefined
      delete (minimalAssessment as any).passing_score;
      delete (minimalAssessment as any).validity_score;
      delete (minimalAssessment as any).reliability_score;
      delete (minimalAssessment as any).instructions;

      const result = validateAssessment(minimalAssessment);
      expect(result.success).toBe(true);
    });
  });

  describe('User Assessment Schema', () => {
    it('should validate a complete user assessment', () => {
      const result = validateUserAssessment(sampleUserAssessment);
      if (!result.success) {
        console.error(
          'User Assessment Validation failed:',
          result.errorMessage
        );
        console.error(
          'Sample data:',
          JSON.stringify(sampleUserAssessment, null, 2)
        );
      }
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });

    it('should reject APEST scores outside 0-100 range', () => {
      const invalidAssessment = {
        ...sampleUserAssessment,
        apostolic_score: 150,
      };
      const result = validateUserAssessment(invalidAssessment);
      expect(result.success).toBe(false);
      expect(result.errorMessage).toContain('between 0 and 100');
    });

    it('should validate with optional completed_at field omitted', () => {
      const incompleteAssessment = {
        ...sampleUserAssessment,
        completion_percentage: 75,
        // Omit completed_at instead of setting to undefined
      };
      delete (incompleteAssessment as any).completed_at;

      const result = validateUserAssessment(incompleteAssessment);
      expect(result.success).toBe(true);
    });
  });

  describe('Subscription Plan Schema', () => {
    it('should validate a complete subscription plan', () => {
      const result = validateSubscriptionPlan(sampleSubscriptionPlan);
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });

    it('should reject negative prices', () => {
      const invalidPlan = { ...sampleSubscriptionPlan, price_monthly: -10 };
      const result = validateSubscriptionPlan(invalidPlan);
      expect(result.success).toBe(false);
      expect(result.errorMessage).toContain('greater than or equal to 0');
    });

    it('should validate with optional Stripe fields omitted', () => {
      const planWithoutStripe = {
        ...sampleSubscriptionPlan,
        // Omit optional Stripe fields instead of setting to undefined
      };
      // Remove the optional Stripe fields
      delete (planWithoutStripe as any).stripe_product_id;
      delete (planWithoutStripe as any).stripe_price_id_monthly;
      delete (planWithoutStripe as any).stripe_price_id_annual;

      const result = validateSubscriptionPlan(planWithoutStripe);
      expect(result.success).toBe(true);
    });
  });

  describe('Community Schema', () => {
    it('should validate a complete community', () => {
      const result = validateCommunity(sampleCommunity);
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });

    it('should reject invalid visibility setting', () => {
      const invalidCommunity = {
        ...sampleCommunity,
        visibility: 'invalid_visibility',
      };
      const result = validateCommunity(invalidCommunity);
      expect(result.success).toBe(false);
      expect(result.errorMessage).toContain('visibility');
    });

    it('should validate with default values omitted', () => {
      const minimalCommunity = {
        ...sampleCommunity,
        // Omit optional fields instead of setting to undefined
      };
      // Remove the optional fields that have defaults
      delete (minimalCommunity as any).guidelines;
      delete (minimalCommunity as any).geographic_focus;
      delete (minimalCommunity as any).rules;
      delete (minimalCommunity as any).moderators;

      const result = validateCommunity(minimalCommunity);
      expect(result.success).toBe(true);
    });
  });
});

// ============================================================================
// CRUD SCHEMA VALIDATION TESTS
// ============================================================================

describe('CRUD Schema Validation', () => {
  describe('New Entity Schemas', () => {
    it('should validate new user profile without timestamps', () => {
      const newProfile = { ...sampleUserProfile };
      delete (newProfile as any).id;
      delete (newProfile as any).created_at;
      delete (newProfile as any).updated_at;
      delete (newProfile as any).last_active_at;

      const result = newUserProfileSchema.safeParse(newProfile);
      expect(result.success).toBe(true);
    });

    it('should validate new organization without timestamps', () => {
      const newOrg = { ...sampleOrganization };
      delete (newOrg as any).id;
      delete (newOrg as any).created_at;
      delete (newOrg as any).updated_at;

      const result = newOrganizationSchema.safeParse(newOrg);
      expect(result.success).toBe(true);
    });

    it('should validate new content item without timestamps', () => {
      const newContent = { ...sampleContentItem };
      delete (newContent as any).id;
      delete (newContent as any).created_at;
      delete (newContent as any).updated_at;

      const result = newContentItemSchema.safeParse(newContent);
      expect(result.success).toBe(true);
    });
  });

  describe('Partial Update Schemas', () => {
    it('should validate partial user profile update', () => {
      const updateData = {
        first_name: 'Jane',
        last_name: 'Smith',
        bio: 'Updated bio',
      };

      const result = newUserProfileSchema.partial().safeParse(updateData);
      expect(result.success).toBe(true);
    });

    it('should validate partial organization update', () => {
      const updateData = {
        name: 'Updated Organization Name',
        description: 'Updated description',
      };

      const result = newOrganizationSchema.partial().safeParse(updateData);
      expect(result.success).toBe(true);
    });
  });
});

// ============================================================================
// EDGE CASE TESTS
// ============================================================================

describe('Edge Cases and Error Handling', () => {
  it('should handle empty objects', () => {
    const result = validateUserProfile({});
    expect(result.success).toBe(false);
    expect(result.errorMessage).toBeDefined();
  });

  it('should handle null values', () => {
    const result = validateUserProfile(null);
    expect(result.success).toBe(false);
  });

  it('should handle undefined values', () => {
    const result = validateUserProfile(undefined);
    expect(result.success).toBe(false);
  });

  it('should handle arrays with mixed valid/invalid data', () => {
    const mixedData = [
      sampleUserProfile,
      { ...sampleUserProfile, email: 'invalid-email' },
      sampleUserProfile,
    ];

    // This would test batch validation if implemented
    const results = mixedData.map(data => validateUserProfile(data));
    expect(results[0].success).toBe(true);
    expect(results[1].success).toBe(false);
    expect(results[2].success).toBe(true);
  });

  it('should validate JSONB fields with complex objects', () => {
    const complexJsonbProfile = {
      ...sampleUserProfile,
      brand_colors: {
        primary: '#2563eb',
        secondary: '#64748b',
        accent: '#059669',
        tertiary: '#f59e0b',
        custom: {
          gradient: 'linear-gradient(45deg, #2563eb, #059669)',
          opacity: 0.8,
        },
      },
      privacy_settings: {
        publicProfile: true,
        showAssessmentResults: false,
        allowNetworking: true,
        shareAnalytics: false,
        advanced: {
          allowDirectMessages: true,
          showOnlineStatus: false,
          allowProfileViews: true,
        },
      },
    };

    const result = validateUserProfile(complexJsonbProfile);
    expect(result.success).toBe(true);
  });
});
