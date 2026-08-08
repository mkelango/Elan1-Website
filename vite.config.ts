import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// elan1.ai — dev server on 5183 (sibling sites occupy 5174–5181).
// Honor the port the preview harness injects (PORT env, set when autoPort
// picks a free port for a second concurrent session); fall back to 5183 standalone.
export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env.PORT) || 5183,
    strictPort: false,
  },
});
