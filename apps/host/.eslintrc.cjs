require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
	extends: ["custom"],
	overrides: [
		{
			files: ["cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}"],
			extends: ["plugin:cypress/recommended"],
		},
	],
};
