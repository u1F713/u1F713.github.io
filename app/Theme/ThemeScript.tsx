'use client'

import { useEffect, type FunctionComponent } from 'react'
import useTheme, { useAccentColor } from './useTheme.ts'

const preloadTheme = () => {
  const colorScheme = localStorage.getItem('theme-color-scheme')
  const accentColor = localStorage.getItem('theme-accent-color')

  document.documentElement.classList.toggle(
    'dark',
    !colorScheme || colorScheme === 'auto'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : colorScheme === 'dark'
  )
  document.documentElement.setAttribute('accent-color', accentColor ?? 'blue')
}

const ThemeScript: FunctionComponent = () => {
  const { colorScheme } = useTheme()
  const { accentColor } = useAccentColor()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', colorScheme === 'dark')
  }, [colorScheme])

  useEffect(() => {
    document.documentElement.setAttribute('accent-color', accentColor)
  }, [accentColor])

  return <script suppressHydrationWarning>{`(${preloadTheme})()`}</script>
}

export default ThemeScript
