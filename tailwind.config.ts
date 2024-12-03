import typography from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./src/**/*.{astro,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Mono"', ...defaultTheme.fontFamily.sans]
      },

      colors: {
        'color-50': 'oklch(var(--color-50))',
        'color-100': 'oklch(var(--color-100))',
        'color-200': 'oklch(var(--color-200))',
        'color-300': 'oklch(var(--color-300))',
        'color-400': 'oklch(var(--color-400))',
        'color-500': 'oklch(var(--color-500))',
        'color-600': 'oklch(var(--color-600))',
        'color-700': 'oklch(var(--color-700))',
        'color-800': 'oklch(var(--color-800))',
        'color-900': 'oklch(var(--color-900))',
        'color-950': 'oklch(var(--color-950))'
      }
    }
  },
  plugins: [typography]
} as Config
