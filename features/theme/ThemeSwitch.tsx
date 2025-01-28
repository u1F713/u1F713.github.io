'use client'

import { useTheme } from './ThemeContext.tsx'

export default function ThemeSwitch() {
  const { setTheme } = useTheme()

  return (
    <figure
      className="toggle-theme h-5 w-5 font-bold text-current"
      onClick={() => {
        setTheme(prev => ({ ...prev, isDark: !prev.isDark }))
      }}
    />
  )
}
