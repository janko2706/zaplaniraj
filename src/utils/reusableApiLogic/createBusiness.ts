import type { PrismaClient, Prisma } from "@prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/library";
import { TRPCError } from "@trpc/server";

export const createBusiness = async (
  typeOfBusinessValue: string,
  businessName: string,
  userId: string,
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
) => {
  const typeOfBusiness = await prisma.businessTypeCategory.findFirst({
    where: {
      value: typeOfBusinessValue,
    },
  });
  if (!typeOfBusiness) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Business type doesn't exist",
    });
  }

  return await prisma.business.create({
    data: {
      name: businessName,
      typeOfBusiness: { connect: typeOfBusiness },
      freeTrial: false,
      user: { connect: { id: userId } },
      priceRange: 0,
    },
  });
};
