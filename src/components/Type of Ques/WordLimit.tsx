import { useContext } from "react";
import ExamContext from "../../contexts/examContext";

const WordLimit = () => {
  const { userAnswer, setUserAnswer } = useContext(ExamContext);
  return (
    <>
      <input
        type="text"
        className="resize-none text-sm flex w-full md:h-8 h-6 bg-transparent focus:outline-none border border-gray-400 break-words px-2 py-1 "
        placeholder="Type Your Answer"
        value={userAnswer}
        onChange={(e)=>setUserAnswer(e.target.value)}
      />
    </>
  );
};

export default WordLimit;
