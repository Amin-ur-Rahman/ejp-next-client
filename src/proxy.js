import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function proxy(request) {
  // const user = true;
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: "/api/add-products/:path*",
};
