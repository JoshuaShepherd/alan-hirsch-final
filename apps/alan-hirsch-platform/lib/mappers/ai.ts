import type {
  AiContentJobEntity,
  AiContentJobResponse,
  AiConversationEntity,
  AiConversationResponse,
  AiCrossReferenceSuggestionEntity,
  AiCrossReferenceSuggestionResponse,
  AiMessageEntity,
  AiMessageResponse,
  CreateAiContentJob,
  CreateAiConversation,
  CreateAiCrossReferenceSuggestion,
  CreateAiMessage,
  CreateTheologicalConcept,
  TheologicalConceptEntity,
  TheologicalConceptResponse,
  UpdateAiContentJob,
  UpdateAiConversation,
  UpdateAiCrossReferenceSuggestion,
  UpdateAiMessage,
  UpdateTheologicalConcept,
} from '@platform/contracts';
import {
  aiContentJobEntitySchema,
  aiContentJobResponseSchema,
  aiConversationEntitySchema,
  aiConversationResponseSchema,
  aiCrossReferenceSuggestionEntitySchema,
  aiCrossReferenceSuggestionResponseSchema,
  aiMessageEntitySchema,
  aiMessageResponseSchema,
  theologicalConceptEntitySchema,
  theologicalConceptResponseSchema,
} from '@platform/contracts';
import type {
  AiContentJob,
  AiConversation,
  AiCrossReferenceSuggestion,
  AiMessage,
  TheologicalConcept,
} from '@platform/database';

// ============================================================================
// AI CONVERSATION MAPPER FUNCTIONS
// ============================================================================

/**
 * Transform database row to AiConversationEntity
 */
export function toAiConversationEntity(
  row: AiConversation
): AiConversationEntity {
  try {
    if (!row) {
      throw new Error('AiConversation is null or undefined');
    }

    const entity = {
      id: row.id,
      userId: row.userId,
      conversationType: row.conversationType,
      title: row.title ?? undefined,
      primaryTopic: row.primaryTopic ?? undefined,
      theologicalContext: row.theologicalContext ?? undefined,
      userApestProfile: row.userApestProfile ?? undefined,
      ministryContext: row.ministryContext ?? undefined,
      culturalContext: row.culturalContext ?? undefined,
      totalMessages: row.totalMessages ?? 0,
      conversationDurationMinutes: row.conversationDurationMinutes ?? undefined,
      userSatisfactionRating: row.userSatisfactionRating ?? undefined,
      theologicalAccuracyVerified: row.theologicalAccuracyVerified === true,
      helpfulnessRating: row.helpfulnessRating ?? undefined,
      aiModel: row.aiModel ?? 'gpt-4',
      modelVersion: row.modelVersion ?? undefined,
      totalTokensUsed: row.totalTokensUsed ?? 0,
      referencedContent: Array.isArray(row.referencedContent)
        ? row.referencedContent
        : [],
      generatedInsights: row.generatedInsights ?? undefined,
      status: row.status ?? 'active',
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
      completedAt: row.completedAt?.toISOString() ?? undefined,
    };

    const validation = aiConversationEntitySchema.safeParse(entity);
    if (!validation.success) {
      console.error(
        'AiConversation entity validation failed:',
        validation.error
      );
      throw new Error('Invalid AI conversation entity data');
    }
    return validation.data;
  } catch (error) {
    console.error('Error mapping AI conversation entity:', error);
    throw error;
  }
}

/**
 * Transform database row to AiConversationResponse with computed fields
 */
export function toAiConversationResponseDTO(
  row: AiConversation
): AiConversationResponse {
  try {
    const entity = toAiConversationEntity(row);

    const response = {
      ...entity,
      // Computed fields
      isActive: entity.status === 'active',
      isCompleted: entity.status === 'completed',
      isAbandoned: entity.status === 'abandoned',
      isArchived: entity.status === 'archived',
      hasUserRating: !!entity.userSatisfactionRating,
      conversationDurationText: entity.conversationDurationMinutes
        ? `${entity.conversationDurationMinutes} min`
        : undefined,
      tokenUsageText:
        entity.totalTokensUsed > 0
          ? `${entity.totalTokensUsed.toLocaleString()} tokens`
          : undefined,
    };

    const validation = aiConversationResponseSchema.safeParse(response);
    if (!validation.success) {
      console.error(
        'AiConversation response validation failed:',
        validation.error
      );
      throw new Error('Invalid AI conversation response data');
    }
    return validation.data;
  } catch (error) {
    console.error('Error mapping AI conversation response:', error);
    throw error;
  }
}

