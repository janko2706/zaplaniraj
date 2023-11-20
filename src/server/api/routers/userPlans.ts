import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

const PlanProgress = ["INPROGRESS", "COMPLETED"] as const;
const PlanCategory = [
  "WEDDING",
  "SACRAMENT",
  "BIRTHDAY",
  "CELEBRATION",
] as const;

export const userPlansRouter = createTRPCRouter({
  getUserPlans: privateProcedure.query(async ({ ctx }) => {
    const userPlans = await ctx.prisma.userPlan
      .findMany({
        where: {
          user: {
            clerkId: ctx.userId,
          },
        },
      })
      .catch(() => {
        throw new TRPCError({
          message: "Error while searching for user plans",
          code: "INTERNAL_SERVER_ERROR",
        });
      });

    if (!userPlans) {
      throw new TRPCError({
        message:
          "Something went wrong while searching for user plans. Wanted [], got undefined",
        code: "NOT_FOUND",
      });
    }

    return userPlans;
  }),
  createUserPlans: privateProcedure
    .input(
      z.object({
        name: z.string(),
        planCategory: z.enum(PlanCategory),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const newPlan = await ctx.prisma.userPlan
        .create({
          data: {
            name: input.name,
            category: input.planCategory,
            user: {
              connect: {
                clerkId: ctx.userId,
              },
            },
          },
        })
        .catch(() => {
          throw new TRPCError({
            message: "Error while creating plan",
            code: "INTERNAL_SERVER_ERROR",
          });
        });

      return newPlan.id;
    }),

  deleteUserPlan: privateProcedure
    .input(
      z.object({
        planId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const deletePlan = await ctx.prisma.userPlan
        .delete({
          where: {
            id: input.planId,
          },
        })
        .catch(() => {
          throw new TRPCError({
            message: "Error while deleting plan",
            code: "INTERNAL_SERVER_ERROR",
          });
        });
      return deletePlan;
    }),
  updateUserPlan: privateProcedure
    .input(
      z.object({
        planId: z.string(),
        color: z.string().optional(),
        progress: z.enum(PlanProgress).optional(),
        name: z.string().optional(),
        budget: z.number().optional(),
        companyPostId: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const updatedPlan = await ctx.prisma.userPlan
        .update({
          where: {
            id: input.planId,
          },
          data: {
            budget: input.budget,
            progress: input.progress,
            name: input.name,
            color: input.color,
          },
        })
        .catch(() => {
          throw new TRPCError({
            message: "Error while updating plan",
            code: "INTERNAL_SERVER_ERROR",
          });
        });
      return updatedPlan;
    }),
  connectPlanWithPost: privateProcedure
    .input(
      z.object({
        planId: z.string(),
        companyPostId: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const updatedPlan = await ctx.prisma.userPlan
        .update({
          where: {
            id: input.planId,
          },
          data: {
            businessesInPlan: {
              connect: {
                id: input.companyPostId,
              },
            },
          },
        })
        .catch(() => {
          throw new TRPCError({
            message: "Error while adding post to plan plan",
            code: "INTERNAL_SERVER_ERROR",
          });
        });
      return updatedPlan;
    }),
  disconnectPlanWithPost: privateProcedure
    .input(
      z.object({
        planId: z.string(),
        companyPostId: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const updatedPlan = await ctx.prisma.userPlan
        .update({
          where: {
            id: input.planId,
          },
          data: {
            businessesInPlan: {
              disconnect: {
                id: input.companyPostId,
              },
            },
          },
        })
        .catch(() => {
          throw new TRPCError({
            message: "Error while adding post to plan plan",
            code: "INTERNAL_SERVER_ERROR",
          });
        });
      return updatedPlan;
    }),
});
