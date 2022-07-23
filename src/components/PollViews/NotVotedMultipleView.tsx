import { FC, useState } from 'react'
import { HiArrowRight } from 'react-icons/hi'
import { trpc } from '../../utils/trpc'
import LoadingScreen from '../common/LoadingScreen'

interface NotVotedMultipleViewProps {
  id: string
}

const NotVotedMultipleView: FC<NotVotedMultipleViewProps> = ({ id }) => {
  // Keep track of selected options indices
  const [selectedIndices, setSelectedIndices] = useState<number[]>([])

  const { data } = trpc.useQuery(['poll.get-by-id', { id }])
  const { mutate: voteFor } = trpc.useMutation('poll.vote-multiple', {
    onSuccess: () => {
      window.location.reload()
    },
  })
  if (!data) return <LoadingScreen />

  const { question } = data

  if (!question) return <LoadingScreen />

  const handleSelection = (index: number) => {
    /**
     * If this option has already been checked, remove it from checked
     * if not, push to array of indices
     */

    const questionIndex = selectedIndices.findIndex((i) => i === index)
    const isChecked = questionIndex !== -1

    if (!isChecked) {
      setSelectedIndices((prev) => [...prev, index])
    } else if (isChecked) {
      setSelectedIndices((prev) => {
        return prev.filter((i) => i !== index)
      })
    }
  }

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
              {question.options.map((option, index) => {
                const isSelected = selectedIndices.includes(index)

                return (
                  <li
                    onClick={() => handleSelection(index)}
                    key={`option-${index}`}
                    className='w-full py-2 cursor-pointer'>
                    <div
                      className={`w-full border flex rounded justify-between items-center p-2.5 sm:text-sm bg-primary ${
                        isSelected ? 'border-blue-600' : 'border-transparent'
                      }`}>
                      <p>{option.label}</p>
                      <HiArrowRight />
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className='flex flex-col items-center mt-5 gap-4'>
            <button
              type='button'
              onClick={() => voteFor({ id, indices: selectedIndices })}
              className='relative py-2 px-3.5 inline-flex items-center justify-center text-center no-underline leading-none whitespace-nowrap font-semibold rounded shrink-0 transition select-none overflow-hidden focus-ring hover:bg-secondary text-white border border-bordercolor bg-primary text-sm'>
              Submit vote
            </button>
            <p className='text-sm text-textcolor'>Multiple choices are allowed.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotVotedMultipleView
