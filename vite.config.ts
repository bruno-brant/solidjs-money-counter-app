import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import suidPlugin from "@suid/vite-plugin";
import eslint from "vite-plugin-eslint";
import { imagetools } from "vite-imagetools";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
	plugins: [
		suidPlugin(),
		solidPlugin(),
		eslint({ cache: true }),
		imagetools(),
		VitePWA({
			strategies: "generateSW",
			registerType: "autoUpdate",
			injectRegister: "auto",
			workbox: {
				globPatterns: ["**/*.{js,css,html,ico,png,svg}"]
			},
			manifest: {
				name: "Moedeiro: conte suas moedas!",
				short_name: "Moedeiro",
				description: "Conte suas moedas!",
				theme_color: "#000000",
				background_color: "#ffffff",
				display: "standalone",
				icons: [
					{
						src: "./android-chrome-192x192.png",
						sizes: "192x192",
						type: "image/png"
					},
					{
						src: "./android-chrome-512x512.png",
						sizes: "512x512",
						type: "image/png"
					}
				],
			},
			manifestFilename: "manifest.json",

		
			
		})
	],
	server: {
		port: 3000,
	},
	build: {
		target: "esnext",
	},
	publicDir: "public",
});
