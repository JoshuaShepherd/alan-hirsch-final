// Auto-generated types for validation
// Generated at: 2025-10-06T16:27:57.960Z

import { z } from 'zod';

export interface DatabaseConstraints {
  primaryKey: string[];
  foreignKeys: Record<string, string>;
  uniqueConstraints: string[][];
  checkConstraints: Record<string, string>;
}
