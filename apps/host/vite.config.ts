import { defineConfig } from "vite";
import customConfig from "vite-config";

// https://vitejs.dev/config/
export default defineConfig({
	...customConfig,
	server: {
		port: 3000,
		watch: {
			usePolling: true,
		},
	},
});
