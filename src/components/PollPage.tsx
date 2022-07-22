import { FC } from 'react'
import { trpc } from '../utils/trpc'
import LoadingScreen from './common/LoadingScreen'
import NotVotedView from './PollViews/NotVotedView'
import VotedOrCreatorView from './PollViews/VotedOrCreatorView'

interface PollPageProps {
  id: string
}

const PollPage: FC<PollPageProps> = ({ id }) => {
  const { data } = trpc.useQuery(['poll.get-by-id', { id }])

  if (!data) return <LoadingScreen />

  const { isOwner, question, vote } = data

  if (!question) return <LoadingScreen />

  if (isOwner) return <VotedOrCreatorView id={id} />
  if (vote) return <VotedOrCreatorView id={id} />
  return <NotVotedView id={id} />
}

export default PollPage
