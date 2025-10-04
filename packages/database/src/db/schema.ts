// Alan Hirsch Digital Platform - Comprehensive Database Schema
// This file exports the complete schema for the platform

// Import and re-export the comprehensive schema
export * from './schema/index';

// Import the schema object for default export
import { schema } from './schema/index';

// Default export for Drizzle ORM
export default schema;

// Legacy types for backward compatibility (if needed)
// These can be removed once all references are updated

// Activity Type Enum (preserved for compatibility)
export enum ActivityType {
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  UPDATE_PASSWORD = 'UPDATE_PASSWORD',
  DELETE_ACCOUNT = 'DELETE_ACCOUNT',
  UPDATE_ACCOUNT = 'UPDATE_ACCOUNT',
  CREATE_TEAM = 'CREATE_TEAM',
  REMOVE_TEAM_MEMBER = 'REMOVE_TEAM_MEMBER',
  INVITE_TEAM_MEMBER = 'INVITE_TEAM_MEMBER',
  ACCEPT_INVITATION = 'ACCEPT_INVITATION',
}
