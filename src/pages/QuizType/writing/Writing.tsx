import Note from "../components/Note";
import QuizFooter from "../components/QuizFooter";
import QuizHeader from "../components/QuizHeader";
import { IQues } from "../../../types/Quiz";
import { SetStateAction, useState } from "react";

interface Props {
  questions: (IQues & { exam_question_id: string })[];
  setActive: React.Dispatch<
    SetStateAction<"menu" | "reading" | "writing" | "listening">
  >;
}

const Writing = ({ questions = [], setActive }: Props) => {
  const [currQues, setCurrQues] = useState(0);
  const [ans, setAns] = useState<string>("");

  console.log(setAns);

  const img = questions[currQues]?.image_link;

  return (
    <>
      <div className="flex md:w-1/2 md:mx-auto flex-col bg-white md:shadow-md h-full">
        <div className="flex-grow-0 ">
          <QuizHeader title="Writing" setActive={setActive} />
        </div>
        <div className="flex-grow bg-white px-6 py-4 overflow-y-auto h-full">
          <Note detail="Write on an A4 sheet then scan and upload." />
          <div>
            <p className="mt-5 font-bold">Questions {currQues + 1}</p>
            <h5 className="text-sm mt-4">{questions[currQues].question}</h5>
          </div>
          {img && <img className="mt-1 " src={img} />}
          <div className="flex items-center justify-center mt-5">
            <label className=" flex items-center px-6 py-4 common-btn text-blue rounded-lg shadow-lg tracking-wide uppercase  cursor-pointer ">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
              </span>
              Upload File Here
              <input type="file" className="hidden" />
            </label>
          </div>
        </div>
        <div className="flex-grow-0 quiz-footer common-btn">
          <QuizFooter
            ans={ans}
            setAns={setAns}
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
