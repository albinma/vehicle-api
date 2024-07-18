import { CodedError } from 'src/common/errors';

export class ResourceNotFoundError extends CodedError {
	constructor(resource: string, data?: Record<string, unknown>, innerError?: unknown) {
		super(`Resource ${resource} not found`, data, innerError);
	}
}
