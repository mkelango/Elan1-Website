import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// elan1.in — dev server on 5183 (sibling sites occupy 5174–5181).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5183,
    strictPort: false,
  },
});
