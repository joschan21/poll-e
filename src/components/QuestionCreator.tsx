import { useRouter } from 'next/router'
import { FC } from 'react'
import { trpc } from '../utils/trpc'
import QuestionCreatorForm from './QuestionCreatorForm'

interface QuestionCreatorProps {}

const QuestionCreator: FC<QuestionCreatorProps> = ({}) => {
  // Hooks
  const router = useRouter()

  const { mutate: createPoll, isLoading } = trpc.useMutation('question.create', {
    onSuccess: (data) => {
      router.push(`/question/${data.id}`)
    },
  })

  if (isLoading) return <p>Loading...</p>

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
      <QuestionCreatorForm createPoll={createPoll} />
    </div>
  )
}

export default QuestionCreator
