// Contracts Layer Tests
// Tests the Zod validation schemas and API contracts

import {
  assessmentEntitySchema,
  organizationEntitySchema,
  userprofileEntitySchema,
} from '@platform/contracts';
import { describe, expect, test } from 'vitest';
import {
  createTestAssessment,
  createTestOrganization,
  createTestUserProfile,
  validateSchema,
} from './test-setup';

describe('Contracts Layer', () => {
  describe('Schema Exports', () => {
    test('all entity schemas are exported', () => {
      expect(userprofileEntitySchema).toBeDefined();
      expect(organizationEntitySchema).toBeDefined();
      expect(assessmentEntitySchema).toBeDefined();

      // Verify they are Zod schemas
      expect(userprofileEntitySchema.parse).toBeDefined();
      expect(organizationEntitySchema.parse).toBeDefined();
      expect(assessmentEntitySchema.parse).toBeDefined();

      expect(typeof userprofileEntitySchema.parse).toBe('function');
      expect(typeof organizationEntitySchema.parse).toBe('function');
      expect(typeof assessmentEntitySchema.parse).toBe('function');
    });
  });

  describe('UserProfile Entity Schema', () => {
    test('validates correct user profile data', () => {
      const validUserProfile = {
        id: 'user-123',
        email: 'test@example.com',
        passwordHash: null,
        firstName: 'John',
        lastName: 'Doe',
        displayName: null,
        bio: null,
        avatarUrl: null,
        ministryRole: 'senior_pastor',
        denomination: null,
        organizationName: null,
        yearsInMinistry: null,
        countryCode: null,
        timezone: null,
        languagePrimary: 'en',
        culturalContext: null,
        subscriptionTier: 'free',
        accountStatus: 'active',
        lastActiveAt: null,
        createdAt: new Date('2023-01-01T00:00:00Z'),
        updatedAt: new Date('2023-01-01T00:00:00Z'),
      };

      validateSchema(userprofileEntitySchema, validUserProfile);
    });

    test('rejects invalid user profile data', () => {
      const invalidUserProfile = {
        id: 'invalid-uuid', // Invalid UUID
        email: 'not-an-email', // Invalid email
        firstName: '', // Empty string
        lastName: '', // Empty string
        ministryRole: 'invalid_role', // Invalid enum value
      };

      const result = userprofileEntitySchema.safeParse(invalidUserProfile);
      expect(result.success).toBe(false);

      if (!result.success) {
        expect(result.error.issues).toHaveLength(5); // Should have 5 validation errors
      }
    });

    test('validates ministryRole enum values', () => {
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

      validRoles.forEach(role => {
        const userProfile = {
          ...createTestUserProfile(),
          ministryRole: role,
        };

        const result = userprofileEntitySchema.safeParse(userProfile);
        expect(result.success).toBe(true);
      });
    });

    test('validates culturalContext enum values', () => {
      const validContexts = [
        'western',
        'eastern',
        'african',
        'latin_american',
        'middle_eastern',
        'oceanic',
        'mixed',
        'global',
      ];

      validContexts.forEach(context => {
        const userProfile = {
          ...createTestUserProfile(),
          culturalContext: context,
        };

        const result = userprofileEntitySchema.safeParse(userProfile);
        expect(result.success).toBe(true);
      });
    });

    test('validates subscriptionTier enum values', () => {
      const validTiers = [
        'free',
        'individual',
        'professional',
        'leader',
        'institutional',
      ];

      validTiers.forEach(tier => {
        const userProfile = {
          ...createTestUserProfile(),
          subscriptionTier: tier,
        };

        const result = userprofileEntitySchema.safeParse(userProfile);
        expect(result.success).toBe(true);
      });
    });

    test('validates accountStatus enum values', () => {
      const validStatuses = ['active', 'suspended', 'pending', 'archived'];

      validStatuses.forEach(status => {
        const userProfile = {
          ...createTestUserProfile(),
          accountStatus: status,
        };

        const result = userprofileEntitySchema.safeParse(userProfile);
        expect(result.success).toBe(true);
      });
    });

    test('validates email format', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'admin+test@company.org',
      ];

      const invalidEmails = [
        'not-an-email',
        '@domain.com',
        'user@',
        'user.domain.com',
      ];

      validEmails.forEach(email => {
        const userProfile = {
          ...createTestUserProfile(),
          email,
        };

        const result = userprofileEntitySchema.safeParse(userProfile);
        expect(result.success).toBe(true);
      });

      invalidEmails.forEach(email => {
        const userProfile = {
          ...createTestUserProfile(),
          email,
        };

        const result = userprofileEntitySchema.safeParse(userProfile);
        expect(result.success).toBe(false);
      });
    });

    test('validates UUID format', () => {
      const validUuids = [
        '550e8400-e29b-41d4-a716-446655440000',
        '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
      ];

      const invalidUuids = ['not-a-uuid', '123', '550e8400-e29b-41d4-a716'];

      validUuids.forEach(uuid => {
        const userProfile = {
          ...createTestUserProfile(),
          id: uuid,
        };

        const result = userprofileEntitySchema.safeParse(userProfile);
        expect(result.success).toBe(true);
      });

      invalidUuids.forEach(uuid => {
        const userProfile = {
          ...createTestUserProfile(),
          id: uuid,
        };

        const result = userprofileEntitySchema.safeParse(userProfile);
        expect(result.success).toBe(false);
      });
    });

    test('validates URL format for avatarUrl', () => {
      const validUrls = [
        'https://example.com/avatar.jpg',
        'http://cdn.example.com/images/user.png',
        'https://storage.googleapis.com/avatars/user123.jpg',
      ];

      const invalidUrls = [
        'not-a-url',
        'ftp://example.com/image.jpg',
        'just-a-string',
      ];

      validUrls.forEach(url => {
        const userProfile = {
          ...createTestUserProfile(),
          avatarUrl: url,
        };

        const result = userprofileEntitySchema.safeParse(userProfile);
        expect(result.success).toBe(true);
      });

      invalidUrls.forEach(url => {
        const userProfile = {
          ...createTestUserProfile(),
          avatarUrl: url,
        };

        const result = userprofileEntitySchema.safeParse(userProfile);
        expect(result.success).toBe(false);
      });
    });

    test('handles nullable fields correctly', () => {
      const userProfile = {
        ...createTestUserProfile(),
        passwordHash: null,
        displayName: null,
        bio: null,
        avatarUrl: null,
        denomination: null,
        organizationName: null,
        yearsInMinistry: null,
        countryCode: null,
        timezone: null,
        culturalContext: null,
        lastActiveAt: null,
      };

      const result = userprofileEntitySchema.safeParse(userProfile);
      expect(result.success).toBe(true);
    });

    test('validates required string fields are not empty', () => {
      const userProfile = {
        ...createTestUserProfile(),
        firstName: '',
        lastName: '',
      };

      const result = userprofileEntitySchema.safeParse(userProfile);
      expect(result.success).toBe(false);

      if (!result.success) {
        const errors = result.error.issues.map(issue => issue.path.join('.'));
        expect(errors).toContain('firstName');
        expect(errors).toContain('lastName');
      }
    });
  });

  describe('Organization Entity Schema', () => {
    test('validates correct organization data', () => {
      const validOrganization = {
        id: 'org-123',
        name: 'Test Organization',
        slug: 'test-org',
        description: null,
        website: null,
        logoUrl: null,
        organizationType: 'church',
        countryCode: null,
        timezone: null,
        languagePrimary: 'en',
        culturalContext: null,
        isActive: true,
        createdAt: new Date('2023-01-01T00:00:00Z'),
        updatedAt: new Date('2023-01-01T00:00:00Z'),
      };

      validateSchema(organizationEntitySchema, validOrganization);
    });

    test('rejects invalid organization data', () => {
      const invalidOrganization = {
        id: 'invalid-uuid',
        name: '', // Empty name
        slug: '', // Empty slug
        organizationType: 'invalid_type',
      };

      const result = organizationEntitySchema.safeParse(invalidOrganization);
      expect(result.success).toBe(false);
    });

    test('validates organizationType enum values', () => {
      const validTypes = [
        'church',
        'denomination',
        'seminary',
        'nonprofit',
        'business',
        'other',
      ];

      validTypes.forEach(type => {
        const organization = {
          ...createTestOrganization(),
          organizationType: type,
        };

        const result = organizationEntitySchema.safeParse(organization);
        expect(result.success).toBe(true);
      });
    });

    test('validates slug format', () => {
      const validSlugs = [
        'test-org',
        'my-organization',
        'church-123',
        'org_with_underscores',
      ];

      const invalidSlugs = [
        '', // Empty
        ' ', // Space
        'Test Org', // Space and capital
        'test@org', // Special character
      ];

      validSlugs.forEach(slug => {
        const organization = {
          ...createTestOrganization(),
          slug,
        };

        const result = organizationEntitySchema.safeParse(organization);
        expect(result.success).toBe(true);
      });

      invalidSlugs.forEach(slug => {
        const organization = {
          ...createTestOrganization(),
          slug,
        };

        const result = organizationEntitySchema.safeParse(organization);
        expect(result.success).toBe(false);
      });
    });
  });

  describe('Assessment Entity Schema', () => {
    test('validates correct assessment data', () => {
      const validAssessment = {
        id: 'assessment-123',
        name: 'Test Assessment',
        slug: 'test-assessment',
        description: null,
        assessmentType: 'spiritual_gifts',
        isActive: true,
        createdAt: new Date('2023-01-01T00:00:00Z'),
        updatedAt: new Date('2023-01-01T00:00:00Z'),
      };

      validateSchema(assessmentEntitySchema, validAssessment);
    });

    test('rejects invalid assessment data', () => {
      const invalidAssessment = {
        id: 'invalid-uuid',
        name: '', // Empty name
        slug: '', // Empty slug
        assessmentType: 'invalid_type',
      };

      const result = assessmentEntitySchema.safeParse(invalidAssessment);
      expect(result.success).toBe(false);
    });

    test('validates assessmentType enum values', () => {
      const validTypes = [
        'spiritual_gifts',
        'leadership_style',
        'ministry_fit',
        'cultural_competency',
        'custom',
      ];

      validTypes.forEach(type => {
        const assessment = {
          ...createTestAssessment(),
          assessmentType: type,
        };

        const result = assessmentEntitySchema.safeParse(assessment);
        expect(result.success).toBe(true);
      });
    });
  });

  describe('Schema Coverage', () => {
    test('all exported schemas are valid Zod schemas', () => {
      const schemas = [
        userprofileEntitySchema,
        organizationEntitySchema,
        assessmentEntitySchema,
      ];

      schemas.forEach(schema => {
        expect(schema).toBeDefined();
        expect(schema.parse).toBeDefined();
        expect(schema.safeParse).toBeDefined();
        expect(schema.parseAsync).toBeDefined();
        expect(schema.safeParseAsync).toBeDefined();
        expect(typeof schema.parse).toBe('function');
        expect(typeof schema.safeParse).toBe('function');
      });
    });

    test('schemas handle edge cases correctly', () => {
      // Test with minimal required data
      const minimalUserProfile = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        ministryRole: 'senior_pastor',
      };

      const result = userprofileEntitySchema.safeParse(minimalUserProfile);
      expect(result.success).toBe(true);
    });

    test('schemas provide meaningful error messages', () => {
      const invalidData = {
        id: 'invalid',
        email: 'not-an-email',
        firstName: '',
        lastName: '',
        ministryRole: 'invalid_role',
      };

      const result = userprofileEntitySchema.safeParse(invalidData);
      expect(result.success).toBe(false);

      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(0);
        result.error.issues.forEach(issue => {
          expect(issue.message).toBeDefined();
          expect(typeof issue.message).toBe('string');
          expect(issue.path).toBeDefined();
          expect(Array.isArray(issue.path)).toBe(true);
        });
      }
    });
  });

  describe('Type Safety', () => {
    test('parsed data matches expected TypeScript types', () => {
      const userProfile = createTestUserProfile();

      const result = userprofileEntitySchema.safeParse(userProfile);
      expect(result.success).toBe(true);

      if (result.success) {
        // The parsed data should be assignable to the expected type
        const typedData: typeof userProfile = result.data;
        expect(typedData.id).toBe(userProfile.id);
        expect(typedData.email).toBe(userProfile.email);
        expect(typedData.firstName).toBe(userProfile.firstName);
        expect(typedData.lastName).toBe(userProfile.lastName);
      }
    });

    test('schemas work with TypeScript inference', () => {
      const userProfileData = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        ministryRole: 'senior_pastor' as const,
      };

      const result = userprofileEntitySchema.safeParse(userProfileData);
      expect(result.success).toBe(true);

      if (result.success) {
        // TypeScript should infer the correct type
        const inferredType = result.data;
        expect(inferredType.ministryRole).toBe('senior_pastor');
        expect(typeof inferredType.ministryRole).toBe('string');
      }
    });
  });

  describe('Performance', () => {
    test('schema validation is performant', () => {
      const userProfile = createTestUserProfile();
      const iterations = 1000;

      const start = performance.now();
      for (let i = 0; i < iterations; i++) {
        userprofileEntitySchema.safeParse(userProfile);
      }
      const end = performance.now();

      const avgTime = (end - start) / iterations;
      expect(avgTime).toBeLessThan(1); // Should be less than 1ms per validation
    });

    test('large data validation is performant', () => {
      const largeUserProfile = {
        ...createTestUserProfile(),
        bio: 'A'.repeat(10000), // Large bio
        theologicalFocus: Array(1000)
          .fill(0)
          .map((_, i) => `concept-${i}`),
      };

      const start = performance.now();
      userprofileEntitySchema.safeParse(largeUserProfile);
      const end = performance.now();

      expect(end - start).toBeLessThan(10); // Should be less than 10ms for large data
    });
  });

  describe('Error Handling', () => {
    test('handles malformed JSON gracefully', () => {
      // This test ensures the schema doesn't crash on malformed input
      const malformedData = {
        id: null,
        email: undefined,
        firstName: 123, // Wrong type
        lastName: {}, // Wrong type
      };

      const result = userprofileEntitySchema.safeParse(malformedData);
      expect(result.success).toBe(false);

      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });

    test('provides detailed validation errors', () => {
      const invalidData = {
        id: 'invalid-uuid',
        email: 'invalid-email',
        firstName: '',
        lastName: '',
        ministryRole: 'invalid-role',
      };

      const result = userprofileEntitySchema.safeParse(invalidData);
      expect(result.success).toBe(false);

      if (!result.success) {
        const errors = result.error.issues;
        expect(errors.length).toBe(5);

        // Check that each error has the required properties
        errors.forEach(error => {
          expect(error.code).toBeDefined();
          expect(error.message).toBeDefined();
          expect(error.path).toBeDefined();
        });
      }
    });
  });
});
