import { Prisma } from '@prisma/client'
import { FC } from 'react'
import { option } from '../shared/typings'

interface OwnerViewProps {
  index: number
  option: option
  votes:
    | (Prisma.PickArray<Prisma.VoteGroupByOutputType, 'choice'[]> & {
        _count: number
      })[]
    | undefined
}

const OwnerView: FC<OwnerViewProps> = ({ index, option, votes }) => {
//   console.log('votes[0]', votes?.[0]?._count)
  return <p key={`option-${index}`}>{`${option.label} - ${votes?.[index]?._count ?? '0'} votes`}</p>
}

export default OwnerView
