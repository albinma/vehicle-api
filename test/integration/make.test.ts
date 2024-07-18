import { beforeAll, describe, expect, it } from 'bun:test';
import { App } from 'src';
import { createApp } from 'src/setup';

const baseUrl = 'http://localhost/api/v1';

describe('GET /makes', () => {
	let app: App;
	const resourceUrl = `${baseUrl}/makes`;

	beforeAll(() => {
		app = createApp();
	});

	it('should respond with 200 Ok - all makes', async () => {
		// Arrange
		const request = new Request(resourceUrl);

		// Act
		const response = await app.handle(request);

		// Assert
		expect(response.status).toBe(200);

		const body = await response.json();
		expect(body).toMatchSnapshot();
	});

	describe('GET /makes/by-year/:year', () => {
		it('should respond with 200 Ok - all makes for year', async () => {
			// Arrange
			const year = 2002;
			const request = new Request(`${resourceUrl}/by-year/${year}`);

			// Act
			const response = await app.handle(request);

			// Assert
			expect(response.status).toBe(200);

			const body = await response.json();

			expect(body).toMatchSnapshot();
		});
	});
});
