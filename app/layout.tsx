import './globals.css'
import { Inter, Sarabun } from 'next/font/google'
import NavbarWrapper from '@/components/NavbarWrapper'
const inter = Inter({ subsets: ['latin'] })
const sarabun = Sarabun({ subsets: ['thai', 'latin'], weight: ['400', '500', '700'] })

export const metadata = {
  title: 'VerVibe - แพลตฟอร์มศิลปินไทย',
  description: 'แพลตฟอร์มให้ศิลปินหารายได้จากแฟนคลับตรงๆ',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Server component: cannot use useEffect/useState
  // TODO: For dynamic site settings, use server actions or fetch in client components only
  return (
    <html lang="th">
      <head>
        <title>VerVibe - แพลตฟอร์มศิลปินไทย</title>
        <meta name="description" content="แพลตฟอร์มให้ศิลปินหารายได้จากแฟนคลับตรงๆ" />
        <meta name="theme-color" content="#d946ef" />
        <style>{`:root { --vv-primary: #d946ef; }`}</style>
      </head>
      <body className={inter.className + ' ' + sarabun.className}>
        <NavbarWrapper logoUrl={undefined}>{children}</NavbarWrapper>
      </body>
    </html>
  )
}
