import type {
  AssessmentEntity,
  AssessmentQuestionResponse,
  AssessmentResponse,
  AssessmentResponseResponse,
  CreateAssessment,
  CreateAssessmentQuestion,
  CreateAssessmentResponse,
  CreateUserAssessment,
  UpdateAssessment,
  UpdateAssessmentQuestion,
  UpdateAssessmentResponse,
  UpdateUserAssessment,
  UserAssessmentResponse,
} from '@platform/contracts';
import {
  assessmentEntitySchema,
  assessmentResponseSchema,
} from '@platform/contracts';
import type {
  Assessment,
  NewAssessmentQuestion,
  NewAssessmentResponse,
} from '@platform/database';

// ============================================================================
// ASSESSMENT MAPPER FUNCTIONS
// ============================================================================

/**
 * Transform database row to AssessmentEntity
 */
export function toAssessmentEntity(row: Assessment): AssessmentEntity {
  try {
    if (!row) {
      throw new Error('Assessment is null or undefined');
    }

    const result = {
      // Core Identity
      id: row.id,
      name: row.name,
      slug: row.slug,
      description: row.description ?? undefined,

      // Assessment Details
      assessmentType: row.assessmentType,
      questionsCount: row.questionsCount,
      estimatedDuration: row.estimatedDuration ?? undefined,
      passingScore: row.passingScore ?? undefined,
      validityScore: row.validityScore ? Number(row.validityScore) : undefined,
      reliabilityScore: row.reliabilityScore
        ? Number(row.reliabilityScore)
        : undefined,
      instructions: row.instructions ?? undefined,

      // Publication & Versioning
      publishedAt: row.publishedAt?.toISOString() ?? undefined,
      version: row.version ?? '1.0',
      language: row.language ?? 'en',

      // Cultural & Research Context
      culturalAdaptation: row.culturalAdaptation ?? 'universal',
      researchBacked: row.researchBacked ?? false,
      scoringMethod: row.scoringMethod ?? 'likert_5',
      status: row.status ?? 'draft',

      // Timestamps
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    };

    // Validate the result against the schema
    const validation = assessmentEntitySchema.safeParse(result);
    if (!validation.success) {
      console.error('Entity validation failed:', validation.error);
      throw new Error('Invalid entity data');
    }
    return validation.data;
  } catch (error) {
    console.error('Error in toAssessmentEntity:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      rowId: row?.id,
      rowName: row?.name,
    });
    throw new Error(
      `Failed to transform Assessment to AssessmentEntity: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Transform database row to AssessmentResponse with computed fields
 */
export function toAssessmentResponseDTO(
  row: Assessment & {
    questions?: Array<{
      id: string;
      text: string;
      type: string;
      order: number;
    }>;
    completions?: number;
    averageScore?: number;
  }
): AssessmentResponse {
  const entity = toAssessmentEntity(row);

  // Compute derived fields
  const isPublished = row.status === 'active';
  const isDraft = row.status === 'draft';
  const isActive = row.status === 'active';
  const isArchived = row.status === 'archived';
  const hasQuestions = (row.questions?.length || 0) > 0;
  const questionCount = row.questions?.length || row.questionsCount || 0;
  const estimatedDurationText = row.estimatedDuration
    ? `${row.estimatedDuration} min`
    : undefined;

  // Calculate completion metrics
  const completionRate =
    row.completions && row.completions > 0
      ? Math.round((row.completions / 100) * 100) // Assuming 100 as baseline
      : 0;

  const result = {
    ...entity,

    // Computed fields
    isPublished,
    isDraft,
    isActive,
    isArchived,
    hasQuestions,
    questionCount,
    estimatedDurationText,
    completionRate,
    averageScore: row.averageScore ?? 0,

    // Related data
    questions: row.questions ?? [],
  };

  // Validate the result against the schema
  const validation = assessmentResponseSchema.safeParse(result);
  if (!validation.success) {
    console.error('Response validation failed:', validation.error);
    throw new Error('Invalid response data');
  }
  return validation.data;
}

// ============================================================================
// CREATE/UPDATE MAPPER FUNCTIONS
// ============================================================================

/**
 * Transform CreateAssessment to database insert format
 */
export function fromCreateAssessment(
  data: CreateAssessment
): Partial<Assessment> {
  return {
    name: data.name,
    slug: data.slug,
    description: data.description ?? null,
    assessmentType: data.assessmentType,
    questionsCount: data.questionsCount,
    estimatedDuration: data.estimatedDuration ?? null,
    passingScore: data.passingScore ?? null,
    validityScore: data.validityScore ? data.validityScore.toString() : null,
    reliabilityScore: data.reliabilityScore
      ? data.reliabilityScore.toString()
      : null,
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
 * Transform UpdateAssessment to database update format
 */
export function fromUpdateAssessment(
  data: UpdateAssessment
): Partial<Assessment> {
  const updateData: Partial<Assessment> = {};

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
    updateData.validityScore = data.validityScore
      ? data.validityScore.toString()
      : null;
  if (data.reliabilityScore !== undefined)
    updateData.reliabilityScore = data.reliabilityScore
      ? data.reliabilityScore.toString()
      : null;
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

  // Always update the updatedAt timestamp
  updateData.updatedAt = new Date();

  return updateData;
}

// ============================================================================
// ARRAY MAPPER FUNCTIONS
// ============================================================================

/**
 * Transform multiple database rows to AssessmentResponse array
 */
export function toAssessmentResponseArray(
  rows: (Assessment & {
    questions?: Array<{
      id: string;
      text: string;
      type: string;
      order: number;
    }>;
    completions?: number;
    averageScore?: number;
  })[]
): AssessmentResponse[] {
  return rows.map(toAssessmentResponseDTO);
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Check if assessment is publicly accessible
 */
export function isAssessmentPublic(assessment: AssessmentResponse): boolean {
  return assessment.isPublished && assessment.status === 'active';
}

/**
 * Get assessment display information
 */
export function getAssessmentDisplayInfo(assessment: AssessmentResponse): {
  name: string;
  type: string;
  status: string;
  duration: string;
  questions: string;
} {
  return {
    name: assessment.name,
    type: assessment.assessmentType,
    status: assessment.isPublished
      ? 'Published'
      : assessment.isDraft
        ? 'Draft'
        : 'Archived',
    duration: assessment.estimatedDurationText ?? 'Unknown',
    questions: `${assessment.questionCount} questions`,
  };
}

/**
 * Format assessment duration
 */
export function formatDuration(minutes: number | null): string | null {
  if (!minutes) return null;
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

/**
 * Format response time in seconds
 */
export function formatResponseTime(seconds: number | null): string | null {
  if (!seconds) return null;
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return remainingSeconds > 0
    ? `${minutes}m ${remainingSeconds}s`
    : `${minutes}m`;
}

/**
 * Calculate score percentage
 */
export function calculateScorePercentage(
  totalScore: number | null,
  maxPossibleScore: number | null
): number | null {
  if (!totalScore || !maxPossibleScore || maxPossibleScore === 0) return null;
  return Math.round((totalScore / maxPossibleScore) * 100);
}

/**
 * Calculate assessment completion percentage
 */
export function calculateCompletionPercentage(
  completed: number,
  total: number
): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

// ============================================================================
// MISSING MAPPER FUNCTIONS FOR SERVICE IMPORTS
// ============================================================================

/**
 * Transform CreateAssessmentQuestion to database format
 */
export function fromCreateAssessmentQuestion(
  data: CreateAssessmentQuestion
): NewAssessmentQuestion {
  try {
    const result = {
      assessmentId: data.assessmentId,
      questionText: data.questionText,
      questionType: data.questionType,
      orderIndex: data.orderIndex,
      isRequired: data.isRequired ?? true,
      apestDimension: data.apestDimension ?? null,
      answerOptions: data.answerOptions ?? null,
      weight: data.weight ? data.weight.toString() : '1.0',
      reverseScored: data.reverseScored ?? false,
      category: data.category ?? null,
    };

    return result;
  } catch (error) {
    console.error('Error in fromCreateAssessmentQuestion:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      dataAssessmentId: data?.assessmentId,
    });
    throw new Error(
      `Failed to transform CreateAssessmentQuestion to database format: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Transform CreateAssessmentResponse to database format
 */
export function fromCreateAssessmentResponse(
  data: CreateAssessmentResponse
): NewAssessmentResponse {
  try {
    const result = {
      userAssessmentId: data.userAssessmentId,
      questionId: data.questionId,
      responseValue: data.responseValue ?? null,
      responseText: data.responseText ?? null,
      responseTime: data.responseTime ?? null,
      confidence: data.confidence ?? null,
      skipped: data.skipped ?? false,
    };

    return result;
  } catch (error) {
    console.error('Error in fromCreateAssessmentResponse:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      dataUserAssessmentId: data?.userAssessmentId,
    });
    throw new Error(
      `Failed to transform CreateAssessmentResponse to database format: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Transform CreateUserAssessment to database format
 */
export function fromCreateUserAssessment(
  data: CreateUserAssessment
): Partial<any> {
  try {
    const result = {
      userId: data.userId,
      assessmentId: data.assessmentId,
      startedAt: data.startedAt ? new Date(data.startedAt) : new Date(),
      culturalAdjustmentApplied: data.culturalAdjustmentApplied ?? false,
      suggestedPeers: data.suggestedPeers ?? [],
      complementaryGifts: data.complementaryGifts ?? [],
      confidenceLevel: data.confidenceLevel ?? null,
      totalScore: data.totalScore ?? null,
      maxPossibleScore: data.maxPossibleScore ?? null,
      rawScores: data.rawScores ? JSON.stringify(data.rawScores) : null,
      normalizedScores: data.normalizedScores
        ? JSON.stringify(data.normalizedScores)
        : null,
      primaryGift: data.primaryGift ?? null,
      secondaryGift: data.secondaryGift ?? null,
      completionTime: data.completionTime ?? null,
      responseConsistency: data.responseConsistency ?? null,
      aiInsights: data.aiInsights ?? null,
      personalizedRecommendations: data.personalizedRecommendations
        ? JSON.stringify(data.personalizedRecommendations)
        : null,
    };

    return result;
  } catch (error) {
    console.error('Error in fromCreateUserAssessment:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      dataUserId: data?.userId,
    });
    throw new Error(
      `Failed to transform CreateUserAssessment to database format: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Transform UpdateAssessmentQuestion to database format
 */
export function fromUpdateAssessmentQuestion(
  data: UpdateAssessmentQuestion
): any {
  const result: any = {};
  if (data.questionText !== undefined) result.questionText = data.questionText;
  if (data.questionType !== undefined) result.questionType = data.questionType;
  if (data.orderIndex !== undefined) result.orderIndex = data.orderIndex;
  if (data.isRequired !== undefined) result.isRequired = data.isRequired;
  if (data.apestDimension !== undefined)
    result.apestDimension = data.apestDimension;
  if (data.answerOptions !== undefined)
    result.answerOptions = data.answerOptions
      ? JSON.stringify(data.answerOptions)
      : null;
  if (data.weight !== undefined) result.weight = data.weight;
  if (data.reverseScored !== undefined)
    result.reverseScored = data.reverseScored;
  if (data.category !== undefined) result.category = data.category;
  return result;
}

/**
 * Transform UpdateAssessmentResponse to database format
 */
export function fromUpdateAssessmentResponse(
  data: UpdateAssessmentResponse
): any {
  const result: any = {};
  if (data.responseValue !== undefined)
    result.responseValue = data.responseValue;
  if (data.responseText !== undefined) result.responseText = data.responseText;
  if (data.responseTime !== undefined) result.responseTime = data.responseTime;
  if (data.confidence !== undefined) result.confidence = data.confidence;
  if (data.skipped !== undefined) result.skipped = data.skipped;
  return result;
}

/**
 * Transform UpdateUserAssessment to database format
 */
export function fromUpdateUserAssessment(data: UpdateUserAssessment): any {
  const result: any = {};
  if (data.totalScore !== undefined) result.totalScore = data.totalScore;
  if (data.maxPossibleScore !== undefined)
    result.maxPossibleScore = data.maxPossibleScore;
  if (data.rawScores !== undefined)
    result.rawScores = JSON.stringify(data.rawScores);
  if (data.normalizedScores !== undefined)
    result.normalizedScores = JSON.stringify(data.normalizedScores);
  if (data.primaryGift !== undefined) result.primaryGift = data.primaryGift;
  if (data.secondaryGift !== undefined)
    result.secondaryGift = data.secondaryGift;
  if (data.completionTime !== undefined)
    result.completionTime = data.completionTime;
  if (data.responseConsistency !== undefined)
    result.responseConsistency = data.responseConsistency;
  if (data.aiInsights !== undefined) result.aiInsights = data.aiInsights;
  if (data.personalizedRecommendations !== undefined)
    result.personalizedRecommendations = JSON.stringify(
      data.personalizedRecommendations
    );
  return result;
}

/**
 * Transform database row to AssessmentQuestionResponse
 */
export function toAssessmentQuestionResponseDTO(
  row: any
): AssessmentQuestionResponse {
  try {
    const result = {
      id: row.id,
      createdAt: row.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: row.updatedAt?.toISOString() || new Date().toISOString(),
      orderIndex: row.orderIndex,
      questionText: row.questionText,
      questionType: row.questionType,
      isRequired: row.isRequired,
      apestDimension: row.apestDimension ?? null,
      answerOptions: row.answerOptions
        ? JSON.parse(row.answerOptions)
        : undefined,
      weight: row.weight ?? 1.0,
      reverseScored: row.reverseScored ?? false,
      category: row.category ?? null,
      assessmentId: row.assessmentId,
      // Computed fields
      hasOptions: !!(
        row.answerOptions && JSON.parse(row.answerOptions).length > 0
      ),
      isReverseScored: row.reverseScored ?? false,
      typeDisplay: row.questionType,
      dimensionDisplay: row.apestDimension ?? null,
      // Related data
      assessment: row.assessment || {
        id: row.assessmentId,
        name: '',
        slug: '',
        assessmentType: '',
      },
    };

    return result;
  } catch (error) {
    console.error('Error in toAssessmentQuestionResponseDTO:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      rowId: row?.id,
    });
    throw new Error(
      `Failed to transform database row to AssessmentQuestionResponse: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Transform database row to AssessmentResponseResponse
 */
export function toAssessmentResponseResponseDTO(
  row: any
): AssessmentResponseResponse {
  try {
    const result = {
      id: row.id as string,
      createdAt: (row.createdAt?.toISOString() ||
        new Date().toISOString()) as string,
      updatedAt: (row.updatedAt?.toISOString() ||
        new Date().toISOString()) as string,
      userAssessmentId: row.userAssessmentId as string,
      questionId: row.questionId as string,
      skipped: (row.skipped ?? false) as boolean,
      isSkipped: (row.skipped ?? false) as boolean,
      hasResponse: !!(row.responseValue || row.responseText),
      responseValue: (row.responseValue ?? undefined) as number | undefined,
      responseText: (row.responseText ?? undefined) as string | undefined,
      responseTime: (row.responseTime ?? undefined) as number | undefined,
      confidence: (row.confidence ?? undefined) as number | undefined,
      responseTimeText: row.responseTime
        ? formatResponseTime(row.responseTime)
        : undefined,
      confidenceLevel: row.confidence ? `${row.confidence}/5` : undefined,
      question: row.question
        ? {
            id: row.question.id,
            orderIndex: row.question.orderIndex,
            questionText: row.question.questionText,
            questionType: row.question.questionType,
            category: row.question.category ?? undefined,
            apestDimension: row.question.apestDimension ?? undefined,
            isRequired: row.question.isRequired ?? true,
          }
        : undefined,
      userAssessment: row.userAssessment
        ? {
            id: row.userAssessment.id,
            userId: row.userAssessment.userId,
            assessmentId: row.userAssessment.assessmentId,
            status: row.userAssessment.status ?? 'in_progress',
          }
        : undefined,
    };

    return result as AssessmentResponseResponse;
  } catch (error) {
    console.error('Error in toAssessmentResponseResponseDTO:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      rowId: row?.id,
    });
    throw new Error(
      `Failed to transform database row to AssessmentResponseResponse: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Transform database row to UserAssessmentResponse
 */
export function toUserAssessmentResponseDTO(row: any): UserAssessmentResponse {
  try {
    const result = {
      id: row.id,
      createdAt: row.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: row.updatedAt?.toISOString() || new Date().toISOString(),
      completionPercentage: row.completionPercentage ?? 0,
      userId: row.userId,
      assessmentId: row.assessmentId,
      assessment: row.assessment
        ? {
            id: row.assessment.id,
            slug: row.assessment.slug,
            name: row.assessment.name,
            assessmentType: row.assessment.assessmentType,
            questionsCount: row.assessment.questionsCount,
          }
        : {
            id: row.assessmentId,
            slug: '',
            name: '',
            assessmentType: '',
            questionsCount: 0,
          },
      startedAt: row.startedAt?.toISOString() || new Date().toISOString(),
      completedAt: row.completedAt?.toISOString(),
      culturalAdjustmentApplied: row.culturalAdjustmentApplied ?? false,
      suggestedPeers: row.suggestedPeers ?? [],
      complementaryGifts: row.complementaryGifts ?? [],
      confidenceLevel: row.confidenceLevel ?? null,
      totalScore: row.totalScore ?? null,
      maxPossibleScore: row.maxPossibleScore ?? null,
      rawScores: row.rawScores ? JSON.parse(row.rawScores) : undefined,
      normalizedScores: row.normalizedScores
        ? JSON.parse(row.normalizedScores)
        : undefined,
      primaryGift: row.primaryGift ?? null,
      secondaryGift: row.secondaryGift ?? null,
      completionTime: row.completionTime ?? null,
      responseConsistency: row.responseConsistency ?? null,
      aiInsights: row.aiInsights ?? null,
      personalizedRecommendations: row.personalizedRecommendations
        ? JSON.parse(row.personalizedRecommendations)
        : undefined,
      responses: row.responses ?? [],
      // Computed fields
      isCompleted: !!row.completedAt,
      isInProgress: !row.completedAt && (row.completionPercentage ?? 0) > 0,
      completionStatus: row.completedAt
        ? 'completed'
        : (row.completionPercentage ?? 0) > 0
          ? 'in_progress'
          : 'not_started',
      // Related data
      user: row.user || {
        id: row.userId,
        firstName: '',
        lastName: '',
        displayName: '',
      },
    };

    return result;
  } catch (error) {
    console.error('Error in toUserAssessmentResponseDTO:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      rowId: row?.id,
    });
    throw new Error(
      `Failed to transform database row to UserAssessmentResponse: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
