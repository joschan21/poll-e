import { FC } from 'react'
import Navbar from './Navbar'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      {/* Padding to offset navbar height */}
      <div className='pt-16'>{children}</div>
    </>
  )
}

export default Layout
