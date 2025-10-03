import type {
  assessments,
  assessmentQuestions,
  userAssessments,
  assessmentResponses,
} from '../db/schema';
import type {
  AssessmentResponse,
  AssessmentQuestionResponse,
  UserAssessmentResponse,
  AssessmentResponseResponse,
  AssessmentWithQuestionsResponse,
  UserAssessmentWithDetailsResponse,
  PaginatedAssessmentListResponse,
  PaginatedUserAssessmentListResponse,
} from '../contracts/assessments.response';
import type { ApestScores } from '../contracts/scoring';

// Drizzle row types
type AssessmentRow = typeof assessments.$inferSelect;
type AssessmentQuestionRow = typeof assessmentQuestions.$inferSelect;
type UserAssessmentRow = typeof userAssessments.$inferSelect;
type AssessmentResponseRow = typeof assessmentResponses.$inferSelect;

/**
 * Assessment Mappers - Convert Drizzle rows to UI-friendly DTOs
 *
 * These mappers handle:
 * - Null coalescing for safe UI display
 * - Date formatting for consistent API responses
 * - Computed fields for UI convenience
 * - Type safety between DB and API layers
 */

// Helper function to format duration in minutes to human-readable text
function formatDuration(minutes: number | null): string | null {
  if (!minutes) return null;

  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  }

  return `${hours}h ${remainingMinutes}m`;
}

