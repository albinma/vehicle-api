import cors from '@elysiajs/cors';
import Elysia from 'elysia';
import { helmet } from 'elysia-helmet';
import { CUSTOM_HEADERS } from 'src/constants/headers';

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
		.get('/', () => 'Hello Elysia');

	return app;
};
