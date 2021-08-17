import { ReactElement } from 'react'
import PriceTag from './PriceTag'

interface Props {
  title?: string
  subTitle?: string
  content?: ReactElement
  imgSrc?: string
  coverImgSrc?: string
  footer?: ReactElement
  date?: string
  time?: string
  duration?: string
  price?: number
  decorate?: boolean
}

export default function Card({
  title,
  decorate = false,
  subTitle,
  content,
  imgSrc,
  coverImgSrc,
  footer,
  date,
  price,
  time,
  duration,
}: Props): ReactElement {
  return (
    <div
      className={`w-full text-sm ${
        decorate ? 'max-w-md' : 'max-w-6xl'
      } bg-white flex flex-col overflow-hidden  tracking-wide ${
        decorate ? 'shadow-lg border-gray-300  rounded-md border-2' : ''
      }`}
      style={{
        zoom: decorate ? 0.85 : 1,
      }}
    >
      {coverImgSrc && (
        <div className="relative">
          {date && (
            <div className="absolute top-0 bottom-0 my-auto w-full flex flex-col justify-center items-end bg-opacity-20 bg-black right-0 text-gray-200 text-2xl font-bold">
              <span className="bg-blue-700 py-4 px-8 bg-opacity-80 rounded-l-md">
                {date}
              </span>
              <span className="bg-blue-700 py-2 mt-2 text-sm px-8 bg-opacity-70  rounded-l-md">
                starts {time}
              </span>
            </div>
          )}
          <img
            className="w-full h-48 object-cover object-center"
            src={coverImgSrc}
            alt="cover"
          />
          <PriceTag price={price} />
        </div>
      )}
      <div className="p-6 flex-grow">
        <div id="header" className="flex items-center mb-4">
          {imgSrc && (
            <img
              alt="avatar"
              className="w-16 h-16 rounded-full border-2 object-cover border-gray-300"
              src={imgSrc}
            />
          )}{' '}
          <div id="header-text" className="leading-5 w-full relative ml-6 sm">
            <h4 id="name" className="text-xl font-semibold">
              {title}
              <span className="text-sm ml-4 text-gray-600">({duration})</span>
            </h4>

            <h5 id="job" className="font-semibold text-blue-600">
              {subTitle}
            </h5>
            {footer && !decorate &&  (
              <div className="hidden absolute top-0 right-0 py-3 max-w-lg md:flex">
                {footer}
              </div>
            )}
          </div>
        </div>
        <div>{content}</div>
      </div>
      {footer && (
        <div className="border-t-2 flex flex-row px-6 py-3 justify-between items-center">
          {footer}
        </div>
      )}
    </div>
  )
}
