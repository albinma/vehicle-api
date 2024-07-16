export abstract class CodedError extends Error {
	constructor(
		readonly code: string,
		message: string,
		readonly data?: Record<string, unknown>,
		readonly innerError?: unknown
	) {
		super(message);
		this.code;
		this.data = data;
		this.innerError = innerError;
	}
}
