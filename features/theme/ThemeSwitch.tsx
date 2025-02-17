'use client'

import clsx from 'clsx'
import { useTheme } from './ThemeContext.tsx'

export default function ThemeSwitch() {
  const [, { setIsDark }] = useTheme()

  return (
    <figure
      className={clsx(
        'inline-block h-5 w-5 bg-current [mask-size:100%_100%]',
        `[mask:url(/sun.svg)] dark:[mask:url(/moon.svg)]`
      )}
      onClick={() => {
        setIsDark(prev => !prev)
      }}
    />
  )
}
