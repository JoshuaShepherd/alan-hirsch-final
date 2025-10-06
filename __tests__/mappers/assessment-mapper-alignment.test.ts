import type { CreateAssessment, UpdateAssessment } from '@platform/contracts';
import type {
  assessmentQuestions,
  assessmentResponses,
  assessments,
  userAssessments,
} from '@platform/database';
import { describe, expect, it } from 'vitest';

// Import the actual mapper functions
import {
  calculateScorePercentage,
  formatDuration,
  formatResponseTime,
  fromCreateAssessment,
  fromUpdateAssessment,
  toAssessmentQuestionResponseDTO,
  toAssessmentResponseDTO,
  toAssessmentResponseResponseDTO,
  toAssessmentWithQuestionsResponseDTO,
  toPaginatedAssessmentListResponseDTO,
  toPaginatedUserAssessmentListResponseDTO,
  toUserAssessmentResponseDTO,
} from '../../packages/shared/src/mappers/assessments';

// Drizzle row types
type AssessmentRow = typeof assessments.$inferSelect;
type AssessmentQuestionRow = typeof assessmentQuestions.$inferSelect;
type UserAssessmentRow = typeof userAssessments.$inferSelect;
type AssessmentResponseRow = typeof assessmentResponses.$inferSelect;

describe('Assessment Mapper Alignment Tests', () => {
  // Mock database rows that match the actual Drizzle types
  const mockAssessmentRow: AssessmentRow = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'APEST Assessment',
    slug: 'apest-assessment',
    description: 'A comprehensive assessment for identifying APEST gifts',
    assessmentType: 'apest',
    questionsCount: 50,
    estimatedDuration: 30,
    passingScore: 70,
    validityScore: '0.85',
    reliabilityScore: '0.92',
    instructions: 'Please answer all questions honestly and thoughtfully.',
    publishedAt: new Date('2023-01-01T00:00:00Z'),
    version: '2.0',
    language: 'en',
    culturalAdaptation: 'universal',
    researchBacked: true,
    scoringMethod: 'likert_5',
    status: 'active',
    createdAt: new Date('2023-01-01T00:00:00Z'),
    updatedAt: new Date('2023-12-01T00:00:00Z'),
  };

  const mockAssessmentQuestionRow: AssessmentQuestionRow = {
    id: '123e4567-e89b-12d3-a456-426614174001',
    assessmentId: '123e4567-e89b-12d3-a456-426614174000',
    questionText:
      'I am naturally drawn to pioneering new initiatives and starting new projects.',
    questionType: 'likert',
    orderIndex: 1,
    category: 'apostolic',
    apestDimension: 'apostolic',
    answerOptions: [
      {
        value: 1,
        label: 'Strongly Disagree',
        description: 'This does not describe me at all',
      },
      { value: 2, label: 'Disagree', description: 'This rarely describes me' },
      {
        value: 3,
        label: 'Neutral',
        description: 'This sometimes describes me',
      },
      { value: 4, label: 'Agree', description: 'This often describes me' },
      {
        value: 5,
        label: 'Strongly Agree',
        description: 'This always describes me',
      },
    ],
    isRequired: true,
    weight: 1.0,
    reverseScored: false,
    createdAt: new Date('2023-01-01T00:00:00Z'),
    updatedAt: new Date('2023-12-01T00:00:00Z'),
  };

  const mockUserAssessmentRow: UserAssessmentRow = {
    id: '123e4567-e89b-12d3-a456-426614174002',
    userId: '123e4567-e89b-12d3-a456-426614174003',
    assessmentId: '123e4567-e89b-12d3-a456-426614174000',
    startedAt: new Date('2023-01-15T10:00:00Z'),
    completedAt: new Date('2023-01-15T10:45:00Z'),
    completionPercentage: 100,
    rawScores: {
      apostolic: 85,
      prophetic: 72,
      evangelistic: 78,
      shepherding: 82,
      teaching: 90,
    },
    totalScore: 407,
    maxPossibleScore: 500,
    apostolicScore: 85,
    propheticScore: 72,
    evangelisticScore: 78,
    shepherdingScore: 82,
    teachingScore: 90,
    normalizedScores: {
      apostolic: 0.85,
      prophetic: 0.72,
      evangelistic: 0.78,
      shepherding: 0.82,
      teaching: 0.9,
    },
    primaryGift: 'teaching',
    secondaryGift: 'apostolic',
    responseConsistency: '0.92',
    completionTime: 45,
    confidenceLevel: 4,
    culturalAdjustmentApplied: true,
    culturalAdjustmentFactor: '1.1',
    aiInsights:
      'Strong teaching and apostolic gifts with excellent consistency in responses.',
    personalizedRecommendations: {
      strengths: ['Natural teacher', 'Pioneering spirit'],
      growthAreas: ['Evangelistic outreach', 'Prophetic sensitivity'],
      actionItems: ['Develop teaching materials', 'Start new initiatives'],
      contentRecommendations: [
        'Teaching-focused content',
        'Leadership development',
      ],
    },
    suggestedPeers: ['user-123', 'user-456'],
    complementaryGifts: ['evangelistic', 'prophetic'],
    createdAt: new Date('2023-01-15T10:00:00Z'),
    updatedAt: new Date('2023-01-15T10:45:00Z'),
  };

  const mockAssessmentResponseRow: AssessmentResponseRow = {
    id: '123e4567-e89b-12d3-a456-426614174004',
    userAssessmentId: '123e4567-e89b-12d3-a456-426614174002',
    questionId: '123e4567-e89b-12d3-a456-426614174001',
    responseValue: 4,
    responseText: null,
    responseTime: 45,
    confidence: 4,
    skipped: false,
    createdAt: new Date('2023-01-15T10:05:00Z'),
    updatedAt: new Date('2023-01-15T10:05:00Z'),
  };

  describe('toAssessmentResponseDTO', () => {
    it('should transform AssessmentRow to AssessmentEntity correctly', () => {
      const result = toAssessmentResponseDTO(mockAssessmentRow);

      expect(result).toMatchObject({
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'APEST Assessment',
        slug: 'apest-assessment',
        description: 'A comprehensive assessment for identifying APEST gifts',
        assessmentType: 'apest',
        questionsCount: 50,
        estimatedDuration: 30,
        passingScore: 70,
        validityScore: 0.85,
        reliabilityScore: 0.92,
        instructions: 'Please answer all questions honestly and thoughtfully.',
        publishedAt: '2023-01-01T00:00:00.000Z',
        version: '2.0',
        language: 'en',
        culturalAdaptation: 'universal',
        researchBacked: true,
        scoringMethod: 'likert_5',
        status: 'active',
      });

      // Validate timestamps are ISO strings
      expect(result.createdAt).toBe('2023-01-01T00:00:00.000Z');
      expect(result.updatedAt).toBe('2023-12-01T00:00:00.000Z');
    });

    it('should handle null and undefined values correctly', () => {
      const rowWithNulls: AssessmentRow = {
        ...mockAssessmentRow,
        description: null,
        estimatedDuration: null,
        passingScore: null,
        validityScore: null,
        reliabilityScore: null,
        instructions: null,
        publishedAt: null,
      };

      const result = toAssessmentResponseDTO(rowWithNulls);

      expect(result.description).toBeUndefined();
      expect(result.estimatedDuration).toBeUndefined();
      expect(result.passingScore).toBeUndefined();
      expect(result.validityScore).toBeUndefined();
      expect(result.reliabilityScore).toBeUndefined();
      expect(result.instructions).toBeUndefined();
      expect(result.publishedAt).toBeUndefined();
    });

    it('should convert decimal fields to numbers', () => {
      const result = toAssessmentResponseDTO(mockAssessmentRow);

      expect(typeof result.validityScore).toBe('number');
      expect(typeof result.reliabilityScore).toBe('number');
      expect(result.validityScore).toBe(0.85);
      expect(result.reliabilityScore).toBe(0.92);
    });
  });

  describe('toAssessmentQuestionResponseDTO', () => {
    it('should transform AssessmentQuestionRow to AssessmentQuestionResponse correctly', () => {
      const result = toAssessmentQuestionResponseDTO(mockAssessmentQuestionRow);

      expect(result).toMatchObject({
        id: '123e4567-e89b-12d3-a456-426614174001',
        assessmentId: '123e4567-e89b-12d3-a456-426614174000',
        questionText:
          'I am naturally drawn to pioneering new initiatives and starting new projects.',
        questionType: 'likert',
        orderIndex: 1,
        category: 'apostolic',
        apestDimension: 'apostolic',
        answerOptions: [
          {
            value: 1,
            label: 'Strongly Disagree',
            description: 'This does not describe me at all',
          },
          {
            value: 2,
            label: 'Disagree',
            description: 'This rarely describes me',
          },
          {
            value: 3,
            label: 'Neutral',
            description: 'This sometimes describes me',
          },
          { value: 4, label: 'Agree', description: 'This often describes me' },
          {
            value: 5,
            label: 'Strongly Agree',
            description: 'This always describes me',
          },
        ],
        isRequired: true,
        weight: 1.0,
        reverseScored: false,
      });

      // Validate computed fields
      expect(result.hasOptions).toBe(true);
      expect(result.isReverseScored).toBe(false);
      expect(result.typeDisplay).toBe('Likert');
      expect(result.dimensionDisplay).toBe('Apostolic');

      // Validate related data
      expect(result.assessment).toEqual({
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Assessment',
        slug: 'assessment',
        assessmentType: 'apest',
      });

      // Validate timestamps are ISO strings
      expect(result.createdAt).toBe('2023-01-01T00:00:00.000Z');
      expect(result.updatedAt).toBe('2023-12-01T00:00:00.000Z');
    });

    it('should handle questions without answer options', () => {
      const questionWithoutOptions: AssessmentQuestionRow = {
        ...mockAssessmentQuestionRow,
        answerOptions: null,
      };

      const result = toAssessmentQuestionResponseDTO(questionWithoutOptions);

      expect(result.hasOptions).toBe(false);
      expect(result.answerOptions).toEqual([]);
    });

    it('should handle reverse scored questions', () => {
      const reverseScoredQuestion: AssessmentQuestionRow = {
        ...mockAssessmentQuestionRow,
        reverseScored: true,
      };

      const result = toAssessmentQuestionResponseDTO(reverseScoredQuestion);

      expect(result.isReverseScored).toBe(true);
    });
  });

  describe('toUserAssessmentResponseDTO', () => {
    it('should transform UserAssessmentRow to UserAssessmentResponse correctly', () => {
      const result = toUserAssessmentResponseDTO(mockUserAssessmentRow);

      expect(result).toMatchObject({
        id: '123e4567-e89b-12d3-a456-426614174002',
        userId: '123e4567-e89b-12d3-a456-426614174003',
        assessmentId: '123e4567-e89b-12d3-a456-426614174000',
        startedAt: '2023-01-15T10:00:00.000Z',
        completedAt: '2023-01-15T10:45:00.000Z',
        completionPercentage: 100,
        rawScores: {
          apostolic: 85,
          prophetic: 72,
          evangelistic: 78,
          shepherding: 82,
          teaching: 90,
        },
        totalScore: 407,
        maxPossibleScore: 500,
        apostolicScore: 85,
        propheticScore: 72,
        evangelisticScore: 78,
        shepherdingScore: 82,
        teachingScore: 90,
        normalizedScores: {
          apostolic: 0.85,
          prophetic: 0.72,
          evangelistic: 0.78,
          shepherding: 0.82,
          teaching: 0.9,
        },
        primaryGift: 'teaching',
        secondaryGift: 'apostolic',
        completionTime: 45,
        confidenceLevel: 4,
        culturalAdjustmentApplied: true,
        aiInsights:
          'Strong teaching and apostolic gifts with excellent consistency in responses.',
        suggestedPeers: ['user-123', 'user-456'],
        complementaryGifts: ['evangelistic', 'prophetic'],
      });

      // Validate computed fields
      expect(result.isCompleted).toBe(true);
      expect(result.isInProgress).toBe(false);
      expect(result.completionStatus).toBe('completed');
      expect(result.durationText).toBe('45 minutes');
      expect(result.scorePercentage).toBe(81);

      // Validate APEST profile
      expect(result.apestProfile).toEqual({
        apostolic: 85,
        prophetic: 72,
        evangelistic: 78,
        shepherding: 82,
        teaching: 90,
        dominant: 'teaching',
        secondary: 'apostolic',
      });

      // Validate related data
      expect(result.user).toEqual({
        id: '123e4567-e89b-12d3-a456-426614174003',
        firstName: '',
        lastName: '',
        displayName: undefined,
      });

      expect(result.assessment).toEqual({
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: '',
        slug: '',
        assessmentType: 'apest',
        questionsCount: 0,
      });

      // Validate timestamps are ISO strings
      expect(result.createdAt).toBe('2023-01-15T10:00:00.000Z');
      expect(result.updatedAt).toBe('2023-01-15T10:45:00.000Z');
    });

    it('should handle in-progress assessments', () => {
      const inProgressRow: UserAssessmentRow = {
        ...mockUserAssessmentRow,
        completedAt: null,
        completionPercentage: 60,
      };

      const result = toUserAssessmentResponseDTO(inProgressRow);

      expect(result.isCompleted).toBe(false);
      expect(result.isInProgress).toBe(true);
      expect(result.completionStatus).toBe('in_progress');
      expect(result.completedAt).toBeUndefined();
    });

    it('should convert decimal fields to numbers', () => {
      const result = toUserAssessmentResponseDTO(mockUserAssessmentRow);

      expect(typeof result.responseConsistency).toBe('number');
      expect(typeof result.culturalAdjustmentFactor).toBe('number');
      expect(result.responseConsistency).toBe(0.92);
      expect(result.culturalAdjustmentFactor).toBe(1.1);
    });
  });

  describe('toAssessmentResponseResponseDTO', () => {
    it('should transform AssessmentResponseRow to AssessmentResponseResponse correctly', () => {
      const result = toAssessmentResponseResponseDTO(mockAssessmentResponseRow);

      expect(result).toMatchObject({
        id: '123e4567-e89b-12d3-a456-426614174004',
        userAssessmentId: '123e4567-e89b-12d3-a456-426614174002',
        questionId: '123e4567-e89b-12d3-a456-426614174001',
        responseValue: 4,
        responseText: undefined,
        responseTime: 45,
        confidence: 4,
        skipped: false,
      });

      // Validate computed fields
      expect(result.isSkipped).toBe(false);
      expect(result.hasValue).toBe(true);
      expect(result.hasText).toBe(false);
      expect(result.responseTimeText).toBe('45 seconds');
      expect(result.confidenceDisplay).toBe('4/5');

      // Validate related data
      expect(result.question).toEqual({
        id: '123e4567-e89b-12d3-a456-426614174001',
        questionText: '',
        questionType: '',
        orderIndex: 0,
        apestDimension: undefined,
      });

      expect(result.userAssessment).toEqual({
        id: '123e4567-e89b-12d3-a456-426614174002',
        userId: '',
        assessmentId: '',
        completedAt: undefined,
      });

      // Validate timestamps are ISO strings
      expect(result.createdAt).toBe('2023-01-15T10:05:00.000Z');
      expect(result.updatedAt).toBe('2023-01-15T10:05:00.000Z');
    });

    it('should handle skipped responses', () => {
      const skippedResponse: AssessmentResponseRow = {
        ...mockAssessmentResponseRow,
        skipped: true,
        responseValue: null,
        responseText: null,
      };

      const result = toAssessmentResponseResponseDTO(skippedResponse);

      expect(result.isSkipped).toBe(true);
      expect(result.hasValue).toBe(false);
      expect(result.hasText).toBe(false);
    });

    it('should handle text responses', () => {
      const textResponse: AssessmentResponseRow = {
        ...mockAssessmentResponseRow,
        responseValue: null,
        responseText: 'This is a text response',
      };

      const result = toAssessmentResponseResponseDTO(textResponse);

      expect(result.hasValue).toBe(false);
      expect(result.hasText).toBe(true);
      expect(result.responseText).toBe('This is a text response');
    });
  });

  describe('fromCreateAssessment', () => {
    it('should transform CreateAssessment to database insert format', () => {
      const createData: CreateAssessment = {
        name: 'New Assessment',
        slug: 'new-assessment',
        description: 'A new assessment for testing',
        assessmentType: 'cultural_intelligence',
        questionsCount: 25,
        estimatedDuration: 20,
        passingScore: 75,
        validityScore: 0.8,
        reliabilityScore: 0.85,
        instructions: 'Please complete this assessment honestly.',
        publishedAt: '2023-12-01T00:00:00Z',
        version: '1.0',
        language: 'en',
        culturalAdaptation: 'western',
        researchBacked: false,
        scoringMethod: 'likert_7',
        status: 'draft',
      };

      const result = fromCreateAssessment(createData);

      expect(result).toMatchObject({
        name: 'New Assessment',
        slug: 'new-assessment',
        description: 'A new assessment for testing',
        assessmentType: 'cultural_intelligence',
        questionsCount: 25,
        estimatedDuration: 20,
        passingScore: 75,
        validityScore: '0.80',
        reliabilityScore: '0.85',
        instructions: 'Please complete this assessment honestly.',
        publishedAt: new Date('2023-12-01T00:00:00Z'),
        version: '1.0',
        language: 'en',
        culturalAdaptation: 'western',
        researchBacked: false,
        scoringMethod: 'likert_7',
        status: 'draft',
      });

      // Should not include id, createdAt, updatedAt (generated by database)
      expect(result.id).toBeUndefined();
      expect(result.createdAt).toBeUndefined();
      expect(result.updatedAt).toBeUndefined();
    });

    it('should convert decimal values to strings for database', () => {
      const createData: CreateAssessment = {
        name: 'Test Assessment',
        slug: 'test-assessment',
        assessmentType: 'apest',
        questionsCount: 10,
        validityScore: 0.75,
        reliabilityScore: 0.82,
      };

      const result = fromCreateAssessment(createData);

      expect(typeof result.validityScore).toBe('string');
      expect(typeof result.reliabilityScore).toBe('string');
      expect(result.validityScore).toBe('0.75');
      expect(result.reliabilityScore).toBe('0.82');
    });
  });

  describe('fromUpdateAssessment', () => {
    it('should transform UpdateAssessment to database update format', () => {
      const updateData: UpdateAssessment = {
        name: 'Updated Assessment Name',
        description: 'Updated description',
        estimatedDuration: 35,
        passingScore: 80,
        status: 'active',
      };

      const result = fromUpdateAssessment(updateData);

      expect(result).toMatchObject({
        name: 'Updated Assessment Name',
        description: 'Updated description',
        estimatedDuration: 35,
        passingScore: 80,
        status: 'active',
      });

      // Should always update the updatedAt timestamp
      expect(result.updatedAt).toBeInstanceOf(Date);
    });

    it('should only include defined fields in update', () => {
      const updateData: UpdateAssessment = {
        name: 'Only Name Update',
      };

      const result = fromUpdateAssessment(updateData);

      expect(result.name).toBe('Only Name Update');
      expect(result.description).toBeUndefined();
      expect(result.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe('Utility Functions', () => {
    describe('formatDuration', () => {
      it('should format duration in minutes correctly', () => {
        expect(formatDuration(30)).toBe('30 minutes');
        expect(formatDuration(1)).toBe('1 minute');
        expect(formatDuration(0)).toBe('0 minutes');
      });

      it('should handle null values', () => {
        expect(formatDuration(null)).toBeNull();
      });
    });

    describe('formatResponseTime', () => {
      it('should format response time in seconds correctly', () => {
        expect(formatResponseTime(30)).toBe('30 seconds');
        expect(formatResponseTime(1)).toBe('1 second');
        expect(formatResponseTime(90)).toBe('1 minute 30 seconds');
        expect(formatResponseTime(3665)).toBe('1 hour 1 minute 5 seconds');
      });

      it('should handle null values', () => {
        expect(formatResponseTime(null)).toBeNull();
      });
    });

    describe('calculateScorePercentage', () => {
      it('should calculate score percentage correctly', () => {
        expect(calculateScorePercentage(400, 500)).toBe(80);
        expect(calculateScorePercentage(250, 500)).toBe(50);
        expect(calculateScorePercentage(500, 500)).toBe(100);
        expect(calculateScorePercentage(0, 500)).toBe(0);
      });

      it('should handle null values', () => {
        expect(calculateScorePercentage(null, 500)).toBeNull();
        expect(calculateScorePercentage(400, null)).toBeNull();
        expect(calculateScorePercentage(null, null)).toBeNull();
      });

      it('should handle zero max score', () => {
        expect(calculateScorePercentage(400, 0)).toBeNull();
      });
    });
  });

  describe('Array Mappers', () => {
    describe('toAssessmentWithQuestionsResponseDTO', () => {
      it('should map assessment with questions correctly', () => {
        const questions = [mockAssessmentQuestionRow];
        const result = toAssessmentWithQuestionsResponseDTO(
          mockAssessmentRow,
          questions
        );

        // Should return the assessment entity (type assertion handles schema mismatch)
        expect(result).toMatchObject({
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'APEST Assessment',
          assessmentType: 'apest',
        });
      });
    });

    describe('toPaginatedAssessmentListResponseDTO', () => {
      it('should map paginated assessment list correctly', () => {
        const assessments = [mockAssessmentRow];
        const pagination = {
          page: 1,
          limit: 10,
          total: 1,
        };

        const result = toPaginatedAssessmentListResponseDTO(
          assessments,
          pagination
        );

        expect(result).toMatchObject({
          data: expect.any(Array),
          pagination: {
            page: 1,
            limit: 10,
            total: 1,
            hasMore: false,
          },
        });

        expect(result.data).toHaveLength(1);
      });
    });

    describe('toPaginatedUserAssessmentListResponseDTO', () => {
      it('should map paginated user assessment list correctly', () => {
        const userAssessments = [mockUserAssessmentRow];
        const pagination = {
          page: 1,
          limit: 10,
          total: 1,
        };

        const result = toPaginatedUserAssessmentListResponseDTO(
          userAssessments,
          pagination
        );

        expect(result).toMatchObject({
          data: expect.any(Array),
          pagination: {
            page: 1,
            limit: 10,
            total: 1,
            hasMore: false,
          },
        });

        expect(result.data).toHaveLength(1);
      });
    });
  });
});
