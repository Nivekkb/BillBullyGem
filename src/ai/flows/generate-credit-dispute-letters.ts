// A Genkit Flow that generates personalized credit dispute letters based on user data and credit report information.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CreditDisputeLetterInputSchema = z.object({
  userId: z.string().describe('The ID of the user requesting the dispute letter.'),
  creditBureau: z
    .enum(['equifax', 'transunion', 'experian'])
    .describe('The credit bureau to send the dispute letter to.'),
  accountName: z.string().describe('The name of the account in question.'),
  accountNumber: z.string().describe('The account number in question.'),
  disputeReason: z.string().describe('The reason for disputing the item.'),
  userExplanation: z
    .string()
    .optional()
    .describe('Optional: A more detailed explanation from the user.'),
});

export type CreditDisputeLetterInput = z.infer<typeof CreditDisputeLetterInputSchema>;

const CreditDisputeLetterOutputSchema = z.object({
  letterText: z.string().describe('The generated dispute letter text.'),
});

export type CreditDisputeLetterOutput = z.infer<typeof CreditDisputeLetterOutputSchema>;

export async function generateCreditDisputeLetter(
  input: CreditDisputeLetterInput
): Promise<CreditDisputeLetterOutput> {
  return generateCreditDisputeLetterFlow(input);
}

const creditDisputeLetterPrompt = ai.definePrompt({
  name: 'creditDisputeLetterPrompt',
  input: {schema: CreditDisputeLetterInputSchema},
  output: {schema: CreditDisputeLetterOutputSchema},
  prompt: `You are an AI assistant specialized in generating credit dispute letters.

  Based on the information provided, generate a formal and persuasive dispute letter to the specified credit bureau.

  Include the user's ID, the credit bureau's name, the account name and number, the reason for the dispute, and any additional explanation provided by the user.

  Ensure the letter is professional, concise, and clearly states the user's request for investigation and correction of the inaccurate information.

  User ID: {{{userId}}}
  Credit Bureau: {{{creditBureau}}}
  Account Name: {{{accountName}}}
  Account Number: {{{accountNumber}}}
  Dispute Reason: {{{disputeReason}}}
  User Explanation: {{{userExplanation}}}
  `,
});

const generateCreditDisputeLetterFlow = ai.defineFlow(
  {
    name: 'generateCreditDisputeLetterFlow',
    inputSchema: CreditDisputeLetterInputSchema,
    outputSchema: CreditDisputeLetterOutputSchema,
  },
  async input => {
    const {output} = await creditDisputeLetterPrompt(input);
    return output!;
  }
);
