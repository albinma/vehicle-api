import { describe, expect, it, mock } from 'bun:test';
import { ISearchRepository, VehicleElements } from 'src/database/repositories/search.repository';
import { SearchService, VehicleSearchResult } from 'src/domain/services/search.service';

describe(SearchService.name, () => {
	describe(SearchService.prototype.searchByVin.name, () => {
		it('should return a vehicle search result', async () => {
			// arrange
			const vin = '5TEWN72N82Z891171';
			const expectedResult: VehicleSearchResult = {
				vin,
				suggestedVIN: null,
				makeId: 1,
				make: 'Toyota',
				modelId: 1,
				model: 'Tacoma',
				year: 2002,
				attributes: {
					engineModel: '5VZ-FE',
				},
			};

			const searchByVin = mock(() =>
				Promise.resolve<VehicleElements>({
					SuggestedVIN: '',
					ErrorCode: '0',
					MakeId: expectedResult.makeId,
					Make: expectedResult.make,
					ModelId: expectedResult.modelId,
					Model: expectedResult.model,
					ModelYear: expectedResult.year,
					EngineModel: '5VZ-FE',
				})
			);

			const searchRepositoryMock: ISearchRepository = {
				searchByVin,
				getAllYears: mock(),
			};

			const service = new SearchService(searchRepositoryMock);

			// act
			const result = await service.searchByVin(vin);

			// assert
			expect(result).toMatchObject(expectedResult);
		});
	});
});
