import QuestionType from "../../../components/QuestionType";
import QuizFooter from "../../../components/QuizFooter";
import QuizHeader from "../../../components/QuizHeader";
import { IQues } from "../../../types/Quiz";

interface Props {
  questions: IQues[];
  onActive: () => void;
}

const Reading = ({ questions = [], onActive }: Props) => {
  console.log(questions);
  return (
    <>
      <div className="flex md:w-1/2 md:mx-auto flex-col bg-white md:shadow-md h-full">
        <div className="flex-grow-0">
          <QuizHeader title="Reading " />
        </div>
        <div className="flex-grow bg-white mx-0">
          <div className=" p-6 ">
            <QuestionType title="Read Passage and Match The Following" />
            <div className="mt-5">
              {questions.map((ques, index) => (
                <div key={index}>
                  <p className="mt-8 mb-3 font-bold">Read Passage</p>
                  <p className="overflow-y-auto h-60 ">{ques.context.details}</p>
                  <p className="mt-8 mb-3 font-bold">Questions</p>
                  <div className="mb-2">
                    <h5 className="text-sm">{ques.question}</h5>
                    <input
                      type="text"
                      placeholder=""
                      className="mt-1 py-1 w-full bg-transparent border border-b border-gray-400 focus:outline-none px-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-grow-0 px-6 py-4">
          <QuizFooter onActive={onActive} />
        </div>
      </div>
    </>
  );
};

export default Reading;
