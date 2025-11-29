import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const url = request.nextUrl

  // Check if it's a subdomain
  const subdomain = hostname.split('.')[0]
  const isSubdomain = hostname.includes('.vervibe.art') && subdomain !== 'www' && subdomain !== 'vervibe'

  if (isSubdomain) {
    // Rewrite to /artist/[slug]
    return NextResponse.rewrite(
      new URL(`/artist/${subdomain}${url.pathname}`, request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
