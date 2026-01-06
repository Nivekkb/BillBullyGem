'use server';

/**
 * @fileOverview An AI compliance tool for ensuring credit repair features comply with Canadian consumer protection laws.
 *
 * - analyzeCompliance - A function that analyzes the compliance of credit repair features.
 * - AnalyzeComplianceInput - The input type for the analyzeCompliance function.
 * - AnalyzeComplianceOutput - The return type for the analyzeCompliance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeComplianceInputSchema = z.object({
  featureDescription: z
    .string()
    .describe('A detailed description of the credit repair feature to analyze.'),
  relevantLaws: z
    .string()
    .describe(
      'The relevant Canadian consumer protection laws, including the Consumer Reporting Act (federal) and provincial consumer protection laws.'
    ),
});
export type AnalyzeComplianceInput = z.infer<typeof AnalyzeComplianceInputSchema>;

const AnalyzeComplianceOutputSchema = z.object({
  isCompliant: z
    .boolean()
    .describe(
      'Whether the credit repair feature is compliant with the specified Canadian consumer protection laws.'
    ),
  complianceRationale: z
    .string()
    .describe(
      'A detailed explanation of why the feature is compliant or non-compliant, including specific references to the relevant laws.'
    ),
  suggestedAdjustments: z
    .string()
    .optional()
    .describe(
      'Suggested adjustments to the feature to ensure compliance, if the feature is non-compliant.'
    ),
});
export type AnalyzeComplianceOutput = z.infer<typeof AnalyzeComplianceOutputSchema>;

export async function analyzeCompliance(
  input: AnalyzeComplianceInput
): Promise<AnalyzeComplianceOutput> {
  return analyzeComplianceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeCompliancePrompt',
  input: {schema: AnalyzeComplianceInputSchema},
  output: {schema: AnalyzeComplianceOutputSchema},
  prompt: `You are an AI compliance expert specializing in Canadian consumer protection laws.

You will analyze the provided credit repair feature description against the relevant laws and determine whether the feature is compliant.

Feature Description: {{{featureDescription}}}
Relevant Laws: {{{relevantLaws}}}

Provide a detailed explanation of your reasoning, including specific references to the relevant laws.
If the feature is non-compliant, suggest adjustments to ensure compliance.

Is the feature compliant? (true/false):
Compliance Rationale:
Suggested Adjustments (if applicable):`,
});

const analyzeComplianceFlow = ai.defineFlow(
  {
    name: 'analyzeComplianceFlow',
    inputSchema: AnalyzeComplianceInputSchema,
    outputSchema: AnalyzeComplianceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
