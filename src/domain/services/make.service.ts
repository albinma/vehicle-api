import { IMakeRepository, MakeModel } from 'src/database/repositories/make.repository';
import { Lookup } from 'src/domain/types/common';
import { toLookup } from 'src/domain/utils/maps';

export interface IMakeService {
	getAllMakes(): Promise<Lookup[]>;
	getMakesByYear(year: number): Promise<Lookup[]>;
}

export class MakeService implements IMakeService {
	constructor(readonly makeRepository: IMakeRepository) {}

	async getAllMakes(): Promise<Lookup[]> {
		const makes = await this.makeRepository.getAllMakes();

		return makes.map(toLookup);
	}

	async getMakesByYear(year: number): Promise<Lookup[]> {
		const makes = await this.makeRepository.getMakesByYear(year);

		return makes.map(toLookup);
	}
}
