import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'

export default defineConfig({
  server: { port: 4443 },
  integrations: [tailwind()]
})
