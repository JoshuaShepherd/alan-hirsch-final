import type {
  AssessmentEntity,
  AssessmentQuestionResponse,
  AssessmentResponseResponse,
  AssessmentWithQuestionsResponse,
  CreateAssessment,
  CreateAssessmentQuestion,
  CreateAssessmentResponse,
  CreateUserAssessment,
  PaginatedAssessmentListResponse,
  PaginatedUserAssessmentListResponse,
  UpdateAssessment,
  UpdateAssessmentQuestion,
  UpdateAssessmentResponse,
  UpdateUserAssessment,
  UserAssessmentResponse,
  UserAssessmentWithDetailsResponse,
} from '@platform/contracts';
import {
  assessmentEntitySchema,
  assessmentQuestionResponseSchema,
  createAssessmentQuestionSchema,
  createAssessmentResponseSchema,
  createAssessmentSchema,
  createUserAssessmentSchema,
  updateAssessmentQuestionSchema,
  updateAssessmentResponseSchema,
  updateAssessmentSchema,
  updateUserAssessmentSchema,
} from '@platform/contracts';
import type {
  assessmentQuestions,
  assessmentResponses,
  assessments,
  userAssessments,
} from '@platform/database';

// Drizzle row types
type AssessmentRow = typeof assessments.$inferSelect;
type AssessmentQuestionRow = typeof assessmentQuestions.$inferSelect;
type UserAssessmentRow = typeof userAssessments.$inferSelect;
type AssessmentResponseRow = typeof assessmentResponses.$inferSelect;

// Drizzle insert types
type NewAssessmentRow = typeof assessments.$inferInsert;
type NewAssessmentQuestionRow = typeof assessmentQuestions.$inferInsert;
type NewUserAssessmentRow = typeof userAssessments.$inferInsert;
type NewAssessmentResponseRow = typeof assessmentResponses.$inferInsert;

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
 * Map AssessmentRow to AssessmentEntity
 */
export function toAssessmentEntity(row: AssessmentRow): AssessmentEntity {
  const entity: AssessmentEntity = {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description ?? undefined,
    assessmentType: row.assessmentType,
    questionsCount: row.questionsCount,
    estimatedDuration: row.estimatedDuration ?? undefined,
    passingScore: row.passingScore ?? undefined,
    version: row.version ?? '1.0',
    language: row.language ?? 'en',
    culturalAdaptation: row.culturalAdaptation ?? 'universal',
    researchBacked: row.researchBacked ?? false,
    validityScore: row.validityScore ? Number(row.validityScore) : undefined,
    reliabilityScore: row.reliabilityScore
      ? Number(row.reliabilityScore)
      : undefined,
    instructions: row.instructions ?? undefined,
    scoringMethod: row.scoringMethod ?? 'likert_5',
    status: row.status ?? 'draft',

    // Timestamps (convert to ISO strings)
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    publishedAt: row.publishedAt?.toISOString() ?? undefined,
  };

  // Validate against Zod schema in development
  if (
    process.env['NODE_ENV'] === 'development' ||
    process.env['NODE_ENV'] === 'test'
  ) {
    const validation = assessmentEntitySchema.safeParse(entity);
    if (!validation.success) {
      throw new Error(
        `AssessmentEntity validation failed: ${validation.error.message}`
      );
    }
  }

  return entity;
}

/**
 * Map AssessmentRow to AssessmentEntity (legacy alias)
 */
export function toAssessmentResponseDTO(row: AssessmentRow): AssessmentEntity {
  return toAssessmentEntity(row);
}

/**
 * Map AssessmentQuestionRow to AssessmentQuestionResponse
 */
