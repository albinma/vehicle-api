import { t } from 'elysia';

export const Attributes = t.Array(t.Union([t.String(), t.Number(), t.Object({ id: t.Number(), name: t.String() })]));
export const GroupedAttribute = t.Record(t.String(), Attributes);

export const ModelByMakeYearSchema = t.Object({
	id: t.Number(),
	name: t.String(),
	makeId: t.Number(),
	make: t.String(),
	year: t.Number(),
	attributes: t.Nullable(GroupedAttribute),
});
