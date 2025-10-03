import type {
  aiConversations,
  aiMessages,
  aiContentJobs,
  aiCrossReferenceSuggestions,
  theologicalConcepts,
  contentItems,
} from '../db/schema';
import type {
  AiConversationResponse,
  AiMessageResponse,
  AiContentJobResponse,
  AiCrossReferenceSuggestionResponse,
  TheologicalConceptResponse,
  PaginatedAiConversationListResponse,
  PaginatedAiMessageListResponse,
  PaginatedAiContentJobListResponse,
  PaginatedAiCrossReferenceSuggestionListResponse,
  PaginatedTheologicalConceptListResponse,
} from '../contracts/ai.response';

// Drizzle row types
type AiConversationRow = typeof aiConversations.$inferSelect;
type AiMessageRow = typeof aiMessages.$inferSelect;
type AiContentJobRow = typeof aiContentJobs.$inferSelect;
type AiCrossReferenceSuggestionRow =
  typeof aiCrossReferenceSuggestions.$inferSelect;
type TheologicalConceptRow = typeof theologicalConcepts.$inferSelect;
type ContentItemRow = typeof contentItems.$inferSelect;

/**
 * AI System Mappers - Convert Drizzle rows to UI-friendly DTOs
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

// Helper function to format processing time in milliseconds to human-readable text
function formatProcessingTime(milliseconds: number | null): string | null {
  if (!milliseconds) return null;

  if (milliseconds < 1000) {
    return `${milliseconds}ms`;
  }

  const seconds = Math.floor(milliseconds / 1000);
  if (seconds < 60) {
    return `${seconds}s`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (remainingSeconds === 0) {
    return `${minutes}m`;
  }

  return `${minutes}m ${remainingSeconds}s`;
}

// Helper function to format token count to human-readable text
function formatTokenCount(tokens: number | null): string {
  if (!tokens) return '0 tokens';

  if (tokens < 1000) {
    return `${tokens} tokens`;
  }

  const thousands = Math.floor(tokens / 1000);
  const remaining = tokens % 1000;

  if (remaining === 0) {
    return `${thousands}K tokens`;
  }

  return `${thousands}.${Math.floor(remaining / 100)}K tokens`;
}

// Helper function to format decimal score to percentage text
function formatScore(score: string | null): string | null {
  if (!score) return null;

  const num = parseFloat(score);
  if (isNaN(num)) return null;

  return `${Math.round(num * 100)}%`;
}

// Helper function to get primary APEST dimension
function getPrimaryApestDimension(apestRelevance: {
  apostolic: number;
  prophetic: number;
  evangelistic: number;
  shepherding: number;
  teaching: number;
}): string {
  const entries = Object.entries(apestRelevance);
  const maxEntry = entries.reduce((max, current) =>
    current[1] > max[1] ? current : max
  );
  return maxEntry[0];
}

// Helper function to format APEST relevance text
function formatApestRelevance(apestRelevance: {
  apostolic: number;
  prophetic: number;
  evangelistic: number;
  shepherding: number;
  teaching: number;
}): string {
  const primary = getPrimaryApestDimension(apestRelevance);
  const capitalized = primary.charAt(0).toUpperCase() + primary.slice(1);
  return `Primary: ${capitalized}`;
}

/**
 * Map AiConversationRow to AiConversationResponse
 */
