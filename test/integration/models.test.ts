import { beforeAll, describe, expect, it } from 'bun:test';
import { App } from 'src';
import { createApp } from 'src/setup';

const baseUrl = 'http://localhost/api/v1';

describe('GET /models', () => {
	let app: App;
	const resourceUrl = `${baseUrl}/models`;

	beforeAll(() => {
		app = createApp();
	});

	describe('GET /:id/:year/attributes', () => {
		it('should respond with 200 Ok - attributes for model and year', async () => {
			// Arrange
			const id = 2223; // Tacoma
			const year = 2002;
			const request = new Request(`${resourceUrl}/${id}/${year}/attributes`);

			// Act
			const response = await app.handle(request);

			// Assert
			expect(response.status).toBe(200);

			const body = await response.json();

			expect(body).toMatchSnapshot();
		});
	});
});
