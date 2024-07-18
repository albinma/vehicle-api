import { describe, expect, it, mock } from 'bun:test';
import { IModelRepository } from 'src/database/repositories/model.repository';
import { SelectableLookup } from 'src/database/types/common';
import { ModelService } from 'src/domain/services/model.service';

describe(ModelService.name, () => {
	describe(ModelService.prototype.getModelsByMakeYear.name, () => {
		it('should return models by make and year', async () => {
			// arrange
			const expectedModels = [
				{
					id: 1,
					name: 'Corolla',
				},
				{
					id: 2,
					name: 'Camry',
				},
			];

			const getModelsByMakeYear = mock(() =>
				Promise.resolve<SelectableLookup[]>([
					{
						Id: 1,
						Name: 'Corolla',
					},
					{
						Id: 2,
						Name: 'Camry',
					},
				])
			);

			const modelRepositoryMock: IModelRepository = { getModelsByMakeYear };
			const service = new ModelService(modelRepositoryMock);

			// act
			const result = await service.getModelsByMakeYear(1, 2022);

			// assert
			expect(result).toMatchObject(expectedModels);
		});
	});
});