export function toAiConversationResponseDTO(
  row: AiConversationRow
): AiConversationResponse {
  return {
    id: row.id,
    userId: row.userId,

    // Conversation Classification
    conversationType: row.conversationType,

    // Context & Topic
    title: row.title,
    primaryTopic: row.primaryTopic,
    theologicalContext: row.theologicalContext,
    userApestProfile: row.userApestProfile,
    ministryContext: row.ministryContext,
    culturalContext: row.culturalContext,

    // Conversation Metrics
    totalMessages: row.totalMessages ?? 0,
    conversationDurationMinutes: row.conversationDurationMinutes,

    // Quality & Satisfaction
    userSatisfactionRating: row.userSatisfactionRating,
    theologicalAccuracyVerified: row.theologicalAccuracyVerified ?? false,
    helpfulnessRating: row.helpfulnessRating,

    // AI Model Information
    aiModel: row.aiModel ?? 'gpt-4',
    modelVersion: row.modelVersion,
    totalTokensUsed: row.totalTokensUsed ?? 0,

    // Content References
    referencedContent: row.referencedContent ?? [],
    generatedInsights: row.generatedInsights,

    // Status
    status: row.status ?? 'active',

    // Computed fields for UI
    isActive: row.status === 'active',
    isCompleted: row.status === 'completed',
    isAbandoned: row.status === 'abandoned',
    isArchived: row.status === 'archived',
    hasUserRating: row.userSatisfactionRating !== null,
    conversationDurationText: formatDuration(row.conversationDurationMinutes),
    tokenUsageText: formatTokenCount(row.totalTokensUsed),

    // Timestamps (convert to ISO strings)
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    completedAt: row.completedAt?.toISOString() ?? null,
  };
}

/**
 * Map AiMessageRow to AiMessageResponse
 */
