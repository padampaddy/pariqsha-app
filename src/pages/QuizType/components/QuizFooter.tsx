import { Dispatch, SetStateAction } from "react";
import { useMutation } from "@apollo/client";
import { IExamAns, IQues, ISendAnswer } from "../../../types/Quiz";
import { GET_EXAM_ANS, SEND_ANSWER } from "../../../api/queries";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import useAuthSubscription from "../../../hooks/useAuthSubscription";

interface Props {
  questions: (IQues & { exam_question_id: string })[];
  setActive: Dispatch<
    SetStateAction<"menu" | "reading" | "writing" | "listening">
  >;
  currQues: number;
  ans: string;
  setAns: React.Dispatch<SetStateAction<string>>;
  setCurrQues: Dispatch<SetStateAction<number>>;
}
const QuizFooter = ({
  setActive,
  currQues,
  setCurrQues,
  ans,
  setAns,
  questions = [],
}: Props) => {
  const user = useSelector((state: RootState) => state.user.entities?.user);
  const { data } = useAuthSubscription<IExamAns>(GET_EXAM_ANS, {
    id: questions[currQues].exam_question_id,
  });
  const [sendAnswer] = useMutation<ISendAnswer>(SEND_ANSWER);
  // const [updateAnswer] = useMutation<ISendAnswer>(UPDATE_ANSWER);
  console.log(data);
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
        setAns("");
      })
      .catch((e) => console.error(e));
    if (questions.length - 1 === currQues) {
      setActive((a) =>
        a === "reading" ? "listening" : a === "listening" ? "writing" : "menu"
      );
    } else setCurrQues(currQues + 1);
  };

  const handlePrev = () => {
    setCurrQues(currQues - 1);
  };

  return (
    <div className="btn-grup">
      {currQues !== 0 && (
        <button className="footer-button float-left" onClick={handlePrev}>
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

      <button className="footer-button float-right" onClick={handleNext}>
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
  );
};
export default QuizFooter;
