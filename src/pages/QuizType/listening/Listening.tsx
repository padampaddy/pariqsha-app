import Note from "../components/Note";
import QuizHeader from "../components/QuizHeader";
import { IQues } from "../../../types/Quiz";
import QuizFooter from "../components/QuizFooter";
import { SetStateAction, useState } from "react";

interface Props {
  questions: (IQues & { exam_question_id: string })[];
  setActive: React.Dispatch<SetStateAction<"menu" | "reading" | "writing" | "listening">>
}

const Listening = ({ questions = [], setActive }: Props) => {
  const [currQues, setCurrQues] = useState(0);
  const [ans] = useState<string>("");

  return (
    <>
      <div className="flex md:w-1/2 md:mx-auto flex-col bg-white md:shadow-md h-full">
        <div className="flex-grow-0 ">
          <QuizHeader title="Listening" />
        </div>
        <div className="flex-grow px-6 py-4">
          <Note />
          <audio controls autoPlay className="mt-6">
            <source src={questions[currQues].context.details} />
          </audio>
          <div>
            <p className="mt-5 font-bold">Questions {currQues + 1}</p>
            <h5 className="text-sm mt-2">{questions[currQues].question}</h5>
          </div>
          <input
            type="text"
            placeholder="Answer"
            className="mt-4 py-2 w-full bg-transparent border border-b border-black border-l-0 border-r-0 border-t-0 focus:outline-none"
          />
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

export default Listening;