/**
 * Transform CreateAiConversation to database insert format
 */
export function fromCreateAiConversation(
  data: CreateAiConversation
): Partial<AiConversation> {
  try {
    return {
      userId: data.userId,
      conversationType: data.conversationType,
      title: data.title || null,
      primaryTopic: data.primaryTopic || null,
      theologicalContext: data.theologicalContext || null,
      userApestProfile: data.userApestProfile || null,
      ministryContext: data.ministryContext || null,
      culturalContext: data.culturalContext || null,
      userSatisfactionRating: data.userSatisfactionRating || null,
      theologicalAccuracyVerified: data.theologicalAccuracyVerified || false,
      helpfulnessRating: data.helpfulnessRating || null,
      aiModel: data.aiModel || 'gpt-4',
      modelVersion: data.modelVersion || null,
      referencedContent: data.referencedContent || [],
      generatedInsights: data.generatedInsights || null,
      status: data.status || 'active',
      completedAt: data.completedAt ? new Date(data.completedAt) : null,
    };
  } catch (error) {
    console.error('Error mapping create AI conversation:', error);
    throw error;
  }
}

/**
 * Transform UpdateAiConversation to database update format
 */
export function fromUpdateAiConversation(
  data: UpdateAiConversation
): Partial<AiConversation> {
  try {
    const updateData: Partial<AiConversation> = {};

    if (data.conversationType !== undefined)
      updateData.conversationType = data.conversationType;
    if (data.title !== undefined) updateData.title = data.title || null;
    if (data.primaryTopic !== undefined)
      updateData.primaryTopic = data.primaryTopic || null;
    if (data.theologicalContext !== undefined)
      updateData.theologicalContext = data.theologicalContext || null;
    if (data.userApestProfile !== undefined)
      updateData.userApestProfile = data.userApestProfile || null;
    if (data.ministryContext !== undefined)
      updateData.ministryContext = data.ministryContext || null;
    if (data.culturalContext !== undefined)
      updateData.culturalContext = data.culturalContext || null;
    if (data.userSatisfactionRating !== undefined)
      updateData.userSatisfactionRating = data.userSatisfactionRating || null;
    if (data.theologicalAccuracyVerified !== undefined)
      updateData.theologicalAccuracyVerified = data.theologicalAccuracyVerified;
    if (data.helpfulnessRating !== undefined)
      updateData.helpfulnessRating = data.helpfulnessRating || null;
    if (data.aiModel !== undefined) updateData.aiModel = data.aiModel;
    if (data.modelVersion !== undefined)
      updateData.modelVersion = data.modelVersion || null;
    if (data.referencedContent !== undefined)
      updateData.referencedContent = data.referencedContent;
    if (data.generatedInsights !== undefined)
      updateData.generatedInsights = data.generatedInsights || null;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.completedAt !== undefined)
      updateData.completedAt = data.completedAt
        ? new Date(data.completedAt)
        : null;

    return updateData;
  } catch (error) {
    console.error('Error mapping update AI conversation:', error);
    throw error;
  }
}

// ============================================================================
// AI MESSAGE MAPPER FUNCTIONS
// ============================================================================

/**
 * Transform database row to AiMessageEntity
 */
export function toAiMessageEntity(row: AiMessage): AiMessageEntity {
  try {
    if (!row) {
      throw new Error('AiMessage is null or undefined');
    }

    const entity = {
      id: row.id,
      conversationId: row.conversationId,
      role: row.role,
      content: row.content,
      messageIndex: row.messageIndex,
      tokenCount: row.tokenCount ?? undefined,
      citedContent: Array.isArray(row.citedContent) ? row.citedContent : [],
      confidence: row.confidence ?? undefined,
      factualAccuracy: row.factualAccuracy ?? undefined,
      theologicalSoundness: row.theologicalSoundness ?? undefined,
      userRating: row.userRating ?? undefined,
      userFeedback: row.userFeedback ?? undefined,
      flaggedForReview: row.flaggedForReview === true,
      processingTime: (row as any).processingTime ?? undefined,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    };

    const validation = aiMessageEntitySchema.safeParse(entity);
    if (!validation.success) {
      console.error('AiMessage entity validation failed:', validation.error);
      throw new Error('Invalid AI message entity data');
    }
    return validation.data;
  } catch (error) {
    console.error('Error mapping AI message entity:', error);
    throw error;
  }
}

