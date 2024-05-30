import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

const publicRoutes = [
  "/",
  "/login",
  "/cadastre-se"
]

export function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get("__postgate.session");
  if (!publicRoutes.includes(request.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};