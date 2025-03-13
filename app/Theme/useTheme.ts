import { useSyncExternalStore } from 'react'
import { createAccentColorStorage, makeThemeStorage } from './themeStorage.ts'

const storage = makeThemeStorage()

export default function useTheme() {
  const colorScheme = useSyncExternalStore(
    storage.subscribe,
    storage.getSnapshot,
    storage.getSnapshot
  )

  return { colorScheme, setColorScheme: storage.setColorScheme }
}

const accentColor = createAccentColorStorage('theme-accent-color')

export const useAccentColor = () =>
  useSyncExternalStore(
    accentColor.subscribe,
    accentColor.getSnapshot,
    accentColor.getSnapshot
  )
