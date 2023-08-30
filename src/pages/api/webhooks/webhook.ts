import type { IncomingHttpHeaders } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import type { WebhookRequiredHeaders } from "svix";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs";
import { Webhook } from "svix";

const webhookSecret: string = process.env.WEBHOOK_SECRET ?? "";

export default async function handler(
  req: NextApiRequestWithSvixRequiredHeaders,
  res: NextApiResponse
) {
  const payload = JSON.stringify(req.body);
  const headers = req.headers;

  // Create a new Webhook instance with your webhook secret
  const wh = new Webhook(webhookSecret);
  let evt: WebhookEvent;
  try {
    // Verify the webhook payload and headers
    evt = (await wh.verify(payload, headers)) as WebhookEvent;
    if (evt) {
      res.status(200).json({ Response: "all good" });
    }
  } catch (_) {
    // If the verification fails, return a 400 error
    return res.status(400).json({ message: "verification failed" });
  }
}

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
  headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};
