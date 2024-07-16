import { CodedError } from 'src/common/errors';

export abstract class ServiceError extends CodedError {
	constructor(code: string, message: string, data?: Record<string, unknown>, innerError?: unknown) {
		super(code, message, data, innerError);
	}
}
