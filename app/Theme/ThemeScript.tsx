'use client'

import { useEffect, type FunctionComponent } from 'react'
import { makeThemeStorage } from './themeStorage.ts'
import useTheme from './useTheme.ts'

const preloadTheme = () => {
  const colorScheme = localStorage.getItem('theme-color-scheme')

  document.documentElement.classList.toggle(
    'dark',
    !colorScheme || colorScheme === 'auto'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : colorScheme === 'dark'
  )
}

export const storage = makeThemeStorage()

const ThemeScript: FunctionComponent = () => {
  const { colorScheme } = useTheme()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', colorScheme === 'dark')
  }, [colorScheme])

  return <script suppressHydrationWarning>{`(${preloadTheme})()`}</script>
}

export default ThemeScript
