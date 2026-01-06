import { config } from 'dotenv';
config();

import '@/ai/flows/ai-compliance-tool.ts';
import '@/ai/flows/generate-credit-dispute-letters.ts';
import '@/ai/flows/ai-subscription-cancellation.ts';
import '@/ai/flows/analyze-uploaded-credit-bureau-responses.ts';