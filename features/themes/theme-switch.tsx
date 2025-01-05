'use client'

import { useTheme } from 'next-themes'
import { type HTMLAttributes, useEffect, useState } from 'react'

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="text-ds-text/80 flex items-center gap-1 rounded-2xl">
      <SwitchIcon
        active={isClient && theme === 'light'}
        onClick={() => setTheme('light')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
        <small>Light</small>
      </SwitchIcon>

      <SwitchIcon
        active={isClient && theme === 'system'}
        onClick={() => setTheme('system')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="19" cy="6" r="3" />
          <path d="M22 12v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9" />
          <path d="M12 17v4" />
          <path d="M8 21h8" />
        </svg>
        <small>System</small>
      </SwitchIcon>

      <SwitchIcon
        active={isClient && theme === 'dark'}
        onClick={() => setTheme('dark')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9" />
          <path d="M20 3v4" />
          <path d="M22 5h-4" />
        </svg>
        <small>Dark</small>
      </SwitchIcon>
    </div>
  )
}

const SwitchIcon = ({
  children,
  active,
  ...props
}: HTMLAttributes<HTMLButtonElement> & { active?: boolean }) => (
  <button
    {...props}
    className={`${active ? 'border-ds-text/40' : 'border-ds-border'} text-ds-text group hover:bg-ds-border/40 relative cursor-pointer border p-1`}
    type="button"
  >
    <span className="group-hover:text-ds-text flex items-center gap-1">
      {children}
    </span>
  </button>
)
