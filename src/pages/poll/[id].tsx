import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import LoadingScreen from '../../components/common/LoadingScreen'
import PollPage from '../../components/PollPage'
import { inferQueryOutput, trpc } from '../../utils/trpc'
import { createSSGHelpers } from '@trpc/react/ssg'
import superjson from 'superjson'
import { appRouter } from '../../server/router'
import { createContext } from '../../server/router/context'

export async function getServerSideProps(context: GetServerSidePropsContext<{ id: string }>) {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: createContext(),
    transformer: superjson,
  })
  const id = context.params?.id as string

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
}

interface QuestionPageProps {
  data: inferQueryOutput<'poll.get-by-id'> | undefined
  id: string
}

const QuestionPage: NextPage<QuestionPageProps> = ({ id }) => {
  const { data } = trpc.useQuery(['poll.get-by-id', { id }])
  if (!data) return <LoadingScreen />

  return (
    <>
      <Head>
        <title>{`Poll-E | ${data.question}`}</title>
        <meta property='og:url' content='your url' />
        <meta property='og:type' content='website' />
        <meta property='fb:app_id' content='your fb app id' />
        <meta property='og:title' content={`${data.question} | Poll-E`} />
        <meta name='twitter:card' content='summary' />
        <meta property='og:description' content='Hurray!! Yes Social Media Preview is Working' />
        <meta property='og:image' content='/logo-text.png' />
      </Head>
      <PollPage data={data} id={id} />
    </>
  )
}

export default QuestionPage
