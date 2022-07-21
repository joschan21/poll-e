import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import EmptyState from '../components/EmptyState'
import QuestionCreatorModal from '../components/QuestionCreatorModal'
import { trpc } from '../utils/trpc'

const Home: FC = () => {
  // Local State Definitions
  const [createNew, setCreateNew] = useState(false)

  // Hooks
  const router = useRouter()

  const { mutate, data } = trpc.useMutation('question.create', {
    onSuccess: (data) => {
      router.push(`/question/${data.id}`)
      setCreateNew(false)
    },
    onError: () => console.log('error'),
  })

  const { data: questions, isLoading } = trpc.useQuery(['question.get-all-by-token'])

  if (!questions) return <p>idiot</p>

  if (isLoading) return <p>Loading...</p>

  return (
    <>
      <Head>
        <title>Poll-E | Online poll service</title>
        <meta name='description' content='Poll-E' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='bg-primary min-h-screen'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <p>Your recent polls:</p>
          <div className='flex flex-col gap-3 my-6'>
            {questions?.map((question) => (
              <Link href={`/poll/${question.id}`} key={question.id}>
                <a>
                  {question.question}, created at {question.createdAt.toLocaleDateString()}
                </a>
              </Link>
            ))}
          </div>
          {questions?.length === 0 && <EmptyState setCreateNew={setCreateNew} />}
          <Link href='/create' className='underline'>
            <a className='text-white'>Create a new one!</a>
          </Link>
        </div>
      </main>
    </>
  )
}

export default Home