/**
 * Transform database row to AiMessageResponse with computed fields
 */
export function toAiMessageResponseDTO(row: AiMessage): AiMessageResponse {
  try {
    const entity = toAiMessageEntity(row);

    const response = {
      ...entity,
      // Computed fields
      isUserMessage: entity.role === 'user',
      isAssistantMessage: entity.role === 'assistant',
      isSystemMessage: entity.role === 'system',
      hasUserRating: !!entity.userRating,
      hasUserFeedback: !!entity.userFeedback,
      isFlagged: entity.flaggedForReview,
      processingTimeText: entity.processingTime
        ? `${entity.processingTime}ms`
        : undefined,
      confidenceText: entity.confidence
        ? `${(Number(entity.confidence) * 100).toFixed(1)}%`
        : undefined,
    };

    const validation = aiMessageResponseSchema.safeParse(response);
    if (!validation.success) {
      console.error('AiMessage response validation failed:', validation.error);
      throw new Error('Invalid AI message response data');
    }
    return validation.data;
  } catch (error) {
    console.error('Error mapping AI message response:', error);
    throw error;
  }
}

/**
 * Transform CreateAiMessage to database insert format
 */
export function fromCreateAiMessage(data: CreateAiMessage): Partial<AiMessage> {
  try {
    return {
      conversationId: data.conversationId,
      role: data.role,
      content: data.content,
      messageIndex: data.messageIndex,
      citedContent: data.citedContent || [],
      confidence: data.confidence || null,
      factualAccuracy: data.factualAccuracy || null,
      theologicalSoundness: data.theologicalSoundness || null,
      userRating: data.userRating || null,
      userFeedback: data.userFeedback || null,
      flaggedForReview: data.flaggedForReview || false,
      processingTime: (data as any).processingTime || null,
    };
  } catch (error) {
    console.error('Error mapping create AI message:', error);
    throw error;
  }
}

/**
 * Transform UpdateAiMessage to database update format
 */
export function fromUpdateAiMessage(data: UpdateAiMessage): Partial<AiMessage> {
  try {
    const updateData: Partial<AiMessage> = {};

    if (data.role !== undefined) updateData.role = data.role;
    if (data.content !== undefined) updateData.content = data.content;
    if (data.messageIndex !== undefined)
      updateData.messageIndex = data.messageIndex;
    if (data.citedContent !== undefined)
      updateData.citedContent = data.citedContent;
    if (data.confidence !== undefined)
      updateData.confidence = data.confidence || null;
    if (data.factualAccuracy !== undefined)
      updateData.factualAccuracy = data.factualAccuracy || null;
    if (data.theologicalSoundness !== undefined)
      updateData.theologicalSoundness = data.theologicalSoundness || null;
    if (data.userRating !== undefined)
      updateData.userRating = data.userRating || null;
    if (data.userFeedback !== undefined)
      updateData.userFeedback = data.userFeedback || null;
    if (data.flaggedForReview !== undefined)
      updateData.flaggedForReview = data.flaggedForReview;
    if ((data as any).processingTime !== undefined)
      updateData.processingTime = (data as any).processingTime || null;

    return updateData;
  } catch (error) {
    console.error('Error mapping update AI message:', error);
    throw error;
  }
}

// ============================================================================
// AI CONTENT JOB MAPPER FUNCTIONS
// ============================================================================

/**
 * Transform database row to AiContentJobEntity
 */
