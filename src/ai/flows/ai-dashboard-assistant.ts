"use server";

import { ai } from "@/ai/genkit";
import { z } from "genkit";

const BillSchema = z.object({
  companyName: z.string().optional(),
  category: z.string().optional(),
  status: z.string().optional(),
  currentAmount: z.number().optional(),
  savingsAmount: z.number().optional(),
  createdAt: z.string().optional(),
});

const CreditItemSchema = z.object({
  bureau: z.string().optional(),
  accountName: z.string().optional(),
  type: z.string().optional(),
  status: z.string().optional(),
  disputeDate: z.string().optional(),
});

const SubscriptionSchema = z.object({
  serviceName: z.string().optional(),
  amount: z.number().optional(),
  billingFrequency: z.string().optional(),
  status: z.string().optional(),
  createdAt: z.string().optional(),
});

const AssistantInputSchema = z.object({
  prompt: z.string(),
  context: z.object({
    bills: z.array(BillSchema),
    creditItems: z.array(CreditItemSchema),
    subscriptions: z.array(SubscriptionSchema),
    complianceChecks: z.array(
      z.object({
        featureDescription: z.string().optional(),
        relevantLaws: z.string().optional(),
        isCompliant: z.boolean().optional(),
        complianceRationale: z.string().optional(),
        suggestedAdjustments: z.string().optional(),
        createdAt: z.string().optional(),
      })
    ),
  }),
});

const AssistantOutputSchema = z.object({
  reply: z.string(),
});

export type DashboardAssistantInput = z.infer<typeof AssistantInputSchema>;
export type DashboardAssistantOutput = z.infer<typeof AssistantOutputSchema>;

export async function dashboardAssistant(
  input: DashboardAssistantInput
): Promise<DashboardAssistantOutput> {
  const hasKey =
    Boolean(process.env.GOOGLE_API_KEY) ||
    Boolean(process.env.GOOGLE_GENAI_API_KEY);

  if (!hasKey) {
    return {
      reply:
        "AI coaching is temporarily unavailable because the API key is missing. Please try again later.",
    };
  }

  try {
    return await dashboardAssistantFlow(input);
  } catch (error) {
    console.error("dashboardAssistantFlow failed", error);
    return {
      reply:
        "I hit a snag talking to the AI service. Please try again in a moment.",
    };
  }
}

const prompt = ai.definePrompt({
  name: "dashboardAssistantPrompt",
  input: { schema: AssistantInputSchema },
  output: { schema: AssistantOutputSchema },
  prompt: `You are BillBully's AI coach. Be concise, helpful, and grounded.
Use only the user's provided context data. If the context is missing, say so and ask a follow-up.

User request:
{{{prompt}}}

Context data (JSON):
{{{context}}}

Reply with a short, clear answer and suggested next steps if relevant.`,
});

const dashboardAssistantFlow = ai.defineFlow(
  {
    name: "dashboardAssistantFlow",
    inputSchema: AssistantInputSchema,
    outputSchema: AssistantOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
