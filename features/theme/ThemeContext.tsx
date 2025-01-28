'use client'

import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState
} from 'react'
import preloadScript from './preloadScript.ts'
import './themes.css'

export interface ThemeState {
  isDark?: boolean
}

type ThemeContext = {
  theme: ThemeState
  setTheme: Dispatch<SetStateAction<ThemeState>>
}

type Props = Readonly<{
  children: React.ReactNode
}>

export const ThemeContext = createContext<ThemeContext | undefined>(undefined)

export function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useState<ThemeState>({})

  useEffect(() => {
    if (theme.isDark !== undefined) {
      document.documentElement.classList.toggle('dark', theme.isDark)

      const { matches } = window.matchMedia('(prefers-color-scheme: dark)')

      if (matches !== theme.isDark) {
        localStorage.setItem('theme', theme.isDark ? 'dark' : 'light')
      } else {
        localStorage.removeItem('theme')
      }
    }
  }, [theme])

  useLayoutEffect(() => {
    const ctrl = new AbortController()
    const prefers = window.matchMedia('(prefers-color-scheme: dark)')

    const handleStorageTheme = ({ key, newValue }: StorageEvent) => {
      if (key !== 'theme') return
      setTheme(prev => ({ ...prev, isDark: newValue === 'dark' }))
    }

    const handleSystemTheme = ({ matches }: MediaQueryListEvent) => {
      if (localStorage.getItem('theme') === null) {
        setTheme(prev => ({ ...prev, isDark: matches }))
      }
    }

    window.addEventListener('storage', handleStorageTheme, {
      signal: ctrl.signal
    })
    prefers.addEventListener('change', handleSystemTheme, {
      signal: ctrl.signal
    })

    const storageTheme = localStorage.getItem('theme')

    setTheme(prev => ({
      ...prev,
      isDark:
        localStorage.getItem('theme') === 'dark' ||
        (storageTheme === null &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
    }))

    return () => ctrl.abort()
  }, [])

  return (
    <>
      <script suppressHydrationWarning>{`(${preloadScript})()`}</script>
      <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>
    </>
  )
}

export function useTheme() {
  const theme = useContext(ThemeContext)
  if (!theme) {
    throw new Error()
  }
  return theme
}