export function toAssessmentQuestionResponseDTO(
  row: AssessmentQuestionRow
): AssessmentQuestionResponse {
  const response: AssessmentQuestionResponse = {
    id: row.id,
    assessmentId: row.assessmentId,
    questionText: row.questionText,
    questionType: row.questionType,
    orderIndex: row.orderIndex,
    isRequired: row.isRequired ?? true,
    category: row.category ?? '',
    weight: Number(row.weight ?? 1.0),
    reverseScored: row.reverseScored ?? false,
    apestDimension: row.apestDimension ?? undefined,
    answerOptions:
      (row.answerOptions as Array<{
        value: number;
        label: string;
        description: string;
      }>) ?? [],

    // Computed fields for UI
    hasOptions:
      Array.isArray(row.answerOptions) && row.answerOptions.length > 0,
    isReverseScored: row.reverseScored ?? false,
    typeDisplay: row.questionType
      .replace('_', ' ')
      .replace(/\b\w/g, l => l.toUpperCase()),
    dimensionDisplay: row.apestDimension ?? undefined,

    // Related data
    assessment: {
      id: row.assessmentId,
      name: 'Assessment', // Would need to be passed from parent
      slug: 'assessment', // Would need to be passed from parent
      assessmentType: 'apest', // Would need to be passed from parent
    },

    // Timestamps
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };

  // Validate against Zod schema in development
  if (
    process.env['NODE_ENV'] === 'development' ||
    process.env['NODE_ENV'] === 'test'
  ) {
    const validation = assessmentQuestionResponseSchema.safeParse(response);
    if (!validation.success) {
      throw new Error(
        `AssessmentQuestionResponse validation failed: ${validation.error.message}`
      );
    }
  }

  return response;
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
    completedAt: row.completedAt?.toISOString() ?? undefined,
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
    primaryGift: row.primaryGift ?? undefined,
    secondaryGift: row.secondaryGift ?? undefined,

    // Quality Metrics
    responseConsistency: row.responseConsistency
      ? Number(row.responseConsistency)
      : undefined,
    completionTime: row.completionTime ?? undefined,
    confidenceLevel: row.confidenceLevel ?? undefined,

    // Cultural Adjustment
    culturalAdjustmentApplied: row.culturalAdjustmentApplied ?? false,
    culturalAdjustmentFactor: row.culturalAdjustmentFactor
      ? Number(row.culturalAdjustmentFactor)
      : undefined,

    // AI Generated Insights
    aiInsights: row.aiInsights ?? undefined,
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
    durationText: formatDuration(row.completionTime) ?? 'Not completed',
    scorePercentage:
      calculateScorePercentage(row.totalScore, row.maxPossibleScore) ?? 0,
    apestProfile: {
      apostolic: row.apostolicScore ?? 0,
      prophetic: row.propheticScore ?? 0,
      evangelistic: row.evangelisticScore ?? 0,
      shepherding: row.shepherdingScore ?? 0,
      teaching: row.teachingScore ?? 0,
      dominant: row.primaryGift ?? 'unknown',
      secondary: row.secondaryGift ?? 'unknown',
    },

    // Additional required fields
    completionStatus: row.completedAt ? 'completed' : 'in_progress',
    user: {
      id: row.userId,
      firstName: '', // Would need to be passed from parent
      lastName: '', // Would need to be passed from parent
      displayName: undefined, // Would need to be passed from parent
    },
    assessment: {
      id: row.assessmentId,
      name: '', // Would need to be passed from parent
      slug: '', // Would need to be passed from parent
      assessmentType: 'apest', // Would need to be passed from parent
      questionsCount: 0, // Would need to be passed from parent
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
    responseValue: row.responseValue ?? undefined,
    responseText: row.responseText ?? undefined,
    responseTime: row.responseTime ?? undefined,
    confidence: row.confidence ?? undefined,
    skipped: row.skipped ?? false,

    // Computed fields for UI
    isSkipped: row.skipped ?? false,
    hasValue: row.responseValue !== null && row.responseValue !== undefined,
    hasText:
      row.responseText !== null &&
      row.responseText !== undefined &&
      row.responseText !== '',
    responseTimeText: row.responseTime
      ? (formatResponseTime(row.responseTime) ?? undefined)
      : undefined,
    confidenceDisplay: row.confidence ? `${row.confidence}/5` : undefined,

    // Related data - these would need to be passed from the parent or fetched separately
    question: {
      id: row.questionId,
      questionText: '', // Would need to be passed from parent
      questionType: '', // Would need to be passed from parent
      orderIndex: 0, // Would need to be passed from parent
      apestDimension: undefined, // Would need to be passed from parent
    },
    userAssessment: {
      id: row.userAssessmentId,
      userId: '', // Would need to be passed from parent
      assessmentId: '', // Would need to be passed from parent
      completedAt: undefined, // Would need to be passed from parent
    },

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
  // AssessmentWithQuestionsResponse is just an alias for AssessmentResponse
  // But we need to return the assessment entity, not the response entity
  const assessmentEntity = toAssessmentResponseDTO(assessment);
  return assessmentEntity as any; // Type assertion needed due to schema mismatch
}

/**
 * Map UserAssessmentRow with assessment details to UserAssessmentWithDetailsResponse
 */
export function toUserAssessmentWithDetailsResponseDTO(
  userAssessment: UserAssessmentRow,
  assessment: AssessmentRow
): UserAssessmentWithDetailsResponse {
  // UserAssessmentWithDetailsResponse is just an alias for UserAssessmentResponse
  return toUserAssessmentResponseDTO(userAssessment);
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
    data: assessments.map(toAssessmentResponseDTO) as any, // Type assertion needed due to schema mismatch
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total: pagination.total,
      hasMore: pagination.page < totalPages,
    },
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
    data: userAssessments.map(({ userAssessment, assessment }) =>
      toUserAssessmentWithDetailsResponseDTO(userAssessment, assessment)
    ),
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total: pagination.total,
      hasMore: pagination.page < totalPages,
    },
  };
}

