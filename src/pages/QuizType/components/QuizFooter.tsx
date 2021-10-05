import { Dispatch, SetStateAction } from "react";
import { useMutation } from "@apollo/client";
import { IQues, ISendAnswer } from "../../../types/Quiz";
import { SEND_ANSWER } from "../../../api/queries";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

interface Props {
  questions: (IQues & { exam_question_id: string })[];
  setActive: React.Dispatch<SetStateAction<"menu" | "reading" | "writing" | "listening">>
  currQues: number;
  ans: string;
  setCurrQues: Dispatch<SetStateAction<number>>;
}
const QuizFooter = ({
  setActive,
  currQues,
  setCurrQues,
  ans,
  questions = [],
}: Props) => {
  const user = useSelector((state: RootState) => state.user.entities?.user);
  const [sendAnswer] = useMutation<ISendAnswer>(SEND_ANSWER);
  // const [updateAnswer] = useMutation<ISendAnswer>(UPDATE_ANSWER);

  const status =
    ans === ""
      ? "Unanswered"
      : ans === questions[currQues].correct_answer
      ? "Correct"
      : "Wrong";

  const handleNext = () => {
    // if not submitted previously
    sendAnswer({
      variables: {
        answer: ans,
        quesId: questions[currQues].exam_question_id,
        userId: user?.id,
        status: status,
      },
    })
      .then((info) => {
        console.log(info);
      })
      .catch((e) => console.error(e));
    if (questions.length-1 === currQues) {
      setActive(a=>a==="reading"?"listening":a==="listening"?"writing":"menu")
    } else setCurrQues(currQues + 1);
  };

  const handlePrev = () => {
    setCurrQues(currQues - 1);
  };

  return (
    <div className="btn-grup  flex justify-between ">
      <button className="footer-button" onClick={()=>setActive("menu")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
        Menu
      </button>
      <div>
        {currQues !== 0 && (
          <button className="footer-button mr-2" onClick={handlePrev}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Previous
          </button>
        )}
        <button className="footer-button" onClick={handleNext}>
          {/* { currQues.length - 1 ? 'Submit' : 'Next'} */}
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
export default QuizFooter;
