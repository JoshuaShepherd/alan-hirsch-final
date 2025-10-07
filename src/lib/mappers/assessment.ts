// Assessment mapper with service-compatible function names
// This file provides the mapper functions expected by the AssessmentService

import {
  fromCreateAssessmentDTO as fromCreateAssessment,
  fromUpdateAssessmentDTO as fromUpdateAssessment,
  toAssessmentDTO as toAssessmentDTOFromMapper,
} from './assessments.mapper';

// Re-export with service-expected names
export const toAssessmentDTO = toAssessmentDTOFromMapper;
export const fromCreateAssessmentDTO = fromCreateAssessment;
export const fromUpdateAssessmentDTO = fromUpdateAssessment;

// Type exports for service compatibility
export type {
  AssessmentCreateDTO,
  AssessmentResponseDTO,
  AssessmentUpdateDTO,
} from '@/lib/contracts';
