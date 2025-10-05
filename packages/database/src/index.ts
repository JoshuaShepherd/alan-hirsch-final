// Database Package - Database schemas and utilities
// This package contains Drizzle schemas, Supabase client, and database utilities

// Export database schemas
export * from './db/schema';

// Export database connection
export { client, db } from './db/drizzle';

// Export database utilities
export * from './db/queries';

// Export type guards
export * from './db/type-guards';

// Export Supabase client
export { createClient as createSupabaseClient } from './supabase/client';
export { createClient as createSupabaseServerClient } from './supabase/server';

// Export database types
export type * from './db/schema';
