'use client'

import ThemeSwitch from '@/features/theme/ThemeSwitch.tsx'
import clsx from 'clsx'
import NextImage from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import atomSVG from '../assets/atom-feed.svg'

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

        <nav className="text-ds-text/70 grid grid-flow-col content-between items-center gap-4">
          <ul className="flex">
            <li>
              <NavigationLink
                href="posts"
                slug="Blog"
                active={pathname === '/posts'}
              />
            </li>
          </ul>
          <a
            className="hover:bg-ds-border/80 group relative rounded-sm p-2"
            href="/atom.xml"
            target="_blank"
          >
            <NextImage
              className="text-red-500"
              width={16}
              src={atomSVG}
              alt="web feed"
            />
            <span
              className={clsx(
                'group-hover:bg-ds-border/80 pointer-events-none invisible absolute group-hover:visible',
                'rounded-sm p-1 text-xs whitespace-nowrap opacity-0 duration-120 group-hover:opacity-100',
                '-translate-x-[calc(50%-8px)] translate-y-2 group-hover:translate-y-1/2'
              )}
              role="dialog"
            >
              Web feed
            </span>
          </a>
          <ThemeSwitch />
        </nav>
      </header>
    </div>
  )
}

export default Header
