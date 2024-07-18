import { CodedError } from 'src/common/errors';

export class ServiceError extends CodedError {
	constructor(message: string, data?: Record<string, unknown>, innerError?: unknown) {
		super(message, data, innerError);
	}
}
