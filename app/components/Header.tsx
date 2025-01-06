import Link from 'next/link'

function Header() {
  return (
    <header className="mx-auto flex items-center justify-between p-4">
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
