import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tsChecker from "vite-plugin-checker";

export default defineConfig({
  plugins: [react(), tsChecker({ typescript: true })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
