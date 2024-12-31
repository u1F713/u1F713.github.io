import Link from 'next/link'

function Header() {
  return (
    <header className="border-ds-border mx-auto flex max-w-screen-lg items-center justify-between p-4 md:border-r md:border-l">
      <Link className="text-lg" href="/">
        u1F713
      </Link>

      <nav>
        <ul>
          <li>
            <Link
              className="text-ds-text/70 hover:text-ds-text"
              href="/articles"
            >
              Blog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
