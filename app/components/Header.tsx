'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Container from './container.tsx'

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
    <div className="sticky top-0">
      <Container border-r border-b border-l>
        <header
          className={clsx(
            'bg-ds-bg-200/80 mx-auto flex items-center',
            'justify-between px-4 backdrop-blur-md md:px-10'
          )}
        >
          <Link className="text-lg" href="/">
            <span className="text-xl font-extrabold">末吉</span>
          </Link>

          <nav>
            <ul className="flex">
              <li>
                <NavigationLink
                  href="articles"
                  slug="Blog"
                  active={pathname === '/articles'}
                />
              </li>
            </ul>
          </nav>
        </header>
      </Container>
    </div>
  )
}

export default Header
