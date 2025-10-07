// Types Layer Tests
// Tests the TypeScript type definitions and their consistency

import type {
  AssessmentsInsert,
  AssessmentsSelect,
  AssessmentsUpdate,
  // Component prop types
  BaseComponentProps,
  ButtonProps,
  CardProps,
  FormProps,
  // Utility types
  ID,
  InputProps,
  JSON,
  ModalProps,
  Optional,
  OrganizationsInsert,
  OrganizationsSelect,
  OrganizationsUpdate,
  RequiredFields,
  Timestamp,
  UserProfilesInsert,
  // Database types
  UserProfilesSelect,
  UserProfilesUpdate,
} from '@platform/types';
import { describe, expect, test } from 'vitest';
import {
  createTestAssessment,
  createTestOrganization,
  createTestUserProfile,
} from './test-setup';

describe('Types Layer', () => {
  describe('Database Type Exports', () => {
    test('all database types are exported', () => {
      // Test that types exist (TypeScript compilation test)
      const userProfileSelect: UserProfilesSelect = {} as UserProfilesSelect;
      const userProfileInsert: UserProfilesInsert = {} as UserProfilesInsert;
      const userProfileUpdate: UserProfilesUpdate = {} as UserProfilesUpdate;

      const organizationSelect: OrganizationsSelect = {} as OrganizationsSelect;
      const organizationInsert: OrganizationsInsert = {} as OrganizationsInsert;
      const organizationUpdate: OrganizationsUpdate = {} as OrganizationsUpdate;

      const assessmentSelect: AssessmentsSelect = {} as AssessmentsSelect;
      const assessmentInsert: AssessmentsInsert = {} as AssessmentsInsert;
      const assessmentUpdate: AssessmentsUpdate = {} as AssessmentsUpdate;

      expect(userProfileSelect).toBeDefined();
      expect(userProfileInsert).toBeDefined();
      expect(userProfileUpdate).toBeDefined();
      expect(organizationSelect).toBeDefined();
      expect(organizationInsert).toBeDefined();
      expect(organizationUpdate).toBeDefined();
      expect(assessmentSelect).toBeDefined();
      expect(assessmentInsert).toBeDefined();
      expect(assessmentUpdate).toBeDefined();
    });
  });

  describe('Type Structure Validation', () => {
    test('UserProfilesSelect has correct structure', () => {
      const userProfile: UserProfilesSelect = {
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
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(userProfile.id).toBe('user-123');
      expect(userProfile.email).toBe('test@example.com');
      expect(userProfile.firstName).toBe('John');
      expect(userProfile.lastName).toBe('Doe');
      expect(userProfile.ministryRole).toBe('senior_pastor');
      expect(userProfile.languagePrimary).toBe('en');
      expect(userProfile.subscriptionTier).toBe('free');
      expect(userProfile.accountStatus).toBe('active');
      expect(userProfile.createdAt).toBeInstanceOf(Date);
      expect(userProfile.updatedAt).toBeInstanceOf(Date);
    });

    test('UserProfilesInsert has correct structure', () => {
      const userProfileInsert: UserProfilesInsert = {
        id: 'user-123',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        ministryRole: 'senior_pastor',
      };

      expect(userProfileInsert.id).toBe('user-123');
      expect(userProfileInsert.email).toBe('test@example.com');
      expect(userProfileInsert.firstName).toBe('John');
      expect(userProfileInsert.lastName).toBe('Doe');
      expect(userProfileInsert.ministryRole).toBe('senior_pastor');
    });

    test('OrganizationsSelect has correct structure', () => {
      const organization: OrganizationsSelect = {
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
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(organization.id).toBe('org-123');
      expect(organization.name).toBe('Test Organization');
      expect(organization.slug).toBe('test-org');
      expect(organization.organizationType).toBe('church');
      expect(organization.languagePrimary).toBe('en');
      expect(organization.isActive).toBe(true);
      expect(organization.createdAt).toBeInstanceOf(Date);
      expect(organization.updatedAt).toBeInstanceOf(Date);
    });

    test('AssessmentsSelect has correct structure', () => {
      const assessment: AssessmentsSelect = {
        id: 'assessment-123',
        name: 'Test Assessment',
        slug: 'test-assessment',
        description: null,
        assessmentType: 'spiritual_gifts',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(assessment.id).toBe('assessment-123');
      expect(assessment.name).toBe('Test Assessment');
      expect(assessment.slug).toBe('test-assessment');
      expect(assessment.assessmentType).toBe('spiritual_gifts');
      expect(assessment.isActive).toBe(true);
      expect(assessment.createdAt).toBeInstanceOf(Date);
      expect(assessment.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe('Enum Type Validation', () => {
    test('ministryRole enum values are correctly typed', () => {
      const validRoles: UserProfilesSelect['ministryRole'][] = [
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
        const userProfile: UserProfilesSelect = {
          ...createTestUserProfile(),
          ministryRole: role,
        };
        expect(userProfile.ministryRole).toBe(role);
      });
    });

    test('organizationType enum values are correctly typed', () => {
      const validTypes: OrganizationsSelect['organizationType'][] = [
        'church',
        'denomination',
        'seminary',
        'nonprofit',
        'business',
        'other',
      ];

      validTypes.forEach(type => {
        const organization: OrganizationsSelect = {
          ...createTestOrganization(),
          organizationType: type,
        };
        expect(organization.organizationType).toBe(type);
      });
    });

    test('assessmentType enum values are correctly typed', () => {
      const validTypes: AssessmentsSelect['assessmentType'][] = [
        'spiritual_gifts',
        'leadership_style',
        'ministry_fit',
        'cultural_competency',
        'custom',
      ];

      validTypes.forEach(type => {
        const assessment: AssessmentsSelect = {
          ...createTestAssessment(),
          assessmentType: type,
        };
        expect(assessment.assessmentType).toBe(type);
      });
    });

    test('culturalContext enum values are correctly typed', () => {
      const validContexts: UserProfilesSelect['culturalContext'][] = [
        'western',
        'eastern',
        'african',
        'latin_american',
        'middle_eastern',
        'oceanic',
        'mixed',
        'global',
        null,
      ];

      validContexts.forEach(context => {
        const userProfile: UserProfilesSelect = {
          ...createTestUserProfile(),
          culturalContext: context,
        };
        expect(userProfile.culturalContext).toBe(context);
      });
    });
  });

  describe('Component Prop Types', () => {
    test('BaseComponentProps has correct structure', () => {
      const baseProps: BaseComponentProps = {
        className: 'test-class',
        children: 'Test content',
      };

      expect(baseProps.className).toBe('test-class');
      expect(baseProps.children).toBe('Test content');
    });

    test('FormProps extends BaseComponentProps correctly', () => {
      const formProps: FormProps = {
        className: 'test-class',
        children: 'Test content',
        onSubmit: () => {},
        onReset: () => {},
        loading: false,
        disabled: false,
      };

      expect(formProps.className).toBe('test-class');
      expect(formProps.children).toBe('Test content');
      expect(typeof formProps.onSubmit).toBe('function');
      expect(typeof formProps.onReset).toBe('function');
      expect(formProps.loading).toBe(false);
      expect(formProps.disabled).toBe(false);
    });

    test('ButtonProps extends BaseComponentProps correctly', () => {
      const buttonProps: ButtonProps = {
        className: 'test-class',
        children: 'Test button',
        variant: 'primary',
        size: 'md',
        onClick: () => {},
        disabled: false,
        loading: false,
      };

      expect(buttonProps.className).toBe('test-class');
      expect(buttonProps.children).toBe('Test button');
      expect(buttonProps.variant).toBe('primary');
      expect(buttonProps.size).toBe('md');
      expect(typeof buttonProps.onClick).toBe('function');
      expect(buttonProps.disabled).toBe(false);
      expect(buttonProps.loading).toBe(false);
    });

    test('InputProps extends BaseComponentProps correctly', () => {
      const inputProps: InputProps = {
        className: 'test-class',
        type: 'text',
        placeholder: 'Enter text',
        value: 'test value',
        onChange: () => {},
        error: 'test error',
        disabled: false,
      };

      expect(inputProps.className).toBe('test-class');
      expect(inputProps.type).toBe('text');
      expect(inputProps.placeholder).toBe('Enter text');
      expect(inputProps.value).toBe('test value');
      expect(typeof inputProps.onChange).toBe('function');
      expect(inputProps.error).toBe('test error');
      expect(inputProps.disabled).toBe(false);
    });

    test('CardProps extends BaseComponentProps correctly', () => {
      const cardProps: CardProps = {
        className: 'test-class',
        title: 'Test Card',
        subtitle: 'Test Subtitle',
        actions: 'Test Actions',
      };

      expect(cardProps.className).toBe('test-class');
      expect(cardProps.title).toBe('Test Card');
      expect(cardProps.subtitle).toBe('Test Subtitle');
      expect(cardProps.actions).toBe('Test Actions');
    });

    test('ModalProps extends BaseComponentProps correctly', () => {
      const modalProps: ModalProps = {
        className: 'test-class',
        isOpen: true,
        onClose: () => {},
      };

      expect(modalProps.className).toBe('test-class');
      expect(modalProps.isOpen).toBe(true);
      expect(typeof modalProps.onClose).toBe('function');
    });
  });

  describe('Utility Types', () => {
    test('ID type is string', () => {
      const id: ID = 'test-id';
      expect(typeof id).toBe('string');
      expect(id).toBe('test-id');
    });

    test('Timestamp type is Date', () => {
      const timestamp: Timestamp = new Date();
      expect(timestamp).toBeInstanceOf(Date);
    });

    test('JSON type accepts any value', () => {
      const jsonString: JSON = '{"test": "value"}';
      const jsonObject: JSON = { test: 'value' };
      const jsonArray: JSON = [1, 2, 3];
      const jsonNumber: JSON = 42;
      const jsonBoolean: JSON = true;

      expect(jsonString).toBe('{"test": "value"}');
      expect(jsonObject).toEqual({ test: 'value' });
      expect(jsonArray).toEqual([1, 2, 3]);
      expect(jsonNumber).toBe(42);
      expect(jsonBoolean).toBe(true);
    });

    test('Optional utility type works correctly', () => {
      interface TestInterface {
        required: string;
        optional: string;
        anotherRequired: number;
      }

      type OptionalTest = Optional<TestInterface, 'optional'>;

      const testValue: OptionalTest = {
        required: 'test',
        anotherRequired: 42,
        // optional is now optional
      };

      expect(testValue.required).toBe('test');
      expect(testValue.anotherRequired).toBe(42);
      expect(testValue.optional).toBeUndefined();
    });

    test('RequiredFields utility type works correctly', () => {
      interface TestInterface {
        optional: string;
        anotherOptional: number;
      }

      type RequiredTest = RequiredFields<TestInterface, 'optional'>;

      const testValue: RequiredTest = {
        optional: 'test',
        anotherOptional: 42,
      };

      expect(testValue.optional).toBe('test');
      expect(testValue.anotherOptional).toBe(42);
    });
  });

  describe('Type Compatibility', () => {
    test('Select and Insert types are compatible where expected', () => {
      const selectData: UserProfilesSelect = createTestUserProfile();

      // Test that we can create an insert type from select data
      const insertData: UserProfilesInsert = {
        id: selectData.id,
        email: selectData.email,
        firstName: selectData.firstName,
        lastName: selectData.lastName,
        ministryRole: selectData.ministryRole,
      };

      expect(insertData.id).toBe(selectData.id);
      expect(insertData.email).toBe(selectData.email);
      expect(insertData.firstName).toBe(selectData.firstName);
      expect(insertData.lastName).toBe(selectData.lastName);
      expect(insertData.ministryRole).toBe(selectData.ministryRole);
    });

    test('Update types are partial of Insert types', () => {
      const insertData: UserProfilesInsert = {
        id: 'user-123',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        ministryRole: 'senior_pastor',
      };

      const updateData: UserProfilesUpdate = {
        firstName: 'Jane',
        lastName: 'Smith',
      };

      expect(updateData.firstName).toBe('Jane');
      expect(updateData.lastName).toBe('Smith');
      expect(updateData.id).toBeUndefined();
      expect(updateData.email).toBeUndefined();
      expect(updateData.ministryRole).toBeUndefined();
    });
  });

  describe('Null Safety', () => {
    test('nullable fields are correctly typed', () => {
      const userProfile: UserProfilesSelect = createTestUserProfile();

      // These fields can be null
      expect(userProfile.passwordHash).toBeNull();
      expect(userProfile.displayName).toBeNull();
      expect(userProfile.bio).toBeNull();
      expect(userProfile.avatarUrl).toBeNull();
      expect(userProfile.denomination).toBeNull();
      expect(userProfile.organizationName).toBeNull();
      expect(userProfile.yearsInMinistry).toBeNull();
      expect(userProfile.countryCode).toBeNull();
      expect(userProfile.timezone).toBeNull();
      expect(userProfile.culturalContext).toBeNull();
      expect(userProfile.lastActiveAt).toBeNull();
    });

    test('required fields are not nullable', () => {
      const userProfile: UserProfilesSelect = createTestUserProfile();

      // These fields cannot be null
      expect(userProfile.id).not.toBeNull();
      expect(userProfile.email).not.toBeNull();
      expect(userProfile.firstName).not.toBeNull();
      expect(userProfile.lastName).not.toBeNull();
      expect(userProfile.ministryRole).not.toBeNull();
      expect(userProfile.createdAt).not.toBeNull();
      expect(userProfile.updatedAt).not.toBeNull();
    });
  });

  describe('Array and Object Types', () => {
    test('JSONB fields accept complex objects', () => {
      const userProfile: UserProfilesSelect = createTestUserProfile({
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
        theologicalFocus: ['leadership', 'discipleship', 'evangelism'],
      });

      expect(userProfile.brandColors).toEqual({
        primary: '#2563eb',
        secondary: '#64748b',
        accent: '#059669',
      });
      expect(userProfile.emailNotifications).toEqual({
        dailyDigest: true,
        collaborationRequests: true,
        revenueReports: false,
        communityUpdates: true,
      });
      expect(userProfile.theologicalFocus).toEqual([
        'leadership',
        'discipleship',
        'evangelism',
      ]);
    });
  });
});
