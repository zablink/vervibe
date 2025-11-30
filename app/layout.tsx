import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import NavbarWrapper from '@/components/NavbarWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VerVibe - แพลตฟอร์มศิลปินไทย',
  description: 'แพลตฟอร์มให้ศิลปินหารายได้จากแฟนคลับตรงๆ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <body className={inter.className}>
        <NavbarWrapper>{children}</NavbarWrapper>
      </body>
    </html>
  )
}
