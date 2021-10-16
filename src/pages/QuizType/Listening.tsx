import Note from "./components/Note";
import {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
} from "react";
import TrueFalse from "../../components/Type of Ques/TrueFalse";
import Mcq from "../../components/Type of Ques/Mcq";
import WordLimit from "../../components/Type of Ques/WordLimit";
import Tip from "./components/Tip";
import CheckBox from "../../components/Type of Ques/CheckBox";
import ExamContext from "../../contexts/examContext";

const Listening = () => {
  const audioRef = useRef() as MutableRefObject<HTMLAudioElement>;
  const { questions, currentQuestionIndex } = useContext(ExamContext);

  useEffect(() => {
    localStorage.setItem(
      questions[currentQuestionIndex].context.id,
      audioRef.current.currentTime.toString()
    );
    audioRef.current.pause();
    audioRef.current.load();
    const timeLocal = localStorage.getItem(
      questions[currentQuestionIndex]?.context.id
    );
    audioRef.current.currentTime = timeLocal ? parseInt(timeLocal) : 0;
    audioRef.current.play();
  }, [questions[currentQuestionIndex]?.context.details]);

  const type = questions[currentQuestionIndex]?.type_of_question.name;
  const tip =
    questions[currentQuestionIndex]?.type_of_question_description_override;
  const img = questions[currentQuestionIndex]?.image_link;

  return (
    <>
      <div className="flex-grow md:px-6 md:py-4 px-3 py-1.5 flex flex-col overflow-y-auto h-full">
        <Note detail="Recording will be played once only" />
        {tip && <Tip detail={tip} />}
        <audio ref={audioRef} autoPlay className="mt-6">
          <source src={questions[currentQuestionIndex].context.details} />
        </audio>

        <div>
          {img && <img className="mt-4 " src={img} />}
          <p className="mt-5 font-bold">Questions {currentQuestionIndex + 1}</p>
          <h5 className="text-sm mt-4">
            {questions[currentQuestionIndex].question}
          </h5>
        </div>
        <div className="mt-4">
          {type === "true_false_not_given" ? (
            <TrueFalse/>
          ) : type === "multiple_choice_question" ? (
            <Mcq />
          ) : type === "checkbox" ? (
            <CheckBox/>
          ) : (
            <WordLimit />
          )}
        </div>
      </div>
    </>
  );
};

export default Listening;
