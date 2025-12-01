import './globals.css'
import { Inter, Sarabun } from 'next/font/google'
import NavbarWrapper from '@/components/NavbarWrapper'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })
const sarabun = Sarabun({ subsets: ['thai', 'latin'], weight: ['400', '500', '700'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [site, setSite] = useState({
    siteTitle: 'VerVibe - แพลตฟอร์มศิลปินไทย',
    description: 'แพลตฟอร์มให้ศิลปินหารายได้จากแฟนคลับตรงๆ',
    favicon: '',
    logo: '',
    primaryColor: '#d946ef',
  })

  useEffect(() => {
    async function load() {
      const keys = ['siteTitle', 'description', 'favicon', 'logo', 'primaryColor']
      const results = await Promise.all(
        keys.map(async (key) => {
          const res = await fetch(`/api/site-setting?key=${key}`)
          const data = await res.json()
          return [key, data.value || '']
        })
      )
      setSite(Object.fromEntries(results))
    }
    load()
  }, [])

  return (
    <html lang="th">
      <head>
        <title>{site.siteTitle}</title>
        <meta name="description" content={site.description} />
        {site.favicon && <link rel="icon" href={site.favicon} />}
        <meta name="theme-color" content={site.primaryColor || '#d946ef'} />
        <style>{`:root { --vv-primary: ${site.primaryColor || '#d946ef'}; }`}</style>
      </head>
      <body
        className={inter.className + ' ' + sarabun.className}
        style={{
          // Tailwind primary-600 override for dynamic color
          '--tw-prose-links': site.primaryColor,
          '--vv-primary': site.primaryColor,
        } as any}
      >
        <NavbarWrapper logoUrl={site.logo}>{children}</NavbarWrapper>
      </body>
    </html>
  )
}
