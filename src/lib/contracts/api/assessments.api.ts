// Auto-generated API contracts for assessments
// Generated at: 2025-10-06T20:01:40.348Z

import {
  assessmentQuestionsEntitySchema,
  assessmentQuestionsQuerySchema,
  assessmentResponsesEntitySchema,
  assessmentResponsesQuerySchema,
  assessmentsEntitySchema,
  assessmentsQuerySchema,
  createAssessmentQuestionsSchema,
  createAssessmentResponsesSchema,
  createAssessmentsSchema,
  createUserAssessmentsSchema,
  updateAssessmentQuestionsSchema,
  updateAssessmentResponsesSchema,
  updateAssessmentsSchema,
  updateUserAssessmentsSchema,
  userAssessmentsEntitySchema,
  userAssessmentsQuerySchema,
} from '../schemas/assessments';

// API schemas for assessments
// API request/response schemas for assessments
export const assessmentsApiRequestSchema = createAssessmentsSchema;
export const assessmentsApiResponseSchema = assessmentsEntitySchema;
export const assessmentsApiUpdateSchema = updateAssessmentsSchema;
export const assessmentsApiQuerySchema = assessmentsQuerySchema;

// API request/response schemas for assessmentQuestions
export const assessmentQuestionsApiRequestSchema =
  createAssessmentQuestionsSchema;
export const assessmentQuestionsApiResponseSchema =
  assessmentQuestionsEntitySchema;
export const assessmentQuestionsApiUpdateSchema =
  updateAssessmentQuestionsSchema;
export const assessmentQuestionsApiQuerySchema = assessmentQuestionsQuerySchema;

// API request/response schemas for userAssessments
export const userAssessmentsApiRequestSchema = createUserAssessmentsSchema;
export const userAssessmentsApiResponseSchema = userAssessmentsEntitySchema;
export const userAssessmentsApiUpdateSchema = updateUserAssessmentsSchema;
export const userAssessmentsApiQuerySchema = userAssessmentsQuerySchema;

// API request/response schemas for assessmentResponses
export const assessmentResponsesApiRequestSchema =
  createAssessmentResponsesSchema;
export const assessmentResponsesApiResponseSchema =
  assessmentResponsesEntitySchema;
export const assessmentResponsesApiUpdateSchema =
  updateAssessmentResponsesSchema;
export const assessmentResponsesApiQuerySchema = assessmentResponsesQuerySchema;
