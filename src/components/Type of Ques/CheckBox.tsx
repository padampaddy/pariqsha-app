import { ChangeEvent } from "react";

interface Props {
  options: string[];
  ans: string;
  onUpdate: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox = ({ options, onUpdate, ans }: Props) => {
  return (
    <div>
      <form className="wrapper-mcq-form">
        {options.flatMap((item, index) => (
          <p key={index}>
            <input
              type="checkbox"
              value={ans}
              onChange={onUpdate}
              id={`rb_${index}`}
              name="checkbox-group"
            />
            <label htmlFor={`rb_${index}`}>{item}</label>
          </p>
        ))}
      </form>
    </div>
  );
};

export default CheckBox;
