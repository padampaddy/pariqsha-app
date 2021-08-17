import { ReactElement } from 'react'

interface Props {
  price?: number
}

export default function PriceTag({ price }: Props): ReactElement {
  return (
    <div
      className="inline-flex items-center justify-center w-32 py-2 absolute top-2 
      text-lg -left-8 bg-pink-600 font-bold transform -rotate-45 text-gray-200 bg-opacity-80"
    >
      {!!price && price !== 0
        ? String.fromCharCode(0x20b9) + price + '/-'
        : `Free`}
    </div>
  )
}
