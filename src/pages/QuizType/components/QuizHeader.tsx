import { useQuery } from "@apollo/client";
import moment from "moment";
import { useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import { GET_EXAM_DATA } from "../../../api/queries";
import TimeStamp from "../../../components/TimeStamp";
import ExamContext from "../../../contexts/examContext";
import { RootState } from "../../../redux/store";
import { IExamData } from "../../../types/Quiz";

const QuizHeader = ({ time, examId }: { time: string; examId: string }) => {
  const { setActive, active } = useContext(ExamContext);
  const user = useSelector((state: RootState) => state.user.entities?.user);
  const { data } = useQuery<IExamData>(GET_EXAM_DATA, {
    variables: {
      user: user?.id,
      examId: examId,
    },
  });

  const title =
    active === "reading"
      ? "Reading"
      : active === "listening"
      ? "Listening"
      : "Writing";

  const startedAt = data?.exams_registration?.[0].started_at;
  const [hours, minutes] = useMemo(() => {
    if (!startedAt) {
      return [Math.floor(parseInt(time) / 60), parseInt(time) % 60];
    } else {
      const startedDate = moment(startedAt);
      const now = moment();
      const diffMinutes = now.diff(startedDate, "m");
      const timeLeft = parseInt(time) - diffMinutes;

      return [Math.floor(timeLeft / 60), timeLeft % 60];
    }
  }, [time, startedAt]);

  return (
    <>
      <div
        className={`${
          active !== "menu" ? "common-btn " : "p-3 bgTime"
        }flex justify-between items-center md:p-6 p-3.5 relative`}
      >
        {active === "menu" ? (
          <div />
        ) : (
          <>
            {" "}
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
            <h3 className="text-xl flex-grow text-center font-medium ">
              {title}
            </h3>
          </>
        )}
        <div className="absolute top-1/2 transform -translate-y-1/2 right-4">
          <TimeStamp hours={hours} minutes={minutes} />
        </div>
      </div>
    </>
  );
};

export default QuizHeader;
