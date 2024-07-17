import { SelectableLookup } from 'src/database/types/common';
import { Lookup } from 'src/domain/types/common';

export const toLookup = <T extends SelectableLookup>(lookup: T): Lookup => {
	return {
		id: Number(lookup.Id),
		name: lookup.Name,
	};
};
