import { useMutation } from "@apollo/client";
import { useCallback, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { SEND_ANSWER } from "../api/queries";
import ExamContext from "../contexts/examContext";
import modalSlice from "../redux/slices/modal-slice";
import { RootState } from "../redux/store";
import { ISendAnswer } from "../types/Quiz";
import time from "../assets/lottie/times-up.json"
import Lottie from "react-lottie-player";

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
            : userAnswer?.trim() ===
              questions[currentQuestionIndex]?.correct_answer?.trim()
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
      .then(() => {
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
      <Lottie
          speed={0.7}
          className="md:h-1/5 md:w-1/5 h-1/3 w-1/3 text-center m-auto"
          loop
          animationData={time}
          play
        />
      <div className="py-4 text-sm md:text-base text-center">Your time is over. Please submit your test</div>

      <div className="flex md:justify-end justify-center pt-2">
        <button
          type="submit"
          onClick={handleSubmit}
          className="common-btn py-1.5 px-3 m-auto mb-3 rounded flex items-center justify-center"
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
