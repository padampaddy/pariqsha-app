import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
// import { RootState } from "../redux/store";
// import { useSelector } from "react-redux";
import { GET_EXAM_QUES } from "../api/queries";
import { IExamQues, IGroupedQuestions, ISendAnswer } from "../types/Quiz";
import { useEffect, useMemo, useState } from "react";
import Listening from "./QuizType/Listening";
import Reading from "./QuizType/Reading";
import Writing from "./QuizType/Writing";
import GeneralLayout from "../layouts/General";
import ExamContext from "../contexts/examContext";
import QuizFooter from "./QuizType/components/QuizFooter";
import Menu from "./QuizType/Menu";
import TotalQues from "./QuizType/components/TotalQues";
import QuizHeader from "./QuizType/components/QuizHeader";

const ExamStart = () => {
  const { id } = useParams<{ id: string }>();
  const [active, setActive] = useState<
    "menu" | "reading" | "writing" | "listening"
  >("menu");
  const [userAnswers, setUserAnswers] = useState<ISendAnswer[]>([]);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  // const user = useSelector((state: RootState) => state.user.entities?.user);
  const { data } = useQuery<{ exams_exam_question: IExamQues[] }>(
    GET_EXAM_QUES,
    {
      variables: {
        examId: id,
      },
    }
  );
  useEffect(() => {
    setCurrentQuestionIndex(0);
  }, [active]);
  const groupedQue = useMemo(() => {
    if (data?.exams_exam_question) {
      const obj: IGroupedQuestions = {
        reading: [],
        listening: [],
        writing: [],
      };
      data?.exams_exam_question.reduce((pV, cV) => {
        pV[
          cV.question.part.name.toLowerCase() as
            | "reading"
            | "writing"
            | "listening"
        ].push({ ...cV.question, exam_question_id: cV.id });
        return pV;
      }, obj);
      return obj;
    } else {
      return {
        reading: [],
        listening: [],
        writing: [],
      };
    }
  }, [data]);

  return (
    <GeneralLayout hideFooter>
      <ExamContext.Provider
        value={{
          questions: active !== "menu" ? groupedQue[active] : [],
          setActive,
          active,
          setUserAnswers,
          userAnswers,
          currentQuestionIndex,
          setCurrentQuestionIndex,
          userAnswer,
          setUserAnswer,
        }}
      >
        <div
          className={`flex ${
            active !== "menu" ? "md:w-1/2" : ""
          } md:mx-auto flex-col bg-white md:shadow-md h-full`}
        >
          {active === "menu" ? null : (
            <div className="flex-grow-0">
              <QuizHeader
                title={
                  active === "reading"
                    ? "Reading"
                    : active === "listening"
                    ? "Listening"
                    : "Writing"
                }
                setActive={setActive}
              />
              <TotalQues />
            </div>
          )}
          {active === "menu" ? (
            <Menu groupedQuestions={groupedQue} />
          ) : active === "reading" ? (
            <Reading />
          ) : active === "listening" ? (
            <Listening />
          ) : (
            <Writing />
          )}
          {active === "menu" ? null : (
            <div className="flex-grow-0 quiz-footer common-btn">
              <QuizFooter />
            </div>
          )}
        </div>
      </ExamContext.Provider>
    </GeneralLayout>
  );
};

export default ExamStart;
