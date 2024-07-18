import { SelectableLookup } from 'src/database/types/common';
import { VPICKnexDatabase } from 'src/initializers/database';

export type ModelModel = {
	id: number;
	name: string;
	attributes?: Record<string, ElementModel>;
};

export type ElementModel = {
	type: string;
	lookup: string;
	values: { value: string | number; vinSchemaIds: number[] }[];
};

export interface IModelRepository {
	getModelsByMakeYear(makeId: number, year: number): Promise<SelectableLookup[]>;
}

const ModelElementId = 28;

export class ModelRepository implements IModelRepository {
	constructor(readonly db: VPICKnexDatabase) {}

	async getModelsByMakeYear(makeId: number, year: number): Promise<SelectableLookup[]> {
		return await this.db
			.from('Pattern as p')
			.join('Element as e', 'e.Id', 'p.ElementId')
			.join('Wmi_VinSchema as wvs', 'wvs.VinSchemaId', 'p.VinSchemaId')
			.join('Wmi_Make as wm', 'wm.WmiId', 'wvs.WmiId')
			.join('Model as m', 'm.Id', 'p.AttributeId')
			.where('wm.MakeId', makeId)
			.andWhereRaw('? between wvs.YearFrom and isnull(wvs.YearTo, 2999)', year)
			.andWhere('e.Id', ModelElementId)
			.distinct<SelectableLookup[]>('m.Id', 'm.Name')
			.orderBy('m.Name');
	}
}
