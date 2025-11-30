"use client"

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

function AuthCallbackInner() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const exchangeSession = async () => {
      const code = searchParams.get('code')
      if (code) {
        alert('[callback] code: ' + code)
        await supabase.auth.exchangeCodeForSession(code)
        alert('[callback] exchanged, redirecting to /dashboard')
        window.location.href = '/dashboard'
      } else {
        // Try to extract tokens from hash fragment
        const hash = window.location.hash
        if (hash && hash.includes('access_token')) {
          const params = new URLSearchParams(hash.replace(/^#/, ''))
          const access_token = params.get('access_token')
          const refresh_token = params.get('refresh_token')
          const expires_in = params.get('expires_in')
          const token_type = params.get('token_type')
          if (access_token && refresh_token) {
            alert('[callback] found access_token in hash, setting session')
            await supabase.auth.setSession({
              access_token,
              refresh_token,
            })
            alert('[callback] session set, redirecting to /dashboard')
            window.location.href = '/dashboard'
            return
          }
        }
        alert('[callback] no code or access_token, redirecting to /auth/login')
        router.replace('/auth/login')
      }
    }
    exchangeSession()
    // eslint-disable-next-line
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
  )
}

export default function AuthCallbackPage() {
  return (
    <Suspense>
      <AuthCallbackInner />
    </Suspense>
  )
}
