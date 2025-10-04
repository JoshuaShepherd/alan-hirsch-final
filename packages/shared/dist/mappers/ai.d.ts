import type { aiConversations, aiMessages, aiContentJobs, aiCrossReferenceSuggestions, theologicalConcepts, contentItems } from '../db/schema';
import type { AiConversationResponse, AiMessageResponse, AiContentJobResponse, AiCrossReferenceSuggestionResponse, TheologicalConceptResponse, PaginatedAiConversationListResponse, PaginatedAiMessageListResponse, PaginatedAiContentJobListResponse, PaginatedAiCrossReferenceSuggestionListResponse, PaginatedTheologicalConceptListResponse } from '../contracts/ai.response';
type AiConversationRow = typeof aiConversations.$inferSelect;
type AiMessageRow = typeof aiMessages.$inferSelect;
type AiContentJobRow = typeof aiContentJobs.$inferSelect;
type AiCrossReferenceSuggestionRow = typeof aiCrossReferenceSuggestions.$inferSelect;
type TheologicalConceptRow = typeof theologicalConcepts.$inferSelect;
type ContentItemRow = typeof contentItems.$inferSelect;
/**
 * Map AiConversationRow to AiConversationResponse
 */
export declare function toAiConversationResponseDTO(row: AiConversationRow): AiConversationResponse;
/**
 * Map AiMessageRow to AiMessageResponse
 */
export declare function toAiMessageResponseDTO(row: AiMessageRow): AiMessageResponse;
/**
 * Map AiContentJobRow to AiContentJobResponse
 */
export declare function toAiContentJobResponseDTO(row: AiContentJobRow): AiContentJobResponse;
/**
 * Map AiCrossReferenceSuggestionRow to AiCrossReferenceSuggestionResponse
 */
export declare function toAiCrossReferenceSuggestionResponseDTO(row: AiCrossReferenceSuggestionRow, sourceContent?: ContentItemRow, targetContent?: ContentItemRow): AiCrossReferenceSuggestionResponse;
/**
 * Map TheologicalConceptRow to TheologicalConceptResponse
 */
export declare function toTheologicalConceptResponseDTO(row: TheologicalConceptRow): TheologicalConceptResponse;
/**
 * Map array of AiConversationRow to PaginatedAiConversationListResponse
 */
export declare function toPaginatedAiConversationListResponseDTO(conversations: AiConversationRow[], pagination: {
    page: number;
    limit: number;
    total: number;
}): PaginatedAiConversationListResponse;
/**
 * Map array of AiMessageRow to PaginatedAiMessageListResponse
 */
export declare function toPaginatedAiMessageListResponseDTO(messages: AiMessageRow[], pagination: {
    page: number;
    limit: number;
    total: number;
}): PaginatedAiMessageListResponse;
/**
 * Map array of AiContentJobRow to PaginatedAiContentJobListResponse
 */
export declare function toPaginatedAiContentJobListResponseDTO(jobs: AiContentJobRow[], pagination: {
    page: number;
    limit: number;
    total: number;
}): PaginatedAiContentJobListResponse;
/**
 * Map array of AiCrossReferenceSuggestionRow to PaginatedAiCrossReferenceSuggestionListResponse
 */
export declare function toPaginatedAiCrossReferenceSuggestionListResponseDTO(suggestions: Array<{
    suggestion: AiCrossReferenceSuggestionRow;
    sourceContent?: ContentItemRow;
    targetContent?: ContentItemRow;
}>, pagination: {
    page: number;
    limit: number;
    total: number;
}): PaginatedAiCrossReferenceSuggestionListResponse;
/**
 * Map array of TheologicalConceptRow to PaginatedTheologicalConceptListResponse
 */
export declare function toPaginatedTheologicalConceptListResponseDTO(concepts: TheologicalConceptRow[], pagination: {
    page: number;
    limit: number;
    total: number;
}): PaginatedTheologicalConceptListResponse;
export {};
//# sourceMappingURL=ai.d.ts.map