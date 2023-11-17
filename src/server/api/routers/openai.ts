import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import openai from "~/utils/openapi";

export const openaiRouter = createTRPCRouter({
  getTagsFromMessages: publicProcedure
    .input(
      z.object({
        query: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: input.query ?? "",
              },
            ],
          },
        ],
        max_tokens: 7,
      });
      return response.choices[0]?.message.content;
    }),
  getMoodFromDescription: publicProcedure
    .input(
      z.object({
        descriptionOfComapny: z.string().optional(),
        descriptionOfService: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Ovo je opis poslovanja: ${
                  input.descriptionOfComapny ?? "nedostupno"
                }, te je ovo opis usluge koju isto poslovanje nudi: ${
                  input.descriptionOfService ?? "nedostupno"
                }. Koje 4 rijeci najbolje opisuju ovo poslovanje? Ako je opis poslovanja ili usluge: nedostupno, molim te vrati samo: nedostupno.`,
              },
            ],
          },
        ],
        max_tokens: 7,
      });
      return response.choices[0]?.message.content;
    }),
});
