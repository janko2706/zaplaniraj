import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

const PlanProgress = ["INPROGRESS", "COMPLETED"] as const;
const PlanCategory = ["VJENCANJE", "RODENDAN", "SAKRAMENT", "SLAVLJE"] as const;

export const userPlansRouter = createTRPCRouter({
  getById: privateProcedure
    .input(z.object({ planId: z.string() }))
    .query(async ({ ctx, input }) => {
      const userPlan = await ctx.prisma.userPlan
        .findFirst({
          where: {
            id: input.planId,
          },
          include: {
            tasks: {
              include: {
                forWhat: true,
              },
            },
            businessesInPlan: {
              include: {
                business: {
                  include: {
                    typeOfBusiness: true,
                  },
                },
              },
            },
            dateItem: true,
            budgetItem: true,
          },
        })
        .catch(() => {
          throw new TRPCError({
            message: "Error while searching for user plans",
            code: "INTERNAL_SERVER_ERROR",
          });
        });

      if (!userPlan) {
        throw new TRPCError({
          message:
            "Something went wrong while searching for user plans. Wanted [], got undefined",
          code: "NOT_FOUND",
        });
      }

      return userPlan;
    }),
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

      return newPlan;
    }),

  deleteUserPlan: privateProcedure
    .input(
      z.object({
        planId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.userPlan
        .delete({
          where: {
            id: input.planId,
          },
        })
        .then(async () => {
          const newData = await ctx.prisma.userPlan.findMany({
            where: {
              user: {
                clerkId: ctx.userId,
              },
            },
          });
          return newData;
        })
        .catch(() => {
          throw new TRPCError({
            message: "Error while deleting plan",
            code: "INTERNAL_SERVER_ERROR",
          });
        });
    }),
  updateUserPlan: privateProcedure
    .input(
      z.object({
        planId: z.string(),
        color: z.string().optional(),
        progress: z.enum(PlanProgress).optional(),
        name: z.string().optional(),
        budget: z.number().optional(),
        budgets: z
          .array(
            z.object({
              id: z.number(),
              title: z.string(),
              userPlanId: z.string().nullable(),
              price: z.number(),
            })
          )
          .optional(),
        dates: z
          .array(
            z.object({
              id: z.number(),
              userPlanId: z.string().nullable(),
              title: z.string(),
              date: z.string(),
            })
          )
          .optional(),
        tasks: z
          .array(
            z.object({
              id: z.number(),
              content: z.string(),
              status: z.enum(PlanProgress),
              forWhat: z.object({
                id: z.number(),
                value: z.string(),
                label: z.string(),
              }),
              userPlanId: z.string(),
              BusinessTypeCategoryId: z.number().nullable(),
            })
          )
          .optional(),
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
          include: {
            tasks: {
              include: {
                forWhat: true,
              },
            },
            businessesInPlan: {
              include: {
                business: {
                  include: {
                    typeOfBusiness: true,
                  },
                },
              },
            },
            dateItem: true,
            budgetItem: true,
          },
        })
        .catch(() => {
          throw new TRPCError({
            message: "Error while updating plan",
            code: "INTERNAL_SERVER_ERROR",
          });
        });
      if (input.tasks?.length) {
        input.tasks.map(async (item) => {
          await ctx.prisma.planTask.update({
            where: {
              id: item.id,
            },
            data: {
              content: item.content,
              status: item.status,
            },
          });
        });
      }
      if (input.dates?.length) {
        input.dates.map(async (item) => {
          await ctx.prisma.planDateItem.update({
            where: {
              id: item.id,
            },
            data: {
              title: item.title,
              date: item.date,
            },
          });
        });
      }
      if (input.budgets?.length) {
        input.budgets.map(async (item) => {
          await ctx.prisma.planBudgetItem.update({
            where: {
              id: item.id,
            },
            data: {
              title: item.title,
              price: item.price,
            },
          });
        });
      }

      return {
        ...updatedPlan,
        dateItem: input.dates ?? [],
        budgetItem: input.budgets ?? [],
        tasks: input.tasks ?? [],
      };
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
  createUserTask: privateProcedure
    .input(
      z.object({
        planId: z.string(),
        content: z.string(),
        forWhat: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const newTask = await ctx.prisma.planTask
        .create({
          data: {
            content: input.content,
            UserPlan: {
              connect: {
                id: input.planId,
              },
            },
            forWhat: {
              connect: {
                id: input.forWhat,
              },
            },
          },
          include: {
            forWhat: true,
          },
        })
        .catch(() => {
          throw new TRPCError({
            message: "Error while creating plan task.",
            code: "INTERNAL_SERVER_ERROR",
          });
        });
      return {
        id: newTask.id,
        content: newTask.content,
        isCompleted: newTask.status === "COMPLETED" ? true : false,
        forWhat: newTask.forWhat?.value,
      };
    }),
  deleteUserTask: privateProcedure
    .input(
      z.object({
        taskId: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.planTask
        .delete({
          where: {
            id: input.taskId,
          },
        })
        .catch(() => {
          throw new TRPCError({
            message: "Error while creating plan task.",
            code: "INTERNAL_SERVER_ERROR",
          });
        });
    }),
  createUserDateItem: privateProcedure
    .input(
      z.object({
        planId: z.string(),
        title: z.string(),
        date: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const newDateItem = await ctx.prisma.planDateItem
        .create({
          data: {
            title: input.title,
            date: input.date,
            UserPlan: {
              connect: {
                id: input.planId,
              },
            },
          },
        })
        .catch(() => {
          throw new TRPCError({
            message: "Error while creating plan date item.",
            code: "INTERNAL_SERVER_ERROR",
          });
        });
      return newDateItem;
    }),
  deleteUserDateItem: privateProcedure
    .input(
      z.object({
        dateItemId: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.planDateItem
        .delete({
          where: {
            id: input.dateItemId,
          },
        })
        .catch(() => {
          throw new TRPCError({
            message: "Error while deleting plan date item.",
            code: "INTERNAL_SERVER_ERROR",
          });
        });
    }),
  createUserBudgetItem: privateProcedure
    .input(
      z.object({
        planId: z.string(),
        title: z.string(),
        budget: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const newBudgetItem = await ctx.prisma.planBudgetItem
        .create({
          data: {
            title: input.title,
            price: input.budget,
            UserPlan: {
              connect: {
                id: input.planId,
              },
            },
          },
        })
        .catch(() => {
          throw new TRPCError({
            message: "Error while creating plan budget item.",
            code: "INTERNAL_SERVER_ERROR",
          });
        });
      return newBudgetItem;
    }),
  deleteUserBudgetItem: privateProcedure
    .input(
      z.object({
        planBudgetId: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.planBudgetItem
        .delete({
          where: {
            id: input.planBudgetId,
          },
        })
        .catch(() => {
          throw new TRPCError({
            message: "Error while deleteing plan budget item.",
            code: "INTERNAL_SERVER_ERROR",
          });
        });
    }),
});
