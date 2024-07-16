import { ServiceError } from 'src/domain/errors/service.error';

export class VehicleSearchByVinError extends ServiceError {
	static readonly code = 'err.domain.vehicle-search.vin';

	constructor(message: string, data?: Record<string, unknown>, innerError?: unknown) {
		super(VehicleSearchByVinError.code, message, data, innerError);
	}
}
