import './globals.css'
import { Inter, Sarabun } from 'next/font/google'
import type { Metadata } from 'next'
import NavbarWrapper from '@/components/NavbarWrapper'

const inter = Inter({ subsets: ['latin'] })
const sarabun = Sarabun({ subsets: ['thai', 'latin'], weight: ['400', '500', '700'] })

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
      <body className={inter.className + ' ' + sarabun.className}>
        <NavbarWrapper>{children}</NavbarWrapper>
      </body>
    </html>
  )
}