// Helper function to format response time in seconds to human-readable text
function formatResponseTime(seconds: number | null): string | null {
  if (!seconds) return null;

  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? 's' : ''}`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (remainingSeconds === 0) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  }

  return `${minutes}m ${remainingSeconds}s`;
}

// Helper function to calculate score percentage
function calculateScorePercentage(
  totalScore: number | null,
  maxPossibleScore: number | null
): number | null {
  if (!totalScore || !maxPossibleScore || maxPossibleScore === 0) return null;
  return Math.round((totalScore / maxPossibleScore) * 100);
}

/**
 * Map AssessmentRow to AssessmentResponse
 */
export function toAssessmentResponseDTO(
  row: AssessmentRow
): AssessmentResponse {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description ?? '',
    assessmentType: row.assessmentType,
    questionsCount: row.questionsCount,
    estimatedDuration: row.estimatedDuration,
    passingScore: row.passingScore,
    version: row.version ?? '1.0',
    language: row.language ?? 'en',
    culturalAdaptation: row.culturalAdaptation ?? 'universal',
    researchBacked: row.researchBacked ?? false,
    validityScore: row.validityScore ?? '',
    reliabilityScore: row.reliabilityScore ?? '',
    instructions: row.instructions ?? '',
    scoringMethod: row.scoringMethod ?? 'likert_5',
    status: row.status ?? 'draft',

    // Computed fields for UI
    isPublished: row.publishedAt !== null,
    isActive: row.status === 'active',
    estimatedDurationText: formatDuration(row.estimatedDuration),

    // Timestamps (convert to ISO strings)
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    publishedAt: row.publishedAt?.toISOString() ?? null,
  };
}

/**
 * Map AssessmentQuestionRow to AssessmentQuestionResponse
 */
export function toAssessmentQuestionResponseDTO(
  row: AssessmentQuestionRow
): AssessmentQuestionResponse {
  return {
    id: row.id,
    assessmentId: row.assessmentId,
    questionText: row.questionText,
    questionType: row.questionType,
    orderIndex: row.orderIndex,
    isRequired: row.isRequired ?? true,
    category: row.category ?? '',
    weight: Number(row.weight ?? 1.0),
    reverseScored: row.reverseScored ?? false,
    apestDimension: row.apestDimension,
    answerOptions:
      (row.answerOptions as Array<{
        value: number;
        description: string;
        label: string;
      }>) ?? [],

    // Computed fields for UI
    hasAnswerOptions:
      Array.isArray(row.answerOptions) && row.answerOptions.length > 0,
    isApestQuestion: row.apestDimension !== null,

    // Timestamps
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

/**
 * Map UserAssessmentRow to UserAssessmentResponse
 */
export function toUserAssessmentResponseDTO(
  row: UserAssessmentRow
): UserAssessmentResponse {
  return {
    id: row.id,
    userId: row.userId,
    assessmentId: row.assessmentId,

    // Completion Status
    startedAt: row.startedAt.toISOString(),
    completedAt: row.completedAt?.toISOString() ?? null,
    completionPercentage: row.completionPercentage ?? 0,

    // Raw Scores
    rawScores: (row.rawScores as Record<string, number>) ?? {},
    totalScore: row.totalScore ?? 0,
    maxPossibleScore: row.maxPossibleScore ?? 0,

    // APEST Specific Scores
    apostolicScore: row.apostolicScore ?? 0,
    propheticScore: row.propheticScore ?? 0,
    evangelisticScore: row.evangelisticScore ?? 0,
    shepherdingScore: row.shepherdingScore ?? 0,
    teachingScore: row.teachingScore ?? 0,

    // Normalized Scores
    normalizedScores: (row.normalizedScores as Record<string, number>) ?? {},
    primaryGift: row.primaryGift ?? '',
    secondaryGift: row.secondaryGift ?? '',

    // Quality Metrics
    responseConsistency: row.responseConsistency ?? null,
    completionTime: row.completionTime ?? 0,
    confidenceLevel: row.confidenceLevel ?? 0,

    // Cultural Adjustment
    culturalAdjustmentApplied: row.culturalAdjustmentApplied ?? false,
    culturalAdjustmentFactor: row.culturalAdjustmentFactor ?? '',

    // AI Generated Insights
    aiInsights: row.aiInsights ?? '',
    personalizedRecommendations: row.personalizedRecommendations ?? {
      strengths: [],
      growthAreas: [],
      actionItems: [],
      contentRecommendations: [],
    },

    // Peer Matching
    suggestedPeers: (row.suggestedPeers as string[]) ?? [],
    complementaryGifts: (row.complementaryGifts as string[]) ?? [],

    // Computed fields for UI
    isCompleted: row.completedAt !== null,
    isInProgress:
      row.completedAt === null && (row.completionPercentage ?? 0) > 0,
    completionTimeText: formatDuration(row.completionTime),
    scorePercentage: calculateScorePercentage(
      row.totalScore,
      row.maxPossibleScore
    ),
    apestScores: {
      apostolic: row.apostolicScore ?? 0,
      prophetic: row.propheticScore ?? 0,
      evangelistic: row.evangelisticScore ?? 0,
      shepherding: row.shepherdingScore ?? 0,
      teaching: row.teachingScore ?? 0,
    },

    // Timestamps
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

/**
 * Map AssessmentResponseRow to AssessmentResponseResponse
 */
export function toAssessmentResponseResponseDTO(
  row: AssessmentResponseRow
): AssessmentResponseResponse {
  return {
    id: row.id,
    userAssessmentId: row.userAssessmentId,
    questionId: row.questionId,
    responseValue: row.responseValue ?? null,
    responseText: row.responseText ?? null,
    responseTime: row.responseTime ?? 0,
    confidence: row.confidence ?? 0,
    skipped: row.skipped ?? false,

    // Computed fields for UI
    hasResponse: row.responseValue !== null || row.responseText !== null,
    responseTimeText: formatResponseTime(row.responseTime),

    // Timestamps
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

/**
 * Map AssessmentRow with questions to AssessmentWithQuestionsResponse
 */
export function toAssessmentWithQuestionsResponseDTO(
  assessment: AssessmentRow,
  questions: AssessmentQuestionRow[]
): AssessmentWithQuestionsResponse {
  return {
    ...toAssessmentResponseDTO(assessment),
    questions: questions.map(toAssessmentQuestionResponseDTO),
  };
}

/**
 * Map UserAssessmentRow with assessment details to UserAssessmentWithDetailsResponse
 */
export function toUserAssessmentWithDetailsResponseDTO(
  userAssessment: UserAssessmentRow,
  assessment: AssessmentRow
): UserAssessmentWithDetailsResponse {
  return {
    ...toUserAssessmentResponseDTO(userAssessment),
    assessment: {
      id: assessment.id,
      name: assessment.name,
      slug: assessment.slug,
      assessmentType: assessment.assessmentType,
      questionsCount: assessment.questionsCount,
      estimatedDuration: assessment.estimatedDuration,
    },
  };
}

/**
 * Map array of AssessmentRow to PaginatedAssessmentListResponse
 */
export function toPaginatedAssessmentListResponseDTO(
  assessments: AssessmentRow[],
  pagination: {
    page: number;
    limit: number;
    total: number;
  }
): PaginatedAssessmentListResponse {
  const totalPages = Math.ceil(pagination.total / pagination.limit);

  return {
    items: assessments.map(toAssessmentResponseDTO),
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total: pagination.total,
      totalPages,
      hasNext: pagination.page < totalPages,
      hasPrev: pagination.page > 1,
    },
    success: true,
  };
}

/**
 * Map array of UserAssessmentRow with assessment details to PaginatedUserAssessmentListResponse
 */
export function toPaginatedUserAssessmentListResponseDTO(
  userAssessments: Array<{
    userAssessment: UserAssessmentRow;
    assessment: AssessmentRow;
  }>,
  pagination: {
    page: number;
    limit: number;
    total: number;
  }
): PaginatedUserAssessmentListResponse {
  const totalPages = Math.ceil(pagination.total / pagination.limit);

  return {
    items: userAssessments.map(({ userAssessment, assessment }) =>
      toUserAssessmentWithDetailsResponseDTO(userAssessment, assessment)
    ),
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total: pagination.total,
      totalPages,
      hasNext: pagination.page < totalPages,
      hasPrev: pagination.page > 1,
    },
    success: true,
  };
}
