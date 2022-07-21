import Head from 'next/head'
import { FC } from 'react'
import QuestionCreator from '../components/QuestionCreator'

interface createProps {}

const create: FC<createProps> = ({}) => {
  return (
    <>
      <Head>
        <title>Poll-E | New poll</title>
        <meta name='description' content='Poll-E' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <QuestionCreator />
    </>
  )
}

export default create
