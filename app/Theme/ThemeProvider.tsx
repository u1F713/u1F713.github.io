'use client'

import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore
} from 'react'
import { preloadTheme } from './script.ts'
import * as ColorScheme from './themeStorage.ts'

type ColorSchemeContext = {
  colorScheme: ColorScheme.ColorScheme
  setColorScheme: Dispatch<SetStateAction<ColorScheme.ColorScheme>>
}

const ColorSchemeContext = createContext<ColorSchemeContext | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useSyncExternalStore(
    ColorScheme.subscribe,
    ColorScheme.snapshot,
    () => 'light' as const
  )

  const setColorScheme = (_: SetStateAction<ColorScheme.ColorScheme>) => {
    const nextVal = _ instanceof Function ? _(colorScheme) : _
    const system = ColorScheme.getSystemColorScheme()

    ColorScheme.setColorScheme(nextVal === system ? 'auto' : nextVal)
  }

  useEffect(() => {
    document.documentElement.classList.toggle('dark', colorScheme === 'dark')
  }, [colorScheme])

  return (
    <>
      <script suppressHydrationWarning>{`(${preloadTheme})()`}</script>
      <ColorSchemeContext value={{ colorScheme, setColorScheme }}>
        {children}
      </ColorSchemeContext>
    </>
  )
}

export function useTheme() {
  const colorScheme = useContext(ColorSchemeContext)
  if (!colorScheme) throw new Error()
  return colorScheme
}
