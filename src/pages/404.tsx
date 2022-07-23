import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { HiAcademicCap, HiChevronRight } from 'react-icons/hi'

interface PageNotFoundProps {}

const PageNotFound: FC<PageNotFoundProps> = ({}) => {
  return (
    <div>
      <main className='max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex-shrink-0 pt-16'>
          <div className='relative mx-auto h-12 w-24'>
            <Image src='/logo-text.png' layout='fill' objectFit='contain' />
          </div>
        </div>
        <div className='max-w-xl mx-auto py-16 sm:py-24'>
          <div className='text-center'>
            <p className='text-sm font-semibold text-blue-500 uppercase tracking-wide'>error 404</p>
            <h1 className='mt-2 text-4xl font-extrabold text-white tracking-tight sm:text-5xl'>
              This page does not exist.
            </h1>
            <p className='mt-2 text-lg text-textcolor'>The page you are looking for could not be found.</p>
          </div>
          <div className='mt-12'>
            <h2 className='text-sm font-semibold text-textcolor tracking-wide uppercase'>Quick links</h2>
            <ul role='list' className='mt-4 border-t border-b border-bordercolor divide-y divide-bordercolor'>
              {/* Linked pages */}
              <li className='relative py-6 flex items-start space-x-4'>
                <div className='flex-shrink-0'>
                  <span className='flex items-center justify-center h-12 w-12 rounded-lg bg-secondary border border-bordercolor'>
                    <HiAcademicCap className='h-6 w-6 text-blue-500' aria-hidden='true' />
                  </span>
                </div>
                <div className='min-w-0 flex-1'>
                  <h3 className='text-base font-medium text-white'>
                    <span className='rounded-sm'>
                      <Link href='/create'>
                        <a className='focus:outline-none'>
                          <span className='absolute inset-0' aria-hidden='true' />
                          Create a poll
                        </a>
                      </Link>
                    </span>
                  </h3>
                  <p className='text-base text-textcolor'>Set up a new poll in just seconds</p>
                </div>
                <div className='flex-shrink-0 self-center'>
                  <HiChevronRight className='h-5 w-5 text-textcolor' aria-hidden='true' />
                </div>
              </li>
            </ul>
            <div className='mt-8'>
              <Link href='/'>
                <a className='text-base font-medium text-blue-500 hover:text-blue-600'>
                  Or go back home<span aria-hidden='true'> &rarr;</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </main>
      {/* <footer className='max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='border-t border-gray-200 py-12 text-center md:flex md:justify-between'>
          <p className='text-base text-gray-400'>&copy; Workflow, Inc. All rights reserved.</p>
          <div className='mt-6 flex justify-center space-x-8 md:mt-0'>
             {social.map((item, itemIdx) => (
              <a key={itemIdx} href={item.href} className='inline-flex text-gray-400 hover:text-textcolor'>
                <span className='sr-only'>{item.name}</span>
                <item.icon className='h-6 w-6' aria-hidden='true' />
              </a>
            ))}
          </div>
        </div>
      </footer> */}
    </div>
  )
}

export default PageNotFound
