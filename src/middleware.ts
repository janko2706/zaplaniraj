// FOR PRODUCTION UNCOMMENT
// import { authMiddleware } from "@clerk/nextjs";

// export default authMiddleware({});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

export function middleware() {
  return null
}