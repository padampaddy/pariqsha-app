import Note from "../components/Note";
import QuestionType from "../../../components/QuestionType";
import QuizHeader from "../../../components/QuizHeader";
import { IQues } from "../../../types/Quiz";

interface Props {
  questions: IQues[];
}

const ListeningAudio = ({ questions = [] }: Props) => {
  console.log(questions);
  return (
    <div className="flex flex-col h-full md:w-1/2 md:mx-auto">
      <QuizHeader title="Listening" />
      <div className="flex-1 bg-white md:shadow-md md:mx-4 mx-0 md:mb-4">
        <div className=" p-6 h-full">
          <QuestionType title="Part1 (Fill in the blanks)" />
          <h3 className="">Question 1-10</h3>
          <Note />
          <audio controls autoPlay className="mt-6">
            <source src="https://minio.app.pariqsha.com/pariqsha/audio/Audio1.mp3" />
          </audio>
          <div>
            <h3 className="mt-5 text-sm ">
              <b>Q.No.1</b> Lorem Ipsum is simply dummy text of the printing and
              typesetting industry?
            </h3>
          </div>
          <input
            type="text"
            placeholder="Answer"
            className="mt-4 py-2 w-full bg-transparent border border-b border-black border-l-0 border-r-0 border-t-0 focus:outline-none"
          />
          <div className="btn-grup pb-4 justify-between flex mt-6">
            <button className="border-2 border-blue-500 py-2 px-4 text-blue-700 text-sm">
              Previous
            </button>
            <button className="common-btn py-2 px-8 text-sm">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListeningAudio;
