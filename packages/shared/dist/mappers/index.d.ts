export { toUserProfileDTO, toUserProfileListDTO } from './user-profiles';
export { toOrganizationDTO, toOrganizationMembershipDTO, } from './organizations';
export { toAssessmentQuestionResponseDTO, toAssessmentResponseDTO, toAssessmentResponseResponseDTO, toAssessmentWithQuestionsResponseDTO, toPaginatedAssessmentListResponseDTO, toPaginatedUserAssessmentListResponseDTO, toUserAssessmentResponseDTO, toUserAssessmentWithDetailsResponseDTO, } from './assessments';
export { toContentCategoryResponseDTO, toContentItemResponseDTO, toContentItemWithDetailsDTO, toContentSeriesWithDetailsDTO, } from './content';
export { toAiContentJobResponseDTO, toAiConversationResponseDTO, toAiCrossReferenceSuggestionResponseDTO, toAiMessageResponseDTO, toPaginatedAiContentJobListResponseDTO, toPaginatedAiConversationListResponseDTO, toPaginatedAiCrossReferenceSuggestionListResponseDTO, toPaginatedAiMessageListResponseDTO, toPaginatedTheologicalConceptListResponseDTO, toTheologicalConceptResponseDTO, } from './ai';
export { aggregateMinistryMetrics, applyRoleBasedVisibility, filterByPlantTerritory, filterByRolePermissions, getMinistryFieldPermissions, toAuthMinistryCombinedDTO, toMinistryAssessmentDTO, toMinistryCommunityDTO, toMinistryContentItemDTO, toMinistryOrganizationDTO, toMinistryUserProfileDTO, toOrganizationContextDTO, toOrganizationScopedDTO, } from './ministry-platform';
/**
 * Generic mapper utility for handling null/undefined values
 */
export declare function safeMap<T, R>(value: T | null | undefined, mapper: (value: T) => R, defaultValue: R): R;
/**
 * Generic mapper utility for arrays with null/undefined handling
 */
export declare function safeMapArray<T, R>(values: (T | null | undefined)[], mapper: (value: T) => R, defaultValue: R): R[];
/**
 * Generic mapper utility for optional fields
 */
export declare function mapOptional<T, R>(value: T | null | undefined, mapper: (value: T) => R): R | undefined;
/**
 * Generic mapper utility for required fields with fallback
 */
export declare function mapRequired<T, R>(value: T | null | undefined, mapper: (value: T) => R, fallback: R): R;
/**
 * Generic mapper utility for date formatting
 */
export declare function mapDate(date: Date | string | null | undefined): string | null;
/**
 * Generic mapper utility for boolean fields with default
 */
export declare function mapBoolean(value: boolean | null | undefined, defaultValue?: boolean): boolean;
/**
 * Generic mapper utility for number fields with default
 */
export declare function mapNumber(value: number | null | undefined, defaultValue?: number): number;
/**
 * Generic mapper utility for string fields with default
 */
export declare function mapString(value: string | null | undefined, defaultValue?: string): string;
/**
 * Generic mapper utility for JSON fields
 */
export declare function mapJson<T>(value: any, defaultValue: T): T;
/**
 * Generic mapper utility for array fields
 */
export declare function mapArray<T>(value: T[] | null | undefined, defaultValue?: T[]): T[];
/**
 * Generic mapper utility for record/object fields
 */
export declare function mapRecord<T>(value: Record<string, T> | null | undefined, defaultValue?: Record<string, T>): Record<string, T>;
//# sourceMappingURL=index.d.ts.map