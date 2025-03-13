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
  if (isServer) {
    return {
      subscribe: () => () => {},
      getSnapshot: () => 'light',
      setColorScheme: () => {}
    }
  }

  const listeners = new Set<() => void>()
  const systemQuery = window.matchMedia(media)
  const theme: Theme = { colorScheme: getColorScheme() }

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

export function createAccentColorStorage(storageKey: string) {
  const getAccentColor = () => localStorage.getItem(storageKey) ?? 'blue'
  const storage = { accentColor: isServer ? '' : getAccentColor() }
  const listeners = new Set<() => void>()

  const emitChange = () => {
    storage.accentColor = getAccentColor()
    listeners.forEach(l => l())
  }

  const setAccentColor = (value: string) => {
    localStorage.setItem(storageKey, value)
    emitChange()
  }

  return {
    subscribe: (listener: () => void) => {
      listeners.add(listener)

      if (listeners.size === 1) {
        window.addEventListener('storage', emitChange)
      }

      return () => {
        listeners.delete(listener)

        if (listeners.size === 0) {
          window.removeEventListener('storage', emitChange)
        }
      }
    },
    getSnapshot: () => Object.assign(storage, { setAccentColor })
  }
}
