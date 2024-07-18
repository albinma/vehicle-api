import { Static, t } from 'elysia';

export const SearchByVinResultSchema = t.Object({
	vin: t.String({ minLength: 17, maxLength: 17 }),
	suggestedVIN: t.Nullable(t.String({ minLength: 17, maxLength: 17 })),
	makeId: t.Number(),
	make: t.String(),
	modelId: t.Number(),
	model: t.String(),
	year: t.Number(),
	attributes: t.Nullable(t.Record(t.String(), t.Union([t.String(), t.Number()]))),
});

export type SearchByVinResult = Static<typeof SearchByVinResultSchema>;
