import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Debugging: Log the request URL
  console.log('Middleware called for URL:', request.nextUrl.pathname);

  // Check if the request is for the homepage
  if (request.nextUrl.pathname === '/') {
    // Debugging: Log the redirection
    console.log('Redirecting to /murals');
    
    // Redirect to /murals
    return NextResponse.redirect(new URL('/murals', request.url));
  }

  // Continue processing other requests
  return NextResponse.next();
}

// Optionally, you can configure the matcher to apply the middleware only on certain paths
export const config = {
  matcher: '/',
};


/*
1 million years go by and i am unable to get the middleware to call

*/