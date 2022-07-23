import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import LoadingScreen from '../../components/common/LoadingScreen'
import PollPage from '../../components/PollPage'
import { inferQueryOutput, trpc } from '../../utils/trpc'

export const getServerSideProps = async () => {
  const { query } = useRouter()
  const { id } = query

  if (typeof id == 'string') {
    const { data } = trpc.useQuery(['poll.get-by-id', { id }])

    return {
      props: {
        data,
        id,
      },
    }
  } else {
    return {
      props: {
        undefined,
        id,
      },
    }
  }
}

interface QuestionPageProps {
  data: inferQueryOutput<'poll.get-by-id'> | undefined
  id: string
}

const QuestionPage: NextPage<QuestionPageProps> = ({ data, id }) => {
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
