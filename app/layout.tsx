import type { Metadata, NextPage } from 'next'
import { IBM_Plex_Sans_JP } from 'next/font/google'
import Header from './components/Header'
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
  <html lang="en">
    <body
      className={`${IBM_Plex.className} text-ds-text grid min-h-screen grid-cols-1 grid-rows-[auto_1fr_auto] antialiased`}
    >
      <div className="border-ds-border border-b">
        <Header />
      </div>

      <div className="mx-auto w-full max-w-screen-lg">
        <div className="border-ds-border h-full md:border-r md:border-l">
          {children}
        </div>
      </div>
      <div className="border-ds-border border-t">
        <footer className="border-ds-border mx-auto max-w-screen-lg p-4 md:border-r md:border-l">
          <span className="opacity-50">GPL-3.0 2024 © u1F713</span>
        </footer>
      </div>
    </body>
  </html>
)

export default RootLayout
