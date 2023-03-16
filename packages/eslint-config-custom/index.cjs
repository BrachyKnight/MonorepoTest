/* eslint-env node */
module.exports = {
	extends: [
		"turbo",
		"prettier",
		"plugin:vue/vue3-essential",
		"@vue/eslint-config-typescript",
		"eslint:recommended",
		"./.eslintrc-auto-import.json", // Needed for unplugin-auto-import
	],
	parserOptions: {
		ecmaVersion: 2022,
	},
	env: {
		node: true,
	},
	overrides: [
		{
			files: ["packages/*/src/**/*.vue", "apps/*/src/**/*.vue"],
			env: {
				node: false,
			},
		},
	],
};
