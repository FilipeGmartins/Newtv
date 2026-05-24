// @ts-check
import { defineConfig, envField } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  vite: {
    plugins: [tailwindcss()],
  },
  redirects: {
    "/": "/channels",
  },
  prefetch: {
    defaultStrategy: "tap",
    prefetchAll: true,
  },
  env: {
    schema: {
      EVENTS_API_URL: envField.string({ context: "server", access: "public" }),
    },
  },
});
