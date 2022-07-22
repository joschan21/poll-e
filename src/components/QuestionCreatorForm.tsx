import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { HiX, HiXCircle } from 'react-icons/hi'
import { BarLoader } from 'react-spinners'
import { createQuestionValidator, createQuestionValidatorType } from '../shared/create-question-validator'
import { trpc } from '../utils/trpc'

interface QuestionCreatorFormProps {}

const QuestionCreatorForm: FC<QuestionCreatorFormProps> = () => {
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    trigger,
    clearErrors,
    formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful },
  } = useForm<createQuestionValidatorType>({
    resolver: zodResolver(createQuestionValidator),
    defaultValues: { question: '', options: [{ label: '' }] },
  })

  const noErrors = Object.keys(errors).length === 0 && errors.constructor === Object

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'options', // unique name for your Field Array
  })

  useEffect(() => {
    if (fields.length >= 2 && fields.length <= 25) clearErrors('options')
  }, [fields])

  const { mutate: createPoll, isLoading } = trpc.useMutation('poll.create', {
    onSuccess: (data) => {
      router.push(`/poll/${data.id}`)
    },
  })

  return (
    <form
      onSubmit={handleSubmit((data) => createPoll(data))}
      className='bg-secondary px-4 py-5 border-b border-bordercolor rounded-t-md sm:px-6'>
      {/* Potential error messages shown here */}
      {!noErrors && (
        <div className='rounded-md bg-red-900/10 border border-red-600 p-4 mb-5'>
          <div className='flex'>
            <div className='flex-shrink-0'>
              <HiXCircle className='h-5 w-5 text-red-600' aria-hidden='true' />
            </div>
            <div className='ml-3'>
              <h3 className='text-sm font-medium text-red-600'>There were errors with your poll</h3>
              <div className='mt-2 text-sm text-red-600'>
                <ul role='list' className='list-disc pl-5 space-y-1'>
                  {errors?.question && (
                    <p className='text-sm text-red-600 pt-1.5'>{errors.question.message}</p>
                  )}
                  {errors?.options && <p className='text-sm text-red-600'>{errors.options.message}</p>}
                  {(errors?.options?.length ?? 0) > 0 && (
                    <p className='text-sm text-red-600'>Options must contain at least 1 character(s)</p>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className='mt-1'>
        <input
          spellCheck={false}
          {...register('question')}
          className='w-full outline-none p-4 rounded-md bg-primary text-xl placeholder-textcolor'
          placeholder='Which is your favorite superpower?'
        />
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
                </div>
              ))}
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
          disabled={!noErrors}
          onClick={() => setSubmitted(true)}
          className='relative disabled:text-textcolor outline-none h-8 w-20 inline-flex items-center justify-center text-center no-underline leading-none whitespace-nowrap font-semibold rounded shrink-0 transition select-none overflow-hidden focus-ring hover:bg-secondary text-white border disabled:border-bordercolor border-blue-500 focus:border-white bg-primary text-sm'>
          {isSubmitSuccessful ? <BarLoader className='w-14' width={50} color='#3b82f6' /> : 'Create'}
        </button>
      </div>
    </form>
  )
}

export default QuestionCreatorForm
