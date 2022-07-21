import { formatDistance, formatDuration } from 'date-fns'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { HiInformationCircle } from 'react-icons/hi'
import { trpc } from '../utils/trpc'
import OwnerView from './OwnerView'

interface PollPageProps {
  id: string
}

const PollPage: FC<PollPageProps> = ({ id }) => {
  const { data, isLoading, error, isError } = trpc.useQuery(['question.get-by-id', { id }])
  const { mutate: voteFor } = trpc.useMutation('question.vote', {
    onSuccess: () => {
      window.location.reload()
    },
  })

  if (!data || isLoading) return <p>Loading...</p>

  const { isOwner, question, vote, votes } = data

  if (!question) return <p>Question not found.</p>

  return (
    <div className='min-h-screen bg-primary flex justify-center items-center'>
      <div className='bg-secondary overflow-hidden shadow rounded-lg'>
        {isOwner && (
          <div className='rounded-t-md bg-blue-900 border border-blue-700 p-4'>
            <div className='flex'>
              <div className='flex-shrink-0'>
                <HiInformationCircle className='h-5 w-5 text-blue-400' aria-hidden='true' />
              </div>
              <div className='ml-3 flex-1 md:flex md:justify-between'>
                <p className='text-sm text-white'>
                  You created this poll {formatDistance(question?.createdAt, Date.now())} ago.
                </p>
              </div>
            </div>
          </div>
        )}
        {vote && (
          <div className='rounded-t-md bg-blue-50 p-4'>
            <div className='flex'>
              <div className='flex-shrink-0'>
                <HiInformationCircle className='h-5 w-5 text-blue-400' aria-hidden='true' />
              </div>
              <div className='ml-3 flex-1 md:flex md:justify-between'>
                <p className='text-sm text-blue-700'>
                  You voted for &quot;{question.options[vote.choice]?.label}&quot;
                </p>
              </div>
            </div>
          </div>
        )}
        <div className='px-4 py-5 sm:p-6'>
          <div className='pb-3 border-b border-gray-200'>
            <h3 className='text-lg leading-6 font-medium text-white'>{question?.question}</h3>
          </div>

          <div className='flex flex-col gap-1'>
            {question.options?.map((option, index) => {
              const optionIndex = votes?.findIndex((vote) => vote.choice === index)
              const amount =
                typeof optionIndex !== undefined && optionIndex !== -1 ? votes?.[optionIndex!]?._count : 0

              if (isOwner)
                return (
                  <p className='text-textcolor' key={`option-${index}`}>
                    {`${option.label} - ${amount} votes`}
                  </p>
                )

              if (vote)
                return (
                  <p
                    key={`option-${index}`}
                    className={`text-secondary ${index === vote.choice ? 'underline' : ''}`}>
                    {`${option.label} - ${amount} votes`}
                  </p>
                )
              else
                return (
                  <button type='button' onClick={() => voteFor({ index, id })} key={`option-${index}`}>
                    {option.label}
                  </button>
                )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PollPage
