import typography from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import * as R from 'remeda'

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
const lightness = [
  97.78, 93.56, 88.11, 82.67, 74.22, 64.78, 57.33, 46.89, 39.44, 32, 23.78
]

const config: Config = {
  content: ['./src/**/*.{astro,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Mono"', ...defaultTheme.fontFamily.sans]
      },

      colors: R.reduce(
        shades,
        (obj, shade, index) => ({
          ...obj,
          [`dn-accent-${shade}`]: `oklch(${lightness[index]}% var(--dn-accent) 0.29)`
        }),
        {}
      )
    }
  },
  plugins: [typography]
}

export default config
