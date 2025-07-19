import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export async function middleware(req: NextRequest) {

  const { pathname } = req.nextUrl;
  const loginUrl = new URL("/login", req.url);
  const publicRoutes = ["/login", "/signup", "/reset-password", "/forgot-password"];
  const adminRoutes = ["/dashboard/admin"];
  const protectedRoutes = ["/create", "/profile", "/dashboard", "/edit", "/edit/[id]", "/signout"];

  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
    secureCookie: process.env.NODE_ENV === 'production',
  });

  if (publicRoutes.some(route => pathname === route)) {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    } return NextResponse.next();
  }

  if (adminRoutes.includes(pathname)) {
    if (!token) {
      loginUrl.searchParams.set("message", "You must be logged in to access this page.");
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (token.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
    return NextResponse.next();
  }

  if (protectedRoutes.some(route => {
    if (route.includes("[")) {
      const basePath = route.split("/[")[0];
      return pathname.startsWith(basePath);
    }
    return pathname === route || pathname.startsWith(`${route}/`);
  })) {
    if (!token) {
      loginUrl.searchParams.set("message", "You must be logged in to access this page.");
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    } return NextResponse.next();
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/create/:path*",
    "/profile/:path*",
    "/dashboard",
    "/edit/:path*",
    "/login",
    "/signup",
    "/reset-password",
    "/forgot-password",
  ],
};

//
// "/dashboard/:path*",