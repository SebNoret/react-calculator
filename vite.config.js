import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
import html from "vite-plugin-html";

const isProduction = process.env.NODE_ENV === "production";
const localPortfolioUrl = "http://localhost:3000/calculatrice/demo/";
const prodPortfolioUrl =
  "https://sebnoret.github.io/portfolio/calculatrice/demo/";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  /**
   *
   *
   * Change the base url to the local portfolio url if you want to test the app locally
   */
  base: isProduction ? localPortfolioUrl : "/",
  legacy: {
    targets: ["defaults", "not IE 11"],
    additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
  },
  html: {
    minify: true,
  },
});
