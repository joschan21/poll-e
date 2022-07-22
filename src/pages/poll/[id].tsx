import { NextPage } from 'next'
import { useRouter } from 'next/router'
import LoadingScreen from '../../components/common/LoadingScreen'
import PollPage from '../../components/PollPage'

const QuestionPage: NextPage = () => {
  const { query } = useRouter()
  const { id } = query

  if (!id || typeof id !== 'string') return <LoadingScreen />

  return <PollPage id={id} />
}

export default QuestionPage
