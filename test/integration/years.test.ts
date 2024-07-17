import { beforeAll, describe, expect, it } from 'bun:test';
import { App } from 'src';
import { createApp } from 'src/setup';

const baseUrl = 'http://localhost/api/v1';

describe('GET /years', () => {
	let app: App;
	const resourceUrl = `${baseUrl}/years`;

	beforeAll(() => {
		app = createApp();
	});

	it('should respond with 200 Ok - years found', async () => {
		// Arrange
		const request = new Request(resourceUrl);
		const minYear = 1980;
		const maxYear = new Date().getFullYear();
		const numYears = maxYear - minYear + 2;
		const expectedYears = [...Array(numYears).keys()].map((i) => i + minYear);

		// Act
		const response = await app.handle(request);

		// Assert
		expect(response.status).toBe(200);
		const body = await response.json();
		expect(body).toMatchObject(expectedYears);
	});
});
