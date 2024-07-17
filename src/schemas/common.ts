import { t } from 'elysia';

export const LookupSchema = t.Object({
	id: t.Number({ minimum: 1 }),
	name: t.String({ minLength: 1 }),
});

export const LookupsSchema = t.Array(LookupSchema);
