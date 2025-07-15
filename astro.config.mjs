// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // integrations: [vue()],
  site: "https://uhurus.com",
  build: {
    assets: "assets"
  },

  vite: {
    plugins: [tailwindcss()]
  }
});