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
        companyDescription: z.string().optional(),
        serviceDescription: z.string().optional(),
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
        location: z.string().optional(),
        lat: z.number().optional(),
        lng: z.number().optional(),
        maximumPeople: z.number().optional(),
        earlisetAvailable: z.date().optional(),
        userCanVisit: z.boolean().optional(),
        tags: z
          .string()
          .array()
          .optional()
          .transform((arr) => {
            if (!arr) {
              return "";
            } else return arr.toString();
          }),
        parkingPlaces: z.number().optional(),
        offerPictures: z
          .string()
          .array()
          .optional()
          .transform((arr) => {
            if (!arr) {
              return "";
            } else return arr.toString();
          }),
        placeSize: z.string().optional(),
        contactPhones: z
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

        website: z.string().optional(),
        instagramLink: z.string().optional(),
        facebookLink: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { success } = await ratelimit.limit(ctx.userId);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
      const newStatistics = await ctx.prisma.statistic.create({});
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
          companyDescription: input.companyDescription,
          serviceDescription: input.serviceDescription,
          selectedCategoriesIds: {
            connect: input.selectedCategoryIds.map((id) => ({ id })),
          },
          pictures: input.pictures,
          location: input.location,
          lat: input.lat,
          lng: input.lng,
          maximumPeople: input.maximumPeople,
          earlisetAvailable: input.earlisetAvailable,
          userCanVisit: input.userCanVisit,
          tags: input.tags,
          parkingPlaces: input.parkingPlaces,
          offerPictures: input.offerPictures,
          placeSize: input.placeSize,
          contactPhones: input.contactPhones,
          contactEmails: input.contactEmails,
          website: input.website,
          instagramLink: input.instagramLink,
          facebookLink: input.facebookLink,
          statistics: {
            connect: {
              id: newStatistics.id,
            },
          },
        },
      });

      if (!post) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error creating post!",
        });
      } else {
        await ctx.prisma.business.update({
          where: {
            id: input.businessId,
          },
          data: {
            hasPost: true,
          },
        });
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
  getPostById: publicProcedure
    .input(
      z.object({
        postId: z.number(),
      })
    )
    .query(async ({ input, ctx }) => {
      const post = await ctx.prisma.companyPost.findFirst({
        where: {
          id: input.postId,
        },
        include: {
          reviews: {
            where: {
              companyPostId: input.postId,
            },
          },
          statistics: true,
        },
      });
      if (!post) {
        throw new TRPCError({
          message: `Post with id: ${input.postId}, does not exist.`,
          code: "NOT_FOUND",
        });
      }

      return post;
    }),
  getPostByCategory: publicProcedure
    .input(
      z.object({
        categoryValue: z.string(),
        categoryLabel: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const event = await ctx.prisma.eventCategory.findFirst({
          where: {
            label: input.categoryLabel,
            value: input.categoryValue,
          },
        });
        const posts = await ctx.prisma.companyPost.findMany({
          where: {
            selectedCategoriesIds: {
              some: {
                id: event?.id,
              },
            },
          },
        });
        return posts;
      } catch (error) {
        throw new TRPCError({
          message: "Something went wrong!",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
  updatePost: privateProcedure
    .input(
      z.object({
        id: z.number(),
        isPostLive: z.boolean().optional(),
        imageToDelete: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const currentPost = await ctx.prisma.companyPost.findUnique({
          where: {
            id: input.id,
          },
        });
        const currentPictureArray = currentPost?.pictures?.split(",");

        const updateResult = await ctx.prisma.companyPost.update({
          where: {
            id: input.id,
          },
          data: {
            isLive: input.isPostLive,
          },
          include: {
            statistics: true,
            reviews: {
              where: {
                companyPostId: input.id,
              },
            },
          },
        });
        return updateResult;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Post with id:${input.id} was not updated! With Error: ${
            error as string
          }`,
        });
      }
    }),
  deleteImageFromPost: privateProcedure
    .input(
      z.object({
        id: z.number(),
        imageToDelete: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const currentPost = await ctx.prisma.companyPost.findUnique({
          where: {
            id: input.id,
          },
        });
        if (!currentPost)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Could not find current post.",
          });
        const newPictureString = currentPost.pictures
          ?.split(",")
          .filter((i) => i !== input.imageToDelete)
          .toString();

        await ctx.prisma.companyPost.update({
          where: {
            id: input.id,
          },
          data: {
            pictures: newPictureString,
          },
        });
        return 200;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Post with id:${input.id} was not updated! With Error: ${
            error as string
          }`,
        });
      }
    }),
});
