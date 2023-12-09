import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/trpc/user.getUserOnboarding",
    "/api/trpc/bussines.getById",
    "/api/trpc/user.doesUserExist,bussines.getById",
    "/discover/wedding",
    "/discover/birthday",
    "/discover/sacrament",
    "/discover/celebration",
    "/api/webhooks/stripe-webhook",
    "/api/trpc/bussines.getById,businessPost.getPostByBusinessId,businessCategoryType.getAllEventCategories,businessPost.getPostByCategory,user.getUserOnboarding,user.doesUserExist,businessPost.getPostById",
    "/api/trpc/businessPost.getPostByCategory",
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
