import type { Metadata, NextPage } from 'next'
import { IBM_Plex_Sans_JP } from 'next/font/google'
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
      className={`${IBM_Plex.className} text-gray-950 antialiased dark:text-gray-50`}
    >
      {children}
    </body>
  </html>
)

export default RootLayout
