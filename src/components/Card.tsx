import { ReactElement } from "react";
import PriceTag from "./PriceTag";
import logo from "../assets/images/pariqsha.png";
import { motion } from "framer-motion";
// import { useHistory } from "react-router-dom";

interface Props {
  id?: string;
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
  likeBtn?: ReactElement;
}

export default function Card({
  // id,
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
  likeBtn,
}: Props): ReactElement {
  // const history = useHistory();
  
  return (
    <motion.div
      className={`w-full text-sm ${
        decorate ? "max-w-md" : "max-w-6xl"
      } bg-white flex flex-col overflow-hidden  tracking-wide ${
        decorate ? "shadow-lg border-gray-300  rounded-md border-2" : ""
      }`}
      style={{
        zoom: decorate ? 0.85 : 1,
      }}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        delay: 0.3,
        ease: "linear",
      }}
    >
      <div className="relative h-30">
        {date && (
          <div className="absolute top-0 bottom-0 my-auto w-full flex flex-col justify-center items-end bg-opacity-20 bg-black right-0 text-gray-200 text-2xl font-bold">
            <span className="bg-blue-700 flex items-center py-4 px-8 bg-opacity-80 rounded-l-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 md:mr-2 mr-1"
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
            </span>
            <span className="bg-blue-700 py-2 flex items-center mt-2 text-sm px-8 bg-opacity-70  rounded-l-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
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
            </span>
          </div>
        )}
        <img
          className="w-full h-48 object-cover object-center"
          src={coverImgSrc ? coverImgSrc : logo}
          alt="cover"
        />
        <PriceTag price={price} />
      </div>
      <div className="p-6 flex-grow">
        <div id="header" className="flex items-center mb-4">
          <img
            alt="avatar"
            className="w-16 h-16 rounded-full border-2 object-cover border-gray-300"
            src={imgSrc ? imgSrc : logo}
          />
          <div id="header-text" className="leading-5 w-full relative ml-6 sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
              <div
                // role="button"
                // onClick={() => history.push(`details/${id}`)}
                id="name"
                className="text-xl font-semibold"
              >
                {title}
              </div>
              <div className="text-sm ml-3 text-gray-600 mt-1">({duration} mins)</div>
              </div>
              <div>
                {likeBtn}
              </div>
            </div>
            <h5 id="job" className="font-semibold text-gray-600">
              {subTitle}
            </h5>
            {/* {footer && !decorate && (
              <div className="hidden absolute top-0 right-0 py-3 max-w-lg md:flex">
                {footer}
              </div>
            )} */}
          </div>
        </div>
        <div>{content}</div>
      </div>
      {footer && (
        <div className="border-t-2 flex flex-row px-6 py-3 justify-between items-center">
          {footer}
        </div>
      )}
    </motion.div>
  );
}