export function toAiMessageResponseDTO(row: AiMessageRow): AiMessageResponse {
  return {
    id: row.id,
    conversationId: row.conversationId,

    // Message Content
    role: row.role,
    content: row.content,

    // Message Metadata
    messageIndex: row.messageIndex,
    tokenCount: row.tokenCount,

    // Content References
    citedContent: row.citedContent ?? [],

    // Quality Indicators
    confidence: row.confidence,
    factualAccuracy: row.factualAccuracy,
    theologicalSoundness: row.theologicalSoundness,

    // User Feedback
    userRating: row.userRating,
    userFeedback: row.userFeedback,
    flaggedForReview: row.flaggedForReview ?? false,

    // Processing Information
    processingTime: row.processingTime,

    // Computed fields for UI
    isUserMessage: row.role === 'user',
    isAssistantMessage: row.role === 'assistant',
    isSystemMessage: row.role === 'system',
    hasUserRating: row.userRating !== null,
    hasUserFeedback: row.userFeedback !== null,
    isFlagged: row.flaggedForReview ?? false,
    processingTimeText: formatProcessingTime(row.processingTime),
    confidenceText: formatScore(row.confidence),

    // Timestamps
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

/**
 * Map AiContentJobRow to AiContentJobResponse
 */
export function toAiContentJobResponseDTO(
  row: AiContentJobRow
): AiContentJobResponse {
  return {
    id: row.id,
    contentId: row.contentId,
    userId: row.userId,

    // Job Classification
    jobType: row.jobType,

    // Job Configuration
    parameters: row.parameters ?? {},
    priority: row.priority ?? 'normal',

    // Processing Status
    status: row.status ?? 'pending',

    // Results
    result: row.result,
    confidenceScore: row.confidenceScore,

    // Quality Control
    humanReviewed: row.humanReviewed ?? false,
    humanApproved: row.humanApproved,
    reviewNotes: row.reviewNotes,

    // Processing Information
    aiModel: row.aiModel ?? 'gpt-4',
    tokensUsed: row.tokensUsed,
    processingCost: row.processingCost,

    // Error Handling
    errorMessage: row.errorMessage,
    retryCount: row.retryCount ?? 0,

    // Computed fields for UI
    isPending: row.status === 'pending',
    isProcessing: row.status === 'processing',
    isCompleted: row.status === 'completed',
    isFailed: row.status === 'failed',
    isCancelled: row.status === 'cancelled',
    hasError: row.errorMessage !== null,
    needsHumanReview: !row.humanReviewed,
    isHighPriority: row.priority === 'high' || row.priority === 'urgent',
    processingCostText: row.processingCost ? `$${row.processingCost}` : null,
    confidenceText: formatScore(row.confidenceScore),

    // Timestamps
    createdAt: row.createdAt.toISOString(),
    startedAt: row.startedAt?.toISOString() ?? null,
    completedAt: row.completedAt?.toISOString() ?? null,
    updatedAt: row.updatedAt.toISOString(),
  };
}

/**
 * Map AiCrossReferenceSuggestionRow to AiCrossReferenceSuggestionResponse
 */
export function toAiCrossReferenceSuggestionResponseDTO(
  row: AiCrossReferenceSuggestionRow,
  sourceContent?: ContentItemRow,
  targetContent?: ContentItemRow
): AiCrossReferenceSuggestionResponse {
  return {
    id: row.id,
    sourceContentId: row.sourceContentId,
    targetContentId: row.targetContentId,

    // AI Analysis
    suggestedReferenceType: row.suggestedReferenceType,

    // Confidence & Quality
    confidenceScore: row.confidenceScore,
    relevanceScore: row.relevanceScore,

    // AI Reasoning
    reasoning: row.reasoning,
    keyConnections: row.keyConnections,

    // Human Review
    humanReviewed: row.humanReviewed ?? false,
    humanApproved: row.humanApproved,
    reviewNotes: row.reviewNotes,

    // Implementation Status
    status: row.status ?? 'pending',

    // AI Model Information
    aiModel: row.aiModel ?? 'gpt-4',
    modelVersion: row.modelVersion,

    // Computed fields for UI
    isPending: row.status === 'pending',
    isApproved: row.status === 'approved',
    isRejected: row.status === 'rejected',
    isImplemented: row.status === 'implemented',
    needsReview: !row.humanReviewed,
    hasHighConfidence: parseFloat(row.confidenceScore) > 0.8,
    hasHighRelevance: parseFloat(row.relevanceScore) > 0.8,
    confidenceText: formatScore(row.confidenceScore) ?? '',
    relevanceText: formatScore(row.relevanceScore) ?? '',

    // Related content (populated by mappers)
    sourceContent: sourceContent
      ? {
          id: sourceContent.id,
          title: sourceContent.title,
          slug: sourceContent.slug,
        }
      : undefined,
    targetContent: targetContent
      ? {
          id: targetContent.id,
          title: targetContent.title,
          slug: targetContent.slug,
        }
      : undefined,

    // Timestamps
    createdAt: row.createdAt.toISOString(),
    reviewedAt: row.reviewedAt?.toISOString() ?? null,
    implementedAt: row.implementedAt?.toISOString() ?? null,
  };
}

/**
 * Map TheologicalConceptRow to TheologicalConceptResponse
 */
export function toTheologicalConceptResponseDTO(
  row: TheologicalConceptRow
): TheologicalConceptResponse {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    definition: row.definition,

    // Classification
    conceptType: row.conceptType,

    // Theological Context
    theologicalTradition: row.theologicalTradition ?? [],
    biblicalReferences: row.biblicalReferences ?? [],
    historicalPeriod: row.historicalPeriod,

    // Relationships
    relatedConcepts: row.relatedConcepts ?? [],
    synonyms: row.synonyms ?? [],

    // APEST Relevance
    apestRelevance: row.apestRelevance ?? {
      apostolic: 5,
      prophetic: 5,
      evangelistic: 5,
      shepherding: 5,
      teaching: 5,
    },

    // Usage Statistics
    contentReferences: row.contentReferences ?? 0,
    searchCount: row.searchCount ?? 0,

    // Computed fields for UI
    hasDefinition: row.definition !== null,
    hasRelatedConcepts: (row.relatedConcepts?.length ?? 0) > 0,
    hasSynonyms: (row.synonyms?.length ?? 0) > 0,
    hasBiblicalReferences: (row.biblicalReferences?.length ?? 0) > 0,
    isFrequentlyUsed: (row.contentReferences ?? 0) > 10,
    primaryApestDimension: getPrimaryApestDimension(
      row.apestRelevance ?? {
        apostolic: 5,
        prophetic: 5,
        evangelistic: 5,
        shepherding: 5,
        teaching: 5,
      }
    ),
    apestRelevanceText: formatApestRelevance(
      row.apestRelevance ?? {
        apostolic: 5,
        prophetic: 5,
        evangelistic: 5,
        shepherding: 5,
        teaching: 5,
      }
    ),

    // Timestamps
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

/**
 * Map array of AiConversationRow to PaginatedAiConversationListResponse
 */
export function toPaginatedAiConversationListResponseDTO(
  conversations: AiConversationRow[],
  pagination: {
    page: number;
    limit: number;
    total: number;
  }
): PaginatedAiConversationListResponse {
  const totalPages = Math.ceil(pagination.total / pagination.limit);

  return {
    items: conversations.map(toAiConversationResponseDTO),
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total: pagination.total,
      totalPages,
      hasNext: pagination.page < totalPages,
      hasPrev: pagination.page > 1,
    },
    success: true,
    message: undefined,
  };
}

/**
 * Map array of AiMessageRow to PaginatedAiMessageListResponse
 */
export function toPaginatedAiMessageListResponseDTO(
  messages: AiMessageRow[],
  pagination: {
    page: number;
    limit: number;
    total: number;
  }
): PaginatedAiMessageListResponse {
  const totalPages = Math.ceil(pagination.total / pagination.limit);

  return {
    items: messages.map(toAiMessageResponseDTO),
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total: pagination.total,
      totalPages,
      hasNext: pagination.page < totalPages,
      hasPrev: pagination.page > 1,
    },
    success: true,
    message: undefined,
  };
}

/**
 * Map array of AiContentJobRow to PaginatedAiContentJobListResponse
 */
export function toPaginatedAiContentJobListResponseDTO(
  jobs: AiContentJobRow[],
  pagination: {
    page: number;
    limit: number;
    total: number;
  }
): PaginatedAiContentJobListResponse {
  const totalPages = Math.ceil(pagination.total / pagination.limit);

  return {
    items: jobs.map(toAiContentJobResponseDTO),
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total: pagination.total,
      totalPages,
      hasNext: pagination.page < totalPages,
      hasPrev: pagination.page > 1,
    },
    success: true,
    message: undefined,
  };
}

