import { Dispatch, FC, SetStateAction } from 'react'
import { HiPlus } from 'react-icons/hi'

interface EmptyStateProps {
  setCreateNew: Dispatch<SetStateAction<boolean>>
}

const EmptyState: FC<EmptyStateProps> = ({ setCreateNew }) => {
  return (
    <div className='text-center'>
      <svg
        className='mx-auto h-12 w-12 text-gray-300'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        aria-hidden='true'>
        <path
          vectorEffect='non-scaling-stroke'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z'
        />
      </svg>
      <h3 className='mt-2 text-sm font-medium text-white'>No polls</h3>
      <p className='mt-1 text-sm text-textcolor'>Get started by creating a new poll.</p>
      <div className='mt-6'>
        <button
          type='button'
          onClick={() => setCreateNew(true)}
          className='inline-flex items-center px-4 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
          Create new poll
        </button>
      </div>
    </div>
  )
}

export default EmptyState
