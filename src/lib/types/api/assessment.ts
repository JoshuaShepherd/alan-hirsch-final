// Auto-generated types for api
// Generated at: 2025-10-06T16:27:57.959Z

import type {
  AnswerOption,
  AssessmentStatus,
  AssessmentType,
  QuestionType,
} from '../common';

export interface AssessmentRequest {
  name: string;
  slug: string;
  assessmentType: AssessmentType;
  description: string | undefined;
  instructions: string | undefined;
}

export interface AssessmentResponse {
  id: string;
  name: string;
  slug: string;
  assessmentType: AssessmentType;
  description: string | null;
  instructions: string | null;
  status: AssessmentStatus;
  questionCount: number;
  estimatedTimeMinutes: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface AssessmentQuestionRequest {
  assessmentId: string;
  questionText: string;
  questionType: QuestionType;
  orderIndex: number;
  isRequired: boolean;
  answerOptions: AnswerOption[] | undefined;
}

export interface UserAssessmentRequest {
  assessmentId: string;
  userId: string;
}

export interface AssessmentResponseRequest {
  userAssessmentId: string;
  questionId: string;
  responseValue: number | undefined;
  responseText: string | undefined;
  skipped: boolean;
  responseTime: number | undefined;
  confidence: number | undefined;
}
