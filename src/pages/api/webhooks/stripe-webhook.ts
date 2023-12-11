/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { buffer } from "micro";
import type { NextApiRequest, NextApiResponse } from "next";
import type Stripe from "stripe";
import { stripe } from "../../../server/stripe/client";
import { prisma } from "~/server/db";

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

type stripeCustomer = {
  customer?: string;
};

const webhookSecret =
  "whsec_6c046cfc11f7713b6201e3f1b50a840f19e33dbad981786f2ebb3bb5b0003e57";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const buf: Buffer = await buffer(req);
    const sig = req.headers["stripe-signature"];

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig as string, webhookSecret);

      // Handle the event
      switch (event.type) {
        case "customer.subscription.created":
          // Used to provision services as they are added to a subscription.
          console.log("subscription created");
          break;
        case "customer.subscription.updated":
          // Used to provision services as they are updated.
          const stripeCustomer: stripeCustomer = event.data.object;
          const business = await prisma.business.update({
            where: { stripeId: stripeCustomer.customer },
            data: { user: { update: { onboarding: "done" } }, hasPost: true },
          });
          await prisma.companyPost.create({
            data: {
              title: business.name,
              isLive: false,
              statistics: { create: {} },
              business: { connect: { id: business.id } },
            },
          });
          break;
        case "invoice.payment_failed":
          // If the payment fails or the customer does not have a valid payment method,
          //  an invoice.payment_failed event is sent, the subscription becomes past_due.
          // Use this webhook to notify your user that their payment has
          // failed and to retrieve new card details.
          // Can also have Stripe send an email to the customer notifying them of the failure. See settings: https://dashboard.stripe.com/settings/billing/automatic
          break;
        case "customer.subscription.deleted":
          // handle subscription cancelled automatically based
          // upon your subscription settings.
          console.log("subscription deleted");

          break;
        default:
        // Unexpected event type
      }

      res.json({ received: true });
    } catch (err) {
      res.status(400).send(err);
      return;
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
