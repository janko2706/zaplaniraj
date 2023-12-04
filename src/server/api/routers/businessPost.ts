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

const sortOpts = ["asc", "desc"] as const;

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
        include: {
          selectedCategoriesIds: true,
          prices: true,
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
            take: 10,
          },
          prices: {
            where: { companyPostId: input.postId },
          },
          statistics: true,
          selectedCategoriesIds: true,
          business: {
            include: {
              user: true,
            },
          },
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
        categoryLabel: z.string(),
        businessTypeLabel: z.string(),
        skip: z.number(),
        take: z.number().default(10).optional(),
        filterPriceMin: z.number().optional(),
        filterPriceMax: z.number().optional(),
        sortPrice: z.enum(sortOpts).optional(),
        sortNew: z.enum(sortOpts).optional(),
        sortPopular: z.enum(sortOpts).optional(),
        filterTitle: z.string().optional(),
        filterPlace: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const posts = await ctx.prisma.companyPost.findMany({
          where: {
            title: {
              contains: input.filterTitle,
            },
            location: {
              contains: input.filterPlace,
            },
            isLive: true,
            priceRangeMax: {
              lte: input.filterPriceMax,
            },
            priceRangeMin: {
              gte: input.filterPriceMin,
            },
            selectedCategoriesIds: {
              some: {
                label: input.categoryLabel,
                value: input.categoryLabel,
              },
            },
            business: {
              typeOfBusiness: {
                label: input.businessTypeLabel,
                value: input.businessTypeLabel,
              },
            },
          },
          orderBy: [
            { priceRangeMax: input.sortPrice },
            {
              business: {
                user: {
                  createdAt: input.sortNew,
                },
              },
            },
            {
              statistics: {
                visitors: input.sortPopular,
              },
            },
          ],
          take: input.take,
          skip: input.skip,
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
        title: z.string().optional(),
        priceRangeMin: z.number().optional().nullable(),
        priceRangeMax: z.number().optional().nullable(),
        companyDescription: z.string().optional().nullable(),
        serviceDescription: z.string().optional().nullable(),
        selectedCategoryIds: z.number().array().optional().nullable(),
        prices: z
          .array(
            z.object({
              id: z.number(),
              name: z.string(),
              price: z.number(),
              unit: z.string(),
              maximum: z.number(),
            })
          )
          .optional(),
        pictures: z
          .string()
          .array()
          .optional()
          .nullable()
          .transform((arr) => {
            if (!arr) {
              return "";
            } else return arr.toString();
          }),
        location: z.string().optional().nullable(),
        lat: z.number().optional().nullable(),
        lng: z.number().optional().nullable(),
        maximumPeople: z.number().optional().nullable(),
        earlisetAvailable: z.string().optional().nullable(),
        userCanVisit: z.boolean().optional().nullable(),
        tags: z
          .string()
          .array()
          .optional()
          .nullable()
          .transform((arr) => {
            if (!arr) {
              return "";
            } else return arr.toString();
          }),
        parkingPlaces: z.number().optional().nullable(),
        offerPictures: z
          .string()
          .array()
          .optional()
          .nullable()
          .transform((arr) => {
            if (!arr) {
              return "";
            } else return arr.toString();
          }),
        placeSize: z.string().optional().nullable(),
        contactPhones: z
          .string()
          .array()
          .optional()
          .nullable()
          .transform((arr) => {
            if (!arr) {
              return "";
            } else return arr.toString();
          }),
        contactEmails: z
          .string()
          .array()
          .optional()
          .nullable()
          .transform((arr) => {
            if (!arr) {
              return "";
            } else return arr.toString();
          }),

        website: z.string().optional().nullable(),
        instagramLink: z.string().optional().nullable(),
        facebookLink: z.string().optional().nullable(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        if (input.prices?.length) {
          input.prices.map(async (item) => {
            await ctx.prisma.postPrice.update({
              where: {
                id: item.id,
              },
              data: {
                name: item.name,
                price: item.price,
                maximum: item.maximum,
                unit: item.unit,
              },
            });
          });
        }
        const updatedPost = await ctx.prisma.companyPost.update({
          where: {
            id: input.id,
          },
          data: {
            title: input.title,
            priceRangeMax: input.priceRangeMax,
            priceRangeMin: input.priceRangeMin,
            companyDescription: input.companyDescription,
            serviceDescription: input.serviceDescription,
            selectedCategoriesIds: {
              connect: input.selectedCategoryIds?.map((id) => ({ id })),
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
            isLive: input.isPostLive,
          },
          include: {
            statistics: true,
            selectedCategoriesIds: true,
            prices: true,
            reviews: {
              where: {
                companyPostId: input.id,
              },
            },
          },
        });
        return updatedPost;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Post with id:${input.id} was not updated! With Error: ${
            error as string
          }`,
        });
      }
    }),
  createPostPrice: privateProcedure
    .input(
      z.object({
        name: z.string(),
        price: z.number(),
        unit: z.string(),
        maximum: z.number(),
        postId: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const newPost = await ctx.prisma.postPrice.create({
          data: {
            name: input.name,
            price: input.price,
            maximum: input.maximum,
            unit: input.unit,
            CompanyPost: {
              connect: {
                id: input.postId,
              },
            },
          },
        });
        return newPost;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Price was not created! With Error: ${error as string}`,
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
        const newOfferPictureString = currentPost.offerPictures
          ?.split(",")
          .filter((i) => i !== input.imageToDelete)
          .toString();

        await ctx.prisma.companyPost.update({
          where: {
            id: input.id,
          },
          data: {
            pictures: newPictureString,
            offerPictures: newOfferPictureString,
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
  getFavoritePosts: privateProcedure.query(async ({ ctx }) => {
    const userFavorties = await ctx.prisma.user.findFirst({
      where: {
        clerkId: ctx.userId,
      },
      select: { favorites: true },
    });
    if (!userFavorties?.favorites?.split(",").map(Number)) return [];
    const favorites = await ctx.prisma.companyPost.findMany({
      where: {
        id: { in: userFavorties?.favorites?.split(",").map(Number) },
      },
      include: {
        business: {
          include: {
            typeOfBusiness: true,
          },
        },
      },
    });

    return favorites;
  }),
  createPostReview: privateProcedure
    .input(
      z.object({
        stars: z.number(),
        reviewText: z.string(),
        postId: z.number(),
        userName: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const newReview = await ctx.prisma.review
        .create({
          data: {
            starts: input.stars,
            reviewText: input.reviewText,
            userName: input.userName,
            likes: 0,
            CompanyPost: {
              connect: {
                id: input.postId,
              },
            },
          },
        })
        .catch(() => {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong while creating a review.",
          });
        });
      const allTheReviews = await ctx.prisma.review.findMany({
        where: {
          companyPostId: input.postId,
        },
        select: {
          starts: true,
        },
      });
      const forAverage = allTheReviews
        .map((item) => {
          return item.starts;
        })
        .reduce((partialSum, a) => partialSum + a, 0);
      const post = await ctx.prisma.companyPost.findFirstOrThrow({
        where: {
          id: input.postId,
        },
        select: {
          statisticId: true,
        },
      });
      const oldStats = await ctx.prisma.statistic.findFirstOrThrow({
        where: {
          id: post.statisticId,
        },
        select: {
          numberOfReviews: true,
        },
      });
      await ctx.prisma.statistic.update({
        where: {
          id: post.statisticId,
        },
        data: {
          numberOfReviews: oldStats.numberOfReviews + 1,
          averageReviewGrade: forAverage / allTheReviews.length,
        },
      });
      return newReview;
    }),
});
