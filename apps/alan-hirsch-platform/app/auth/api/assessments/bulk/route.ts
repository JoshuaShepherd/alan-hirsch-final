import { createBulkOperationHandler } from '@platform/shared/api/bulk-operations';
import { assessmentService } from '../../../../../lib/services';

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