export function toAiContentJobEntity(row: AiContentJob): AiContentJobEntity {
  try {
    if (!row) {
      throw new Error('AiContentJob is null or undefined');
    }

    const entity = {
      id: row.id,
      contentId: row.contentId ?? undefined,
      userId: row.userId ?? undefined,
      jobType: row.jobType,
      parameters: row.parameters || {},
      priority: row.priority ?? 'normal',
      status: row.status ?? 'pending',
      result: row.result ?? undefined,
      confidenceScore: row.confidenceScore ?? undefined,
      humanReviewed: row.humanReviewed === true,
      humanApproved: row.humanApproved ?? undefined,
      reviewNotes: row.reviewNotes ?? undefined,
      aiModel: row.aiModel ?? 'gpt-4',
      tokensUsed: row.tokensUsed ?? undefined,
      processingCost: row.processingCost ?? undefined,
      errorMessage: row.errorMessage ?? undefined,
      retryCount: row.retryCount ?? 0,
      createdAt: row.createdAt.toISOString(),
      startedAt: row.startedAt?.toISOString() ?? undefined,
      completedAt: row.completedAt?.toISOString() ?? undefined,
      updatedAt: row.updatedAt.toISOString(),
    };

    const validation = aiContentJobEntitySchema.safeParse(entity);
    if (!validation.success) {
      console.error('AiContentJob entity validation failed:', validation.error);
      throw new Error('Invalid AI content job entity data');
    }
    return validation.data;
  } catch (error) {
    console.error('Error mapping AI content job entity:', error);
    throw error;
  }
}

/**
 * Transform database row to AiContentJobResponse with computed fields
 */
export function toAiContentJobResponseDTO(
  row: AiContentJob
): AiContentJobResponse {
  try {
    const entity = toAiContentJobEntity(row);

    const response = {
      ...entity,
      // Computed fields
      isPending: entity.status === 'pending',
      isProcessing: entity.status === 'processing',
      isCompleted: entity.status === 'completed',
      isFailed: entity.status === 'failed',
      isCancelled: entity.status === 'cancelled',
      hasError: !!entity.errorMessage,
      needsHumanReview: entity.humanReviewed && entity.humanApproved === null,
      isHighPriority:
        entity.priority === 'high' || entity.priority === 'urgent',
      processingCostText: entity.processingCost
        ? `$${Number(entity.processingCost).toFixed(4)}`
        : undefined,
      confidenceText: entity.confidenceScore
        ? `${(Number(entity.confidenceScore) * 100).toFixed(1)}%`
        : undefined,
    };

    const validation = aiContentJobResponseSchema.safeParse(response);
    if (!validation.success) {
      console.error(
        'AiContentJob response validation failed:',
        validation.error
      );
      throw new Error('Invalid AI content job response data');
    }
    return validation.data;
  } catch (error) {
    console.error('Error mapping AI content job response:', error);
    throw error;
  }
}

/**
 * Transform CreateAiContentJob to database insert format
 */
export function fromCreateAiContentJob(
  data: CreateAiContentJob
): Partial<AiContentJob> {
  try {
    return {
      contentId: data.contentId || null,
      userId: data.userId || null,
      jobType: data.jobType,
      parameters: data.parameters || {},
      priority: data.priority || 'normal',
      status: data.status || 'pending',
      result: data.result || null,
      confidenceScore: data.confidenceScore || null,
      humanReviewed: data.humanReviewed || false,
      humanApproved: data.humanApproved || null,
      reviewNotes: data.reviewNotes || null,
      aiModel: data.aiModel || 'gpt-4',
      tokensUsed: (data as any).tokensUsed || null,
      processingCost: (data as any).processingCost || null,
      errorMessage: data.errorMessage || null,
      retryCount: data.retryCount || 0,
      startedAt: data.startedAt ? new Date(data.startedAt) : null,
      completedAt: data.completedAt ? new Date(data.completedAt) : null,
    };
  } catch (error) {
    console.error('Error mapping create AI content job:', error);
    throw error;
  }
}

/**
 * Transform UpdateAiContentJob to database update format
 */
