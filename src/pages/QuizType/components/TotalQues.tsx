import { useCallback, useContext } from "react";
import ExamContext from "../../../contexts/examContext";

const TotalQues = () => {
  const {
    questions,
    setCurrentQuestionIndex,
    currentQuestionIndex,
    userAnswers,
  } = useContext(ExamContext);

  const isAnswered = useCallback(
    (idx) => {
      const userAnswer = userAnswers.find(
        (uA) => uA.exam_question_id === questions?.[idx]?.exam_question_id
      );
      return !!userAnswer && userAnswer.answer !== "";
    },
    [userAnswers, currentQuestionIndex]
  );

  return (
    <>
      <div className="qstn-list mb-1 m-auto py-3 px-2">
        <ul className="">
          {questions.map((_, idx) => (
            <li
              className={`
               ${
                 isAnswered(idx)
                   ? "bg-green-500 text-white"
                   : "text-blue-500 border-2 border-blue-500"
               }
               ${currentQuestionIndex === idx ? "common-btn" : ""} `}
              key={idx}
              role="button"
              onClick={() => setCurrentQuestionIndex(idx)}
            >
              {1 + idx}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TotalQues;
