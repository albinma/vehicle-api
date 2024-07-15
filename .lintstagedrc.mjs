const Configuration = {
	// Type check TypeScript files
	'**/*.(ts)': () => 'bun tsc --noEmit',

	// Lint & Prettify TS and JS files
	'**/*.(js|ts)': (filenames) => [
		`bun eslint ${filenames.join(' ')}`,
		`bun prettier --write ${filenames.join(' ')} --plugin-search-dir=.`,
	],

	// Prettify only Markdown and JSON files
	'**/*.(md|json)': (filenames) => `yarn prettier --write ${filenames.join(' ')} --plugin-search-dir=.`,
};

export default Configuration;
