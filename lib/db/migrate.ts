import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db } from './db';

async function main() {
	console.log("migration started...");
	await migrate(db, { migrationsFolder: "drizzle" });
	console.log("migration ended...");
	process.exit(0);
}

main().catch((err) => {
	console.error(err);
	process.exit(0);
});
