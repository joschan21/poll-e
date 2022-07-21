import { Disclosure } from '@headlessui/react'
import Link from 'next/link'
import { FC } from 'react'
import { HiMenuAlt1, HiPlus, HiX } from 'react-icons/hi'

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <Disclosure as='nav' className='bg-secondary fixed top-0 right-0 left-0 '>
      {({ open }) => (
        <>
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
                    <a className='inline-flex items-center px-4 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                      New Poll
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar
