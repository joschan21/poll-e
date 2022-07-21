import { z } from 'zod'

export const createQuestionValidator = z.object({
  question: z.string().min(5).max(600),
  options: z
    .array(z.object({ label: z.string().min(1).max(600) }))
    .min(2)
    .max(20),
})

export type createQuestionValidatorType = z.infer<typeof createQuestionValidator>
