import Head from 'next/head'
import Link from 'next/link'
import { FC } from 'react'
import { BarLoader } from 'react-spinners'
import LoadingScreen from '../components/common/LoadingScreen'
import EmptyState from '../components/EmptyState'
import { trpc } from '../utils/trpc'

const Home: FC = () => {
  // Hooks
  const { data: questions } = trpc.useQuery(['poll.get-all-by-token'])

  if (!questions) return <LoadingScreen />

  return (
    <>
      <Head>
        <title>poll·e | Poll in seconds</title>
        <meta name='description' content='Poll-E' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='bg-primary'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <p className='text-2xl text-white py-10'>Your recent polls:</p>
          <div className='flex flex-col gap-3 mb-6'>
            {questions?.map((question) => (
              <Link href={`/poll/${question.id}`} key={question.id}>
                <a>
                  {question.question}, created at {question.createdAt.toLocaleDateString()}
                </a>
              </Link>
            ))}
          </div>
          {questions.length === 0 && <EmptyState />}
          {questions.length !== 0 && (
            <Link href='/create' className='underline'>
              <a className='text-white'>Create a new one!</a>
            </Link>
          )}
        </div>
      </main>
    </>
  )
}

export default Home
