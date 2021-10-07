import { ChangeEvent } from "react";

interface Props {
  ans: string;
  onUpdate: (event: ChangeEvent<HTMLInputElement>) => void;
}

const items = [{ name: "True" }, { name: "False" }, { name: "Not given" }];

const TrueFalse = ({ onUpdate, ans }: Props) => {
  return (
    <>
      <form className="wrapper-mcq-form">
        {items.flatMap((item, index) => (
          <p className="text-sm" key={index}>
            <input
              type="radio"
              value={item.name}
              checked={item.name===ans}
              onChange={onUpdate}
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