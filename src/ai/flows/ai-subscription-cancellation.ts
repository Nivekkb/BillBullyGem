'use server';
/**
 * @fileOverview An AI agent for generating tailored subscription cancellation requests.
 *
 * - generateCancellationRequest - A function that generates cancellation requests for subscriptions.
 * - GenerateCancellationRequestInput - The input type for the generateCancellationRequest function.
 * - GenerateCancellationRequestOutput - The return type for the generateCancellationRequest function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCancellationRequestInputSchema = z.object({
  subscriptionName: z.string().describe('The name of the subscription to cancel.'),
  reason: z.string().describe('The reason for cancelling the subscription.'),
  additionalDetails: z.string().optional().describe('Any additional details to include in the cancellation request.'),
});
export type GenerateCancellationRequestInput = z.infer<typeof GenerateCancellationRequestInputSchema>;

const GenerateCancellationRequestOutputSchema = z.object({
  cancellationRequest: z.string().describe('The generated cancellation request.'),
});
export type GenerateCancellationRequestOutput = z.infer<typeof GenerateCancellationRequestOutputSchema>;

export async function generateCancellationRequest(input: GenerateCancellationRequestInput): Promise<GenerateCancellationRequestOutput> {
  return generateCancellationRequestFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCancellationRequestPrompt',
  input: {schema: GenerateCancellationRequestInputSchema},
  output: {schema: GenerateCancellationRequestOutputSchema},
  prompt: `You are an AI assistant specialized in generating cancellation requests for subscriptions.  You will generate a cancellation request based on the provided information.

  Subscription Name: {{{subscriptionName}}}
  Reason: {{{reason}}}
  Additional Details: {{{additionalDetails}}}

  Write a polite and professional cancellation request, ensuring that it clearly states the intention to cancel the subscription and includes the provided reason and any additional details.
`,
});

const generateCancellationRequestFlow = ai.defineFlow(
  {
    name: 'generateCancellationRequestFlow',
    inputSchema: GenerateCancellationRequestInputSchema,
    outputSchema: GenerateCancellationRequestOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
