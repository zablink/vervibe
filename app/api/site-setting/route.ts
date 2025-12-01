import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/site-setting?key=logo
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const key = searchParams.get('key')
  if (!key) return NextResponse.json({ error: 'Missing key' }, { status: 400 })
  const setting = await prisma.siteSetting.findUnique({ where: { key } })
  if (!setting) return NextResponse.json({ value: null })
  return NextResponse.json({ value: setting.value })
}

// POST /api/site-setting { key, value }
export async function POST(req: NextRequest) {
  const { key, value } = await req.json()
  if (!key) return NextResponse.json({ error: 'Missing key' }, { status: 400 })
  const setting = await prisma.siteSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  })
  return NextResponse.json({ ok: true, setting })
}
