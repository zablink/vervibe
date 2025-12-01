"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'


export default function NavbarWrapper({ children, logoUrl }: { children: React.ReactNode, logoUrl?: string }) {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    function mapAvatar(u: any) {
      if (!u) return null
      // Google: u.user_metadata.picture, Facebook: u.user_metadata.avatar_url
      let avatarUrl = u.avatar_url || u.avatarUrl
      if (!avatarUrl && u.user_metadata) {
        avatarUrl = u.user_metadata.picture || u.user_metadata.avatar_url || null
      }
      return { ...u, avatarUrl }
    }
    supabase.auth.getUser().then(({ data: { user } }) => setUser(mapAvatar(user)))
    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(mapAvatar(session?.user ?? null))
    })
    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <>
      <Navbar user={user} logoUrl={logoUrl} />
      {children}
    </>
  )
}
