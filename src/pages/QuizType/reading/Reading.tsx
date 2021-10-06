import { SetStateAction, useState } from "react";
import Loader from "../../../components/Loader";
import QuizFooter from "../components/QuizFooter";
import QuizHeader from "../components/QuizHeader";
import { IQues } from "../../../types/Quiz";
import TrueFalse from "../../../components/Type of Ques/TrueFalse";
import WordLimit from "../../../components/Type of Ques/WordLimit";
import Mcq from "../../../components/Type of Ques/Mcq";
import Tip from "../components/Tip";
import CheckBox from "../../../components/Type of Ques/CheckBox";
import QuestionType from "../../../components/QuestionType";

interface Props {
  questions: (IQues & { exam_question_id: string })[];
  setActive: React.Dispatch<
    SetStateAction<"menu" | "reading" | "writing" | "listening">
  >;
  loading: boolean;
}
const Reading = ({ questions = [], setActive, loading }: Props) => {
  const [currQues, setCurrQues] = useState(0);
  const [ans, setAns] = useState<string>("");

  const type = questions[currQues].type_of_question.name;
  const tip = questions[currQues].type_of_question_description_override;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex md:w-1/2 md:mx-auto flex-col bg-white md:shadow-md h-full">
          <div className="flex-grow-0">
            <QuizHeader title="Reading "  setActive={setActive}/>
          </div>
          <div className="flex-grow bg-white mx-0">
            <div className="px-6 py-4 flex flex-col h-full">
            <QuestionType title="Read Passage" />
              {tip && <Tip detail={tip} />}
              <div className="mt-2 flex flex-col h-full">
                {/* passage */}
                <div className="flex-grow overflow-y-auto md:h-50 h-36">
                  <p className="text-sm">{questions[currQues].context.details}</p>
                </div>
                {/* questions */}
                <div className="flex-grow-0">
                  <p className="mt-5 font-bold">Questions {currQues + 1}</p>
                  <h5 className="text-sm mt-2">
                    {questions[currQues].question}
                  </h5>
                  {/* type of question */}
                  <div className=" mt-2">
                    {type === "true_false_not_given" ? (
                      <TrueFalse
                        ans={ans}
                        onUpdate={(e) => {
                          console.log(e.target.value);
                          setAns(e.target.value);
                        }}
                      />
                    ) : type === "multiple_choice_question" ? (
                      <Mcq
                        options={questions[currQues].options}
                        ans={ans}
                        onUpdate={(e) => setAns(e.target.value)}
                      />
                    ) : type === "checkbox" ? (
                      <CheckBox
                        options={questions[currQues].options}
                        ans={ans}
                        onUpdate={(e) => setAns(e.target.value)}
                      />
                    ) : (
                      <WordLimit
                        ans={ans}
                        onUpdate={(e) => setAns(e.target.value)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-grow-0 quiz-footer common-btn">
            <QuizFooter
              ans={ans}
              // setAns={setAns}
              setActive={setActive}
              currQues={currQues}
              setCurrQues={setCurrQues}
              questions={questions}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default Reading;
