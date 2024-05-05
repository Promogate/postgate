import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in",
    "/sign-up",
    "/contato",
    "/ferramentas",
    "/api/stripe/webhook",
    "/api/redirector",
    "/api/redirector/(.*)",
    "/api/group",
    "/api/group/(.*)",
    "/api/redirect/(.*)",
    "/api/s3-upload",
    "/api/wapp/webhook"
  ],
  async afterAuth(auth, req) {
    if (auth.isPublicRoute) {
      return NextResponse.next();
    }

    const url = new URL(req.nextUrl.origin);

    if (!auth.userId) {
      url.pathname = "/sign-in";
      return NextResponse.redirect(url);
    }
  },
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};