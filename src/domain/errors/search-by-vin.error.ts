import { ServiceError } from 'src/domain/errors/service.error';

export class SearchByVinError extends ServiceError {
	constructor(message: string, data?: Record<string, unknown>, innerError?: unknown) {
		super(message, data, innerError);
	}
}
