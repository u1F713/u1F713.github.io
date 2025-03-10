export type ColorScheme = 'dark' | 'light'
export type Storage = ColorScheme | 'auto'

const storageKey = 'theme-color-scheme'
const media = '(prefers-color-scheme: dark)'

export const getSystemColorScheme = () =>
  window.matchMedia(media).matches ? 'dark' : 'light'

export const setColorScheme = (v: Storage) => {
  localStorage.setItem(storageKey, v)
  window.dispatchEvent(new StorageEvent('storage'))
}

export const getLocalColorScheme = (): Storage => {
  const local = localStorage.getItem(storageKey)
  return local === 'light' || local === 'dark' ? local : 'auto'
}

export const subscribe = (onChange: () => void) => {
  const ctrl = new AbortController()
  window.addEventListener('storage', onChange, { signal: ctrl.signal })
  window
    .matchMedia(media)
    .addEventListener('change', onChange, { signal: ctrl.signal })
  return () => {
    ctrl.abort()
  }
}

export const snapshot = (): ColorScheme => {
  const colorScheme = localStorage.getItem(storageKey)
  return colorScheme === 'light' || colorScheme === 'dark'
    ? colorScheme
    : getSystemColorScheme()
}
