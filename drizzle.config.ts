import type { Config } from 'drizzle-kit';

export default {
  schema: './lib/db/schema.ts',
  out: './lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url:
      process.env['POSTGRES_URL'] ??
      (() => {
        throw new Error('POSTGRES_URL environment variable is required');
      })(),
  },
} satisfies Config;
