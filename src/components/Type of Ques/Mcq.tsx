import { ChangeEvent } from "react";

interface Props {
  options: string[];
  ans: string;
  onUpdate: (e: ChangeEvent<HTMLInputElement>) => void;
}
const Mcq = ({ options, onUpdate, ans }: Props) => {
  return (
    <>
      <form className="wrapper-mcq-form">
        {options.flatMap((item, index) => (
          <p key={index}>
            <input
              type="radio"
              value={ans}
              onChange={onUpdate}
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
