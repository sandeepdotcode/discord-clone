import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
 
const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
const db = drizzle(client);
console.log('drizzle client created');

export { db };
