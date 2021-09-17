import QuizHeader from "../components/QuizHeader";
import Note from "../components/Note";
import BaseLayout from "../layouts/Base";
import Question from "../components/Question";
import QuestionType from "../components/QuestionType";


const ListeningAudio = () => {
  return (
    <div>
      <BaseLayout showBack title="Listening">
        <div className="flex flex-col h-full md:w-1/2 md:mx-auto">
          <QuizHeader title="Fill The Blank Section" />
          <div className="flex-1 bg-white shadow-md mx-4 mb-4">
            <div className=" p-6">
              <QuestionType title="Part1 (Fill in the blanks)" />
              <h3 className="">Question 1-10</h3>
              <Note />
              <audio controls autoPlay><source src="https://minio.app.pariqsha.com/pariqsha/audio/Audio1.mp3" /></audio>
              <Question />
              <input
                type="text"
                placeholder="Answer"
                className="mt-4 py-2 w-full bg-transparent border border-b border-black border-l-0 border-r-0 border-t-0 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </BaseLayout>
    </div>
  );
};

export default ListeningAudio;
