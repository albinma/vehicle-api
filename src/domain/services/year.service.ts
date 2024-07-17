import { IYearRepository } from 'src/database/repositories/year.repository';

export interface IYearService {
	getAllYears(): Promise<number[]>;
}

export class YearService implements IYearService {
	constructor(readonly yearRepository: IYearRepository) {}

	getAllYears(): Promise<number[]> {
		return this.yearRepository.getAllYears();
	}
}
