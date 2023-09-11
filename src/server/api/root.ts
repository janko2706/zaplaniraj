import { userRouter } from "~/server/api/routers/user";
import { createTRPCRouter } from "~/server/api/trpc";
import { stripeRouter } from "./routers/stripe";
import { businessRouter } from "./routers/business";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  stripe: stripeRouter,
  bussines: businessRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
