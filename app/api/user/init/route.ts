import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/user/init
// Called after login if user does not exist in DB
export async function POST(req: NextRequest) {
  try {
    const { id, email, fullName, avatarUrl } = await req.json()
    console.log('[user/init] called', { id, email, fullName, avatarUrl })
    if (!id || !email) {
      return NextResponse.json({ error: 'Missing id or email' }, { status: 400 })
    }
    // Create user if not exists
    let user = await prisma.user.findUnique({ where: { id } })
    if (!user) {
      user = await prisma.user.create({
        data: {
          id,
          email,
          fullName,
          avatarUrl,
          role: 'FAN',
        },
      })
      console.log('[user/init] created user', user)
    } else {
      console.log('[user/init] user exists', user)
    }
    return NextResponse.json({ ok: true, user })
  } catch (err) {
    console.error('[user/init] error', err)
    return NextResponse.json({ error: 'Internal error', detail: String(err) }, { status: 500 })
  }
}
