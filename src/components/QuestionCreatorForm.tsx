import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { HiX } from 'react-icons/hi'
import { BarLoader } from 'react-spinners'
import { createQuestionValidator, createQuestionValidatorType } from '../shared/create-question-validator'
import { trpc } from '../utils/trpc'

interface QuestionCreatorFormProps {}

const QuestionCreatorForm: FC<QuestionCreatorFormProps> = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useForm<createQuestionValidatorType>({
    resolver: zodResolver(createQuestionValidator),
    defaultValues: { question: '', options: [{ label: '' }] },
  })

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'options', // unique name for your Field Array
  })

  const { mutate: createPoll, isLoading } = trpc.useMutation('poll.create', {
    onSuccess: (data) => {
      router.push(`/poll/${data.id}`)
    },
  })

  return (
    <form
      onSubmit={handleSubmit((data) => createPoll(data))}
      className='bg-secondary px-4 py-5 border-b border-bordercolor rounded-t-md sm:px-6'>
      <div className='mt-1'>
        <input
          spellCheck={false}
          {...register('question')}
          className='w-full outline-none p-4 rounded-md bg-primary text-xl placeholder-textcolor'
          placeholder='Which is your favorite superpower?'
        />
        {errors?.question && <p className='text-sm text-red-600 pt-1.5'>{errors.question.message}</p>}
      </div>

      <div className='flow-root mt-6'>
        <ul role='list' className='-my-5 divide-y divide-bordercolor'>
          <li className='py-5'>
            <div className='relative flex flex-col gap-4'>
              {fields.map((field, index) => (
                <div key={field.id}>
                  <label htmlFor='email' className='block text-sm font-medium text-textcolor'>
                    Option {index + 1}
                  </label>
                  <div className='mt-1 flex rounded-md shadow-sm'>
                    <div className='relative flex items-stretch flex-grow focus-within:z-10'>
                      <input
                        spellCheck={false}
                        {...register(`options.${index}.label`)}
                        className='block placeholder-textcolor outline-none focus:border-blue-500 w-full rounded-none rounded-l-md pl-4 sm:text-sm border border-bordercolor bg-primary'
                        placeholder={`Option ${index + 1}`}
                      />
                    </div>
                    <button
                      type='button'
                      onClick={() => remove(index)}
                      className='-ml-px outline-none relative inline-flex items-center space-x-2 px-3 sm:px-4 py-2 border border-bordercolor focus:border-blue-500 text-sm font-medium rounded-r-md text-textcolor hover:bg-black'>
                      <HiX className='h-5 w-5 text-red-600' aria-hidden='true' />
                      <span className='hidden sm:block'>Remove</span>
                    </button>
                  </div>
                  {errors?.options?.[index] && (
                    <p className='text-sm text-red-600 pt-1.5'>{errors.options[index]?.label?.message}</p>
                  )}
                </div>
              ))}
              {errors?.options && <p className='text-sm text-red-600'>{errors.options.message}</p>}
            </div>
          </li>
        </ul>
      </div>
      <div className='mt-6 flex justify-between'>
        <button
          type='button'
          tabIndex={0}
          onClick={() => {
            append({ label: '' })
          }}
          className='relative outline-none py-2 px-3.5 inline-flex items-center justify-center text-center no-underline leading-none whitespace-nowrap font-semibold rounded shrink-0 transition select-none overflow-hidden focus-ring hover:bg-secondary text-white border border-bordercolor focus:border-blue-500 bg-primary text-sm'>
          Add another option
        </button>
        <button
          type='submit'
          disabled={!isValid}
          className='relative disabled:text-textcolor outline-none h-8 w-20 inline-flex items-center justify-center text-center no-underline leading-none whitespace-nowrap font-semibold rounded shrink-0 transition select-none overflow-hidden focus-ring hover:bg-secondary text-white border disabled:border-bordercolor border-blue-500 focus:border-white bg-primary text-sm'>
          {isLoading || isSubmitting ? <BarLoader className='w-14' width='50' color='#3b82f6' /> : 'Create'}
        </button>
      </div>
    </form>
  )
}

export default QuestionCreatorForm
{
  /* <div>
      <form id='questionCreatorForm' onSubmit={handleSubmit((data) => createPoll(data))}>
        <div className='flex flex-col gap-3'>
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-accentLight'>
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
                  key={field.id}
                  {...register(`options.${index}.label`)}
                  className='form-input shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                  placeholder='New option'
                />
               
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
    </div> */
}

{
  /* <input
  key={field.id} // important to include key with field's id
  {...register(`pollOptions.${index}.label`)}
/> */
}
