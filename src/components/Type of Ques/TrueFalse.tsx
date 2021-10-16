import {  useContext } from "react";
import ExamContext from "../../contexts/examContext";


const items = [{ name: "True" }, { name: "False" }, { name: "Not given" }];

const TrueFalse = () => {
  const { userAnswer, setUserAnswer } = useContext(ExamContext);
  return (
    <>
      <form className="wrapper-mcq-form">
        {items.flatMap((item, index) => (
          <p className="text-sm" key={index}>
            <input
              type="radio"
              value={item.name}
              checked={item.name === userAnswer}
              onChange={(e)=>setUserAnswer(e.target.value)}
              id={`rb_${index}`}
              name="radio-group"
            />
            <label htmlFor={`rb_${index}`}>{item.name}</label>
          </p>
        ))}
      </form>
    </>
  );
};

export default TrueFalse;