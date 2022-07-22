// src/server/router/index.ts
import { createRouter } from './context'
import superjson from 'superjson'

import { pollRouter } from './pollRouter'

export const appRouter = createRouter().transformer(superjson).merge('poll.', pollRouter)

// export type definition of API
export type AppRouter = typeof appRouter
