import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // allows "@/components/..." imports
    },
  },
  server: {
    port: 3000, // local dev server
    open: true, // auto-open in browser (optional)
  },
  build: {
    outDir: "dist", // Vercel expects this folder
    emptyOutDir: true, // clean before build
  },
  preview: {
    port: 5000, // for `vite preview` after build
  },
});
