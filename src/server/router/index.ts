// src/server/router/index.ts
import { createRouter } from './context'
import superjson from 'superjson'

import { questionRouter } from './questionRouter'

export const appRouter = createRouter().transformer(superjson).merge('question.', questionRouter)

// export type definition of API
export type AppRouter = typeof appRouter
