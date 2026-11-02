import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react({ include: /\.[jt]sx?$/ })],
  base: "/",
  server: { port: 3017 },
  build: { outDir: "build" },
  test: {
    environment: "node",
    include: ["src/**/*.test.js"],
  },
});

