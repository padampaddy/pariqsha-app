import { useContext } from "react";
import TimeStamp from "../../../components/TimeStamp";
import ExamContext from "../../../contexts/examContext";

const QuizHeader = ({ time }: { time: string }) => {
  const { setActive, active } = useContext(ExamContext);

  const title =
    active === "reading"
      ? "Reading"
      : active === "listening"
      ? "Listening"
      : "Writing";

  const hours = Math.floor(parseInt(time) / 60);
  const minutes = parseInt(time) % 60

  return (
    <>
      <div className="common-btn flex justify-between items-center md:p-6 p-3.5 relative">
        <button
          className="left-4 top-0 bottom-0 my-auto absolute"
          onClick={() => setActive("menu")}
        >
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
        <h3 className="text-xl flex-grow text-center font-medium ">{title}</h3>
        <div className="absolute top-1/2 transform -translate-y-1/2 right-4">
          <TimeStamp hours={hours} minutes={minutes}/>
        </div>
      </div>
    </>
  );
};

export default QuizHeader;
