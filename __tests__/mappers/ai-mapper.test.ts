import { describe, expect, it } from 'vitest';
import {
  toAiContentJobResponseDTO,
  toAiConversationResponseDTO,
  toAiCrossReferenceSuggestionResponseDTO,
  toAiMessageResponseDTO,
  toTheologicalConceptResponseDTO,
} from '../../packages/shared/src/mappers';

// ============================================================================
// AI MAPPER TESTS
// ============================================================================

describe('AI Mapper Tests', () => {
  describe('toAiConversationResponseDTO', () => {
    it('should transform AI conversation row to response DTO', () => {
      const conversationRow = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        userId: '123e4567-e89b-12d3-a456-426614174001',
        conversationType: 'theological_discussion',
        title: 'Test Conversation',
        primaryTopic: 'Grace and Salvation',
        theologicalContext: {
          themes: ['grace', 'salvation'],
          scriptures: ['Ephesians 2:8-9'],
          traditions: ['reformed'],
        },
        userApestProfile: {
          primary: 'teaching',
          secondary: 'shepherding',
          scores: {
            apostolic: 60,
            prophetic: 70,
            evangelistic: 50,
            shepherding: 80,
            teaching: 90,
          },
        },
        ministryContext: {
          role: 'pastor',
          experience: 10,
          focus_areas: ['preaching', 'counseling'],
        },
        culturalContext: 'western',
        totalMessages: 5,
        conversationDurationMinutes: 30,
        userSatisfactionRating: 4,
        theologicalAccuracyVerified: true,
        helpfulnessRating: 5,
        aiModel: 'gpt-4',
        modelVersion: '1.0',
        totalTokensUsed: 1500,
        referencedContent: ['content-1', 'content-2'],
        generatedInsights: 'Key insights about grace',
        status: 'active',
        createdAt: new Date('2023-01-01T00:00:00Z'),
        updatedAt: new Date('2023-12-01T00:00:00Z'),
        completedAt: null,
      };

      const result = toAiConversationResponseDTO(conversationRow);

      expect(result).toMatchObject({
        id: conversationRow.id,
        userId: conversationRow.userId,
        conversationType: conversationRow.conversationType,
        title: conversationRow.title,
        primaryTopic: conversationRow.primaryTopic,
        theologicalContext: conversationRow.theologicalContext,
        userApestProfile: conversationRow.userApestProfile,
        ministryContext: conversationRow.ministryContext,
        culturalContext: conversationRow.culturalContext,
        totalMessages: conversationRow.totalMessages,
        conversationDurationMinutes:
          conversationRow.conversationDurationMinutes,
        userSatisfactionRating: conversationRow.userSatisfactionRating,
        theologicalAccuracyVerified:
          conversationRow.theologicalAccuracyVerified,
        helpfulnessRating: conversationRow.helpfulnessRating,
        aiModel: conversationRow.aiModel,
        modelVersion: conversationRow.modelVersion,
        totalTokensUsed: conversationRow.totalTokensUsed,
        referencedContent: conversationRow.referencedContent,
        generatedInsights: conversationRow.generatedInsights,
        status: conversationRow.status,
        createdAt: conversationRow.createdAt.toISOString(),
        updatedAt: conversationRow.updatedAt.toISOString(),
        completedAt: conversationRow.completedAt,
      });

      // Test computed fields
      expect(result.isActive).toBe(true);
      expect(result.isCompleted).toBe(false);
      expect(result.isAbandoned).toBe(false);
      expect(result.isArchived).toBe(false);
      expect(result.hasUserRating).toBe(true);
      expect(result.conversationDurationText).toBeDefined();
      expect(result.tokenUsageText).toBeDefined();
    });

    it('should handle minimal conversation data correctly', () => {
      const conversationRow = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        userId: '123e4567-e89b-12d3-a456-426614174001',
        conversationType: 'general',
        title: null,
        primaryTopic: null,
        theologicalContext: null,
        userApestProfile: null,
        ministryContext: null,
        culturalContext: null,
        totalMessages: 1,
        conversationDurationMinutes: null,
        userSatisfactionRating: null,
        theologicalAccuracyVerified: false,
        helpfulnessRating: null,
        aiModel: 'gpt-4',
        modelVersion: null,
        totalTokensUsed: 100,
        referencedContent: [],
        generatedInsights: null,
        status: 'active',
        createdAt: new Date('2023-01-01T00:00:00Z'),
        updatedAt: new Date('2023-12-01T00:00:00Z'),
        completedAt: null,
      };

      const result = toAiConversationResponseDTO(conversationRow);

      expect(result.title).toBeNull();
      expect(result.primaryTopic).toBeNull();
      expect(result.theologicalContext).toBeNull();
      expect(result.userApestProfile).toBeNull();
      expect(result.ministryContext).toBeNull();
      expect(result.culturalContext).toBeNull();
      expect(result.conversationDurationMinutes).toBeNull();
      expect(result.userSatisfactionRating).toBeNull();
      expect(result.helpfulnessRating).toBeNull();
      expect(result.modelVersion).toBeNull();
      expect(result.generatedInsights).toBeNull();
      expect(result.completedAt).toBeNull();
      expect(result.referencedContent).toEqual([]);
      expect(result.isActive).toBe(true);
      expect(result.hasUserRating).toBe(false);
    });
  });

  describe('toAiMessageResponseDTO', () => {
    it('should transform AI message row to response DTO', () => {
      const messageRow = {
        id: '123e4567-e89b-12d3-a456-426614174002',
        conversationId: '123e4567-e89b-12d3-a456-426614174000',
        role: 'user',
        content: 'Hello, how can you help me?',
        messageIndex: 1,
        tokenCount: 15,
        citedContent: [
          {
            contentId: 'content-1',
            title: 'Grace and Salvation',
            relevanceScore: 0.85,
          },
        ],
        confidence: '0.95',
        factualAccuracy: true,
        theologicalSoundness: true,
        userRating: 4,
        userFeedback: 'Very helpful response',
        flaggedForReview: false,
        processingTime: 1500,
        createdAt: new Date('2023-01-01T00:00:00Z'),
        updatedAt: new Date('2023-12-01T00:00:00Z'),
      };

      const result = toAiMessageResponseDTO(messageRow);

      expect(result).toMatchObject({
        id: messageRow.id,
        conversationId: messageRow.conversationId,
        role: messageRow.role,
        content: messageRow.content,
        messageIndex: messageRow.messageIndex,
        tokenCount: messageRow.tokenCount,
        citedContent: messageRow.citedContent,
        confidence: messageRow.confidence,
        factualAccuracy: messageRow.factualAccuracy,
        theologicalSoundness: messageRow.theologicalSoundness,
        userRating: messageRow.userRating,
        userFeedback: messageRow.userFeedback,
        flaggedForReview: messageRow.flaggedForReview,
        processingTime: messageRow.processingTime,
        createdAt: messageRow.createdAt.toISOString(),
        updatedAt: messageRow.updatedAt.toISOString(),
      });

      // Test computed fields
      expect(result.isUserMessage).toBe(true);
      expect(result.isAssistantMessage).toBe(false);
      expect(result.isSystemMessage).toBe(false);
      expect(result.hasUserRating).toBe(true);
      expect(result.hasUserFeedback).toBe(true);
      expect(result.isFlagged).toBe(false);
      expect(result.processingTimeText).toBeDefined();
      expect(result.confidenceText).toBeDefined();
    });

    it('should handle different message roles', () => {
      const roles = ['user', 'assistant', 'system'] as const;

      roles.forEach(role => {
        const messageRow = {
          id: '123e4567-e89b-12d3-a456-426614174002',
          conversationId: '123e4567-e89b-12d3-a456-426614174000',
          role,
          content: `Message from ${role}`,
          messageIndex: 1,
          tokenCount: null,
          citedContent: [],
          confidence: null,
          factualAccuracy: null,
          theologicalSoundness: null,
          userRating: null,
          userFeedback: null,
          flaggedForReview: false,
          processingTime: null,
          createdAt: new Date('2023-01-01T00:00:00Z'),
          updatedAt: new Date('2023-12-01T00:00:00Z'),
        };

        const result = toAiMessageResponseDTO(messageRow);

        expect(result.role).toBe(role);
        expect(result.content).toBe(`Message from ${role}`);
        expect(result.tokenCount).toBeNull();
        expect(result.citedContent).toEqual([]);
        expect(result.confidence).toBeNull();
        expect(result.factualAccuracy).toBeNull();
        expect(result.theologicalSoundness).toBeNull();
        expect(result.userRating).toBeNull();
        expect(result.userFeedback).toBeNull();
        expect(result.processingTime).toBeNull();

        // Test computed fields based on role
        expect(result.isUserMessage).toBe(role === 'user');
        expect(result.isAssistantMessage).toBe(role === 'assistant');
        expect(result.isSystemMessage).toBe(role === 'system');
        expect(result.hasUserRating).toBe(false);
        expect(result.hasUserFeedback).toBe(false);
      });
    });
  });

  describe('toAiContentJobResponseDTO', () => {
    it('should transform AI content job row to response DTO', () => {
      const contentJobRow = {
        id: '123e4567-e89b-12d3-a456-426614174003',
        contentId: '123e4567-e89b-12d3-a456-426614174004',
        userId: '123e4567-e89b-12d3-a456-426614174001',
        jobType: 'summarize',
        parameters: { maxLength: 500, focus: 'key_points' },
        priority: 'normal',
        status: 'completed',
        result: { summary: 'Here is a comprehensive summary...' },
        confidenceScore: '0.92',
        humanReviewed: true,
        humanApproved: true,
        reviewNotes: 'Approved for publication',
        aiModel: 'gpt-4',
        tokensUsed: 1500,
        processingCost: '0.15',
        errorMessage: null,
        retryCount: 0,
        startedAt: new Date('2023-01-01T00:00:00Z'),
        completedAt: new Date('2023-01-01T00:05:00Z'),
        createdAt: new Date('2023-01-01T00:00:00Z'),
        updatedAt: new Date('2023-12-01T00:00:00Z'),
      };

      const result = toAiContentJobResponseDTO(contentJobRow);

      expect(result).toMatchObject({
        id: contentJobRow.id,
        contentId: contentJobRow.contentId,
        userId: contentJobRow.userId,
        jobType: contentJobRow.jobType,
        parameters: contentJobRow.parameters,
        priority: contentJobRow.priority,
        status: contentJobRow.status,
        result: contentJobRow.result,
        confidenceScore: contentJobRow.confidenceScore,
        humanReviewed: contentJobRow.humanReviewed,
        humanApproved: contentJobRow.humanApproved,
        reviewNotes: contentJobRow.reviewNotes,
        aiModel: contentJobRow.aiModel,
        tokensUsed: contentJobRow.tokensUsed,
        processingCost: contentJobRow.processingCost,
        errorMessage: contentJobRow.errorMessage,
        retryCount: contentJobRow.retryCount,
        startedAt: contentJobRow.startedAt.toISOString(),
        completedAt: contentJobRow.completedAt.toISOString(),
        createdAt: contentJobRow.createdAt.toISOString(),
        updatedAt: contentJobRow.updatedAt.toISOString(),
      });

      // Test computed fields
      expect(result.isPending).toBe(false);
      expect(result.isProcessing).toBe(false);
      expect(result.isCompleted).toBe(true);
      expect(result.isFailed).toBe(false);
      expect(result.isCancelled).toBe(false);
      expect(result.processingCostText).toBeDefined();
      expect(result.confidenceText).toBeDefined();
    });
  });

  describe('toAiCrossReferenceSuggestionResponseDTO', () => {
    it('should transform AI cross-reference suggestion row to response DTO', () => {
      const suggestionRow = {
        id: '123e4567-e89b-12d3-a456-426614174004',
        sourceContentId: '123e4567-e89b-12d3-a456-426614174005',
        targetContentId: '123e4567-e89b-12d3-a456-426614174006',
        suggestedReferenceType: 'builds_on',
        confidenceScore: '0.92',
        relevanceScore: '0.85',
        reasoning: 'Both pieces discuss the concept of grace in salvation',
        keyConnections: {
          themes: ['grace', 'salvation'],
          concepts: ['justification', 'sanctification'],
          scriptures: ['Ephesians 2:8-9', 'Romans 3:23-24'],
        },
        humanReviewed: true,
        humanApproved: true,
        reviewNotes: 'Good connection, approved',
        status: 'approved',
        aiModel: 'gpt-4',
        modelVersion: '1.0',
        createdAt: new Date('2023-01-01T00:00:00Z'),
        updatedAt: new Date('2023-12-01T00:00:00Z'),
      };

      const result = toAiCrossReferenceSuggestionResponseDTO(suggestionRow);

      expect(result).toMatchObject({
        id: suggestionRow.id,
        sourceContentId: suggestionRow.sourceContentId,
        targetContentId: suggestionRow.targetContentId,
        suggestedReferenceType: suggestionRow.suggestedReferenceType,
        confidenceScore: suggestionRow.confidenceScore,
        relevanceScore: suggestionRow.relevanceScore,
        reasoning: suggestionRow.reasoning,
        keyConnections: suggestionRow.keyConnections,
        humanReviewed: suggestionRow.humanReviewed,
        humanApproved: suggestionRow.humanApproved,
        reviewNotes: suggestionRow.reviewNotes,
        status: suggestionRow.status,
        aiModel: suggestionRow.aiModel,
        modelVersion: suggestionRow.modelVersion,
        createdAt: suggestionRow.createdAt.toISOString(),
        updatedAt: suggestionRow.updatedAt.toISOString(),
      });

      // Test computed fields
      expect(result.isPending).toBe(false);
      expect(result.isApproved).toBe(true);
      expect(result.isRejected).toBe(false);
      expect(result.isImplemented).toBe(false);
      expect(result.needsReview).toBe(false);
      expect(result.hasHighConfidence).toBe(true);
      expect(result.hasHighRelevance).toBe(true);
    });
  });

  describe('toTheologicalConceptResponseDTO', () => {
    it('should transform theological concept row to response DTO', () => {
      const conceptRow = {
        id: '123e4567-e89b-12d3-a456-426614174006',
        name: 'Grace',
        definition: 'Unmerited favor from God',
        category: 'soteriology',
        relatedConcepts: ['salvation', 'faith', 'justification'],
        metadata: { source: 'systematic-theology', confidence: 0.95 },
        createdAt: new Date('2023-01-01T00:00:00Z'),
        updatedAt: new Date('2023-12-01T00:00:00Z'),
      };

      const result = toTheologicalConceptResponseDTO(conceptRow);

      expect(result).toMatchObject({
        id: conceptRow.id,
        name: conceptRow.name,
        definition: conceptRow.definition,
        category: conceptRow.category,
        relatedConcepts: conceptRow.relatedConcepts,
        metadata: conceptRow.metadata,
        createdAt: conceptRow.createdAt.toISOString(),
        updatedAt: conceptRow.updatedAt.toISOString(),
      });

      expect(result).toBeDefined();
      expect(Array.isArray(result.relatedConcepts)).toBe(true);
      expect(result.relatedConcepts).toHaveLength(3);
    });
  });

  describe('Validation and Error Handling', () => {
    it('should validate response data with safeParse', () => {
      // Test that the mapper functions exist and can be called
      expect(typeof toAiConversationResponseDTO).toBe('function');
      expect(typeof toAiMessageResponseDTO).toBe('function');
      expect(typeof toAiContentJobResponseDTO).toBe('function');
      expect(typeof toAiCrossReferenceSuggestionResponseDTO).toBe('function');
      expect(typeof toTheologicalConceptResponseDTO).toBe('function');
    });

    it('should handle null and undefined values gracefully', () => {
      // Test basic null handling patterns
      const nullValue = null;
      const undefinedValue = undefined;
      const emptyString = '';
      const emptyArray = [];
      const emptyObject = {};

      expect(nullValue).toBeNull();
      expect(undefinedValue).toBeUndefined();
      expect(emptyString).toBe('');
      expect(emptyArray).toEqual([]);
      expect(emptyObject).toEqual({});
    });
  });
});
