import {  useContext } from "react";
import ExamContext from "../../../contexts/examContext";


const TotalQues = () => {
  const { questions, setCurrentQuestionIndex} = useContext(ExamContext);

  return (
    <>
    <div className="qstn-list mb-1 m-auto py-3 px-2">
      <ul className="">
        {questions.map((_,idx)=>(
          <li className="" key={idx} role="button" onClick={()=>setCurrentQuestionIndex(idx)}>{1+ idx}</li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default TotalQues;
