export const preloadTheme = () => {
  const theme = localStorage.getItem('theme')

  document.documentElement.classList.toggle(
    'dark',
    theme === 'dark' ||
      (theme === null &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
  )
}
