import { useContext } from "react";
import TrueFalse from "../../components/Type of Ques/TrueFalse";
import WordLimit from "../../components/Type of Ques/WordLimit";
import Mcq from "../../components/Type of Ques/Mcq";
import Tip from "./components/Tip";
// import CheckBox from "../../components/Type of Ques/CheckBox";
import QuestionType from "../../components/QuestionType";
import ExamContext from "../../contexts/examContext";

const Reading = () => {
  const { questions, currentQuestionIndex } = useContext(ExamContext);
  const type = questions[currentQuestionIndex]?.type_of_question.name;
  const tip =
    questions[currentQuestionIndex]?.type_of_question_description_override;

  return (
    <>
      <div className="flex-grow bg-white mx-0">
        <div className="md:px-6 md:py-4 px-3 py-1.5 flex flex-col h-full">
          <QuestionType title="Read Passage" />
          
          <div className="mt-1.5 flex flex-col h-full">
            {/* passage */}
            <p className="text-sm font-bold mb-2">
              {questions[currentQuestionIndex].context.title}
            </p>
            <div className="flex-grow overflow-y-auto md:h-50 h-36">
              <p className="text-sm whitespace-pre-wrap">
                {questions[currentQuestionIndex].context.details}
              </p>
            </div>
            {/* questions */}
            <div className="flex-grow-0">
            {tip && <Tip detail={tip} />}
              <p className="mt-3 font-bold">
                Questions {currentQuestionIndex + 1}
              </p>
              <h5 className="text-sm mt-2">
                {questions[currentQuestionIndex].question}
              </h5>
              {/* type of question */}
              <div className="mt-1.5">
                {type === "true_false_not_given" ? (
                  <TrueFalse />
                ) : type === "multiple_choice_question" ? (
                  <Mcq />
                ) : (
                  // ) : type === "checkbox" ? (
                  //   <CheckBox />
                  <WordLimit />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Reading;
