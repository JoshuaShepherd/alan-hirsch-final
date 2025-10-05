import type {
  AssessmentEntity,
  AssessmentResponse,
  CreateAssessment,
  UpdateAssessment,
} from '@platform/contracts';
import {
  assessmentEntitySchema,
  assessmentResponseSchema,
} from '@platform/contracts';
import type { Assessment } from '@platform/database';

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
      assessmentType: row.assessment_type,
      questionsCount: row.questions_count,
      estimatedDuration: row.estimated_duration ?? undefined,
      passingScore: row.passing_score ?? undefined,
      validityScore: row.validity_score
        ? Number(row.validity_score)
        : undefined,
      reliabilityScore: row.reliability_score
        ? Number(row.reliability_score)
        : undefined,
      instructions: row.instructions ?? undefined,

      // Publication & Versioning
      publishedAt: row.published_at?.toISOString() ?? undefined,
      version: row.version ?? '1.0',
      language: row.language ?? 'en',

      // Cultural & Research Context
      culturalAdaptation: row.cultural_adaptation ?? 'universal',
      researchBacked: row.research_backed ?? false,
      scoringMethod: row.scoring_method ?? 'likert_5',
      status: row.status ?? 'draft',

      // Timestamps
      createdAt: row.created_at.toISOString(),
      updatedAt: row.updated_at.toISOString(),
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
  const isPublished = row.status === 'published';
  const isDraft = row.status === 'draft';
  const isActive = row.status === 'active';
  const isArchived = row.status === 'archived';
  const hasQuestions = (row.questions?.length || 0) > 0;
  const questionCount = row.questions?.length || row.questions_count || 0;
  const estimatedDurationText = row.estimated_duration
    ? `${row.estimated_duration} min`
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
    assessment_type: data.assessmentType,
    questions_count: data.questionsCount,
    estimated_duration: data.estimatedDuration ?? null,
    passing_score: data.passingScore ?? null,
    validity_score: data.validityScore ? data.validityScore.toString() : null,
    reliability_score: data.reliabilityScore
      ? data.reliabilityScore.toString()
      : null,
    instructions: data.instructions ?? null,
    published_at: data.publishedAt ? new Date(data.publishedAt) : null,
    version: data.version ?? '1.0',
    language: data.language ?? 'en',
    cultural_adaptation: data.culturalAdaptation ?? 'universal',
    research_backed: data.researchBacked ?? false,
    scoring_method: data.scoringMethod ?? 'likert_5',
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
  if (data.slug !== undefined) updateData.slug = data.slug;
  if (data.description !== undefined)
    updateData.description = data.description ?? null;
  if (data.assessmentType !== undefined)
    updateData.assessment_type = data.assessmentType;
  if (data.questionsCount !== undefined)
    updateData.questions_count = data.questionsCount;
  if (data.estimatedDuration !== undefined)
    updateData.estimated_duration = data.estimatedDuration ?? null;
  if (data.passingScore !== undefined)
    updateData.passing_score = data.passingScore ?? null;
  if (data.validityScore !== undefined)
    updateData.validity_score = data.validityScore
      ? data.validityScore.toString()
      : null;
  if (data.reliabilityScore !== undefined)
    updateData.reliability_score = data.reliabilityScore
      ? data.reliabilityScore.toString()
      : null;
  if (data.instructions !== undefined)
    updateData.instructions = data.instructions ?? null;
  if (data.publishedAt !== undefined)
    updateData.published_at = data.publishedAt
      ? new Date(data.publishedAt)
      : null;
  if (data.version !== undefined) updateData.version = data.version;
  if (data.language !== undefined) updateData.language = data.language;
  if (data.culturalAdaptation !== undefined)
    updateData.cultural_adaptation = data.culturalAdaptation;
  if (data.researchBacked !== undefined)
    updateData.research_backed = data.researchBacked;
  if (data.scoringMethod !== undefined)
    updateData.scoring_method = data.scoringMethod;
  if (data.status !== undefined) updateData.status = data.status;

  // Always update the updated_at timestamp
  updateData.updated_at = new Date();

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
    duration: assessment.estimatedDurationText || 'Unknown',
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
 * Calculate assessment completion percentage
 */
export function calculateCompletionPercentage(
  completed: number,
  total: number
): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}
