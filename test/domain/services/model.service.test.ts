import { describe, expect, it, mock } from 'bun:test';
import { ILookupRepository } from 'src/database/repositories/lookup.repository';
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

			const modelRepositoryMock: IModelRepository = {
				getModelsByMakeYear,
				getModel: () => Promise.resolve(undefined),
				getModelAttributesByModelIdYear: () => Promise.resolve([]),
			};

			const lookupRepositoryMock: ILookupRepository = {
				getLookup: () => Promise.resolve(undefined),
			};

			const service = new ModelService(modelRepositoryMock, lookupRepositoryMock);

			// act
			const result = await service.getModelsByMakeYear(1, 2022);

			// assert
			expect(result).toMatchObject(expectedModels);
		});

		it('should return model attributes by id and year', async () => {
			// arrange
			const expectedAttributes = [
				{
					code: 'bodyCabType',
					name: 'Cab Type',
					description: 'description',
					values: [
						{
							id: 1,
							value: 'Regular',
							vinSchemaIds: [1, 2],
						},
					],
				},
				{
					code: 'bodyClass',
					name: 'Body Class',
					description: 'description',
					values: [
						{
							id: null,
							value: 'Pickup',
							vinSchemaIds: [1],
						},
					],
				},
				{
					code: 'displacementL',
					name: 'Displacement (L)',
					description: 'description',
					values: [
						{
							id: null,
							value: 2.4,
							vinSchemaIds: [1],
						},
					],
				},
			];

			const getModelAttributesByModelIdYear = mock(() =>
				Promise.resolve([
					{
						Code: 'bodyCabType',
						Name: 'Cab Type',
						Description: 'description',
						AttributeId: 1,
						DataType: 'lookup',
						LookupTable: 'BodyCabType',
						VinSchemaId: 1,
					},
					{
						Code: 'bodyCabType',
						Name: 'Cab Type',
						Description: 'description',
						AttributeId: 1,
						DataType: 'lookup',
						LookupTable: 'BodyCabType',
						VinSchemaId: 2,
					},
					{
						Code: 'bodyClass',
						Name: 'Body Class',
						Description: 'description',
						AttributeId: 'Pickup',
						DataType: 'string',
						LookupTable: null,
						VinSchemaId: 1,
					},
					{
						Code: 'displacementL',
						Name: 'Displacement (L)',
						Description: 'description',
						AttributeId: 2.4,
						DataType: 'decimal',
						LookupTable: null,
						VinSchemaId: 1,
					},
				])
			);

			const getLookup = mock(() =>
				Promise.resolve({
					Id: 1,
					Name: 'Regular',
				})
			);

			const modelRepositoryMock: IModelRepository = {
				getModelAttributesByModelIdYear,
				getModelsByMakeYear: () => Promise.resolve([]),
				getModel: () => Promise.resolve(undefined),
			};

			const lookupRepositoryMock: ILookupRepository = {
				getLookup,
			};

			const service = new ModelService(modelRepositoryMock, lookupRepositoryMock);

			// act
			const result = await service.getModelAttributesByIdAndYear(1, 2022);

			// assert
			expect(result).toMatchObject(expectedAttributes);
		});
	});
});
