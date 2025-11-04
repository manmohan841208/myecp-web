// schemas/securityQuestionsSchema.ts
import { z } from 'zod';

export const securityQuestionsSchema = z.object({
  Answer1: z.string().min(1, 'Required Field').regex(/\S/, 'Required Field'),
  Answer2: z.string().min(1, 'Required Field').regex(/\S/, 'Required Field'),
});

export type SecurityQuestionsFormValues = z.infer<
  typeof securityQuestionsSchema
>;
