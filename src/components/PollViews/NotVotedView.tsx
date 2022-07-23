import { FC, useState } from 'react'
import { HiArrowRight } from 'react-icons/hi'
import { trpc } from '../../utils/trpc'
import LoadingScreen from '../common/LoadingScreen'

interface NotVotedViewProps {
  id: string
}

const NotVotedView: FC<NotVotedViewProps> = ({ id }) => {
  const { data } = trpc.useQuery(['poll.get-by-id', { id }])
  const { mutate: voteFor } = trpc.useMutation('poll.vote', {
    onSuccess: () => {
      window.location.reload()
    },
  })

  if (!data) return <LoadingScreen />

  const { question } = data

  if (!question) return <LoadingScreen />

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <div className='max-w-3xl mx-auto'>
        <div className='bg-secondary px-4 py-5 rounded-t-md sm:px-6'>
          <div className='mt-1'>
            <p className='w-full outline-none p-4 rounded-md  text-xl border border-blue-600 bg-primary'>
              {question.question}
            </p>
          </div>

          <div className='bg-secondary shadow overflow-hidden rounded-md mt-6'>
            <ul role='list' className='divide-y divide-bordercolor'>
              {question.options.map((option, index) => (
                <li
                  onClick={() => voteFor({ id, index })}
                  key={`option-${index}`}
                  className='w-full py-2 cursor-pointer'>
                  <div className='w-full flex justify-between items-center p-2.5 sm:text-sm bg-primary '>
                    <p>{option.label}</p>
                    <HiArrowRight />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotVotedView
