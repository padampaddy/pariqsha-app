import BaseLayout from "../../../layouts/Base";
import Note from "../components/Note";
import Tip from "../components/Tip";
import QuestionType from "../../../components/QuestionType";
import QuizHeader from "../../../components/QuizHeader";

const ListeningTrueFalse = () => {
  return (
    <div className="">
      <BaseLayout showBack title="Listening">
        <div className="flex flex-col h-full md:w-1/2 md:mx-auto">
          <QuizHeader title="True/False" />

          <div className="flex-1 bg-white shadow-md mx-4 mb-4 overflow-y-auto">
            <div className=" p-6 ">
              <QuestionType title="Part 3 (True False or Not given)" />
              <h3 className="">Question 21-30</h3>
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
              <form className="mt-10 wrapper-mcq-form">
                <p>
                  <input type="radio" id="test1" name="radio-group" />
                  <label htmlFor="test1">True</label>
                </p>
                <p>
                  <input type="radio" id="test2" name="radio-group" />
                  <label htmlFor="test2">False</label>
                </p>
                <p>
                  <input type="radio" id="test3" name="radio-group" />
                  <label htmlFor="test3">Not given</label>
                </p>
              </form>
              <Tip />
            </div>
          </div>
        </div>
      </BaseLayout>
    </div>
  );
};

export default ListeningTrueFalse;
