import { z } from 'zod'

export const createQuestionValidator = z.object({
  question: z
    .string({ required_error: 'Please enter a poll question' })
    .min(5, { message: 'Question must contain at least 5 character(s)' })
    .max(600, { message: 'Question must contain at most 600 character(s)' }),
  options: z
    .array(
      z.object({
        label: z.string().min(1).max(600, { message: 'Option must contain at most 600 character(s)' }),
      })
    )
    .min(2, { message: 'Poll must contain at least 2 option(s)' })
    .max(25, { message: 'Poll must contain at most 25 option(s)' }),
  allowMultipleChoices: z.boolean(),
})

export type createQuestionValidatorType = z.infer<typeof createQuestionValidator>
