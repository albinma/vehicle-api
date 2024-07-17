import { knexDb, VPICKnexDatabase } from 'src/initializers/database';

export interface IYearRepository {
	getAllYears(): Promise<number[]>;
}

export class YearRepository implements IYearRepository {
	constructor(readonly db: VPICKnexDatabase) {}

	async getAllYears(): Promise<number[]> {
		const data = await knexDb.from('WMIYearValidChars').distinct<{ year: number }[]>('year');

		return data.map((d) => d.year);
	}
}
