import { zodResolver } from '@hookform/resolvers/zod'
import { FC } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { createQuestionValidator, createQuestionValidatorType } from '../shared/create-question-validator'
import { trpc } from '../utils/trpc'

interface QuestionCreatorFormProps {
  createPoll: any
}

const QuestionCreatorForm: FC<QuestionCreatorFormProps> = ({ createPoll }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<createQuestionValidatorType>({
    resolver: zodResolver(createQuestionValidator),
    defaultValues: { question: '', options: [{ label: '' }] },
  })

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'options', // unique name for your Field Array
  })

  const { mutate, isLoading } = trpc.useMutation('question.create', {
    onSuccess: () => console.log('question successfully created'),
  })

  return (
    <div>
      <form id='questionCreatorForm' onSubmit={handleSubmit((data) => createPoll(data))}>
        <div className='flex flex-col gap-3'>
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
              Poll question
            </label>
            <div className='mt-1'>
              <input
                {...register('question', {
                  required: {
                    value: true,
                    message: 'This field is required.',
                  },
                })}
                className='form-input shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                placeholder='Where do we go next friday?'
              />
              {errors?.question && <p className='text-sm text-red-600 pt-1.5'>{errors.question.message}</p>}
            </div>
          </div>
          {fields.map((field, index) => (
            <div key={field.id}>
              <div className='flex items-center justify-between'>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                  Option {index + 1}
                </label>
                <button type='button' className='text-xs text-gray-500' onClick={() => remove(index)}>
                  remove
                </button>
              </div>
              <div className='mt-1'>
                <input
                  key={field.id} // important to include key with field's id
                  {...register(`options.${index}.label`)}
                  className='form-input shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                  placeholder='New option'
                />
                {/* {errors?.pollOptions && <p>{errors.pollOptions.message}</p>} */}
              </div>
            </div>
          ))}
          {errors?.options && <p className='text-sm text-red-600'>{errors.options.message}</p>}
          <button
            type='button'
            onClick={() => append({ label: '' })}
            className='text-gray-500 text-sm text-left mt-4 w-fit p-0.5'>
            Add new option
          </button>
        </div>
      </form>
    </div>
  )
}

export default QuestionCreatorForm

{
  /* <input
  key={field.id} // important to include key with field's id
  {...register(`pollOptions.${index}.label`)}
/> */
}
