// Auto-generated contracts for validation
// Generated at: 2025-10-06T14:05:02.271Z

import { z } from 'zod';

// Email format validation schema
export const emailSchema = z.string().email().toLowerCase().trim();

// Phone format validation schema
export const phoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format');

// URL format validation schema
export const urlSchema = z.string().url();

// Slug format validation schema
export const slugSchema = z.string().regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens');


