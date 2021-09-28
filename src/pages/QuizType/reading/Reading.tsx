import QuestionType from "../../../components/QuestionType";
import QuizHeader from "../../../components/QuizHeader";
import { IQues } from "../../../types/Quiz";

interface Props {
  questions: IQues[];
}

const Reading = ({ questions = [] }: Props) => {
  console.log(questions);
  return (
    <div className="flex flex-col h-full md:w-1/2 md:mx-auto">
      <QuizHeader title="Reading " />
      <div className="flex-1 bg-white md:shadow-md md:mx-4 mx-0 mb-4 overflow-y-auto">
        <div className=" p-6 ">
          <QuestionType title="Read Passage and Match The Following" />

          <div className="mt-5">
            {questions.map((ques, index) => (
              <div key={index}>
                <p className="mt-8 mb-3">
                  <b>Read Passage</b>
                </p>
                {ques.context.details}
                <p className="mt-8 mb-3">
                  <b>Questions</b>
                </p>
                {ques.question}
              </div>
            ))}
      
            <div className="mb-2">
              <h4 className="text-sm">
                1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </h4>
              <input
                type="text"
                placeholder=""
                className="mt-1 py-1 w-full bg-transparent border border-b border-gray-400 focus:outline-none px-2"
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Reading;