export function fromUpdateAiContentJob(
  data: UpdateAiContentJob
): Partial<AiContentJob> {
  try {
    const updateData: Partial<AiContentJob> = {};

    if (data.contentId !== undefined)
      updateData.contentId = data.contentId || null;
    if (data.userId !== undefined) updateData.userId = data.userId || null;
    if (data.jobType !== undefined) updateData.jobType = data.jobType;
    if (data.parameters !== undefined) updateData.parameters = data.parameters;
    if (data.priority !== undefined) updateData.priority = data.priority;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.result !== undefined) updateData.result = data.result || null;
    if (data.confidenceScore !== undefined)
      updateData.confidenceScore = data.confidenceScore || null;
    if (data.humanReviewed !== undefined)
      updateData.humanReviewed = data.humanReviewed;
    if (data.humanApproved !== undefined)
      updateData.humanApproved = data.humanApproved || null;
    if (data.reviewNotes !== undefined)
      updateData.reviewNotes = data.reviewNotes || null;
    if (data.aiModel !== undefined) updateData.aiModel = data.aiModel;
    if ((data as any).tokensUsed !== undefined)
      updateData.tokensUsed = (data as any).tokensUsed || null;
    if ((data as any).processingCost !== undefined)
      updateData.processingCost = (data as any).processingCost || null;
    if (data.errorMessage !== undefined)
      updateData.errorMessage = data.errorMessage || null;
    if (data.retryCount !== undefined) updateData.retryCount = data.retryCount;
    if (data.startedAt !== undefined)
      updateData.startedAt = data.startedAt ? new Date(data.startedAt) : null;
    if (data.completedAt !== undefined)
      updateData.completedAt = data.completedAt
        ? new Date(data.completedAt)
        : null;

    return updateData;
  } catch (error) {
    console.error('Error mapping update AI content job:', error);
    throw error;
  }
}

// ============================================================================
// AI CROSS REFERENCE SUGGESTION MAPPER FUNCTIONS
// ============================================================================

/**
 * Transform database row to AiCrossReferenceSuggestionEntity
 */
export function toAiCrossReferenceSuggestionEntity(
  row: AiCrossReferenceSuggestion
): AiCrossReferenceSuggestionEntity {
  try {
    if (!row) {
      throw new Error('AiCrossReferenceSuggestion is null or undefined');
    }

    const entity = {
      id: row.id,
      sourceContentId: row.sourceContentId,
      targetContentId: row.targetContentId,
      suggestedReferenceType: row.suggestedReferenceType,
      confidenceScore: row.confidenceScore,
      relevanceScore: row.relevanceScore,
      reasoning: row.reasoning ?? undefined,
      keyConnections: row.keyConnections ?? undefined,
      humanReviewed: row.humanReviewed === true,
      humanApproved: row.humanApproved ?? undefined,
      reviewNotes: row.reviewNotes ?? undefined,
      status: row.status ?? 'pending',
      aiModel: row.aiModel ?? 'gpt-4',
      modelVersion: row.modelVersion ?? undefined,
      createdAt: row.createdAt.toISOString(),
      reviewedAt: row.reviewedAt?.toISOString() ?? undefined,
      implementedAt: row.implementedAt?.toISOString() ?? undefined,
    };

    const validation = aiCrossReferenceSuggestionEntitySchema.safeParse(entity);
    if (!validation.success) {
      console.error(
        'AiCrossReferenceSuggestion entity validation failed:',
        validation.error
      );
      throw new Error('Invalid AI cross reference suggestion entity data');
    }
    return validation.data;
  } catch (error) {
    console.error('Error mapping AI cross reference suggestion entity:', error);
    throw error;
  }
}

/**
 * Transform database row to AiCrossReferenceSuggestionResponse with computed fields
 */
export function toAiCrossReferenceSuggestionResponseDTO(
  row: AiCrossReferenceSuggestion
): AiCrossReferenceSuggestionResponse {
  try {
    const entity = toAiCrossReferenceSuggestionEntity(row);

    const response = {
      ...entity,
      // Computed fields
      isPending: entity.status === 'pending',
      isApproved: entity.status === 'approved',
      isRejected: entity.status === 'rejected',
      isImplemented: entity.status === 'implemented',
      needsReview: entity.humanReviewed && entity.humanApproved === null,
      hasHighConfidence: entity.confidenceScore
        ? Number(entity.confidenceScore) > 0.8
        : false,
      hasHighRelevance: entity.relevanceScore
        ? Number(entity.relevanceScore) > 0.8
        : false,
    };

    const validation =
      aiCrossReferenceSuggestionResponseSchema.safeParse(response);
    if (!validation.success) {
      console.error(
        'AiCrossReferenceSuggestion response validation failed:',
        validation.error
      );
      throw new Error('Invalid AI cross reference suggestion response data');
    }
    return validation.data;
  } catch (error) {
    console.error(
      'Error mapping AI cross reference suggestion response:',
      error
    );
    throw error;
  }
}

