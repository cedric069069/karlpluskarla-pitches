import { NextResponse } from 'next/server'

// Root is intentionally blank — pitches are confidential and reachable only
// by their direct /<slug> link. No public index.
export function GET() {
  return new NextResponse(
    `<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8"><title>Karl+Karla</title><meta name="robots" content="noindex"><meta name="theme-color" content="#0000FE"><link rel="icon" href="/favicon.ico"><link rel="apple-touch-icon" href="/favicon.ico"><meta property="og:title" content="Karl+Karla"><meta property="og:image" content="https://karlpluskarla.de/opengraph-image"><style>body{font-family:-apple-system,Arial,sans-serif;background:#F4F4F2;color:#000;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;font-weight:700;letter-spacing:-0.01em}span{color:#0000FE}</style></head><body>KARL<span>+</span>KARLA</body></html>`,
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  )
}
