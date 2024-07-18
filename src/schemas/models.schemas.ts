import { t } from 'elysia';

export const ModelAttributesSchema = t.Array(
	t.Object({
		code: t.String(),
		name: t.String(),
		description: t.String(),
		values: t.Array(
			t.Object({
				id: t.Nullable(t.Number()),
				value: t.Union([t.String(), t.Number()]),
				vinSchemaIds: t.Array(t.Number()),
			})
		),
	})
);
