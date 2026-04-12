import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        favorite: resolve(__dirname, "src/favorite.html"),
        details: resolve(__dirname, "src/details.html"),
        search: resolve(__dirname, "src/search.html"),
      },
    },
  },
});