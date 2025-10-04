import { createRouteHandler } from '@platform/shared/api/route-handler';
import { uploadService } from '@platform/shared/services';
import { z } from 'zod';

// ============================================================================
// MINISTRY FILE UPLOAD API ROUTES
// ============================================================================

// File upload request schema
const fileUploadRequestSchema = z.object({
  fileName: z.string().min(1),
  fileType: z.string().min(1),
  fileSize: z.number().int().positive(),
  contentType: z.string().min(1),
  organizationId: z.string().uuid().optional(),
  category: z
    .enum(['content', 'assessment', 'profile', 'organization'])
    .optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

// POST /api/ministry/upload - Upload file for ministry platform
export const POST = createRouteHandler({
  inputSchema: fileUploadRequestSchema,
  outputSchema: z.object({
    fileId: z.string().uuid(),
    fileName: z.string(),
    fileUrl: z.string().url(),
    fileSize: z.number().int(),
    contentType: z.string(),
    uploadedAt: z.string().datetime(),
    ministryContext: z.object({
      uploadedBy: z.string().uuid(),
      organizationId: z.string().uuid().optional(),
      category: z.string().optional(),
    }),
  }),
  method: 'POST',
  handler: async (data, context) => {
    // Add ministry context to upload data
    const uploadData = {
      ...data,
      ministryContext: {
        uploadedBy: context.user.id,
        organizationId: context.user.organizationId,
        userMinistryRole: context.user.ministryRole,
      },
    };

    return await uploadService.uploadMinistryFile(uploadData, context);
  },
});

// GET /api/ministry/upload - Get upload status and file information
export const GET = createRouteHandler({
  inputSchema: z.object({
    fileId: z.string().uuid().optional(),
    organizationId: z.string().uuid().optional(),
    category: z.string().optional(),
  }),
  outputSchema: z.object({
    files: z.array(
      z.object({
        fileId: z.string().uuid(),
        fileName: z.string(),
        fileUrl: z.string().url(),
        fileSize: z.number().int(),
        contentType: z.string(),
        uploadedAt: z.string().datetime(),
        status: z.enum(['uploading', 'processing', 'completed', 'failed']),
        ministryContext: z.object({
          uploadedBy: z.string().uuid(),
          organizationId: z.string().uuid().optional(),
          category: z.string().optional(),
        }),
      })
    ),
  }),
  method: 'GET',
  handler: async (query, context) => {
    // Add ministry context to query
    const queryData = {
      ...query,
      ministryContext: {
        requestingUserId: context.user.id,
        organizationId: context.user.organizationId,
        userMinistryRole: context.user.ministryRole,
      },
    };

    return await uploadService.getMinistryUploads(queryData, context);
  },
});
