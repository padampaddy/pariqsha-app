import Note from "../components/Note";
import QuestionType from "../../../components/QuestionType";
import QuizFooter from "../components/QuizFooter";
import QuizHeader from "../components/QuizHeader";
import { IQues } from "../../../types/Quiz";
import { SetStateAction, useState } from "react";

interface Props {
  questions: (IQues & { exam_question_id: string })[];
  setActive: React.Dispatch<SetStateAction<"menu" | "reading" | "writing" | "listening">>
 
}

const Writing = ({ questions = [], setActive }: Props) => {
  const [currQues, setCurrQues] = useState(0);
  const [ans] = useState<string>("");

  return (
    <>
      <div className="flex md:w-1/2 md:mx-auto flex-col bg-white md:shadow-md h-full">
        <div className="flex-grow-0 ">
          <QuizHeader title="Writing " />
        </div>
        <div className="flex-grow bg-white mx-0  overflow-y-auto">
          <div className=" px-6 py-4">
            <QuestionType title="Write on an A4 sheet then scan and upload ." />
            <Note />
            <div className="flex  items-center justify-center mt-5">
              <label className="w-64 flex flex-col items-center px-4 py-6 bg-gray-100 text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-500 hover:text-white">
                <span className="mt-2 text-base leading-normal">
                  Choose Here For Upload
                </span>
                <input type="file" className="hidden" />
              </label>
            </div>
          </div>
        </div>
        <div className="flex-grow-0 quiz-footer common-btn">
          <QuizFooter
            ans={ans}
            setActive={setActive}
            currQues={currQues}
            setCurrQues={setCurrQues}
            questions={questions}
          />
        </div>
      </div>
    </>
  );
};

export default Writing;
