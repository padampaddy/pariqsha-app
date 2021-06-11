import { ReactElement } from "react";

interface Props {
  title?: string;
  subTitle?: string;
  content?: ReactElement;
  imgSrc?: string;
  coverImgSrc?: string;
  footer?: ReactElement;
  date?: string;
  time?: string;
  duration?: string;
}

export default function Card({
  title,
  subTitle,
  content,
  imgSrc,
  coverImgSrc,
  footer,
  date,
  time,
  duration,
}: Props): ReactElement {
  return (
    <div
      className="w-full max-w-md bg-white border-2 flex flex-col overflow-hidden border-gray-300 rounded-md tracking-wide shadow-lg"
      style={{ zoom: 0.8 }}
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
        </div>
      )}
      <div className="p-6 flex-grow">
        <div id="header" className="flex items-center mb-4">
          {imgSrc && (
            <img
              alt="avatar"
              className="w-16 h-16 object-contain rounded-full border-2 border-gray-300"
              src={imgSrc}
            />
          )}{" "}
          <div id="header-text" className="leading-5 ml-6 sm">
            <h4 id="name" className="text-xl font-semibold">
              {title}<span className="text-sm ml-4 text-gray-600">({duration})</span>
            </h4>

            <h5 id="job" className="font-semibold text-blue-600">
              {subTitle}
            </h5>
          </div>
        </div>
        <div>{content}</div>
      </div>
      {footer && (
        <div className="border-t-2 flex  flex-row px-6 py-3 items-center">
          {footer}
        </div>
      )}
    </div>
  );
}
