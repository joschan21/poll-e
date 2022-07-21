import { Question, Vote } from '@prisma/client'
import { z } from 'zod'
import { createQuestionValidator } from '../../shared/create-question-validator'
import { options } from '../../shared/typings'
import { createRouter } from './context'

export const questionRouter = createRouter()
  .mutation('create', {
    input: createQuestionValidator,
    async resolve({ ctx, input }) {
      if (!ctx.token) throw new Error('Unauthorized')
      return await ctx.prisma.question.create({
        data: {
          question: input.question,
          userToken: ctx.token,
          options: input.options,
        },
      })
    },
  })
  .query('get-all-by-token', {
    async resolve({ ctx }) {
      if (!ctx.token) throw new Error('Unauthorized')
      const result = await ctx.prisma.question.findMany({
        where: {
          userToken: ctx.token,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
      interface typedQuestion extends Omit<Question, 'options'> {
        options: {
          label: string
        }[]
      }
      const typedQuestions = result as typedQuestion[]
      return typedQuestions
    },
  })
  .query('get-by-id', {
    input: z.object({ id: z.string() }),
    async resolve({ ctx, input }) {
      const question = await ctx.prisma.question.findFirst({
        where: { id: input.id },
      })

      type typedJson = Omit<Question, 'options'> & {
        options: options
      }

      const typedQuestion = question as typedJson | null

      console.log('typedQuestion?', typedQuestion)

      const myVote = await ctx.prisma.vote.findFirst({
        where: {
          questionId: input.id,
          voterToken: ctx.token,
        },
      })

      console.log('myVote', myVote)

      const rest = {
        question: typedQuestion,
        vote: myVote,
        isOwner: question?.userToken === ctx.token,
      }

      if (rest.vote || rest.isOwner) {
        const votes = await ctx.prisma.vote.groupBy({
          where: { questionId: input.id },
          by: ['choice'],
          _count: true,
        })

        return { ...rest, votes }
      }

      return { ...rest, votes: undefined }
    },
  })
  .mutation('vote', {
    input: z.object({ index: z.number(), id: z.string() }),
    async resolve({ ctx, input }) {
      if (!ctx.token) throw new Error('Unauthorized')
      await ctx.prisma.vote.create({
        data: {
          choice: input.index,
          voterToken: ctx.token,
          questionId: input.id,
        },
      })
    },
  })