// ============================================================================
// BIDIRECTIONAL MAPPERS (DTO to Database)
// ============================================================================

/**
 * Map CreateAssessment to database insert format
 */
export function fromCreateAssessment(
  data: CreateAssessment
): Omit<NewAssessmentRow, 'id' | 'createdAt' | 'updatedAt'> {
  // Validate input data
  if (
    process.env['NODE_ENV'] === 'development' ||
    process.env['NODE_ENV'] === 'test'
  ) {
    const validation = createAssessmentSchema.safeParse(data);
    if (!validation.success) {
      throw new Error(
        `CreateAssessment validation failed: ${validation.error.message}`
      );
    }
  }

  return {
    name: data.name,
    slug: data.slug,
    description: data.description ?? null,
    assessmentType: data.assessmentType,
    questionsCount: data.questionsCount,
    estimatedDuration: data.estimatedDuration ?? null,
    passingScore: data.passingScore ?? null,
    validityScore: data.validityScore?.toString() ?? null,
    reliabilityScore: data.reliabilityScore?.toString() ?? null,
    instructions: data.instructions ?? null,
    publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
    version: data.version ?? '1.0',
    language: data.language ?? 'en',
    culturalAdaptation: data.culturalAdaptation ?? 'universal',
    researchBacked: data.researchBacked ?? false,
    scoringMethod: data.scoringMethod ?? 'likert_5',
    status: data.status ?? 'draft',
  };
}

/**
 * Map UpdateAssessment to database update format
 */
export function fromUpdateAssessment(
  data: UpdateAssessment
): Partial<NewAssessmentRow> {
  // Validate input data
  if (
    process.env['NODE_ENV'] === 'development' ||
    process.env['NODE_ENV'] === 'test'
  ) {
    const validation = updateAssessmentSchema.safeParse(data);
    if (!validation.success) {
      throw new Error(
        `UpdateAssessment validation failed: ${validation.error.message}`
      );
    }
  }

  const updateData: Partial<NewAssessmentRow> = {
    updatedAt: new Date(),
  };

  // Only include defined fields
  if (data.name !== undefined) updateData.name = data.name;
  if (data.description !== undefined)
    updateData.description = data.description ?? null;
  if (data.assessmentType !== undefined)
    updateData.assessmentType = data.assessmentType;
  if (data.questionsCount !== undefined)
    updateData.questionsCount = data.questionsCount;
  if (data.estimatedDuration !== undefined)
    updateData.estimatedDuration = data.estimatedDuration ?? null;
  if (data.passingScore !== undefined)
    updateData.passingScore = data.passingScore ?? null;
  if (data.validityScore !== undefined)
    updateData.validityScore = data.validityScore?.toString() ?? null;
  if (data.reliabilityScore !== undefined)
    updateData.reliabilityScore = data.reliabilityScore?.toString() ?? null;
  if (data.instructions !== undefined)
    updateData.instructions = data.instructions ?? null;
  if (data.publishedAt !== undefined)
    updateData.publishedAt = data.publishedAt
      ? new Date(data.publishedAt)
      : null;
  if (data.version !== undefined) updateData.version = data.version;
  if (data.language !== undefined) updateData.language = data.language;
  if (data.culturalAdaptation !== undefined)
    updateData.culturalAdaptation = data.culturalAdaptation;
  if (data.researchBacked !== undefined)
    updateData.researchBacked = data.researchBacked;
  if (data.scoringMethod !== undefined)
    updateData.scoringMethod = data.scoringMethod;
  if (data.status !== undefined) updateData.status = data.status;

  return updateData;
}

