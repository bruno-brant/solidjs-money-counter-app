import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import suidPlugin from "@suid/vite-plugin";
import eslint from "vite-plugin-eslint";
import { imagetools } from "vite-imagetools";

export default defineConfig({
	plugins: [
		suidPlugin(), 
		solidPlugin(), 
		eslint({ cache: true }),
		imagetools()
	],
	server: {
		port: 3000,
	},
	build: {
		target: "esnext",
	},
	publicDir: "public",
});
