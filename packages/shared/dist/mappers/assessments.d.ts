import type { assessments, assessmentQuestions, userAssessments, assessmentResponses } from '../db/schema';
import type { AssessmentResponse, AssessmentQuestionResponse, UserAssessmentResponse, AssessmentResponseResponse, AssessmentWithQuestionsResponse, UserAssessmentWithDetailsResponse, PaginatedAssessmentListResponse, PaginatedUserAssessmentListResponse } from '../contracts/assessments.response';
type AssessmentRow = typeof assessments.$inferSelect;
type AssessmentQuestionRow = typeof assessmentQuestions.$inferSelect;
type UserAssessmentRow = typeof userAssessments.$inferSelect;
type AssessmentResponseRow = typeof assessmentResponses.$inferSelect;
/**
 * Map AssessmentRow to AssessmentResponse
 */
export declare function toAssessmentResponseDTO(row: AssessmentRow): AssessmentResponse;
/**
 * Map AssessmentQuestionRow to AssessmentQuestionResponse
 */
export declare function toAssessmentQuestionResponseDTO(row: AssessmentQuestionRow): AssessmentQuestionResponse;
/**
 * Map UserAssessmentRow to UserAssessmentResponse
 */
export declare function toUserAssessmentResponseDTO(row: UserAssessmentRow): UserAssessmentResponse;
/**
 * Map AssessmentResponseRow to AssessmentResponseResponse
 */
export declare function toAssessmentResponseResponseDTO(row: AssessmentResponseRow): AssessmentResponseResponse;
/**
 * Map AssessmentRow with questions to AssessmentWithQuestionsResponse
 */
export declare function toAssessmentWithQuestionsResponseDTO(assessment: AssessmentRow, questions: AssessmentQuestionRow[]): AssessmentWithQuestionsResponse;
/**
 * Map UserAssessmentRow with assessment details to UserAssessmentWithDetailsResponse
 */
export declare function toUserAssessmentWithDetailsResponseDTO(userAssessment: UserAssessmentRow, assessment: AssessmentRow): UserAssessmentWithDetailsResponse;
/**
 * Map array of AssessmentRow to PaginatedAssessmentListResponse
 */
export declare function toPaginatedAssessmentListResponseDTO(assessments: AssessmentRow[], pagination: {
    page: number;
    limit: number;
    total: number;
}): PaginatedAssessmentListResponse;
/**
 * Map array of UserAssessmentRow with assessment details to PaginatedUserAssessmentListResponse
 */
export declare function toPaginatedUserAssessmentListResponseDTO(userAssessments: Array<{
    userAssessment: UserAssessmentRow;
    assessment: AssessmentRow;
}>, pagination: {
    page: number;
    limit: number;
    total: number;
}): PaginatedUserAssessmentListResponse;
export {};
//# sourceMappingURL=assessments.d.ts.map