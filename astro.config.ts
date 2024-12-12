import { defineConfig } from 'astro/config'
import tailwind from '@tailwindcss/vite'
import mdx from '@astrojs/mdx'
import solidJs from '@astrojs/solid-js'

export default defineConfig({
  server: { port: 4443 },
  integrations: [mdx(), solidJs()],
  vite: { plugins: [tailwind()] }
})
