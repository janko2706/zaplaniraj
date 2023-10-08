import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/trpc/user.getUserOnboarding",
    "/api/trpc/user.getAllForPages",
    "/api/trpc/bussines.getById",
    "/api/trpc/user.doesUserExist,bussines.getById",
    "/api/testing",
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
