import { FC } from 'react'
import QuestionCreatorForm from './QuestionCreatorForm'

interface QuestionCreatorProps {}

const QuestionCreator: FC<QuestionCreatorProps> = ({}) => {
  return (
    <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
      <QuestionCreatorForm />
    </div>
  )
}

export default QuestionCreator
