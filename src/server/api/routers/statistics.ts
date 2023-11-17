import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis/nodejs";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(60, "1 m"),
  analytics: true,
});

export const statisticsRouter = createTRPCRouter({
  updateBusinessStatistics: publicProcedure
    .input(
      z.object({
        id: z.number(),
        month: z.string(),
        category: z.string(),
        averageReviewGrade: z.number().optional(),
        numberOfReviews: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.userId) {
        const { success } = await ratelimit.limit(ctx.userId);
        if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
      }
      try {
        const res = await ctx.prisma.statistic.update({
          where: {
            id: input.id,
          },
          data: {
            [input.month]: {
              increment: 1,
            },
            [input.category]: {
              increment: 1,
            },
            visitors: {
              increment: 1,
            },
            averageReviewGrade: input.averageReviewGrade,
            numberOfReviews: {
              increment: input.numberOfReviews ? 1 : 0,
            },
          },
        });
        if (res) {
          return 200;
        }
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Statistics with id:${input.id}, were not updated!`,
        });
      }
    }),
});
