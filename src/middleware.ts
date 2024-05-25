import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const jwtToken = request.cookies.get("jwtToken");
  const token = jwtToken?.value as string;
  if (!token) {
    // && request.method === 'DELETE'
    return NextResponse.json(
      { message: "not token provided, access denied, message from middleware" },
      { status: 401 } // Unauthorized
    );
  }
}

export const config = {
  matcher: ["/api/users/profile/:path*"],
};
