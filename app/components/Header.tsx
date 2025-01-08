import Link from 'next/link'
import Container from './container.tsx'

function Header() {
  return (
    <div className="sticky top-0">
      <Container border-r border-b border-l>
        <header className="bg-ds-bg-200/80 mx-auto flex items-center justify-between p-4 backdrop-blur-md">
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
      </Container>
    </div>
  )
}

export default Header
