import Link from 'next/link'
import { FC } from 'react'

interface EmptyStateProps {}

const EmptyState: FC<EmptyStateProps> = () => {
  return (
    <div className='text-center border border-bordercolor bg-secondary rounded-lg p-12'>
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
        <Link href='/create'>
          <a className='relative py-2 px-3.5 inline-flex items-center justify-center text-center no-underline leading-none whitespace-nowrap font-semibold rounded shrink-0 transition select-none overflow-hidden focus-ring hover:bg-secondary text-white border border-bordercolor bg-primary text-sm'>
            Create new
          </a>
        </Link>
      </div>
    </div>
  )
}

export default EmptyState
