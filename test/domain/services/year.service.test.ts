import { describe, expect, it, mock } from 'bun:test';
import { YearService } from 'src/domain/services/year.service';

describe(YearService.name, () => {
	describe(YearService.prototype.getAllYears.name, () => {
		it('should return all years', async () => {
			// arrange
			const expectedYears = [1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003];
			const getAllYears = mock(() => Promise.resolve(expectedYears));
			const yearRepositoryMock = { getAllYears };
			const service = new YearService(yearRepositoryMock);

			// act
			const result = await service.getAllYears();

			// assert
			expect(result).toMatchObject(expectedYears);
		});
	});
});
