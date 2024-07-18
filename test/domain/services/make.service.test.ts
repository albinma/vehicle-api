import { describe, expect, it, mock } from 'bun:test';
import { IMakeRepository } from 'src/database/repositories/make.repository';
import { SelectableLookup } from 'src/database/types/common';
import { MakeService } from 'src/domain/services/make.service';
import { Lookup } from 'src/domain/types/common';

describe(MakeService.name, () => {
	describe(MakeService.prototype.getAllMakes.name, () => {
		it('should return all makes', async () => {
			// arrange
			const expectedMakes: Lookup[] = [
				{
					id: 1,
					name: 'Toyota',
				},
				{
					id: 2,
					name: 'Lexus',
				},
			];

			const getAllMakes = mock(() =>
				Promise.resolve<SelectableLookup[]>([
					{
						Id: 1,
						Name: 'Toyota',
					},
					{
						Id: 2,
						Name: 'Lexus',
					},
				])
			);

			const makeRepositoryMock: IMakeRepository = { getAllMakes, getMakesByYear: () => Promise.resolve([]) };
			const service = new MakeService(makeRepositoryMock);

			// act
			const result = await service.getAllMakes();

			// assert
			expect(result).toMatchObject(expectedMakes);
		});

		it('should return makes by year', async () => {
			// arrange
			const expectedMakes: Lookup[] = [
				{
					id: 1,
					name: 'Toyota',
				},
				{
					id: 2,
					name: 'Lexus',
				},
			];

			const getMakesByYear = mock(() =>
				Promise.resolve<SelectableLookup[]>([
					{
						Id: 1,
						Name: 'Toyota',
					},
					{
						Id: 2,
						Name: 'Lexus',
					},
				])
			);

			const makeRepositoryMock: IMakeRepository = { getAllMakes: () => Promise.resolve([]), getMakesByYear };
			const service = new MakeService(makeRepositoryMock);

			// act
			const result = await service.getMakesByYear(2002);

			// assert
			expect(result).toMatchObject(expectedMakes);
		});
	});
});
