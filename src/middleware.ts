import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { v4 as uuid } from 'uuid'

export function middleware(req: NextRequest) {
  const userToken = req.cookies.get('userToken')
  if (userToken) return

  // Setting cookies on the response
  const response = NextResponse.next()
  response.cookies.set('userToken', uuid())

  return NextResponse.redirect('/create')
}

export const config = {
  matcher: ['/', '/:path*'],
}
