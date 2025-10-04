import { createBulkOperationHandler } from '@platform/shared/api/bulk-operations';
import {
  assessmentResponseDTOSchema,
  createAssessmentRequestSchema,
  updateAssessmentRequestSchema,
} from '@platform/shared/contracts';
import { assessmentService } from '@platform/shared/services';

// ============================================================================
// Assessment Bulk Operations API Route - Type-Safe Implementation
// ============================================================================

// POST /api/assessments/bulk - Bulk operations on assessments
export const POST = createBulkOperationHandler({
  itemSchema: assessmentResponseDTOSchema,
  createSchema: createAssessmentRequestSchema,
  updateSchema: updateAssessmentRequestSchema,
  service: {
    create: assessmentService.create,
    update: assessmentService.update,
    delete: assessmentService.delete,
  },
});
