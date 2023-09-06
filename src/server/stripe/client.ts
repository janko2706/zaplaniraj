import Stripe from "stripe";

// TODO add envs for stripe
export const stripe = new Stripe(
  "sk_test_51NkQalLlVV4ETbZO3rkCp5x3L2N65zAPpWT6io8zRO1hgadkEj7FZDcMa0eUB14AiQAau9dLmZYwqchBYNee7Vuo00KigSnB1k",
  {
    apiVersion: "2023-08-16",
  }
);
