import { FC } from 'react'
import { inferQueryOutput } from '../utils/trpc'
import LoadingScreen from './common/LoadingScreen'
import NotVotedMultipleView from './PollViews/NotVotedMultipleView'
import NotVotedView from './PollViews/NotVotedView'
import VotedOrCreatorView from './PollViews/VotedOrCreatorView'

interface PollPageProps {
  data: inferQueryOutput<'poll.get-by-id'>
  id: string
}

const PollPage: FC<PollPageProps> = ({ data, id }) => {
  const { isOwner, question, myVotes } = data
  const hasVoted = myVotes?.length > 0

  if (!question) return <LoadingScreen />

  // Order matters!
  if (isOwner || hasVoted) return <VotedOrCreatorView id={id} />
  if (question.allowMultipleChoices) return <NotVotedMultipleView id={id} />

  return <NotVotedView id={id} />
}

export default PollPage
