import { useSyncExternalStore } from 'react'
import { makeThemeStorage } from './themeStorage.ts'

const storage = makeThemeStorage()

export default function useTheme() {
  const colorScheme = useSyncExternalStore(
    storage.subscribe,
    storage.getSnapshot,
    storage.getSnapshot
  )

  return { colorScheme, setColorScheme: storage.setColorScheme }
}
