import ThemeSwitch from '@/features/themes/theme-switch'
import type { Metadata, NextPage } from 'next'
import { ThemeProvider } from 'next-themes'
import { IBM_Plex_Sans_JP } from 'next/font/google'
import Link from 'next/link'
import Container from './components/container.tsx'
import Header from './components/Header.tsx'
import './globals.css'

const IBM_Plex = IBM_Plex_Sans_JP({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-IBM-Plex-Sans',
  weight: '400'
})

export const metadata: Metadata = {
  title: 'u1F713',
  description: 'Scarlet Devil Mansion'
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
      className={`${IBM_Plex.className} bg-ds-bg-200 text-ds-text grid min-h-screen grid-cols-1 grid-rows-[1fr_auto] antialiased`}
    >
      <ThemeProvider enableSystem>
        <div>
          <Header />

          <Container h-full border-l border-r>
            {children}
          </Container>
        </div>

        <Container border-t border-l border-r>
          <footer className="flex flex-wrap items-center justify-between gap-4 p-3.5">
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
            <ThemeSwitch />
          </footer>
        </Container>
      </ThemeProvider>
    </body>
  </html>
)

export default RootLayout
