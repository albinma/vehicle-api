import { sql } from 'kysely';
import { db, knexDb } from 'src/initializers/database';

try {
	// const backupFile = Bun.file('test.txt');
	// const backupFileExists = await backupFile.exists();

	// if (!backupFileExists) {
	// 	console.error(
	// 		'Backup file does not exist. Please visit https://vpic.nhtsa.dot.gov/api/ and download the latest backup file and place it in the same directory as this script as "vPICList_lite.bak"'
	// 	);
	// 	process.exit(1);
	// }

	const isConnected = await knexDb.raw('SELECT 1');
	// const isConnected = await sql`SELECT 1`.execute(db);

	if (isConnected) {
		console.log('Connected to the database');
	}

	process.exit(0);
} catch (err) {
	console.error(err);
	process.exit(1);
} finally {
	await db.destroy();
}
