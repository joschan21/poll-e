import { Poll } from '@prisma/client'
import { z } from 'zod'
import { createQuestionValidator } from '../../shared/create-question-validator'
import { options } from '../../shared/typings'
import { createRouter } from './context'

export const pollRouter = createRouter()
  .mutation('create', {
    input: createQuestionValidator,
    async resolve({ ctx, input }) {
      if (!ctx.token) throw new Error('Unauthorized')
      return await ctx.prisma.poll.create({
        data: {
          question: input.question,
          userToken: ctx.token,
          options: input.options,
          allowMultipleChoices: input.allowMultipleChoices,
        },
      })
    },
  })
  .query('get-all-by-token', {
    async resolve({ ctx }) {
      if (!ctx.token) throw new Error('Unauthorized')
      const result = await ctx.prisma.poll.findMany({
        where: {
          userToken: ctx.token,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
      interface typedQuestion extends Omit<Poll, 'options'> {
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
      const question = await ctx.prisma.poll.findFirst({
        where: { id: input.id },
      })

      type questionWithTypedJson = Omit<Poll, 'options'> & {
        options: options
      }

      const typedQuestion = question as questionWithTypedJson | null

      const myVotes = await ctx.prisma.vote.findMany({
        where: {
          pollId: input.id,
          voterToken: ctx.token,
        },
      })

      // Prisma does not support counting distinct...
      const amtVoters = await ctx.prisma.vote
        .findMany({
          where: { pollId: input.id },
          distinct: ['voterToken'],
        })
        .then((res) => res.length)
        .catch(() => undefined)

      const rest = {
        question: typedQuestion,
        myVotes,
        amtVoters,
        isOwner: question?.userToken === ctx.token,
      }

      if (rest.myVotes?.length > 0 || rest.isOwner) {
        const allVotes = await ctx.prisma.vote.groupBy({
          where: { pollId: input.id },
          by: ['choice'],
          _count: true,
        })

        return { ...rest, allVotes }
      }

      return { ...rest, allVotes: undefined }
    },
  })
  .mutation('vote', {
    input: z.object({ index: z.number(), id: z.string() }),
    async resolve({ ctx, input }) {
      if (!ctx.token) throw new Error('Unauthorized')

      return await ctx.prisma.vote.create({
        data: {
          choice: input.index,
          pollId: input.id,
          voterToken: ctx.token!,
        },
      })
    },
  })
  .mutation('vote-multiple', {
    input: z.object({ indices: z.array(z.number()), id: z.string() }),
    async resolve({ ctx, input }) {
      if (!ctx.token) throw new Error('Unauthorized')

      const votes = input.indices.map((index) => ({
        choice: index,
        pollId: input.id,
        voterToken: ctx.token!,
      }))

      return ctx.prisma.vote.createMany({
        data: votes,
      })
    },
  })
