import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { createBusiness } from "~/utils/reusableApiLogic/createBusiness";

export const userRouter = createTRPCRouter({
  setOnboarding: privateProcedure
    .input(
      z.object({
        onboardingLevel: z.string(),
        typeOfBusinessValue: z.string().optional(),
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
        if (input.typeOfBusinessValue && input.businessName) {
          await createBusiness(
            input.typeOfBusinessValue,
            input.businessName,
            user.id,
            ctx.prisma
          );
          return ctx.prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              onboarding: "done",
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
  createUser: publicProcedure.mutation(({ ctx }) => {
    const userId = ctx.userId;
    return ctx.prisma.user.create({
      data: {
        clerkId: userId ?? "asdas",
        onboarding: "welcome",
        isBussines: false,
      },
    });
  }),
  getAllForPages: publicProcedure.query(async ({ ctx }) => {
    const res = await ctx.prisma.user
      .findMany()
      .then((result) => {
        return result.map((user) => {
          return {
            id: user.clerkId,
            isBusiness: user.isBussines,
          };
        });
      })
      .catch((err) => console.log(err));

    return res;
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
      return 200;
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
});
