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
    "/api/trpc/businessPost.getPostById",
    "/api/trpc/businessPost.getPostByCategory",
    "/api/trpc/businessCategoryType.getAllEventCategories",
    "/api/trpc/statistics.updateBusinessStatistics",
    "/api/trpc/user.getUserOnboarding",
    "/api/trpc/user.doesUserExist",
    "/api/trpc/businessPost.getFavoritePosts,bussines.getById,businessPost.getPostByBusinessId,businessCategoryType.getAllEventCategories,businessPost.getPostByCategory,businessPost.getPostById",
    "/post/(.*)/details",
    "/api/trpc/businessPost.getFavoritePosts,bussines.getById,businessPost.getPostById",
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)/(.*)"],
};
