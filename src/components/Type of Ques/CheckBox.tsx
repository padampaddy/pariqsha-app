import { useContext, useEffect, useState } from "react";
import ExamContext from "../../contexts/examContext";

const CheckBox = () => {
  const { userAnswer, setUserAnswer, questions, currentQuestionIndex } =
    useContext(ExamContext);
  const [selected, setSelected] = useState<string[]>(
    userAnswer?.split(";") || []
  );
  const handleClick = (item: string) => {
    const index = selected.findIndex((a) => a === item);
    console.log(index);
    if (index === -1) {
      setSelected([...selected, item]);
    } else {
      setSelected([...selected.slice(0, index), ...selected.slice(index + 1)]);
    }
  };
  useEffect(() => {
    setUserAnswer(selected.join(";"));
  }, [selected]);
  return (
    <div>
      <form className="wrapper-mcq-form">
        {questions[currentQuestionIndex].options.flatMap(
          (item: string, index) => (
            <div key={index}>
              <input
                type="checkbox"
                value={item}
                checked={selected.includes(item)}
                onChange={() => handleClick(item)}
                id={`rb_${index}`}
                name="checkbox-group"
              />
              <label htmlFor={`rb_${index}`}>{item}</label>
            </div>
          )
        )}
      </form>
    </div>
  );
};

export default CheckBox;
