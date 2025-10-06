// Database Package - Database schemas and utilities
// This package contains Drizzle schemas, Supabase client, and database utilities

// Export database schemas
export * from './db/schema';

// Export database connection
export { client, db } from './db/drizzle';

// Export database utilities
export * from './db/queries';

// Export specific query functions that are commonly imported
export {
  getUserOrganizationMemberships as getTeamForUser,
  getUserProfileById as getUser,
  getUserApestScores,
  // User Query Function Aliases
  getUserProfileByEmail as getUserByEmail,
  getUserMinistryContext,
  getUserOnboardingStatus,
  getUserOrganizationMemberships,
  getUserPlatformSettings,
  getUserProfileByEmail,
  getUserProfileById,
  getUserProfileBySubdomain,
  getUserStats,
  getUsersByOrganization,
  type QueryContext,
} from './db/queries/users';

export {
  getApestScoreDistribution,
  getAssessmentById,
  getAssessmentQuestions,
  getUserAssessmentById as getAssessmentResponses,
  getAssessmentStats,
  // Assessment Query Function Aliases
  getAssessmentQuestions as getQuestions,
  getUserAssessmentById,
  getUserAssessmentByType,
  getUserAssessments,
} from './db/queries/assessments';

export {
  getOrganizationById,
  getOrganizationBySlug,
  getOrganizationMembers,
  getOrganizationStats,
  getOrganizationsByUser,
  getUserOrganizationMembership,
} from './db/queries/organizations';

// Export type guards
export * from './db/type-guards';

// Export Supabase client
export { createClient as createSupabaseClient } from './supabase/client';
export { createClient as createSupabaseServerClient } from './supabase/server';

// Export database types
export type * from './db/schema';
