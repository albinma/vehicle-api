import cors from '@elysiajs/cors';
import swagger from '@elysiajs/swagger';
import Elysia, { t } from 'elysia';
import { helmet } from 'elysia-helmet';
import { CUSTOM_HEADERS } from 'src/constants/headers';
import { MakeRepository } from 'src/database/repositories/make.repository';
import { VinRepository } from 'src/database/repositories/vin.repository';
import { YearRepository } from 'src/database/repositories/year.repository';
import { SearchByVinError } from 'src/domain/errors/search-by-vin.error';
import { MakeService } from 'src/domain/services/make.service';
import { VinService } from 'src/domain/services/vin.service';
import { YearService } from 'src/domain/services/year.service';
import { knexDb } from 'src/initializers/database';
import { logger } from 'src/initializers/logger';
import { LookupsSchema } from 'src/schemas/common';

export const createApp = () => {
	const searchRepository = new VinRepository(knexDb);
	const searchService = new VinService(searchRepository);
	const yearRepository = new YearRepository(knexDb);
	const yearService = new YearService(yearRepository);
	const makeRepository = new MakeRepository(knexDb);
	const makeService = new MakeService(makeRepository);

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
		.error({
			SearchByVinError,
		})
		.onError(({ error, code, set }) => {
			logger.error(error);
			switch (code) {
				case 'SearchByVinError':
					set.status = 422;
					return {
						code,
						message: error.message,
						data: error.data,
					};
				case 'VALIDATION':
					set.status = 400;
					return error.toResponse();
			}
		})
		.get('/', () => ({}))
		.group('/api/v1', (api) =>
			api
				.get(
					'/vin/:vin',
					async ({ params: { vin } }) => {
						const result = await searchService.searchByVin(vin);
						return {
							...result,
						};
					},
					{
						params: t.Object({
							vin: t.String({ minLength: 17, maxLength: 17 }),
						}),
						response: t.Object({
							vin: t.String({ minLength: 17, maxLength: 17 }),
							suggestedVIN: t.Nullable(t.String({ minLength: 17, maxLength: 17 })),
							makeId: t.Number(),
							make: t.String(),
							modelId: t.Number(),
							model: t.String(),
							year: t.Number(),
							attributes: t.Nullable(t.Object({}, { additionalProperties: t.Union([t.String(), t.Number()]) })),
						}),
						detail: {
							tags: ['Search'],
						},
					}
				)
				.get(
					'/years',
					async () => {
						const years = await yearService.getAllYears();
						return years;
					},
					{
						response: t.Array(t.Number()),
						detail: {
							tags: ['Search'],
						},
					}
				)
				.group('/makes', (makesApi) =>
					makesApi
						.get(
							'/',
							async () => {
								const makes = await makeService.getAllMakes();

								return makes;
							},
							{
								response: LookupsSchema,
							}
						)
						.get(
							'/by-year/:year',
							async ({ params: { year } }) => {
								const makes = await makeService.getMakesByYear(year);

								return makes;
							},
							{
								params: t.Object({
									year: t
										.Transform(t.String({ minimum: 0 }))
										.Decode((year) => Number(year))
										.Encode((year) => year.toString()),
								}),
								response: LookupsSchema,
							}
						)
				)
		);

	return app;
};
