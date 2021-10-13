import { IQues } from "../../../types/Quiz";

interface Props {
  questions: (IQues & { exam_question_id: string })[];
}

const TotalQues = ({ questions = [] }: Props) => {
  console.log(questions);

  return (
    <div className="qstn-list mb-3">
      <ul>
        {questions.map((_,idx)=>(
          <li key={idx} role="button">{1+ idx}</li>
        ))}
      </ul>
    </div>
  );
};

export default TotalQues;
