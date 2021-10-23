import { useMutation } from "@apollo/client";
import { useCallback, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { SEND_ANSWER } from "../api/queries";
import ExamContext from "../contexts/examContext";
import modalSlice from "../redux/slices/modal-slice";
import { RootState } from "../redux/store";
import { ISendAnswer } from "../types/Quiz";

const TimeOverPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.entities?.user);
    const [sendAnswer] = useMutation<string[]>(SEND_ANSWER);
    const {
        currentQuestionIndex,
        userAnswers,
        setUserAnswers,
        userAnswer,
        questions,
      } = useContext(ExamContext);

      const setLocalAns = useCallback(
        (userAnswer) => {
          const answersObj: ISendAnswer = {
            exam_question_id: questions[currentQuestionIndex]?.exam_question_id,
            status:
              userAnswer === ""
                ? "unanswered"
                : userAnswer?.trim() === questions[currentQuestionIndex]?.correct_answer?.trim()
                ? "correct"
                : "wrong",
            answer: userAnswer,
          };
          const index = userAnswers.findIndex(
            (a) => a.exam_question_id === answersObj.exam_question_id
          );
          if (index === -1) {
            setUserAnswers([...userAnswers, answersObj]);
          } else {
            setUserAnswers([
              ...userAnswers.slice(0, index),
              answersObj,
              ...userAnswers.slice(index + 1),
            ]);
            userAnswers[index] = answersObj;
          }
          return userAnswers;
        },
        [currentQuestionIndex]
      );

    const handleSubmit = () => {
        const arr = setLocalAns(userAnswer);
        const dataToSend: ISendAnswer[] = [];
        arr.forEach(
          (answer: {
            answer: string;
            exam_question_id: string;
            status: string;
          }) => {
            dataToSend.push({
              answer: answer.answer,
              exam_question_id: answer.exam_question_id,
              user_id: user!.id,
              status: answer.status,
            });
          }
        );
        sendAnswer({
          variables: {
            objects: dataToSend,
          },
        })
          .then((info) => {
            console.log(info);
            history.push("/submit");
            setUserAnswers([]);
            setLocalAns("");
            localStorage.removeItem("answers");
            dispatch(modalSlice.actions.hideModal());
          })
          .catch((e) => console.error(e));
      };

  return (
    <>
      <div className="flex items-center">
        <div className=" flex-shrink-0 flex items-center justify-center rounded-full bg-red-100 h-10 w-10">
          <svg
            className="h-6 w-6 text-red-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div
          className="text-lg leading-6 font-medium text-gray-900  flex-grow  md:ml-4 ml-2"
          id="modal-title"
        >
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Time's up!
        </div>
      </div>

      <div className="py-4">Your time is over. Please submit your test</div>

      <div className="flex md:justify-end justify-center pt-2">
        <button
          type="submit"
          onClick={handleSubmit}
          className="common-btn py-1.5 px-3 m-auto rounded flex items-center justify-center"
        >
         <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Submit
        </button>
      </div>
    </>
  );
};

export default TimeOverPage;
