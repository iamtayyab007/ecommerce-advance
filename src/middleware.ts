import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isUserProfile = createRouteMatcher(["/userProfile(.*)"]);
const isRequiredField = createRouteMatcher(["/required-fields"]);

export default clerkMiddleware(async (auth, req) => {
  const session = await auth();
  const { userId, sessionClaims } = session;
  const url = req.nextUrl;
  console.log("session claim", sessionClaims);
  if (!userId) {
    return NextResponse.next();
  }

  const metadata = sessionClaims?.metadata as {
    role?: string;
    username?: string;
    requiredFieldsCompleted?: boolean;
  };

  const role = metadata?.role;
  console.log("role", role);
  const requiredFieldsCompleted = metadata?.requiredFieldsCompleted;

  const isOnRequiredFieldsPage = isRequiredField(req);

  // 🚫 Redirect to /required-fields if not completed yet
  // const bypass = url.searchParams.get("bypassRequiredFieldsCheck");

  // if (!requiredFieldsCompleted && !isOnRequiredFieldsPage && !bypass) {
  //   const redirectUrl = new URL("/required-fields", req.url);
  //   return NextResponse.redirect(redirectUrl);
  // }

  // 🔒 Admin route access control
  if (isAdminRoute(req) && role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 🔒 User profile route access control
  if (isUserProfile(req)) {
    if (role === "customer" || role === "admin") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
