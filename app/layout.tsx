import type { Metadata, NextPage } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Header from './components/Header.tsx'
import { ThemeProvider } from './components/Theme/ThemeProvider.tsx'
import './globals.css'

const inter = Inter({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'u1F713',
  description: 'Scarlet Devil Mansion',
  alternates: {
    canonical: 'https://u1f713.github.io/',
    types: {
      'application/rss+xml': [
        { title: '末吉', url: 'https://u1f713.github.io/atom.xml' }
      ]
    }
  }
}

type RootProps = Readonly<{
  children: React.ReactNode
}>

const RootLayout: NextPage<RootProps> = ({ children }) => (
  /*
    suppressHydrationWarning: The `data-theme` attribute is dynamically 
    updated by a script in the ThemeProvider. 
  */
  <html lang="en" suppressHydrationWarning>
    <body
      className={`${inter.className} bg-dn-surface-200 text-dn-color-200 grid min-h-screen grid-cols-1 grid-rows-[1fr_auto] antialiased`}
    >
      <ThemeProvider>
        <div>
          <Header />
          <main className="mx-auto max-w-screen-lg p-4 pt-8">{children}</main>
        </div>

        <footer className="mx-auto w-full max-w-screen-lg p-4">
          <nav className="text-dn-color-200/70 flex flex-wrap gap-x-4">
            <Link
              className="hover:underline"
              href="https://www.gnu.org/licenses/gpl-3.0.en.html"
              target="_blank"
            >
              &copy; {new Date().getFullYear()} GNU General Public License
            </Link>
            <Link
              className="hover:underline"
              href="https://github.com/u1F713/u1F713.github.io"
            >
              Source Code
            </Link>
          </nav>
        </footer>
      </ThemeProvider>
    </body>
  </html>
)

export default RootLayout
