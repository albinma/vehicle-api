import { SelectableLookup } from 'src/database/types/common';
import { VPICKnexDatabase } from 'src/initializers/database';

export interface ILookupRepository {
	getLookup(id: number, table: string): Promise<SelectableLookup | undefined>;
}

export class LookupRepository implements ILookupRepository {
	constructor(readonly db: VPICKnexDatabase) {}

	async getLookup(id: number, table: string): Promise<SelectableLookup | undefined> {
		return await this.db.from(table).select<SelectableLookup[]>('*').where('Id', id).first();
	}
}
