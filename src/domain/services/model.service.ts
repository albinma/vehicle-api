import { camelCase } from 'lodash';
import { ILookupRepository } from 'src/database/repositories/lookup.repository';
import { IModelRepository } from 'src/database/repositories/model.repository';
import { ResourceNotFoundError } from 'src/domain/errors/resource-not-found.error';
import { ServiceError } from 'src/domain/errors/service.error';
import { Lookup } from 'src/domain/types/common';
import { toLookup } from 'src/domain/utils/maps';
import { stripHtml } from 'string-strip-html';

export type ModelAttribute = {
	code: string;
	name: string;
	description: string;
	values: {
		id: number | null;
		value: string | number;
		vinSchemaIds: number[];
	}[];
};

export interface IModelService {
	getModelsByMakeYear(makeId: number, year: number): Promise<Lookup[]>;
	getModelAttributesByIdAndYear(id: number, year: number): Promise<ModelAttribute[]>;
}

export class ModelService implements IModelService {
	constructor(
		readonly modelRepository: IModelRepository,
		readonly lookupRepository: ILookupRepository
	) {}

	async getModelAttributesByIdAndYear(modelId: number, year: number): Promise<ModelAttribute[]> {
		const model = this.modelRepository.getModel(modelId);

		if (!model) {
			throw new ResourceNotFoundError('Model', { modelId });
		}

		type Code = {
			Name: string;
			LookupTable: string | null;
			DataType: string;
			Description: string;
			Values: Map<string | number, Set<number>>;
		};

		const attributes = await this.modelRepository.getModelAttributesByModelIdYear(modelId, year);
		const attributesMap = attributes.reduce((acc, currentValue) => {
			const { Code, Name, Description, AttributeId, DataType, LookupTable, VinSchemaId } = currentValue;
			const code = acc.get(Code);

			if (!code) {
				acc.set(Code, {
					Name,
					Description,
					DataType,
					LookupTable,
					Values: new Map([[AttributeId, new Set([VinSchemaId])]]),
				});
			} else {
				const attribute = code.Values.get(AttributeId);

				if (!attribute) {
					code.Values.set(AttributeId, new Set([VinSchemaId]));
				} else {
					attribute.add(VinSchemaId);
				}
			}

			return acc;
		}, new Map<string, Code>());

		return await Array.fromAsync(attributesMap, async ([code, element]) => {
			const modelAttribute: ModelAttribute = {
				code: camelCase(code),
				name: element.Name,
				description: stripHtml(element.Description).result,
				values: await Array.fromAsync(element.Values, async ([key, vinSchemaIdSet]) => {
					let value: string | number;
					let id: number | null = null;

					if (element.DataType === 'int' || element.DataType === 'decimal') {
						value = Number(key);
					} else if (element.DataType === 'string') {
						value = key;
					} else if (element.DataType === 'lookup' && element.LookupTable) {
						id = Number(key);

						const lookup = await this.lookupRepository.getLookup(id, element.LookupTable);

						if (lookup) {
							value = lookup.Name;
						} else {
							value = '';
						}
					} else {
						value = '';
					}

					if (!value) {
						throw new ServiceError(`Failed to get value for element ${code}`, { element });
					}

					return {
						id,
						value,
						vinSchemaIds: Array.from(vinSchemaIdSet),
					};
				}),
			};

			return modelAttribute;
		});
	}

	async getModelsByMakeYear(makeId: number, year: number): Promise<Lookup[]> {
		const models = await this.modelRepository.getModelsByMakeYear(makeId, year);

		return models.map(toLookup);
	}
}
