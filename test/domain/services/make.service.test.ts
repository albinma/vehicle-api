import { describe, expect, it, mock } from 'bun:test';
import { IMakeRepository, MakeModel } from 'src/database/repositories/make.repository';
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
				Promise.resolve<MakeModel[]>([
					{
						Id: 1,
						Name: 'Toyota',
						CreatedOn: new Date(),
						UpdatedOn: new Date(),
					},
					{
						Id: 2,
						Name: 'Lexus',
						CreatedOn: new Date(),
						UpdatedOn: new Date(),
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
	});
});
