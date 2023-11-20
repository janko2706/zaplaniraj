import { userRouter } from "~/server/api/routers/user";
import { createTRPCRouter } from "~/server/api/trpc";
import { stripeRouter } from "./routers/stripe";
import { businessRouter } from "./routers/business";
import { businessTypeCategoryRouter } from "./routers/businessTypeCategory";
import { businessPostRouter } from "./routers/businessPost";
import { statisticsRouter } from "./routers/statistics";
import { openaiRouter } from "./routers/openai";
import { userPlansRouter } from "./routers/userPlans";

export const appRouter = createTRPCRouter({
  user: userRouter,
  stripe: stripeRouter,
  bussines: businessRouter,
  businessCategoryType: businessTypeCategoryRouter,
  businessPost: businessPostRouter,
  statistics: statisticsRouter,
  openapi: openaiRouter,
  userPlans: userPlansRouter,
});

export type AppRouter = typeof appRouter;
