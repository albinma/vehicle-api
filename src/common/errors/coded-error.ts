export abstract class CodedError extends Error {
	constructor(
		message: string,
		readonly data?: Record<string, unknown>,
		readonly innerError?: unknown
	) {
		super(message);
		this.data = data;
		this.innerError = innerError;
	}
}
