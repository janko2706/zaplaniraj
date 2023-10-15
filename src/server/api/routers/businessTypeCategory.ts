import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const businessTypeCategoryRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx }) => {
    const categories = await ctx.prisma.businessTypeCategory.findMany();
    if (!categories) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "No categories found!",
      });
    }
    return categories;
  }),
  getAllEventCategories: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.prisma.eventCategory.findMany();
    if (!categories) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "No categories found!",
      });
    }
    return categories;
  }),
});
