import { env } from "~/env.mjs";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { clerkClient } from "@clerk/nextjs";

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
      const email = (await clerkClient.users.getUser(ctx.userId))
        .emailAddresses[0]?.emailAddress;

      const newStripeCustomer = await stripe.customers.create({ email });
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
        billing_address_collection: "auto",
        customer_update: { name: "auto", address: "auto" },
        tax_id_collection: {
          enabled: true,
        },
        currency: "EUR",
        locale: "hr",
        line_items: [
          {
            price: input.priceId,
            quantity: 1,
          },
        ],
        success_url: `${env.NEXT_PUBLIC_WEBSITE_URL}`,
        cancel_url: `${env.NEXT_PUBLIC_WEBSITE_URL}/onboarding/company/payment?success=false`,
      });

      if (!checkoutSession) {
        throw new Error("Could not create checkout session");
      }

      return { checkoutUrl: checkoutSession.url };
    }),
  createBillingPortalSession: privateProcedure.query(async ({ ctx }) => {
    const { stripe } = ctx;

    const company = await ctx.prisma.business.findFirst({
      where: { user: { clerkId: ctx.userId } },
      select: { stripeId: true },
    });
    if (!company?.stripeId) {
      throw new Error("Could not create billing portal session");
    }

    const stripeBillingPortalSession =
      await stripe.billingPortal.sessions.create({
        customer: company.stripeId,
        return_url: `${env.NEXT_PUBLIC_WEBSITE_URL}/`,
        locale: "hr",
      });

    if (!stripeBillingPortalSession) {
      throw new Error("Could not create billing portal session");
    }

    return { billingPortalUrl: stripeBillingPortalSession.url };
  }),
});
