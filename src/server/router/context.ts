// src/server/router/context.ts
import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { prisma } from '../db/client'

export const createContext = (opts?: trpcNext.CreateNextContextOptions) => {
  const req = opts?.req
  const res = opts?.res
  const token = opts?.req.cookies['userToken']

  return {
    req,
    res,
    prisma,
    token,
  }
}

type Context = trpc.inferAsyncReturnType<typeof createContext>

export const createRouter = () => trpc.router<Context>()
