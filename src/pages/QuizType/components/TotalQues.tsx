import { Dispatch, SetStateAction } from "react";
import { IQues } from "../../../types/Quiz";

interface Props {
  questions: (IQues & { exam_question_id: string })[];
  activeQues: number;
  setActiveQues: Dispatch<SetStateAction<number>>;
}

const TotalQues = ({ questions = [], activeQues, setActiveQues }: Props) => {
  console.log("activeQues", activeQues);

  return (
    <>
    <div className="qstn-list mb-3 -mx-6 px-2">
      <ul className="pb-2">
        {questions.map((_,idx)=>(
          <li className="" key={idx} role="button" onClick={()=>setActiveQues(idx)}>{1+ idx}</li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default TotalQues;
