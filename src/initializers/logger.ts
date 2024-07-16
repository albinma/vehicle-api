import { createPinoLogger } from '@bogeychan/elysia-logger';
import { StandaloneLoggerOptions } from '@bogeychan/elysia-logger/src/types';
import { config } from 'src/config/env';

const loggerConfig: StandaloneLoggerOptions = {
	level: config.logging.level,
};

if (config.environment === 'development') {
	loggerConfig.transport = {
		target: 'pino-pretty',
		options: {
			colorize: true,
		},
	};
}

export const logger = createPinoLogger(loggerConfig);
