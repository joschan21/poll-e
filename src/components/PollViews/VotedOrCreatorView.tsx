import { formatDistance } from 'date-fns'
import { AnimatePresence, m } from 'framer-motion'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { AiOutlineCopy } from 'react-icons/ai'
import { HiCheck, HiLink } from 'react-icons/hi'
import { IoIosRefresh } from 'react-icons/io'
import { trpc } from '../../utils/trpc'
import LoadingScreen from '../common/LoadingScreen'

interface VotedOrCreatorViewProps {
  id: string
}

const VotedOrCreatorView: FC<VotedOrCreatorViewProps> = ({ id }) => {
  const router = useRouter()

  let path = `http://localhost:3000${router.asPath}`
  if (process.env.VERCEL_URL) path = `https://${process.env.VERCEL_URL}${router.asPath}`
  const { data, refetch } = trpc.useQuery(['poll.get-by-id', { id }])

  const [indicateRefetch, setIndicateRefetch] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isCopyToClipboard, setIsCopyToClipboard] = useState(false)

  useEffect(() => {
    if (!indicateRefetch) return
    let timer = setTimeout(() => {
      setIndicateRefetch(false)
      refetch()
      setIsVisible(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [indicateRefetch])

  useEffect(() => {
    if (!isVisible) return
    let timer = setTimeout(() => {
      setIsVisible(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [isVisible])

  useEffect(() => {
    if (!isCopyToClipboard) return
    let timer = setTimeout(() => {
      setIsCopyToClipboard(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [isCopyToClipboard])

  const amtVoters = data?.amtVoters
  if (!data || typeof amtVoters === undefined) return <LoadingScreen />

  const { isOwner, question, allVotes, myVotes } = data

  if (!question || !allVotes) return <LoadingScreen />

  const amtVotes = allVotes.reduce((acc, obj) => acc + obj._count, 0)
  return (
    <>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='max-w-3xl mx-auto'>
          {/* Info box above poll */}
          <div className='rounded-md bg-secondary p-4 mb-3'>
            <div className='flex flex-col sm:flex-row items-center gap-2.5 sm:gap-0'>
              <div className='ml-3 w-full sm:flex sm:justify-between sm:items-center'>
                {/* Share this link section */}
                <div>
                  <label htmlFor='email' className='block text-sm font-medium text-white'>
                    Share this poll
                  </label>
                  <div className='mt-1 flex rounded-md shadow-sm'>
                    <div className='relative flex items-stretch flex-grow focus-within:z-10'>
                      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <HiLink className='h-[18px] w-[18px] text-gray-400' aria-hidden='true' />
                      </div>
                      <input
                        readOnly
                        onFocus={(e) => e.target.select()}
                        value={path}
                        className='focus:ring-indigo-500 bg-[#242424] outline-none truncate text-textcolor focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-10 text-sm border-gray-300'
                        placeholder='John Doe'
                      />
                    </div>
                    <button
                      type='button'
                      onClick={() => {
                        navigator.clipboard.writeText(path)
                        setIsCopyToClipboard(true)
                      }}
                      className='-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-bordercolor text-sm font-medium rounded-r-md text-textcolor bg-primary hover:bg-secondary focus:border-blue-600'>
                      {isCopyToClipboard ? (
                        <HiCheck className='h-5 w-5 text-gray-400' aria-hidden='true' />
                      ) : (
                        <AiOutlineCopy className='h-5 w-5 text-gray-400' aria-hidden='true' />
                      )}
                      <span>{isCopyToClipboard ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                <div className='mt-5 sm:mt-0'>
                  {/* Refresh button */}{' '}
                  <button
                    type='button'
                    onClick={() => {
                      setIndicateRefetch(true)
                    }}
                    className='relative w-full h-8 px-3.5 inline-flex items-center justify-center gap-2 font-semibold rounded transition focus-ring hover:bg-secondary text-white border border-bordercolor bg-primary text-sm'>
                    <p className='truncate'>Refresh votes</p>
                    <div className={indicateRefetch ? 'animate-spin-fast' : ''}>
                      <IoIosRefresh className='text-lg' />
                    </div>
                    <AnimatePresence>
                      {isVisible && (
                        <m.div
                          className='absolute inset-0 rounded border border-green-500'
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <main className='bg-secondary px-4 py-5 rounded-t-md sm:px-6'>
            <div className='mt-1'>
              <p className='w-full outline-none p-4 rounded-md  text-xl border border-blue-600 bg-primary'>
                {question.question}
              </p>
            </div>

            <p className='text-sm text-textcolor my-4'>
              <span className='font-semibold text-blue-500'>{amtVoters}</span>{' '}
              <span>{amtVoters === 1 ? 'person has ' : 'people have '}</span>
              voted on this poll.
            </p>

            <div className='bg-secondary shadow overflow-hidden rounded-md'>
              <ul role='list' className=''>
                {question.options.map((option, index) => {
                  const optionIndex = allVotes.findIndex((vote) => vote.choice === index)
                  const amount =
                    typeof optionIndex !== undefined && optionIndex !== -1 && allVotes[optionIndex]
                      ? allVotes[optionIndex!]!._count
                      : 0

                  // Determine what percentage this option has of all votes
                  const percentOfAll = (amount / amtVotes) * 100

                  const votedForThis = !!myVotes && myVotes.some((vote) => vote.choice === index)

                  return (
                    <li key={`option-${index}`} className='w-full py-2'>
                      <div
                        className={`relative overflow-hidden w-full rounded-md bg-black border ${
                          votedForThis ? 'border-blue-900' : 'border-bordercolor'
                        }`}>
                        <div className='relative flex z-10 justify-between items-center p-2.5 text-sm'>
                          <p>{option.label}</p>
                          <p>
                            {amount} <span>{amount === 1 ? 'vote' : 'votes'}</span>
                          </p>
                        </div>
                        <div
                          style={{ width: `${percentOfAll}%` }}
                          className='absolute z-0 rounded inset-0 bg-primary'
                        />
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
            {/* {isOwner ? (
              <p className='text-sm font-medium text-textcolor'>
                You created this poll{' '}
                <span className='text-blue-500'>{formatDistance(question.createdAt, Date.now())}</span> ago.
              </p>
            ) : (
              <p className='text-sm font-medium text-textcolor'>
                You voted for &quot;
                <span className='text-blue-500'>{question.options[vote!.choice]?.label}</span>&quot;.
              </p>
            )} */}
          </main>
        </div>
      </div>
    </>
  )
}

export default VotedOrCreatorView
