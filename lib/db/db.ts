import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';
import postgres from 'postgres';
import { global } from 'styled-jsx/css';

let db: PostgresJsDatabase<typeof schema>;

declare global {
	var __db__: PostgresJsDatabase<typeof schema>;
}

const connectionString = process.env.DATABASE_URL!;

if (process.env.NODE_ENV === "production") {
	const client = postgres(connectionString);
	db = drizzle(client, { schema });
	console.log('drizzle client created');
} else {
	if (!global.__db__) {
		global.__db__ = drizzle(postgres(connectionString), {
			schema,
		});
	}
	db = global.__db__;
}

export { db };
