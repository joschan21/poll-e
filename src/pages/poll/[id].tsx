import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import LoadingScreen from '../../components/common/LoadingScreen'
import PollPage from '../../components/PollPage'
import { inferQueryOutput, trpc } from '../../utils/trpc'
import { createSSGHelpers } from '@trpc/react/ssg'
import superjson from 'superjson'
import { appRouter } from '../../server/router'
import { createContext } from '../../server/router/context'
import { FC } from 'react'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: createContext(),
    transformer: superjson,
  })

  const { req, query } = context
  const { id } = query
  const host = context.req.headers.host

  const url = `${host}/poll/${id}`

  if (typeof id === 'string') {
    // Prefetch `poll.get-by-id`
    await ssg.fetchQuery('poll.get-by-id', {
      id,
    })

    // Make sure to return { props: { trpcState: ssg.dehydrate() } }
    return {
      props: {
        trpcState: ssg.dehydrate(),
        id,
      },
    }
  } else
    return {
      props: {
        trpcState: undefined,
        id,
      },
    }
}

export default function QuestionPage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { id } = props
  if (typeof id !== 'string') return <LoadingScreen />

  // This query will be immediately available as it's prefetched.
  const questionQuery = trpc.useQuery(['poll.get-by-id', { id }])
  const { data } = questionQuery

  if (!data || !data.question) return <LoadingScreen />

  return (
    <>
      <Head>
        <title>{`Poll-E | ${data.question.question}`}</title>
        <meta property='og:url' content='poll-e.com' />
        <meta property='og:type' content='website' />
        <meta property='fb:app_id' content='your fb app id' />
        <meta property='og:title' content={`poll-e | fast & easy online polling`} />
        <meta name='twitter:card' content='summary' />
        <meta property='og:description' content={`${data.question.question}`} />
        <meta property='og:image' content='/logo-text.png' />
      </Head>
      <PollPage data={data} id={id} />
    </>
  )
}
