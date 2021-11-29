import { useCallback, useContext, useEffect, useRef } from "react";
import ExamContext from "../../../contexts/examContext";

const TotalQues = () => {
  const {
    questions,
    setCurrentQuestionIndex,
    currentQuestionIndex,
    userAnswers,
  } = useContext(ExamContext);
  const scrollId = useRef() as React.MutableRefObject<HTMLDivElement>;

  const isAnswered = useCallback(
    (idx) => {
      const userAnswer = userAnswers.find(
        (uA) => uA.exam_question_id === questions?.[idx]?.exam_question_id
      );
      return !!userAnswer && userAnswer.answer !== "";
    },
    [userAnswers, currentQuestionIndex]
  );

  useEffect(() => {
    window.scrollTo({ left: scrollId.current?.offsetLeft, behavior: "smooth" });
  }, [currentQuestionIndex]);

  return (
    <>
      <div className="qstn-list mb-1 m-auto py-3 px-2">
        {questions.map((_, idx) => (
          <div
            ref={scrollId}
            className={`qstn-lists
               ${
                 isAnswered(idx)
                   ? "bg-green-500 text-white"
                   : "text-blue-500 border-2 border-blue-500"
               }
               ${currentQuestionIndex === idx ? "common-btn" : ""} `}
            key={idx}
            role="button"
            onClick={() => {
              setCurrentQuestionIndex(idx);
              window.scrollTo({
                left: scrollId.current?.offsetLeft,
                behavior: "smooth",
              });
            }}
          >
            {1 + idx}
          </div>
        ))}
      </div>
    </>
  );
};

export default TotalQues;
