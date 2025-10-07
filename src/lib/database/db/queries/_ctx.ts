/**
 * Query Context Type Definition
 * Enhanced context type for query modules with database connection
 */

import type { db } from '../drizzle';

export type Ctx = {
  tenantId: string;
  userId: string;
  role: string;
  db: typeof db;
};
