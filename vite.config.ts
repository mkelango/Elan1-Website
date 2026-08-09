import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// elan1.ai — dev server on 5183 (sibling sites occupy 5174–5181).
// Honor the port the preview harness injects (PORT env, set when autoPort
// picks a free port for a second concurrent session); fall back to 5183 standalone.
export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env.PORT) || 5183,
    // 🚨 strictPort MUST stay true — see the twin comment in elan1-platform/web/enterprise1/vite.config.ts.
    // The marketing site (5183) and the platform console (5189) are two different Vite apps that both
    // answer to the name "elan1". When either is allowed to drift off its port they land in each other's
    // band and you cannot tell from a browser tab which one you are looking at. Every port in
    // .claude/launch.json is now `autoPort: false`; this makes the SERVER refuse too, so a collision
    // fails loudly at startup instead of producing a second, plausible-looking elan1 on a random port.
    strictPort: true,
  },
});
