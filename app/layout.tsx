import { ThemeProvider } from '@/features/theme/ThemeContext.tsx'
import type { Metadata, NextPage } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Header from './components/Header.tsx'
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
        { title: '末吉', url: 'https://u1f713.github.io/feed' }
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
      className={`${inter.className} bg-ds-bg-200 text-ds-text grid min-h-screen grid-cols-1 grid-rows-[1fr_auto] antialiased`}
    >
      <ThemeProvider>
        <div>
          <Header />
          <main className="h-full">{children}</main>
        </div>

        <div className="border-ds-border border-t">
          <div className="border-ds-border mx-auto w-full max-w-screen-xl p-3 md:border-x">
            <footer className="flex flex-wrap items-center justify-between gap-4">
              <nav className="text-ds-text/60 flex flex-wrap gap-2">
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
          </div>
        </div>
      </ThemeProvider>
    </body>
  </html>
)

export default RootLayout