/**
 * Map CreateAssessmentQuestion to database insert format
 */
export function fromCreateAssessmentQuestion(
  data: CreateAssessmentQuestion
): Omit<NewAssessmentQuestionRow, 'id' | 'createdAt' | 'updatedAt'> {
  // Validate input data
  if (
    process.env['NODE_ENV'] === 'development' ||
    process.env['NODE_ENV'] === 'test'
  ) {
    const validation = createAssessmentQuestionSchema.safeParse(data);
    if (!validation.success) {
      throw new Error(
        `CreateAssessmentQuestion validation failed: ${validation.error.message}`
      );
    }
  }

  return {
    assessmentId: data.assessmentId,
    questionText: data.questionText,
    questionType: data.questionType,
    orderIndex: data.orderIndex,
    category: data.category ?? null,
    apestDimension: data.apestDimension ?? null,
    answerOptions: data.answerOptions ?? null,
    isRequired: data.isRequired ?? true,
    weight: data.weight?.toString() ?? '1.0',
    reverseScored: data.reverseScored ?? false,
  };
}

/**
 * Map UpdateAssessmentQuestion to database update format
 */
export function fromUpdateAssessmentQuestion(
  data: UpdateAssessmentQuestion
): Partial<NewAssessmentQuestionRow> {
  // Validate input data
  if (
    process.env['NODE_ENV'] === 'development' ||
    process.env['NODE_ENV'] === 'test'
  ) {
    const validation = updateAssessmentQuestionSchema.safeParse(data);
    if (!validation.success) {
      throw new Error(
        `UpdateAssessmentQuestion validation failed: ${validation.error.message}`
      );
    }
  }

  const updateData: Partial<NewAssessmentQuestionRow> = {
    updatedAt: new Date(),
  };

  // Only include defined fields
  if (data.questionText !== undefined)
    updateData.questionText = data.questionText;
  if (data.questionType !== undefined)
    updateData.questionType = data.questionType;
  if (data.orderIndex !== undefined) updateData.orderIndex = data.orderIndex;
  if (data.category !== undefined) updateData.category = data.category ?? null;
  if (data.apestDimension !== undefined)
    updateData.apestDimension = data.apestDimension ?? null;
  if (data.answerOptions !== undefined)
    updateData.answerOptions = data.answerOptions;
  if (data.isRequired !== undefined) updateData.isRequired = data.isRequired;
  if (data.weight !== undefined) updateData.weight = data.weight?.toString();
  if (data.reverseScored !== undefined)
    updateData.reverseScored = data.reverseScored;

  return updateData;
}

/**
 * Map CreateUserAssessment to database insert format
 */
