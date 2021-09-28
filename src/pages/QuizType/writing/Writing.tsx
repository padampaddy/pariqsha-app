import Note from "../components/Note";
import QuestionType from "../../../components/QuestionType";
import QuizHeader from "../../../components/QuizHeader";
import { IQues } from "../../../types/Quiz";

interface Props {
  questions: IQues[];
}

const Writing = ({ questions = [] }: Props) => {
  console.log(questions);
  return (
    <div className="flex flex-col h-full md:w-1/2 md:mx-auto">
      <QuizHeader title="Writing " />
      <div className="flex-1 bg-white md:shadow-md md:mx-4 mx-0 mb-4">
        <div className=" p-6 ">
          <QuestionType title="Write on an A4 sheet then scan and upload ." />
          <Note />
          <div className="flex  items-center justify-center mt-5">
            <label className="w-64 flex flex-col items-center px-4 py-6 bg-gray-100 text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-500 hover:text-white">
              <span className="mt-2 text-base leading-normal">
                Choose Here For Upload
              </span>
              <input type="file" className="hidden" />
            </label>
          </div>
        </div>
     
      </div>
    </div>
  );
};

export default Writing;
