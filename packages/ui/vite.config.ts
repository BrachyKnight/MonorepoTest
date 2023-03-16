import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
	build: {
		cssCodeSplit: true,
		lib: {
			// Could also be a dictionary or array of multiple entry points
			entry: resolve(__dirname, "src/index.ts"),
			formats: ["es", "cjs"],
			name: "ui",
			// the proper extensions will be added
			fileName: (format) => `ui.${format}.js`,
		},
		rollupOptions: {
			// make sure to externalize deps that shouldn't be bundled
			// into your library
			external: ["vue"],
			output: {
				preserveModules: true,
				exports: "named",
				// Provide global variables to use in the UMD build
				// for externalized deps
				globals: {
					vue: "Vue",
				},
			},
		},
	},
	plugins: [vue()],
	server: {
		watch: {
			usePolling: true,
		},
	},
});
