import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'

export default defineConfig({
  server: { port: 4443 },
  integrations: [tailwind(), mdx()]
})
