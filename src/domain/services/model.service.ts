import { IModelRepository } from 'src/database/repositories/model.repository';
import { Lookup } from 'src/domain/types/common';
import { toLookup } from 'src/domain/utils/maps';

export interface IModelService {
	getModelsByMakeYear(makeId: number, year: number): Promise<Lookup[]>;
}

export class ModelService implements IModelService {
	constructor(readonly modelRepository: IModelRepository) {}

	async getModelsByMakeYear(makeId: number, year: number): Promise<Lookup[]> {
		const models = await this.modelRepository.getModelsByMakeYear(makeId, year);

		return models.map(toLookup);
	}
}
