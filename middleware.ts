import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// This is the Clerk middleware that will be used to protect your routes.
// It will redirect users to the Clerk login page if they are not signed in.

const isProtectedRoute = createRouteMatcher([
  // Add your protected routes here
  "/",
  "/upcoming",
  "/previous",
  "/recordings",
  "/personal-room",
  "/meetings(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
