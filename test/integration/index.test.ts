import { beforeAll, describe, expect, it } from 'bun:test';
import { App } from 'src';
import { CUSTOM_HEADERS } from 'src/constants/headers';
import { createApp } from 'src/setup';

describe('GET /', () => {
	let app: App;
	let request: Request;

	beforeAll(() => {
		app = createApp();
		request = new Request('http://localhost/');
	});

	it('should respond with 200 Ok', async () => {
		const { status } = await app.handle(request);
		expect(status).toBe(200);
	});

	it('should have request id', async () => {
		// act
		const { headers } = await app.handle(request);
		expect(headers.get(CUSTOM_HEADERS.RequestId)).not.toBeNil();
	});

	it('should have security headers', async () => {
		const { headers } = await app.handle(request);

		expect(headers).not.toBeNil();
		expect(headers.get('cross-origin-opener-policy')).toBe('same-origin');
		// TODO: This returns ?1 which seems like a bug.
		// expect(headers.get('cross-origin-resource-policy')).toBe('same-origin');
		expect(headers.get('referrer-policy')).toBe('no-referrer');
		expect(headers.get('x-content-type-options')).toBe('nosniff');
		expect(headers.get('x-dns-prefetch-control')).toBe('off');
		expect(headers.get('x-frame-options')).toBe('SAMEORIGIN');
		expect(headers.get('x-xss-protection')).toBe('0');
		expect(headers.get('x-download-options')).toBe('noopen');
		expect(headers.get('x-permitted-cross-domain-policies')).toBe('none');
		expect(headers.get('x-powered-by')).toBeNil();
	});

	it('should response with 404 Not Found', async () => {
		// Act
		const request404 = new Request('http://localhost/unknown-route');
		const { status } = await app.handle(request404);

		// Assert
		expect(status).toBe(404);
	});
});
