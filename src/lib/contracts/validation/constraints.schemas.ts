// Auto-generated contracts for validation
// Generated at: 2025-10-06T14:05:02.271Z

import { z } from 'zod';

// Database constraints validation schema
export const databaseConstraintsSchema = z.object({
  primaryKey: z.array(z.string()),
  foreignKeys: z.record(z.string()),
  uniqueConstraints: z.array(z.array(z.string())),
  checkConstraints: z.record(z.string()),
});

// Business constraints validation schema
export const businessConstraintsSchema = z.object({
  maxOrganizationsPerUser: z.number().int().positive().default(5),
  maxCommunitiesPerUser: z.number().int().positive().default(10),
  maxContentItemsPerSeries: z.number().int().positive().default(100),
  maxAssessmentQuestions: z.number().int().positive().default(50),
});


