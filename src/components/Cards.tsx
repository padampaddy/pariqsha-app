import { ReactElement } from "react";
import PriceTag from "./PriceTag";

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
  price?: number;
  decorate?: boolean;
}

export default function Cards({
  title,
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
    <div>
      <ul>
       
          <li
            className=" "
           
          >
             {coverImgSrc && (
            <div className="border-t relative  overflow-hidden shadow-md  hover:bg-gray-100  bg-white mb-2 cursor-pointer  md:flex transition"  style={{ background: `url(${coverImgSrc})`, backgroundSize:"cover"}}>
            <div className="flex items-start  cursor-pointer transition md:w-7/12">
              <div className="py-4 px-4">
                {imgSrc && (
                  <img
                    src={imgSrc}
                    alt="avatar"
                    className="w-20 h-20 rounded-full border-2 object-cover border-gray-300"
                  />
                )}
              </div>

              <div className=" md:py-4 pt-2">
                <span className="text-xs text-gray-500 font-bold block">
                  {title}
                </span>
                <span className="text-black font-bold md:text-xl">
                  {subTitle}
                </span>
                <PriceTag price={price} />

                <ul>
                  <li className="float-left md:pr-4 pr-2 text-gray-500 flex items-center md:text-sm text-xs md:mb-4">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 md:mr-2 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </span>
                    20qs
                  </li>
                  {date && (
                    <>
                      <li className="float-left md:pr-4 pr-2 text-gray-500 flex items-center md:text-sm text-xs md:mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 md:mr-2 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {date}
                      </li>

                      <li className="float-left md:pr-4 mr-2 text-gray-500 flex items-center md:text-sm text-xs md:mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {time}
                      </li>
                    </>
                  )}
                </ul>
                <div className="items-center float-left w-full text-sm">
                  {content}
                  <span className="text-gray-500 text-xs">
                    Duration: {duration}
                  </span>
                </div>
              </div>
            </div>

            <div className="md:flex  items-end justify-end pb-2 pr-2 md:w-5/12  ">
              <div>
                {footer && (
                  <div className="md:flex md:flex-row pl-3 justify-between items-center mt-2 md:mt-0">
                    <div className=" quiz-button md:mb-0 mb-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      Like
                    </div>

                    {footer}
                  </div>
                )}
              </div>
            </div>
            </div>
            )}
          </li>
      
      </ul>
    </div>
  );
}
