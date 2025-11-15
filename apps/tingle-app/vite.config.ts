import path from "node:path";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@tingle/ui": path.resolve(__dirname, "../../packages/ui/index.ts"),
      "@tingle/api": path.resolve(__dirname, "../../packages/api/index.ts"),
    },
  },
  plugins: [
    react(),
    tanstackRouter(),
    VitePWA({
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.ts",
      registerType: "autoUpdate",
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },
      manifest: {
        name: "tingle",
        short_name: "tingle",
        description:
          "Tingle - A matching platform based on university student verification",
        theme_color: "#ffffff",
      },
      injectManifest: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
      },
      devOptions: {
        enabled: true,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
    vanillaExtractPlugin({ identifiers: "debug" }),
  ],
});
