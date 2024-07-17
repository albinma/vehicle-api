import { Selectable } from 'kysely';
import { Make as MakeTable } from 'src/database/db';
import { SelectableLookup } from 'src/database/types/common';
import { VPICKnexDatabase } from 'src/initializers/database';

export type MakeModel = Selectable<MakeTable> & SelectableLookup;

export interface IMakeRepository {
	getAllMakes(): Promise<MakeModel[]>;
	getMakesByYear(year: number): Promise<MakeModel[]>;
}

export class MakeRepository implements IMakeRepository {
	constructor(readonly db: VPICKnexDatabase) {}

	async getAllMakes(): Promise<MakeModel[]> {
		return await this.db.from('Make').select<MakeModel[]>('*').orderBy('Name');
	}

	async getMakesByYear(year: number): Promise<MakeModel[]> {
		return await this.db
			.from('Wmi_Make as wm')
			.join('Wmi_VinSchema as wv', 'wv.WmiId', 'wm.WmiId')
			.join('Make as m', 'm.Id', 'wm.MakeId')
			.where(this.db.raw('? between wv.YearFrom and wv.YearTo', year))
			.distinct('m.Id', 'm.Name')
			.orderBy('Name');
	}
}
