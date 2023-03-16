const colors = require("tailwindcss/colors");

module.exports = {
	prefix: "tw-",
	content: [
		// app content
		"./index.htlm",
		"./src/**/*.{js, ts, jsx, vue}",
		// include packages if not transpiling
		"../../packages/**/*.{js, ts, jsx, vue}",
	],
	theme: {
		extend: {
			colors: {
				brandblue: colors.blue[500],
				brandred: colors.red[500],
			},
		},
	},
};
