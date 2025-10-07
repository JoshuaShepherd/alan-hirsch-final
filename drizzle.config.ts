import type { Config } from 'drizzle-kit';

export default {
  schema: './src/lib/database/db/schema.ts',
  out: './src/lib/database/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url:
      process.env['POSTGRES_URL'] ??
      (() => {
        throw new Error('POSTGRES_URL environment variable is required');
      })(),
  },
} satisfies Config;
