import { env } from "~/env.mjs";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const stripeRouter = createTRPCRouter({
  createCheckoutSession: publicProcedure.mutation(async ({ ctx }) => {
    const { stripe } = ctx;

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: "cus_OZ8NCJaHCG0Ash",
      mode: "subscription",
      line_items: [
        {
          price: "price_1NnKsCLlVV4ETbZO1222v7qx",
          quantity: 1,
        },
      ],
      success_url: `${env.NEXT_PUBLIC_WEBSITE_URL}?success=true`,
      cancel_url: `${env.NEXT_PUBLIC_WEBSITE_URL}/onboarding/company`,
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
