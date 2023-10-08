import { env } from "~/env.mjs";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const stripeRouter = createTRPCRouter({
  createCheckoutSession: privateProcedure
    .input(
      z.object({
        priceId: z.string(),
        businessId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { stripe } = ctx;

      const newStripeCustomer = await stripe.customers.create({});
      const businessToUpdate = await ctx.prisma.business.update({
        where: {
          id: input.businessId,
        },
        data: {
          stripeId: newStripeCustomer.id,
        },
      });

      if (!businessToUpdate) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No business found with given ID!",
        });
      }
      const checkoutSession = await stripe.checkout.sessions.create({
        customer: newStripeCustomer.id,
        mode: "subscription",
        line_items: [
          {
            price: input.priceId,
            quantity: 1,
          },
        ],
        success_url: `${env.NEXT_PUBLIC_WEBSITE_URL}/company/dashboard`,
        cancel_url: `${env.NEXT_PUBLIC_WEBSITE_URL}/onboarding/company/payment?success=false`,
      });

      if (!checkoutSession) {
        throw new Error("Could not create checkout session");
      }

      return { checkoutUrl: checkoutSession.url };
    }),
  createBillingPortalSession: publicProcedure.mutation(async ({ ctx }) => {
    const { stripe } = ctx;

    const stripeBillingPortalSession =
      await stripe.billingPortal.sessions.create({
        customer: "cus_OZ8NCJaHCG0Ash",
        return_url: `${env.NEXT_PUBLIC_WEBSITE_URL}/onboarding/company`,
      });

    if (!stripeBillingPortalSession) {
      throw new Error("Could not create billing portal session");
    }

    return { billingPortalUrl: stripeBillingPortalSession.url };
  }),
});
