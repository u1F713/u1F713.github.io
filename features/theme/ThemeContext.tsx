'use client'

import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
  useEffect,
  useSyncExternalStore
} from 'react'
import { preloadTheme } from './script.ts'
import './themes.css'

interface ThemeState {
  isDark: boolean | null
}

type ThemeContext = readonly [
  ThemeState,
  { setIsDark: Dispatch<SetStateAction<boolean | null>> }
]

export const ThemeContext = createContext<ThemeContext | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const isDark = useSyncExternalStore(
    theme.subscribe,
    theme.snapshot,
    theme.serverSnapshot
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', !!isDark)
  }, [isDark])

  return (
    <>
      <script suppressHydrationWarning>{`(${preloadTheme})()`}</script>
      <ThemeContext value={[{ isDark }, { setIsDark: theme.setIsDark }]}>
        {children}
      </ThemeContext>
    </>
  )
}

const theme = (() => {
  const MEDIA = '(prefers-color-scheme: dark)'
  const subscribe = (onChange: () => void) => {
    const ctrl = new AbortController()
    window
      .matchMedia(MEDIA)
      .addEventListener('change', onChange, { signal: ctrl.signal })
    window.addEventListener('storage', onChange, { signal: ctrl.signal })
    return ctrl.abort
  }
  const snapshot = () => {
    const local = localStorage.getItem('theme')
    return (
      local === 'dark' || (local === null && window.matchMedia(MEDIA).matches)
    )
  }
  const serverSnapshot = () => null
  const setIsDark: Dispatch<SetStateAction<boolean | null>> = value => {
    const update = value instanceof Function ? value(snapshot()) : value
    const { matches } = window.matchMedia(MEDIA)

    if (update === matches) localStorage.removeItem('theme')
    else localStorage.setItem('theme', update ? 'dark' : 'light')

    window.dispatchEvent(new StorageEvent('storage'))
  }
  return { subscribe, snapshot, serverSnapshot, setIsDark }
})()

export function useTheme() {
  const theme = useContext(ThemeContext)
  if (!theme) {
    throw new Error()
  }
  return theme
}
