import { IQues } from "../../../types/Quiz";

interface Props {
  questions: (IQues & { exam_question_id: string })[];
}

const TotalQues = ({ questions = [] }: Props) => {
  console.log(questions);

//   for (let i = 1; i <= questions.length; i++) {
//     console.log(i);
//   }

// const rows = [];
// for (let i = 0; i < questions.length; i++) {
//     rows.push(<ObjectRow key={i} />);
// }

  return (
    <div className="qstn-list mb-4">
      <ul>
        <li role="button">1</li>
        <li role="button">2</li>
        <li role="button">3</li>
        <li role="button">4</li>
      </ul>
    </div>
  );
};

export default TotalQues;
