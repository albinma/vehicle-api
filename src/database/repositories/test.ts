import { camelCase } from 'lodash';
import { knexDb } from 'src/initializers/database';

const makeId = 448;
const year = 2002;

type QueryResult = {
	ModelId: number;
	Model: string;
	Code: string;
	AttributeId: string | number;
	LookupTable: string;
	DataType: string;
	VinSchemaId: number;
};

const distinctModels = knexDb
	.from('Pattern as p')
	.join('Element as e', 'e.Id', 'p.ElementId')
	.join('Wmi_VinSchema as wvs', 'wvs.VinSchemaId', 'p.VinSchemaId')
	.join('Wmi_Make as wm', 'wm.WmiId', 'wvs.WmiId')
	.where('wm.MakeId', makeId) // Toyota
	.andWhereRaw('? between wvs.YearFrom and isnull(wvs.YearTo, 2999)', year)
	.andWhere('e.Id', 28) // Model
	.distinct('p.Id', 'p.AttributeId as ModelId', 'p.VinSchemaId');

const query = await knexDb
	.from(distinctModels.as('models'))
	.join('Pattern as p', 'p.VinSchemaId', 'models.VinSchemaId')
	.join('Element as e', 'e.Id', 'p.ElementId')
	.join('Model as m', 'm.Id', 'models.ModelId')
	.orderBy('m.Name', 'e.Code')
	.select<
		QueryResult[]
	>('m.Id as ModelId', 'm.Name as Model', 'e.Code', 'p.AttributeId', 'e.LookupTable', 'e.DataType', 'p.VinSchemaId');

type Code = {
	LookupTable: string;
	DataType: string;
	Attributes: Map<string | number, Set<number>>;
};

type Model = {
	Model: string;
	Codes: Map<string, Code>;
};

const resultv2 = query.reduce((acc: Map<number, Model>, currentValue: QueryResult) => {
	const { ModelId, Model, AttributeId, Code, DataType, LookupTable, VinSchemaId } = currentValue;
	const model = acc.get(ModelId);

	if (!model) {
		acc.set(ModelId, {
			Model,
			Codes: new Map([[Code, { DataType, LookupTable, Attributes: new Map([[AttributeId, new Set([VinSchemaId])]]) }]]),
		});
	} else {
		const code = model.Codes.get(Code);

		if (!code) {
			model.Codes.set(Code, { DataType, LookupTable, Attributes: new Map([[AttributeId, new Set([VinSchemaId])]]) });
		} else {
			const attribute = code.Attributes.get(AttributeId);

			if (!attribute) {
				code.Attributes.set(AttributeId, new Set([VinSchemaId]));
			} else {
				attribute.add(VinSchemaId);
			}
		}
	}

	return acc;
}, new Map<number, Model>());

const test = Array.from(resultv2, ([key, value]) => ({
	id: key,
	name: value.Model,
	attributes: Object.fromEntries(
		Array.from(value.Codes, ([code, value]) => [
			camelCase(code),
			{
				type: value.DataType,
				lookup: value.LookupTable,
				values: Array.from(value.Attributes, ([key, value]) => ({ value: key, vinSchemaIds: Array.from(value) })),
			},
		])
	),
}));

console.log(test.filter((item) => item.id === 2223)[0]);
