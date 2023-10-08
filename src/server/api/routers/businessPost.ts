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
  limiter: Ratelimit.slidingWindow(5, "1 m"),
  analytics: true,
});

export const businessPostRouter = createTRPCRouter({
  getPostByBusinessId: privateProcedure
    .input(
      z.object({
        businessId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { success } = await ratelimit.limit(ctx.userId);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
      const post = await ctx.prisma.companyPost.findFirst({
        where: {
          business: {
            id: input.businessId,
          },
        },
      });

      if (!post) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "No business post found!",
        });
      } else {
        return post;
      }
    }),
  createBuinessPost: privateProcedure
    .input(
      z.object({
        businessId: z.string(),
        title: z.string(),
        priceRangeMin: z.number().optional(),
        priceRangeMax: z.number().optional(),
        selectedCategoryIds: z.number().array(),
        pictures: z
          .string()
          .array()
          .optional()
          .transform((arr) => {
            if (!arr) {
              return "";
            } else return arr.toString();
          }),
        contactEmails: z
          .string()
          .array()
          .optional()
          .transform((arr) => {
            if (!arr) {
              return "";
            } else return arr.toString();
          }),
        contactPhones: z
          .string()
          .array()
          .optional()
          .transform((arr) => {
            if (!arr) {
              return "";
            } else return arr.toString();
          }),
        website: z.string().optional(),
        location: z.string().optional(),
        shortDescription: z.string().optional(),
        fullDescription: z.string().optional(),
        selectedOptions: z
          .number()
          .array()
          .optional()
          .transform((array) => {
            if (!array) {
              return [];
            } else return array;
          }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { success } = await ratelimit.limit(ctx.userId);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
      const post = await ctx.prisma.companyPost.create({
        data: {
          business: {
            connect: {
              id: input.businessId,
            },
          },
          title: input.title,
          priceRangeMax: input.priceRangeMax,
          priceRangeMin: input.priceRangeMin,
          selectedCategoriesIds: {
            connect: input.selectedCategoryIds.map((id) => ({ id })),
          },
          location: input.location,
          shortDescription: input.shortDescription,
          fullDescription: input.fullDescription,
          contactEmails: input.contactEmails,
          contactPhones: input.contactPhones,
          website: input.website,
          options: {
            connect: input.selectedOptions.map((id) => ({ id })),
          },
        },
      });

      if (!post) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error creating post!",
        });
      } else {
        return post;
      }
    }),
  getAllPostsForPages: publicProcedure.query(async ({ ctx }) => {
    const posts = (await ctx.prisma.companyPost.findMany()).map((item) => {
      return {
        id: item.id,
      };
    });

    return posts;
  }),
});
