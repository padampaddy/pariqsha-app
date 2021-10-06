import { ChangeEvent } from "react";

interface Props {
  ans: string;
  onUpdate: (e: ChangeEvent<HTMLInputElement>) => void;
}
const WordLimit = ({ onUpdate, ans }: Props) => {
  return (
    <>
      <input
        type="text"
        className="resize-none text-sm flex w-full md:h-10 h-8 bg-transparent focus:outline-none border border-gray-400 break-words px-2 py-1 "
        placeholder="Type Your Answer"
        value={ans}
        onChange={onUpdate}
      />
    </>
  );
};

export default WordLimit;
