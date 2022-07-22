import { Disclosure } from '@headlessui/react'
import Link from 'next/link'
import { FC } from 'react'

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <Disclosure as='nav' className='bg-secondary fixed top-0 right-0 left-0 '>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          <div className='flex'>
            <div className='-ml-2 mr-2 flex items-center md:hidden'></div>
            <Link href='/'>
              <a className='flex-shrink-0 flex items-center'>
                <img
                  className='block lg:hidden h-8 w-auto'
                  src='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
                  alt='Workflow'
                />
                <img
                  className='hidden lg:block h-8 w-auto'
                  src='https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg'
                  alt='Workflow'
                />
              </a>
            </Link>
            <div className='hidden md:ml-6 md:flex md:items-center md:space-x-4'></div>
          </div>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <Link href='/create'>
                <a className='relative py-2 px-3.5 inline-flex items-center justify-center text-center no-underline leading-none whitespace-nowrap font-semibold rounded shrink-0 transition select-none overflow-hidden focus-ring hover:bg-secondary text-white border border-bordercolor bg-primary text-sm'>
                  Create new poll
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Disclosure>
  )
}

export default Navbar