/**
 * Transform CreateAiCrossReferenceSuggestion to database insert format
 */
export function fromCreateAiCrossReferenceSuggestion(
  data: CreateAiCrossReferenceSuggestion
): Partial<AiCrossReferenceSuggestion> {
  try {
    return {
      sourceContentId: data.sourceContentId,
      targetContentId: data.targetContentId,
      suggestedReferenceType: data.suggestedReferenceType,
      confidenceScore: data.confidenceScore,
      relevanceScore: data.relevanceScore,
      reasoning: data.reasoning || null,
      keyConnections: data.keyConnections || null,
      humanReviewed: data.humanReviewed || false,
      humanApproved: data.humanApproved || null,
      reviewNotes: data.reviewNotes || null,
      status: data.status || 'pending',
      aiModel: data.aiModel || 'gpt-4',
      modelVersion: data.modelVersion || null,
      reviewedAt: (data as any).reviewedAt
        ? new Date((data as any).reviewedAt)
        : null,
      implementedAt: (data as any).implementedAt
        ? new Date((data as any).implementedAt)
        : null,
    };
  } catch (error) {
    console.error('Error mapping create AI cross reference suggestion:', error);
    throw error;
  }
}

/**
 * Transform UpdateAiCrossReferenceSuggestion to database update format
 */
export function fromUpdateAiCrossReferenceSuggestion(
  data: UpdateAiCrossReferenceSuggestion
): Partial<AiCrossReferenceSuggestion> {
  try {
    const updateData: Partial<AiCrossReferenceSuggestion> = {};

    if (data.sourceContentId !== undefined)
      updateData.sourceContentId = data.sourceContentId;
    if (data.targetContentId !== undefined)
      updateData.targetContentId = data.targetContentId;
    if (data.suggestedReferenceType !== undefined)
      updateData.suggestedReferenceType = data.suggestedReferenceType;
    if (data.confidenceScore !== undefined)
      updateData.confidenceScore = data.confidenceScore;
    if (data.relevanceScore !== undefined)
      updateData.relevanceScore = data.relevanceScore;
    if (data.reasoning !== undefined)
      updateData.reasoning = data.reasoning || null;
    if (data.keyConnections !== undefined)
      updateData.keyConnections = data.keyConnections || null;
    if (data.humanReviewed !== undefined)
      updateData.humanReviewed = data.humanReviewed;
    if (data.humanApproved !== undefined)
      updateData.humanApproved = data.humanApproved || null;
    if (data.reviewNotes !== undefined)
      updateData.reviewNotes = data.reviewNotes || null;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.aiModel !== undefined) updateData.aiModel = data.aiModel;
    if (data.modelVersion !== undefined)
      updateData.modelVersion = data.modelVersion || null;
    if ((data as any).reviewedAt !== undefined)
      updateData.reviewedAt = (data as any).reviewedAt
        ? new Date((data as any).reviewedAt)
        : null;
    if ((data as any).implementedAt !== undefined)
      updateData.implementedAt = (data as any).implementedAt
        ? new Date((data as any).implementedAt)
        : null;

    return updateData;
  } catch (error) {
    console.error('Error mapping update AI cross reference suggestion:', error);
    throw error;
  }
}

// ============================================================================
// THEOLOGICAL CONCEPT MAPPER FUNCTIONS
// ============================================================================

/**
 * Transform database row to TheologicalConceptEntity
 */
