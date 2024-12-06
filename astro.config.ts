import { defineConfig } from 'astro/config'
import tailwind from '@tailwindcss/vite'
import mdx from '@astrojs/mdx'

export default defineConfig({
  server: { port: 4443 },
  integrations: [mdx()],
  vite: { plugins: [tailwind()] }
})
