// Mapper validation tests to ensure round-trip consistency
import { describe, expect, it } from 'vitest';
import {
  fromCreateAssessmentQuestionDTO,
  toAssessmentQuestionDTO,
} from '../assessmentquestions.mapper';
import {
  fromCreateAssessmentDTO,
  toAssessmentDTO,
} from '../assessments.mapper';
import {
  fromCreateUserAssessmentDTO,
  toUserAssessmentDTO,
} from '../userassessments.mapper';

describe('Mapper Validation', () => {
  describe('Assessment Question Mappers', () => {
    it('should maintain data integrity through round-trip conversion', () => {
      const questionCreateData = {
        assessmentId: 'test-assessment-id',
        questionText: 'Test question text',
        questionType: 'multiple_choice',
        orderIndex: 1,
        isRequired: true,
        category: 'spiritual_gifts',
        weight: 1.0,
        reverseScored: false,
        apestDimension: 'apostolic',
        answerOptions: [
          {
            value: 1,
            label: 'Strongly Disagree',
            description: 'Not at all like me',
          },
          { value: 2, label: 'Disagree', description: 'Somewhat unlike me' },
          {
            value: 3,
            label: 'Neutral',
            description: 'Neither like nor unlike me',
          },
          { value: 4, label: 'Agree', description: 'Somewhat like me' },
          {
            value: 5,
            label: 'Strongly Agree',
            description: 'Very much like me',
          },
        ],
      };

      // Convert to database format
      const dbFormat = fromCreateAssessmentQuestionDTO(questionCreateData);

      // Mock database row format
      const mockDbRow = {
        id: 'test-question-id',
        ...dbFormat,
        createdAt: new Date('2025-01-27T10:00:00Z'),
        updatedAt: new Date('2025-01-27T10:00:00Z'),
      };

      // Convert back to DTO
      const resultDTO = toAssessmentQuestionDTO(mockDbRow);

      // Verify key fields are preserved
      expect(resultDTO.assessmentId).toBe(questionCreateData.assessmentId);
      expect(resultDTO.questionText).toBe(questionCreateData.questionText);
      expect(resultDTO.questionType).toBe(questionCreateData.questionType);
      expect(resultDTO.orderIndex).toBe(questionCreateData.orderIndex);
      expect(resultDTO.isRequired).toBe(questionCreateData.isRequired);
      expect(resultDTO.category).toBe(questionCreateData.category);
      expect(resultDTO.weight).toBe(questionCreateData.weight);
      expect(resultDTO.reverseScored).toBe(questionCreateData.reverseScored);
      expect(resultDTO.apestDimension).toBe(questionCreateData.apestDimension);
      expect(resultDTO.answerOptions).toEqual(questionCreateData.answerOptions);
    });
  });

  describe('Assessment Mappers', () => {
    it('should maintain data integrity through round-trip conversion', () => {
      const assessmentCreateData = {
        name: 'Test Assessment',
        slug: 'test-assessment',
        description: 'A test assessment',
        assessmentType: 'spiritual_gifts',
        questionsCount: 10,
        estimatedDuration: 30,
        passingScore: 70,
        version: '1.0',
        language: 'en',
        culturalAdaptation: 'US',
        researchBacked: true,
        validityScore: 0.85,
        reliabilityScore: 0.9,
        instructions: 'Please answer honestly',
        scoringMethod: 'weighted',
        status: 'published' as const,
        publishedAt: '2025-01-27T10:00:00Z',
      };

      // Convert to database format
      const dbFormat = fromCreateAssessmentDTO(assessmentCreateData);

      // Mock database row format
      const mockDbRow = {
        id: 'test-id',
        ...dbFormat,
        createdAt: new Date('2025-01-27T10:00:00Z'),
        updatedAt: new Date('2025-01-27T10:00:00Z'),
      };

      // Convert back to DTO
      const resultDTO = toAssessmentDTO(mockDbRow);

      // Verify key fields are preserved
      expect(resultDTO.name).toBe(assessmentCreateData.name);
      expect(resultDTO.slug).toBe(assessmentCreateData.slug);
      expect(resultDTO.description).toBe(assessmentCreateData.description);
      expect(resultDTO.assessmentType).toBe(
        assessmentCreateData.assessmentType
      );
      expect(resultDTO.questionsCount).toBe(
        assessmentCreateData.questionsCount
      );
      expect(resultDTO.estimatedDuration).toBe(
        assessmentCreateData.estimatedDuration
      );
      expect(resultDTO.passingScore).toBe(assessmentCreateData.passingScore);
    });
  });

  describe('User Assessment Mappers', () => {
    it('should maintain data integrity through round-trip conversion', () => {
      const userAssessmentCreateData = {
        userId: 'test-user-id',
        assessmentId: 'test-assessment-id',
        startedAt: '2025-01-27T10:00:00Z',
        completedAt: '2025-01-27T10:30:00Z',
        completionPercentage: 100,
        rawScores: { question1: 5, question2: 4, question3: 5 },
        totalScore: 85,
        maxPossibleScore: 100,
        apostolicScore: 20,
        propheticScore: 18,
        evangelisticScore: 16,
        shepherdingScore: 15,
        teachingScore: 16,
        normalizedScores: {
          apostolic: 0.8,
          prophetic: 0.7,
          evangelistic: 0.6,
          shepherding: 0.6,
          teaching: 0.6,
        },
        primaryGift: 'apostolic',
        secondaryGift: 'prophetic',
        responseConsistency: 0.95,
        completionTime: 1800,
        confidenceLevel: 85,
        culturalAdjustmentApplied: false,
        culturalAdjustmentFactor: 1.0,
        aiInsights: 'Strong apostolic and prophetic gifts identified',
        personalizedRecommendations: {
          strengths: ['Leadership', 'Innovation'],
          growthAreas: ['Pastoral care', 'Teaching'],
          actionItems: [
            'Join leadership development program',
            'Practice teaching skills',
          ],
          contentRecommendations: [
            'Apostolic ministry resources',
            'Prophetic development materials',
          ],
        },
        suggestedPeers: ['user-123', 'user-456'],
        complementaryGifts: ['teaching', 'evangelistic'],
      };

      // Convert to database format
      const dbFormat = fromCreateUserAssessmentDTO(userAssessmentCreateData);

      // Mock database row format
      const mockDbRow = {
        id: 'test-user-assessment-id',
        ...dbFormat,
        createdAt: new Date('2025-01-27T10:00:00Z'),
        updatedAt: new Date('2025-01-27T10:30:00Z'),
      };

      // Convert back to DTO
      const resultDTO = toUserAssessmentDTO(mockDbRow);

      // Verify key fields are preserved
      expect(resultDTO.userId).toBe(userAssessmentCreateData.userId);
      expect(resultDTO.assessmentId).toBe(
        userAssessmentCreateData.assessmentId
      );
      expect(resultDTO.completionPercentage).toBe(
        userAssessmentCreateData.completionPercentage
      );
      expect(resultDTO.totalScore).toBe(userAssessmentCreateData.totalScore);
      expect(resultDTO.maxPossibleScore).toBe(
        userAssessmentCreateData.maxPossibleScore
      );
      expect(resultDTO.apostolicScore).toBe(
        userAssessmentCreateData.apostolicScore
      );
      expect(resultDTO.propheticScore).toBe(
        userAssessmentCreateData.propheticScore
      );
      expect(resultDTO.evangelisticScore).toBe(
        userAssessmentCreateData.evangelisticScore
      );
      expect(resultDTO.shepherdingScore).toBe(
        userAssessmentCreateData.shepherdingScore
      );
      expect(resultDTO.teachingScore).toBe(
        userAssessmentCreateData.teachingScore
      );
      expect(resultDTO.primaryGift).toBe(userAssessmentCreateData.primaryGift);
      expect(resultDTO.secondaryGift).toBe(
        userAssessmentCreateData.secondaryGift
      );
      expect(resultDTO.responseConsistency).toBe(
        userAssessmentCreateData.responseConsistency
      );
      expect(resultDTO.completionTime).toBe(
        userAssessmentCreateData.completionTime
      );
      expect(resultDTO.confidenceLevel).toBe(
        userAssessmentCreateData.confidenceLevel
      );
      expect(resultDTO.aiInsights).toBe(userAssessmentCreateData.aiInsights);
      expect(resultDTO.personalizedRecommendations).toEqual(
        userAssessmentCreateData.personalizedRecommendations
      );
      expect(resultDTO.suggestedPeers).toEqual(
        userAssessmentCreateData.suggestedPeers
      );
      expect(resultDTO.complementaryGifts).toEqual(
        userAssessmentCreateData.complementaryGifts
      );
    });
  });
});
