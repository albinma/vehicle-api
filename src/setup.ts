import cors from '@elysiajs/cors';
import Elysia from 'elysia';
import { helmet } from 'elysia-helmet';

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
		.get('/', () => 'Hello Elysia');

	return app;
};