export function fromCreateUserAssessment(
  data: CreateUserAssessment
): Omit<NewUserAssessmentRow, 'id' | 'createdAt' | 'updatedAt'> {
  // Validate input data
  if (
    process.env['NODE_ENV'] === 'development' ||
    process.env['NODE_ENV'] === 'test'
  ) {
    const validation = createUserAssessmentSchema.safeParse(data);
    if (!validation.success) {
      throw new Error(
        `CreateUserAssessment validation failed: ${validation.error.message}`
      );
    }
  }

  return {
    userId: data.userId,
    assessmentId: data.assessmentId,
    startedAt: data.startedAt ? new Date(data.startedAt) : new Date(),
    rawScores: data.rawScores ?? null,
    totalScore: data.totalScore ?? null,
    maxPossibleScore: data.maxPossibleScore ?? null,
    apostolicScore: data.apostolicScore ?? null,
    propheticScore: data.propheticScore ?? null,
    evangelisticScore: data.evangelisticScore ?? null,
    shepherdingScore: data.shepherdingScore ?? null,
    teachingScore: data.teachingScore ?? null,
    normalizedScores: data.normalizedScores ?? null,
    primaryGift: data.primaryGift ?? null,
    secondaryGift: data.secondaryGift ?? null,
    responseConsistency: data.responseConsistency?.toString() ?? null,
    completionTime: data.completionTime ?? null,
    confidenceLevel: data.confidenceLevel ?? null,
    culturalAdjustmentApplied: data.culturalAdjustmentApplied ?? false,
    culturalAdjustmentFactor: data.culturalAdjustmentFactor?.toString() ?? null,
    aiInsights: data.aiInsights ?? null,
    personalizedRecommendations: data.personalizedRecommendations ?? null,
    suggestedPeers: data.suggestedPeers ?? [],
    complementaryGifts: data.complementaryGifts ?? [],
  };
}

/**
 * Map UpdateUserAssessment to database update format
 */
export function fromUpdateUserAssessment(
  data: UpdateUserAssessment
): Partial<NewUserAssessmentRow> {
  // Validate input data
  if (
    process.env['NODE_ENV'] === 'development' ||
    process.env['NODE_ENV'] === 'test'
  ) {
    const validation = updateUserAssessmentSchema.safeParse(data);
    if (!validation.success) {
      throw new Error(
        `UpdateUserAssessment validation failed: ${validation.error.message}`
      );
    }
  }

  const updateData: Partial<NewUserAssessmentRow> = {
    updatedAt: new Date(),
  };

  // Only include defined fields
  if (data.startedAt !== undefined)
    updateData.startedAt = data.startedAt
      ? new Date(data.startedAt)
      : new Date();
  // Note: completedAt is not available in UpdateUserAssessment schema
  // It should be handled by a separate completion endpoint
  // if (data.completedAt !== undefined)
  //   updateData.completedAt = data.completedAt
  //     ? new Date(data.completedAt)
  //     : null;
  // Note: completionPercentage is not available in UpdateUserAssessment schema
  // It should be calculated automatically based on progress
  // if (data.completionPercentage !== undefined)
  //   updateData.completionPercentage = data.completionPercentage;
  if (data.rawScores !== undefined) updateData.rawScores = data.rawScores;
  if (data.totalScore !== undefined) updateData.totalScore = data.totalScore;
  if (data.maxPossibleScore !== undefined)
    updateData.maxPossibleScore = data.maxPossibleScore;
  if (data.apostolicScore !== undefined)
    updateData.apostolicScore = data.apostolicScore;
  if (data.propheticScore !== undefined)
    updateData.propheticScore = data.propheticScore;
  if (data.evangelisticScore !== undefined)
    updateData.evangelisticScore = data.evangelisticScore;
  if (data.shepherdingScore !== undefined)
    updateData.shepherdingScore = data.shepherdingScore;
  if (data.teachingScore !== undefined)
    updateData.teachingScore = data.teachingScore;
  if (data.normalizedScores !== undefined)
    updateData.normalizedScores = data.normalizedScores;
  if (data.primaryGift !== undefined) updateData.primaryGift = data.primaryGift;
  if (data.secondaryGift !== undefined)
    updateData.secondaryGift = data.secondaryGift;
  if (data.responseConsistency !== undefined)
    updateData.responseConsistency = data.responseConsistency?.toString();
  if (data.completionTime !== undefined)
    updateData.completionTime = data.completionTime;
  if (data.confidenceLevel !== undefined)
    updateData.confidenceLevel = data.confidenceLevel;
  if (data.culturalAdjustmentApplied !== undefined)
    updateData.culturalAdjustmentApplied = data.culturalAdjustmentApplied;
  if (data.culturalAdjustmentFactor !== undefined)
    updateData.culturalAdjustmentFactor =
      data.culturalAdjustmentFactor?.toString();
  if (data.aiInsights !== undefined) updateData.aiInsights = data.aiInsights;
  if (data.personalizedRecommendations !== undefined)
    updateData.personalizedRecommendations = data.personalizedRecommendations;
  if (data.suggestedPeers !== undefined)
    updateData.suggestedPeers = data.suggestedPeers;
  if (data.complementaryGifts !== undefined)
    updateData.complementaryGifts = data.complementaryGifts;

  return updateData;
}

