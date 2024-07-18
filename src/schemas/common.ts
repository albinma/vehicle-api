import { t } from 'elysia';

export const LookupSchema = t.Object({
	id: t.Number({ minimum: 1 }),
	name: t.String({ minLength: 1 }),
});

export const LookupsSchema = t.Array(LookupSchema);

export const StringAsNumberSchema = t
	.Transform(t.String())
	.Decode((value) => Number(value))
	.Encode((value) => String(value));
