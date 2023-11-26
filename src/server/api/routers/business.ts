import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis/nodejs";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(40, "1 m"),
  analytics: true,
});

export const businessRouter = createTRPCRouter({
  getById: privateProcedure
    .input(
      z.object({
        clerkId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { success } = await ratelimit.limit(ctx.userId);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
      const business = await ctx.prisma.business.findFirst({
        where: {
          user: {
            clerkId: input.clerkId,
          },
        },
      });

      if (!business) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "No business found!",
        });
      } else {
        return business;
      }
    }),
  getAllForPages: publicProcedure.query(async ({ ctx }) => {
    const res = await ctx.prisma.user
      .findMany({
        where: {
          isBussines: true,
        },
      })
      .then((result) => {
        return result.map((user) => {
          return {
            id: user.clerkId,
          };
        });
      })
      .catch((err) => {
        throw new TRPCError({
          message: `There was an error while getting all posts: ${err} `,
          code: "INTERNAL_SERVER_ERROR",
        });
      });

    return res;
  }),
});
