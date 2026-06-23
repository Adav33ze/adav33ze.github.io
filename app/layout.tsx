import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css' // <-- This line connects your styling engine!

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
  title: 'adav33ze | Architecture & Interior Design Studio',
  description: 'Minimalist architecture and premium interior design practice based in Abuja, Nigeria.',
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