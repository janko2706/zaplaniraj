import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

const PlanProgress = ["INPROGRESS", "COMPLETED"] as const;

export const userPlansRouter = createTRPCRouter({
  getUserPlans: privateProcedure
    .input(
      z.object({
        query: z.string().optional(),
      })
    )
    .query(async ({ ctx }) => {
      const userPlans = await ctx.prisma.user
        .findFirst({
          where: {
            clerkId: ctx.userId,
          },
          select: {
            userPlans: {
              include: {
                businessesInPlan: true,
              },
            },
          },
        })
        .catch(() => {
          throw new TRPCError({
            message: "Error while searching for user plans",
            code: "INTERNAL_SERVER_ERROR",
          });
        });

      if (!userPlans) return { message: "User doesnt have any plans yet" };

      return userPlans;
    }),
  createUserPlans: privateProcedure
    .input(
      z.object({
        color: z.string().optional(),
        name: z.string(),
        budget: z.number(),
        companyPostId: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const createdPlan = await ctx.prisma.user
        .update({
          where: {
            clerkId: ctx.userId,
          },
          data: {
            userPlans: {
              create: [
                {
                  color: input.color ?? "blue-400",
                  budget: input.budget,
                  name: input.name,
                },
              ],
            },
          },
        })
        .catch(() => {
          throw new TRPCError({
            message: "Error while creating plan",
            code: "INTERNAL_SERVER_ERROR",
          });
        });

      return createdPlan.id;
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
