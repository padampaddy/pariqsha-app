import { useState } from "react";
import Loader from "../../../components/Loader";
import QuestionType from "../../../components/QuestionType";
import QuizFooter from "../components/QuizFooter";
import QuizHeader from "../components/QuizHeader";
import { IQues } from "../../../types/Quiz";
interface Props {
  questions: IQues[];
  onActive: () => void;
  loading: boolean;
}
const Reading = ({ questions = [], onActive, loading }: Props) => {
  console.log(questions);
  const [currQues, setCurrQues] = useState(0);
  const [currContext] = useState(0);
  const handleNext = () => {
    setCurrQues(currQues + 1);
    // setCurrContext(currContext + 1)
  };
  const handlePrev = () => {
    setCurrQues(currQues - 1);
    // setCurrContext(currContext + 1)
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex md:w-1/2 md:mx-auto flex-col bg-white md:shadow-md h-full">
          <div className="flex-grow-0">
            <QuizHeader title="Reading " />
          </div>
          <div className="flex-grow bg-white mx-0">
            <div className=" p-6 flex flex-col">
              <QuestionType title="Read Passage and Match The Following" />
              <div className="mt-5">
                {/* passage */}
                <div >
                  <p className="mt-8 mb-3 font-bold">
                    Read Passage {currContext + 1}
                  </p>
                  <p className="overflow-y-auto h-80 ">
                    {questions[currContext].context.details}
                  </p>
                </div>
                {/* questions */}
                <div>
                  <p className="mt-8 mb-3 font-bold">
                    Questions {currQues + 1}
                  </p>
                  <h5 className="text-sm ">{questions[currQues].question}</h5>
                  <input
                    type="text"
                    placeholder=""
                    className="mt-1 py-1 w-full bg-transparent border border-b border-gray-400 focus:outline-none px-2"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-grow-0 px-6 py-4">
            <QuizFooter
              onActive={onActive}
              onNext={handleNext}
              onPrev={handlePrev}
              currQues={currQues}
              currContext={currContext}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default Reading;
