import cors from '@elysiajs/cors';
import swagger from '@elysiajs/swagger';
import Elysia, { t } from 'elysia';
import { helmet } from 'elysia-helmet';
import { CUSTOM_HEADERS } from 'src/constants/headers';
import { logger } from 'src/initializers/logger';

export const createApp = () => {
	const app = new Elysia()
		.use(cors())
		.use(
			helmet({
				// This is a backend api only - no need for CSP
				contentSecurityPolicy: false,
			})
		)
		// Adds a request id to the context
		.decorate('id', crypto.randomUUID())
		.onRequest(({ id, set }) => {
			set.headers[CUSTOM_HEADERS.RequestId] = id;
		})
		.use(
			logger.into({
				customProps({ id, params, query, headers }) {
					return {
						requestId: id,
						params,
						query,
						headers,
					};
				},
			})
		)
		.use(
			swagger({
				documentation: {
					tags: [
						{ name: 'App', description: 'General endpoints' },
						{ name: 'Search', description: 'Search endpoints' },
					],
				},
			})
		)
		.get('/', () => ({}))
		.group('/api/v1', (api) =>
			api.get(
				'/vin/:vin',
				({ params: { vin } }) => {
					return {
						vin,
						suggestedVin: null,
						make: 'Toyota',
						model: 'Tacoma',
						year: 2002,
						attributes: {
							engine: 'V6',
							test: 45,
						},
					};
				},
				{
					params: t.Object({
						vin: t.String({ minLength: 17, maxLength: 17 }),
					}),
					response: t.Object({
						vin: t.String({ minLength: 17, maxLength: 17 }),
						suggestedVin: t.Nullable(t.String({ minLength: 17, maxLength: 17 })),
						make: t.String(),
						model: t.String(),
						year: t.Number(),
						attributes: t.Nullable(t.Object({}, { additionalProperties: t.Union([t.String(), t.Number()]) })),
					}),
					detail: {
						tags: ['Search'],
					},
				}
			)
		);

	return app;
};
