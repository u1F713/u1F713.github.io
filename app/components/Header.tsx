'use client'

import ThemeSwitch from '@/app/Theme/ThemeSwitch.tsx'
import clsx from 'clsx'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { useTheme } from '../Theme/ThemeProvider.tsx'

function Header() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { setColorScheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      containerRef.current?.classList.toggle(
        'border-b',
        document.documentElement.scrollTop > 0
      )
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="bg-dn-surface-200/50 border-dn-border sticky top-0 z-50 backdrop-blur-sm"
      ref={containerRef}
    >
      <header className="mx-auto flex max-w-screen-lg items-center justify-between px-4 py-2">
        <Link className="text-lg" href="/">
          <span className="text-xl font-extrabold">末吉</span>
        </Link>

        <nav className="text-dn-color/70">
          <ul className="grid grid-flow-col content-between items-center gap-1 font-medium">
            <Link
              className="hover:bg-dn-surface-100 rounded-md p-2"
              href="/posts"
            >
              Blog
            </Link>

            <a
              className="group hover:bg-dn-surface-100 relative flex rounded-md p-3"
              href="/atom.xml"
              target="_blank"
            >
              <figure
                className={clsx(
                  'inline-block h-4 w-4 bg-current [mask-size:100%_100%]',
                  '[mask:url(/atom-feed.svg)]'
                )}
              />
              <span
                className={clsx(
                  'group-hover:bg-dn-surface-200 border-dn-border pointer-events-none invisible absolute border group-hover:visible',
                  'rounded-md p-2 text-xs whitespace-nowrap opacity-0 duration-120 group-hover:opacity-100',
                  '-translate-x-[calc(50%-8px)] translate-y-2 group-hover:translate-y-8'
                )}
                role="dialog"
              >
                Web feed
              </span>
            </a>

            <span
              className={'hover:bg-dn-surface-100 flex rounded-md p-2.5'}
              onClick={() =>
                setColorScheme(prev => (prev === 'dark' ? 'light' : 'dark'))
              }
            >
              <ThemeSwitch />
            </span>
          </ul>
        </nav>
      </header>
    </div>
  )
}

export default Header
