import { SelectableLookup } from 'src/database/types/common';
import { VPICKnexDatabase } from 'src/initializers/database';

export interface IMakeRepository {
	getAllMakes(): Promise<SelectableLookup[]>;
	getMakesByYear(year: number): Promise<SelectableLookup[]>;
}

export class MakeRepository implements IMakeRepository {
	constructor(readonly db: VPICKnexDatabase) {}

	async getAllMakes(): Promise<SelectableLookup[]> {
		return await this.db.from('Make').select<SelectableLookup[]>('*').orderBy('Name');
	}

	async getMakesByYear(year: number): Promise<SelectableLookup[]> {
		return await this.db
			.from('Wmi_Make as wm')
			.join('Wmi_VinSchema as wv', 'wv.WmiId', 'wm.WmiId')
			.join('Make as m', 'm.Id', 'wm.MakeId')
			.where(this.db.raw('? between wv.YearFrom and isnull(wv.YearTo, 2999)', year))
			.distinct<SelectableLookup[]>('m.Id', 'm.Name')
			.orderBy('Name');
	}
}
