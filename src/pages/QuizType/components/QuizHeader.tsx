import TimeStamp from "../../../components/Time/TimeStamp";
import { Dispatch, SetStateAction } from "react";

const QuizHeader = ({
  title = "",
  setActive,
}: {
  title?: string;
  setActive: Dispatch<
    SetStateAction<"menu" | "reading" | "writing" | "listening">
  >;
}) => {
  return (
    <div className="px-0">
      <div className="common-btn flex justify-between items-center p-6">
        <button className="" onClick={() => setActive("menu")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 "
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <h3 className="text-xl font-medium ">{title}</h3>
        <TimeStamp hours={1} />
      </div>
    </div>
  );
};

export default QuizHeader;
