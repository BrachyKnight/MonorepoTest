const vue = require("@vitejs/plugin-vue");
const AutoImport = require("unplugin-auto-import/vite");
const Components = require("unplugin-vue-components/vite");
// const Pages = require("vite-plugin-pages");
const { VuetifyResolver } = require("unplugin-vue-components/resolvers");
const path = require("node:path");

module.exports = {
	plugins: [
		vue(),
		AutoImport({
			/* options */
			include: [
				/\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
				/\.vue$/,
				/\.vue\?vue/, // .vue
				/\.md$/, // .md
			],
			imports: [
				// presets
				"vue",
				"vue-router",
				// custom
				{
					axios: [
						// default imports
						["default", "axios"], // import { default as axios } from 'axios',
					],
				},
			],
			dts: "./auto-imports.d.ts",
			dirs: [
				// custom dirs
				"src/composables/**",
			],
			vueTemplate: true,
			// Add Resolvers to use with `unplugin-vue-components`
			resolvers: [
				/* ... */
			],
			// Generate corresponding .eslintrc-auto-import.json file.
			// eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
			eslintrc: {
				enabled: true, // Default `false`
				filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
				globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
			},
		}),
		Components({
			resolvers: [VuetifyResolver()],
			// relative paths to the directory to search for components.
			dirs: ["src/components"],
			// search for subdirectories
			deep: true,
			// valid file extensions for components.
			extensions: ["vue"],
			// auto import for directives
			directives: true,
			// filters for transforming targets
			include: [/\.vue$/, /\.vue\?vue/],
			exclude: [
				/[\\/]node_modules[\\/]/,
				/[\\/]\.git[\\/]/,
				/[\\/]\.nuxt[\\/]/,
			],
			types: [
				{
					from: "vue-router",
					names: ["RouterLink", "RouterView"],
				},
			],
		}),
		// Pages({
		// 	dirs: "src/pages",
		// 	extensions: ["vue"],
		// }),
	],
	resolve: {
		alias: {
			// "@": fileURLToPath(new URL("./src", import.meta.url)),
			"@": path.resolve(process.cwd(), "src"),
		},
	},
};
