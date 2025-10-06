import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { schema } from './schema/index';
dotenv.config();
if (!process.env['POSTGRES_URL']) {
    throw new Error('POSTGRES_URL environment variable is not set');
}
// Production-ready connection with pooling
export const client = postgres(process.env['POSTGRES_URL'], {
    max: 20, // Maximum connections
    idle_timeout: 20, // Close idle connections after 20s
    connect_timeout: 10, // Connection timeout
    prepare: false, // Disable prepared statements for serverless
});
export const db = drizzle(client, {
    schema,
    logger: process.env['NODE_ENV'] === 'development', // Log queries in development
});
// Graceful shutdown
process.on('SIGINT', async () => {
    await client.end();
    process.exit(0);
});
//# sourceMappingURL=drizzle.js.map