/**
 * Map array of AiCrossReferenceSuggestionRow to PaginatedAiCrossReferenceSuggestionListResponse
 */
export function toPaginatedAiCrossReferenceSuggestionListResponseDTO(
  suggestions: Array<{
    suggestion: AiCrossReferenceSuggestionRow;
    sourceContent?: ContentItemRow;
    targetContent?: ContentItemRow;
  }>,
  pagination: {
    page: number;
    limit: number;
    total: number;
  }
): PaginatedAiCrossReferenceSuggestionListResponse {
  const totalPages = Math.ceil(pagination.total / pagination.limit);

  return {
    items: suggestions.map(({ suggestion, sourceContent, targetContent }) =>
      toAiCrossReferenceSuggestionResponseDTO(
        suggestion,
        sourceContent,
        targetContent
      )
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
    message: undefined,
  };
}

/**
 * Map array of TheologicalConceptRow to PaginatedTheologicalConceptListResponse
 */
export function toPaginatedTheologicalConceptListResponseDTO(
  concepts: TheologicalConceptRow[],
  pagination: {
    page: number;
    limit: number;
    total: number;
  }
): PaginatedTheologicalConceptListResponse {
  const totalPages = Math.ceil(pagination.total / pagination.limit);

  return {
    items: concepts.map(toTheologicalConceptResponseDTO),
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total: pagination.total,
      totalPages,
      hasNext: pagination.page < totalPages,
      hasPrev: pagination.page > 1,
    },
    success: true,
    message: undefined,
  };
}
