'use client'

import clsx from 'clsx'
import { useTheme } from './ThemeProvider.tsx'

export default function ThemeSwitch() {
  const { setColorScheme } = useTheme()

  return (
    <figure
      className={clsx(
        'inline-block h-5 w-5 bg-current [mask-size:100%_100%]',
        `[mask:url(/sun.svg)] dark:[mask:url(/moon.svg)]`
      )}
      onClick={() =>
        setColorScheme(prev => (prev === 'dark' ? 'light' : 'dark'))
      }
    />
  )
}
