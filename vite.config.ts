// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: "./tsconfig.app.json",
      include: ["src/index.ts"],
      exclude: [
        "src/main.ts",
        "src/App.vue",
        "src/components/M3RippleDemo.vue",
      ],
    }),
  ],
  build: {
    cssCodeSplit: false,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "M3RippleVue",
      fileName: "m3ripple-vue",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
        exports: "named",
        assetFileNames: (assetInfo) => {
          if (assetInfo.names[0] === "style.css") return "m3ripple-vue.css";
          return assetInfo.names[0] || "assets/[name].[ext]";
        },
      },
    },
    copyPublicDir: false,
  },
});
