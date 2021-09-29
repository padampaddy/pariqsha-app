import Note from "../components/Note";
import QuestionType from "../../../components/QuestionType";
import QuizHeader from "../../../components/QuizHeader";
import { IQues } from "../../../types/Quiz";
import QuizFooter from "../../../components/QuizFooter";

interface Props {
  questions: IQues[];
  onActive: () => void;
}

const ListeningAudio = ({ questions = [], onActive }: Props) => {
  console.log(questions);
  return (
    <>
      <div className="flex md:w-1/2 md:mx-auto flex-col bg-white md:shadow-md h-full">
        <div className="flex-grow-0 ">
          <QuizHeader title="Listening" />
        </div>
        <div className="flex-grow">
          <div className=" p-6">
            <QuestionType title="Part1 (Fill in the blanks)" />
            <h3 className="">Question 1-10</h3>
            <Note />
            <audio controls autoPlay className="mt-6">
              <source src="https://minio.app.pariqsha.com/pariqsha/audio/Audio1.mp3" />
            </audio>
            <div>
              <h3 className="mt-5 text-sm ">
                <b>Q.No.1</b> Lorem Ipsum is simply dummy text of the printing
                and typesetting industry?
              </h3>
            </div>
            <input
              type="text"
              placeholder="Answer"
              className="mt-4 py-2 w-full bg-transparent border border-b border-black border-l-0 border-r-0 border-t-0 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex-grow-0 px-6 py-6">
          <QuizFooter onActive={onActive} />
        </div>
      </div>
    </>
  );
};

export default ListeningAudio;
