/**
 * Test Data Factory Tests
 *
 * This test suite verifies that the TestDataFactory creates consistent,
 * realistic test data for all entity types.
 */

import { describe, expect, it } from 'vitest';
import { TestDataFactory } from './factory';

describe('TestDataFactory', () => {
  describe('createUser', () => {
    it('should create a user with all required fields', () => {
      const user = TestDataFactory.createUser();

      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('firstName');
      expect(user).toHaveProperty('lastName');
      expect(user).toHaveProperty('ministryRole');
      expect(user).toHaveProperty('accountStatus');
      expect(user).toHaveProperty('privacySettings');
      expect(user).toHaveProperty('createdAt');
      expect(user).toHaveProperty('updatedAt');
      expect(user).toHaveProperty('lastActiveAt');
    });

    it('should allow overriding fields', () => {
      const user = TestDataFactory.createUser({
        email: 'test@example.com',
        ministryRole: 'senior_pastor',
      });

      expect(user.email).toBe('test@example.com');
      expect(user.ministryRole).toBe('senior_pastor');
    });

    it('should create valid email addresses', () => {
      const user = TestDataFactory.createUser();
      expect(user.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });
  });

  describe('createOrganization', () => {
    it('should create an organization with all required fields', () => {
      const org = TestDataFactory.createOrganization();

      expect(org).toHaveProperty('id');
      expect(org).toHaveProperty('name');
      expect(org).toHaveProperty('slug');
      expect(org).toHaveProperty('description');
      expect(org).toHaveProperty('status');
      expect(org).toHaveProperty('accountOwnerId');
      expect(org).toHaveProperty('settings');
      expect(org).toHaveProperty('createdAt');
      expect(org).toHaveProperty('updatedAt');
    });

    it('should create valid slugs', () => {
      const org = TestDataFactory.createOrganization();
      expect(org.slug).toMatch(/^[a-z0-9-]+$/);
    });
  });

  describe('createAssessment', () => {
    it('should create an assessment with all required fields', () => {
      const assessment = TestDataFactory.createAssessment();

      expect(assessment).toHaveProperty('id');
      expect(assessment).toHaveProperty('name');
      expect(assessment).toHaveProperty('slug');
      expect(assessment).toHaveProperty('description');
      expect(assessment).toHaveProperty('assessmentType');
      expect(assessment).toHaveProperty('status');
      expect(assessment).toHaveProperty('questionsCount');
      expect(assessment).toHaveProperty('researchBacked');
      expect(assessment).toHaveProperty('createdAt');
      expect(assessment).toHaveProperty('updatedAt');
    });

    it('should create valid assessment types', () => {
      const assessment = TestDataFactory.createAssessment();
      expect(['apest', 'spiritual_gifts', 'personality']).toContain(
        assessment.assessmentType
      );
    });
  });

  describe('createAssessmentQuestion', () => {
    it('should create a question with all required fields', () => {
      const question = TestDataFactory.createAssessmentQuestion();

      expect(question).toHaveProperty('id');
      expect(question).toHaveProperty('assessmentId');
      expect(question).toHaveProperty('questionText');
      expect(question).toHaveProperty('orderIndex');
      expect(question).toHaveProperty('questionType');
      expect(question).toHaveProperty('options');
      expect(question).toHaveProperty('required');
      expect(question).toHaveProperty('createdAt');
      expect(question).toHaveProperty('updatedAt');
    });

    it('should create valid question types', () => {
      const question = TestDataFactory.createAssessmentQuestion();
      expect([
        'multiple_choice',
        'single_choice',
        'text',
        'rating',
        'boolean',
      ]).toContain(question.questionType);
    });
  });

  describe('createContentItem', () => {
    it('should create content with all required fields', () => {
      const content = TestDataFactory.createContentItem();

      expect(content).toHaveProperty('id');
      expect(content).toHaveProperty('title');
      expect(content).toHaveProperty('slug');
      expect(content).toHaveProperty('content');
      expect(content).toHaveProperty('excerpt');
      expect(content).toHaveProperty('status');
      expect(content).toHaveProperty('visibility');
      expect(content).toHaveProperty('contentType');
      expect(content).toHaveProperty('authorId');
      expect(content).toHaveProperty('categoryId');
      expect(content).toHaveProperty('tags');
      expect(content).toHaveProperty('createdAt');
      expect(content).toHaveProperty('updatedAt');
    });

    it('should create valid content types', () => {
      const content = TestDataFactory.createContentItem();
      expect(['article', 'video', 'podcast', 'ebook']).toContain(
        content.contentType
      );
    });
  });

  describe('createCommunity', () => {
    it('should create a community with all required fields', () => {
      const community = TestDataFactory.createCommunity();

      expect(community).toHaveProperty('id');
      expect(community).toHaveProperty('name');
      expect(community).toHaveProperty('slug');
      expect(community).toHaveProperty('description');
      expect(community).toHaveProperty('visibility');
      expect(community).toHaveProperty('createdBy');
      expect(community).toHaveProperty('memberCount');
      expect(community).toHaveProperty('isActive');
      expect(community).toHaveProperty('settings');
      expect(community).toHaveProperty('createdAt');
      expect(community).toHaveProperty('updatedAt');
    });
  });

  describe('createSubscriptionPlan', () => {
    it('should create a subscription plan with all required fields', () => {
      const plan = TestDataFactory.createSubscriptionPlan();

      expect(plan).toHaveProperty('id');
      expect(plan).toHaveProperty('name');
      expect(plan).toHaveProperty('slug');
      expect(plan).toHaveProperty('description');
      expect(plan).toHaveProperty('price');
      expect(plan).toHaveProperty('currency');
      expect(plan).toHaveProperty('interval');
      expect(plan).toHaveProperty('features');
      expect(plan).toHaveProperty('isActive');
      expect(plan).toHaveProperty('maxUsers');
      expect(plan).toHaveProperty('contentAccessLevel');
      expect(plan).toHaveProperty('createdAt');
      expect(plan).toHaveProperty('updatedAt');
    });

    it('should create valid intervals', () => {
      const plan = TestDataFactory.createSubscriptionPlan();
      expect(['month', 'year']).toContain(plan.interval);
    });
  });

  describe('createUserAssessment', () => {
    it('should create a user assessment with all required fields', () => {
      const userAssessment = TestDataFactory.createUserAssessment();

      expect(userAssessment).toHaveProperty('id');
      expect(userAssessment).toHaveProperty('userId');
      expect(userAssessment).toHaveProperty('assessmentId');
      expect(userAssessment).toHaveProperty('status');
      expect(userAssessment).toHaveProperty('score');
      expect(userAssessment).toHaveProperty('completedAt');
      expect(userAssessment).toHaveProperty('timeSpentMinutes');
      expect(userAssessment).toHaveProperty('responses');
      expect(userAssessment).toHaveProperty('createdAt');
      expect(userAssessment).toHaveProperty('updatedAt');
    });

    it('should create valid statuses', () => {
      const userAssessment = TestDataFactory.createUserAssessment();
      expect(['in_progress', 'completed', 'abandoned']).toContain(
        userAssessment.status
      );
    });
  });

  describe('createAssessmentResponse', () => {
    it('should create an assessment response with all required fields', () => {
      const response = TestDataFactory.createAssessmentResponse();

      expect(response).toHaveProperty('id');
      expect(response).toHaveProperty('userAssessmentId');
      expect(response).toHaveProperty('questionId');
      expect(response).toHaveProperty('responseValue');
      expect(response).toHaveProperty('responseText');
      expect(response).toHaveProperty('responseNumber');
      expect(response).toHaveProperty('timeSpentSeconds');
      expect(response).toHaveProperty('createdAt');
      expect(response).toHaveProperty('updatedAt');
    });
  });

  describe('createOrganizationMembership', () => {
    it('should create a membership with all required fields', () => {
      const membership = TestDataFactory.createOrganizationMembership();

      expect(membership).toHaveProperty('id');
      expect(membership).toHaveProperty('userId');
      expect(membership).toHaveProperty('organizationId');
      expect(membership).toHaveProperty('role');
      expect(membership).toHaveProperty('status');
      expect(membership).toHaveProperty('joinedAt');
      expect(membership).toHaveProperty('invitedBy');
      expect(membership).toHaveProperty('permissions');
      expect(membership).toHaveProperty('createdAt');
      expect(membership).toHaveProperty('updatedAt');
    });

    it('should create valid roles', () => {
      const membership = TestDataFactory.createOrganizationMembership();
      expect(['member', 'admin', 'owner']).toContain(membership.role);
    });
  });

  describe('createContentCategory', () => {
    it('should create a category with all required fields', () => {
      const category = TestDataFactory.createContentCategory();

      expect(category).toHaveProperty('id');
      expect(category).toHaveProperty('name');
      expect(category).toHaveProperty('slug');
      expect(category).toHaveProperty('description');
      expect(category).toHaveProperty('parentId');
      expect(category).toHaveProperty('orderIndex');
      expect(category).toHaveProperty('isActive');
      expect(category).toHaveProperty('contentCount');
      expect(category).toHaveProperty('createdAt');
      expect(category).toHaveProperty('updatedAt');
    });
  });

  describe('createUserSubscription', () => {
    it('should create a subscription with all required fields', () => {
      const subscription = TestDataFactory.createUserSubscription();

      expect(subscription).toHaveProperty('id');
      expect(subscription).toHaveProperty('userId');
      expect(subscription).toHaveProperty('planId');
      expect(subscription).toHaveProperty('status');
      expect(subscription).toHaveProperty('currentPeriodStart');
      expect(subscription).toHaveProperty('currentPeriodEnd');
      expect(subscription).toHaveProperty('cancelAtPeriodEnd');
      expect(subscription).toHaveProperty('stripeSubscriptionId');
      expect(subscription).toHaveProperty('stripeCustomerId');
      expect(subscription).toHaveProperty('createdAt');
      expect(subscription).toHaveProperty('updatedAt');
    });

    it('should create valid statuses', () => {
      const subscription = TestDataFactory.createUserSubscription();
      expect(['active', 'canceled', 'past_due', 'trialing']).toContain(
        subscription.status
      );
    });
  });

  describe('createRequest', () => {
    it('should create a request with all required fields', () => {
      const request = TestDataFactory.createRequest();

      expect(request).toHaveProperty('method');
      expect(request).toHaveProperty('url');
      expect(request).toHaveProperty('headers');
      expect(request).toHaveProperty('body');
      expect(request).toHaveProperty('query');
      expect(request).toHaveProperty('params');
    });

    it('should create valid HTTP methods', () => {
      const request = TestDataFactory.createRequest();
      expect(['GET', 'POST', 'PUT', 'DELETE']).toContain(request.method);
    });
  });

  describe('createResponse', () => {
    it('should create a response with all required fields', () => {
      const response = TestDataFactory.createResponse();

      expect(response).toHaveProperty('status');
      expect(response).toHaveProperty('headers');
      expect(response).toHaveProperty('body');
    });

    it('should create valid status codes', () => {
      const response = TestDataFactory.createResponse();
      expect(response.status).toBeGreaterThanOrEqual(200);
      expect(response.status).toBeLessThanOrEqual(599);
    });
  });

  describe('createMany', () => {
    it('should create multiple records', () => {
      const users = TestDataFactory.createMany(
        () => TestDataFactory.createUser(),
        5
      );

      expect(users).toHaveLength(5);
      expect(users[0]).toHaveProperty('id');
      expect(users[1]).toHaveProperty('id');
      expect(users[2]).toHaveProperty('id');
      expect(users[3]).toHaveProperty('id');
      expect(users[4]).toHaveProperty('id');
    });

    it('should create unique records', () => {
      const users = TestDataFactory.createMany(
        () => TestDataFactory.createUser(),
        3
      );
      const ids = users.map(user => user.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(3);
    });
  });
});