export function toTheologicalConceptEntity(
  row: TheologicalConcept
): TheologicalConceptEntity {
  try {
    if (!row) {
      throw new Error('TheologicalConcept is null or undefined');
    }

    const entity = {
      id: row.id,
      name: row.name,
      slug: row.slug,
      definition: row.definition ?? undefined,
      conceptType: row.conceptType,
      theologicalTradition: Array.isArray(row.theologicalTradition)
        ? row.theologicalTradition
        : [],
      biblicalReferences: Array.isArray(row.biblicalReferences)
        ? row.biblicalReferences
        : [],
      historicalPeriod: row.historicalPeriod ?? undefined,
      relatedConcepts: Array.isArray(row.relatedConcepts)
        ? row.relatedConcepts
        : [],
      synonyms: Array.isArray(row.synonyms) ? row.synonyms : [],
      apestRelevance: row.apestRelevance || {
        apostolic: 5,
        prophetic: 5,
        evangelistic: 5,
        shepherding: 5,
        teaching: 5,
      },
      contentReferences: row.contentReferences ?? 0,
      searchCount: row.searchCount ?? 0,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    };

    const validation = theologicalConceptEntitySchema.safeParse(entity);
    if (!validation.success) {
      console.error(
        'TheologicalConcept entity validation failed:',
        validation.error
      );
      throw new Error('Invalid theological concept entity data');
    }
    return validation.data;
  } catch (error) {
    console.error('Error mapping theological concept entity:', error);
    throw error;
  }
}

/**
 * Transform database row to TheologicalConceptResponse with computed fields
 */
export function toTheologicalConceptResponseDTO(
  row: TheologicalConcept
): TheologicalConceptResponse {
  try {
    const entity = toTheologicalConceptEntity(row);

    const response = {
      ...entity,
      // Computed fields
      isActive: true, // All concepts are active by default
      hasDefinition: !!entity.definition,
      hasRelatedConcepts: entity.relatedConcepts.length > 0,
      apestScoreText: `A:${entity.apestRelevance.apostolic} P:${entity.apestRelevance.prophetic} E:${entity.apestRelevance.evangelistic} S:${entity.apestRelevance.shepherding} T:${entity.apestRelevance.teaching}`,
    };

    const validation = theologicalConceptResponseSchema.safeParse(response);
    if (!validation.success) {
      console.error(
        'TheologicalConcept response validation failed:',
        validation.error
      );
      throw new Error('Invalid theological concept response data');
    }
    return validation.data;
  } catch (error) {
    console.error('Error mapping theological concept response:', error);
    throw error;
  }
}

/**
 * Transform CreateTheologicalConcept to database insert format
 */
export function fromCreateTheologicalConcept(
  data: CreateTheologicalConcept
): Partial<TheologicalConcept> {
  try {
    return {
      name: data.name,
      slug: data.slug,
      definition: data.definition || null,
      conceptType: data.conceptType,
      theologicalTradition: data.theologicalTradition || [],
      biblicalReferences: data.biblicalReferences || [],
      historicalPeriod: data.historicalPeriod || null,
      relatedConcepts: data.relatedConcepts || [],
      synonyms: data.synonyms || [],
      apestRelevance: data.apestRelevance || {
        apostolic: 5,
        prophetic: 5,
        evangelistic: 5,
        shepherding: 5,
        teaching: 5,
      },
    };
  } catch (error) {
    console.error('Error mapping create theological concept:', error);
    throw error;
  }
}

/**
 * Transform UpdateTheologicalConcept to database update format
 */
export function fromUpdateTheologicalConcept(
  data: UpdateTheologicalConcept
): Partial<TheologicalConcept> {
  try {
    const updateData: Partial<TheologicalConcept> = {};

    if (data.name !== undefined) updateData.name = data.name;
    if (data.slug !== undefined) updateData.slug = data.slug;
    if (data.definition !== undefined)
      updateData.definition = data.definition || null;
    if (data.conceptType !== undefined)
      updateData.conceptType = data.conceptType;
    if (data.theologicalTradition !== undefined)
      updateData.theologicalTradition = data.theologicalTradition;
    if (data.biblicalReferences !== undefined)
      updateData.biblicalReferences = data.biblicalReferences;
    if (data.historicalPeriod !== undefined)
      updateData.historicalPeriod = data.historicalPeriod || null;
    if (data.relatedConcepts !== undefined)
      updateData.relatedConcepts = data.relatedConcepts;
    if (data.synonyms !== undefined) updateData.synonyms = data.synonyms;
    if (data.apestRelevance !== undefined)
      updateData.apestRelevance = data.apestRelevance;

    return updateData;
  } catch (error) {
    console.error('Error mapping update theological concept:', error);
    throw error;
  }
}
