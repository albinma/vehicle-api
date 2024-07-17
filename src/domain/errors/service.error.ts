import { CodedError } from 'src/common/errors';

export abstract class ServiceError extends CodedError {
	constructor(message: string, data?: Record<string, unknown>, innerError?: unknown) {
		super(message, data, innerError);
	}
}
