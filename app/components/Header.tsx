'use client'

import ThemeSwitch from '@/features/theme/ThemeSwitch.tsx'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavigationLink = ({
  slug,
  href,
  active
}: {
  slug: string
  href: string
  active?: boolean
}) => (
  <div className={clsx('shadow-ds-text p-3', active && 'shadow-[0_1px]')}>
    <Link className="text-ds-text/70 hover:text-ds-text" href={`/${href}`}>
      {slug}
    </Link>
  </div>
)

function Header() {
  const pathname = usePathname()

  return (
    <div className="border-ds-border bg-ds-bg-200/80 sticky top-0 border-b">
      <header
        className={clsx(
          'border-ds-border mx-auto flex px-4 md:border-x md:px-10',
          'max-w-screen-xl items-center justify-between backdrop-blur-md'
        )}
      >
        <Link className="text-lg" href="/">
          <span className="text-xl font-extrabold">末吉</span>
        </Link>

        <nav className="text-ds-text/70 grid grid-flow-col content-between items-center gap-8">
          <ul className="flex">
            <li>
              <NavigationLink
                href="posts"
                slug="Blog"
                active={pathname === '/posts'}
              />
            </li>
          </ul>
          <ThemeSwitch />
        </nav>
      </header>
    </div>
  )
}

export default Header
