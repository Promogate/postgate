import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoutes = createRouteMatcher([
  "/agendamentos(.*)",
  "/configuracoes(.*)",
  "/contas(.*)",
  "/dashboard(.*)",
  "/listas-de-disparo(.*)",
  "/redirecionadores(.*)",
  "/workflows(.*)",
])

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoutes(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};