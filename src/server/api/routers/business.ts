import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { createBusiness } from "~/utils/reusableApiLogic/createBusiness";

export const businessRouter = createTRPCRouter({
  createBusiness: privateProcedure
    .input(
      z.object({
        typeOfBusinessValue: z.string(),
        businessName: z.string(),
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
      return await createBusiness(
        input.typeOfBusinessValue,
        input.businessName,
        user.id,
        ctx.prisma
      );
    }),
});
