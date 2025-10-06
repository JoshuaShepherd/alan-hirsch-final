import { describe, expect, it } from 'vitest';
import {
  createTestAssessment,
  createTestContent,
  createTestMinistryPlatform,
  createTestOrganization,
  createTestUser,
  testDataFactories,
} from './test-data-factories';

describe('Test Data Factories', () => {
  it('should create test user with default values', () => {
    const user = createTestUser();

    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.email).toMatch(/@/);
    expect(user.firstName).toBeDefined();
    expect(user.lastName).toBeDefined();
    expect(user.ministryRole).toBe('pastor');
    expect(user.accountStatus).toBe('active');
  });

  it('should create test user with overrides', () => {
    const user = createTestUser({
      email: 'custom@example.com',
      ministryRole: 'senior_pastor',
    });

    expect(user.email).toBe('custom@example.com');
    expect(user.ministryRole).toBe('senior_pastor');
    expect(user.accountStatus).toBe('active'); // Should keep default
  });

  it('should create test assessment', () => {
    const assessment = createTestAssessment();

    expect(assessment).toBeDefined();
    expect(assessment.id).toBeDefined();
    expect(assessment.name).toBeDefined();
    expect(assessment.slug).toBeDefined();
    expect(assessment.category).toBe('spiritual_gifts');
    expect(assessment.status).toBe('published');
  });

  it('should create test organization', () => {
    const organization = createTestOrganization();

    expect(organization).toBeDefined();
    expect(organization.id).toBeDefined();
    expect(organization.name).toBeDefined();
    expect(organization.slug).toBeDefined();
    expect(organization.organizationType).toBe('church');
    expect(organization.status).toBe('active');
  });

  it('should create test content', () => {
    const content = createTestContent();

    expect(content).toBeDefined();
    expect(content.id).toBeDefined();
    expect(content.title).toBeDefined();
    expect(content.slug).toBeDefined();
    expect(content.contentType).toBe('article');
    expect(content.status).toBe('published');
  });

  it('should create test ministry platform', () => {
    const platform = createTestMinistryPlatform();

    expect(platform).toBeDefined();
    expect(platform.id).toBeDefined();
    expect(platform.name).toBeDefined();
    expect(platform.slug).toBeDefined();
    expect(platform.platformType).toBe('church_management');
    expect(platform.status).toBe('active');
  });

  it('should use test data factories directly', () => {
    const user = testDataFactories.user({ email: 'factory@test.com' });
    const assessment = testDataFactories.assessment({ name: 'Factory Test' });

    expect(user.email).toBe('factory@test.com');
    expect(assessment.name).toBe('Factory Test');
  });
});
