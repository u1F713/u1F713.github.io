import { useSyncExternalStore } from 'react'
import { storage } from './ThemeScript.tsx'

export default function useTheme() {
  const colorScheme = useSyncExternalStore(
    storage.subscribe,
    storage.getSnapshot,
    storage.getSnapshot
  )

  return { colorScheme, setColorScheme: storage.setColorScheme }
}
