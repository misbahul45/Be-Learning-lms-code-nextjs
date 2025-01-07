import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function middleware(req: Request) {
  const session = await auth()

  if (!session) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/upgrade/:path*', '/profile/:path*', '/newsletter'],
}
