export const preloadTheme = (): undefined => {
  const colorScheme = localStorage.getItem('theme-color-scheme')
  document.documentElement.classList.toggle(
    'dark',
    colorScheme === 'auto'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : colorScheme === 'dark'
  )
}
