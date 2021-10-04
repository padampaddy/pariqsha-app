import BaseLayout from "../../../layouts/Base";
import Note from "../components/Note";
import QuestionType from "../../../components/QuestionType";
import QuizHeader from "../components/QuizHeader";

const ListeningWordLimit = () => {
  return (
    <div className="">
      <BaseLayout showBack title="Listening">
        <div className="flex flex-col h-full md:w-1/2 md:mx-auto">
          <QuizHeader title="Word Limit" />

          <div className="flex-1 bg-white shadow-md mx-4 mb-4">
            <div className=" p-6 ">
              <QuestionType title="Part 4 (Not more than two words)" />
              <h3 className="">Question 31-40</h3>
              <Note />
              <audio controls autoPlay>
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
        </div>
      </BaseLayout>
    </div>
  );
};

export default ListeningWordLimit;
