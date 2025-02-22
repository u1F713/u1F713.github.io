'use client'

import ThemeSwitch from '@/app/theme/ThemeSwitch'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Header() {
  const pathname = usePathname()

  return (
    <div className="border-dn-border bg-dn-surface-200/80 sticky top-0 border-b backdrop-blur-md">
      <header
        className={clsx(
          'border-dn-border mx-auto flex px-4 md:px-6 lg:border-x',
          'max-w-screen-xl items-center justify-between'
        )}
      >
        <Link className="text-lg" href="/">
          <span className="text-xl font-extrabold">末吉</span>
        </Link>

        <nav className="text-dn-color/70">
          <ul className="grid grid-flow-col content-between items-center gap-6">
            <li className="flex">
              <NavigationLink
                href="posts"
                text="Blog"
                active={pathname === '/posts'}
              />
            </li>
            <li className="flex">
              <a
                className="hover:bg-dn-surface-200 group relative flex rounded-sm"
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
                    'group-hover:bg-dn-surface-200 pointer-events-none invisible absolute group-hover:visible',
                    'rounded-sm p-1 text-xs whitespace-nowrap opacity-0 duration-120 group-hover:opacity-100',
                    '-translate-x-[calc(50%-8px)] translate-y-2 group-hover:translate-y-6'
                  )}
                  role="dialog"
                >
                  Web feed
                </span>
              </a>
            </li>
            <li className="flex">
              <ThemeSwitch />
            </li>
          </ul>
        </nav>
      </header>
    </div>
  )
}

interface PageLink {
  text: string
  href: string
  active?: boolean
}

function NavigationLink({ text, href, active }: PageLink) {
  return (
    <div
      className={clsx(
        'shadow-dn-color-200 p-3',
        !active
          ? 'text-dn-color-200/70 hover:text-dn-color-200/90'
          : 'shadow-[0_1px]'
      )}
    >
      <Link
        className="text-dn-color/70 hover:text-dn-color border-dn-border"
        href={href}
      >
        {text}
      </Link>
    </div>
  )
}

export default Header
