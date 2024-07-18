import { IVinRepository, VehicleElements } from 'src/database/repositories/vin.repository';
import { camelCase, capitalize } from 'lodash';
import { SearchByVinError } from 'src/domain/errors/search-by-vin.error';

export type SearchByVinResult = {
	vin: string;
	suggestedVIN: string | null;
	makeId: number;
	make: string;
	modelId: number;
	model: string;
	year: number;
	attributes: {
		[element: string]: string | number;
	};
};

export interface IVinService {
	searchByVin(vin: string): Promise<SearchByVinResult>;
}

export class VinService implements IVinService {
	constructor(readonly vinRepository: IVinRepository) {}

	async searchByVin(vin: string): Promise<SearchByVinResult> {
		const vehicleElements = await this.vinRepository.searchByVin(vin);
		const excludeElements: (keyof VehicleElements)[] = [
			'Make',
			'MakeId',
			'Model',
			'ModelId',
			'ModelYear',
			'ErrorCode',
			'SuggestedVIN',
			'ErrorText',
			'ErrorCodeId',
			'PossibleValues',
			'AdditionalErrorText',
		];

		if (
			vehicleElements.Make &&
			vehicleElements.MakeId &&
			vehicleElements.Model &&
			vehicleElements.ModelId &&
			vehicleElements.ModelYear
		) {
			if (vehicleElements.ErrorCode === '0' || vehicleElements.SuggestedVIN) {
				const elements = Object.fromEntries(
					Object.keys(vehicleElements)
						.map((key) => key as keyof VehicleElements)
						.filter((key) => !excludeElements.includes(key))
						.map((code) => [
							camelCase(code),
							typeof vehicleElements[code] === 'string'
								? (vehicleElements[code] as string)
								: Number(vehicleElements[code]),
						])
				);

				return {
					vin,
					suggestedVIN: vehicleElements.SuggestedVIN ? vehicleElements.SuggestedVIN : null,
					makeId: vehicleElements.MakeId,
					make: capitalize(vehicleElements.Make.toLowerCase()),
					modelId: vehicleElements.ModelId,
					model: vehicleElements.Model,
					year: Number(vehicleElements.ModelYear),
					attributes: elements,
				};
			} else {
				throw new SearchByVinError('Failed to decode VIN', {
					vin,
				});
			}
		} else {
			const errorText = vehicleElements.ErrorText ? vehicleElements.ErrorText.split('-')[1].trim() : null;
			const errorCode = vehicleElements.ErrorCode;

			throw new SearchByVinError('Failed to decode VIN', {
				vin,
				errorText,
				errorCode,
			});
		}
	}
}
