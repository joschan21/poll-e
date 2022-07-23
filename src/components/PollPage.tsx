import { FC } from 'react'
import { trpc } from '../utils/trpc'
import LoadingScreen from './common/LoadingScreen'
import NotVotedMultipleView from './PollViews/NotVotedMultipleView'
import NotVotedView from './PollViews/NotVotedView'
import VotedOrCreatorView from './PollViews/VotedOrCreatorView'

interface PollPageProps {
  id: string
}

const PollPage: FC<PollPageProps> = ({ id }) => {
  const { data } = trpc.useQuery(['poll.get-by-id', { id }])
  if (!data) return <LoadingScreen />

  const { isOwner, question, myVotes } = data
  const hasVoted = myVotes?.length > 0

  if (!question) return <LoadingScreen />

  // Order matters!
  if (isOwner || hasVoted) return <VotedOrCreatorView id={id} />
  if (question.allowMultipleChoices) return <NotVotedMultipleView id={id} />

  return <NotVotedView id={id} />
}

export default PollPage
