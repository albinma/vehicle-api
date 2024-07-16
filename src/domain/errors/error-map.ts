import { ErrorMap } from 'src/common/errors';
import { VehicleSearchByVinError } from 'src/domain/errors/vehicle-search-by-vin.error';

export const getDomainErrorMap = (): ErrorMap => {
	return {
		[VehicleSearchByVinError.code]: 422,
	};
};
