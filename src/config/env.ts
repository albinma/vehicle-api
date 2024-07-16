import { Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';

const envSchema = Type.Object(
	{
		NODE_ENV: Type.String({ enum: ['development', 'test', 'production'] }),
		TZ: Type.String({ minLength: 1 }),
		LOG_LEVEL: Type.String({ enum: ['trace', 'debug', 'info', 'warn', 'error', 'fatal'] }),
		DATABASE_PORT: Type.Transform(Type.String({ minLength: 1 }))
			.Decode((value) => Number(value))
			.Encode((value) => value.toString()),
		DATABASE_PASSWORD: Type.String({ minLength: 1 }),
	},
	{}
);

const env = Value.Decode(envSchema, Bun.env);

const config = {
	environment: env.NODE_ENV,
	server: {
		timezone: env.TZ,
	},
	logging: {
		level: env.LOG_LEVEL,
	},
	database: {
		port: env.DATABASE_PORT,
		password: env.DATABASE_PASSWORD,
	},
};

export { config };
