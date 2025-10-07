// Auto-generated types for validation
// Generated at: 2025-10-06T16:27:57.960Z

import { z } from 'zod';

export interface DatabaseError {
  code: string;
  message: string;
  constraint: string | undefined;
  detail: string | undefined;
}

export interface ValidationError {
  path: string[];
  message: string;
  code: string | undefined;
}
