import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";
import { clerkClient } from "@clerk/nextjs/server";

export const userRouter = createTRPCRouter({
  setOnboarding: privateProcedure
    .input(
      z.object({
        onboardingLevel: z.string(),
        typeOfBusinessId: z.number().optional(),
        businessName: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const clerkId = ctx.userId;
      const user = await ctx.prisma.user.findFirst({
        where: {
          clerkId: clerkId,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "User does not exist",
        });
      }

      if (input.onboardingLevel === "welcome") {
        return ctx.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            onboarding: "welcome",
            isBussines: false,
          },
        });
      }

      if (input.onboardingLevel === "isBussines") {
        return ctx.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            onboarding: "businessDetails",
            isBussines: true,
          },
        });
      }
      if (input.onboardingLevel === "businessDetails") {
        if (input.typeOfBusinessId && input.businessName) {
          const newBusiness = await prisma.business.create({
            data: {
              name: input.businessName,
              typeOfBusiness: { connect: { id: input.typeOfBusinessId } },
              freeTrial: false,
              user: { connect: { id: user.id } },
            },
          });
          if (!newBusiness) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Business not created",
            });
          }
          return ctx.prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              onboarding: "payment",
            },
          });
        } else {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Missing data for creating company!",
          });
        }
      }

      return ctx.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          onboarding: "done",
          isBussines: false,
        },
      });
    }),
  createUser: privateProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.userId;

    return await ctx.prisma.user.create({
      data: {
        clerkId: userId ?? "",
        onboarding: "welcome",
        isBussines: false,
      },
    });
  }),
  deleteUser: privateProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.userId;
    try {
      await ctx.prisma.userPlan.deleteMany({
        where: { user: { clerkId: userId } },
      });
      const business = await ctx.prisma.business.findFirst({
        where: { user: { clerkId: userId } },
        include: { companyPost: { select: { statisticId: true } } },
      });

      if (
        business &&
        business.companyPostId &&
        business.stripeId &&
        business.companyPost &&
        business.companyPost.statisticId
      ) {
        await ctx.stripe.customers.del(business.stripeId);
        const testStatsDelete = await ctx.prisma.statistic.delete({
          where: { id: business.companyPost.statisticId },
        });
        console.log("Stats delete result", testStatsDelete);
        await ctx.prisma.postPrice.deleteMany({
          where: { companyPostId: business.companyPostId },
        });
        await ctx.prisma.review.deleteMany({
          where: {
            companyPostId: business.companyPostId,
          },
        });
      } else {
        await ctx.prisma.user.delete({
          where: {
            clerkId: userId,
          },
        });
      }
      await clerkClient.users.deleteUser(userId);
    } catch (_error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error deleting user",
      });
    }
  }),
  getUserByClerkId: privateProcedure.query(async ({ ctx }) => {
    const userId = ctx.userId;
    const res = await ctx.prisma.user.findFirst({
      where: {
        clerkId: userId,
      },
    });

    return res;
  }),
  getUserOnboarding: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.userId;
    if (!userId) {
      return "401";
    }
    const res = await ctx.prisma.user.findFirst({
      where: {
        clerkId: userId,
      },
    });
    return res?.onboarding;
  }),
  doesUserExist: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.userId;
    if (!userId) {
      return 400;
    }
    const res = await ctx.prisma.user.findFirst({
      where: {
        clerkId: userId,
      },
    });
    if (res) {
      return 200;
    } else return 300;
  }),
  setFavorite: privateProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const lastFavorites = await ctx.prisma.user.findFirst({
        where: {
          clerkId: ctx.userId,
        },
        select: {
          favorites: true,
        },
      });
      await ctx.prisma.user
        .update({
          where: {
            clerkId: ctx.userId,
          },
          data: {
            favorites:
              (lastFavorites?.favorites
                ? lastFavorites?.favorites + ","
                : undefined) + input.postId,
          },
        })
        .catch(() => {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong while setting favorite post...",
          });
        });
    }),
  removeFavorite: privateProcedure
    .input(
      z.object({
        postId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const lastFavorites = await ctx.prisma.user.findFirst({
        where: {
          clerkId: ctx.userId,
        },
        select: {
          favorites: true,
        },
      });
      const favoritesArray = lastFavorites?.favorites?.split(",");
      await ctx.prisma.user
        .update({
          where: {
            clerkId: ctx.userId,
          },
          data: {
            favorites: favoritesArray
              ?.map(Number)
              .filter((i) => i !== input.postId)
              .toString(),
          },
        })
        .catch(() => {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong while setting favorite post...",
          });
        });
    }),
});
