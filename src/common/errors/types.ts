export type SupportedHttpStatusCode = 400 | 401 | 403 | 404 | 422 | 500;

export type ErrorMap = {
	[code: string]: SupportedHttpStatusCode;
};
