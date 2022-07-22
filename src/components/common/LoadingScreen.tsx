import { FC } from 'react'
import { BarLoader } from 'react-spinners'

interface LoadingScreenProps {}

const LoadingScreen: FC<LoadingScreenProps> = ({}) => {
  return (
    <div className='absolute inset-0 flex justify-center items-center'>
      <BarLoader width={150} color='#3b82f6' />
    </div>
  )
}

export default LoadingScreen
