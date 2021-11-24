import { useContext } from "react";
import ExamContext from "../../contexts/examContext";

const Mcq = () => {
  const { userAnswer, setUserAnswer, questions, currentQuestionIndex } = useContext(ExamContext);
  return (
    <>
      <form className="wrapper-mcq-form">
        {questions[currentQuestionIndex].options.flatMap((item, index) => (
          <p className="text-sm" key={index}>
            <input
              type="radio"
              value={item}
              checked={item === userAnswer.toLowerCase()}
              onChange={(e)=>setUserAnswer(e.target.value)}
              id={`rb_${index}`}
              name="radio-group"
            />
            <label htmlFor={`rb_${index}`}>{item}</label>
          </p>
        ))}
      </form>
    </>
  );
};

export default Mcq;
