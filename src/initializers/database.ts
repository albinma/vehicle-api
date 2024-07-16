import { Kysely, MssqlDialect } from 'kysely';
import { logger } from 'src/initializers/logger';
import * as tedious from 'tedious';
import * as tarn from 'tarn';
import { config } from 'src/config/env';
import { vPICList_Lite1 } from 'src/database/db';
import knex from 'knex';

const dialect = new MssqlDialect({
	tarn: {
		...tarn,
		options: {
			min: 0,
			max: 10,
			log: (message) => {
				logger.debug(message);
			},
		},
	},
	tedious: {
		...tedious,
		connectionFactory: () =>
			new tedious.Connection({
				authentication: {
					options: {
						userName: config.database.username,
						password: config.database.password,
					},
					type: 'default',
				},
				options: {
					database: config.database.name,
					port: 1433,
					trustServerCertificate: true,
				},
				server: config.database.host,
			}),
	},
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db: VPICDatabase = new Kysely<vPICList_Lite1>({
	dialect,
});

export type VPICDatabase = Kysely<vPICList_Lite1>;

console.log(config.database);

export const knexDb = knex({
	client: 'mssql',
	connection: {
		host: config.database.host,
		user: config.database.username,
		password: config.database.password,
		database: config.database.name,
		port: 1433,
	},
});
