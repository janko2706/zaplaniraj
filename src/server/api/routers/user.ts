import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";

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
  getAllForPages: publicProcedure.query(async ({ ctx }) => {
    const res = await ctx.prisma.user
      .findMany({
        where: {
          isBussines: false,
        },
      })
      .then((result) => {
        return result.map((user) => {
          return {
            id: user.clerkId,
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
});
