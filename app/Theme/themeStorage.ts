import { SetStateAction } from 'react'

type Theme = {
  colorScheme: 'dark' | 'light'
}

const isServer = typeof window === 'undefined'
const storageKey = 'theme-color-scheme'
const media = '(prefers-color-scheme: dark)'

const getSystemColorScheme = () =>
  window.matchMedia(media).matches ? 'dark' : 'light'

const getColorScheme = () => {
  const local = localStorage.getItem(storageKey)
  return local === 'light' || local === 'dark' ? local : getSystemColorScheme()
}

export function makeThemeStorage() {
  const listeners = new Set<() => void>()
  const systemQuery = isServer ? undefined : window.matchMedia(media)
  const theme: Theme = { colorScheme: isServer ? 'light' : getColorScheme() }

  const emitChange = () => {
    theme.colorScheme = getColorScheme()
    return listeners.forEach(l => l())
  }

  return {
    subscribe: (listener: () => void) => {
      listeners.add(listener)

      if (listeners.size === 1) {
        systemQuery?.addEventListener('change', emitChange)
        window.addEventListener('storage', emitChange)
      }

      return () => {
        listeners.delete(listener)

        if (listeners.size === 0) {
          systemQuery?.removeEventListener('change', emitChange)
          window.removeEventListener('storage', emitChange)
        }
      }
    },
    getSnapshot: () => theme.colorScheme,
    setColorScheme: (value: SetStateAction<Theme['colorScheme']>) => {
      const nextState =
        value instanceof Function ? value(theme.colorScheme) : value

      localStorage.setItem(
        storageKey,
        nextState === getSystemColorScheme() ? 'auto' : nextState
      )
      window.dispatchEvent(new StorageEvent('storage'))
    }
  }
}
