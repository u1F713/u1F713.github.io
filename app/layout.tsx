import ThemeSwitch from '@/features/themes/theme-switch'
import type { Metadata, NextPage } from 'next'
import { ThemeProvider } from 'next-themes'
import { IBM_Plex_Sans_JP } from 'next/font/google'
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
    suppressHydrationWarning: The `data-theme="dark"` attribute is dynamically 
    updated by a script in the ThemeProvider. 
  */
  <html lang="en" suppressHydrationWarning>
    <body
      className={`${IBM_Plex.className} text-ds-text grid min-h-screen grid-cols-1 grid-rows-[auto_1fr_auto] antialiased`}
    >
      <ThemeProvider enableSystem>
        <Container border-r border-b border-l>
          <Header />
        </Container>

        <Container border-l border-r>
          {children}
        </Container>

        <Container border-t border-l border-r>
          <footer className="flex items-center justify-between gap-4 p-4">
            <span className="opacity-50">GPL-3.0 2024 © u1F713</span>
            <ThemeSwitch />
          </footer>
        </Container>
      </ThemeProvider>
    </body>
  </html>
)

export default RootLayout
