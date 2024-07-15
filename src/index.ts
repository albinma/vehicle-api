import cors from '@elysiajs/cors';
import { Elysia } from 'elysia';
import { helmet } from 'elysia-helmet';

const app = new Elysia()
	.use(cors())
	.use(
		helmet({
			// This is a backend api only - no need for CSP
			contentSecurityPolicy: false,
		})
	)
	.get('/', () => 'Hello Elysia')
	.listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
