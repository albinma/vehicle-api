import { Selectable } from 'kysely';
import { Model } from 'src/database/db';
import { SelectableLookup } from 'src/database/types/common';
import { VPICKnexDatabase } from 'src/initializers/database';

type AttributeQueryResult = {
	Code: string;
	Name: string;
	Description: string;
	AttributeId: string | number;
	LookupTable: string | null;
	DataType: string;
	VinSchemaId: number;
};

export interface IModelRepository {
	getModel(id: number): Promise<Selectable<Model> | undefined>;
	getModelAttributesByModelIdYear(id: number, year: number): Promise<AttributeQueryResult[]>;
	getModelsByMakeYear(makeId: number, year: number): Promise<SelectableLookup[]>;
}

const ModelElementId = 28;

export class ModelRepository implements IModelRepository {
	constructor(readonly db: VPICKnexDatabase) {}

	async getModel(id: number): Promise<Selectable<Model> | undefined> {
		return await this.db.from('Model').select<Selectable<Model>[]>('*').where('Id', id).first();
	}

	async getModelAttributesByModelIdYear(id: number, year: number): Promise<AttributeQueryResult[]> {
		const distinctModels = this.db
			.from('Pattern as p')
			.join('Element as e', 'e.Id', 'p.ElementId')
			.join('Wmi_VinSchema as wvs', 'wvs.VinSchemaId', 'p.VinSchemaId')
			.where('p.AttributeId', id)
			.andWhere('e.Id', ModelElementId)
			.andWhereRaw('? between wvs.YearFrom and isnull(wvs.YearTo, 2999)', year)
			.distinct('p.Id', 'p.AttributeId as ModelId', 'p.VinSchemaId');

		const query = await this.db
			.from(distinctModels.as('models'))
			.join('Pattern as p', 'p.VinSchemaId', 'models.VinSchemaId')
			.join('Element as e', 'e.Id', 'p.ElementId')
			.orderBy('e.Code', 'e.VinSchemaId')
			.select<
				AttributeQueryResult[]
			>('e.Code', 'e.Name', 'e.Description', 'p.AttributeId', 'e.LookupTable', 'e.DataType', 'p.VinSchemaId');

		return query;
	}

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
