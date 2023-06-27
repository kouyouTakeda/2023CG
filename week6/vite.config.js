import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "./src",
  build: {
    publicDir: "public",
    outDir: resolve(__dirname, "./dist"),
    rollupOptions: {
      input: {
        index: resolve(__dirname, "./src/index.html"),
        week6: resolve(__dirname, "./src/week6/index.html"),
        week9: resolve(__dirname, "./src/week9/index.html"),
      },
    },
  },
});
