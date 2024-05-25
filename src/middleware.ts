import { NextResponse, NextRequest } from "next/server";


export function middleware(request:NextRequest) {
  const authToken = request.headers.get("authToken") as string;
    if (!authToken ) { // && request.method === 'DELETE'
      return NextResponse.json(
        { message: "not token provided, access denied, message from middleware" },
        { status: 401 } // Unauthorized
      );
    }
}

export const config = {
  matcher: ['/api/users/profile/:path*']
}
