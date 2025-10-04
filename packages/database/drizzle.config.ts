import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url:
      process.env['POSTGRES_URL'] ??
      (() => {
        throw new Error('POSTGRES_URL environment variable is required');
      })(),
  },
} satisfies Config;
