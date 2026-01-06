'use server';

/**
 * @fileOverview Analyzes uploaded credit bureau responses to understand dispute outcomes and determine next steps.
 *
 * - analyzeUploadedCreditBureauResponses - A function that handles the analysis of credit bureau responses.
 * - AnalyzeUploadedCreditBureauResponsesInput - The input type for the analyzeUploadedCreditBureauResponses function.
 * - AnalyzeUploadedCreditBureauResponsesOutput - The return type for the analyzeUploadedCreditBureauResponses function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeUploadedCreditBureauResponsesInputSchema = z.object({
  creditBureauResponseDataUri: z
    .string()
    .describe(
      "A data URI containing the credit bureau's response document (e.g., PDF or image), that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  userDisputeDetails: z
    .string()
    .describe(
      'Details of the original dispute submitted by the user, including the disputed items and reasons for dispute.'
    ),
});

export type AnalyzeUploadedCreditBureauResponsesInput = z.infer<
  typeof AnalyzeUploadedCreditBureauResponsesInputSchema
>;

const AnalyzeUploadedCreditBureauResponsesOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the credit bureau response.'),
  disputeOutcomes: z
    .array(z.string())
    .describe('An array of outcomes for each disputed item (e.g., deleted, verified, updated).'),
  nextSteps: z
    .string()
    .describe(
      'Recommended next steps for the user based on the dispute outcomes (e.g., escalate dispute, provide more evidence).'
    ),
});

export type AnalyzeUploadedCreditBureauResponsesOutput = z.infer<
  typeof AnalyzeUploadedCreditBureauResponsesOutputSchema
>;

export async function analyzeUploadedCreditBureauResponses(
  input: AnalyzeUploadedCreditBureauResponsesInput
): Promise<AnalyzeUploadedCreditBureauResponsesOutput> {
  return analyzeUploadedCreditBureauResponsesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeUploadedCreditBureauResponsesPrompt',
  input: {schema: AnalyzeUploadedCreditBureauResponsesInputSchema},
  output: {schema: AnalyzeUploadedCreditBureauResponsesOutputSchema},
  prompt: `You are an AI assistant specializing in analyzing credit bureau responses to user disputes.

  Analyze the credit bureau's response document and the user's original dispute details to determine the outcome of each disputed item and recommend next steps for the user.

  Credit Bureau Response Document: {{media url=creditBureauResponseDataUri}}
  User Dispute Details: {{{userDisputeDetails}}}

  Provide a concise summary of the credit bureau response, list the outcomes for each disputed item, and recommend actionable next steps for the user.
  Summary:
  Dispute Outcomes:
  Next Steps: `,
});

const analyzeUploadedCreditBureauResponsesFlow = ai.defineFlow(
  {
    name: 'analyzeUploadedCreditBureauResponsesFlow',
    inputSchema: AnalyzeUploadedCreditBureauResponsesInputSchema,
    outputSchema: AnalyzeUploadedCreditBureauResponsesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