/**
 * Map CreateAssessmentResponse to database insert format
 */
export function fromCreateAssessmentResponse(
  data: CreateAssessmentResponse
): Omit<NewAssessmentResponseRow, 'id' | 'createdAt' | 'updatedAt'> {
  // Validate input data
  if (
    process.env['NODE_ENV'] === 'development' ||
    process.env['NODE_ENV'] === 'test'
  ) {
    const validation = createAssessmentResponseSchema.safeParse(data);
    if (!validation.success) {
      throw new Error(
        `CreateAssessmentResponse validation failed: ${validation.error.message}`
      );
    }
  }

  return {
    userAssessmentId: data.userAssessmentId,
    questionId: data.questionId,
    responseValue: data.responseValue ?? null,
    responseText: data.responseText ?? null,
    responseTime: data.responseTime ?? null,
    confidence: data.confidence ?? null,
    skipped: data.skipped ?? false,
  };
}

/**
 * Map UpdateAssessmentResponse to database update format
 */
export function fromUpdateAssessmentResponse(
  data: UpdateAssessmentResponse
): Partial<NewAssessmentResponseRow> {
  // Validate input data
  if (
    process.env['NODE_ENV'] === 'development' ||
    process.env['NODE_ENV'] === 'test'
  ) {
    const validation = updateAssessmentResponseSchema.safeParse(data);
    if (!validation.success) {
      throw new Error(
        `UpdateAssessmentResponse validation failed: ${validation.error.message}`
      );
    }
  }

  const updateData: Partial<NewAssessmentResponseRow> = {
    updatedAt: new Date(),
  };

  // Only include defined fields
  if (data.responseValue !== undefined)
    updateData.responseValue = data.responseValue;
  if (data.responseText !== undefined)
    updateData.responseText = data.responseText ?? null;
  if (data.responseTime !== undefined)
    updateData.responseTime = data.responseTime;
  if (data.confidence !== undefined) updateData.confidence = data.confidence;
  if (data.skipped !== undefined) updateData.skipped = data.skipped;

  return updateData;
}

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type AssessmentMapperInput = AssessmentRow;
export type AssessmentMapperOutput = AssessmentEntity;
export type AssessmentQuestionMapperInput = AssessmentQuestionRow;
export type AssessmentQuestionMapperOutput = AssessmentQuestionResponse;
export type UserAssessmentMapperInput = UserAssessmentRow;
export type UserAssessmentMapperOutput = UserAssessmentResponse;
export type AssessmentResponseMapperInput = AssessmentResponseRow;
export type AssessmentResponseMapperOutput = AssessmentResponseResponse;

// ============================================================================
// MAPPER OBJECTS
// ============================================================================

export const assessmentMapper = {
  toEntity: toAssessmentEntity,
  toResponse: toAssessmentResponseDTO,
  fromCreate: fromCreateAssessment,
  fromUpdate: fromUpdateAssessment,
};

export const assessmentQuestionMapper = {
  toResponse: toAssessmentQuestionResponseDTO,
  fromCreate: fromCreateAssessmentQuestion,
  fromUpdate: fromUpdateAssessmentQuestion,
};

export const userAssessmentMapper = {
  toResponse: toUserAssessmentResponseDTO,
  toResponseWithDetails: toUserAssessmentWithDetailsResponseDTO,
  fromCreate: fromCreateUserAssessment,
  fromUpdate: fromUpdateUserAssessment,
};

export const assessmentResponseMapper = {
  toResponse: toAssessmentResponseResponseDTO,
  fromCreate: fromCreateAssessmentResponse,
  fromUpdate: fromUpdateAssessmentResponse,
};
