import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Define your secret
const secret = process.env.NEXTAUTH_SECRET;

// Middleware function
export async function middleware(req: NextRequest) {
  // Get token from the request using NextAuth.js
  const token = await getToken({ req, secret });

  const { pathname } = req.nextUrl;

  // If user is authenticated, allow access to the requested page
  if (token) {
    // If the user is already logged in, prevent them from visiting the sign-in page
    if (pathname === "/auth/signin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // If the user is not authenticated and tries to access a protected page, redirect to sign-in
  if (pathname !== "/auth/signin") {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  // Continue to the sign-in page if they're not authenticated
  return NextResponse.next();
}

// Specify the routes where the middleware should apply
export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'], // Matches all routes except API routes and Next.js static files
  };