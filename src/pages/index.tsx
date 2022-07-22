import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { BarLoader } from 'react-spinners'
import EmptyState from '../components/EmptyState'
import { trpc } from '../utils/trpc'

const Home: FC = () => {
  // Local State Definitions

  // Hooks
  const router = useRouter()

  const { data: questions, isLoading } = trpc.useQuery(['poll.get-all-by-token'])

  if (!questions)
    return (
      <div className='absolute inset-0 flex justify-center items-center'>
        <BarLoader width='150' color='#3b82f6' />
      </div>
    )

  return (
    <>
      <Head>
        <title>Poll-E | Online poll service</title>
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
