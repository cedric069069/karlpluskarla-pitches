import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'
import { makeToken, loginGateHtml } from '@/lib/auth'

// One generic route for every pitch. To add a pitch, drop two files into
// lib/pitches/:  <slug>.html (the pitch) and <slug>.json (its config).
// No code changes needed. See README.md.

type Pitch = { title: string; sub: string; user: string; pass: string }

const PITCH_DIR = path.join(process.cwd(), 'lib/pitches')
const VALID_SLUG = /^[a-z0-9-]+$/ // also blocks path traversal (no dots/slashes)

async function loadPitch(slug: string): Promise<Pitch | null> {
  if (!VALID_SLUG.test(slug)) return null
  try {
    const raw = await readFile(path.join(PITCH_DIR, `${slug}.json`), 'utf-8')
    const p = JSON.parse(raw) as Partial<Pitch>
    if (!p.title || !p.user || !p.pass) return null // ponytail: minimal shape check
    return { title: p.title, sub: p.sub ?? '', user: p.user, pass: p.pass }
  } catch {
    return null
  }
}

const notFound = () =>
  new NextResponse('Not found', { status: 404, headers: { 'Content-Type': 'text/plain' } })

const cookieName = (slug: string) => `kk_pitch_${slug}`

const gate = (slug: string, p: Pitch, showError: boolean) =>
  new NextResponse(
    loginGateHtml({ title: p.title, sub: p.sub, userField: 'user', passField: 'pass', action: `/${slug}`, showError }),
    { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } }
  )

export async function GET(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params
  const pitch = await loadPitch(slug)
  if (!pitch) return notFound()

  const COOKIE = cookieName(slug)
  const TOKEN = makeToken(`${slug}:${pitch.pass}`)
  const url = new URL(req.url)

  if (url.searchParams.has('logout')) {
    const res = NextResponse.redirect(new URL(`/${slug}`, req.url))
    res.cookies.set(COOKIE, '', { maxAge: 0, path: '/' })
    return res
  }

  if (req.cookies.get(COOKIE)?.value !== TOKEN) {
    return gate(slug, pitch, false)
  }

  const html = await readFile(path.join(PITCH_DIR, `${slug}.html`), 'utf-8')
  return new NextResponse(html, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } })
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params
  const pitch = await loadPitch(slug)
  if (!pitch) return notFound()

  const form = await req.formData()
  const user = (form.get('user') as string | null)?.trim() ?? ''
  const pass = (form.get('pass') as string | null) ?? ''

  if (user === pitch.user && pass === pitch.pass) {
    const res = NextResponse.redirect(new URL(`/${slug}`, req.url), 303)
    res.cookies.set(cookieName(slug), makeToken(`${slug}:${pitch.pass}`), {
      maxAge: 86400 * 30,
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
    })
    return res
  }

  return gate(slug, pitch, true)
}
