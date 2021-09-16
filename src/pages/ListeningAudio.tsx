import QuizHeader from "../components/QuizHeader";
import Note from "../components/Note";
import BaseLayout from "../layouts/Base";
// import demoaudio from ../audio/
// import AudioPlayer from "react-h5-audio-player";
// import "react-h5-audio-player/lib/styles.css";

const ListeningAudio = () => {
  return (
    <div>
      <BaseLayout showBack title="Listening">
      <div className="flex flex-col h-full md:w-1/2 md:mx-auto">
        <QuizHeader title="Fill The Blank Section" />

        <div className="flex-1 bg-white shadow-md mx-4 mb-4"> 
        <div className=" p-6">
        <h3 className="">Question 1-10</h3>
        <Note/>

          {/* <AudioPlayer autoPlay src="demoaudio" /> */}

          <h3 className="mt-6 text-sm ">
            <b>Q.No.1</b> Lorem Ipsum is simply dummy text of the printing and
            typesetting industry?
          </h3>
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
