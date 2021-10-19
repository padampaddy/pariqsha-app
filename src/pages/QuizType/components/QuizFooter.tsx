import { useCallback } from "react";
import { useMutation } from "@apollo/client";
import { ISendAnswer } from "../../../types/Quiz";
import { SEND_ANSWER } from "../../../api/queries";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useContext } from "react";
import ExamContext from "../../../contexts/examContext";
import { useHistory } from "react-router-dom";

const QuizFooter = () => {
  const history = useHistory();
  const user = useSelector((state: RootState) => state.user.entities?.user);
  const [sendAnswer] = useMutation<string[]>(SEND_ANSWER);
  const {
    active,
    setActive,
    setCurrentQuestionIndex,
    currentQuestionIndex,
    userAnswers,
    setUserAnswers,
    userAnswer,
    setUserAnswer,
    questions,
  } = useContext(ExamContext);

  const setLocalAns = useCallback(
    (userAnswer) => {
      const answersObj: ISendAnswer = {
        exam_question_id: questions[currentQuestionIndex].exam_question_id,
        status:
          userAnswer === ""
            ? "unanswered"
            : userAnswer === questions[currentQuestionIndex]?.correct_answer
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
    },
    [currentQuestionIndex]
  );

  const handleNext = () => {
    setLocalAns(userAnswer);
    if (questions.length - 1 === currentQuestionIndex) {
      setActive((a) =>
        a === "reading" ? "listening" : a === "listening" ? "writing" : "menu"
      );
    } else setCurrentQuestionIndex(currentQuestionIndex + 1);
    setUserAnswer("");
  };

  const handlePrev = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleSubmit = () => {
    const arrStr = localStorage.getItem("answers");
    let arr = [];
    if (arrStr) {
      arr = JSON.parse(arrStr);
    }
    const dataToSend: ISendAnswer[] = [];
    arr.forEach(
      (answer: { answer: string; quesId: string; status: string }) => {
        dataToSend.push({
          answer: answer.answer,
          exam_question_id: answer.quesId,
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
        setUserAnswers([]);
        history.push("/submit");
      })
      .catch((e) => console.error(e));
      history.push("/submit");
  };

  return (
    <div className="btn-grup">
      {currentQuestionIndex !== 0 && (
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
      {active === "writing" && currentQuestionIndex === questions.length - 1 ? (
        <button className="footer-button float-right" onClick={handleSubmit}>
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
      ) : (
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
      )}
    </div>
  );
};

export default QuizFooter;
