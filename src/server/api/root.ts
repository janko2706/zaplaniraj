import { userRouter } from "~/server/api/routers/user";
import { createTRPCRouter } from "~/server/api/trpc";
import { stripeRouter } from "./routers/stripe";
import { businessRouter } from "./routers/business";
import { businessTypeCategoryRouter } from "./routers/businessTypeCategory";
import { businessPostRouter } from "./routers/businessPost";

export const appRouter = createTRPCRouter({
  user: userRouter,
  stripe: stripeRouter,
  bussines: businessRouter,
  businessCategoryType: businessTypeCategoryRouter,
  businessPost: businessPostRouter,
});

export type AppRouter = typeof appRouter;
