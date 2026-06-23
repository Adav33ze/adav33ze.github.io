import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-cormorant',
})

export const metadata: Metadata = {
  title: 'Abdulrahman — Architect & Interior Designer',
  description: 'Abdulrahman is an Architect and Interior Designer based in Abuja, Nigeria, working across residential, hospitality, and institutional projects. Available for collaborations locally and internationally.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${cormorant.variable} antialiased bg-white text-black`}>
        {children}
      </body>
    </html>
  )
}
